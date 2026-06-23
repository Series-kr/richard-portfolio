"use client"

import Link from "next/link"
import { Box, Button, Typography } from "@mui/material"
import ArrowForwardIcon from "@mui/icons-material/ArrowForward"
import { AnimatedSection } from "@/components/shared/AnimatedSection"
import { SectionHeader } from "@/components/shared/SectionHeader"
import { BlogCard } from "@/components/blog/BlogCard"
import { brand } from "@/lib/theme"
import type { BlogPost } from "@prisma/client"

export function BlogSection({ posts }: { posts: BlogPost[] }) {
  return (
    <Box component="section" id="blog" sx={{ py: 8, px: 3, maxWidth: 1200, mx: "auto" }}>
      <SectionHeader
        title="Insights & Engineering"
        subtitle="Deep dives into architecture, performance, and the future of web."
        center
      />

      {posts.length === 0 ? (
        <Typography sx={{ textAlign: "center", color: brand.textSecondary, py: 6 }}>Blog posts coming soon.</Typography>
      ) : (
        <>
          <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr", md: "repeat(3, 1fr)" }, gap: 3 }}>
            {posts.map((post, i) => (
              <AnimatedSection key={post.id} delay={i * 0.1}>
                <BlogCard post={post} />
              </AnimatedSection>
            ))}
          </Box>

          <Box sx={{ textAlign: "center", mt: 6 }}>
            <Link href="/blog">
              <Button variant="outlined" size="large" endIcon={<ArrowForwardIcon />} sx={{ borderColor: brand.border, color: brand.text }}>
                Read All Posts
              </Button>
            </Link>
          </Box>
        </>
      )}
    </Box>
  )
}
