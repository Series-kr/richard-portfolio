import { prisma } from "@/lib/prisma"
import { DashboardView } from "@/components/admin/DashboardView"

export const dynamic = "force-dynamic"

export default async function AdminDashboard() {
  const [projects, posts, messages, skills, experiences, repos] = await Promise.all([
    prisma.project.count(),
    prisma.blogPost.count(),
    prisma.contactMessage.count({ where: { read: false } }),
    prisma.skill.count(),
    prisma.experience.count(),
    prisma.gitHubRepo.count({ where: { showOnSite: true } }),
  ])

  const recentMessages = await prisma.contactMessage.findMany({ orderBy: { createdAt: "desc" }, take: 5 })

  return (
    <DashboardView
      counts={{ projects, posts, messages, skills, experiences, repos }}
      recentMessages={recentMessages}
    />
  )
}
