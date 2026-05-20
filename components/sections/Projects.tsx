"use client"

import { useState } from "react"
import Link from "next/link"
import { AnimatedSection } from "@/components/shared/AnimatedSection"
import { SectionHeader } from "@/components/shared/SectionHeader"
import { ProjectCard } from "@/components/projects/ProjectCard"
import type { Project } from "@prisma/client"

interface Props {
  projects: Project[]
}

const CATEGORIES = ["All", "SaaS", "EdTech", "AI", "Business"]

export function ProjectsSection({ projects }: Props) {
  const [activeCategory, setActiveCategory] = useState("All")

  const featured = projects.filter((p) => p.featured)
  const regular = projects.filter((p) => !p.featured)

  const filteredRegular =
    activeCategory === "All"
      ? regular
      : regular.filter((p) => p.category === activeCategory)

  return (
    <section className="py-16 bg-[#050f1c]" id="projects">
      <div className="max-w-[1200px] mx-auto px-6 md:px-8 lg:px-16">
        <div className="flex flex-col md:flex-row justify-between items-end gap-6 mb-16">
          <SectionHeader
            title="Featured Projects"
            subtitle="A selection of my best work across SaaS, EdTech, and AI."
          />

          {/* Category filter */}
          <div className="flex bg-[#16202e] p-1 rounded-lg border border-[#1C2330]/60 flex-shrink-0">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-1.5 rounded font-[family-name:var(--font-mono)] text-[11px] font-semibold uppercase tracking-[0.1em] transition-all duration-200 ${
                  activeCategory === cat
                    ? "bg-[#45f1c3] text-[#00382a]"
                    : "text-[#bacac2] hover:text-[#45f1c3]"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Featured projects — full width, stacked */}
        {featured.filter((p) => activeCategory === "All" || p.category === activeCategory).length > 0 && (
          <div className="space-y-6 mb-6">
            {featured
              .filter((p) => activeCategory === "All" || p.category === activeCategory)
              .map((project, i) => (
                <AnimatedSection key={project.id} delay={i * 0.1}>
                  <ProjectCard project={project} featured />
                </AnimatedSection>
              ))}
          </div>
        )}

        {/* Regular projects grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {filteredRegular.slice(0, 6).map((project, i) => (
            <AnimatedSection key={project.id} delay={i * 0.08}>
              <ProjectCard project={project} />
            </AnimatedSection>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 border border-[#1C2330] text-[#d9e3f7] px-8 py-3 rounded-lg hover:bg-[#16202e] hover:border-[#45f1c3]/40 transition-all font-[family-name:var(--font-dm-sans)] font-medium"
          >
            View All Projects
            <span>→</span>
          </Link>
        </div>
      </div>
    </section>
  )
}
