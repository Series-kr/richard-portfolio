import { prisma } from "@/lib/prisma"
import { parseJsonArray, formatDate } from "@/lib/utils"

export default async function AdminExperiencePage() {
  const experiences = await prisma.experience.findMany({ orderBy: { order: "asc" } })

  return (
    <div>
      <div className="mb-8">
        <h1 className="font-[family-name:var(--font-syne)] text-[32px] font-bold text-[#d9e3f7]">
          Experience
        </h1>
        <p className="font-[family-name:var(--font-dm-sans)] text-[14px] text-[#bacac2] mt-1">
          {experiences.length} experience entries
        </p>
      </div>

      <div className="space-y-4">
        {experiences.map((exp) => (
          <div key={exp.id} className="bg-[#091421] border border-[#1C2330] p-6 rounded-xl">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="font-[family-name:var(--font-dm-sans)] text-[18px] font-semibold text-[#d9e3f7]">
                  {exp.role}
                </h3>
                <p className="font-[family-name:var(--font-dm-sans)] text-[15px] text-[#45f1c3] mt-0.5">
                  {exp.company}
                </p>
                <p className="font-[family-name:var(--font-mono)] text-[12px] text-[#85948d] mt-1">
                  {formatDate(exp.startDate)} — {exp.current ? "Present" : formatDate(exp.endDate!)} · {exp.location}
                </p>
              </div>
              <span className="px-3 py-1 bg-[#45f1c3]/10 text-[#45f1c3] border border-[#45f1c3]/20 rounded-full font-[family-name:var(--font-mono)] text-[11px] uppercase">
                {exp.roleType}
              </span>
            </div>
            <ul className="space-y-1 mb-4">
              {parseJsonArray(exp.bullets).map((b, i) => (
                <li key={i} className="font-[family-name:var(--font-dm-sans)] text-[13px] text-[#bacac2] flex gap-2">
                  <span className="text-[#45f1c3] flex-shrink-0">·</span> {b}
                </li>
              ))}
            </ul>
            <div className="flex flex-wrap gap-2">
              {parseJsonArray(exp.techStack).map((t) => (
                <span key={t} className="font-[family-name:var(--font-mono)] text-[11px] text-[#85948d]">#{t.toLowerCase()}</span>
              ))}
            </div>
          </div>
        ))}
      </div>

      <p className="font-[family-name:var(--font-dm-sans)] text-[14px] text-[#85948d] mt-6 text-center">
        Edit via Prisma Studio: <code className="font-[family-name:var(--font-mono)] text-[#45f1c3]">npm run db:studio</code>
      </p>
    </div>
  )
}
