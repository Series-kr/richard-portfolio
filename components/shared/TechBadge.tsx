"use client"

import { Tag } from "antd"
import { brand } from "@/lib/theme"

interface Props {
  name: string
  variant?: "default" | "primary" | "mono"
  small?: boolean
}

export function TechBadge({ name, variant = "default", small = false }: Props) {
  if (variant === "mono") {
    return (
      <span style={{ fontFamily: "var(--font-mono)", fontSize: 13, color: brand.textSecondary }}>{name}</span>
    )
  }

  const isPrimary = variant === "primary"
  return (
    <Tag
      style={{
        fontFamily: "var(--font-mono)",
        fontSize: small ? 11 : 12.5,
        padding: small ? "0 6px" : "1px 8px",
        margin: 0,
        borderRadius: 4,
        background: isPrimary ? "rgba(79, 70, 229, 0.12)" : "rgba(45, 55, 72, 0.45)",
        border: `1px solid ${isPrimary ? "rgba(79, 70, 229, 0.35)" : brand.border}`,
        color: isPrimary ? "#A5B4FC" : brand.text,
      }}
    >
      {name}
    </Tag>
  )
}
