"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"

const CATEGORIES = ["SaaS", "EdTech", "AI", "Business", "Mobile"]

export default function NewProjectPage() {
  const router = useRouter()
  const [saving, setSaving] = useState(false)
  const [saveError, setSaveError] = useState("")

  const [form, setForm] = useState({
    title: "",
    shortDesc: "",
    problem: "",
    solution: "",
    impact: "",
    techStack: "",
    category: "SaaS",
    featured: false,
    order: 0,
    githubUrl: "",
    liveUrl: "",
    status: "published" as "published" | "draft",
  })

  const update = (k: string, v: unknown) => setForm((p) => ({ ...p, [k]: v }))

  const handleSave = async () => {
    setSaving(true)
    setSaveError("")
    try {
      const res = await fetch("/api/projects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          techStack: form.techStack.split(",").map((t) => t.trim()).filter(Boolean),
        }),
      })
      if (!res.ok) {
        const err = await res.json().catch(() => ({}))
        setSaveError(err?.error ?? "Failed to save project. Check for duplicate title/slug.")
        return
      }
      router.push("/admin/projects")
      router.refresh()
    } catch {
      setSaveError("Network error. Please try again.")
    } finally {
      setSaving(false)
    }
  }

  const inputClass =
    "w-full bg-[#16202e] border border-[#1C2330] rounded-lg px-4 py-3 text-[#d9e3f7] font-[family-name:var(--font-dm-sans)] text-[14px] focus:outline-none focus:border-[#45f1c3] transition-colors"
  const labelClass =
    "block font-[family-name:var(--font-mono)] text-[11px] font-semibold text-[#bacac2] uppercase tracking-widest mb-2"

  return (
    <div className="max-w-3xl">
      <div className="flex items-center justify-between mb-8">
        <h1 className="font-[family-name:var(--font-syne)] text-[32px] font-bold text-[#d9e3f7]">
          New Project
        </h1>
        <button
          type="button"
          onClick={handleSave}
          disabled={saving || !form.title}
          className="bg-[#00d4a8] text-[#00382a] font-bold px-5 py-2.5 rounded-lg hover:shadow-[0_0_20px_rgba(0,212,168,0.3)] transition-all font-[family-name:var(--font-dm-sans)] disabled:opacity-50"
        >
          {saving ? "Saving..." : "Save Project"}
        </button>
      </div>

      {saveError && (
        <p className="text-[#ffb4ab] font-[family-name:var(--font-dm-sans)] text-[14px] mb-4">
          {saveError}
        </p>
      )}

      <div className="space-y-5">
        <div>
          <label className={labelClass}>Title *</label>
          <input type="text" value={form.title} onChange={(e) => update("title", e.target.value)} className={inputClass} placeholder="Project name..." />
        </div>
        <div>
          <label className={labelClass}>Short Description *</label>
          <textarea rows={2} value={form.shortDesc} onChange={(e) => update("shortDesc", e.target.value)} className={`${inputClass} resize-none`} placeholder="1-2 sentence summary..." />
        </div>
        <div>
          <label className={labelClass}>Problem</label>
          <textarea rows={3} value={form.problem} onChange={(e) => update("problem", e.target.value)} className={`${inputClass} resize-none`} placeholder="What problem did this solve?" />
        </div>
        <div>
          <label className={labelClass}>Solution</label>
          <textarea rows={3} value={form.solution} onChange={(e) => update("solution", e.target.value)} className={`${inputClass} resize-none`} placeholder="What did you build?" />
        </div>
        <div>
          <label className={labelClass}>Impact / Results</label>
          <textarea rows={3} value={form.impact} onChange={(e) => update("impact", e.target.value)} className={`${inputClass} resize-none`} placeholder="Measurable outcomes..." />
        </div>
        <div>
          <label className={labelClass}>Tech Stack (comma-separated)</label>
          <input type="text" value={form.techStack} onChange={(e) => update("techStack", e.target.value)} className={inputClass} placeholder="Next.js, Node.js, PostgreSQL..." />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className={labelClass}>Category</label>
            <select value={form.category} onChange={(e) => update("category", e.target.value)} className={inputClass}>
              {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
          <div>
            <label className={labelClass}>Status</label>
            <select value={form.status} onChange={(e) => update("status", e.target.value)} className={inputClass}>
              <option value="published">Published</option>
              <option value="draft">Draft</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className={labelClass}>GitHub URL</label>
            <input type="url" value={form.githubUrl} onChange={(e) => update("githubUrl", e.target.value)} className={inputClass} placeholder="https://github.com/..." />
          </div>
          <div>
            <label className={labelClass}>Live URL</label>
            <input type="url" value={form.liveUrl} onChange={(e) => update("liveUrl", e.target.value)} className={inputClass} placeholder="https://..." />
          </div>
        </div>

        <div className="flex items-center gap-3">
          <input type="checkbox" id="featured" checked={form.featured} onChange={(e) => update("featured", e.target.checked)} className="w-4 h-4 accent-[#45f1c3]" />
          <label htmlFor="featured" className="font-[family-name:var(--font-dm-sans)] text-[14px] text-[#d9e3f7]">Featured project</label>
        </div>
      </div>
    </div>
  )
}
