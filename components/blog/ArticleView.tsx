"use client"

import Link from "next/link"
import Image from "next/image"
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"
import { Button, Tag, Divider } from "antd"
import { ArrowLeftOutlined } from "@ant-design/icons"
import { formatDate, parseJsonArray } from "@/lib/utils"
import { ReadingProgress } from "@/components/blog/ReadingProgress"
import { brand } from "@/lib/theme"
import type { BlogPost } from "@prisma/client"

export function ArticleView({ post }: { post: BlogPost }) {
  const tags = parseJsonArray(post.tags)

  return (
    <>
      <ReadingProgress />
      <div style={{ maxWidth: 800, margin: "0 auto", padding: "64px 24px" }}>
        <Link href="/blog">
          <Button type="text" icon={<ArrowLeftOutlined />} style={{ paddingLeft: 0, color: brand.textSecondary, textTransform: "uppercase", fontFamily: "var(--font-mono)", fontSize: 11 }}>
            All Posts
          </Button>
        </Link>

        <header style={{ marginTop: 24, marginBottom: 48 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
            <span style={{ fontFamily: "var(--font-mono)", fontSize: 11, fontWeight: 600, color: brand.primary, textTransform: "uppercase", letterSpacing: "0.1em" }}>
              {post.category}
            </span>
            {post.generatedByAI && (
              <Tag style={{ margin: 0, fontFamily: "var(--font-mono)", fontSize: 11, background: "rgba(79,70,229,0.1)", color: "#A5B4FC", border: "1px solid rgba(79,70,229,0.25)" }}>
                AI-assisted
              </Tag>
            )}
          </div>

          <h1 style={{ fontFamily: "var(--font-display)", fontSize: 44, fontWeight: 700, color: brand.text, marginBottom: 24, lineHeight: 1.15 }}>
            {post.title}
          </h1>

          <p style={{ fontSize: 18, color: brand.textSecondary, marginBottom: 24, lineHeight: 1.7 }}>{post.excerpt}</p>

          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", borderTop: `1px solid ${brand.border}`, borderBottom: `1px solid ${brand.border}`, padding: "16px 0" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
              <div style={{ width: 40, height: 40, borderRadius: "50%", background: "rgba(79,70,229,0.12)", border: "1px solid rgba(79,70,229,0.25)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <span style={{ fontFamily: "var(--font-display)", fontSize: 14, fontWeight: 700, color: brand.primary }}>RK</span>
              </div>
              <div>
                <p style={{ fontSize: 14, fontWeight: 600, color: brand.text, margin: 0 }}>Richard Korankye</p>
                <p style={{ fontFamily: "var(--font-mono)", fontSize: 12, color: brand.textSecondary, margin: 0 }}>
                  {post.publishedAt ? formatDate(post.publishedAt) : "Draft"}
                </p>
              </div>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 16, color: brand.textSecondary, fontFamily: "var(--font-mono)", fontSize: 13 }}>
              <span>{post.readTimeMinutes} min read</span>
              <span>{post.views} views</span>
            </div>
          </div>
        </header>

        {post.coverImage && (
          <div style={{ marginBottom: 48, borderRadius: 12, overflow: "hidden", border: `1px solid ${brand.border}`, position: "relative", aspectRatio: "16 / 9" }}>
            <Image src={post.coverImage} alt={post.title} fill style={{ objectFit: "cover" }} sizes="(max-width: 800px) 100vw, 800px" priority />
          </div>
        )}

        <article className="prose" style={{ marginBottom: 48 }}>
          <ReactMarkdown remarkPlugins={[remarkGfm]}>{post.content}</ReactMarkdown>
        </article>

        {tags.length > 0 && (
          <>
            <Divider style={{ borderColor: brand.border }} />
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 48 }}>
              {tags.map((tag) => (
                <Tag key={tag} style={{ margin: 0, fontFamily: "var(--font-mono)", fontSize: 13, background: brand.bgContainer, border: `1px solid ${brand.border}`, color: brand.textSecondary, padding: "2px 10px" }}>
                  #{tag}
                </Tag>
              ))}
            </div>
          </>
        )}

        <div style={{ background: "linear-gradient(90deg, rgba(79,70,229,0.12), transparent)", border: "1px solid rgba(79,70,229,0.25)", padding: 32, borderRadius: 12 }}>
          <h3 style={{ fontFamily: "var(--font-display)", fontSize: 24, fontWeight: 700, color: brand.text, marginBottom: 8 }}>Want to work together?</h3>
          <p style={{ fontSize: 16, color: brand.textSecondary, marginBottom: 16 }}>I&apos;m available for freelance projects and consulting.</p>
          <Link href="/#contact">
            <Button type="primary" size="large">Get in Touch</Button>
          </Link>
        </div>
      </div>
    </>
  )
}
