"use client"

import { Card, Tag, Typography } from "antd"
import { parseJsonArray, formatDate } from "@/lib/utils"
import { brand } from "@/lib/theme"
import type { Experience } from "@prisma/client"

export function ExperienceAdminView({ experiences }: { experiences: Experience[] }) {
  return (
    <div>
      <div style={{ marginBottom: 32 }}>
        <h1 style={{ fontFamily: "var(--font-display)", fontSize: 32, fontWeight: 700, color: brand.text, margin: 0 }}>Experience</h1>
        <p style={{ fontSize: 14, color: brand.textSecondary, marginTop: 4 }}>{experiences.length} experience entries</p>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        {experiences.map((exp) => (
          <Card key={exp.id} variant="outlined" style={{ borderColor: brand.border }}>
            <div style={{ display: "flex", flexWrap: "wrap", alignItems: "flex-start", justifyContent: "space-between", gap: 16, marginBottom: 16 }}>
              <div>
                <h3 style={{ fontSize: 18, fontWeight: 600, color: brand.text, margin: 0 }}>{exp.role}</h3>
                <p style={{ fontSize: 15, color: brand.primary, margin: "2px 0 0" }}>{exp.company}</p>
                <p style={{ fontFamily: "var(--font-mono)", fontSize: 12, color: brand.textMuted, margin: "4px 0 0" }}>
                  {formatDate(exp.startDate)} — {exp.current ? "Present" : formatDate(exp.endDate!)} · {exp.location}
                </p>
              </div>
              <Tag color="processing" style={{ textTransform: "uppercase", fontFamily: "var(--font-mono)", fontSize: 11 }}>{exp.roleType}</Tag>
            </div>
            <ul style={{ listStyle: "none", padding: 0, margin: "0 0 16px", display: "flex", flexDirection: "column", gap: 6 }}>
              {parseJsonArray(exp.bullets).map((b, i) => (
                <li key={i} style={{ display: "flex", gap: 8, fontSize: 13, color: brand.textSecondary }}>
                  <span style={{ color: brand.primary, flexShrink: 0 }}>·</span> {b}
                </li>
              ))}
            </ul>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
              {parseJsonArray(exp.techStack).map((t) => (
                <span key={t} style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: brand.textMuted }}>#{t.toLowerCase()}</span>
              ))}
            </div>
          </Card>
        ))}
      </div>

      <Typography.Paragraph style={{ textAlign: "center", color: brand.textMuted, marginTop: 24 }}>
        Edit via Prisma Studio: <code>npm run db:studio</code>
      </Typography.Paragraph>
    </div>
  )
}
