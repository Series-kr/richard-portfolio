"use client"

import Link from "next/link"
import Image from "next/image"
import { Card, Button, Box } from "@mui/material"
import ArrowForwardIcon from "@mui/icons-material/ArrowForward"
import OpenInNewIcon from "@mui/icons-material/OpenInNew"
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
      <Card sx={{ overflow: "hidden" }}>
        <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" } }}>
          <Box sx={{ p: 5, display: "flex", flexDirection: "column", justifyContent: "center" }}>
            <span style={{ fontFamily: "var(--font-mono)", fontSize: 11, fontWeight: 600, color: brand.primary, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 16 }}>
              Featured Project · {project.category}
            </span>
            <h3 style={{ fontFamily: "var(--font-display)", fontSize: 32, fontWeight: 700, color: brand.text, marginBottom: 16, lineHeight: 1.2 }}>
              {project.title}
            </h3>
            <p style={{ fontSize: 15, color: brand.textSecondary, marginBottom: 24, lineHeight: 1.7 }}>{project.shortDesc}</p>
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mb: 3.5 }}>
              {tech.slice(0, 5).map((t) => (
                <TechBadge key={t} name={t} />
              ))}
            </Box>
            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              <Link href={`/projects/${project.slug}`}>
                <Button variant="contained" endIcon={<ArrowForwardIcon />}>Case Study</Button>
              </Link>
              {project.liveUrl && (
                <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                  <Button variant="text" startIcon={<OpenInNewIcon />}>Live</Button>
                </a>
              )}
            </Box>
          </Box>
          <Box sx={{ position: "relative", minHeight: 280, background: `linear-gradient(135deg, ${brand.bgElevated}, ${brand.bgBase})`, display: "flex", alignItems: "center", justifyContent: "center" }}>
            {project.imageUrl ? (
              <Image src={project.imageUrl} alt={project.title} fill style={{ objectFit: "cover" }} sizes="(max-width: 768px) 100vw, 50vw" />
            ) : (
              <Box sx={{ textAlign: "center", p: 4 }}>
                <Box sx={{ width: 80, height: 80, borderRadius: 2, background: "rgba(230,180,80,0.14)", border: "1px solid rgba(230,180,80,0.3)", display: "flex", alignItems: "center", justifyContent: "center", mx: "auto", mb: 2, fontSize: 30 }}>
                  {categoryEmoji(project.category)}
                </Box>
                <p style={{ fontFamily: "var(--font-mono)", fontSize: 12, color: brand.primary, textTransform: "uppercase", letterSpacing: "0.15em" }}>{project.category}</p>
              </Box>
            )}
          </Box>
        </Box>
      </Card>
    )
  }

  return (
    <Card sx={{ height: "100%", display: "flex", flexDirection: "column", overflow: "hidden" }}>
      <Box sx={{ height: 176, position: "relative", background: `linear-gradient(135deg, ${brand.bgElevated}, ${brand.bgBase})`, display: "flex", alignItems: "center", justifyContent: "center" }}>
        {project.imageUrl ? (
          <Image src={project.imageUrl} alt={project.title} fill style={{ objectFit: "cover" }} sizes="(max-width: 768px) 100vw, 33vw" />
        ) : (
          <Box sx={{ textAlign: "center" }}>
            <Box sx={{ width: 56, height: 56, borderRadius: 1.5, background: "rgba(230,180,80,0.14)", border: "1px solid rgba(230,180,80,0.3)", display: "flex", alignItems: "center", justifyContent: "center", mx: "auto", mb: 1, fontSize: 24 }}>
              {categoryEmoji(project.category)}
            </Box>
            <p style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: brand.textMuted, textTransform: "uppercase", letterSpacing: "0.15em" }}>{project.category}</p>
          </Box>
        )}
      </Box>
      <Box sx={{ p: 2.5, flex: 1, display: "flex", flexDirection: "column" }}>
        <h4 style={{ fontSize: 17, fontWeight: 600, color: brand.text, marginBottom: 8 }}>{project.title}</h4>
        <p style={{ fontSize: 13, color: brand.textSecondary, marginBottom: 16, lineHeight: 1.6, minHeight: 42, flex: 1 }}>{project.shortDesc}</p>
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.75, mb: 2 }}>
          {tech.slice(0, 3).map((t) => (
            <TechBadge key={t} name={t} small />
          ))}
        </Box>
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", pt: 1.5, borderTop: `1px solid ${brand.borderSubtle}` }}>
          <span style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: brand.primary, textTransform: "uppercase", letterSpacing: "0.08em" }}>{project.category}</span>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
            {project.liveUrl && (
              <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" title="View live" style={{ color: brand.textSecondary, display: "inline-flex" }}>
                <OpenInNewIcon sx={{ fontSize: 18 }} />
              </a>
            )}
            <Link href={`/projects/${project.slug}`} style={{ color: brand.textSecondary, display: "inline-flex" }}>
              <ArrowForwardIcon sx={{ fontSize: 18 }} />
            </Link>
          </Box>
        </Box>
      </Box>
    </Card>
  )
}
