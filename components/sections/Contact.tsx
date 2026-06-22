"use client"

import { useState } from "react"
import { Form, Input, Select, Button, App, Row, Col } from "antd"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faEnvelope, faPhone } from "@fortawesome/free-solid-svg-icons"
import { faLinkedin } from "@fortawesome/free-brands-svg-icons"
import { brand } from "@/lib/theme"

interface ContactValues {
  name: string
  email: string
  subject: string
  message: string
}

const SUBJECT_OPTIONS = ["Hiring Inquiry", "Freelance / Contract Project", "Collaboration", "General"]

const directLinks = [
  { icon: faEnvelope, label: "Email", value: "richardkorankye07@gmail.com", href: "mailto:richardkorankye07@gmail.com" },
  { icon: faPhone, label: "Phone", value: "+233 594 453 744", href: "tel:+233594453744" },
  { icon: faLinkedin, label: "LinkedIn", value: "richard-korankye", href: "https://linkedin.com/in/richard-korankye" },
]

export function Contact() {
  const { message } = App.useApp()
  const [form] = Form.useForm<ContactValues>()
  const [loading, setLoading] = useState(false)

  const onFinish = async (values: ContactValues) => {
    setLoading(true)
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      })
      if (!res.ok) throw new Error("Failed to send")
      message.success("Message sent — I'll get back to you within 24 hours.")
      form.resetFields()
    } catch {
      message.error("Something went wrong. Please email richardkorankye07@gmail.com directly.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <section id="contact" style={{ padding: "80px 24px", background: "#0B1120" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <Row gutter={[64, 48]}>
          <Col xs={24} md={10}>
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

            <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
              {directLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target={link.href.startsWith("http") ? "_blank" : undefined}
                  rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  style={{ display: "flex", alignItems: "center", gap: 12 }}
                >
                  <div style={{ width: 36, height: 36, borderRadius: 8, background: brand.bgContainer, border: `1px solid ${brand.border}`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <FontAwesomeIcon icon={link.icon} style={{ color: brand.primary }} />
                  </div>
                  <div>
                    <p style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: brand.textMuted, textTransform: "uppercase", letterSpacing: "0.12em", margin: 0 }}>
                      {link.label}
                    </p>
                    <p style={{ fontSize: 14, color: brand.textSecondary, margin: 0 }}>{link.value}</p>
                  </div>
                </a>
              ))}
            </div>
          </Col>

          <Col xs={24} md={14}>
            <div style={{ background: brand.bgContainer, border: `1px solid ${brand.border}`, borderRadius: 12, padding: 32 }}>
              <Form form={form} layout="vertical" requiredMark={false} onFinish={onFinish}>
                <Row gutter={16}>
                  <Col xs={24} sm={12}>
                    <Form.Item
                      name="name"
                      label="Name"
                      rules={[{ required: true, min: 2, message: "Name must be at least 2 characters" }]}
                    >
                      <Input size="large" placeholder="Your name" />
                    </Form.Item>
                  </Col>
                  <Col xs={24} sm={12}>
                    <Form.Item
                      name="email"
                      label="Email"
                      rules={[
                        { required: true, message: "Email is required" },
                        { type: "email", message: "Invalid email address" },
                      ]}
                    >
                      <Input size="large" placeholder="your@email.com" />
                    </Form.Item>
                  </Col>
                </Row>

                <Form.Item name="subject" label="Subject" rules={[{ required: true, message: "Please select a subject" }]}>
                  <Select size="large" placeholder="Select a subject" options={SUBJECT_OPTIONS.map((o) => ({ value: o, label: o }))} />
                </Form.Item>

                <Form.Item
                  name="message"
                  label="Message"
                  rules={[{ required: true, min: 20, message: "Message must be at least 20 characters" }]}
                >
                  <Input.TextArea rows={5} placeholder="Tell me about the role, project, or just say hello..." />
                </Form.Item>

                <Button type="primary" size="large" htmlType="submit" loading={loading} block>
                  Send Message
                </Button>
              </Form>
            </div>
          </Col>
        </Row>
      </div>
    </section>
  )
}
