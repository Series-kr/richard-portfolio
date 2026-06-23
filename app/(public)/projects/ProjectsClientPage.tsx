"use client"

import { useState } from "react"
import { Box, Typography, ToggleButton, ToggleButtonGroup } from "@mui/material"
import { AnimatedSection } from "@/components/shared/AnimatedSection"
import { ProjectCard } from "@/components/projects/ProjectCard"
import { brand } from "@/lib/theme"
import type { Project } from "@prisma/client"

const CATEGORIES = ["All", "SaaS", "EdTech", "AI", "Business", "Mobile"]

export function ProjectsClientPage({ projects }: { projects: Project[] }) {
  const [activeCategory, setActiveCategory] = useState("All")

  const filtered = activeCategory === "All" ? projects : projects.filter((p) => p.category === activeCategory)
  const featured = filtered.filter((p) => p.featured)
  const regular = filtered.filter((p) => !p.featured)

  const availableCategories = CATEGORIES.filter((cat) => cat === "All" || projects.some((p) => p.category === cat))

  return (
    <Box sx={{ maxWidth: 1200, mx: "auto", py: 8, px: 3 }}>
      <AnimatedSection>
        <Box sx={{ mb: 6 }}>
          <p style={{ fontFamily: "var(--font-mono)", fontSize: 11, fontWeight: 600, color: brand.primary, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 12 }}>
            Portfolio
          </p>
          <h1 style={{ fontFamily: "var(--font-display)", fontSize: 48, fontWeight: 700, color: brand.text, marginBottom: 16 }}>
            Engineering Work
          </h1>
          <p style={{ fontSize: 16, color: brand.textSecondary, maxWidth: 640 }}>
            {projects.length} systems built across SaaS, EdTech, AI, and business verticals in Ghana and West Africa.
          </p>
        </Box>
      </AnimatedSection>

      <AnimatedSection delay={0.1}>
        <Box sx={{ mb: 6 }}>
          <ToggleButtonGroup exclusive value={activeCategory} onChange={(_, v) => v && setActiveCategory(v)} sx={{ flexWrap: "wrap" }}>
            {availableCategories.map((cat) => (
              <ToggleButton key={cat} value={cat} sx={{ textTransform: "none", px: 2.5 }}>
                {cat}
              </ToggleButton>
            ))}
          </ToggleButtonGroup>
        </Box>
      </AnimatedSection>

      {filtered.length === 0 ? (
        <Typography sx={{ textAlign: "center", color: brand.textSecondary, py: 10 }}>No projects in this category yet.</Typography>
      ) : (
        <>
          {featured.length > 0 && (
            <Box sx={{ display: "flex", flexDirection: "column", gap: 3, mb: 3 }}>
              {featured.map((project, i) => (
                <AnimatedSection key={project.id} delay={i * 0.05}>
                  <ProjectCard project={project} featured />
                </AnimatedSection>
              ))}
            </Box>
          )}
          <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", md: "1fr 1fr", lg: "repeat(3, 1fr)" }, gap: 3 }}>
            {regular.map((project, i) => (
              <AnimatedSection key={project.id} delay={i * 0.05}>
                <ProjectCard project={project} />
              </AnimatedSection>
            ))}
          </Box>
        </>
      )}
    </Box>
  )
}
