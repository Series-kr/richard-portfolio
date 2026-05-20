import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { fetchUserRepos } from "@/lib/github"
import { auth } from "@/auth"

export async function POST() {
  const session = await auth()
  if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  try {
    const repos = await fetchUserRepos()

    const results = await Promise.allSettled(
      repos.map((repo) =>
        prisma.gitHubRepo.upsert({
          where: { repoId: repo.id },
          update: {
            name: repo.name,
            fullName: repo.full_name,
            description: repo.description ?? null,
            url: repo.html_url,
            homepage: repo.homepage ?? null,
            language: repo.language ?? null,
            stars: repo.stargazers_count,
            forks: repo.forks_count,
            topics: JSON.stringify(repo.topics ?? []),
            isPrivate: repo.private,
            updatedAt: new Date(),
          },
          create: {
            repoId: repo.id,
            name: repo.name,
            fullName: repo.full_name,
            description: repo.description ?? null,
            url: repo.html_url,
            homepage: repo.homepage ?? null,
            language: repo.language ?? null,
            stars: repo.stargazers_count,
            forks: repo.forks_count,
            topics: JSON.stringify(repo.topics ?? []),
            isPrivate: repo.private,
            showOnSite: !repo.private,
            pinned: false,
          },
        })
      )
    )

    const succeeded = results.filter((r) => r.status === "fulfilled").length
    const failed = results.filter((r) => r.status === "rejected").length

    return NextResponse.json({ synced: succeeded, failed, total: repos.length })
  } catch (err) {
    console.error("GitHub sync error:", err)
    return NextResponse.json({ error: "Sync failed" }, { status: 500 })
  }
}
