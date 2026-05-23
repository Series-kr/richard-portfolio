import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET() {
  const dbUrl = process.env.DATABASE_URL ?? "not set"
  const urlPreview = dbUrl.replace(/:([^:@]+)@/, ":***@")
  const start = Date.now()

  try {
    const rows = await prisma.$queryRaw<{ ok: number }[]>`SELECT 1 AS ok`
    return NextResponse.json({
      status: "ok",
      db: urlPreview,
      latencyMs: Date.now() - start,
      rows,
    })
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err)
    return NextResponse.json(
      { status: "error", db: urlPreview, latencyMs: Date.now() - start, error: msg },
      { status: 500 }
    )
  }
}
