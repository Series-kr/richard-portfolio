"use client"

import { Box, Typography } from "@mui/material"
import { BlogCard } from "@/components/blog/BlogCard"
import { AnimatedSection } from "@/components/shared/AnimatedSection"
import { brand } from "@/lib/theme"
import type { BlogPost } from "@prisma/client"

export function BlogIndexView({ posts }: { posts: BlogPost[] }) {
  return (
    <Box sx={{ maxWidth: 1200, mx: "auto", py: 8, px: 3 }}>
      <AnimatedSection>
        <Box sx={{ mb: 6 }}>
          <p style={{ fontFamily: "var(--font-mono)", fontSize: 11, fontWeight: 600, color: brand.primary, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 12 }}>
            Writing
          </p>
          <h1 style={{ fontFamily: "var(--font-display)", fontSize: 48, fontWeight: 700, color: brand.text, marginBottom: 16 }}>
            Insights &amp; Engineering
          </h1>
          <p style={{ fontSize: 16, color: brand.textSecondary, maxWidth: 640 }}>
            Deep dives into architecture, AI, DevOps, and lessons learned building production systems across West Africa.
          </p>
        </Box>
      </AnimatedSection>

      {posts.length === 0 ? (
        <Typography sx={{ textAlign: "center", color: brand.textSecondary, py: 12 }}>
          The first posts are being written. Check back soon.
        </Typography>
      ) : (
        <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", md: "1fr 1fr", lg: "repeat(3, 1fr)" }, gap: 3 }}>
          {posts.map((post, i) => (
            <AnimatedSection key={post.id} delay={i * 0.06}>
              <BlogCard post={post} />
            </AnimatedSection>
          ))}
        </Box>
      )}
    </Box>
  )
}
