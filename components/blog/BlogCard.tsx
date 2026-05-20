import Link from "next/link"
import { formatDate, parseJsonArray } from "@/lib/utils"
import type { BlogPost } from "@prisma/client"

interface Props {
  post: BlogPost
  variant?: "default" | "featured"
}

const categoryConfig: Record<string, { text: string; border: string; hover: string }> = {
  Architecture: {
    text: "text-[#45f1c3]",
    border: "border-t-[#45f1c3]",
    hover: "group-hover:text-[#45f1c3]",
  },
  AI: {
    text: "text-[#ffcea6]",
    border: "border-t-[#ffcea6]",
    hover: "group-hover:text-[#ffcea6]",
  },
  DevOps: {
    text: "text-[#28dfb3]",
    border: "border-t-[#28dfb3]",
    hover: "group-hover:text-[#28dfb3]",
  },
  Engineering: {
    text: "text-[#45f1c3]",
    border: "border-t-[#45f1c3]",
    hover: "group-hover:text-[#45f1c3]",
  },
  Career: {
    text: "text-[#ffcea6]",
    border: "border-t-[#ffcea6]",
    hover: "group-hover:text-[#ffcea6]",
  },
}

const defaultConfig = categoryConfig.Engineering

export function BlogCard({ post }: Props) {
  const config = categoryConfig[post.category] ?? defaultConfig
  const tags = parseJsonArray(post.tags)

  return (
    <Link
      href={`/blog/${post.slug}`}
      className={`group block bg-[#091421] border border-[#1C2330] p-8 rounded-xl border-t-4 ${config.border} transition-transform hover:-translate-y-2 duration-300`}
    >
      <span className={`font-[family-name:var(--font-mono)] text-[11px] font-semibold uppercase tracking-[0.1em] ${config.text}`}>
        {post.category}
      </span>

      <h3 className={`font-[family-name:var(--font-dm-sans)] text-[18px] font-semibold text-[#d9e3f7] mt-4 mb-6 ${config.hover} transition-colors leading-snug`}>
        {post.title}
      </h3>

      <p className="font-[family-name:var(--font-dm-sans)] text-[14px] text-[#bacac2] mb-8 line-clamp-2 leading-relaxed">
        {post.excerpt}
      </p>

      <div className="flex items-center justify-between">
        <div className="flex items-center text-[#bacac2] font-[family-name:var(--font-mono)] text-[13px]">
          <span>{post.publishedAt ? formatDate(post.publishedAt) : "Draft"}</span>
          <span className="mx-4">•</span>
          <span>{post.readTimeMinutes} min read</span>
        </div>
        {post.generatedByAI && (
          <span className="font-[family-name:var(--font-mono)] text-[11px] text-[#45f1c3]/60 border border-[#45f1c3]/20 px-2 py-0.5 rounded">
            AI
          </span>
        )}
      </div>

      {tags.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-[#1C2330]">
          {tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="font-[family-name:var(--font-mono)] text-[11px] text-[#85948d]"
            >
              #{tag}
            </span>
          ))}
        </div>
      )}
    </Link>
  )
}
