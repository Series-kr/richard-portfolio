"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import {
  Box, Card, TextField, MenuItem, Button, Switch, FormControlLabel, Autocomplete, Slider,
  Typography, Skeleton, Alert, Dialog, DialogTitle, DialogContent, DialogActions,
} from "@mui/material"
import SmartToyIcon from "@mui/icons-material/SmartToy"
import { useSnackbar } from "notistack"
import { parseJsonArray } from "@/lib/utils"
import { brand } from "@/lib/theme"
import type { GeneratedBlog } from "@/lib/groq"

const CATEGORIES = ["Architecture", "AI", "DevOps", "Engineering", "Career"]
const AI_MODEL = "llama-3.3-70b-versatile"

type Tone = "technical" | "conversational" | "tutorial" | "opinion"

interface BlogValues {
  title: string
  excerpt: string
  content: string
  category: string
  tags: string[]
  seoTitle: string
  seoDescription: string
  seoKeywords: string[]
  readTimeMinutes: number
}

const blogInitial: BlogValues = {
  title: "", excerpt: "", content: "", category: "Engineering", tags: [],
  seoTitle: "", seoDescription: "", seoKeywords: [], readTimeMinutes: 5,
}

interface GroqValues {
  topic: string
  targetKeyword: string
  audience: string
  tone: Tone
  wordCount: number
  includeCodeExamples: boolean
}

const groqInitial: GroqValues = { topic: "", targetKeyword: "", audience: "developers", tone: "technical", wordCount: 1500, includeCodeExamples: true }

export function BlogForm({ id }: { id?: string }) {
  const router = useRouter()
  const { enqueueSnackbar } = useSnackbar()
  const [form, setForm] = useState<BlogValues>(blogInitial)
  const [loading, setLoading] = useState(Boolean(id))
  const [saving, setSaving] = useState(false)
  const [published, setPublished] = useState(false)
  const [generatedByAI, setGeneratedByAI] = useState(false)

  const [modalOpen, setModalOpen] = useState(false)
  const [groq, setGroq] = useState<GroqValues>(groqInitial)
  const [generating, setGenerating] = useState(false)
  const [genError, setGenError] = useState("")

  const set = <K extends keyof BlogValues>(key: K, value: BlogValues[K]) => setForm((p) => ({ ...p, [key]: value }))

  useEffect(() => {
    if (!id) return
    fetch(`/api/blog/${id}`)
      .then((r) => r.json())
      .then((post) => {
        setForm({
          title: post.title, excerpt: post.excerpt, content: post.content, category: post.category,
          tags: parseJsonArray(post.tags), seoTitle: post.seoTitle ?? "", seoDescription: post.seoDescription ?? "",
          seoKeywords: parseJsonArray(post.seoKeywords), readTimeMinutes: post.readTimeMinutes,
        })
        setPublished(post.published)
        setGeneratedByAI(post.generatedByAI)
      })
      .catch(() => enqueueSnackbar("Failed to load post", { variant: "error" }))
      .finally(() => setLoading(false))
  }, [id, enqueueSnackbar])

  const handleGenerate = async () => {
    if (!groq.topic.trim() || !groq.targetKeyword.trim()) {
      setGenError("Topic and primary keyword are required")
      return
    }
    setGenerating(true)
    setGenError("")
    try {
      const res = await fetch("/api/blog/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(groq),
      })
      if (!res.ok) {
        const err = await res.json().catch(() => ({}))
        throw new Error(err.error || "Generation failed")
      }
      const g: GeneratedBlog = await res.json()
      setForm({
        title: g.title, excerpt: g.excerpt, content: g.content, category: g.category, tags: g.tags,
        seoTitle: g.seoTitle, seoDescription: g.seoDescription, seoKeywords: g.seoKeywords, readTimeMinutes: g.readTimeMinutes,
      })
      setGeneratedByAI(true)
      setModalOpen(false)
      enqueueSnackbar("Draft generated — review before publishing", { variant: "success" })
    } catch (err) {
      setGenError(err instanceof Error ? err.message : "Generation failed")
    } finally {
      setGenerating(false)
    }
  }

  const handleSave = async (publish: boolean) => {
    if (!form.title.trim() || !form.content.trim()) {
      enqueueSnackbar("Title and content are required", { variant: "warning" })
      return
    }
    setSaving(true)
    try {
      const res = await fetch(id ? `/api/blog/${id}` : "/api/blog", {
        method: id ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          seoTitle: form.seoTitle || form.title,
          seoDescription: form.seoDescription || form.excerpt,
          published: publish,
          generatedByAI,
          ...(generatedByAI ? { aiModel: AI_MODEL } : {}),
        }),
      })
      if (!res.ok) throw new Error("Save failed")
      enqueueSnackbar(publish ? "Post published" : "Draft saved", { variant: "success" })
      router.push("/admin/blog")
      router.refresh()
    } catch {
      enqueueSnackbar("Failed to save post", { variant: "error" })
    } finally {
      setSaving(false)
    }
  }

  if (loading) return <Skeleton variant="rectangular" height={600} />

  return (
    <Box sx={{ maxWidth: 1100 }}>
      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2, alignItems: "center", justifyContent: "space-between", mb: 3 }}>
        <Typography variant="h4">{id ? "Edit Post" : "New Blog Post"}</Typography>
        {!id && (
          <Button variant="outlined" startIcon={<SmartToyIcon />} onClick={() => setModalOpen(true)}>Generate with Groq AI</Button>
        )}
      </Box>

      {generatedByAI && <Alert severity="success" sx={{ mb: 2 }}>{`Generated with Groq AI (${AI_MODEL}) · Review before publishing`}</Alert>}

      <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", md: "2fr 1fr" }, gap: 3 }}>
        <Card sx={{ p: 3, display: "flex", flexDirection: "column", gap: 2.5 }}>
          <TextField label="Title" value={form.title} onChange={(e) => set("title", e.target.value)} required fullWidth />
          <TextField label="Excerpt" value={form.excerpt} onChange={(e) => set("excerpt", e.target.value)} multiline rows={2} fullWidth />
          <TextField
            label="Content (Markdown)" value={form.content} onChange={(e) => set("content", e.target.value)}
            multiline rows={20} fullWidth slotProps={{ input: { sx: { fontFamily: "var(--font-mono)", fontSize: 13 } } }}
          />
        </Card>

        <Box sx={{ display: "flex", flexDirection: "column", gap: 2.5 }}>
          <Card sx={{ p: 2.5 }}>
            <Typography variant="h6" sx={{ mb: 2 }}>Publish</Typography>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
              <Button variant="outlined" fullWidth disabled={saving} onClick={() => handleSave(false)}>{published ? "Unpublish / Save Draft" : "Save Draft"}</Button>
              <Button variant="contained" fullWidth disabled={saving} onClick={() => handleSave(true)}>{published ? "Update" : "Publish"}</Button>
            </Box>
          </Card>

          <Card sx={{ p: 2.5, display: "flex", flexDirection: "column", gap: 2 }}>
            <Typography variant="h6">Settings</Typography>
            <TextField select label="Category" value={form.category} onChange={(e) => set("category", e.target.value)} fullWidth>
              {CATEGORIES.map((c) => <MenuItem key={c} value={c}>{c}</MenuItem>)}
            </TextField>
            <Autocomplete multiple freeSolo options={[]} value={form.tags} onChange={(_, v) => set("tags", v as string[])} renderInput={(params) => <TextField {...params} label="Tags" />} />
            <TextField type="number" label="Read Time (minutes)" value={form.readTimeMinutes} onChange={(e) => set("readTimeMinutes", Number(e.target.value))} fullWidth />
          </Card>

          <Card sx={{ p: 2.5, display: "flex", flexDirection: "column", gap: 2 }}>
            <Typography variant="h6">SEO</Typography>
            <TextField label="SEO Title" value={form.seoTitle} onChange={(e) => set("seoTitle", e.target.value)} fullWidth />
            <TextField label="Meta Description" value={form.seoDescription} onChange={(e) => set("seoDescription", e.target.value)} multiline rows={2} fullWidth />
            <Autocomplete multiple freeSolo options={[]} value={form.seoKeywords} onChange={(_, v) => set("seoKeywords", v as string[])} renderInput={(params) => <TextField {...params} label="Keywords" />} />
          </Card>
        </Box>
      </Box>

      <Dialog open={modalOpen} onClose={() => setModalOpen(false)} fullWidth maxWidth="sm">
        <DialogTitle>Generate with Groq AI</DialogTitle>
        <DialogContent>
          <Typography sx={{ color: brand.textSecondary, mb: 2 }}>{AI_MODEL} · SEO-optimised content in seconds</Typography>
          {genError && <Alert severity="error" sx={{ mb: 2 }}>{genError}</Alert>}
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2.5, mt: 1 }}>
            <TextField label="Topic" value={groq.topic} onChange={(e) => setGroq((p) => ({ ...p, topic: e.target.value }))} required fullWidth />
            <TextField label="Primary SEO Keyword" value={groq.targetKeyword} onChange={(e) => setGroq((p) => ({ ...p, targetKeyword: e.target.value }))} required fullWidth />
            <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" }, gap: 2 }}>
              <TextField select label="Audience" value={groq.audience} onChange={(e) => setGroq((p) => ({ ...p, audience: e.target.value }))} fullWidth>
                <MenuItem value="developers">Developers</MenuItem>
                <MenuItem value="business owners">Business Owners</MenuItem>
                <MenuItem value="students">Students</MenuItem>
                <MenuItem value="general">General</MenuItem>
              </TextField>
              <TextField select label="Tone" value={groq.tone} onChange={(e) => setGroq((p) => ({ ...p, tone: e.target.value as Tone }))} fullWidth>
                <MenuItem value="technical">Technical</MenuItem>
                <MenuItem value="conversational">Conversational</MenuItem>
                <MenuItem value="tutorial">Tutorial</MenuItem>
                <MenuItem value="opinion">Opinion</MenuItem>
              </TextField>
            </Box>
            <Box>
              <Typography sx={{ fontSize: 13, color: brand.textSecondary, mb: 1 }}>Word count: ~{groq.wordCount}</Typography>
              <Slider min={800} max={3000} step={100} value={groq.wordCount} onChange={(_, v) => setGroq((p) => ({ ...p, wordCount: v as number }))} valueLabelDisplay="auto" />
            </Box>
            <FormControlLabel
              control={<Switch checked={groq.includeCodeExamples} onChange={(e) => setGroq((p) => ({ ...p, includeCodeExamples: e.target.checked }))} />}
              label="Include code examples"
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setModalOpen(false)}>Cancel</Button>
          <Button variant="contained" onClick={handleGenerate} disabled={generating}>{generating ? "Generating…" : "Generate Post"}</Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
}
