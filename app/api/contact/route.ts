import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { sendContactEmail } from "@/lib/resend"
import { z } from "zod"

const rateMap = new Map<string, { count: number; resetAt: number }>()
const RATE_LIMIT = 5
const WINDOW_MS = 15 * 60 * 1000

function isRateLimited(ip: string): boolean {
  const now = Date.now()
  const entry = rateMap.get(ip)
  if (!entry || now > entry.resetAt) {
    rateMap.set(ip, { count: 1, resetAt: now + WINDOW_MS })
    return false
  }
  if (entry.count >= RATE_LIMIT) return true
  entry.count++
  return false
}

const schema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  subject: z.string().min(5),
  message: z.string().min(20),
})

export async function POST(req: NextRequest) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown"
  if (isRateLimited(ip)) {
    return NextResponse.json({ error: "Too many requests. Please wait before trying again." }, { status: 429 })
  }

  try {
    const body = await req.json()
    const data = schema.parse(body)

    await prisma.contactMessage.create({ data })

    if (process.env.RESEND_API_KEY) {
      await sendContactEmail(data)
    }

    return NextResponse.json({ success: true })
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: err.issues }, { status: 400 })
    }
    console.error("Contact error:", err)
    return NextResponse.json({ error: "Failed to send message" }, { status: 500 })
  }
}
