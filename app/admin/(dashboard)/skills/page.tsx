import { prisma } from "@/lib/prisma"
import { SkillsAdminView } from "@/components/admin/SkillsAdminView"

export const dynamic = "force-dynamic"

export default async function AdminSkillsPage() {
  const skills = await prisma.skill.findMany({ orderBy: [{ category: "asc" }, { order: "asc" }] })
  return <SkillsAdminView skills={skills} />
}
