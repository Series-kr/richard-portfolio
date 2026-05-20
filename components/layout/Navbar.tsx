"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faBars, faXmark } from "@fortawesome/free-solid-svg-icons"

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
    // Exact match for non-hash routes (e.g. /blog)
    if (!href.includes("#")) return pathname === href
    // Hash links on home page: active when on "/"
    if (href.startsWith("/#")) return pathname === "/"
    return false
  }

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#080B10]/90 backdrop-blur-md border-b border-[#1C2330]/60"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      <nav className="flex justify-between items-center h-20 px-6 md:px-8 max-w-[1200px] mx-auto" aria-label="Main navigation">
        <Link
          href="/"
          className="font-[family-name:var(--font-syne)] text-3xl font-bold text-[#45f1c3] tracking-tighter hover:opacity-80 transition-opacity"
        >
          RK
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`font-[family-name:var(--font-dm-sans)] text-[16px] font-medium transition-colors duration-300 ${
                isActive(link.href)
                  ? "text-[#45f1c3] font-bold"
                  : "text-[#bacac2] hover:text-[#45f1c3]"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        <Link
          href="/#contact"
          className="hidden md:inline-flex items-center gap-2 bg-[#00d4a8] text-[#00382a] px-5 py-2 rounded-lg font-[family-name:var(--font-dm-sans)] font-bold text-[15px] hover:shadow-[0_0_30px_rgba(0,212,168,0.3)] active:scale-95 transition-all duration-200"
        >
          Hire Me
        </Link>

        {/* Mobile menu button */}
        <button
          type="button"
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden text-[#d9e3f7] w-10 h-10 flex items-center justify-center rounded-lg hover:bg-[#1C2330] transition-colors"
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
        >
          <FontAwesomeIcon icon={menuOpen ? faXmark : faBars} className="w-5 h-5" />
        </button>
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <div id="mobile-menu" className="md:hidden bg-[#0F1318] border-b border-[#1C2330] px-6 py-6 flex flex-col gap-4">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="font-[family-name:var(--font-dm-sans)] text-[16px] text-[#d9e3f7] hover:text-[#45f1c3] transition-colors py-1"
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/#contact"
            onClick={() => setMenuOpen(false)}
            className="bg-[#00d4a8] text-[#00382a] px-6 py-2.5 rounded-lg font-bold text-center font-[family-name:var(--font-dm-sans)]"
          >
            Hire Me
          </Link>
        </div>
      )}
    </header>
  )
}
