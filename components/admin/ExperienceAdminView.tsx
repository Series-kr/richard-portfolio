"use client"

import { Box, Card, Chip, Typography } from "@mui/material"
import { parseJsonArray, formatDate } from "@/lib/utils"
import { brand } from "@/lib/theme"
import type { Experience } from "@prisma/client"

export function ExperienceAdminView({ experiences }: { experiences: Experience[] }) {
  return (
    <Box>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4">Experience</Typography>
        <Typography sx={{ fontSize: 14, color: brand.textSecondary, mt: 0.5 }}>{experiences.length} experience entries</Typography>
      </Box>

      <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        {experiences.map((exp) => (
          <Card key={exp.id} sx={{ p: 3 }}>
            <Box sx={{ display: "flex", flexWrap: "wrap", alignItems: "flex-start", justifyContent: "space-between", gap: 2, mb: 2 }}>
              <Box>
                <Typography sx={{ fontSize: 18, fontWeight: 600, color: brand.text }}>{exp.role}</Typography>
                <Typography sx={{ fontSize: 15, color: brand.primary }}>{exp.company}</Typography>
                <Typography sx={{ fontFamily: "var(--font-mono)", fontSize: 12, color: brand.textMuted, mt: 0.5 }}>
                  {formatDate(exp.startDate)} — {exp.current ? "Present" : formatDate(exp.endDate!)} · {exp.location}
                </Typography>
              </Box>
              <Chip label={exp.roleType} color="primary" variant="outlined" sx={{ textTransform: "uppercase", fontFamily: "var(--font-mono)", fontSize: 11 }} />
            </Box>
            <Box component="ul" sx={{ listStyle: "none", p: 0, m: "0 0 16px", display: "flex", flexDirection: "column", gap: 1 }}>
              {parseJsonArray(exp.bullets).map((b, i) => (
                <Box component="li" key={i} sx={{ display: "flex", gap: 1, fontSize: 13, color: brand.textSecondary }}>
                  <span style={{ color: brand.primary, flexShrink: 0 }}>·</span> {b}
                </Box>
              ))}
            </Box>
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1.5 }}>
              {parseJsonArray(exp.techStack).map((t) => (
                <span key={t} style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: brand.textMuted }}>#{t.toLowerCase()}</span>
              ))}
            </Box>
          </Card>
        ))}
      </Box>

      <Typography sx={{ textAlign: "center", color: brand.textMuted, mt: 3 }}>
        Edit via Prisma Studio: <code>npm run db:studio</code>
      </Typography>
    </Box>
  )
}
