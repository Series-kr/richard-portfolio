import Groq from "groq-sdk"

let _groq: Groq | null = null

function getGroq(): Groq {
  if (!_groq) {
    _groq = new Groq({ apiKey: process.env.GROQ_API_KEY })
  }
  return _groq
}

export interface BlogGenerationInput {
  topic: string
  targetKeyword: string
  audience: string
  tone: "technical" | "conversational" | "tutorial" | "opinion"
  wordCount: number
  includeCodeExamples: boolean
}

export interface GeneratedBlog {
  title: string
  seoTitle: string
  seoDescription: string
  seoKeywords: string[]
  excerpt: string
  content: string
  category: string
  tags: string[]
  readTimeMinutes: number
}

const SYSTEM_PROMPT = `
You are an expert technical writer and SEO specialist writing on behalf of Richard Korankye,
a Senior Full Stack Software Engineer based in Accra, Ghana with 7+ years of experience.

Richard has built systems including:
- Virtutor Online (SaaS tutoring platform)
- EduTrack ERP (AI-powered school management)
- JiBiFlow/Blendara ecosystem (multi-tenant SaaS)
- AI exam generators using Claude, Groq, and Gemini APIs
- Scout AI assistant (Slack + Gmail + Calendar + Linear integration)
- Multiple fintech and business tools

His tech stack: Next.js, React, Node.js, PHP/Laravel, PostgreSQL, Docker, AWS,
Claude AI, Groq, OpenAI, TypeScript, Tailwind CSS.

Writing style:
- Direct, confident, and human. No corporate buzzwords.
- Shares real lessons from building real systems.
- Uses concrete examples and code where relevant.
- Ghana/Africa context where appropriate but globally relevant insights.
- First person. "I built..." "I learned..." "In my experience..."

SEO requirements:
- Naturally integrate the target keyword multiple times (first paragraph, headings, conclusion)
- Use semantic related keywords throughout
- Include a clear call-to-action at the end
- Structure with H2 and H3 headings for scannability
- Write a compelling meta title (55-60 chars) and description (150-160 chars)
- Output must be valid markdown

Always return ONLY valid JSON. No preamble. No markdown fences around the JSON.
`

export async function generateBlogPost(input: BlogGenerationInput): Promise<GeneratedBlog> {
  const userPrompt = `
Write a ${input.wordCount}-word ${input.tone} blog post about: "${input.topic}"

Primary SEO keyword: "${input.targetKeyword}"
Target audience: ${input.audience}
Include code examples: ${input.includeCodeExamples}

Return a JSON object with these exact fields:
{
  "title": "compelling H1 title",
  "seoTitle": "55-60 char SEO title with keyword",
  "seoDescription": "150-160 char meta description with keyword",
  "seoKeywords": ["keyword1", "keyword2", "keyword3", "keyword4", "keyword5"],
  "excerpt": "2-3 sentence summary for blog listing cards",
  "content": "full markdown content with proper H2/H3 structure, code blocks if requested, CTA at end",
  "category": "Architecture|AI|DevOps|Engineering|Career",
  "tags": ["tag1", "tag2", "tag3"],
  "readTimeMinutes": estimated_read_time_as_integer
}
`

  const completion = await getGroq().chat.completions.create({
    model: "llama-3.3-70b-versatile",
    messages: [
      { role: "system", content: SYSTEM_PROMPT },
      { role: "user", content: userPrompt },
    ],
    temperature: 0.7,
    max_tokens: 6000,
    response_format: { type: "json_object" },
  })

  const raw = completion.choices[0]?.message?.content
  if (!raw) throw new Error("No content generated from Groq")

  return JSON.parse(raw) as GeneratedBlog
}
