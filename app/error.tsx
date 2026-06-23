"use client"

import { useEffect } from "react"
import Link from "next/link"
import { Button } from "@mui/material"
import { brand } from "@/lib/theme"

interface Props {
  error: Error & { digest?: string }
  reset: () => void
}

export default function GlobalError({ error, reset }: Props) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="grid-bg" style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", padding: 24 }}>
      <div style={{ textAlign: "center", maxWidth: 520 }}>
        <div style={{ fontFamily: "var(--font-display)", fontSize: 80, fontWeight: 700, color: "#F87171", lineHeight: 1, marginBottom: 16, letterSpacing: "-0.04em" }}>
          Oops
        </div>
        <h1 style={{ fontFamily: "var(--font-display)", fontSize: 28, fontWeight: 700, color: brand.text, marginBottom: 16 }}>
          Something went wrong
        </h1>
        <p style={{ fontSize: 16, color: brand.textSecondary, marginBottom: 32, lineHeight: 1.7 }}>
          An unexpected error occurred. This has been noted. Try refreshing or come back later.
        </p>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 16 }}>
          <Button variant="contained" size="large" onClick={reset}>Try Again</Button>
          <Link href="/">
            <Button variant="outlined" size="large" sx={{ borderColor: brand.border, color: brand.text }}>Go Home</Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
