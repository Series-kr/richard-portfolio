import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { z } from "zod"
import { auth } from "@/auth"

const patchSchema = z.object({
  showOnSite: z.boolean().optional(),
  pinned: z.boolean().optional(),
})

interface Params {
  params: Promise<{ id: string }>
}

export async function PATCH(req: NextRequest, { params }: Params) {
  const session = await auth()
  if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  try {
    const { id } = await params
    const body = await req.json()
    const data = patchSchema.parse(body)

    const repo = await prisma.gitHubRepo.update({ where: { id }, data })
    return NextResponse.json(repo)
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: err.issues }, { status: 400 })
    }
    return NextResponse.json({ error: "Update failed" }, { status: 500 })
  }
}
