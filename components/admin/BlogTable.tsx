"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Box, Button, Chip, IconButton, Typography, Dialog, DialogTitle, DialogActions } from "@mui/material"
import { DataGrid, type GridColDef } from "@mui/x-data-grid"
import EditIcon from "@mui/icons-material/Edit"
import OpenInNewIcon from "@mui/icons-material/OpenInNew"
import DeleteIcon from "@mui/icons-material/Delete"
import AddIcon from "@mui/icons-material/Add"
import { useSnackbar } from "notistack"
import type { BlogPost } from "@prisma/client"
import { formatDate } from "@/lib/utils"
import { brand } from "@/lib/theme"

export function BlogTable({ posts }: { posts: BlogPost[] }) {
  const router = useRouter()
  const { enqueueSnackbar } = useSnackbar()
  const [pendingDelete, setPendingDelete] = useState<BlogPost | null>(null)
  const [deleting, setDeleting] = useState(false)
  const published = posts.filter((p) => p.published).length

  const handleDelete = async () => {
    if (!pendingDelete) return
    setDeleting(true)
    try {
      const res = await fetch(`/api/blog/${pendingDelete.id}`, { method: "DELETE" })
      if (!res.ok) throw new Error()
      enqueueSnackbar("Post deleted", { variant: "success" })
      router.refresh()
    } catch {
      enqueueSnackbar("Failed to delete post", { variant: "error" })
    } finally {
      setDeleting(false)
      setPendingDelete(null)
    }
  }

  const columns: GridColDef<BlogPost>[] = [
    {
      field: "title",
      headerName: "Title",
      flex: 1.8,
      minWidth: 220,
      renderCell: (p) => (
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Typography sx={{ fontWeight: 600, color: brand.text, fontSize: 14 }}>{p.row.title}</Typography>
          {p.row.generatedByAI && <Chip label="AI" size="small" color="primary" variant="outlined" sx={{ height: 18, fontSize: 10 }} />}
        </Box>
      ),
    },
    { field: "category", headerName: "Category", flex: 0.8, minWidth: 120, renderCell: (p) => <Chip label={p.row.category} size="small" color="primary" variant="outlined" /> },
    { field: "published", headerName: "Status", flex: 0.7, minWidth: 110, renderCell: (p) => <Chip label={p.row.published ? "Published" : "Draft"} size="small" color={p.row.published ? "success" : "default"} variant="outlined" /> },
    { field: "views", headerName: "Views", flex: 0.5, minWidth: 80 },
    {
      field: "date",
      headerName: "Date",
      flex: 0.8,
      minWidth: 120,
      valueGetter: (_v, row) => (row.publishedAt ? formatDate(row.publishedAt) : formatDate(row.createdAt)),
    },
    {
      field: "actions",
      headerName: "Actions",
      flex: 1,
      minWidth: 150,
      sortable: false,
      filterable: false,
      renderCell: (p) => (
        <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
          <Button size="small" startIcon={<EditIcon />} component={Link} href={`/admin/blog/${p.row.id}`}>Edit</Button>
          {p.row.published && (
            <IconButton size="small" component={Link} href={`/blog/${p.row.slug}`} target="_blank"><OpenInNewIcon fontSize="small" /></IconButton>
          )}
          <IconButton size="small" color="error" onClick={() => setPendingDelete(p.row)}><DeleteIcon fontSize="small" /></IconButton>
        </Box>
      ),
    },
  ]

  return (
    <Box>
      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2, alignItems: "center", justifyContent: "space-between", mb: 4 }}>
        <Box>
          <Typography variant="h4">Blog Posts</Typography>
          <Typography sx={{ fontSize: 14, color: brand.textSecondary, mt: 0.5 }}>{published} published · {posts.length - published} drafts</Typography>
        </Box>
        <Button variant="contained" startIcon={<AddIcon />} component={Link} href="/admin/blog/new">New Post</Button>
      </Box>

      <DataGrid
        rows={posts}
        columns={columns}
        initialState={{ pagination: { paginationModel: { pageSize: 10 } } }}
        pageSizeOptions={[10, 25, 50]}
        disableRowSelectionOnClick
        sx={{ border: `1px solid ${brand.border}` }}
      />

      <Dialog open={!!pendingDelete} onClose={() => setPendingDelete(null)}>
        <DialogTitle>Delete this post?</DialogTitle>
        <DialogActions>
          <Button onClick={() => setPendingDelete(null)}>Cancel</Button>
          <Button color="error" variant="contained" onClick={handleDelete} disabled={deleting}>Delete</Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
}
