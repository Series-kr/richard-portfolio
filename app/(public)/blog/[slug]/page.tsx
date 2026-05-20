import { notFound } from "next/navigation"
import type { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"
import { prisma } from "@/lib/prisma"
import { formatDate, parseJsonArray } from "@/lib/utils"

export const revalidate = 3600

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const post = await prisma.blogPost.findUnique({ where: { slug } })
  if (!post) return { title: "Not Found" }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"

  return {
    title: post.seoTitle || post.title,
    description: post.seoDescription || post.excerpt,
    keywords: parseJsonArray(post.seoKeywords),
    openGraph: {
      type: "article",
      title: post.seoTitle || post.title,
      description: post.seoDescription || post.excerpt,
      url: `${siteUrl}/blog/${slug}`,
      images: [
        {
          url: `${siteUrl}/api/og?title=${encodeURIComponent(post.title)}&type=blog&category=${encodeURIComponent(post.category)}`,
          width: 1200,
          height: 630,
        },
      ],
      publishedTime: post.publishedAt?.toISOString(),
    },
    alternates: { canonical: `${siteUrl}/blog/${slug}` },
  }
}

export async function generateStaticParams() {
  try {
    const posts = await prisma.blogPost.findMany({
      where: { published: true },
      select: { slug: true },
    })
    return posts.map((p) => ({ slug: p.slug }))
  } catch {
    return []
  }
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params
  const post = await prisma.blogPost.findUnique({ where: { slug } })
  if (!post || !post.published) notFound()

  // Increment view count (fire and forget)
  prisma.blogPost.update({ where: { id: post.id }, data: { views: { increment: 1 } } }).catch(() => {})

  const tags = parseJsonArray(post.tags)
  const keywords = parseJsonArray(post.seoKeywords)

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"

  return (
    <>
      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline: post.title,
            description: post.excerpt,
            author: {
              "@type": "Person",
              name: "Richard Korankye",
              url: siteUrl,
            },
            datePublished: post.publishedAt?.toISOString(),
            dateModified: post.updatedAt?.toISOString(),
            keywords: keywords.join(", "),
          }),
        }}
      />

      <div className="max-w-[800px] mx-auto px-8 py-16">
        {/* Back */}
        <Link
          href="/blog"
          className="font-[family-name:var(--font-mono)] text-[11px] text-[#bacac2] hover:text-[#45f1c3] transition-colors uppercase tracking-widest mb-12 inline-flex items-center gap-2"
        >
          ← All Posts
        </Link>

        {/* Header */}
        <header className="mt-8 mb-12">
          <div className="flex items-center gap-4 mb-4">
            <span className="font-[family-name:var(--font-mono)] text-[11px] font-semibold text-[#45f1c3] uppercase tracking-[0.1em]">
              {post.category}
            </span>
            {post.generatedByAI && (
              <span className="font-[family-name:var(--font-mono)] text-[11px] text-[#45f1c3]/60 border border-[#45f1c3]/20 px-2 py-0.5 rounded">
                AI-assisted
              </span>
            )}
          </div>

          <h1 className="font-[family-name:var(--font-syne)] text-[40px] md:text-[48px] font-bold text-[#d9e3f7] mb-6 leading-tight">
            {post.title}
          </h1>

          <p className="font-[family-name:var(--font-dm-sans)] text-[18px] text-[#bacac2] mb-6 leading-relaxed">
            {post.excerpt}
          </p>

          <div className="flex items-center justify-between border-y border-[#1C2330] py-4">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-[#45f1c3]/10 border border-[#45f1c3]/20 flex items-center justify-center">
                <span className="font-[family-name:var(--font-syne)] text-sm font-bold text-[#45f1c3]">RK</span>
              </div>
              <div>
                <p className="font-[family-name:var(--font-dm-sans)] text-[14px] font-semibold text-[#d9e3f7]">
                  Richard Korankye
                </p>
                <p className="font-[family-name:var(--font-mono)] text-[12px] text-[#bacac2]">
                  {post.publishedAt ? formatDate(post.publishedAt) : "Draft"}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4 text-[#bacac2]">
              <span className="font-[family-name:var(--font-mono)] text-[13px]">{post.readTimeMinutes} min read</span>
              <span className="font-[family-name:var(--font-mono)] text-[13px]">{post.views} views</span>
            </div>
          </div>
        </header>

        {/* Cover image */}
        {post.coverImage && (
          <div className="mb-12 rounded-xl overflow-hidden border border-[#1C2330] relative aspect-video">
            <Image
              src={post.coverImage}
              alt={post.title}
              fill
              className="object-cover"
              sizes="(max-width: 800px) 100vw, 800px"
              priority
            />
          </div>
        )}

        {/* Content */}
        <article className="prose prose-invert max-w-none mb-16">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>{post.content}</ReactMarkdown>
        </article>

        {/* Tags */}
        {tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-12 pt-8 border-t border-[#1C2330]">
            {tags.map((tag) => (
              <span
                key={tag}
                className="font-[family-name:var(--font-mono)] text-[13px] bg-[#16202e] border border-[#1C2330] text-[#bacac2] px-3 py-1 rounded"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}

        {/* CTA */}
        <div className="bg-gradient-to-r from-[#45f1c3]/10 to-transparent border border-[#45f1c3]/20 p-8 rounded-xl">
          <h3 className="font-[family-name:var(--font-syne)] text-[24px] font-bold text-[#d9e3f7] mb-2">
            Want to work together?
          </h3>
          <p className="font-[family-name:var(--font-dm-sans)] text-[16px] text-[#bacac2] mb-4">
            I&apos;m available for freelance projects and consulting.
          </p>
          <Link
            href="/#contact"
            className="inline-block bg-[#00d4a8] text-[#00382a] font-bold px-6 py-2.5 rounded-lg hover:shadow-[0_0_20px_rgba(0,212,168,0.3)] transition-all font-[family-name:var(--font-dm-sans)]"
          >
            Get in Touch
          </Link>
        </div>
      </div>
    </>
  )
}
