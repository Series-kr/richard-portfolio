"use client"

import { Card, Button, Divider, Box } from "@mui/material"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faMapPin, faWifi, faLaptopCode, faGraduationCap, faLanguage, faDownload } from "@fortawesome/free-solid-svg-icons"
import { AnimatedSection } from "@/components/shared/AnimatedSection"
import { brand } from "@/lib/theme"

const quickFacts = [
  { icon: faMapPin, label: "Accra, Ghana (GMT+0)" },
  { icon: faWifi, label: "Open to Remote · Hybrid · On-site" },
  { icon: faLaptopCode, label: "Full Stack · Systems · AI" },
  { icon: faGraduationCap, label: "BSc. IT — GCTU" },
  { icon: faLanguage, label: "English · Akan (Twi)" },
]

const para: React.CSSProperties = { fontSize: 16, color: brand.textSecondary, lineHeight: 1.75, marginBottom: 20 }

export function About() {
  return (
    <Box
      component="section"
      id="about"
      sx={{
        py: 8,
        px: 3,
        maxWidth: 1200,
        mx: "auto",
        display: "grid",
        gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
        gap: 8,
        alignItems: "center",
      }}
    >
      <AnimatedSection direction="left">
        <p style={{ fontFamily: "var(--font-mono)", fontSize: 11, fontWeight: 600, color: brand.primary, textTransform: "uppercase", letterSpacing: "0.15em", marginBottom: 16 }}>
          About
        </p>
        <h2 style={{ fontFamily: "var(--font-display)", fontSize: 34, fontWeight: 700, color: brand.text, marginBottom: 24, lineHeight: 1.2 }}>
          More than code — I build things businesses depend on.
        </h2>
        <p style={para}>
          I am a Senior Full-Stack Software Engineer based in Accra, Ghana, with over 7 years of experience shipping
          production software for real businesses. I have built everything from multi-tenant SaaS platforms and school
          ERP systems to AI-powered tools and enterprise applications — owning the full stack from database schema to deployment.
        </p>
        <p style={para}>
          What drives me is the architecture layer — how systems are structured, how they handle scale, and how
          engineering decisions serve real business outcomes. I work with teams that care about craft: clean,
          maintainable code, thoughtful system design, and software that holds up in production.
        </p>
        <p style={{ ...para, marginBottom: 0 }}>
          Currently engineering at JiBiFlow/BreakInvent LLC and leading IT at Virtutor Online Ghana. I am open to
          senior and lead engineering roles — locally in Accra and internationally via remote.
        </p>
      </AnimatedSection>

      <AnimatedSection direction="right">
        <Card sx={{ p: 4 }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 2.5, mb: 3.5 }}>
            <Box
              sx={{
                width: 72,
                height: 72,
                borderRadius: "50%",
                border: "2px solid rgba(79, 70, 229, 0.3)",
                bgcolor: brand.bgElevated,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
              }}
            >
              <span style={{ fontFamily: "var(--font-display)", fontSize: 24, fontWeight: 700, color: brand.primary }}>RK</span>
            </Box>
            <Box>
              <h3 style={{ fontSize: 18, fontWeight: 600, color: brand.text, margin: 0 }}>Richard Korankye</h3>
              <p style={{ fontSize: 14, color: brand.primary, margin: "2px 0 0" }}>Senior Full-Stack Engineer</p>
              <p style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: brand.textMuted, margin: "2px 0 0" }}>
                richardkorankye07@gmail.com
              </p>
            </Box>
          </Box>

          <Box sx={{ display: "flex", flexDirection: "column", gap: 1.75 }}>
            {quickFacts.map((fact) => (
              <Box key={fact.label} sx={{ display: "flex", alignItems: "center", gap: 1.5, color: brand.textSecondary }}>
                <FontAwesomeIcon icon={fact.icon} style={{ color: brand.primary, width: 14 }} />
                <span style={{ fontSize: 14 }}>{fact.label}</span>
              </Box>
            ))}
          </Box>

          <Divider sx={{ borderColor: brand.borderSubtle, my: 3 }} />

          <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <span className="pulse-dot" style={{ width: 8, height: 8, borderRadius: "50%", background: brand.success }} />
              <span style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: brand.success, textTransform: "uppercase", letterSpacing: "0.12em" }}>
                Open to opportunities
              </span>
            </Box>
            <Button href="#contact" variant="text" startIcon={<FontAwesomeIcon icon={faDownload} />} sx={{ minWidth: 0 }}>
              Download CV
            </Button>
          </Box>
        </Card>
      </AnimatedSection>
    </Box>
  )
}
