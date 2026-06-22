import type { Metadata } from "next"
import { Contact } from "@/components/sections/Contact"

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with Richard Korankye — Senior Full Stack Engineer. Available for freelance projects, consulting, and full-time roles.",
}

export default function ContactPage() {
  return (
    <div style={{ paddingTop: 32, paddingBottom: 32 }}>
      <Contact />
    </div>
  )
}
