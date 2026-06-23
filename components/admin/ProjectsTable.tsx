"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Box, Button, Chip, IconButton, Typography, Dialog, DialogTitle, DialogActions } from "@mui/material"
import { DataGrid, type GridColDef } from "@mui/x-data-grid"
import EditIcon from "@mui/icons-material/Edit"
import OpenInNewIcon from "@mui/icons-material/OpenInNew"
import DeleteIcon from "@mui/icons-material/Delete"
import StarIcon from "@mui/icons-material/Star"
import AddIcon from "@mui/icons-material/Add"
import { useSnackbar } from "notistack"
import type { Project } from "@prisma/client"
import { brand } from "@/lib/theme"

export function ProjectsTable({ projects }: { projects: Project[] }) {
  const router = useRouter()
  const { enqueueSnackbar } = useSnackbar()
  const [pendingDelete, setPendingDelete] = useState<Project | null>(null)
  const [deleting, setDeleting] = useState(false)

  const handleDelete = async () => {
    if (!pendingDelete) return
    setDeleting(true)
    try {
      const res = await fetch(`/api/projects/${pendingDelete.id}`, { method: "DELETE" })
      if (!res.ok) throw new Error()
      enqueueSnackbar("Project deleted", { variant: "success" })
      router.refresh()
    } catch {
      enqueueSnackbar("Failed to delete project", { variant: "error" })
    } finally {
      setDeleting(false)
      setPendingDelete(null)
    }
  }

  const columns: GridColDef<Project>[] = [
    {
      field: "title",
      headerName: "Title",
      flex: 1.6,
      minWidth: 200,
      renderCell: (p) => (
        <Box sx={{ lineHeight: 1.3, py: 1 }}>
          <Typography sx={{ fontWeight: 600, color: brand.text, fontSize: 14 }}>{p.row.title}</Typography>
          <Typography sx={{ fontFamily: "var(--font-mono)", fontSize: 12, color: brand.textMuted }}>/{p.row.slug}</Typography>
        </Box>
      ),
    },
    { field: "category", headerName: "Category", flex: 0.8, minWidth: 120, renderCell: (p) => <Chip label={p.row.category} size="small" color="primary" variant="outlined" /> },
    {
      field: "featured",
      headerName: "Featured",
      flex: 0.6,
      minWidth: 90,
      renderCell: (p) => (p.row.featured ? <StarIcon sx={{ color: "#F5A623", fontSize: 18 }} /> : <span style={{ color: brand.textMuted }}>—</span>),
    },
    { field: "status", headerName: "Status", flex: 0.7, minWidth: 110, renderCell: (p) => <Chip label={p.row.status} size="small" color={p.row.status === "published" ? "success" : "default"} variant="outlined" /> },
    {
      field: "actions",
      headerName: "Actions",
      flex: 1,
      minWidth: 150,
      sortable: false,
      filterable: false,
      renderCell: (p) => (
        <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
          <Button size="small" startIcon={<EditIcon />} component={Link} href={`/admin/projects/${p.row.id}`}>Edit</Button>
          <IconButton size="small" component={Link} href={`/projects/${p.row.slug}`} target="_blank"><OpenInNewIcon fontSize="small" /></IconButton>
          <IconButton size="small" color="error" onClick={() => setPendingDelete(p.row)}><DeleteIcon fontSize="small" /></IconButton>
        </Box>
      ),
    },
  ]

  return (
    <Box>
      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2, alignItems: "center", justifyContent: "space-between", mb: 4 }}>
        <Box>
          <Typography variant="h4">Projects</Typography>
          <Typography sx={{ fontSize: 14, color: brand.textSecondary, mt: 0.5 }}>{projects.length} projects in database</Typography>
        </Box>
        <Button variant="contained" startIcon={<AddIcon />} component={Link} href="/admin/projects/new">New Project</Button>
      </Box>

      <DataGrid
        rows={projects}
        columns={columns}
        getRowHeight={() => "auto"}
        initialState={{ pagination: { paginationModel: { pageSize: 10 } } }}
        pageSizeOptions={[10, 25, 50]}
        disableRowSelectionOnClick
        sx={{ border: `1px solid ${brand.border}`, "& .MuiDataGrid-cell": { display: "flex", alignItems: "center" } }}
      />

      <Dialog open={!!pendingDelete} onClose={() => setPendingDelete(null)}>
        <DialogTitle>Delete &ldquo;{pendingDelete?.title}&rdquo;?</DialogTitle>
        <DialogActions>
          <Button onClick={() => setPendingDelete(null)}>Cancel</Button>
          <Button color="error" variant="contained" onClick={handleDelete} disabled={deleting}>Delete</Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
}
