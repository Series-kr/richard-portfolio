"use client"

import { useState } from "react"
import Link from "next/link"
import { Box, Button, ToggleButton, ToggleButtonGroup } from "@mui/material"
import ArrowForwardIcon from "@mui/icons-material/ArrowForward"
import { AnimatedSection } from "@/components/shared/AnimatedSection"
import { SectionHeader } from "@/components/shared/SectionHeader"
import { ProjectCard } from "@/components/projects/ProjectCard"
import { brand } from "@/lib/theme"
import type { Project } from "@prisma/client"

const CATEGORIES = ["All", "SaaS", "EdTech", "AI", "Business"]

export function ProjectsSection({ projects }: { projects: Project[] }) {
  const [activeCategory, setActiveCategory] = useState("All")

  const featured = projects.filter((p) => p.featured)
  const regular = projects.filter((p) => !p.featured)

  const matches = (p: Project) => activeCategory === "All" || p.category === activeCategory
  const filteredRegular = regular.filter(matches)
  const filteredFeatured = featured.filter(matches)

  return (
    <Box component="section" id="projects" sx={{ py: 8, px: 3, background: brand.bgBase }}>
      <Box sx={{ maxWidth: 1200, mx: "auto" }}>
        <Box sx={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "flex-end", gap: 3, mb: 6 }}>
          <SectionHeader title="Featured Projects" subtitle="A selection of my best work across SaaS, EdTech, and AI." />
          <ToggleButtonGroup
            exclusive
            size="small"
            value={activeCategory}
            onChange={(_, val) => val && setActiveCategory(val)}
            sx={{ flexWrap: "wrap" }}
          >
            {CATEGORIES.map((cat) => (
              <ToggleButton key={cat} value={cat} sx={{ textTransform: "none", px: 2 }}>
                {cat}
              </ToggleButton>
            ))}
          </ToggleButtonGroup>
        </Box>

        {filteredFeatured.length > 0 && (
          <Box sx={{ display: "flex", flexDirection: "column", gap: 3, mb: 3 }}>
            {filteredFeatured.map((project, i) => (
              <AnimatedSection key={project.id} delay={i * 0.1}>
                <ProjectCard project={project} featured />
              </AnimatedSection>
            ))}
          </Box>
        )}

        <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr", md: "repeat(3, 1fr)" }, gap: 3 }}>
          {filteredRegular.slice(0, 6).map((project, i) => (
            <AnimatedSection key={project.id} delay={i * 0.08}>
              <ProjectCard project={project} />
            </AnimatedSection>
          ))}
        </Box>

        <Box sx={{ textAlign: "center", mt: 6 }}>
          <Link href="/projects">
            <Button variant="outlined" size="large" endIcon={<ArrowForwardIcon />} sx={{ borderColor: brand.border, color: brand.text }}>
              View All Projects
            </Button>
          </Link>
        </Box>
      </Box>
    </Box>
  )
}
