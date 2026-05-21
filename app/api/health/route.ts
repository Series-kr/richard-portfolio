import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET() {
  const dbUrl = process.env.DATABASE_URL ?? "not set"
  const urlPreview = dbUrl.replace(/:([^:@]+)@/, ":***@")

  try {
    await prisma.$queryRaw`SELECT 1`
    return NextResponse.json({ status: "ok", db: urlPreview })
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err)
    return NextResponse.json({ status: "error", db: urlPreview, error: msg }, { status: 500 })
  }
}
