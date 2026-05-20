"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { slugify, parseJsonArray } from "@/lib/utils"
import type { GeneratedBlog } from "@/lib/groq"

type Tone = "technical" | "conversational" | "tutorial" | "opinion"

const CATEGORIES = ["Architecture", "AI", "DevOps", "Engineering", "Career"]

interface GroqForm {
  topic: string
  targetKeyword: string
  audience: string
  tone: Tone
  wordCount: number
  includeCodeExamples: boolean
}

export default function NewBlogPostPage() {
  const router = useRouter()

  // Blog form state
  const [title, setTitle] = useState("")
  const [excerpt, setExcerpt] = useState("")
  const [content, setContent] = useState("")
  const [category, setCategory] = useState("Engineering")
  const [tags, setTags] = useState("")
  const [seoTitle, setSeoTitle] = useState("")
  const [seoDescription, setSeoDescription] = useState("")
  const [seoKeywords, setSeoKeywords] = useState("")
  const [readTime, setReadTime] = useState(5)
  const [published, setPublished] = useState(false)
  const [generatedByAI, setGeneratedByAI] = useState(false)

  // AI modal state
  const [showModal, setShowModal] = useState(false)
  const [generating, setGenerating] = useState(false)
  const [genError, setGenError] = useState("")
  const [groqForm, setGroqForm] = useState<GroqForm>({
    topic: "",
    targetKeyword: "",
    audience: "developers",
    tone: "technical",
    wordCount: 1500,
    includeCodeExamples: true,
  })

  const [saving, setSaving] = useState(false)

  const handleGenerate = async () => {
    setGenerating(true)
    setGenError("")

    try {
      const res = await fetch("/api/blog/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(groqForm),
      })

      if (!res.ok) {
        const err = await res.json()
        throw new Error(err.error || "Generation failed")
      }

      const generated: GeneratedBlog = await res.json()

      setTitle(generated.title)
      setExcerpt(generated.excerpt)
      setContent(generated.content)
      setCategory(generated.category)
      setTags(generated.tags.join(", "))
      setSeoTitle(generated.seoTitle)
      setSeoDescription(generated.seoDescription)
      setSeoKeywords(generated.seoKeywords.join(", "))
      setReadTime(generated.readTimeMinutes)
      setGeneratedByAI(true)
      setShowModal(false)
    } catch (err) {
      setGenError(err instanceof Error ? err.message : "Generation failed")
    } finally {
      setGenerating(false)
    }
  }

  const handleSave = async (publish: boolean) => {
    setSaving(true)
    try {
      const res = await fetch("/api/blog", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          excerpt,
          content,
          category,
          tags: tags.split(",").map((t) => t.trim()).filter(Boolean),
          seoTitle: seoTitle || title,
          seoDescription: seoDescription || excerpt,
          seoKeywords: seoKeywords.split(",").map((k) => k.trim()).filter(Boolean),
          readTimeMinutes: readTime,
          published: publish,
          generatedByAI,
          aiModel: generatedByAI ? "llama-3.3-70b-versatile" : undefined,
        }),
      })

      if (!res.ok) throw new Error("Save failed")
      router.push("/admin/blog")
      router.refresh()
    } catch {
      alert("Failed to save post")
    } finally {
      setSaving(false)
    }
  }

  const inputClass =
    "w-full bg-[#16202e] border border-[#1C2330] rounded-lg px-4 py-3 text-[#d9e3f7] font-[family-name:var(--font-dm-sans)] text-[14px] focus:outline-none focus:border-[#45f1c3] transition-colors"

  const labelClass =
    "block font-[family-name:var(--font-mono)] text-[11px] font-semibold text-[#bacac2] uppercase tracking-widest mb-2"

  return (
    <div className="max-w-5xl">
      <div className="flex items-center justify-between mb-8">
        <h1 className="font-[family-name:var(--font-syne)] text-[32px] font-bold text-[#d9e3f7]">
          New Blog Post
        </h1>
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 bg-[#45f1c3]/10 border border-[#45f1c3]/30 text-[#45f1c3] px-5 py-2.5 rounded-lg hover:bg-[#45f1c3]/20 transition-all font-[family-name:var(--font-dm-sans)] font-medium"
        >
          🤖 Generate with Groq AI
        </button>
      </div>

      {generatedByAI && (
        <div className="bg-[#45f1c3]/10 border border-[#45f1c3]/20 rounded-lg px-4 py-3 mb-6 flex items-center gap-2">
          <span className="text-[#45f1c3]">✓</span>
          <span className="font-[family-name:var(--font-dm-sans)] text-[14px] text-[#45f1c3]">
            Generated with Groq AI (llama-3.3-70b-versatile) · Review before publishing
          </span>
        </div>
      )}

      <div className="grid md:grid-cols-3 gap-6">
        {/* Main content */}
        <div className="md:col-span-2 space-y-5">
          <div>
            <label className={labelClass}>Title</label>
            <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} className={inputClass} placeholder="Post title..." />
          </div>

          <div>
            <label className={labelClass}>Excerpt</label>
            <textarea rows={2} value={excerpt} onChange={(e) => setExcerpt(e.target.value)} className={`${inputClass} resize-none`} placeholder="2-3 sentence summary..." />
          </div>

          <div>
            <label className={labelClass}>Content (Markdown)</label>
            <textarea
              rows={20}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className={`${inputClass} resize-y font-[family-name:var(--font-mono)] text-[13px] leading-relaxed`}
              placeholder="Write your post in Markdown..."
            />
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-5">
          {/* Publish */}
          <div className="bg-[#091421] border border-[#1C2330] p-5 rounded-xl">
            <h3 className="font-[family-name:var(--font-syne)] text-[16px] font-bold text-[#d9e3f7] mb-4">Publish</h3>
            <div className="space-y-3">
              <button
                onClick={() => handleSave(false)}
                disabled={saving || !title}
                className="w-full border border-[#1C2330] text-[#d9e3f7] py-2.5 rounded-lg hover:bg-[#16202e] transition-all font-[family-name:var(--font-dm-sans)] disabled:opacity-50"
              >
                Save Draft
              </button>
              <button
                onClick={() => handleSave(true)}
                disabled={saving || !title || !content}
                className="w-full bg-[#00d4a8] text-[#00382a] font-bold py-2.5 rounded-lg hover:shadow-[0_0_20px_rgba(0,212,168,0.3)] transition-all font-[family-name:var(--font-dm-sans)] disabled:opacity-50"
              >
                {saving ? "Publishing..." : "Publish"}
              </button>
            </div>
          </div>

          {/* Meta */}
          <div className="bg-[#091421] border border-[#1C2330] p-5 rounded-xl space-y-4">
            <h3 className="font-[family-name:var(--font-syne)] text-[16px] font-bold text-[#d9e3f7]">Settings</h3>

            <div>
              <label className={labelClass}>Category</label>
              <select value={category} onChange={(e) => setCategory(e.target.value)} className={inputClass}>
                {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>

            <div>
              <label className={labelClass}>Tags (comma-separated)</label>
              <input type="text" value={tags} onChange={(e) => setTags(e.target.value)} className={inputClass} placeholder="next.js, react, typescript" />
            </div>

            <div>
              <label className={labelClass}>Read Time (minutes)</label>
              <input type="number" value={readTime} onChange={(e) => setReadTime(Number(e.target.value))} className={inputClass} min={1} max={60} />
            </div>
          </div>

          {/* SEO */}
          <div className="bg-[#091421] border border-[#1C2330] p-5 rounded-xl space-y-4">
            <h3 className="font-[family-name:var(--font-syne)] text-[16px] font-bold text-[#d9e3f7]">SEO</h3>

            <div>
              <label className={labelClass}>SEO Title</label>
              <input type="text" value={seoTitle} onChange={(e) => setSeoTitle(e.target.value)} className={inputClass} placeholder="55-60 chars" />
              <p className={`text-[11px] mt-1 ${seoTitle.length > 60 ? "text-[#ffb4ab]" : "text-[#85948d]"}`}>{seoTitle.length}/60</p>
            </div>

            <div>
              <label className={labelClass}>Meta Description</label>
              <textarea rows={2} value={seoDescription} onChange={(e) => setSeoDescription(e.target.value)} className={`${inputClass} resize-none`} placeholder="150-160 chars" />
              <p className={`text-[11px] mt-1 ${seoDescription.length > 160 ? "text-[#ffb4ab]" : "text-[#85948d]"}`}>{seoDescription.length}/160</p>
            </div>

            <div>
              <label className={labelClass}>Keywords (comma-separated)</label>
              <input type="text" value={seoKeywords} onChange={(e) => setSeoKeywords(e.target.value)} className={inputClass} placeholder="react, next.js, ..." />
            </div>
          </div>
        </div>
      </div>

      {/* Groq AI Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-[#0F1318] border border-[#1C2330] rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-[#1C2330] flex items-center justify-between">
              <div>
                <h2 className="font-[family-name:var(--font-syne)] text-[24px] font-bold text-[#d9e3f7]">
                  Generate with Groq AI
                </h2>
                <p className="font-[family-name:var(--font-dm-sans)] text-[14px] text-[#bacac2] mt-1">
                  llama-3.3-70b-versatile · SEO-optimised content in seconds
                </p>
              </div>
              <button
                onClick={() => setShowModal(false)}
                className="text-[#bacac2] hover:text-[#d9e3f7] text-2xl leading-none"
              >
                ×
              </button>
            </div>

            <div className="p-6 space-y-5">
              <div>
                <label className={labelClass}>Topic *</label>
                <input
                  type="text"
                  value={groqForm.topic}
                  onChange={(e) => setGroqForm((p) => ({ ...p, topic: e.target.value }))}
                  className={inputClass}
                  placeholder="Building multi-tenant SaaS with Next.js and PostgreSQL"
                />
              </div>

              <div>
                <label className={labelClass}>Primary SEO Keyword *</label>
                <input
                  type="text"
                  value={groqForm.targetKeyword}
                  onChange={(e) => setGroqForm((p) => ({ ...p, targetKeyword: e.target.value }))}
                  className={inputClass}
                  placeholder="multi-tenant SaaS Next.js"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className={labelClass}>Audience</label>
                  <select
                    value={groqForm.audience}
                    onChange={(e) => setGroqForm((p) => ({ ...p, audience: e.target.value }))}
                    className={inputClass}
                  >
                    <option value="developers">Developers</option>
                    <option value="business owners">Business Owners</option>
                    <option value="students">Students</option>
                    <option value="general">General</option>
                  </select>
                </div>

                <div>
                  <label className={labelClass}>Tone</label>
                  <select
                    value={groqForm.tone}
                    onChange={(e) => setGroqForm((p) => ({ ...p, tone: e.target.value as Tone }))}
                    className={inputClass}
                  >
                    <option value="technical">Technical</option>
                    <option value="conversational">Conversational</option>
                    <option value="tutorial">Tutorial</option>
                    <option value="opinion">Opinion</option>
                  </select>
                </div>
              </div>

              <div>
                <label className={labelClass}>Word Count: ~{groqForm.wordCount} words</label>
                <input
                  type="range"
                  min={800}
                  max={3000}
                  step={100}
                  value={groqForm.wordCount}
                  onChange={(e) => setGroqForm((p) => ({ ...p, wordCount: Number(e.target.value) }))}
                  className="w-full accent-[#45f1c3]"
                />
                <div className="flex justify-between font-[family-name:var(--font-mono)] text-[11px] text-[#85948d] mt-1">
                  <span>800</span>
                  <span>3000</span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  id="code-examples"
                  checked={groqForm.includeCodeExamples}
                  onChange={(e) => setGroqForm((p) => ({ ...p, includeCodeExamples: e.target.checked }))}
                  className="w-4 h-4 accent-[#45f1c3]"
                />
                <label htmlFor="code-examples" className="font-[family-name:var(--font-dm-sans)] text-[14px] text-[#d9e3f7]">
                  Include code examples
                </label>
              </div>

              {genError && (
                <p className="text-[#ffb4ab] font-[family-name:var(--font-dm-sans)] text-[14px]">{genError}</p>
              )}

              <div className="flex gap-3 pt-2">
                <button
                  onClick={handleGenerate}
                  disabled={generating || !groqForm.topic || !groqForm.targetKeyword}
                  className="flex-1 bg-[#00d4a8] text-[#00382a] font-bold py-3 rounded-lg hover:shadow-[0_0_20px_rgba(0,212,168,0.3)] transition-all font-[family-name:var(--font-dm-sans)] disabled:opacity-50"
                >
                  {generating ? "Generating..." : "Generate Post"}
                </button>
                <button
                  onClick={() => setShowModal(false)}
                  className="px-6 border border-[#1C2330] text-[#bacac2] rounded-lg hover:bg-[#16202e] transition-all font-[family-name:var(--font-dm-sans)]"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
