"use client"

import { Chip } from "@mui/material"
import { brand } from "@/lib/theme"

interface Props {
  name: string
  variant?: "default" | "primary" | "mono"
  small?: boolean
}

export function TechBadge({ name, variant = "default", small = false }: Props) {
  if (variant === "mono") {
    return <span style={{ fontFamily: "var(--font-mono)", fontSize: 13, color: brand.textSecondary }}>{name}</span>
  }

  const isPrimary = variant === "primary"
  return (
    <Chip
      label={name}
      size="small"
      sx={{
        fontFamily: "var(--font-mono)",
        fontSize: small ? 11 : 12.5,
        height: small ? 22 : 26,
        borderRadius: "4px",
        bgcolor: isPrimary ? "rgba(230, 180, 80, 0.14)" : "rgba(63, 63, 70, 0.4)",
        border: `1px solid ${isPrimary ? "rgba(230, 180, 80, 0.4)" : brand.border}`,
        color: isPrimary ? brand.primarySoft : brand.text,
      }}
    />
  )
}
