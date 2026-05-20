import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { z } from "zod"
import { slugify, readingTime } from "@/lib/utils"
import { auth } from "@/auth"

const blogSchema = z.object({
  title: z.string().min(1),
  excerpt: z.string().min(1),
  content: z.string().min(1),
  coverImage: z.string().optional(),
  category: z.string(),
  tags: z.array(z.string()),
  seoTitle: z.string(),
  seoDescription: z.string(),
  seoKeywords: z.array(z.string()),
  readTimeMinutes: z.number().optional(),
  generatedByAI: z.boolean().optional().default(false),
  aiModel: z.string().optional(),
  published: z.boolean().optional().default(false),
  publishedAt: z.string().optional(),
})

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const published = searchParams.get("published")
  const category = searchParams.get("category")

  const posts = await prisma.blogPost.findMany({
    where: {
      ...(published !== null ? { published: published === "true" } : {}),
      ...(category ? { category } : {}),
    },
    orderBy: { createdAt: "desc" },
  })

  return NextResponse.json(posts)
}

export async function POST(req: NextRequest) {
  const session = await auth()
  if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  try {
    const body = await req.json()
    const data = blogSchema.parse(body)

    const slug = slugify(data.title)
    const readTime = data.readTimeMinutes ?? readingTime(data.content)

    const post = await prisma.blogPost.create({
      data: {
        ...data,
        slug,
        tags: JSON.stringify(data.tags),
        seoKeywords: JSON.stringify(data.seoKeywords),
        readTimeMinutes: readTime,
        publishedAt: data.published ? new Date() : null,
      },
    })

    return NextResponse.json(post, { status: 201 })
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: err.issues }, { status: 400 })
    }
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
