"use client"

import Link from "next/link"
import Image from "next/image"
import { Row, Col, Card, Button, Tag } from "antd"
import { ArrowLeftOutlined, ExportOutlined, GithubOutlined } from "@ant-design/icons"
import { parseJsonArray } from "@/lib/utils"
import { TechBadge } from "@/components/shared/TechBadge"
import { AnimatedSection } from "@/components/shared/AnimatedSection"
import { brand } from "@/lib/theme"
import type { Project } from "@prisma/client"

const sectionHeading: React.CSSProperties = { fontFamily: "var(--font-display)", fontSize: 24, fontWeight: 700, color: brand.text, marginBottom: 24 }

interface Props {
  project: Project
  related: Project[]
}

export function CaseStudyView({ project, related }: Props) {
  const tech = parseJsonArray(project.techStack)
  const screenshots = parseJsonArray(project.screenshotUrls)

  return (
    <div style={{ maxWidth: 1200, margin: "0 auto", padding: "64px 24px" }}>
      <AnimatedSection>
        <div style={{ marginBottom: 48 }}>
          <Link href="/projects">
            <Button type="text" icon={<ArrowLeftOutlined />} style={{ paddingLeft: 0, color: brand.textSecondary, textTransform: "uppercase", fontFamily: "var(--font-mono)", fontSize: 11 }}>
              All Projects
            </Button>
          </Link>

          <div style={{ display: "flex", flexWrap: "wrap", alignItems: "flex-start", justifyContent: "space-between", gap: 24, marginTop: 24 }}>
            <div style={{ flex: 1, minWidth: 280 }}>
              <span style={{ fontFamily: "var(--font-mono)", fontSize: 11, fontWeight: 600, color: brand.primary, textTransform: "uppercase", letterSpacing: "0.1em" }}>
                {project.category}
              </span>
              <h1 style={{ fontFamily: "var(--font-display)", fontSize: 48, fontWeight: 700, color: brand.text, margin: "8px 0 16px" }}>
                {project.title}
              </h1>
              <p style={{ fontSize: 18, color: brand.textSecondary, maxWidth: 640 }}>{project.shortDesc}</p>
            </div>
            <div style={{ display: "flex", gap: 12, flexShrink: 0 }}>
              {project.liveUrl && (
                <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                  <Button type="primary" size="large" icon={<ExportOutlined />}>Live</Button>
                </a>
              )}
              {project.githubUrl && (
                <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                  <Button size="large" icon={<GithubOutlined />} style={{ borderColor: brand.border }}>GitHub</Button>
                </a>
              )}
            </div>
          </div>
        </div>
      </AnimatedSection>

      <AnimatedSection delay={0.15}>
        <div style={{ marginBottom: 48 }}>
          <h2 style={sectionHeading}>Tech Stack</h2>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
            {tech.map((t) => (
              <TechBadge key={t} name={t} />
            ))}
          </div>
        </div>
      </AnimatedSection>

      <Row gutter={[24, 24]} style={{ marginBottom: 48 }}>
        {[
          { label: "The Problem", content: project.problem },
          { label: "The Solution", content: project.solution },
          { label: "The Impact", content: project.impact },
        ].map((section, i) => (
          <Col key={section.label} xs={24} md={8}>
            <AnimatedSection delay={0.1 + i * 0.08}>
              <Card variant="outlined" style={{ height: "100%", borderColor: brand.border }} styles={{ body: { padding: 32 } }}>
                <h3 style={{ fontFamily: "var(--font-display)", fontSize: 20, fontWeight: 700, color: brand.primary, marginBottom: 16 }}>
                  {section.label}
                </h3>
                <p style={{ fontSize: 16, color: brand.textSecondary, lineHeight: 1.75, whiteSpace: "pre-line" }}>{section.content}</p>
              </Card>
            </AnimatedSection>
          </Col>
        ))}
      </Row>

      {screenshots.length > 0 && (
        <AnimatedSection delay={0.2}>
          <div style={{ marginBottom: 48 }}>
            <h2 style={sectionHeading}>Screenshots</h2>
            <Row gutter={[16, 16]}>
              {screenshots.map((url, i) => (
                <Col key={i} xs={24} md={12}>
                  <div style={{ borderRadius: 12, overflow: "hidden", border: `1px solid ${brand.border}`, position: "relative", aspectRatio: "16 / 9" }}>
                    <Image src={url} alt={`${project.title} screenshot ${i + 1}`} fill style={{ objectFit: "cover" }} sizes="(max-width: 768px) 100vw, 50vw" />
                  </div>
                </Col>
              ))}
            </Row>
          </div>
        </AnimatedSection>
      )}

      {related.length > 0 && (
        <AnimatedSection delay={0.25}>
          <div style={{ marginBottom: 48 }}>
            <h2 style={sectionHeading}>Related Projects</h2>
            <Row gutter={[24, 24]}>
              {related.map((rel) => (
                <Col key={rel.id} xs={24} md={8}>
                  <Link href={`/projects/${rel.slug}`}>
                    <Card variant="outlined" hoverable style={{ height: "100%", borderColor: brand.border }} styles={{ body: { padding: 24 } }}>
                      <Tag color="processing" style={{ fontFamily: "var(--font-mono)", fontSize: 11, marginBottom: 8 }}>{rel.category}</Tag>
                      <h4 style={{ fontSize: 16, fontWeight: 600, color: brand.text, margin: "8px 0" }}>{rel.title}</h4>
                      <p style={{ fontSize: 14, color: brand.textSecondary, margin: 0 }}>{rel.shortDesc}</p>
                    </Card>
                  </Link>
                </Col>
              ))}
            </Row>
          </div>
        </AnimatedSection>
      )}

      <AnimatedSection delay={0.3}>
        <div style={{ background: "linear-gradient(90deg, rgba(79,70,229,0.12), transparent)", border: "1px solid rgba(79,70,229,0.25)", padding: 40, borderRadius: 12, textAlign: "center" }}>
          <h3 style={{ fontFamily: "var(--font-display)", fontSize: 28, fontWeight: 700, color: brand.text, marginBottom: 12 }}>
            Want to build something like this?
          </h3>
          <p style={{ fontSize: 16, color: brand.textSecondary, marginBottom: 24 }}>
            I&apos;m available for freelance projects and consulting engagements.
          </p>
          <Link href="/#contact">
            <Button type="primary" size="large">Get in Touch</Button>
          </Link>
        </div>
      </AnimatedSection>
    </div>
  )
}
