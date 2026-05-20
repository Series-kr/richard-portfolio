import type { Metadata } from "next"
import { prisma } from "@/lib/prisma"
import { BlogCard } from "@/components/blog/BlogCard"
import { AnimatedSection } from "@/components/shared/AnimatedSection"

export const revalidate = 3600

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Technical deep dives, architecture decisions, and lessons from building real systems by Richard Korankye — Senior Full Stack Engineer in Accra, Ghana.",
}

export default async function BlogPage() {
  const posts = await prisma.blogPost.findMany({
    where: { published: true },
    orderBy: { publishedAt: "desc" },
  }).catch(() => [])

  const categories = Array.from(new Set(posts.map((p) => p.category)))

  return (
    <div className="max-w-[1200px] mx-auto px-6 md:px-8 lg:px-16 py-16">
      <AnimatedSection>
        <div className="mb-16">
          <p className="font-[family-name:var(--font-mono)] text-[11px] font-semibold text-[#45f1c3] uppercase tracking-[0.1em] mb-3">
            Writing
          </p>
          <h1 className="font-[family-name:var(--font-syne)] text-[48px] font-bold text-[#d9e3f7] mb-4">
            Insights & Engineering
          </h1>
          <p className="font-[family-name:var(--font-dm-sans)] text-[16px] text-[#bacac2] max-w-2xl">
            Deep dives into architecture, AI, DevOps, and lessons learned building production systems across West Africa.
          </p>
        </div>
      </AnimatedSection>

      {posts.length === 0 ? (
        <div className="text-center py-24 border border-[#1C2330] rounded-xl">
          <div className="text-5xl mb-4">✍️</div>
          <h3 className="font-[family-name:var(--font-syne)] text-[24px] font-bold text-[#d9e3f7] mb-2">
            Writing in progress
          </h3>
          <p className="font-[family-name:var(--font-dm-sans)] text-[16px] text-[#bacac2]">
            The first posts are being written. Check back soon.
          </p>
        </div>
      ) : (
        <div className="grid md:grid-cols-3 gap-6">
          {posts.map((post, i) => (
            <AnimatedSection key={post.id} delay={i * 0.06}>
              <BlogCard post={post} />
            </AnimatedSection>
          ))}
        </div>
      )}
    </div>
  )
}
