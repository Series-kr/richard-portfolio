import { notFound } from "next/navigation"
import type { Metadata } from "next"
import { prisma } from "@/lib/prisma"
import { parseJsonArray } from "@/lib/utils"
import { ArticleView } from "@/components/blog/ArticleView"

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
    const posts = await prisma.blogPost.findMany({ where: { published: true }, select: { slug: true } })
    return posts.map((p) => ({ slug: p.slug }))
  } catch {
    return []
  }
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params
  const post = await prisma.blogPost.findUnique({ where: { slug } })
  if (!post || !post.published) notFound()

  prisma.blogPost.update({ where: { id: post.id }, data: { views: { increment: 1 } } }).catch(() => {})

  const keywords = parseJsonArray(post.seoKeywords)
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline: post.title,
            description: post.excerpt,
            author: { "@type": "Person", name: "Richard Korankye", url: siteUrl },
            datePublished: post.publishedAt?.toISOString(),
            dateModified: post.updatedAt?.toISOString(),
            keywords: keywords.join(", "),
          }),
        }}
      />
      <ArticleView post={post} />
    </>
  )
}
