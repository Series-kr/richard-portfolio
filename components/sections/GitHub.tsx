"use client"

import { Card, CardActionArea, Chip, Box } from "@mui/material"
import StarIcon from "@mui/icons-material/Star"
import CallSplitIcon from "@mui/icons-material/CallSplit"
import GitHubIcon from "@mui/icons-material/GitHub"
import { AnimatedSection } from "@/components/shared/AnimatedSection"
import { parseJsonArray } from "@/lib/utils"
import { brand } from "@/lib/theme"
import type { GitHubRepo } from "@prisma/client"

interface Props {
  repos: GitHubRepo[]
}

const languageColors: Record<string, string> = {
  TypeScript: "#3178c6",
  JavaScript: "#f7df1e",
  Python: "#3572A5",
  Go: "#00ADD8",
  PHP: "#4F5D95",
  Rust: "#dea584",
  Java: "#b07219",
}

export function GitHubSection({ repos }: Props) {
  if (repos.length === 0) return null

  return (
    <Box
      component="section"
      sx={{ py: 8, px: 3, background: brand.bgBase, borderTop: `1px solid ${brand.borderSubtle}`, borderBottom: `1px solid ${brand.borderSubtle}`, overflow: "hidden" }}
    >
      <Box sx={{ maxWidth: 1200, mx: "auto" }}>
        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: 3 }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
            <GitHubIcon sx={{ fontSize: 24, color: brand.primary }} />
            <h2 style={{ fontSize: 18, fontWeight: 600, color: brand.text, margin: 0 }}>Recent Open Source</h2>
          </Box>
          <a
            href={`https://github.com/${process.env.NEXT_PUBLIC_GITHUB_USERNAME || "Series-kr"}`}
            target="_blank"
            rel="noopener noreferrer"
            style={{ fontFamily: "var(--font-mono)", fontSize: 11, fontWeight: 600, color: brand.textSecondary, textTransform: "uppercase", letterSpacing: "0.1em" }}
          >
            View All Repos
          </a>
        </Box>

        <Box className="no-scrollbar" sx={{ display: "flex", gap: 3, overflowX: "auto", pb: 2 }}>
          {repos.map((repo, i) => (
            <AnimatedSection key={repo.id} delay={i * 0.08}>
              <Card sx={{ minWidth: 320 }}>
                <CardActionArea
                  href={repo.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={{ p: 3, height: "100%", alignItems: "flex-start", display: "block" }}
                >
                  <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: 2, gap: 1 }}>
                    <span style={{ fontSize: 16, fontWeight: 700, color: brand.text, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                      {repo.name}
                    </span>
                    {repo.language && (
                      <Chip
                        label={repo.language.toUpperCase()}
                        size="small"
                        sx={{ fontSize: 11, fontWeight: 700, bgcolor: `${languageColors[repo.language] || "#71717A"}22`, color: languageColors[repo.language] || brand.textSecondary, border: "none" }}
                      />
                    )}
                  </Box>

                  <p style={{ fontSize: 14, color: brand.textSecondary, marginBottom: 24, height: 40, overflow: "hidden" }}>
                    {repo.description || "No description"}
                  </p>

                  <Box sx={{ display: "flex", gap: 3 }}>
                    <span style={{ display: "flex", alignItems: "center", gap: 6, color: brand.textSecondary, fontFamily: "var(--font-mono)", fontSize: 13 }}>
                      <StarIcon sx={{ fontSize: 16, color: "#F5A623" }} /> {repo.stars.toLocaleString()}
                    </span>
                    <span style={{ display: "flex", alignItems: "center", gap: 6, color: brand.textSecondary, fontFamily: "var(--font-mono)", fontSize: 13 }}>
                      <CallSplitIcon sx={{ fontSize: 16 }} /> {repo.forks}
                    </span>
                  </Box>

                  {repo.topics && parseJsonArray(repo.topics).length > 0 && (
                    <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.75, mt: 2, pt: 2, borderTop: `1px solid ${brand.borderSubtle}` }}>
                      {parseJsonArray(repo.topics).slice(0, 3).map((topic) => (
                        <Chip key={topic} label={topic} size="small" sx={{ fontFamily: "var(--font-mono)", fontSize: 11, bgcolor: "rgba(230,180,80,0.12)", color: brand.primarySoft, border: "1px solid rgba(230,180,80,0.3)" }} />
                      ))}
                    </Box>
                  )}
                </CardActionArea>
              </Card>
            </AnimatedSection>
          ))}
        </Box>
      </Box>
    </Box>
  )
}
