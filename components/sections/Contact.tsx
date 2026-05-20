"use client"

import { useState } from "react"
import { z } from "zod"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faEnvelope, faPhone, faCircleCheck } from "@fortawesome/free-solid-svg-icons"
import { faLinkedin } from "@fortawesome/free-brands-svg-icons"

const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  subject: z.string().min(2, "Please select a subject"),
  message: z.string().min(20, "Message must be at least 20 characters"),
})

type ContactForm = z.infer<typeof contactSchema>

const SUBJECT_OPTIONS = [
  "Hiring Inquiry",
  "Freelance / Contract Project",
  "Collaboration",
  "General",
]

const directLinks = [
  {
    icon: faEnvelope,
    label: "Email",
    value: "richardkorankye07@gmail.com",
    href: "mailto:richardkorankye07@gmail.com",
  },
  {
    icon: faPhone,
    label: "Phone",
    value: "+233 594 453 744",
    href: "tel:+233594453744",
  },
  {
    icon: faLinkedin,
    label: "LinkedIn",
    value: "richard-korankye",
    href: "https://linkedin.com/in/richard-korankye",
  },
]

export function Contact() {
  const [form, setForm] = useState<ContactForm>({ name: "", email: "", subject: "", message: "" })
  const [errors, setErrors] = useState<Partial<ContactForm>>({})
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle")

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
    setErrors((prev) => ({ ...prev, [e.target.name]: undefined }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const result = contactSchema.safeParse(form)
    if (!result.success) {
      const fieldErrors: Partial<ContactForm> = {}
      result.error.issues.forEach((issue) => {
        if (issue.path[0]) fieldErrors[issue.path[0] as keyof ContactForm] = issue.message
      })
      setErrors(fieldErrors)
      return
    }
    setStatus("loading")
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      })
      if (!res.ok) throw new Error("Failed to send")
      setStatus("success")
      setForm({ name: "", email: "", subject: "", message: "" })
    } catch {
      setStatus("error")
    }
  }

  const inputClass =
    "w-full bg-[#16202e] border border-[#1C2330] rounded-lg px-4 py-3 text-[#d9e3f7] font-[family-name:var(--font-dm-sans)] text-[15px] focus:outline-none focus:border-[#45f1c3] focus:ring-1 focus:ring-[#45f1c3]/20 placeholder:text-[#bacac2]/30 transition-colors"

  return (
    <section className="py-20 bg-[#050f1c]" id="contact">
      <div className="max-w-[1200px] mx-auto px-6 md:px-8">
        <div className="grid md:grid-cols-5 gap-16">
          {/* Left — copy */}
          <div className="md:col-span-2">
            <p className="font-[family-name:var(--font-mono)] text-[11px] font-semibold text-[#45f1c3] uppercase tracking-[0.15em] mb-4">
              Get In Touch
            </p>
            <h2 className="font-[family-name:var(--font-syne)] text-[36px] md:text-[44px] font-bold text-[#d9e3f7] mb-5 leading-tight">
              Let&apos;s build something great.
            </h2>
            <p className="font-[family-name:var(--font-dm-sans)] text-[16px] text-[#bacac2] leading-relaxed mb-8">
              Whether you have a role in mind, a system to build, or just want to connect — I am open to good conversations.
            </p>
            <p className="font-[family-name:var(--font-mono)] text-[12px] text-[#85948d] mb-10">
              Usually responds within 24 hours.
            </p>

            <div className="space-y-5">
              {directLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target={link.href.startsWith("http") ? "_blank" : undefined}
                  rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  className="flex items-center gap-3 group"
                >
                  <div className="w-9 h-9 rounded-lg bg-[#16202e] border border-[#1C2330] flex items-center justify-center group-hover:border-[#45f1c3]/40 transition-colors flex-shrink-0">
                    <FontAwesomeIcon icon={link.icon} className="w-3.5 h-3.5 text-[#45f1c3]" />
                  </div>
                  <div>
                    <p className="font-[family-name:var(--font-mono)] text-[10px] text-[#85948d] uppercase tracking-widest">
                      {link.label}
                    </p>
                    <p className="font-[family-name:var(--font-dm-sans)] text-[14px] text-[#bacac2] group-hover:text-[#45f1c3] transition-colors">
                      {link.value}
                    </p>
                  </div>
                </a>
              ))}
            </div>
          </div>

          {/* Right — form */}
          <div className="md:col-span-3">
            {status === "success" ? (
              <div className="bg-[#45f1c3]/10 border border-[#45f1c3]/30 rounded-xl p-10 text-center h-full flex flex-col items-center justify-center gap-4">
                <FontAwesomeIcon icon={faCircleCheck} className="w-12 h-12 text-[#45f1c3]" />
                <h3 className="font-[family-name:var(--font-syne)] text-[24px] font-bold text-[#45f1c3]">
                  Message sent!
                </h3>
                <p className="font-[family-name:var(--font-dm-sans)] text-[16px] text-[#bacac2]">
                  I&apos;ll get back to you within 24 hours.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 bg-[#091421] border border-[#1C2330] rounded-xl p-8">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="font-[family-name:var(--font-mono)] text-[10px] font-semibold text-[#bacac2] uppercase tracking-widest ml-1">Name</label>
                    <input type="text" name="name" value={form.name} onChange={handleChange} placeholder="Your name" className={inputClass} />
                    {errors.name && <p className="text-[#ffb4ab] text-[12px] font-[family-name:var(--font-dm-sans)] ml-1">{errors.name}</p>}
                  </div>
                  <div className="space-y-1">
                    <label className="font-[family-name:var(--font-mono)] text-[10px] font-semibold text-[#bacac2] uppercase tracking-widest ml-1">Email</label>
                    <input type="email" name="email" value={form.email} onChange={handleChange} placeholder="your@email.com" className={inputClass} />
                    {errors.email && <p className="text-[#ffb4ab] text-[12px] font-[family-name:var(--font-dm-sans)] ml-1">{errors.email}</p>}
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="font-[family-name:var(--font-mono)] text-[10px] font-semibold text-[#bacac2] uppercase tracking-widest ml-1">Subject</label>
                  <select name="subject" value={form.subject} onChange={handleChange} className={`${inputClass} cursor-pointer`}>
                    <option value="" disabled>Select a subject</option>
                    {SUBJECT_OPTIONS.map((opt) => (
                      <option key={opt} value={opt}>{opt}</option>
                    ))}
                  </select>
                  {errors.subject && <p className="text-[#ffb4ab] text-[12px] font-[family-name:var(--font-dm-sans)] ml-1">{errors.subject}</p>}
                </div>

                <div className="space-y-1">
                  <label className="font-[family-name:var(--font-mono)] text-[10px] font-semibold text-[#bacac2] uppercase tracking-widest ml-1">Message</label>
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    placeholder="Tell me about the role, project, or just say hello..."
                    rows={5}
                    className={`${inputClass} resize-none`}
                  />
                  {errors.message && <p className="text-[#ffb4ab] text-[12px] font-[family-name:var(--font-dm-sans)] ml-1">{errors.message}</p>}
                </div>

                {status === "error" && (
                  <p className="text-[#ffb4ab] text-[14px] font-[family-name:var(--font-dm-sans)] text-center">
                    Something went wrong. Please email me directly at richardkorankye07@gmail.com
                  </p>
                )}

                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="w-full bg-[#00d4a8] text-[#00382a] font-bold py-4 rounded-lg active:scale-[0.98] transition-all hover:shadow-[0_0_40px_rgba(0,212,168,0.2)] font-[family-name:var(--font-dm-sans)] text-[16px] disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {status === "loading" ? "Sending..." : "Send Message"}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
