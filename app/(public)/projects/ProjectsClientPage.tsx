"use client"

import { useState } from "react"
import { Segmented, Empty, Row, Col } from "antd"
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

  const availableCategories = CATEGORIES.filter(
    (cat) => cat === "All" || projects.some((p) => p.category === cat)
  )

  return (
    <div style={{ maxWidth: 1200, margin: "0 auto", padding: "64px 24px" }}>
      <AnimatedSection>
        <div style={{ marginBottom: 48 }}>
          <p style={{ fontFamily: "var(--font-mono)", fontSize: 11, fontWeight: 600, color: brand.primary, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 12 }}>
            Portfolio
          </p>
          <h1 style={{ fontFamily: "var(--font-display)", fontSize: 48, fontWeight: 700, color: brand.text, marginBottom: 16 }}>
            Engineering Work
          </h1>
          <p style={{ fontSize: 16, color: brand.textSecondary, maxWidth: 640 }}>
            {projects.length} systems built across SaaS, EdTech, AI, and business verticals in Ghana and West Africa.
          </p>
        </div>
      </AnimatedSection>

      <AnimatedSection delay={0.1}>
        <div style={{ marginBottom: 48 }}>
          <Segmented options={availableCategories} value={activeCategory} onChange={(v) => setActiveCategory(v as string)} size="large" />
        </div>
      </AnimatedSection>

      {filtered.length === 0 ? (
        <Empty description="No projects in this category yet." style={{ padding: "80px 0" }} />
      ) : (
        <>
          {featured.length > 0 && (
            <div style={{ display: "flex", flexDirection: "column", gap: 24, marginBottom: 24 }}>
              {featured.map((project, i) => (
                <AnimatedSection key={project.id} delay={i * 0.05}>
                  <ProjectCard project={project} featured />
                </AnimatedSection>
              ))}
            </div>
          )}
          <Row gutter={[24, 24]}>
            {regular.map((project, i) => (
              <Col key={project.id} xs={24} md={12} lg={8}>
                <AnimatedSection delay={i * 0.05}>
                  <ProjectCard project={project} />
                </AnimatedSection>
              </Col>
            ))}
          </Row>
        </>
      )}
    </div>
  )
}
