"use client"

import { Row, Col, Card } from "antd"
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
    <section id="stack" style={{ padding: "64px 24px", background: "#0B1120" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <SectionHeader title="My Technical Arsenal" subtitle="Precision tools for modern engineering challenges." center />

        <Row gutter={[24, 24]}>
          {categories.map((category, i) => (
            <Col key={category} xs={24} md={8}>
              <AnimatedSection delay={i * 0.08}>
                <Card variant="outlined" style={{ height: "100%", borderColor: brand.border }} styles={{ body: { padding: 24 } }}>
                  <div
                    style={{
                      width: 48,
                      height: 48,
                      borderRadius: 8,
                      background: "rgba(79, 70, 229, 0.12)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: 24,
                      marginBottom: 24,
                    }}
                  >
                    {categoryIcon[category] ?? "🛠️"}
                  </div>
                  <h3 style={{ fontSize: 18, fontWeight: 600, color: brand.text, marginBottom: 16 }}>{category}</h3>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                    {byCategory[category].map((skill) => (
                      <TechBadge key={skill.id} name={skill.name} />
                    ))}
                  </div>
                </Card>
              </AnimatedSection>
            </Col>
          ))}
        </Row>
      </div>
    </section>
  )
}
