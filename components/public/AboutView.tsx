"use client"

import Link from "next/link"
import { Box, Card, Button, Chip, Divider } from "@mui/material"
import { AnimatedSection } from "@/components/shared/AnimatedSection"
import { TechBadge } from "@/components/shared/TechBadge"
import { parseJsonArray, formatDate } from "@/lib/utils"
import { brand } from "@/lib/theme"
import type { Experience, Skill } from "@prisma/client"

const para: React.CSSProperties = { fontSize: 16, color: brand.textSecondary, marginBottom: 16, lineHeight: 1.75 }
const h2: React.CSSProperties = { fontFamily: "var(--font-display)", fontSize: 32, fontWeight: 700, color: brand.text, marginBottom: 32 }

interface Props {
  experiences: Experience[]
  skills: Skill[]
}

export function AboutView({ experiences, skills }: Props) {
  const categories = Array.from(new Set(skills.map((s) => s.category)))

  return (
    <Box sx={{ maxWidth: 1200, mx: "auto", py: 8, px: 3 }}>
      <AnimatedSection>
        <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" }, gap: 8, alignItems: "center", mb: 10 }}>
          <Box>
            <p style={{ fontFamily: "var(--font-mono)", fontSize: 11, fontWeight: 600, color: brand.primary, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 12 }}>
              About Me
            </p>
            <h1 style={{ fontFamily: "var(--font-display)", fontSize: 48, fontWeight: 700, color: brand.text, marginBottom: 24 }}>
              Richard Korankye
            </h1>
            <p style={para}>
              I&apos;m a Senior Full-Stack Software Engineer based in Accra, Ghana with over 7 years of experience
              building production systems for businesses across West Africa and beyond.
            </p>
            <p style={para}>
              My work spans SaaS platforms, ERP systems, AI-powered tools, and everything in between. I care deeply
              about writing code that actually solves real problems — not just code that passes a code review.
            </p>
            <p style={{ ...para, marginBottom: 0 }}>
              When I&apos;m not building, I&apos;m writing about the hard-won lessons from shipping real products with real constraints.
            </p>
            <Box sx={{ display: "flex", gap: 2, mt: 4 }}>
              <Link href="/#contact">
                <Button variant="contained" size="large">Hire Me</Button>
              </Link>
              <Link href="/projects">
                <Button variant="outlined" size="large" sx={{ borderColor: brand.border, color: brand.text }}>View Projects</Button>
              </Link>
            </Box>
          </Box>

          <Card sx={{ p: 4 }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 3.5 }}>
              <Box sx={{ width: 80, height: 80, borderRadius: "50%", background: "rgba(79,70,229,0.14)", border: "2px solid rgba(79,70,229,0.3)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <span style={{ fontFamily: "var(--font-display)", fontSize: 30, fontWeight: 700, color: brand.primary }}>RK</span>
              </Box>
              <Box>
                <h2 style={{ fontSize: 18, fontWeight: 600, color: brand.text, margin: 0 }}>Richard Korankye</h2>
                <p style={{ fontSize: 14, color: brand.primary, margin: "2px 0 0" }}>Senior Full-Stack Engineer</p>
              </Box>
            </Box>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5, fontSize: 14, color: brand.textSecondary }}>
              {([
                ["📍", "Accra, Ghana (GMT+0)"],
                ["💼", "Senior SE @ JiBiFlow / BreakInvent LLC"],
                ["📧", "richardkorankye07@gmail.com"],
                ["🌍", "Open to remote worldwide"],
                ["⚡", "7+ years experience"],
              ] as const).map(([icon, text]) => (
                <Box key={text} sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                  <span>{icon}</span>
                  <span>{text}</span>
                </Box>
              ))}
            </Box>
          </Card>
        </Box>
      </AnimatedSection>

      <AnimatedSection delay={0.1}>
        <h2 style={h2}>Technical Skills</h2>
        <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", md: "1fr 1fr", lg: "repeat(3, 1fr)" }, gap: 3, mb: 10 }}>
          {categories.map((cat) => (
            <Card key={cat} sx={{ height: "100%", p: 3 }}>
              <h3 style={{ fontFamily: "var(--font-mono)", fontSize: 11, fontWeight: 600, color: brand.primary, textTransform: "uppercase", letterSpacing: "0.12em", marginBottom: 16 }}>
                {cat}
              </h3>
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                {skills.filter((s) => s.category === cat).map((s) => (
                  <TechBadge key={s.id} name={s.name} />
                ))}
              </Box>
            </Card>
          ))}
        </Box>
      </AnimatedSection>

      <AnimatedSection delay={0.15}>
        <h2 style={h2}>Experience</h2>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
          {experiences.map((exp) => (
            <Card key={exp.id} sx={{ p: 4 }}>
              <Box sx={{ display: "flex", flexWrap: "wrap", alignItems: "flex-start", justifyContent: "space-between", gap: 2, mb: 2 }}>
                <Box>
                  <h3 style={{ fontSize: 20, fontWeight: 600, color: brand.text, margin: 0 }}>{exp.role}</h3>
                  <p style={{ fontSize: 16, color: brand.primary, margin: "4px 0 0" }}>{exp.company}</p>
                  <p style={{ fontFamily: "var(--font-mono)", fontSize: 12, color: brand.textSecondary, margin: "4px 0 0" }}>
                    {formatDate(exp.startDate).split(" ").slice(-1)[0]} —{" "}
                    {exp.current ? "Present" : formatDate(exp.endDate!).split(" ").slice(-1)[0]}
                  </p>
                </Box>
                <Chip label={exp.roleType} color="primary" variant="outlined" sx={{ textTransform: "uppercase", fontFamily: "var(--font-mono)", fontSize: 11 }} />
              </Box>
              <Box component="ul" sx={{ listStyle: "none", p: 0, m: 0, display: "flex", flexDirection: "column", gap: 1 }}>
                {parseJsonArray(exp.bullets).map((bullet, i) => (
                  <Box component="li" key={i} sx={{ display: "flex", alignItems: "flex-start", gap: 1.5, color: brand.textSecondary }}>
                    <span style={{ color: brand.primary, marginTop: 2 }}>·</span>
                    <span style={{ fontSize: 14, lineHeight: 1.7 }}>{bullet}</span>
                  </Box>
                ))}
              </Box>
              <Divider sx={{ borderColor: brand.borderSubtle, my: 2 }} />
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1.5 }}>
                {parseJsonArray(exp.techStack).map((t) => (
                  <TechBadge key={t} name={t} variant="mono" />
                ))}
              </Box>
            </Card>
          ))}
        </Box>
      </AnimatedSection>
    </Box>
  )
}
