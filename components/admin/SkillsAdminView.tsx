"use client"

import { Card, Progress, Typography } from "antd"
import { brand } from "@/lib/theme"
import type { Skill } from "@prisma/client"

export function SkillsAdminView({ skills }: { skills: Skill[] }) {
  const categories = Array.from(new Set(skills.map((s) => s.category)))

  return (
    <div>
      <div style={{ marginBottom: 32 }}>
        <h1 style={{ fontFamily: "var(--font-display)", fontSize: 32, fontWeight: 700, color: brand.text, margin: 0 }}>Skills</h1>
        <p style={{ fontSize: 14, color: brand.textSecondary, marginTop: 4 }}>
          {skills.length} skills across {categories.length} categories
        </p>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
        {categories.map((cat) => (
          <Card
            key={cat}
            variant="outlined"
            style={{ borderColor: brand.border }}
            title={<span style={{ fontFamily: "var(--font-display)" }}>{cat}</span>}
            extra={<span style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: brand.textSecondary }}>{skills.filter((s) => s.category === cat).length} skills</span>}
          >
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              {skills.filter((s) => s.category === cat).map((skill) => (
                <div key={skill.id} style={{ display: "flex", alignItems: "center", gap: 16 }}>
                  <span style={{ width: 160, flexShrink: 0, color: brand.text, fontSize: 14 }}>{skill.name}</span>
                  <Progress percent={skill.level} strokeColor={brand.primary} trailColor={brand.bgElevated} />
                </div>
              ))}
            </div>
          </Card>
        ))}
      </div>

      <Typography.Paragraph style={{ textAlign: "center", color: brand.textMuted, marginTop: 24 }}>
        Edit skills via the API or Prisma Studio: <code>npm run db:studio</code>
      </Typography.Paragraph>
    </div>
  )
}
