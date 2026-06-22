"use client"

import Link from "next/link"
import { Button, Empty } from "antd"
import { ArrowRightOutlined } from "@ant-design/icons"
import { AnimatedSection } from "@/components/shared/AnimatedSection"
import { SectionHeader } from "@/components/shared/SectionHeader"
import { BlogCard } from "@/components/blog/BlogCard"
import { brand } from "@/lib/theme"
import type { BlogPost } from "@prisma/client"

interface Props {
  posts: BlogPost[]
}

export function BlogSection({ posts }: Props) {
  return (
    <section id="blog" style={{ padding: "64px 24px", maxWidth: 1200, margin: "0 auto" }}>
      <SectionHeader
        title="Insights & Engineering"
        subtitle="Deep dives into architecture, performance, and the future of web."
        center
      />

      {posts.length === 0 ? (
        <Empty description="Blog posts coming soon." style={{ padding: "48px 0" }} />
      ) : (
        <>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: 24 }}>
            {posts.map((post, i) => (
              <AnimatedSection key={post.id} delay={i * 0.1}>
                <BlogCard post={post} />
              </AnimatedSection>
            ))}
          </div>

          <div style={{ textAlign: "center", marginTop: 48 }}>
            <Link href="/blog">
              <Button size="large" icon={<ArrowRightOutlined />} iconPosition="end" style={{ borderColor: brand.border }}>
                Read All Posts
              </Button>
            </Link>
          </div>
        </>
      )}
    </section>
  )
}
