"use client"

import { Row, Col, Empty } from "antd"
import { BlogCard } from "@/components/blog/BlogCard"
import { AnimatedSection } from "@/components/shared/AnimatedSection"
import { brand } from "@/lib/theme"
import type { BlogPost } from "@prisma/client"

export function BlogIndexView({ posts }: { posts: BlogPost[] }) {
  return (
    <div style={{ maxWidth: 1200, margin: "0 auto", padding: "64px 24px" }}>
      <AnimatedSection>
        <div style={{ marginBottom: 48 }}>
          <p style={{ fontFamily: "var(--font-mono)", fontSize: 11, fontWeight: 600, color: brand.primary, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 12 }}>
            Writing
          </p>
          <h1 style={{ fontFamily: "var(--font-display)", fontSize: 48, fontWeight: 700, color: brand.text, marginBottom: 16 }}>
            Insights &amp; Engineering
          </h1>
          <p style={{ fontSize: 16, color: brand.textSecondary, maxWidth: 640 }}>
            Deep dives into architecture, AI, DevOps, and lessons learned building production systems across West Africa.
          </p>
        </div>
      </AnimatedSection>

      {posts.length === 0 ? (
        <Empty description="The first posts are being written. Check back soon." style={{ padding: "96px 0" }} />
      ) : (
        <Row gutter={[24, 24]}>
          {posts.map((post, i) => (
            <Col key={post.id} xs={24} md={12} lg={8}>
              <AnimatedSection delay={i * 0.06}>
                <BlogCard post={post} />
              </AnimatedSection>
            </Col>
          ))}
        </Row>
      )}
    </div>
  )
}
