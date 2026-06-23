"use client"

import { Card, Box } from "@mui/material"
import { AnimatedSection } from "@/components/shared/AnimatedSection"
import { SectionHeader } from "@/components/shared/SectionHeader"
import { TechBadge } from "@/components/shared/TechBadge"
import { brand } from "@/lib/theme"
import type { Skill } from "@prisma/client"

interface Props {
  skills: Skill[]
}

const categoryIcon: Record<string, string> = {
  Frontend: "🖥️",
  Backend: "⚙️",
  Database: "🗄️",
  DevOps: "☁️",
  AI: "🤖",
  Practices: "📐",
}

export function Skills({ skills }: Props) {
  const categories = Array.from(new Set(skills.map((s) => s.category))).sort()

  const byCategory = categories.reduce(
    (acc, cat) => {
      acc[cat] = skills.filter((s) => s.category === cat).sort((a, b) => a.order - b.order)
      return acc
    },
    {} as Record<string, Skill[]>
  )

  return (
    <Box component="section" id="stack" sx={{ py: 8, px: 3, background: brand.bgBase }}>
      <Box sx={{ maxWidth: 1200, mx: "auto" }}>
        <SectionHeader title="My Technical Arsenal" subtitle="Precision tools for modern engineering challenges." center />

        <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", md: "repeat(3, 1fr)" }, gap: 3 }}>
          {categories.map((category, i) => (
            <AnimatedSection key={category} delay={i * 0.08}>
              <Card sx={{ height: "100%", p: 3 }}>
                <Box
                  sx={{
                    width: 48,
                    height: 48,
                    borderRadius: 2,
                    background: "rgba(79, 70, 229, 0.14)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 24,
                    mb: 3,
                  }}
                >
                  {categoryIcon[category] ?? "🛠️"}
                </Box>
                <h3 style={{ fontSize: 18, fontWeight: 600, color: brand.text, marginBottom: 16 }}>{category}</h3>
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                  {byCategory[category].map((skill) => (
                    <TechBadge key={skill.id} name={skill.name} />
                  ))}
                </Box>
              </Card>
            </AnimatedSection>
          ))}
        </Box>
      </Box>
    </Box>
  )
}
