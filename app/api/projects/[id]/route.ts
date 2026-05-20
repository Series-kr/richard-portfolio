import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { z } from "zod"
import { auth } from "@/auth"

const updateSchema = z.object({
  title: z.string().min(1).optional(),
  shortDesc: z.string().optional(),
  problem: z.string().optional(),
  solution: z.string().optional(),
  impact: z.string().optional(),
  techStack: z.array(z.string()).optional(),
  category: z.string().optional(),
  featured: z.boolean().optional(),
  order: z.number().optional(),
  imageUrl: z.string().optional().nullable(),
  screenshotUrls: z.array(z.string()).optional(),
  githubUrl: z.string().optional().nullable(),
  liveUrl: z.string().optional().nullable(),
  status: z.enum(["published", "draft"]).optional(),
})

interface Params {
  params: Promise<{ id: string }>
}

export async function GET(_req: NextRequest, { params }: Params) {
  const { id } = await params
  const project = await prisma.project.findUnique({ where: { id } })
  if (!project) return NextResponse.json({ error: "Not found" }, { status: 404 })
  return NextResponse.json(project)
}

export async function PUT(req: NextRequest, { params }: Params) {
  const session = await auth()
  if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  try {
    const { id } = await params
    const body = await req.json()
    const data = updateSchema.parse(body)

    const updateData: Record<string, unknown> = { ...data }
    if (data.techStack) updateData.techStack = JSON.stringify(data.techStack)
    if (data.screenshotUrls) updateData.screenshotUrls = JSON.stringify(data.screenshotUrls)

    const project = await prisma.project.update({ where: { id }, data: updateData })
    return NextResponse.json(project)
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: err.issues }, { status: 400 })
    }
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function DELETE(req: NextRequest, { params }: Params) {
  const session = await auth()
  if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  const { id } = await params
  await prisma.project.delete({ where: { id } })
  return NextResponse.json({ success: true })
}
