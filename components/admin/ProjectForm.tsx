"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import {
  Box, Card, TextField, MenuItem, Button, Switch, FormControlLabel, Autocomplete,
  Typography, Skeleton, Dialog, DialogTitle, DialogActions,
} from "@mui/material"
import { useSnackbar } from "notistack"
import { parseJsonArray } from "@/lib/utils"
import { brand } from "@/lib/theme"

const CATEGORIES = ["SaaS", "EdTech", "AI", "Business", "Mobile"]

interface ProjectValues {
  title: string
  shortDesc: string
  problem: string
  solution: string
  impact: string
  techStack: string[]
  category: string
  featured: boolean
  order: number
  githubUrl: string
  liveUrl: string
  status: "published" | "draft"
}

const initialValues: ProjectValues = {
  title: "", shortDesc: "", problem: "", solution: "", impact: "", techStack: [],
  category: "SaaS", featured: false, order: 0, githubUrl: "", liveUrl: "", status: "published",
}

export function ProjectForm({ id }: { id?: string }) {
  const router = useRouter()
  const { enqueueSnackbar } = useSnackbar()
  const [form, setForm] = useState<ProjectValues>(initialValues)
  const [loading, setLoading] = useState(Boolean(id))
  const [saving, setSaving] = useState(false)
  const [confirmDelete, setConfirmDelete] = useState(false)
  const [titleError, setTitleError] = useState(false)

  const set = <K extends keyof ProjectValues>(key: K, value: ProjectValues[K]) => setForm((p) => ({ ...p, [key]: value }))

  useEffect(() => {
    if (!id) return
    fetch(`/api/projects/${id}`)
      .then((r) => r.json())
      .then((p) => {
        setForm({
          title: p.title, shortDesc: p.shortDesc, problem: p.problem, solution: p.solution, impact: p.impact,
          techStack: parseJsonArray(p.techStack), category: p.category, featured: p.featured, order: p.order,
          githubUrl: p.githubUrl ?? "", liveUrl: p.liveUrl ?? "", status: p.status,
        })
      })
      .catch(() => enqueueSnackbar("Failed to load project", { variant: "error" }))
      .finally(() => setLoading(false))
  }, [id, enqueueSnackbar])

  const handleSave = async () => {
    if (!form.title.trim()) {
      setTitleError(true)
      return
    }
    setSaving(true)
    try {
      const res = await fetch(id ? `/api/projects/${id}` : "/api/projects", {
        method: id ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      })
      if (!res.ok) {
        const err = await res.json().catch(() => ({}))
        throw new Error(err?.error ?? "Save failed")
      }
      enqueueSnackbar(id ? "Project updated" : "Project created", { variant: "success" })
      router.push("/admin/projects")
      router.refresh()
    } catch (e) {
      enqueueSnackbar(e instanceof Error ? e.message : "Save failed. Check for duplicate title/slug.", { variant: "error" })
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async () => {
    if (!id) return
    try {
      await fetch(`/api/projects/${id}`, { method: "DELETE" })
      enqueueSnackbar("Project deleted", { variant: "success" })
      router.push("/admin/projects")
      router.refresh()
    } catch {
      enqueueSnackbar("Failed to delete", { variant: "error" })
    }
  }

  if (loading) return <Skeleton variant="rectangular" height={500} />

  return (
    <Box sx={{ maxWidth: 820 }}>
      <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: 3 }}>
        <Typography variant="h4">{id ? "Edit Project" : "New Project"}</Typography>
        <Box sx={{ display: "flex", gap: 1.5 }}>
          {id && <Button color="error" variant="outlined" onClick={() => setConfirmDelete(true)}>Delete</Button>}
          <Button variant="contained" disabled={saving} onClick={handleSave}>{id ? "Save" : "Save Project"}</Button>
        </Box>
      </Box>

      <Card sx={{ p: 3, display: "flex", flexDirection: "column", gap: 2.5 }}>
        <TextField label="Title" value={form.title} onChange={(e) => { set("title", e.target.value); setTitleError(false) }} error={titleError} helperText={titleError ? "Title is required" : ""} required fullWidth />
        <TextField label="Short Description" value={form.shortDesc} onChange={(e) => set("shortDesc", e.target.value)} multiline rows={2} fullWidth />
        <TextField label="Problem" value={form.problem} onChange={(e) => set("problem", e.target.value)} multiline rows={3} fullWidth />
        <TextField label="Solution" value={form.solution} onChange={(e) => set("solution", e.target.value)} multiline rows={3} fullWidth />
        <TextField label="Impact / Results" value={form.impact} onChange={(e) => set("impact", e.target.value)} multiline rows={3} fullWidth />
        <Autocomplete
          multiple freeSolo options={[]} value={form.techStack}
          onChange={(_, v) => set("techStack", v as string[])}
          renderInput={(params) => <TextField {...params} label="Tech Stack" placeholder="Add technology…" />}
        />
        <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" }, gap: 2.5 }}>
          <TextField select label="Category" value={form.category} onChange={(e) => set("category", e.target.value)} fullWidth>
            {CATEGORIES.map((c) => <MenuItem key={c} value={c}>{c}</MenuItem>)}
          </TextField>
          <TextField select label="Status" value={form.status} onChange={(e) => set("status", e.target.value as "published" | "draft")} fullWidth>
            <MenuItem value="published">Published</MenuItem>
            <MenuItem value="draft">Draft</MenuItem>
          </TextField>
        </Box>
        <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" }, gap: 2.5 }}>
          <TextField label="GitHub URL" value={form.githubUrl} onChange={(e) => set("githubUrl", e.target.value)} fullWidth />
          <TextField label="Live URL" value={form.liveUrl} onChange={(e) => set("liveUrl", e.target.value)} fullWidth />
        </Box>
        <FormControlLabel control={<Switch checked={form.featured} onChange={(e) => set("featured", e.target.checked)} />} label="Featured project" />
      </Card>

      <Dialog open={confirmDelete} onClose={() => setConfirmDelete(false)}>
        <DialogTitle>Delete this project?</DialogTitle>
        <DialogActions>
          <Button onClick={() => setConfirmDelete(false)}>Cancel</Button>
          <Button color="error" variant="contained" onClick={handleDelete}>Delete</Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
}
