"use client"

import { useState } from "react"
import { Row, Col, Card, Tag, Divider } from "antd"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCircleCheck, faLocationDot } from "@fortawesome/free-solid-svg-icons"
import { AnimatedSection } from "@/components/shared/AnimatedSection"
import { SectionHeader } from "@/components/shared/SectionHeader"
import { formatDate, parseJsonArray } from "@/lib/utils"
import { brand } from "@/lib/theme"
import type { Experience } from "@prisma/client"

interface Props {
  experiences: Experience[]
}

export function ExperienceSection({ experiences }: Props) {
  const sorted = [...experiences].sort((a, b) => a.order - b.order)
  const [active, setActive] = useState(0)
  const current = sorted[active]

  if (!current) return null

  return (
    <section id="experience" style={{ padding: "64px 24px", maxWidth: 1200, margin: "0 auto" }}>
      <SectionHeader title="Experience" />

      <Row gutter={[64, 32]}>
        <Col xs={24} md={9}>
          <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
            {sorted.map((exp, i) => {
              const isActive = active === i
              return (
                <AnimatedSection key={exp.id} delay={i * 0.1}>
                  <button
                    type="button"
                    onClick={() => setActive(i)}
                    style={{
                      width: "100%",
                      textAlign: "left",
                      background: "transparent",
                      border: "none",
                      cursor: "pointer",
                      paddingLeft: 24,
                      position: "relative",
                      opacity: isActive ? 1 : 0.5,
                      transition: "opacity 0.2s ease",
                    }}
                  >
                    <span
                      style={{
                        position: "absolute",
                        left: 0,
                        top: 6,
                        width: 12,
                        height: 12,
                        borderRadius: "50%",
                        background: isActive ? brand.primary : brand.textMuted,
                        boxShadow: isActive ? `0 0 0 4px rgba(79, 70, 229, 0.2)` : "none",
                      }}
                    />
                    <span
                      style={{
                        fontFamily: "var(--font-mono)",
                        fontSize: 11,
                        fontWeight: 600,
                        textTransform: "uppercase",
                        letterSpacing: "0.1em",
                        color: isActive ? brand.primary : brand.textSecondary,
                      }}
                    >
                      {formatDate(exp.startDate).split(" ").slice(-1)[0]} —{" "}
                      {exp.current ? "Present" : formatDate(exp.endDate!).split(" ").slice(-1)[0]}
                    </span>
                    <h4 style={{ fontSize: 18, fontWeight: 600, color: brand.text, margin: "4px 0 0", display: "flex", alignItems: "center", gap: 8 }}>
                      {exp.role}
                      {exp.current && <Tag color="success" style={{ margin: 0 }}>Current</Tag>}
                    </h4>
                    <p style={{ fontSize: 14, color: brand.textSecondary, margin: 0 }}>{exp.company}</p>
                  </button>
                </AnimatedSection>
              )
            })}
          </div>
        </Col>

        <Col xs={24} md={15}>
          <AnimatedSection key={active} direction="none">
            <Card variant="outlined" style={{ height: "100%", borderColor: brand.border }} styles={{ body: { padding: 32 } }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 24, gap: 16 }}>
                <div>
                  <h3 style={{ fontFamily: "var(--font-display)", fontSize: 28, fontWeight: 700, color: brand.text, margin: 0 }}>
                    {current.role}
                  </h3>
                  <p style={{ fontSize: 18, fontWeight: 600, color: brand.primary, margin: "4px 0 0" }}>{current.company}</p>
                  <p style={{ fontSize: 14, color: brand.textSecondary, margin: "4px 0 0", display: "flex", alignItems: "center", gap: 6 }}>
                    <FontAwesomeIcon icon={faLocationDot} style={{ color: brand.primary }} />
                    {current.location}
                  </p>
                </div>
                <Tag color="processing" style={{ textTransform: "uppercase", fontFamily: "var(--font-mono)", fontSize: 11 }}>
                  {current.roleType}
                </Tag>
              </div>

              <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 16 }}>
                {parseJsonArray(current.bullets).map((bullet, i) => (
                  <li key={i} style={{ display: "flex", alignItems: "flex-start", gap: 12, color: brand.textSecondary }}>
                    <FontAwesomeIcon icon={faCircleCheck} style={{ color: brand.primary, marginTop: 4, flexShrink: 0 }} />
                    <span style={{ fontSize: 15, lineHeight: 1.7 }}>{bullet}</span>
                  </li>
                ))}
              </ul>

              <Divider style={{ borderColor: brand.borderSubtle, margin: "24px 0 16px" }} />
              <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
                {parseJsonArray(current.techStack).map((tech) => (
                  <span key={tech} style={{ fontFamily: "var(--font-mono)", fontSize: 13, color: brand.textSecondary }}>
                    #{tech.toLowerCase().replace(/[\s.]/g, "")}
                  </span>
                ))}
              </div>
            </Card>
          </AnimatedSection>
        </Col>
      </Row>
    </section>
  )
}
