"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { signOut } from "next-auth/react"

const navItems = [
  { href: "/admin", label: "Dashboard", icon: "⊞" },
  { href: "/admin/projects", label: "Projects", icon: "📁" },
  { href: "/admin/blog", label: "Blog Posts", icon: "✍️" },
  { href: "/admin/skills", label: "Skills", icon: "⚡" },
  { href: "/admin/experience", label: "Experience", icon: "💼" },
  { href: "/admin/github", label: "GitHub Sync", icon: "⌘" },
]

export function AdminSidebar() {
  const pathname = usePathname()

  return (
    <aside className="w-64 bg-[#091421] border-r border-[#1C2330] flex flex-col min-h-screen">
      <div className="p-6 border-b border-[#1C2330]">
        <Link
          href="/"
          className="font-[family-name:var(--font-syne)] text-2xl font-bold text-[#45f1c3] tracking-tighter"
        >
          RK
        </Link>
        <p className="font-[family-name:var(--font-mono)] text-[11px] text-[#bacac2] mt-1 uppercase tracking-widest">
          Admin Panel
        </p>
      </div>

      <nav className="flex-1 py-4">
        {navItems.map((item) => {
          const isActive =
            item.href === "/admin"
              ? pathname === "/admin"
              : pathname.startsWith(item.href)

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-6 py-3 font-[family-name:var(--font-dm-sans)] text-[14px] transition-all duration-200 ${
                isActive
                  ? "text-[#45f1c3] bg-[#45f1c3]/10 border-r-2 border-[#45f1c3]"
                  : "text-[#bacac2] hover:text-[#d9e3f7] hover:bg-[#16202e]"
              }`}
            >
              <span className="text-base">{item.icon}</span>
              {item.label}
            </Link>
          )
        })}
      </nav>

      <div className="p-6 border-t border-[#1C2330] space-y-2">
        <Link
          href="/"
          target="_blank"
          className="flex items-center gap-2 font-[family-name:var(--font-dm-sans)] text-[14px] text-[#bacac2] hover:text-[#45f1c3] transition-colors"
        >
          <span>↗</span> View Site
        </Link>
        <button
          onClick={() => signOut({ callbackUrl: "/admin/login" })}
          className="flex items-center gap-2 font-[family-name:var(--font-dm-sans)] text-[14px] text-[#bacac2] hover:text-[#ffb4ab] transition-colors w-full"
        >
          <span>⊕</span> Sign Out
        </button>
      </div>
    </aside>
  )
}
