"use client"

import { useState, useEffect } from "react"
import { useRouter, useParams } from "next/navigation"
import { parseJsonArray } from "@/lib/utils"

const CATEGORIES = ["SaaS", "EdTech", "AI", "Business", "Mobile"]

export default function EditProjectPage() {
  const router = useRouter()
  const { id } = useParams<{ id: string }>()

  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
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

  useEffect(() => {
    fetch(`/api/projects/${id}`)
      .then((r) => r.json())
      .then((project) => {
        setForm({
          title: project.title,
          shortDesc: project.shortDesc,
          problem: project.problem,
          solution: project.solution,
          impact: project.impact,
          techStack: parseJsonArray(project.techStack).join(", "),
          category: project.category,
          featured: project.featured,
          order: project.order,
          githubUrl: project.githubUrl ?? "",
          liveUrl: project.liveUrl ?? "",
          status: project.status,
        })
        setLoading(false)
      })
  }, [id])

  const update = (k: string, v: unknown) => setForm((p) => ({ ...p, [k]: v }))

  const handleSave = async () => {
    setSaving(true)
    try {
      await fetch(`/api/projects/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          techStack: form.techStack.split(",").map((t) => t.trim()).filter(Boolean),
        }),
      })
      router.push("/admin/projects")
      router.refresh()
    } catch {
      alert("Failed to save")
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async () => {
    if (!confirm("Delete this project? This cannot be undone.")) return
    await fetch(`/api/projects/${id}`, { method: "DELETE" })
    router.push("/admin/projects")
    router.refresh()
  }

  const inputClass =
    "w-full bg-[#16202e] border border-[#1C2330] rounded-lg px-4 py-3 text-[#d9e3f7] font-[family-name:var(--font-dm-sans)] text-[14px] focus:outline-none focus:border-[#45f1c3] transition-colors"
  const labelClass =
    "block font-[family-name:var(--font-mono)] text-[11px] font-semibold text-[#bacac2] uppercase tracking-widest mb-2"

  if (loading) return <div className="text-[#bacac2] font-[family-name:var(--font-dm-sans)]">Loading...</div>

  return (
    <div className="max-w-3xl">
      <div className="flex items-center justify-between mb-8">
        <h1 className="font-[family-name:var(--font-syne)] text-[32px] font-bold text-[#d9e3f7]">Edit Project</h1>
        <div className="flex gap-3">
          <button onClick={handleDelete} className="text-[#ffb4ab] border border-[#ffb4ab]/20 px-4 py-2 rounded-lg hover:bg-[#ffb4ab]/10 transition-all font-[family-name:var(--font-dm-sans)] text-[14px]">Delete</button>
          <button onClick={handleSave} disabled={saving} className="bg-[#00d4a8] text-[#00382a] font-bold px-5 py-2.5 rounded-lg hover:shadow-[0_0_20px_rgba(0,212,168,0.3)] transition-all font-[family-name:var(--font-dm-sans)] disabled:opacity-50">
            {saving ? "Saving..." : "Save"}
          </button>
        </div>
      </div>

      <div className="space-y-5">
        <div>
          <label className={labelClass}>Title</label>
          <input type="text" value={form.title} onChange={(e) => update("title", e.target.value)} className={inputClass} />
        </div>
        <div>
          <label className={labelClass}>Short Description</label>
          <textarea rows={2} value={form.shortDesc} onChange={(e) => update("shortDesc", e.target.value)} className={`${inputClass} resize-none`} />
        </div>
        <div>
          <label className={labelClass}>Problem</label>
          <textarea rows={3} value={form.problem} onChange={(e) => update("problem", e.target.value)} className={`${inputClass} resize-none`} />
        </div>
        <div>
          <label className={labelClass}>Solution</label>
          <textarea rows={3} value={form.solution} onChange={(e) => update("solution", e.target.value)} className={`${inputClass} resize-none`} />
        </div>
        <div>
          <label className={labelClass}>Impact</label>
          <textarea rows={3} value={form.impact} onChange={(e) => update("impact", e.target.value)} className={`${inputClass} resize-none`} />
        </div>
        <div>
          <label className={labelClass}>Tech Stack (comma-separated)</label>
          <input type="text" value={form.techStack} onChange={(e) => update("techStack", e.target.value)} className={inputClass} />
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
            <input type="url" value={form.githubUrl} onChange={(e) => update("githubUrl", e.target.value)} className={inputClass} />
          </div>
          <div>
            <label className={labelClass}>Live URL</label>
            <input type="url" value={form.liveUrl} onChange={(e) => update("liveUrl", e.target.value)} className={inputClass} />
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
