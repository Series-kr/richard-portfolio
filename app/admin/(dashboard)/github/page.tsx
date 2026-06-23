"use client"

import { useState, useEffect } from "react"
import { Box, Button, Switch, Chip, Alert, Typography } from "@mui/material"
import { DataGrid, type GridColDef } from "@mui/x-data-grid"
import SyncIcon from "@mui/icons-material/Sync"
import StarIcon from "@mui/icons-material/Star"
import { useSnackbar } from "notistack"
import { brand } from "@/lib/theme"

interface Repo {
  id: string
  repoId: number
  name: string
  description: string | null
  language: string | null
  stars: number
  forks: number
  showOnSite: boolean
  pinned: boolean
  url: string
}

export default function AdminGithubPage() {
  const { enqueueSnackbar } = useSnackbar()
  const [repos, setRepos] = useState<Repo[]>([])
  const [syncing, setSyncing] = useState(false)
  const [syncResult, setSyncResult] = useState<{ synced: number; total: number } | null>(null)
  const [loading, setLoading] = useState(true)

  const loadRepos = async () => {
    try {
      const data = await fetch("/api/github/repos").then((r) => r.json())
      if (Array.isArray(data)) setRepos(data)
    } catch {
      /* ignore */
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadRepos()
  }, [])

  const handleSync = async () => {
    setSyncing(true)
    setSyncResult(null)
    try {
      const res = await fetch("/api/github/sync", { method: "POST" })
      const result = await res.json()
      setSyncResult(result)
      await loadRepos()
      enqueueSnackbar(`Synced ${result.synced} of ${result.total} repos`, { variant: "success" })
    } catch {
      enqueueSnackbar("Sync failed", { variant: "error" })
    } finally {
      setSyncing(false)
    }
  }

  const toggleRepo = async (id: string, field: "showOnSite" | "pinned", value: boolean) => {
    setRepos((prev) => prev.map((r) => (r.id === id ? { ...r, [field]: value } : r)))
    try {
      await fetch(`/api/github/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ [field]: value }),
      })
    } catch {
      setRepos((prev) => prev.map((r) => (r.id === id ? { ...r, [field]: !value } : r)))
      enqueueSnackbar("Update failed", { variant: "error" })
    }
  }

  const columns: GridColDef<Repo>[] = [
    {
      field: "name",
      headerName: "Repository",
      flex: 1.6,
      minWidth: 220,
      renderCell: (p) => (
        <Box sx={{ lineHeight: 1.3, py: 1 }}>
          <a href={p.row.url} target="_blank" rel="noopener noreferrer" style={{ fontWeight: 600, color: brand.text }}>{p.row.name}</a>
          {p.row.description && <Typography sx={{ fontSize: 12, color: brand.textMuted }}>{p.row.description}</Typography>}
        </Box>
      ),
    },
    { field: "language", headerName: "Language", flex: 0.7, minWidth: 110, renderCell: (p) => (p.row.language ? <Chip label={p.row.language} size="small" /> : <span style={{ color: brand.textMuted }}>—</span>) },
    {
      field: "stars",
      headerName: "Stars",
      flex: 0.5,
      minWidth: 90,
      renderCell: (p) => (
        <span style={{ fontFamily: "var(--font-mono)", display: "inline-flex", alignItems: "center", gap: 4 }}>
          <StarIcon sx={{ color: "#F5A623", fontSize: 16 }} /> {p.row.stars}
        </span>
      ),
    },
    { field: "showOnSite", headerName: "Show on Site", flex: 0.7, minWidth: 120, sortable: false, renderCell: (p) => <Switch checked={p.row.showOnSite} onChange={(e) => toggleRepo(p.row.id, "showOnSite", e.target.checked)} /> },
    { field: "pinned", headerName: "Pinned", flex: 0.5, minWidth: 90, sortable: false, renderCell: (p) => <Switch checked={p.row.pinned} onChange={(e) => toggleRepo(p.row.id, "pinned", e.target.checked)} /> },
  ]

  return (
    <Box>
      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2, alignItems: "center", justifyContent: "space-between", mb: 4 }}>
        <Box>
          <Typography variant="h4">GitHub Sync</Typography>
          <Typography sx={{ fontSize: 14, color: brand.textSecondary, mt: 0.5 }}>Manage which repositories show on your portfolio.</Typography>
        </Box>
        <Button variant="contained" startIcon={<SyncIcon className={syncing ? "spin" : undefined} />} disabled={syncing} onClick={handleSync}>
          {syncing ? "Syncing…" : "Sync from GitHub"}
        </Button>
      </Box>

      {syncResult && <Alert severity="success" sx={{ mb: 2 }}>{`Synced ${syncResult.synced} of ${syncResult.total} repos`}</Alert>}

      <DataGrid
        rows={repos}
        columns={columns}
        loading={loading}
        getRowHeight={() => "auto"}
        initialState={{ pagination: { paginationModel: { pageSize: 12 } } }}
        pageSizeOptions={[12, 25, 50]}
        disableRowSelectionOnClick
        sx={{ border: `1px solid ${brand.border}`, "& .MuiDataGrid-cell": { display: "flex", alignItems: "center" } }}
      />
    </Box>
  )
}
