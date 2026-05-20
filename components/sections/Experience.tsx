"use client"

import { useState } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCircleCheck, faLocationDot, faBriefcase } from "@fortawesome/free-solid-svg-icons"
import { AnimatedSection } from "@/components/shared/AnimatedSection"
import { SectionHeader } from "@/components/shared/SectionHeader"
import { formatDate, parseJsonArray } from "@/lib/utils"
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
    <section className="py-16 max-w-[1200px] mx-auto px-6 md:px-8 lg:px-16" id="experience">
      <SectionHeader title="Experience" />

      <div className="grid md:grid-cols-12 gap-16">
        {/* Timeline */}
        <div className="md:col-span-4">
          <div className="space-y-8">
            {sorted.map((exp, i) => (
              <AnimatedSection key={exp.id} delay={i * 0.1}>
                <button
                  type="button"
                  onClick={() => setActive(i)}
                  className={`w-full text-left timeline-item relative pl-6 flex items-start transition-opacity duration-200 ${
                    active === i ? "opacity-100" : "opacity-50 hover:opacity-75"
                  }`}
                >
                  <div
                    className={`timeline-dot absolute left-0 top-1.5 w-3 h-3 rounded-full ${
                      active === i ? "bg-[#45f1c3] ring-4 ring-[#45f1c3]/20" : "bg-[#85948d]"
                    }`}
                  />
                  <div>
                    <span
                      className={`font-[family-name:var(--font-mono)] text-[11px] font-semibold uppercase tracking-[0.1em] ${
                        active === i ? "text-[#45f1c3]" : "text-[#bacac2]"
                      }`}
                    >
                      {formatDate(exp.startDate).split(" ").slice(-1)[0]} —{" "}
                      {exp.current ? "Present" : formatDate(exp.endDate!).split(" ").slice(-1)[0]}
                    </span>
                    <h4 className="font-[family-name:var(--font-dm-sans)] text-[18px] font-semibold text-[#d9e3f7] mt-1 flex items-center gap-2">
                      {exp.role}
                      {exp.current && (
                        <span className="font-[family-name:var(--font-mono)] text-[9px] font-semibold uppercase tracking-widest bg-[#45f1c3]/15 text-[#45f1c3] border border-[#45f1c3]/30 px-2 py-0.5 rounded-full">
                          Current
                        </span>
                      )}
                    </h4>
                    <p className="font-[family-name:var(--font-dm-sans)] text-[14px] text-[#bacac2]">
                      {exp.company}
                    </p>
                  </div>
                </button>
              </AnimatedSection>
            ))}
          </div>
        </div>

        {/* Detail panel */}
        <div className="md:col-span-8">
          <AnimatedSection key={active} direction="none">
            <div className="bg-[#16202e] border border-[#1C2330] p-8 rounded-xl h-full">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h3 className="font-[family-name:var(--font-syne)] text-[32px] font-bold text-[#d9e3f7]">
                    {current.role}
                  </h3>
                  <p className="font-[family-name:var(--font-dm-sans)] text-[18px] font-semibold text-[#45f1c3]">
                    {current.company}
                  </p>
                  <p className="font-[family-name:var(--font-dm-sans)] text-[14px] text-[#bacac2] mt-1 flex items-center gap-1.5">
                    <FontAwesomeIcon icon={faLocationDot} className="w-3 h-3 text-[#45f1c3]" />
                    {current.location}
                  </p>
                </div>
                <span className="px-4 py-1 bg-[#45f1c3]/10 text-[#45f1c3] border border-[#45f1c3]/20 rounded-full font-[family-name:var(--font-mono)] text-[11px] font-semibold uppercase whitespace-nowrap">
                  {current.roleType}
                </span>
              </div>

              <ul className="space-y-4 mb-6">
                {parseJsonArray(current.bullets).map((bullet, i) => (
                  <li key={i} className="flex items-start gap-3 text-[#bacac2]">
                    <FontAwesomeIcon icon={faCircleCheck} className="w-4 h-4 text-[#45f1c3] mt-0.5 flex-shrink-0" />
                    <span className="font-[family-name:var(--font-dm-sans)] text-[15px] leading-relaxed">
                      {bullet}
                    </span>
                  </li>
                ))}
              </ul>

              <div className="flex flex-wrap gap-2 pt-6 border-t border-[#1C2330]">
                {parseJsonArray(current.techStack).map((tech) => (
                  <span
                    key={tech}
                    className="font-[family-name:var(--font-mono)] text-[13px] text-[#bacac2]"
                  >
                    #{tech.toLowerCase().replace(/[\s.]/g, "")}
                  </span>
                ))}
              </div>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  )
}
