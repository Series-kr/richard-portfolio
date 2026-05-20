import Link from "next/link"
import { AnimatedSection } from "@/components/shared/AnimatedSection"
import { parseJsonArray } from "@/lib/utils"
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
    <section className="py-16 bg-[#050f1c] border-y border-[#1C2330]/60 overflow-hidden">
      <div className="max-w-[1200px] mx-auto px-6 md:px-8 lg:px-16">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <span className="text-3xl text-[#45f1c3]">⌘</span>
            <h2 className="font-[family-name:var(--font-dm-sans)] text-[18px] font-semibold text-[#d9e3f7]">
              Recent Open Source
            </h2>
          </div>
          <a
            href={`https://github.com/${process.env.NEXT_PUBLIC_GITHUB_USERNAME || "Series-kr"}`}
            target="_blank"
            rel="noopener noreferrer"
            className="font-[family-name:var(--font-mono)] text-[11px] font-semibold text-[#bacac2] hover:text-[#45f1c3] transition-colors uppercase tracking-[0.1em]"
          >
            View All Repos
          </a>
        </div>

        <div className="flex gap-6 overflow-x-auto pb-4 no-scrollbar">
          {repos.map((repo, i) => (
            <AnimatedSection key={repo.id} delay={i * 0.08}>
              <a
                href={repo.url}
                target="_blank"
                rel="noopener noreferrer"
                className="min-w-[320px] bg-[#091421] border border-[#1C2330] p-6 rounded-xl active-glow transition-all duration-300 block"
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="font-[family-name:var(--font-dm-sans)] text-[16px] font-bold text-[#d9e3f7] truncate mr-2">
                    {repo.name}
                  </span>
                  {repo.language && (
                    <span
                      className="flex-shrink-0 px-2 py-0.5 rounded text-[11px] font-bold"
                      style={{
                        backgroundColor: `${languageColors[repo.language] || "#85948d"}22`,
                        color: languageColors[repo.language] || "#bacac2",
                      }}
                    >
                      {repo.language.toUpperCase()}
                    </span>
                  )}
                </div>

                <p className="font-[family-name:var(--font-dm-sans)] text-[14px] text-[#bacac2] mb-6 h-10 overflow-hidden line-clamp-2">
                  {repo.description || "No description"}
                </p>

                <div className="flex gap-6">
                  <div className="flex items-center gap-1 text-[#bacac2]">
                    <span>⭐</span>
                    <span className="font-[family-name:var(--font-mono)] text-[13px]">
                      {repo.stars.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex items-center gap-1 text-[#bacac2]">
                    <span>⑂</span>
                    <span className="font-[family-name:var(--font-mono)] text-[13px]">
                      {repo.forks}
                    </span>
                  </div>
                </div>

                {repo.topics && (
                  <div className="flex flex-wrap gap-1 mt-4 pt-4 border-t border-[#1C2330]">
                    {parseJsonArray(repo.topics)
                      .slice(0, 3)
                      .map((topic) => (
                        <span
                          key={topic}
                          className="font-[family-name:var(--font-mono)] text-[11px] text-[#45f1c3]/60 border border-[#45f1c3]/20 px-1.5 py-0.5 rounded"
                        >
                          {topic}
                        </span>
                      ))}
                  </div>
                )}
              </a>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  )
}
