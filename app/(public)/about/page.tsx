import type { Metadata } from "next"
import Link from "next/link"
import { prisma } from "@/lib/prisma"
import { AnimatedSection } from "@/components/shared/AnimatedSection"
import { TechBadge } from "@/components/shared/TechBadge"
import { parseJsonArray, formatDate } from "@/lib/utils"

export const metadata: Metadata = {
  title: "About",
  description:
    "Learn more about Richard Korankye — Senior Full Stack Software Engineer based in Accra, Ghana with 7+ years building SaaS, ERP, and AI systems.",
}

export const revalidate = 86400

export default async function AboutPage() {
  const experiences = await prisma.experience.findMany({ orderBy: { order: "asc" } }).catch(() => [])
  const skills = await prisma.skill.findMany({ orderBy: [{ category: "asc" }, { order: "asc" }] }).catch(() => [])

  const categories = Array.from(new Set(skills.map((s) => s.category)))

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Person",
            name: "Richard Korankye",
            jobTitle: "Senior Full Stack Software Engineer",
            address: { "@type": "PostalAddress", addressLocality: "Accra", addressCountry: "GH" },
            url: siteUrl,
            sameAs: [
              "https://github.com/Series-kr",
              "https://linkedin.com/in/richardkorankye",
              "https://twitter.com/richardkorankye",
            ],
          }),
        }}
      />

      <div className="max-w-[1200px] mx-auto px-6 md:px-8 lg:px-16 py-16">
        {/* Header */}
        <AnimatedSection>
          <div className="grid md:grid-cols-2 gap-16 items-center mb-20">
            <div>
              <p className="font-[family-name:var(--font-mono)] text-[11px] font-semibold text-[#45f1c3] uppercase tracking-[0.1em] mb-3">
                About Me
              </p>
              <h1 className="font-[family-name:var(--font-syne)] text-[48px] font-bold text-[#d9e3f7] mb-6">
                Richard Korankye
              </h1>
              <p className="font-[family-name:var(--font-dm-sans)] text-[16px] text-[#bacac2] mb-4 leading-relaxed">
                I&apos;m a Senior Full Stack Software Engineer based in Accra, Ghana with over 7 years of
                experience building production systems for businesses across West Africa and beyond.
              </p>
              <p className="font-[family-name:var(--font-dm-sans)] text-[16px] text-[#bacac2] mb-4 leading-relaxed">
                My work spans SaaS platforms, ERP systems, AI-powered tools, and everything in between.
                I care deeply about writing code that actually solves real problems — not just code that
                passes a code review.
              </p>
              <p className="font-[family-name:var(--font-dm-sans)] text-[16px] text-[#bacac2] leading-relaxed">
                When I&apos;m not building, I&apos;m writing about the hard-won lessons from shipping
                real products with real constraints.
              </p>

              <div className="flex gap-4 mt-8">
                <Link
                  href="/#contact"
                  className="bg-[#00d4a8] text-[#00382a] font-bold px-6 py-2.5 rounded-lg hover:shadow-[0_0_20px_rgba(0,212,168,0.3)] transition-all font-[family-name:var(--font-dm-sans)]"
                >
                  Hire Me
                </Link>
                <Link
                  href="/projects"
                  className="border border-[#1C2330] text-[#d9e3f7] px-6 py-2.5 rounded-lg hover:bg-[#16202e] transition-all font-[family-name:var(--font-dm-sans)]"
                >
                  View Projects
                </Link>
              </div>
            </div>

            <div className="bg-[#16202e] border border-[#1C2330] p-8 rounded-xl">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-20 h-20 rounded-full bg-[#45f1c3]/10 border-2 border-[#45f1c3]/20 flex items-center justify-center flex-shrink-0">
                  <span className="font-[family-name:var(--font-syne)] text-3xl font-bold text-[#45f1c3]">RK</span>
                </div>
                <div>
                  <h2 className="font-[family-name:var(--font-dm-sans)] text-[18px] font-semibold text-[#d9e3f7]">
                    Richard Korankye
                  </h2>
                  <p className="font-[family-name:var(--font-dm-sans)] text-[14px] text-[#45f1c3]">
                    Senior Full Stack Engineer
                  </p>
                </div>
              </div>
              <div className="space-y-3 text-[14px] font-[family-name:var(--font-dm-sans)] text-[#bacac2]">
                {[
                  ["📍", "Accra, Ghana (GMT+0)"],
                  ["💼", "Senior SE @ DevCore Systems"],
                  ["📧", "richardkorankye07@gmail.com"],
                  ["🌍", "Open to remote worldwide"],
                  ["⚡", "7+ years experience"],
                ].map(([icon, text]) => (
                  <div key={text} className="flex items-center gap-3">
                    <span>{icon}</span>
                    <span>{text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </AnimatedSection>

        {/* Skills */}
        <AnimatedSection delay={0.1}>
          <h2 className="font-[family-name:var(--font-syne)] text-[32px] font-bold text-[#d9e3f7] mb-8">
            Technical Skills
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
            {categories.map((cat) => (
              <div key={cat} className="bg-[#091421] border border-[#1C2330] p-6 rounded-xl">
                <h3 className="font-[family-name:var(--font-mono)] text-[11px] font-semibold text-[#45f1c3] uppercase tracking-widest mb-4">
                  {cat}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {skills
                    .filter((s) => s.category === cat)
                    .map((s) => (
                      <TechBadge key={s.id} name={s.name} />
                    ))}
                </div>
              </div>
            ))}
          </div>
        </AnimatedSection>

        {/* Experience */}
        <AnimatedSection delay={0.15}>
          <h2 className="font-[family-name:var(--font-syne)] text-[32px] font-bold text-[#d9e3f7] mb-8">
            Experience
          </h2>
          <div className="space-y-6">
            {experiences.map((exp) => (
              <div key={exp.id} className="bg-[#16202e] border border-[#1C2330] p-8 rounded-xl">
                <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                  <div>
                    <h3 className="font-[family-name:var(--font-dm-sans)] text-[20px] font-semibold text-[#d9e3f7]">
                      {exp.role}
                    </h3>
                    <p className="font-[family-name:var(--font-dm-sans)] text-[16px] text-[#45f1c3] mt-1">
                      {exp.company}
                    </p>
                    <p className="font-[family-name:var(--font-mono)] text-[12px] text-[#bacac2] mt-1">
                      {formatDate(exp.startDate).split(" ").slice(-1)[0]} —{" "}
                      {exp.current ? "Present" : formatDate(exp.endDate!).split(" ").slice(-1)[0]}
                    </p>
                  </div>
                  <span className="px-3 py-1 bg-[#45f1c3]/10 text-[#45f1c3] border border-[#45f1c3]/20 rounded-full font-[family-name:var(--font-mono)] text-[11px] uppercase">
                    {exp.roleType}
                  </span>
                </div>
                <ul className="space-y-2 mb-4">
                  {parseJsonArray(exp.bullets).map((bullet, i) => (
                    <li key={i} className="flex items-start gap-3 text-[#bacac2]">
                      <span className="text-[#45f1c3] mt-0.5 flex-shrink-0">·</span>
                      <span className="font-[family-name:var(--font-dm-sans)] text-[14px] leading-relaxed">{bullet}</span>
                    </li>
                  ))}
                </ul>
                <div className="flex flex-wrap gap-2">
                  {parseJsonArray(exp.techStack).map((t) => (
                    <TechBadge key={t} name={t} variant="mono" />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </AnimatedSection>
      </div>
    </>
  )
}
