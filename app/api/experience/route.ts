import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { z } from "zod"
import { auth } from "@/auth"

const experienceSchema = z.object({
  company: z.string().min(1),
  role: z.string().min(1),
  roleType: z.string(),
  location: z.string(),
  description: z.string(),
  bullets: z.array(z.string()),
  techStack: z.array(z.string()),
  startDate: z.string(),
  endDate: z.string().optional(),
  current: z.boolean().optional().default(false),
  order: z.number().optional().default(0),
})

export async function GET() {
  const experiences = await prisma.experience.findMany({ orderBy: { order: "asc" } })
  return NextResponse.json(experiences)
}

export async function POST(req: NextRequest) {
  const session = await auth()
  if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  try {
    const body = await req.json()
    const data = experienceSchema.parse(body)

    const exp = await prisma.experience.create({
      data: {
        ...data,
        bullets: JSON.stringify(data.bullets),
        techStack: JSON.stringify(data.techStack),
        startDate: new Date(data.startDate),
        endDate: data.endDate ? new Date(data.endDate) : null,
      },
    })
    return NextResponse.json(exp, { status: 201 })
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
    const { id, bullets, techStack, startDate, endDate, ...rest } = await req.json()
    const exp = await prisma.experience.update({
      where: { id },
      data: {
        ...rest,
        ...(bullets ? { bullets: JSON.stringify(bullets) } : {}),
        ...(techStack ? { techStack: JSON.stringify(techStack) } : {}),
        ...(startDate ? { startDate: new Date(startDate) } : {}),
        ...(endDate ? { endDate: new Date(endDate) } : {}),
      },
    })
    return NextResponse.json(exp)
  } catch {
    return NextResponse.json({ error: "Update failed" }, { status: 500 })
  }
}

export async function DELETE(req: NextRequest) {
  const session = await auth()
  if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  const { id } = await req.json()
  await prisma.experience.delete({ where: { id } })
  return NextResponse.json({ success: true })
}
