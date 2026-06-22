"use client"

import Link from "next/link"
import { Button } from "antd"
import { brand } from "@/lib/theme"

export default function NotFound() {
  return (
    <div className="grid-bg" style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", padding: 24 }}>
      <div style={{ textAlign: "center", maxWidth: 520 }}>
        <div style={{ fontFamily: "var(--font-display)", fontSize: 120, fontWeight: 700, color: brand.primary, lineHeight: 1, marginBottom: 16, letterSpacing: "-0.04em" }}>
          404
        </div>
        <h1 style={{ fontFamily: "var(--font-display)", fontSize: 28, fontWeight: 700, color: brand.text, marginBottom: 16 }}>
          Page not found
        </h1>
        <p style={{ fontSize: 16, color: brand.textSecondary, marginBottom: 32, lineHeight: 1.7 }}>
          This page doesn&apos;t exist or may have been moved. Let&apos;s get you back on track.
        </p>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 16 }}>
          <Link href="/">
            <Button type="primary" size="large">Go Home</Button>
          </Link>
          <Link href="/projects">
            <Button size="large" style={{ borderColor: brand.border }}>View Projects</Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
