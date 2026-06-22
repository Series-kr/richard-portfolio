import { prisma } from "@/lib/prisma"
import { BlogTable } from "@/components/admin/BlogTable"

export const dynamic = "force-dynamic"

export default async function AdminBlogPage() {
  const posts = await prisma.blogPost.findMany({ orderBy: { createdAt: "desc" } })
  return <BlogTable posts={posts} />
}
