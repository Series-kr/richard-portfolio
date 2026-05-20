import { Hero } from "@/components/sections/Hero"
import { Stats } from "@/components/sections/Stats"
import { About } from "@/components/sections/About"
import { Skills } from "@/components/sections/Skills"
import { ExperienceSection } from "@/components/sections/Experience"
import { ProjectsSection } from "@/components/sections/Projects"
import { BlogSection } from "@/components/sections/Blog"
import { GitHubSection } from "@/components/sections/GitHub"
import { Contact } from "@/components/sections/Contact"
import { prisma } from "@/lib/prisma"

export const revalidate = 3600

export default async function HomePage() {
  const [skills, experiences, projects, posts, repos] = await Promise.all([
    prisma.skill.findMany({ orderBy: [{ category: "asc" }, { order: "asc" }] }).catch(() => []),
    prisma.experience.findMany({ orderBy: { order: "asc" } }).catch(() => []),
    prisma.project.findMany({
      where: { status: "published" },
      orderBy: [{ featured: "desc" }, { order: "asc" }],
    }).catch(() => []),
    prisma.blogPost.findMany({
      where: { published: true },
      orderBy: { publishedAt: "desc" },
      take: 3,
    }).catch(() => []),
    prisma.gitHubRepo.findMany({
      where: { showOnSite: true },
      orderBy: [{ pinned: "desc" }, { stars: "desc" }],
      take: 6,
    }).catch(() => []),
  ])

  return (
    <>
      <Hero />
      <Stats />
      <About />
      <Skills skills={skills} />
      <ExperienceSection experiences={experiences} />
      <ProjectsSection projects={projects} />
      <BlogSection posts={posts} />
      {repos.length > 0 && <GitHubSection repos={repos} />}
      <Contact />
    </>
  )
}
