import { AnimatedSection } from "@/components/shared/AnimatedSection"
import { SectionHeader } from "@/components/shared/SectionHeader"
import { TechBadge } from "@/components/shared/TechBadge"
import type { Skill } from "@prisma/client"

interface Props {
  skills: Skill[]
}

const categoryConfig: Record<string, { icon: string; iconColor: string; bgColor: string }> = {
  Frontend: { icon: "🖥️", iconColor: "text-[#45f1c3]", bgColor: "bg-[#45f1c3]/10" },
  Backend: { icon: "⚙️", iconColor: "text-[#ffcea6]", bgColor: "bg-[#ffcea6]/10" },
  Database: { icon: "🗄️", iconColor: "text-[#45f1c3]", bgColor: "bg-[#45f1c3]/10" },
  DevOps: { icon: "☁️", iconColor: "text-[#45f1c3]", bgColor: "bg-[#45f1c3]/10" },
  AI: { icon: "🤖", iconColor: "text-[#ffcea6]", bgColor: "bg-[#ffcea6]/10" },
  Practices: { icon: "📐", iconColor: "text-[#45f1c3]", bgColor: "bg-[#45f1c3]/10" },
}

export function Skills({ skills }: Props) {
  const categories = Array.from(new Set(skills.map((s) => s.category))).sort()

  const byCategory = categories.reduce(
    (acc, cat) => {
      acc[cat] = skills.filter((s) => s.category === cat).sort((a, b) => a.order - b.order)
      return acc
    },
    {} as Record<string, Skill[]>
  )

  return (
    <section className="py-16 bg-[#050f1c]" id="stack">
      <div className="max-w-[1200px] mx-auto px-6 md:px-8 lg:px-16">
        <SectionHeader
          title="My Technical Arsenal"
          subtitle="Precision tools for modern engineering challenges."
          center
        />

        <div className="grid md:grid-cols-3 gap-6">
          {categories.map((category, i) => {
            const config = categoryConfig[category] ?? categoryConfig.Frontend
            return (
              <AnimatedSection key={category} delay={i * 0.08}>
                <div className="bg-[#091421] border border-[#1C2330] p-6 rounded-xl active-glow transition-all duration-300 h-full">
                  <div className={`w-12 h-12 ${config.bgColor} rounded-lg flex items-center justify-center mb-6 text-2xl`}>
                    {config.icon}
                  </div>
                  <h3 className="font-[family-name:var(--font-dm-sans)] text-[18px] font-semibold text-[#d9e3f7] mb-4">
                    {category}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {byCategory[category].map((skill) => (
                      <TechBadge key={skill.id} name={skill.name} />
                    ))}
                  </div>
                </div>
              </AnimatedSection>
            )
          })}
        </div>
      </div>
    </section>
  )
}
