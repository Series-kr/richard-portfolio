"use client"

import { Card, Tag } from "antd"
import { StarFilled, ForkOutlined, GithubOutlined } from "@ant-design/icons"
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
    <section style={{ padding: "64px 24px", background: "#0B1120", borderTop: `1px solid ${brand.borderSubtle}`, borderBottom: `1px solid ${brand.borderSubtle}`, overflow: "hidden" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 24 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <GithubOutlined style={{ fontSize: 24, color: brand.primary }} />
            <h2 style={{ fontSize: 18, fontWeight: 600, color: brand.text, margin: 0 }}>Recent Open Source</h2>
          </div>
          <a
            href={`https://github.com/${process.env.NEXT_PUBLIC_GITHUB_USERNAME || "Series-kr"}`}
            target="_blank"
            rel="noopener noreferrer"
            style={{ fontFamily: "var(--font-mono)", fontSize: 11, fontWeight: 600, color: brand.textSecondary, textTransform: "uppercase", letterSpacing: "0.1em" }}
          >
            View All Repos
          </a>
        </div>

        <div className="no-scrollbar" style={{ display: "flex", gap: 24, overflowX: "auto", paddingBottom: 16 }}>
          {repos.map((repo, i) => (
            <AnimatedSection key={repo.id} delay={i * 0.08}>
              <Card
                variant="outlined"
                hoverable
                style={{ minWidth: 320, borderColor: brand.border }}
                styles={{ body: { padding: 24 } }}
                onClick={() => window.open(repo.url, "_blank", "noopener,noreferrer")}
              >
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16, gap: 8 }}>
                  <span style={{ fontSize: 16, fontWeight: 700, color: brand.text, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                    {repo.name}
                  </span>
                  {repo.language && (
                    <Tag
                      style={{
                        margin: 0,
                        fontSize: 11,
                        fontWeight: 700,
                        background: `${languageColors[repo.language] || "#64748B"}22`,
                        color: languageColors[repo.language] || brand.textSecondary,
                        border: "none",
                      }}
                    >
                      {repo.language.toUpperCase()}
                    </Tag>
                  )}
                </div>

                <p style={{ fontSize: 14, color: brand.textSecondary, marginBottom: 24, height: 40, overflow: "hidden" }}>
                  {repo.description || "No description"}
                </p>

                <div style={{ display: "flex", gap: 24 }}>
                  <span style={{ display: "flex", alignItems: "center", gap: 6, color: brand.textSecondary, fontFamily: "var(--font-mono)", fontSize: 13 }}>
                    <StarFilled style={{ color: "#F5A623" }} /> {repo.stars.toLocaleString()}
                  </span>
                  <span style={{ display: "flex", alignItems: "center", gap: 6, color: brand.textSecondary, fontFamily: "var(--font-mono)", fontSize: 13 }}>
                    <ForkOutlined /> {repo.forks}
                  </span>
                </div>

                {repo.topics && parseJsonArray(repo.topics).length > 0 && (
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginTop: 16, paddingTop: 16, borderTop: `1px solid ${brand.borderSubtle}` }}>
                    {parseJsonArray(repo.topics).slice(0, 3).map((topic) => (
                      <Tag key={topic} style={{ margin: 0, fontFamily: "var(--font-mono)", fontSize: 11, background: "rgba(79,70,229,0.1)", color: "#A5B4FC", border: "1px solid rgba(79,70,229,0.25)" }}>
                        {topic}
                      </Tag>
                    ))}
                  </div>
                )}
              </Card>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  )
}
