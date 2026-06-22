import type { Metadata } from "next"
import { prisma } from "@/lib/prisma"
import { AboutView } from "@/components/public/AboutView"

export const metadata: Metadata = {
  title: "About",
  description:
    "Learn more about Richard Korankye — Senior Full Stack Software Engineer based in Accra, Ghana with 7+ years building SaaS, ERP, and AI systems.",
}

export const revalidate = 86400

export default async function AboutPage() {
  const [experiences, skills] = await Promise.all([
    prisma.experience.findMany({ orderBy: { order: "asc" } }).catch(() => []),
    prisma.skill.findMany({ orderBy: [{ category: "asc" }, { order: "asc" }] }).catch(() => []),
  ])
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Person",
            name: "Richard Korankye",
            jobTitle: "Senior Full Stack Software Engineer",
            address: { "@type": "PostalAddress", addressLocality: "Accra", addressCountry: "GH" },
            url: siteUrl,
            sameAs: [
              "https://github.com/Series-kr",
              "https://linkedin.com/in/richardkorankye",
              "https://twitter.com/richardkorankye",
            ],
          }),
        }}
      />
      <AboutView experiences={experiences} skills={skills} />
    </>
  )
}
