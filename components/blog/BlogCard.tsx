"use client"

import Link from "next/link"
import { Card, Tag } from "antd"
import { formatDate, parseJsonArray } from "@/lib/utils"
import { brand } from "@/lib/theme"
import type { BlogPost } from "@prisma/client"

interface Props {
  post: BlogPost
  variant?: "default" | "featured"
}

const categoryAccent: Record<string, string> = {
  Architecture: brand.primary,
  AI: "#F5A623",
  DevOps: "#10B981",
  Engineering: brand.primary,
  Career: "#F5A623",
}

export function BlogCard({ post }: Props) {
  const accent = categoryAccent[post.category] ?? brand.primary
  const tags = parseJsonArray(post.tags)

  return (
    <Link href={`/blog/${post.slug}`} style={{ display: "block", height: "100%" }}>
      <Card
        variant="outlined"
        hoverable
        style={{ height: "100%", borderTop: `3px solid ${accent}`, borderColor: brand.border }}
        styles={{ body: { padding: 28 } }}
      >
        <span style={{ fontFamily: "var(--font-mono)", fontSize: 11, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.1em", color: accent }}>
          {post.category}
        </span>

        <h3 style={{ fontSize: 18, fontWeight: 600, color: brand.text, margin: "16px 0 20px", lineHeight: 1.4 }}>{post.title}</h3>

        <p style={{ fontSize: 14, color: brand.textSecondary, marginBottom: 28, lineHeight: 1.6 }}>{post.excerpt}</p>

        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12, color: brand.textMuted, fontFamily: "var(--font-mono)", fontSize: 13 }}>
            <span>{post.publishedAt ? formatDate(post.publishedAt) : "Draft"}</span>
            <span>•</span>
            <span>{post.readTimeMinutes} min read</span>
          </div>
          {post.generatedByAI && (
            <Tag style={{ margin: 0, fontFamily: "var(--font-mono)", fontSize: 11, background: "rgba(79,70,229,0.1)", color: "#A5B4FC", border: "1px solid rgba(79,70,229,0.25)" }}>
              AI
            </Tag>
          )}
        </div>

        {tags.length > 0 && (
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginTop: 16, paddingTop: 16, borderTop: `1px solid ${brand.borderSubtle}` }}>
            {tags.slice(0, 3).map((tag) => (
              <span key={tag} style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: brand.textMuted }}>
                #{tag}
              </span>
            ))}
          </div>
        )}
      </Card>
    </Link>
  )
}
