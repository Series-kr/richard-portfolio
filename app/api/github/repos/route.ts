import { NextResponse } from "next/server"
import { fetchUserRepos } from "@/lib/github"

export async function GET() {
  try {
    const repos = await fetchUserRepos()
    return NextResponse.json(repos)
  } catch (err) {
    console.error("GitHub repos error:", err)
    return NextResponse.json({ error: "Failed to fetch repos" }, { status: 500 })
  }
}
