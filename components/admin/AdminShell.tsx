"use client"

import { useState, type ReactNode } from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { signOut } from "next-auth/react"
import { Layout, Menu, Button, Badge, Grid } from "antd"
import {
  DashboardOutlined,
  FolderOutlined,
  EditOutlined,
  ThunderboltOutlined,
  ProfileOutlined,
  GithubOutlined,
  MailOutlined,
  ExportOutlined,
  LogoutOutlined,
} from "@ant-design/icons"
import { brand } from "@/lib/theme"

const { Sider, Header, Content } = Layout
const { useBreakpoint } = Grid

interface Props {
  children: ReactNode
  unreadCount: number
}

export function AdminShell({ children, unreadCount }: Props) {
  const pathname = usePathname()
  const router = useRouter()
  const screens = useBreakpoint()
  const [collapsed, setCollapsed] = useState(false)

  const items = [
    { key: "/admin", icon: <DashboardOutlined />, label: <Link href="/admin">Dashboard</Link> },
    { key: "/admin/projects", icon: <FolderOutlined />, label: <Link href="/admin/projects">Projects</Link> },
    { key: "/admin/blog", icon: <EditOutlined />, label: <Link href="/admin/blog">Blog</Link> },
    { key: "/admin/skills", icon: <ThunderboltOutlined />, label: <Link href="/admin/skills">Skills</Link> },
    { key: "/admin/experience", icon: <ProfileOutlined />, label: <Link href="/admin/experience">Experience</Link> },
    { key: "/admin/github", icon: <GithubOutlined />, label: <Link href="/admin/github">GitHub</Link> },
    {
      key: "/admin/messages",
      icon: <MailOutlined />,
      label: (
        <Link href="/admin/messages">
          Messages{" "}
          {unreadCount > 0 && <Badge count={unreadCount} size="small" offset={[6, -2]} />}
        </Link>
      ),
    },
  ]

  const selectedKey =
    items
      .map((i) => i.key)
      .filter((key) => (key === "/admin" ? pathname === "/admin" : pathname.startsWith(key)))
      .sort((a, b) => b.length - a.length)[0] ?? "/admin"

  const isMobile = !screens.md

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider
        collapsible
        collapsed={isMobile ? true : collapsed}
        onCollapse={setCollapsed}
        collapsedWidth={isMobile ? 64 : 80}
        width={240}
        style={{ borderRight: `1px solid ${brand.borderSubtle}` }}
      >
        <div style={{ height: 64, display: "flex", alignItems: "center", justifyContent: "center", borderBottom: `1px solid ${brand.borderSubtle}` }}>
          <span style={{ fontFamily: "var(--font-display)", fontSize: 24, fontWeight: 700, color: brand.primary, letterSpacing: "-0.05em" }}>
            {collapsed || isMobile ? "RK" : "RK · Admin"}
          </span>
        </div>
        <Menu theme="dark" mode="inline" selectedKeys={[selectedKey]} items={items} style={{ borderInlineEnd: "none" }} />
      </Sider>

      <Layout>
        <Header style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 24px", borderBottom: `1px solid ${brand.borderSubtle}` }}>
          <span style={{ fontFamily: "var(--font-mono)", fontSize: 12, color: brand.textSecondary, textTransform: "uppercase", letterSpacing: "0.12em" }}>
            Operations Console
          </span>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <Link href="/" target="_blank">
              <Button type="text" icon={<ExportOutlined />}>{isMobile ? null : "View Site"}</Button>
            </Link>
            <Button
              type="text"
              danger
              icon={<LogoutOutlined />}
              onClick={() => signOut({ callbackUrl: "/admin/login" }).then(() => router.refresh())}
            >
              {isMobile ? null : "Log out"}
            </Button>
          </div>
        </Header>
        <Content style={{ padding: 24, overflow: "auto" }}>{children}</Content>
      </Layout>
    </Layout>
  )
}
