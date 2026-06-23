"use client"

import Link from "next/link"
import { Box, Card, Typography, Chip } from "@mui/material"
import FolderIcon from "@mui/icons-material/Folder"
import EditIcon from "@mui/icons-material/Edit"
import MailIcon from "@mui/icons-material/Mail"
import BoltIcon from "@mui/icons-material/Bolt"
import WorkIcon from "@mui/icons-material/Work"
import GitHubIcon from "@mui/icons-material/GitHub"
import { brand } from "@/lib/theme"
import type { ContactMessage } from "@prisma/client"

interface Props {
  counts: { projects: number; posts: number; messages: number; skills: number; experiences: number; repos: number }
  recentMessages: ContactMessage[]
}

export function DashboardView({ counts, recentMessages }: Props) {
  const statCards = [
    { label: "Projects", value: counts.projects, href: "/admin/projects", icon: <FolderIcon fontSize="small" /> },
    { label: "Blog Posts", value: counts.posts, href: "/admin/blog", icon: <EditIcon fontSize="small" /> },
    { label: "Unread Messages", value: counts.messages, href: "/admin/messages", icon: <MailIcon fontSize="small" /> },
    { label: "Skills", value: counts.skills, href: "/admin/skills", icon: <BoltIcon fontSize="small" /> },
    { label: "Experience", value: counts.experiences, href: "/admin/experience", icon: <WorkIcon fontSize="small" /> },
    { label: "GitHub Repos", value: counts.repos, href: "/admin/github", icon: <GitHubIcon fontSize="small" /> },
  ]

  return (
    <Box>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" sx={{ color: brand.text }}>Dashboard</Typography>
        <Typography sx={{ fontSize: 14, color: brand.textSecondary, mt: 0.5 }}>
          Welcome back, Richard. Here&apos;s an overview of your portfolio.
        </Typography>
      </Box>

      <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr 1fr", md: "repeat(3, 1fr)" }, gap: 2, mb: 4 }}>
        {statCards.map((card) => (
          <Card key={card.label} component={Link} href={card.href} sx={{ p: 3, textDecoration: "none", transition: "border-color 0.2s", "&:hover": { borderColor: brand.primary } }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1, color: brand.textSecondary, mb: 1 }}>
              {card.icon}
              <Typography sx={{ fontFamily: "var(--font-mono)", fontSize: 11, textTransform: "uppercase", letterSpacing: "0.1em" }}>{card.label}</Typography>
            </Box>
            <Typography sx={{ fontFamily: "var(--font-mono)", fontSize: 32, fontWeight: 700, color: brand.primary }}>{card.value}</Typography>
          </Card>
        ))}
      </Box>

      <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" }, gap: 3 }}>
        <Card sx={{ p: 3 }}>
          <Typography variant="h6" sx={{ mb: 2 }}>Quick Actions</Typography>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
            {[
              { href: "/admin/blog/new", label: "Write New Blog Post" },
              { href: "/admin/projects/new", label: "Add New Project" },
              { href: "/admin/github", label: "Sync GitHub Repos" },
            ].map((action) => (
              <Box key={action.href} component={Link} href={action.href} sx={{ display: "block", p: 1.5, borderRadius: 1, border: `1px solid ${brand.border}`, color: brand.text, fontSize: 14, textDecoration: "none", "&:hover": { borderColor: brand.primary } }}>
                {action.label}
              </Box>
            ))}
          </Box>
        </Card>

        <Card sx={{ p: 3 }}>
          <Typography variant="h6" sx={{ mb: 2 }}>Recent Messages</Typography>
          {recentMessages.length === 0 ? (
            <Typography sx={{ color: brand.textSecondary, fontSize: 14 }}>No messages yet.</Typography>
          ) : (
            <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
              {recentMessages.map((msg) => (
                <Box key={msg.id} sx={{ p: 1.5, borderRadius: 1, border: `1px solid ${brand.border}` }}>
                  <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: 0.5 }}>
                    <Typography sx={{ fontSize: 14, fontWeight: 600, color: brand.text }}>{msg.name}</Typography>
                    {!msg.read && <Chip label="New" size="small" color="primary" variant="outlined" sx={{ height: 20, fontSize: 10 }} />}
                  </Box>
                  <Typography sx={{ fontSize: 12, color: brand.textSecondary }}>{msg.subject}</Typography>
                  <Typography sx={{ fontFamily: "var(--font-mono)", fontSize: 11, color: brand.textMuted, mt: 0.5 }}>{msg.email}</Typography>
                </Box>
              ))}
            </Box>
          )}
        </Card>
      </Box>
    </Box>
  )
}
