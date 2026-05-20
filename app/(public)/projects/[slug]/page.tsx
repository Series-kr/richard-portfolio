import { notFound } from "next/navigation"
import type { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"
import { prisma } from "@/lib/prisma"
import { parseJsonArray } from "@/lib/utils"
import { TechBadge } from "@/components/shared/TechBadge"
import { AnimatedSection } from "@/components/shared/AnimatedSection"

export const revalidate = 86400

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const project = await prisma.project.findUnique({ where: { slug } })
  if (!project) return { title: "Not Found" }
  const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://richardkorankye.dev"
  const ogImage = project.imageUrl || `${BASE_URL}/api/og?title=${encodeURIComponent(project.title)}&type=project&category=${encodeURIComponent(project.category)}`
  return {
    title: project.title,
    description: project.shortDesc,
    openGraph: {
      title: project.title,
      description: project.shortDesc,
      type: "website",
      images: [{ url: ogImage, width: 1200, height: 630, alt: project.title }],
    },
    twitter: {
      card: "summary_large_image",
      title: project.title,
      description: project.shortDesc,
      images: [ogImage],
    },
  }
}

export async function generateStaticParams() {
  try {
    const projects = await prisma.project.findMany({
      where: { status: "published" },
      select: { slug: true },
    })
    return projects.map((p) => ({ slug: p.slug }))
  } catch {
    return []
  }
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params
  const project = await prisma.project.findUnique({ where: { slug } })
  if (!project || project.status !== "published") notFound()

  const related = await prisma.project.findMany({
    where: {
      category: project.category,
      status: "published",
      NOT: { id: project.id },
    },
    take: 3,
    orderBy: { order: "asc" },
  })

  const tech = parseJsonArray(project.techStack)
  const screenshots = parseJsonArray(project.screenshotUrls)

  return (
    <div className="max-w-[1200px] mx-auto px-6 md:px-8 lg:px-16 py-16">
      {/* Hero */}
      <AnimatedSection>
        <div className="mb-12">
          <Link
            href="/projects"
            className="font-[family-name:var(--font-mono)] text-[11px] text-[#bacac2] hover:text-[#45f1c3] transition-colors uppercase tracking-widest mb-8 inline-flex items-center gap-2"
          >
            ← All Projects
          </Link>

          <div className="flex items-start justify-between gap-6 mt-6">
            <div className="flex-1">
              <span className="font-[family-name:var(--font-mono)] text-[11px] font-semibold text-[#45f1c3] uppercase tracking-[0.1em]">
                {project.category}
              </span>
              <h1 className="font-[family-name:var(--font-syne)] text-[48px] font-bold text-[#d9e3f7] mt-2 mb-4">
                {project.title}
              </h1>
              <p className="font-[family-name:var(--font-dm-sans)] text-[18px] text-[#bacac2] max-w-2xl">
                {project.shortDesc}
              </p>
            </div>

            <div className="flex gap-3 flex-shrink-0">
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-[#00d4a8] text-[#00382a] font-bold px-6 py-2.5 rounded-lg hover:shadow-[0_0_20px_rgba(0,212,168,0.3)] transition-all font-[family-name:var(--font-dm-sans)]"
                >
                  Live →
                </a>
              )}
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="border border-[#1C2330] text-[#d9e3f7] px-6 py-2.5 rounded-lg hover:bg-[#16202e] transition-all font-[family-name:var(--font-dm-sans)]"
                >
                  GitHub
                </a>
              )}
            </div>
          </div>
        </div>
      </AnimatedSection>

      {/* Overview row */}
      <AnimatedSection delay={0.1}>
        <div className="grid md:grid-cols-3 gap-4 mb-12">
          {[
            { label: "Problem", icon: "🔍", content: project.problem.slice(0, 120) + "..." },
            { label: "Role", icon: "👨‍💻", content: "Full Stack Development · Architecture · Delivery" },
            { label: "Category", icon: "📁", content: project.category },
          ].map((item) => (
            <div
              key={item.label}
              className="bg-[#16202e] border border-[#1C2330] p-6 rounded-xl"
            >
              <div className="text-2xl mb-3">{item.icon}</div>
              <p className="font-[family-name:var(--font-mono)] text-[11px] font-semibold text-[#45f1c3] uppercase tracking-widest mb-2">
                {item.label}
              </p>
              <p className="font-[family-name:var(--font-dm-sans)] text-[14px] text-[#bacac2] leading-relaxed">
                {item.content}
              </p>
            </div>
          ))}
        </div>
      </AnimatedSection>

      {/* Tech stack */}
      <AnimatedSection delay={0.15}>
        <div className="mb-12">
          <h2 className="font-[family-name:var(--font-syne)] text-[24px] font-bold text-[#d9e3f7] mb-6">
            Tech Stack
          </h2>
          <div className="flex flex-wrap gap-2">
            {tech.map((t) => (
              <TechBadge key={t} name={t} />
            ))}
          </div>
        </div>
      </AnimatedSection>

      {/* Detailed sections */}
      <div className="grid md:grid-cols-3 gap-8 mb-12">
        {[
          { label: "The Problem", content: project.problem },
          { label: "The Solution", content: project.solution },
          { label: "The Impact", content: project.impact },
        ].map((section, i) => (
          <AnimatedSection key={section.label} delay={0.1 + i * 0.08}>
            <div className="bg-[#091421] border border-[#1C2330] p-8 rounded-xl h-full active-glow">
              <h3 className="font-[family-name:var(--font-syne)] text-[20px] font-bold text-[#45f1c3] mb-4">
                {section.label}
              </h3>
              <p className="font-[family-name:var(--font-dm-sans)] text-[16px] text-[#bacac2] leading-relaxed">
                {section.content}
              </p>
            </div>
          </AnimatedSection>
        ))}
      </div>

      {/* Screenshots */}
      {screenshots.length > 0 && (
        <AnimatedSection delay={0.2}>
          <div className="mb-12">
            <h2 className="font-[family-name:var(--font-syne)] text-[24px] font-bold text-[#d9e3f7] mb-6">
              Screenshots
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              {screenshots.map((url, i) => (
                <div key={i} className="rounded-xl overflow-hidden border border-[#1C2330] relative aspect-video">
                  <Image
                    src={url}
                    alt={`${project.title} screenshot ${i + 1}`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
              ))}
            </div>
          </div>
        </AnimatedSection>
      )}

      {/* Related projects */}
      {related.length > 0 && (
        <AnimatedSection delay={0.25}>
          <div className="mb-12">
            <h2 className="font-[family-name:var(--font-syne)] text-[24px] font-bold text-[#d9e3f7] mb-6">
              Related Projects
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              {related.map((rel) => (
                <Link
                  key={rel.id}
                  href={`/projects/${rel.slug}`}
                  className="bg-[#091421] border border-[#1C2330] p-6 rounded-xl active-glow transition-all duration-300 block"
                >
                  <span className="font-[family-name:var(--font-mono)] text-[11px] text-[#45f1c3] uppercase tracking-widest">
                    {rel.category}
                  </span>
                  <h4 className="font-[family-name:var(--font-dm-sans)] text-[16px] font-semibold text-[#d9e3f7] mt-2 mb-2">
                    {rel.title}
                  </h4>
                  <p className="font-[family-name:var(--font-dm-sans)] text-[14px] text-[#bacac2] line-clamp-2">
                    {rel.shortDesc}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </AnimatedSection>
      )}

      {/* CTA */}
      <AnimatedSection delay={0.3}>
        <div className="bg-gradient-to-r from-[#45f1c3]/10 to-transparent border border-[#45f1c3]/20 p-8 rounded-xl text-center">
          <h3 className="font-[family-name:var(--font-syne)] text-[28px] font-bold text-[#d9e3f7] mb-3">
            Want to build something like this?
          </h3>
          <p className="font-[family-name:var(--font-dm-sans)] text-[16px] text-[#bacac2] mb-6">
            I&apos;m available for freelance projects and consulting engagements.
          </p>
          <Link
            href="/#contact"
            className="bg-[#00d4a8] text-[#00382a] font-bold px-8 py-3 rounded-lg hover:shadow-[0_0_30px_rgba(0,212,168,0.3)] transition-all font-[family-name:var(--font-dm-sans)]"
          >
            Get in Touch
          </Link>
        </div>
      </AnimatedSection>
    </div>
  )
}
