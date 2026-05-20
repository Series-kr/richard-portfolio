import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { z } from "zod"
import { auth } from "@/auth"

const skillSchema = z.object({
  name: z.string().min(1),
  category: z.string(),
  level: z.number().min(0).max(100).optional().default(80),
  order: z.number().optional().default(0),
  icon: z.string().optional(),
})

export async function GET() {
  const skills = await prisma.skill.findMany({
    orderBy: [{ category: "asc" }, { order: "asc" }],
  })
  return NextResponse.json(skills)
}

export async function POST(req: NextRequest) {
  const session = await auth()
  if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  try {
    const body = await req.json()
    const data = skillSchema.parse(body)
    const skill = await prisma.skill.create({ data })
    return NextResponse.json(skill, { status: 201 })
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: err.issues }, { status: 400 })
    }
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function PUT(req: NextRequest) {
  const session = await auth()
  if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  try {
    const { id, ...data } = await req.json()
    const skill = await prisma.skill.update({ where: { id }, data })
    return NextResponse.json(skill)
  } catch {
    return NextResponse.json({ error: "Update failed" }, { status: 500 })
  }
}

export async function DELETE(req: NextRequest) {
  const session = await auth()
  if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  const { id } = await req.json()
  await prisma.skill.delete({ where: { id } })
  return NextResponse.json({ success: true })
}
