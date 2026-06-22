"use client"

import { Card, Button, Divider } from "antd"
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
    <section
      id="about"
      style={{
        padding: "64px 24px",
        maxWidth: 1200,
        margin: "0 auto",
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
        gap: 64,
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
        <Card variant="outlined" style={{ borderColor: brand.border }} styles={{ body: { padding: 32 } }}>
          <div style={{ display: "flex", alignItems: "center", gap: 20, marginBottom: 28 }}>
            <div
              style={{
                width: 72,
                height: 72,
                borderRadius: "50%",
                border: `2px solid rgba(79, 70, 229, 0.3)`,
                background: brand.bgElevated,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
              }}
            >
              <span style={{ fontFamily: "var(--font-display)", fontSize: 24, fontWeight: 700, color: brand.primary }}>RK</span>
            </div>
            <div>
              <h3 style={{ fontSize: 18, fontWeight: 600, color: brand.text, margin: 0 }}>Richard Korankye</h3>
              <p style={{ fontSize: 14, color: brand.primary, margin: "2px 0 0" }}>Senior Full-Stack Engineer</p>
              <p style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: brand.textMuted, margin: "2px 0 0" }}>
                richardkorankye07@gmail.com
              </p>
            </div>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            {quickFacts.map((fact) => (
              <div key={fact.label} style={{ display: "flex", alignItems: "center", gap: 12, color: brand.textSecondary }}>
                <FontAwesomeIcon icon={fact.icon} style={{ color: brand.primary, width: 14 }} />
                <span style={{ fontSize: 14 }}>{fact.label}</span>
              </div>
            ))}
          </div>

          <Divider style={{ borderColor: brand.borderSubtle, margin: "24px 0" }} />

          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <span className="pulse-dot" style={{ width: 8, height: 8, borderRadius: "50%", background: brand.success }} />
              <span style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: brand.success, textTransform: "uppercase", letterSpacing: "0.12em" }}>
                Open to opportunities
              </span>
            </div>
            <Button type="link" href="#contact" icon={<FontAwesomeIcon icon={faDownload} />} style={{ padding: 0 }}>
              Download CV
            </Button>
          </div>
        </Card>
      </AnimatedSection>
    </section>
  )
}
