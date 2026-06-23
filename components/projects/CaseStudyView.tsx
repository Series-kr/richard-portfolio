"use client"

import Link from "next/link"
import Image from "next/image"
import { Box, Card, Button, Chip } from "@mui/material"
import ArrowBackIcon from "@mui/icons-material/ArrowBack"
import OpenInNewIcon from "@mui/icons-material/OpenInNew"
import GitHubIcon from "@mui/icons-material/GitHub"
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
    <Box sx={{ maxWidth: 1200, mx: "auto", py: 8, px: 3 }}>
      <AnimatedSection>
        <Box sx={{ mb: 6 }}>
          <Link href="/projects">
            <Button variant="text" startIcon={<ArrowBackIcon />} sx={{ pl: 0, color: brand.textSecondary, textTransform: "uppercase", fontFamily: "var(--font-mono)", fontSize: 11 }}>
              All Projects
            </Button>
          </Link>

          <Box sx={{ display: "flex", flexWrap: "wrap", alignItems: "flex-start", justifyContent: "space-between", gap: 3, mt: 3 }}>
            <Box sx={{ flex: 1, minWidth: 280 }}>
              <span style={{ fontFamily: "var(--font-mono)", fontSize: 11, fontWeight: 600, color: brand.primary, textTransform: "uppercase", letterSpacing: "0.1em" }}>
                {project.category}
              </span>
              <h1 style={{ fontFamily: "var(--font-display)", fontSize: 48, fontWeight: 700, color: brand.text, margin: "8px 0 16px" }}>
                {project.title}
              </h1>
              <p style={{ fontSize: 18, color: brand.textSecondary, maxWidth: 640 }}>{project.shortDesc}</p>
            </Box>
            <Box sx={{ display: "flex", gap: 1.5, flexShrink: 0 }}>
              {project.liveUrl && (
                <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                  <Button variant="contained" size="large" startIcon={<OpenInNewIcon />}>Live</Button>
                </a>
              )}
              {project.githubUrl && (
                <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                  <Button variant="outlined" size="large" startIcon={<GitHubIcon />} sx={{ borderColor: brand.border, color: brand.text }}>GitHub</Button>
                </a>
              )}
            </Box>
          </Box>
        </Box>
      </AnimatedSection>

      <AnimatedSection delay={0.15}>
        <Box sx={{ mb: 6 }}>
          <h2 style={sectionHeading}>Tech Stack</h2>
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
            {tech.map((t) => (
              <TechBadge key={t} name={t} />
            ))}
          </Box>
        </Box>
      </AnimatedSection>

      <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", md: "repeat(3, 1fr)" }, gap: 3, mb: 6 }}>
        {[
          { label: "The Problem", content: project.problem },
          { label: "The Solution", content: project.solution },
          { label: "The Impact", content: project.impact },
        ].map((section, i) => (
          <AnimatedSection key={section.label} delay={0.1 + i * 0.08}>
            <Card sx={{ height: "100%", p: 4 }}>
              <h3 style={{ fontFamily: "var(--font-display)", fontSize: 20, fontWeight: 700, color: brand.primary, marginBottom: 16 }}>
                {section.label}
              </h3>
              <p style={{ fontSize: 16, color: brand.textSecondary, lineHeight: 1.75, whiteSpace: "pre-line" }}>{section.content}</p>
            </Card>
          </AnimatedSection>
        ))}
      </Box>

      {screenshots.length > 0 && (
        <AnimatedSection delay={0.2}>
          <Box sx={{ mb: 6 }}>
            <h2 style={sectionHeading}>Screenshots</h2>
            <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" }, gap: 2 }}>
              {screenshots.map((url, i) => (
                <Box key={i} sx={{ borderRadius: 2, overflow: "hidden", border: `1px solid ${brand.border}`, position: "relative", aspectRatio: "16 / 9" }}>
                  <Image src={url} alt={`${project.title} screenshot ${i + 1}`} fill style={{ objectFit: "cover" }} sizes="(max-width: 768px) 100vw, 50vw" />
                </Box>
              ))}
            </Box>
          </Box>
        </AnimatedSection>
      )}

      {related.length > 0 && (
        <AnimatedSection delay={0.25}>
          <Box sx={{ mb: 6 }}>
            <h2 style={sectionHeading}>Related Projects</h2>
            <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", md: "repeat(3, 1fr)" }, gap: 3 }}>
              {related.map((rel) => (
                <Link key={rel.id} href={`/projects/${rel.slug}`}>
                  <Card sx={{ height: "100%", p: 3, transition: "border-color 0.2s", "&:hover": { borderColor: brand.primary } }}>
                    <Chip label={rel.category} color="primary" variant="outlined" size="small" sx={{ fontFamily: "var(--font-mono)", fontSize: 11, mb: 1 }} />
                    <h4 style={{ fontSize: 16, fontWeight: 600, color: brand.text, margin: "8px 0" }}>{rel.title}</h4>
                    <p style={{ fontSize: 14, color: brand.textSecondary, margin: 0 }}>{rel.shortDesc}</p>
                  </Card>
                </Link>
              ))}
            </Box>
          </Box>
        </AnimatedSection>
      )}

      <AnimatedSection delay={0.3}>
        <Box sx={{ background: "linear-gradient(90deg, rgba(79,70,229,0.14), transparent)", border: "1px solid rgba(79,70,229,0.3)", p: 5, borderRadius: 2, textAlign: "center" }}>
          <h3 style={{ fontFamily: "var(--font-display)", fontSize: 28, fontWeight: 700, color: brand.text, marginBottom: 12 }}>
            Want to build something like this?
          </h3>
          <p style={{ fontSize: 16, color: brand.textSecondary, marginBottom: 24 }}>
            I&apos;m available for freelance projects and consulting engagements.
          </p>
          <Link href="/#contact">
            <Button variant="contained" size="large">Get in Touch</Button>
          </Link>
        </Box>
      </AnimatedSection>
    </Box>
  )
}
