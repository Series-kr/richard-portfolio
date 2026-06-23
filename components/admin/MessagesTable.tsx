"use client"

import { useState } from "react"
import { Box, Chip, Typography, Dialog, DialogTitle, DialogContent, Divider } from "@mui/material"
import { DataGrid, type GridColDef } from "@mui/x-data-grid"
import type { ContactMessage } from "@prisma/client"
import { formatDate } from "@/lib/utils"
import { brand } from "@/lib/theme"

export function MessagesTable({ messages }: { messages: ContactMessage[] }) {
  const [selected, setSelected] = useState<ContactMessage | null>(null)

  const columns: GridColDef<ContactMessage>[] = [
    {
      field: "name",
      headerName: "From",
      flex: 1,
      minWidth: 180,
      renderCell: (p) => (
        <Box sx={{ lineHeight: 1.3, py: 1 }}>
          <Typography sx={{ fontWeight: 600, color: brand.text, fontSize: 14 }}>{p.row.name}</Typography>
          <Typography sx={{ fontFamily: "var(--font-mono)", fontSize: 12, color: brand.textMuted }}>{p.row.email}</Typography>
        </Box>
      ),
    },
    { field: "subject", headerName: "Subject", flex: 1, minWidth: 160 },
    { field: "createdAt", headerName: "Date", flex: 0.7, minWidth: 120, valueGetter: (_v, row) => formatDate(row.createdAt) },
    {
      field: "read",
      headerName: "Status",
      flex: 0.5,
      minWidth: 100,
      renderCell: (p) => <Chip label={p.row.read ? "Read" : "New"} size="small" color={p.row.read ? "default" : "primary"} variant="outlined" />,
    },
  ]

  const unread = messages.filter((m) => !m.read).length

  return (
    <Box>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4">Messages</Typography>
        <Typography sx={{ fontSize: 14, color: brand.textSecondary, mt: 0.5 }}>{unread} unread · {messages.length} total</Typography>
      </Box>

      <DataGrid
        rows={messages}
        columns={columns}
        getRowHeight={() => "auto"}
        onRowClick={(p) => setSelected(p.row as ContactMessage)}
        initialState={{ pagination: { paginationModel: { pageSize: 12 } }, sorting: { sortModel: [{ field: "createdAt", sort: "desc" }] } }}
        pageSizeOptions={[12, 25, 50]}
        disableRowSelectionOnClick
        sx={{ border: `1px solid ${brand.border}`, "& .MuiDataGrid-row": { cursor: "pointer" }, "& .MuiDataGrid-cell": { display: "flex", alignItems: "center" } }}
      />

      <Dialog open={!!selected} onClose={() => setSelected(null)} fullWidth maxWidth="sm">
        <DialogTitle>{selected?.subject}</DialogTitle>
        <DialogContent>
          <Typography sx={{ fontSize: 14, color: brand.textSecondary }}>{selected?.name} · {selected?.email}</Typography>
          <Typography sx={{ fontFamily: "var(--font-mono)", fontSize: 12, color: brand.textMuted, mb: 2 }}>
            {selected ? formatDate(selected.createdAt) : ""}
          </Typography>
          <Divider sx={{ mb: 2, borderColor: brand.border }} />
          <Typography sx={{ whiteSpace: "pre-wrap", color: brand.text }}>{selected?.message}</Typography>
        </DialogContent>
      </Dialog>
    </Box>
  )
}
