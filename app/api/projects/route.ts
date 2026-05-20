import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { z } from "zod"
import { slugify } from "@/lib/utils"
import { auth } from "@/auth"

const projectSchema = z.object({
  title: z.string().min(1),
  shortDesc: z.string().min(1),
  problem: z.string().min(1),
  solution: z.string().min(1),
  impact: z.string().min(1),
  techStack: z.array(z.string()),
  category: z.string(),
  featured: z.boolean().optional().default(false),
  order: z.number().optional().default(0),
  imageUrl: z.string().optional(),
  screenshotUrls: z.array(z.string()).optional(),
  githubUrl: z.string().optional(),
  liveUrl: z.string().optional(),
  status: z.enum(["published", "draft"]).optional().default("published"),
})

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const category = searchParams.get("category")
  const status = searchParams.get("status")

  const projects = await prisma.project.findMany({
    where: {
      ...(category ? { category } : {}),
      ...(status ? { status } : {}),
    },
    orderBy: [{ featured: "desc" }, { order: "asc" }],
  })

  return NextResponse.json(projects)
}

export async function POST(req: NextRequest) {
  const session = await auth()
  if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  try {
    const body = await req.json()
    const data = projectSchema.parse(body)

    const slug = slugify(data.title)

    const project = await prisma.project.create({
      data: {
        ...data,
        slug,
        techStack: JSON.stringify(data.techStack),
        screenshotUrls: data.screenshotUrls ? JSON.stringify(data.screenshotUrls) : null,
      },
    })

    return NextResponse.json(project, { status: 201 })
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: err.issues }, { status: 400 })
    }
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
