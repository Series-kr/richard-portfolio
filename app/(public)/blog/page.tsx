import type { Metadata } from "next"
import { prisma } from "@/lib/prisma"
import { BlogIndexView } from "@/components/public/BlogIndexView"

export const revalidate = 3600

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Technical deep dives, architecture decisions, and lessons from building real systems by Richard Korankye — Senior Full Stack Engineer in Accra, Ghana.",
}

export default async function BlogPage() {
  const posts = await prisma.blogPost.findMany({
    where: { published: true },
    orderBy: { publishedAt: "desc" },
  }).catch(() => [])

  return <BlogIndexView posts={posts} />
}
