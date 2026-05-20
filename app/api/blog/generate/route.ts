import { NextRequest, NextResponse } from "next/server"
import { generateBlogPost, type BlogGenerationInput } from "@/lib/groq"
import { z } from "zod"
import { auth } from "@/auth"

const schema = z.object({
  topic: z.string().min(5),
  targetKeyword: z.string().min(2),
  audience: z.string(),
  tone: z.enum(["technical", "conversational", "tutorial", "opinion"]),
  wordCount: z.number().min(500).max(4000),
  includeCodeExamples: z.boolean(),
})

export async function POST(req: NextRequest) {
  const session = await auth()
  if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  try {
    const body = await req.json()
    const input = schema.parse(body) as BlogGenerationInput

    const generated = await generateBlogPost(input)
    return NextResponse.json(generated)
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: err.issues }, { status: 400 })
    }
    console.error("Blog generation error:", err)
    return NextResponse.json({ error: "Generation failed" }, { status: 500 })
  }
}
