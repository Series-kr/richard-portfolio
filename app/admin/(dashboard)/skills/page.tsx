import { prisma } from "@/lib/prisma"

export default async function AdminSkillsPage() {
  const skills = await prisma.skill.findMany({
    orderBy: [{ category: "asc" }, { order: "asc" }],
  })

  const categories = Array.from(new Set(skills.map((s) => s.category)))

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-[family-name:var(--font-syne)] text-[32px] font-bold text-[#d9e3f7]">
            Skills
          </h1>
          <p className="font-[family-name:var(--font-dm-sans)] text-[14px] text-[#bacac2] mt-1">
            {skills.length} skills across {categories.length} categories
          </p>
        </div>
      </div>

      <div className="space-y-6">
        {categories.map((cat) => (
          <div key={cat} className="bg-[#091421] border border-[#1C2330] rounded-xl overflow-hidden">
            <div className="px-6 py-4 border-b border-[#1C2330] flex items-center justify-between">
              <h2 className="font-[family-name:var(--font-syne)] text-[20px] font-bold text-[#d9e3f7]">
                {cat}
              </h2>
              <span className="font-[family-name:var(--font-mono)] text-[11px] text-[#bacac2] uppercase tracking-widest">
                {skills.filter((s) => s.category === cat).length} skills
              </span>
            </div>
            <div className="p-6 space-y-4">
              {skills
                .filter((s) => s.category === cat)
                .map((skill) => (
                  <div key={skill.id} className="flex items-center gap-4">
                    <span className="font-[family-name:var(--font-dm-sans)] text-[14px] text-[#d9e3f7] w-40 flex-shrink-0">
                      {skill.name}
                    </span>
                    <div className="flex-1 h-1.5 bg-[#16202e] rounded-full overflow-hidden">
                      <div
                        className="h-full bg-[#45f1c3] rounded-full"
                        style={{ width: `${skill.level}%` }}
                      />
                    </div>
                    <span className="font-[family-name:var(--font-mono)] text-[12px] text-[#bacac2] w-10 text-right flex-shrink-0">
                      {skill.level}%
                    </span>
                  </div>
                ))}
            </div>
          </div>
        ))}
      </div>

      <p className="font-[family-name:var(--font-dm-sans)] text-[14px] text-[#85948d] mt-6 text-center">
        Edit skills via the API or Prisma Studio: <code className="font-[family-name:var(--font-mono)] text-[#45f1c3]">npm run db:studio</code>
      </p>
    </div>
  )
}
