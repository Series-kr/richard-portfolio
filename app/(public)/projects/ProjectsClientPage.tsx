"use client"

import { useState } from "react"
import { AnimatedSection } from "@/components/shared/AnimatedSection"
import { ProjectCard } from "@/components/projects/ProjectCard"
import type { Project } from "@prisma/client"

const CATEGORIES = ["All", "SaaS", "EdTech", "AI", "Business", "Mobile"]

export function ProjectsClientPage({ projects }: { projects: Project[] }) {
  const [activeCategory, setActiveCategory] = useState("All")

  const filtered =
    activeCategory === "All" ? projects : projects.filter((p) => p.category === activeCategory)

  const featured = filtered.filter((p) => p.featured)
  const regular = filtered.filter((p) => !p.featured)

  const availableCategories = CATEGORIES.filter(
    (cat) => cat === "All" || projects.some((p) => p.category === cat)
  )

  return (
    <div className="max-w-[1200px] mx-auto px-6 md:px-8 lg:px-16 py-16">
      {/* Header */}
      <AnimatedSection>
        <div className="mb-16">
          <p className="font-[family-name:var(--font-mono)] text-[11px] font-semibold text-[#45f1c3] uppercase tracking-[0.1em] mb-3">
            Portfolio
          </p>
          <h1 className="font-[family-name:var(--font-syne)] text-[48px] font-bold text-[#d9e3f7] mb-4">
            All Projects
          </h1>
          <p className="font-[family-name:var(--font-dm-sans)] text-[16px] text-[#bacac2] max-w-2xl">
            {projects.length} systems built across SaaS, EdTech, AI, and business verticals in Ghana and West Africa.
          </p>
        </div>
      </AnimatedSection>

      {/* Category filter */}
      <AnimatedSection delay={0.1}>
        <div className="flex flex-wrap gap-2 mb-12">
          {availableCategories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-lg font-[family-name:var(--font-mono)] text-[11px] font-semibold uppercase tracking-[0.1em] border transition-all duration-200 ${
                activeCategory === cat
                  ? "bg-[#45f1c3] text-[#00382a] border-[#45f1c3]"
                  : "bg-transparent text-[#bacac2] border-[#1C2330] hover:border-[#45f1c3]/40 hover:text-[#45f1c3]"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </AnimatedSection>

      {/* Projects grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {featured.map((project, i) => (
          <AnimatedSection key={project.id} delay={i * 0.05}>
            <ProjectCard project={project} featured />
          </AnimatedSection>
        ))}
        {regular.map((project, i) => (
          <AnimatedSection key={project.id} delay={i * 0.05}>
            <ProjectCard project={project} />
          </AnimatedSection>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-20">
          <p className="font-[family-name:var(--font-dm-sans)] text-[16px] text-[#bacac2]">
            No projects in this category yet.
          </p>
        </div>
      )}
    </div>
  )
}
