"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Table, Tag, Button, Space, Popconfirm, App } from "antd"
import { EditOutlined, ExportOutlined, DeleteOutlined, StarFilled, PlusOutlined } from "@ant-design/icons"
import type { ColumnsType } from "antd/es/table"
import type { Project } from "@prisma/client"
import { brand } from "@/lib/theme"

export function ProjectsTable({ projects }: { projects: Project[] }) {
  const router = useRouter()
  const { message } = App.useApp()
  const [deletingId, setDeletingId] = useState<string | null>(null)

  const handleDelete = async (id: string) => {
    setDeletingId(id)
    try {
      const res = await fetch(`/api/projects/${id}`, { method: "DELETE" })
      if (!res.ok) throw new Error()
      message.success("Project deleted")
      router.refresh()
    } catch {
      message.error("Failed to delete project")
    } finally {
      setDeletingId(null)
    }
  }

  const columns: ColumnsType<Project> = [
    {
      title: "Title",
      dataIndex: "title",
      render: (_, p) => (
        <div>
          <div style={{ fontWeight: 600, color: brand.text }}>{p.title}</div>
          <div style={{ fontFamily: "var(--font-mono)", fontSize: 12, color: brand.textMuted }}>/{p.slug}</div>
        </div>
      ),
    },
    {
      title: "Category",
      dataIndex: "category",
      render: (cat: string) => <Tag color="processing">{cat}</Tag>,
      filters: Array.from(new Set(projects.map((p) => p.category))).map((c) => ({ text: c, value: c })),
      onFilter: (value, p) => p.category === value,
    },
    {
      title: "Featured",
      dataIndex: "featured",
      render: (featured: boolean) =>
        featured ? <StarFilled style={{ color: "#F5A623" }} /> : <span style={{ color: brand.textMuted }}>—</span>,
    },
    {
      title: "Status",
      dataIndex: "status",
      render: (status: string) => <Tag color={status === "published" ? "success" : "default"}>{status}</Tag>,
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, p) => (
        <Space>
          <Link href={`/admin/projects/${p.id}`}>
            <Button size="small" icon={<EditOutlined />}>Edit</Button>
          </Link>
          <Link href={`/projects/${p.slug}`} target="_blank">
            <Button size="small" type="text" icon={<ExportOutlined />} />
          </Link>
          <Popconfirm title="Delete this project?" onConfirm={() => handleDelete(p.id)} okText="Delete" okButtonProps={{ danger: true }}>
            <Button size="small" danger type="text" icon={<DeleteOutlined />} loading={deletingId === p.id} />
          </Popconfirm>
        </Space>
      ),
    },
  ]

  return (
    <div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 16, alignItems: "center", justifyContent: "space-between", marginBottom: 32 }}>
        <div>
          <h1 style={{ fontFamily: "var(--font-display)", fontSize: 32, fontWeight: 700, color: brand.text, margin: 0 }}>Projects</h1>
          <p style={{ fontSize: 14, color: brand.textSecondary, marginTop: 4 }}>{projects.length} projects in database</p>
        </div>
        <Link href="/admin/projects/new">
          <Button type="primary" icon={<PlusOutlined />}>New Project</Button>
        </Link>
      </div>
      <Table rowKey="id" columns={columns} dataSource={projects} pagination={{ pageSize: 10, hideOnSinglePage: true }} scroll={{ x: "max-content" }} />
    </div>
  )
}
