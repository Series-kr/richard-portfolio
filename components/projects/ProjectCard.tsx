"use client"

import Link from "next/link"
import Image from "next/image"
import { Card, Row, Col, Button } from "antd"
import { ArrowRightOutlined, ExportOutlined } from "@ant-design/icons"
import { TechBadge } from "@/components/shared/TechBadge"
import { parseJsonArray } from "@/lib/utils"
import { brand } from "@/lib/theme"
import type { Project } from "@prisma/client"

interface Props {
  project: Project
  featured?: boolean
}

function categoryEmoji(category: string): string {
  return category === "SaaS" ? "⚙" : category === "EdTech" ? "🎓" : category === "AI" ? "🤖" : "🏢"
}

export function ProjectCard({ project, featured = false }: Props) {
  const tech = parseJsonArray(project.techStack)

  if (featured) {
    return (
      <Card variant="outlined" hoverable styles={{ body: { padding: 0 } }} style={{ overflow: "hidden", borderColor: brand.border }}>
        <Row>
          <Col xs={24} md={12}>
            <div style={{ padding: "40px", display: "flex", flexDirection: "column", justifyContent: "center", height: "100%" }}>
              <span style={{ fontFamily: "var(--font-mono)", fontSize: 11, fontWeight: 600, color: brand.primary, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 16 }}>
                Featured Project · {project.category}
              </span>
              <h3 style={{ fontFamily: "var(--font-display)", fontSize: 32, fontWeight: 700, color: brand.text, marginBottom: 16, lineHeight: 1.2 }}>
                {project.title}
              </h3>
              <p style={{ fontSize: 15, color: brand.textSecondary, marginBottom: 24, lineHeight: 1.7 }}>{project.shortDesc}</p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 28 }}>
                {tech.slice(0, 5).map((t) => (
                  <TechBadge key={t} name={t} />
                ))}
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                <Link href={`/projects/${project.slug}`}>
                  <Button type="primary" icon={<ArrowRightOutlined />} iconPosition="end">
                    Case Study
                  </Button>
                </Link>
                {project.liveUrl && (
                  <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                    <Button type="text" icon={<ExportOutlined />}>Live</Button>
                  </a>
                )}
              </div>
            </div>
          </Col>
          <Col xs={24} md={12}>
            <div style={{ position: "relative", minHeight: 280, height: "100%", background: "linear-gradient(135deg, #1A2235, #0B1120)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              {project.imageUrl ? (
                <Image src={project.imageUrl} alt={project.title} fill style={{ objectFit: "cover" }} sizes="(max-width: 768px) 100vw, 50vw" />
              ) : (
                <div style={{ textAlign: "center", padding: 32 }}>
                  <div style={{ width: 80, height: 80, borderRadius: 16, background: "rgba(79,70,229,0.12)", border: "1px solid rgba(79,70,229,0.25)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px", fontSize: 30 }}>
                    {categoryEmoji(project.category)}
                  </div>
                  <p style={{ fontFamily: "var(--font-mono)", fontSize: 12, color: brand.primary, textTransform: "uppercase", letterSpacing: "0.15em" }}>{project.category}</p>
                </div>
              )}
            </div>
          </Col>
        </Row>
      </Card>
    )
  }

  return (
    <Card
      variant="outlined"
      hoverable
      style={{ height: "100%", overflow: "hidden", borderColor: brand.border }}
      styles={{ body: { padding: 20 } }}
      cover={
        <div style={{ height: 176, position: "relative", background: "linear-gradient(135deg, #1A2235, #0B1120)", display: "flex", alignItems: "center", justifyContent: "center" }}>
          {project.imageUrl ? (
            <Image src={project.imageUrl} alt={project.title} fill style={{ objectFit: "cover" }} sizes="(max-width: 768px) 100vw, 33vw" />
          ) : (
            <div style={{ textAlign: "center" }}>
              <div style={{ width: 56, height: 56, borderRadius: 12, background: "rgba(79,70,229,0.12)", border: "1px solid rgba(79,70,229,0.25)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 8px", fontSize: 24 }}>
                {categoryEmoji(project.category)}
              </div>
              <p style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: brand.textMuted, textTransform: "uppercase", letterSpacing: "0.15em" }}>{project.category}</p>
            </div>
          )}
        </div>
      }
    >
      <h4 style={{ fontSize: 17, fontWeight: 600, color: brand.text, marginBottom: 8 }}>{project.title}</h4>
      <p style={{ fontSize: 13, color: brand.textSecondary, marginBottom: 16, lineHeight: 1.6, minHeight: 42 }}>{project.shortDesc}</p>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 16 }}>
        {tech.slice(0, 3).map((t) => (
          <TechBadge key={t} name={t} small />
        ))}
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingTop: 12, borderTop: `1px solid ${brand.borderSubtle}` }}>
        <span style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: brand.primary, textTransform: "uppercase", letterSpacing: "0.08em" }}>{project.category}</span>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          {project.liveUrl && (
            <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" title="View live" style={{ color: brand.textSecondary }}>
              <ExportOutlined />
            </a>
          )}
          <Link href={`/projects/${project.slug}`} style={{ color: brand.textSecondary }}>
            <ArrowRightOutlined />
          </Link>
        </div>
      </div>
    </Card>
  )
}
