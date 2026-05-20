import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faMapPin, faWifi, faLaptopCode, faGraduationCap, faLanguage, faDownload } from "@fortawesome/free-solid-svg-icons"
import { AnimatedSection } from "@/components/shared/AnimatedSection"

const quickFacts = [
  { icon: faMapPin, label: "Accra, Ghana (GMT+0)" },
  { icon: faWifi, label: "Open to Remote · Hybrid · On-site" },
  { icon: faLaptopCode, label: "Full Stack · Systems · AI" },
  { icon: faGraduationCap, label: "BSc. IT — GCTU" },
  { icon: faLanguage, label: "English · Akan (Twi)" },
]

export function About() {
  return (
    <section className="py-16 max-w-[1200px] mx-auto px-6 md:px-8 grid md:grid-cols-2 gap-16 items-center" id="about">
      <AnimatedSection direction="left">
        <p className="font-[family-name:var(--font-mono)] text-[11px] font-semibold text-[#45f1c3] uppercase tracking-[0.15em] mb-4">
          About
        </p>
        <h2 className="font-[family-name:var(--font-syne)] text-[32px] md:text-[36px] font-bold text-[#d9e3f7] mb-6 leading-tight">
          More than code — I build things businesses depend on.
        </h2>
        <div className="space-y-5">
          <p className="font-[family-name:var(--font-dm-sans)] text-[16px] text-[#bacac2] leading-relaxed">
            I am a Senior Full Stack Software Engineer based in Accra, Ghana, with over 7 years of experience shipping
            production software for real businesses. I have built everything from multi-tenant SaaS platforms and school
            ERP systems to AI-powered tools and enterprise applications — owning the full stack from database schema to deployment.
          </p>
          <p className="font-[family-name:var(--font-dm-sans)] text-[16px] text-[#bacac2] leading-relaxed">
            What drives me is the architecture layer — how systems are structured, how they handle scale, and how
            engineering decisions serve real business outcomes. I work with teams that care about craft: clean,
            maintainable code, thoughtful system design, and software that holds up in production.
          </p>
          <p className="font-[family-name:var(--font-dm-sans)] text-[16px] text-[#bacac2] leading-relaxed">
            Currently engineering at JiBiFlow/BreakInvent LLC and leading IT at Virtutor Online Ghana. I am open to
            senior and lead engineering roles — locally in Accra and internationally via remote.
          </p>
        </div>
      </AnimatedSection>

      <AnimatedSection direction="right">
        <div className="bg-[#16202e] border border-[#1C2330] p-8 rounded-xl relative overflow-hidden group hover:border-[#45f1c3]/30 transition-colors duration-300">
          <div className="absolute top-0 right-0 w-32 h-32 bg-[#45f1c3]/5 rounded-full -translate-y-12 translate-x-12 blur-3xl" />

          <div className="flex items-center gap-5 mb-8">
            <div className="w-18 h-18 w-[72px] h-[72px] rounded-full border-2 border-[#45f1c3]/20 bg-[#212a39] flex items-center justify-center flex-shrink-0">
              <span className="font-[family-name:var(--font-syne)] text-2xl font-bold text-[#45f1c3]">RK</span>
            </div>
            <div>
              <h3 className="font-[family-name:var(--font-dm-sans)] text-[18px] font-semibold text-[#d9e3f7]">
                Richard Korankye
              </h3>
              <p className="font-[family-name:var(--font-dm-sans)] text-[14px] text-[#45f1c3]">
                Senior Full Stack Engineer
              </p>
              <p className="font-[family-name:var(--font-mono)] text-[11px] text-[#85948d] mt-0.5">
                richardkorankye07@gmail.com
              </p>
            </div>
          </div>

          <div className="space-y-3.5">
            {quickFacts.map((fact) => (
              <div key={fact.label} className="flex items-center gap-3 text-[#bacac2]">
                <FontAwesomeIcon icon={fact.icon} className="w-3.5 h-3.5 text-[#45f1c3] flex-shrink-0" />
                <span className="font-[family-name:var(--font-dm-sans)] text-[14px]">{fact.label}</span>
              </div>
            ))}
          </div>

          <div className="mt-7 pt-6 border-t border-[#1C2330] flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#45f1c3] pulse-teal" />
              <span className="font-[family-name:var(--font-mono)] text-[11px] text-[#45f1c3] uppercase tracking-widest">
                Open to opportunities
              </span>
            </div>
            <a
              href="#contact"
              className="inline-flex items-center gap-1.5 font-[family-name:var(--font-dm-sans)] text-[13px] text-[#bacac2] hover:text-[#45f1c3] transition-colors"
            >
              <FontAwesomeIcon icon={faDownload} className="w-3 h-3" />
              Download CV
            </a>
          </div>
        </div>
      </AnimatedSection>
    </section>
  )
}
