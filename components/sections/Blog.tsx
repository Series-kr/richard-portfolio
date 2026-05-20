import Link from "next/link"
import { AnimatedSection } from "@/components/shared/AnimatedSection"
import { SectionHeader } from "@/components/shared/SectionHeader"
import { BlogCard } from "@/components/blog/BlogCard"
import type { BlogPost } from "@prisma/client"

interface Props {
  posts: BlogPost[]
}

export function BlogSection({ posts }: Props) {
  return (
    <section className="py-16 max-w-[1200px] mx-auto px-6 md:px-8 lg:px-16" id="blog">
      <SectionHeader
        title="Insights & Engineering"
        subtitle="Deep dives into architecture, performance, and the future of web."
        center
      />

      {posts.length === 0 ? (
        <div className="text-center py-16">
          <p className="font-[family-name:var(--font-dm-sans)] text-[16px] text-[#bacac2]">
            Blog posts coming soon.
          </p>
        </div>
      ) : (
        <>
          <div className="grid md:grid-cols-3 gap-6">
            {posts.map((post, i) => (
              <AnimatedSection key={post.id} delay={i * 0.1}>
                <BlogCard post={post} />
              </AnimatedSection>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 border border-[#1C2330] text-[#d9e3f7] px-8 py-3 rounded-lg hover:bg-[#16202e] hover:border-[#45f1c3]/40 transition-all font-[family-name:var(--font-dm-sans)] font-medium"
            >
              Read All Posts
              <span>→</span>
            </Link>
          </div>
        </>
      )}
    </section>
  )
}
