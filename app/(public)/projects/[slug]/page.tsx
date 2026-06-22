import { notFound } from "next/navigation"
import type { Metadata } from "next"
import { prisma } from "@/lib/prisma"
import { CaseStudyView } from "@/components/projects/CaseStudyView"

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
    const projects = await prisma.project.findMany({ where: { status: "published" }, select: { slug: true } })
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
    where: { category: project.category, status: "published", NOT: { id: project.id } },
    take: 3,
    orderBy: { order: "asc" },
  })

  const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://richardkorankye.dev"

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline: project.title,
            description: project.shortDesc,
            author: { "@type": "Person", name: "Richard Korankye" },
            about: project.category,
            url: `${BASE_URL}/projects/${project.slug}`,
            ...(project.imageUrl ? { image: project.imageUrl } : {}),
          }),
        }}
      />
      <CaseStudyView project={project} related={related} />
    </>
  )
}
