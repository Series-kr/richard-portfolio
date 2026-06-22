"use client"

import Link from "next/link"
import { Row, Col, Card, Statistic, Badge, Empty } from "antd"
import { FolderOutlined, EditOutlined, MailOutlined, ThunderboltOutlined, ProfileOutlined, GithubOutlined } from "@ant-design/icons"
import { brand } from "@/lib/theme"
import type { ContactMessage } from "@prisma/client"

interface Props {
  counts: { projects: number; posts: number; messages: number; skills: number; experiences: number; repos: number }
  recentMessages: ContactMessage[]
}

export function DashboardView({ counts, recentMessages }: Props) {
  const statCards = [
    { label: "Projects", value: counts.projects, href: "/admin/projects", icon: <FolderOutlined /> },
    { label: "Blog Posts", value: counts.posts, href: "/admin/blog", icon: <EditOutlined /> },
    { label: "Unread Messages", value: counts.messages, href: "/admin/messages", icon: <MailOutlined /> },
    { label: "Skills", value: counts.skills, href: "/admin/skills", icon: <ThunderboltOutlined /> },
    { label: "Experience", value: counts.experiences, href: "/admin/experience", icon: <ProfileOutlined /> },
    { label: "GitHub Repos", value: counts.repos, href: "/admin/github", icon: <GithubOutlined /> },
  ]

  return (
    <div>
      <div style={{ marginBottom: 32 }}>
        <h1 style={{ fontFamily: "var(--font-display)", fontSize: 32, fontWeight: 700, color: brand.text, margin: 0 }}>Dashboard</h1>
        <p style={{ fontSize: 14, color: brand.textSecondary, marginTop: 4 }}>
          Welcome back, Richard. Here&apos;s an overview of your portfolio.
        </p>
      </div>

      <Row gutter={[16, 16]} style={{ marginBottom: 32 }}>
        {statCards.map((card) => (
          <Col key={card.label} xs={12} md={8}>
            <Link href={card.href}>
              <Card variant="outlined" hoverable style={{ borderColor: brand.border }}>
                <Statistic
                  title={
                    <span style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: brand.textSecondary, textTransform: "uppercase", letterSpacing: "0.1em" }}>
                      {card.icon} {card.label}
                    </span>
                  }
                  value={card.value}
                  valueStyle={{ fontFamily: "var(--font-mono)", color: brand.primary, fontWeight: 700 }}
                />
              </Card>
            </Link>
          </Col>
        ))}
      </Row>

      <Row gutter={[24, 24]}>
        <Col xs={24} md={12}>
          <Card title="Quick Actions" variant="outlined" style={{ borderColor: brand.border }}>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {[
                { href: "/admin/blog/new", label: "Write New Blog Post" },
                { href: "/admin/projects/new", label: "Add New Project" },
                { href: "/admin/github", label: "Sync GitHub Repos" },
              ].map((action) => (
                <Link key={action.href} href={action.href} style={{ display: "block", padding: "12px 16px", borderRadius: 8, border: `1px solid ${brand.border}`, color: brand.text, fontSize: 14 }}>
                  {action.label}
                </Link>
              ))}
            </div>
          </Card>
        </Col>

        <Col xs={24} md={12}>
          <Card title="Recent Messages" variant="outlined" style={{ borderColor: brand.border }}>
            {recentMessages.length === 0 ? (
              <Empty description="No messages yet." image={Empty.PRESENTED_IMAGE_SIMPLE} />
            ) : (
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                {recentMessages.map((msg) => (
                  <div key={msg.id} style={{ padding: 12, borderRadius: 8, border: `1px solid ${brand.border}` }}>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 4 }}>
                      <span style={{ fontSize: 14, fontWeight: 600, color: brand.text }}>{msg.name}</span>
                      {!msg.read && <Badge status="processing" text={<span style={{ fontSize: 11, color: brand.primary }}>New</span>} />}
                    </div>
                    <p style={{ fontSize: 12, color: brand.textSecondary, margin: 0 }}>{msg.subject}</p>
                    <p style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: brand.textMuted, margin: "4px 0 0" }}>{msg.email}</p>
                  </div>
                ))}
              </div>
            )}
          </Card>
        </Col>
      </Row>
    </div>
  )
}
