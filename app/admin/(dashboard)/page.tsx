import { prisma } from "@/lib/prisma"
import { DashboardView } from "@/components/admin/DashboardView"
import type { ContactMessage } from "@prisma/client"

export const dynamic = "force-dynamic"

export default async function AdminDashboard() {
  const [projects, posts, messages, skills, experiences, repos] = await Promise.all([
    prisma.project.count().catch(() => 0),
    prisma.blogPost.count().catch(() => 0),
    prisma.contactMessage.count({ where: { read: false } }).catch(() => 0),
    prisma.skill.count().catch(() => 0),
    prisma.experience.count().catch(() => 0),
    prisma.gitHubRepo.count({ where: { showOnSite: true } }).catch(() => 0),
  ])

  const recentMessages: ContactMessage[] = await prisma.contactMessage
    .findMany({ orderBy: { createdAt: "desc" }, take: 5 })
    .catch(() => [])

  return (
    <DashboardView
      counts={{ projects, posts, messages, skills, experiences, repos }}
      recentMessages={recentMessages}
    />
  )
}
