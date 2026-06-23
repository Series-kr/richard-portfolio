"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button, Drawer, IconButton, Box } from "@mui/material"
import MenuIcon from "@mui/icons-material/Menu"
import { brand } from "@/lib/theme"

const navLinks = [
  { href: "/#projects", label: "Work" },
  { href: "/#experience", label: "Experience" },
  { href: "/#stack", label: "Stack" },
  { href: "/blog", label: "Blog" },
  { href: "/#contact", label: "Contact" },
]

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  function isActive(href: string): boolean {
    if (!href.includes("#")) return pathname === href
    if (href.startsWith("/#")) return pathname === "/"
    return false
  }

  return (
    <header
      style={{
        position: "fixed",
        top: 0,
        width: "100%",
        zIndex: 50,
        transition: "all 0.3s ease",
        background: scrolled ? "rgba(10, 10, 10, 0.8)" : "transparent",
        backdropFilter: scrolled ? "blur(12px)" : "none",
        borderBottom: `1px solid ${scrolled ? brand.borderSubtle : "transparent"}`,
      }}
    >
      <nav
        aria-label="Main navigation"
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          height: 80,
          padding: "0 24px",
          maxWidth: 1200,
          margin: "0 auto",
        }}
      >
        <Link
          href="/"
          style={{
            fontFamily: "var(--font-display)",
            fontSize: 28,
            fontWeight: 700,
            color: brand.primary,
            letterSpacing: "-0.05em",
          }}
        >
          RK
        </Link>

        <Box sx={{ display: { xs: "none", md: "flex" }, alignItems: "center", gap: 4 }}>
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              style={{
                fontSize: 15,
                fontWeight: 500,
                color: isActive(link.href) ? brand.primary : brand.textSecondary,
                transition: "color 0.2s ease",
              }}
            >
              {link.label}
            </Link>
          ))}
          <Link href="/#contact">
            <Button variant="contained">Hire Me</Button>
          </Link>
        </Box>

        <Box sx={{ display: { xs: "inline-flex", md: "none" } }}>
          <IconButton aria-label="Open menu" onClick={() => setMenuOpen(true)} sx={{ color: brand.text }}>
            <MenuIcon />
          </IconButton>
        </Box>
      </nav>

      <Drawer anchor="right" open={menuOpen} onClose={() => setMenuOpen(false)}>
        <Box sx={{ width: 260, p: 3, display: "flex", flexDirection: "column", gap: 2.5, height: "100%" }}>
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              style={{ fontSize: 16, color: brand.text }}
            >
              {link.label}
            </Link>
          ))}
          <Link href="/#contact" onClick={() => setMenuOpen(false)}>
            <Button variant="contained" fullWidth>
              Hire Me
            </Button>
          </Link>
        </Box>
      </Drawer>
    </header>
  )
}
