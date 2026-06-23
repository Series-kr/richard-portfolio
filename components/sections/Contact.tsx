"use client"

import { useState } from "react"
import { z } from "zod"
import { Box, TextField, MenuItem, Button } from "@mui/material"
import { useSnackbar } from "notistack"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faEnvelope, faPhone } from "@fortawesome/free-solid-svg-icons"
import { faLinkedin } from "@fortawesome/free-brands-svg-icons"
import { brand } from "@/lib/theme"

const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  subject: z.string().min(2, "Please select a subject"),
  message: z.string().min(20, "Message must be at least 20 characters"),
})

type ContactForm = z.infer<typeof contactSchema>

const SUBJECT_OPTIONS = ["Hiring Inquiry", "Freelance / Contract Project", "Collaboration", "General"]

const directLinks = [
  { icon: faEnvelope, label: "Email", value: "richardkorankye07@gmail.com", href: "mailto:richardkorankye07@gmail.com" },
  { icon: faPhone, label: "Phone", value: "+233 594 453 744", href: "tel:+233594453744" },
  { icon: faLinkedin, label: "LinkedIn", value: "richard-korankye", href: "https://linkedin.com/in/richard-korankye" },
]

const emptyForm: ContactForm = { name: "", email: "", subject: "", message: "" }

export function Contact() {
  const { enqueueSnackbar } = useSnackbar()
  const [form, setForm] = useState<ContactForm>(emptyForm)
  const [errors, setErrors] = useState<Partial<Record<keyof ContactForm, string>>>({})
  const [loading, setLoading] = useState(false)

  const update = (key: keyof ContactForm, value: string) => {
    setForm((p) => ({ ...p, [key]: value }))
    setErrors((p) => ({ ...p, [key]: undefined }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const result = contactSchema.safeParse(form)
    if (!result.success) {
      const fieldErrors: Partial<Record<keyof ContactForm, string>> = {}
      result.error.issues.forEach((issue) => {
        const key = issue.path[0] as keyof ContactForm
        if (key) fieldErrors[key] = issue.message
      })
      setErrors(fieldErrors)
      return
    }
    setLoading(true)
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      })
      if (!res.ok) throw new Error("Failed to send")
      enqueueSnackbar("Message sent — I'll get back to you within 24 hours.", { variant: "success" })
      setForm(emptyForm)
    } catch {
      enqueueSnackbar("Something went wrong. Please email richardkorankye07@gmail.com directly.", { variant: "error" })
    } finally {
      setLoading(false)
    }
  }

  return (
    <Box component="section" id="contact" sx={{ py: 10, px: 3, background: brand.bgBase }}>
      <Box sx={{ maxWidth: 1200, mx: "auto", display: "grid", gridTemplateColumns: { xs: "1fr", md: "2fr 3fr" }, gap: { xs: 6, md: 8 } }}>
        <Box>
          <p style={{ fontFamily: "var(--font-mono)", fontSize: 11, fontWeight: 600, color: brand.primary, textTransform: "uppercase", letterSpacing: "0.15em", marginBottom: 16 }}>
            Get In Touch
          </p>
          <h2 style={{ fontFamily: "var(--font-display)", fontSize: 40, fontWeight: 700, color: brand.text, marginBottom: 20, lineHeight: 1.15 }}>
            Let&apos;s build something great.
          </h2>
          <p style={{ fontSize: 16, color: brand.textSecondary, lineHeight: 1.7, marginBottom: 24 }}>
            Whether you have a role in mind, a system to build, or just want to connect — I am open to good conversations.
          </p>
          <p style={{ fontFamily: "var(--font-mono)", fontSize: 12, color: brand.textMuted, marginBottom: 40 }}>
            Usually responds within 24 hours.
          </p>

          <Box sx={{ display: "flex", flexDirection: "column", gap: 2.5 }}>
            {directLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target={link.href.startsWith("http") ? "_blank" : undefined}
                rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
                style={{ display: "flex", alignItems: "center", gap: 12 }}
              >
                <Box sx={{ width: 36, height: 36, borderRadius: 2, bgcolor: brand.bgContainer, border: `1px solid ${brand.border}`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <FontAwesomeIcon icon={link.icon} style={{ color: brand.primary }} />
                </Box>
                <Box>
                  <p style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: brand.textMuted, textTransform: "uppercase", letterSpacing: "0.12em", margin: 0 }}>
                    {link.label}
                  </p>
                  <p style={{ fontSize: 14, color: brand.textSecondary, margin: 0 }}>{link.value}</p>
                </Box>
              </a>
            ))}
          </Box>
        </Box>

        <Box component="form" onSubmit={handleSubmit} sx={{ background: brand.bgContainer, border: `1px solid ${brand.border}`, borderRadius: 2, p: 4, display: "flex", flexDirection: "column", gap: 2.5 }}>
          <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" }, gap: 2.5 }}>
            <TextField label="Name" value={form.name} onChange={(e) => update("name", e.target.value)} error={!!errors.name} helperText={errors.name} fullWidth />
            <TextField label="Email" value={form.email} onChange={(e) => update("email", e.target.value)} error={!!errors.email} helperText={errors.email} fullWidth />
          </Box>
          <TextField select label="Subject" value={form.subject} onChange={(e) => update("subject", e.target.value)} error={!!errors.subject} helperText={errors.subject} fullWidth>
            {SUBJECT_OPTIONS.map((opt) => (
              <MenuItem key={opt} value={opt}>{opt}</MenuItem>
            ))}
          </TextField>
          <TextField label="Message" value={form.message} onChange={(e) => update("message", e.target.value)} error={!!errors.message} helperText={errors.message} multiline rows={5} fullWidth />
          <Button type="submit" variant="contained" size="large" disabled={loading}>
            {loading ? "Sending…" : "Send Message"}
          </Button>
        </Box>
      </Box>
    </Box>
  )
}
