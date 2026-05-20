import Link from "next/link"
import Image from "next/image"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faArrowRight, faArrowUpRightFromSquare } from "@fortawesome/free-solid-svg-icons"
import { TechBadge } from "@/components/shared/TechBadge"
import { parseJsonArray } from "@/lib/utils"
import type { Project } from "@prisma/client"

interface Props {
  project: Project
  featured?: boolean
}

export function ProjectCard({ project, featured = false }: Props) {
  const tech = parseJsonArray(project.techStack)

  if (featured) {
    return (
      <div className="group relative overflow-hidden rounded-2xl bg-[#091421] border border-[#1C2330] transition-all duration-500 hover:border-[#45f1c3]/50 hover:shadow-[0_0_40px_rgba(69,241,195,0.06)]">
        <div className="grid md:grid-cols-2">
          <div className="p-8 md:p-12 flex flex-col justify-center">
            <span className="font-[family-name:var(--font-mono)] text-[11px] font-semibold text-[#45f1c3] mb-4 uppercase tracking-[0.1em]">
              Featured Project · {project.category}
            </span>
            <h3 className="font-[family-name:var(--font-syne)] text-[28px] md:text-[36px] font-bold text-[#d9e3f7] mb-4 leading-tight">
              {project.title}
            </h3>
            <p className="font-[family-name:var(--font-dm-sans)] text-[15px] text-[#bacac2] mb-6 leading-relaxed">
              {project.shortDesc}
            </p>
            <div className="flex flex-wrap gap-2 mb-8">
              {tech.slice(0, 5).map((t) => (
                <TechBadge key={t} name={t} />
              ))}
            </div>
            <div className="flex items-center gap-4">
              <Link
                href={`/projects/${project.slug}`}
                className="inline-flex items-center gap-2 text-[#45f1c3] font-bold font-[family-name:var(--font-dm-sans)] text-[16px] hover:underline group/link"
              >
                <span>Case Study</span>
                <FontAwesomeIcon icon={faArrowRight} className="w-3 h-3 transition-transform group-hover/link:translate-x-1" />
              </Link>
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-[#bacac2] hover:text-[#45f1c3] font-[family-name:var(--font-dm-sans)] text-[14px] transition-colors"
                >
                  <FontAwesomeIcon icon={faArrowUpRightFromSquare} className="w-3 h-3" />
                  <span>Live</span>
                </a>
              )}
            </div>
          </div>
          <div className="relative min-h-[280px] bg-gradient-to-br from-[#121c2a] to-[#091421] overflow-hidden flex items-center justify-center border-t md:border-t-0 md:border-l border-[#1C2330]/60">
            <div className="text-center p-8">
              <div className="w-20 h-20 rounded-2xl bg-[#45f1c3]/10 border border-[#45f1c3]/20 flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">
                  {project.category === "SaaS" ? "⚙" : project.category === "EdTech" ? "🎓" : project.category === "AI" ? "🤖" : "🏢"}
                </span>
              </div>
              <p className="font-[family-name:var(--font-mono)] text-[12px] text-[#45f1c3] uppercase tracking-widest">
                {project.category}
              </p>
              {project.liveUrl && (
                <p className="font-[family-name:var(--font-mono)] text-[11px] text-[#85948d] mt-2 truncate max-w-[200px] mx-auto">
                  {project.liveUrl.replace("https://", "")}
                </p>
              )}
            </div>
            {project.imageUrl && (
              <Image
                src={project.imageUrl}
                alt={project.title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            )}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="group bg-[#091421] border border-[#1C2330] rounded-xl overflow-hidden transition-all duration-300 hover:border-[#45f1c3]/40 hover:shadow-[0_0_30px_rgba(69,241,195,0.06)] flex flex-col">
      <div className="h-44 bg-gradient-to-br from-[#121c2a] to-[#091421] overflow-hidden flex items-center justify-center relative">
        {project.imageUrl ? (
          <Image
            src={project.imageUrl}
            alt={project.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-110"
            sizes="(max-width: 768px) 100vw, 33vw"
          />
        ) : (
          <div className="text-center">
            <div className="w-14 h-14 rounded-xl bg-[#45f1c3]/10 border border-[#45f1c3]/20 flex items-center justify-center mx-auto mb-2">
              <span className="text-2xl">
                {project.category === "SaaS" ? "⚙" : project.category === "EdTech" ? "🎓" : project.category === "AI" ? "🤖" : "🏢"}
              </span>
            </div>
            <p className="font-[family-name:var(--font-mono)] text-[10px] text-[#85948d] uppercase tracking-widest">
              {project.category}
            </p>
          </div>
        )}
      </div>
      <div className="p-5 flex flex-col flex-1">
        <h4 className="font-[family-name:var(--font-dm-sans)] text-[17px] font-semibold text-[#d9e3f7] mb-2">
          {project.title}
        </h4>
        <p className="font-[family-name:var(--font-dm-sans)] text-[13px] text-[#bacac2] mb-4 line-clamp-2 leading-relaxed flex-1">
          {project.shortDesc}
        </p>
        <div className="flex flex-wrap gap-1.5 mb-4">
          {tech.slice(0, 3).map((t) => (
            <TechBadge key={t} name={t} small />
          ))}
        </div>
        <div className="flex justify-between items-center pt-3 border-t border-[#1C2330]/60">
          <span className="font-[family-name:var(--font-mono)] text-[11px] text-[#45f1c3] uppercase tracking-wider">
            {project.category}
          </span>
          <div className="flex items-center gap-3">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#bacac2] hover:text-[#45f1c3] transition-colors"
                title="View live"
              >
                <FontAwesomeIcon icon={faArrowUpRightFromSquare} className="w-3.5 h-3.5" />
              </a>
            )}
            <Link
              href={`/projects/${project.slug}`}
              className="text-[#bacac2] hover:text-[#45f1c3] transition-colors group-hover:translate-x-0.5"
            >
              <FontAwesomeIcon icon={faArrowRight} className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
