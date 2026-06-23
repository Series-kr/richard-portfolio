import { prisma } from "@/lib/prisma"
import { ExperienceAdminView } from "@/components/admin/ExperienceAdminView"

export const dynamic = "force-dynamic"

export default async function AdminExperiencePage() {
  const experiences = await prisma.experience.findMany({ orderBy: { order: "asc" } }).catch(() => [])
  return <ExperienceAdminView experiences={experiences} />
}
