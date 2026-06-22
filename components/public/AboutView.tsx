"use client"

import Link from "next/link"
import { Row, Col, Card, Button, Tag, Divider } from "antd"
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
    <div style={{ maxWidth: 1200, margin: "0 auto", padding: "64px 24px" }}>
      <AnimatedSection>
        <Row gutter={[64, 48]} align="middle" style={{ marginBottom: 80 }}>
          <Col xs={24} md={12}>
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
              When I&apos;m not building, I&apos;m writing about the hard-won lessons from shipping real products
              with real constraints.
            </p>
            <div style={{ display: "flex", gap: 16, marginTop: 32 }}>
              <Link href="/#contact">
                <Button type="primary" size="large">Hire Me</Button>
              </Link>
              <Link href="/projects">
                <Button size="large" style={{ borderColor: brand.border }}>View Projects</Button>
              </Link>
            </div>
          </Col>

          <Col xs={24} md={12}>
            <Card variant="outlined" style={{ borderColor: brand.border }} styles={{ body: { padding: 32 } }}>
              <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 28 }}>
                <div style={{ width: 80, height: 80, borderRadius: "50%", background: "rgba(79,70,229,0.12)", border: "2px solid rgba(79,70,229,0.25)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <span style={{ fontFamily: "var(--font-display)", fontSize: 30, fontWeight: 700, color: brand.primary }}>RK</span>
                </div>
                <div>
                  <h2 style={{ fontSize: 18, fontWeight: 600, color: brand.text, margin: 0 }}>Richard Korankye</h2>
                  <p style={{ fontSize: 14, color: brand.primary, margin: "2px 0 0" }}>Senior Full-Stack Engineer</p>
                </div>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 12, fontSize: 14, color: brand.textSecondary }}>
                {([
                  ["📍", "Accra, Ghana (GMT+0)"],
                  ["💼", "Senior SE @ JiBiFlow / BreakInvent LLC"],
                  ["📧", "richardkorankye07@gmail.com"],
                  ["🌍", "Open to remote worldwide"],
                  ["⚡", "7+ years experience"],
                ] as const).map(([icon, text]) => (
                  <div key={text} style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    <span>{icon}</span>
                    <span>{text}</span>
                  </div>
                ))}
              </div>
            </Card>
          </Col>
        </Row>
      </AnimatedSection>

      <AnimatedSection delay={0.1}>
        <h2 style={h2}>Technical Skills</h2>
        <Row gutter={[24, 24]} style={{ marginBottom: 80 }}>
          {categories.map((cat) => (
            <Col key={cat} xs={24} md={12} lg={8}>
              <Card variant="outlined" style={{ height: "100%", borderColor: brand.border }} styles={{ body: { padding: 24 } }}>
                <h3 style={{ fontFamily: "var(--font-mono)", fontSize: 11, fontWeight: 600, color: brand.primary, textTransform: "uppercase", letterSpacing: "0.12em", marginBottom: 16 }}>
                  {cat}
                </h3>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                  {skills.filter((s) => s.category === cat).map((s) => (
                    <TechBadge key={s.id} name={s.name} />
                  ))}
                </div>
              </Card>
            </Col>
          ))}
        </Row>
      </AnimatedSection>

      <AnimatedSection delay={0.15}>
        <h2 style={h2}>Experience</h2>
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          {experiences.map((exp) => (
            <Card key={exp.id} variant="outlined" style={{ borderColor: brand.border }} styles={{ body: { padding: 32 } }}>
              <div style={{ display: "flex", flexWrap: "wrap", alignItems: "flex-start", justifyContent: "space-between", gap: 16, marginBottom: 16 }}>
                <div>
                  <h3 style={{ fontSize: 20, fontWeight: 600, color: brand.text, margin: 0 }}>{exp.role}</h3>
                  <p style={{ fontSize: 16, color: brand.primary, margin: "4px 0 0" }}>{exp.company}</p>
                  <p style={{ fontFamily: "var(--font-mono)", fontSize: 12, color: brand.textSecondary, margin: "4px 0 0" }}>
                    {formatDate(exp.startDate).split(" ").slice(-1)[0]} —{" "}
                    {exp.current ? "Present" : formatDate(exp.endDate!).split(" ").slice(-1)[0]}
                  </p>
                </div>
                <Tag color="processing" style={{ textTransform: "uppercase", fontFamily: "var(--font-mono)", fontSize: 11 }}>
                  {exp.roleType}
                </Tag>
              </div>
              <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 8 }}>
                {parseJsonArray(exp.bullets).map((bullet, i) => (
                  <li key={i} style={{ display: "flex", alignItems: "flex-start", gap: 12, color: brand.textSecondary }}>
                    <span style={{ color: brand.primary, marginTop: 2 }}>·</span>
                    <span style={{ fontSize: 14, lineHeight: 1.7 }}>{bullet}</span>
                  </li>
                ))}
              </ul>
              <Divider style={{ borderColor: brand.borderSubtle, margin: "16px 0" }} />
              <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
                {parseJsonArray(exp.techStack).map((t) => (
                  <TechBadge key={t} name={t} variant="mono" />
                ))}
              </div>
            </Card>
          ))}
        </div>
      </AnimatedSection>
    </div>
  )
}
