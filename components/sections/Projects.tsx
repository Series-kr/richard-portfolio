"use client"

import { useState } from "react"
import Link from "next/link"
import { Segmented, Button } from "antd"
import { ArrowRightOutlined } from "@ant-design/icons"
import { AnimatedSection } from "@/components/shared/AnimatedSection"
import { SectionHeader } from "@/components/shared/SectionHeader"
import { ProjectCard } from "@/components/projects/ProjectCard"
import { brand } from "@/lib/theme"
import type { Project } from "@prisma/client"

interface Props {
  projects: Project[]
}

const CATEGORIES = ["All", "SaaS", "EdTech", "AI", "Business"]

export function ProjectsSection({ projects }: Props) {
  const [activeCategory, setActiveCategory] = useState("All")

  const featured = projects.filter((p) => p.featured)
  const regular = projects.filter((p) => !p.featured)

  const matches = (p: Project) => activeCategory === "All" || p.category === activeCategory
  const filteredRegular = regular.filter(matches)
  const filteredFeatured = featured.filter(matches)

  return (
    <section id="projects" style={{ padding: "64px 24px", background: "#0B1120" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "flex-end", gap: 24, marginBottom: 48 }}>
          <SectionHeader title="Featured Projects" subtitle="A selection of my best work across SaaS, EdTech, and AI." />
          <Segmented
            options={CATEGORIES}
            value={activeCategory}
            onChange={(val) => setActiveCategory(val as string)}
          />
        </div>

        {filteredFeatured.length > 0 && (
          <div style={{ display: "flex", flexDirection: "column", gap: 24, marginBottom: 24 }}>
            {filteredFeatured.map((project, i) => (
              <AnimatedSection key={project.id} delay={i * 0.1}>
                <ProjectCard project={project} featured />
              </AnimatedSection>
            ))}
          </div>
        )}

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: 24 }}>
          {filteredRegular.slice(0, 6).map((project, i) => (
            <AnimatedSection key={project.id} delay={i * 0.08}>
              <ProjectCard project={project} />
            </AnimatedSection>
          ))}
        </div>

        <div style={{ textAlign: "center", marginTop: 48 }}>
          <Link href="/projects">
            <Button size="large" icon={<ArrowRightOutlined />} iconPosition="end" style={{ borderColor: brand.border }}>
              View All Projects
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
