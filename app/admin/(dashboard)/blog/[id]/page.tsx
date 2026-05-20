"use client"

import { useState, useEffect } from "react"
import { useRouter, useParams } from "next/navigation"
import { parseJsonArray } from "@/lib/utils"

const CATEGORIES = ["Architecture", "AI", "DevOps", "Engineering", "Career"]

export default function EditBlogPostPage() {
  const router = useRouter()
  const { id } = useParams<{ id: string }>()

  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
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

  useEffect(() => {
    fetch(`/api/blog/${id}`)
      .then((r) => r.json())
      .then((post) => {
        setTitle(post.title)
        setExcerpt(post.excerpt)
        setContent(post.content)
        setCategory(post.category)
        setTags(parseJsonArray(post.tags).join(", "))
        setSeoTitle(post.seoTitle)
        setSeoDescription(post.seoDescription)
        setSeoKeywords(parseJsonArray(post.seoKeywords).join(", "))
        setReadTime(post.readTimeMinutes)
        setPublished(post.published)
        setLoading(false)
      })
  }, [id])

  const handleSave = async (publish?: boolean) => {
    setSaving(true)
    try {
      await fetch(`/api/blog/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          excerpt,
          content,
          category,
          tags: tags.split(",").map((t) => t.trim()).filter(Boolean),
          seoTitle,
          seoDescription,
          seoKeywords: seoKeywords.split(",").map((k) => k.trim()).filter(Boolean),
          readTimeMinutes: readTime,
          published: publish !== undefined ? publish : published,
        }),
      })
      router.push("/admin/blog")
      router.refresh()
    } catch {
      alert("Failed to save")
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async () => {
    if (!confirm("Delete this post? This cannot be undone.")) return
    await fetch(`/api/blog/${id}`, { method: "DELETE" })
    router.push("/admin/blog")
    router.refresh()
  }

  const inputClass =
    "w-full bg-[#16202e] border border-[#1C2330] rounded-lg px-4 py-3 text-[#d9e3f7] font-[family-name:var(--font-dm-sans)] text-[14px] focus:outline-none focus:border-[#45f1c3] transition-colors"
  const labelClass =
    "block font-[family-name:var(--font-mono)] text-[11px] font-semibold text-[#bacac2] uppercase tracking-widest mb-2"

  if (loading) {
    return <div className="text-[#bacac2] font-[family-name:var(--font-dm-sans)]">Loading...</div>
  }

  return (
    <div className="max-w-5xl">
      <div className="flex items-center justify-between mb-8">
        <h1 className="font-[family-name:var(--font-syne)] text-[32px] font-bold text-[#d9e3f7]">
          Edit Post
        </h1>
        <button
          onClick={handleDelete}
          className="text-[#ffb4ab] border border-[#ffb4ab]/20 px-4 py-2 rounded-lg hover:bg-[#ffb4ab]/10 transition-all font-[family-name:var(--font-dm-sans)] text-[14px]"
        >
          Delete
        </button>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-5">
          <div>
            <label className={labelClass}>Title</label>
            <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} className={inputClass} />
          </div>
          <div>
            <label className={labelClass}>Excerpt</label>
            <textarea rows={2} value={excerpt} onChange={(e) => setExcerpt(e.target.value)} className={`${inputClass} resize-none`} />
          </div>
          <div>
            <label className={labelClass}>Content (Markdown)</label>
            <textarea
              rows={20}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className={`${inputClass} resize-y font-[family-name:var(--font-mono)] text-[13px]`}
            />
          </div>
        </div>

        <div className="space-y-5">
          <div className="bg-[#091421] border border-[#1C2330] p-5 rounded-xl">
            <h3 className="font-[family-name:var(--font-syne)] text-[16px] font-bold text-[#d9e3f7] mb-4">Publish</h3>
            <div className="space-y-3">
              <button onClick={() => handleSave(false)} disabled={saving} className="w-full border border-[#1C2330] text-[#d9e3f7] py-2.5 rounded-lg hover:bg-[#16202e] transition-all font-[family-name:var(--font-dm-sans)] disabled:opacity-50">
                {published ? "Unpublish" : "Save Draft"}
              </button>
              <button onClick={() => handleSave(true)} disabled={saving} className="w-full bg-[#00d4a8] text-[#00382a] font-bold py-2.5 rounded-lg hover:shadow-[0_0_20px_rgba(0,212,168,0.3)] transition-all font-[family-name:var(--font-dm-sans)] disabled:opacity-50">
                {saving ? "Saving..." : published ? "Update" : "Publish"}
              </button>
            </div>
          </div>

          <div className="bg-[#091421] border border-[#1C2330] p-5 rounded-xl space-y-4">
            <h3 className="font-[family-name:var(--font-syne)] text-[16px] font-bold text-[#d9e3f7]">Settings</h3>
            <div>
              <label className={labelClass}>Category</label>
              <select value={category} onChange={(e) => setCategory(e.target.value)} className={inputClass}>
                {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div>
              <label className={labelClass}>Tags</label>
              <input type="text" value={tags} onChange={(e) => setTags(e.target.value)} className={inputClass} />
            </div>
            <div>
              <label className={labelClass}>Read Time (min)</label>
              <input type="number" value={readTime} onChange={(e) => setReadTime(Number(e.target.value))} className={inputClass} />
            </div>
          </div>

          <div className="bg-[#091421] border border-[#1C2330] p-5 rounded-xl space-y-4">
            <h3 className="font-[family-name:var(--font-syne)] text-[16px] font-bold text-[#d9e3f7]">SEO</h3>
            <div>
              <label className={labelClass}>SEO Title ({seoTitle.length}/60)</label>
              <input type="text" value={seoTitle} onChange={(e) => setSeoTitle(e.target.value)} className={inputClass} />
            </div>
            <div>
              <label className={labelClass}>Meta Description ({seoDescription.length}/160)</label>
              <textarea rows={2} value={seoDescription} onChange={(e) => setSeoDescription(e.target.value)} className={`${inputClass} resize-none`} />
            </div>
            <div>
              <label className={labelClass}>Keywords</label>
              <input type="text" value={seoKeywords} onChange={(e) => setSeoKeywords(e.target.value)} className={inputClass} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
