"use client"

import { Box, Card, LinearProgress, Typography } from "@mui/material"
import { brand } from "@/lib/theme"
import type { Skill } from "@prisma/client"

export function SkillsAdminView({ skills }: { skills: Skill[] }) {
  const categories = Array.from(new Set(skills.map((s) => s.category)))

  return (
    <Box>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4">Skills</Typography>
        <Typography sx={{ fontSize: 14, color: brand.textSecondary, mt: 0.5 }}>
          {skills.length} skills across {categories.length} categories
        </Typography>
      </Box>

      <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
        {categories.map((cat) => (
          <Card key={cat} sx={{ p: 3 }}>
            <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: 2 }}>
              <Typography variant="h6" sx={{ fontFamily: "var(--font-display)" }}>{cat}</Typography>
              <Typography sx={{ fontFamily: "var(--font-mono)", fontSize: 11, color: brand.textSecondary }}>
                {skills.filter((s) => s.category === cat).length} skills
              </Typography>
            </Box>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              {skills.filter((s) => s.category === cat).map((skill) => (
                <Box key={skill.id} sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                  <Typography sx={{ width: 160, flexShrink: 0, color: brand.text, fontSize: 14 }}>{skill.name}</Typography>
                  <Box sx={{ flex: 1 }}>
                    <LinearProgress variant="determinate" value={skill.level} sx={{ height: 6, borderRadius: 3, bgcolor: brand.bgElevated }} />
                  </Box>
                  <Typography sx={{ fontFamily: "var(--font-mono)", fontSize: 12, color: brand.textSecondary, width: 40, textAlign: "right" }}>{skill.level}%</Typography>
                </Box>
              ))}
            </Box>
          </Card>
        ))}
      </Box>

      <Typography sx={{ textAlign: "center", color: brand.textMuted, mt: 3 }}>
        Edit skills via the API or Prisma Studio: <code>npm run db:studio</code>
      </Typography>
    </Box>
  )
}
