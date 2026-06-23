"use client"

import { useState, type ReactNode } from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { signOut } from "next-auth/react"
import {
  Box, Drawer, AppBar, Toolbar, List, ListItemButton, ListItemIcon, ListItemText,
  IconButton, Button, Badge, useMediaQuery,
} from "@mui/material"
import { useTheme } from "@mui/material/styles"
import DashboardIcon from "@mui/icons-material/Dashboard"
import FolderIcon from "@mui/icons-material/Folder"
import EditIcon from "@mui/icons-material/Edit"
import BoltIcon from "@mui/icons-material/Bolt"
import WorkIcon from "@mui/icons-material/Work"
import GitHubIcon from "@mui/icons-material/GitHub"
import MailIcon from "@mui/icons-material/Mail"
import OpenInNewIcon from "@mui/icons-material/OpenInNew"
import LogoutIcon from "@mui/icons-material/Logout"
import MenuIcon from "@mui/icons-material/Menu"
import { brand } from "@/lib/theme"

const DRAWER_WIDTH = 240

interface Props {
  children: ReactNode
  unreadCount: number
}

export function AdminShell({ children, unreadCount }: Props) {
  const pathname = usePathname()
  const router = useRouter()
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down("md"))
  const [mobileOpen, setMobileOpen] = useState(false)

  const navItems = [
    { href: "/admin", label: "Dashboard", icon: <DashboardIcon /> },
    { href: "/admin/projects", label: "Projects", icon: <FolderIcon /> },
    { href: "/admin/blog", label: "Blog", icon: <EditIcon /> },
    { href: "/admin/skills", label: "Skills", icon: <BoltIcon /> },
    { href: "/admin/experience", label: "Experience", icon: <WorkIcon /> },
    { href: "/admin/github", label: "GitHub", icon: <GitHubIcon /> },
    { href: "/admin/messages", label: "Messages", icon: <MailIcon />, badge: unreadCount },
  ]

  const isSelected = (href: string) => (href === "/admin" ? pathname === "/admin" : pathname.startsWith(href))

  const drawerContent = (
    <Box sx={{ display: "flex", flexDirection: "column", height: "100%", bgcolor: brand.siderBg }}>
      <Box sx={{ height: 64, display: "flex", alignItems: "center", justifyContent: "center", borderBottom: `1px solid ${brand.borderSubtle}` }}>
        <span style={{ fontFamily: "var(--font-display)", fontSize: 24, fontWeight: 700, color: brand.primary, letterSpacing: "-0.05em" }}>
          RK · Admin
        </span>
      </Box>
      <List sx={{ flex: 1, py: 1 }}>
        {navItems.map((item) => (
          <ListItemButton
            key={item.href}
            component={Link}
            href={item.href}
            selected={isSelected(item.href)}
            onClick={() => setMobileOpen(false)}
            sx={{
              mx: 1,
              borderRadius: 1,
              "&.Mui-selected": { bgcolor: "rgba(230,180,80,0.18)", color: brand.primary },
              "&.Mui-selected .MuiListItemIcon-root": { color: brand.primary },
            }}
          >
            <ListItemIcon sx={{ minWidth: 38, color: brand.textSecondary }}>
              {item.badge ? (
                <Badge badgeContent={item.badge} color="error">
                  {item.icon}
                </Badge>
              ) : (
                item.icon
              )}
            </ListItemIcon>
            <ListItemText primary={item.label} />
          </ListItemButton>
        ))}
      </List>
    </Box>
  )

  return (
    <Box sx={{ display: "flex", minHeight: "100vh" }}>
      <AppBar
        position="fixed"
        elevation={0}
        sx={{
          width: { md: `calc(100% - ${DRAWER_WIDTH}px)` },
          ml: { md: `${DRAWER_WIDTH}px` },
          bgcolor: brand.bgBase,
          borderBottom: `1px solid ${brand.borderSubtle}`,
        }}
      >
        <Toolbar sx={{ justifyContent: "space-between" }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <IconButton edge="start" onClick={() => setMobileOpen(true)} sx={{ display: { md: "none" }, color: brand.text }}>
              <MenuIcon />
            </IconButton>
            <span style={{ fontFamily: "var(--font-mono)", fontSize: 12, color: brand.textSecondary, textTransform: "uppercase", letterSpacing: "0.12em" }}>
              Operations Console
            </span>
          </Box>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Button component={Link} href="/" target="_blank" color="inherit" startIcon={<OpenInNewIcon />} sx={{ display: { xs: "none", sm: "inline-flex" } }}>
              View Site
            </Button>
            <Button color="error" startIcon={<LogoutIcon />} onClick={() => signOut({ callbackUrl: "/admin/login" }).then(() => router.refresh())}>
              Log out
            </Button>
          </Box>
        </Toolbar>
      </AppBar>

      <Box component="nav" sx={{ width: { md: DRAWER_WIDTH }, flexShrink: { md: 0 } }}>
        <Drawer
          variant={isMobile ? "temporary" : "permanent"}
          open={isMobile ? mobileOpen : true}
          onClose={() => setMobileOpen(false)}
          ModalProps={{ keepMounted: true }}
          sx={{
            "& .MuiDrawer-paper": { width: DRAWER_WIDTH, boxSizing: "border-box", borderRight: `1px solid ${brand.borderSubtle}` },
          }}
        >
          {drawerContent}
        </Drawer>
      </Box>

      <Box component="main" sx={{ flexGrow: 1, width: { md: `calc(100% - ${DRAWER_WIDTH}px)` }, minWidth: 0 }}>
        <Toolbar />
        <Box sx={{ p: 3 }}>{children}</Box>
      </Box>
    </Box>
  )
}
