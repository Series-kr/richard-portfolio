import { type ClassValue, clsx } from "clsx"

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs)
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "")
}

export function formatDate(date: Date | string): string {
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })
}

export function parseJsonArray(json: string | null | undefined): string[] {
  if (!json) return []
  try {
    return JSON.parse(json) as string[]
  } catch {
    return []
  }
}

export function readingTime(content: string): number {
  const wpm = 200
  const words = content.trim().split(/\s+/).length
  return Math.ceil(words / wpm)
}

export function truncate(str: string, length: number): string {
  if (str.length <= length) return str
  return str.slice(0, length) + "..."
}
