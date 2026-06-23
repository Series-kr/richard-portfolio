"use client"

import Link from "next/link"
import Image from "next/image"
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"
import { Box, Button, Chip, Divider } from "@mui/material"
import ArrowBackIcon from "@mui/icons-material/ArrowBack"
import { formatDate, parseJsonArray } from "@/lib/utils"
import { ReadingProgress } from "@/components/blog/ReadingProgress"
import { brand } from "@/lib/theme"
import type { BlogPost } from "@prisma/client"

export function ArticleView({ post }: { post: BlogPost }) {
  const tags = parseJsonArray(post.tags)

  return (
    <>
      <ReadingProgress />
      <Box sx={{ maxWidth: 800, mx: "auto", py: 8, px: 3 }}>
        <Link href="/blog">
          <Button variant="text" startIcon={<ArrowBackIcon />} sx={{ pl: 0, color: brand.textSecondary, textTransform: "uppercase", fontFamily: "var(--font-mono)", fontSize: 11 }}>
            All Posts
          </Button>
        </Link>

        <Box component="header" sx={{ mt: 3, mb: 6 }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 2 }}>
            <span style={{ fontFamily: "var(--font-mono)", fontSize: 11, fontWeight: 600, color: brand.primary, textTransform: "uppercase", letterSpacing: "0.1em" }}>
              {post.category}
            </span>
            {post.generatedByAI && (
              <Chip label="AI-assisted" size="small" sx={{ fontFamily: "var(--font-mono)", fontSize: 11, bgcolor: "rgba(230,180,80,0.12)", color: brand.primarySoft, border: "1px solid rgba(230,180,80,0.3)" }} />
            )}
          </Box>

          <h1 style={{ fontFamily: "var(--font-display)", fontSize: 44, fontWeight: 700, color: brand.text, marginBottom: 24, lineHeight: 1.15 }}>
            {post.title}
          </h1>

          <p style={{ fontSize: 18, color: brand.textSecondary, marginBottom: 24, lineHeight: 1.7 }}>{post.excerpt}</p>

          <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", borderTop: `1px solid ${brand.border}`, borderBottom: `1px solid ${brand.border}`, py: 2 }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              <Box sx={{ width: 40, height: 40, borderRadius: "50%", background: "rgba(230,180,80,0.14)", border: "1px solid rgba(230,180,80,0.3)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <span style={{ fontFamily: "var(--font-display)", fontSize: 14, fontWeight: 700, color: brand.primary }}>RK</span>
              </Box>
              <Box>
                <p style={{ fontSize: 14, fontWeight: 600, color: brand.text, margin: 0 }}>Richard Korankye</p>
                <p style={{ fontFamily: "var(--font-mono)", fontSize: 12, color: brand.textSecondary, margin: 0 }}>
                  {post.publishedAt ? formatDate(post.publishedAt) : "Draft"}
                </p>
              </Box>
            </Box>
            <Box sx={{ display: "flex", alignItems: "center", gap: 2, color: brand.textSecondary, fontFamily: "var(--font-mono)", fontSize: 13 }}>
              <span>{post.readTimeMinutes} min read</span>
              <span>{post.views} views</span>
            </Box>
          </Box>
        </Box>

        {post.coverImage && (
          <Box sx={{ mb: 6, borderRadius: 2, overflow: "hidden", border: `1px solid ${brand.border}`, position: "relative", aspectRatio: "16 / 9" }}>
            <Image src={post.coverImage} alt={post.title} fill style={{ objectFit: "cover" }} sizes="(max-width: 800px) 100vw, 800px" priority />
          </Box>
        )}

        <article className="prose" style={{ marginBottom: 48 }}>
          <ReactMarkdown remarkPlugins={[remarkGfm]}>{post.content}</ReactMarkdown>
        </article>

        {tags.length > 0 && (
          <>
            <Divider sx={{ borderColor: brand.border }} />
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, my: 6 }}>
              {tags.map((tag) => (
                <Chip key={tag} label={`#${tag}`} size="small" sx={{ fontFamily: "var(--font-mono)", fontSize: 13, bgcolor: brand.bgContainer, border: `1px solid ${brand.border}`, color: brand.textSecondary }} />
              ))}
            </Box>
          </>
        )}

        <Box sx={{ background: "linear-gradient(90deg, rgba(230,180,80,0.14), transparent)", border: "1px solid rgba(230,180,80,0.3)", p: 4, borderRadius: 2 }}>
          <h3 style={{ fontFamily: "var(--font-display)", fontSize: 24, fontWeight: 700, color: brand.text, marginBottom: 8 }}>Want to work together?</h3>
          <p style={{ fontSize: 16, color: brand.textSecondary, marginBottom: 16 }}>I&apos;m available for freelance projects and consulting.</p>
          <Link href="/#contact">
            <Button variant="contained" size="large">Get in Touch</Button>
          </Link>
        </Box>
      </Box>
    </>
  )
}
