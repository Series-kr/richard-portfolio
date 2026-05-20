import { AnimatedSection } from "@/components/shared/AnimatedSection"

const stats = [
  { value: "7+", label: "Years Experience" },
  { value: "17+", label: "Systems Built" },
  { value: "5", label: "Companies Served" },
  { value: "3", label: "Active Roles" },
]

export function Stats() {
  return (
    <section className="border-y border-[#1C2330]/60 bg-[#050f1c] py-8">
      <div className="max-w-[1200px] mx-auto px-6 md:px-8 grid grid-cols-2 md:grid-cols-4 gap-8">
        {stats.map((stat, i) => (
          <AnimatedSection key={stat.label} delay={i * 0.1}>
            <div
              className={`flex flex-col items-center md:items-start ${
                i < stats.length - 1 ? "md:border-r border-[#1C2330]/30" : ""
              }`}
            >
              <span className="font-[family-name:var(--font-syne)] text-[32px] font-bold text-[#45f1c3]">
                {stat.value}
              </span>
              <span className="font-[family-name:var(--font-mono)] text-[11px] font-semibold text-[#bacac2] uppercase tracking-widest">
                {stat.label}
              </span>
            </div>
          </AnimatedSection>
        ))}
      </div>
    </section>
  )
}
