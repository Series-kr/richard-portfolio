import type { Metadata } from "next"
import localFont from "next/font/local"
import "./globals.css"

const syne = localFont({
  src: [
    { path: "../node_modules/@fontsource-variable/syne/files/syne-latin-wght-normal.woff2", style: "normal" },
  ],
  variable: "--font-syne",
  display: "swap",
})

const dmSans = localFont({
  src: [
    { path: "../node_modules/@fontsource-variable/dm-sans/files/dm-sans-latin-wght-normal.woff2", style: "normal", weight: "100 900" },
    { path: "../node_modules/@fontsource-variable/dm-sans/files/dm-sans-latin-wght-italic.woff2", style: "italic", weight: "100 900" },
  ],
  variable: "--font-dm-sans",
  display: "swap",
})

const jetbrainsMono = localFont({
  src: [
    { path: "../node_modules/@fontsource/jetbrains-mono/files/jetbrains-mono-latin-500-normal.woff2", weight: "500", style: "normal" },
    { path: "../node_modules/@fontsource/jetbrains-mono/files/jetbrains-mono-latin-600-normal.woff2", weight: "600", style: "normal" },
  ],
  variable: "--font-mono",
  display: "swap",
})

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"),
  title: {
    default: "Richard Korankye | Senior Full Stack Software Engineer",
    template: "%s | Richard Korankye",
  },
  description:
    "Senior Full Stack Engineer based in Accra, Ghana. 7+ years building SaaS platforms, ERP systems, and AI-integrated applications. Open to remote and local opportunities.",
  keywords: [
    "Full Stack Engineer Ghana",
    "Software Engineer Accra",
    "Senior Software Engineer Ghana",
    "React Developer Ghana",
    "Node.js Developer Africa",
    "SaaS Developer Ghana",
    "AI Developer West Africa",
    "Laravel Developer Ghana",
    "PHP Developer Ghana",
    "Remote Software Engineer Africa",
    "Richard Korankye",
  ],
  authors: [{ name: "Richard Korankye" }],
  creator: "Richard Korankye",
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Richard Korankye",
    title: "Richard Korankye | Senior Full Stack Software Engineer",
    description:
      "Senior Full Stack Engineer based in Accra, Ghana. 7+ years building SaaS platforms, ERP systems, and AI-integrated applications.",
    images: [
      {
        url: "/api/og?title=Richard+Korankye+%7C+Senior+Full+Stack+Engineer&type=default",
        width: 1200,
        height: 630,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    creator: "@richardkorankye",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  alternates: {
    types: {
      "application/rss+xml": "/feed.xml",
    },
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${syne.variable} ${dmSans.variable} ${jetbrainsMono.variable}`}>
      <body className="antialiased" suppressHydrationWarning>{children}</body>
    </html>
  )
}
