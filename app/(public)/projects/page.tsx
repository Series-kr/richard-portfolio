import type { Metadata } from "next"
import { prisma } from "@/lib/prisma"
import { ProjectsClientPage } from "./ProjectsClientPage"

export const revalidate = 86400

export const metadata: Metadata = {
  title: "Projects",
  description:
    "SaaS platforms, ERP systems, AI tools, and business applications built by Richard Korankye — Senior Full Stack Engineer based in Accra, Ghana.",
}

export default async function ProjectsPage() {
  const projects = await prisma.project.findMany({
    where: { status: "published" },
    orderBy: [{ featured: "desc" }, { order: "asc" }],
  }).catch(() => [])

  return <ProjectsClientPage projects={projects} />
}
