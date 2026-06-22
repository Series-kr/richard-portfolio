"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Table, Tag, Button, Space, Popconfirm, App } from "antd"
import { EditOutlined, ExportOutlined, DeleteOutlined, PlusOutlined } from "@ant-design/icons"
import type { ColumnsType } from "antd/es/table"
import type { BlogPost } from "@prisma/client"
import { formatDate } from "@/lib/utils"
import { brand } from "@/lib/theme"

export function BlogTable({ posts }: { posts: BlogPost[] }) {
  const router = useRouter()
  const { message } = App.useApp()
  const [deletingId, setDeletingId] = useState<string | null>(null)

  const handleDelete = async (id: string) => {
    setDeletingId(id)
    try {
      const res = await fetch(`/api/blog/${id}`, { method: "DELETE" })
      if (!res.ok) throw new Error()
      message.success("Post deleted")
      router.refresh()
    } catch {
      message.error("Failed to delete post")
    } finally {
      setDeletingId(null)
    }
  }

  const columns: ColumnsType<BlogPost> = [
    {
      title: "Title",
      dataIndex: "title",
      render: (_, p) => (
        <div>
          <span style={{ fontWeight: 600, color: brand.text }}>{p.title}</span>
          {p.generatedByAI && <Tag style={{ marginLeft: 8, fontFamily: "var(--font-mono)", fontSize: 10 }} color="processing">AI</Tag>}
        </div>
      ),
    },
    { title: "Category", dataIndex: "category", render: (c: string) => <Tag color="processing">{c}</Tag> },
    {
      title: "Status",
      dataIndex: "published",
      render: (published: boolean) => <Tag color={published ? "success" : "default"}>{published ? "Published" : "Draft"}</Tag>,
      filters: [
        { text: "Published", value: true },
        { text: "Draft", value: false },
      ],
      onFilter: (value, p) => p.published === value,
    },
    { title: "Views", dataIndex: "views", sorter: (a, b) => a.views - b.views },
    {
      title: "Date",
      key: "date",
      render: (_, p) => (
        <span style={{ fontFamily: "var(--font-mono)", fontSize: 12, color: brand.textMuted }}>
          {p.publishedAt ? formatDate(p.publishedAt) : formatDate(p.createdAt)}
        </span>
      ),
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, p) => (
        <Space>
          <Link href={`/admin/blog/${p.id}`}>
            <Button size="small" icon={<EditOutlined />}>Edit</Button>
          </Link>
          {p.published && (
            <Link href={`/blog/${p.slug}`} target="_blank">
              <Button size="small" type="text" icon={<ExportOutlined />} />
            </Link>
          )}
          <Popconfirm title="Delete this post?" onConfirm={() => handleDelete(p.id)} okText="Delete" okButtonProps={{ danger: true }}>
            <Button size="small" danger type="text" icon={<DeleteOutlined />} loading={deletingId === p.id} />
          </Popconfirm>
        </Space>
      ),
    },
  ]

  const published = posts.filter((p) => p.published).length

  return (
    <div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 16, alignItems: "center", justifyContent: "space-between", marginBottom: 32 }}>
        <div>
          <h1 style={{ fontFamily: "var(--font-display)", fontSize: 32, fontWeight: 700, color: brand.text, margin: 0 }}>Blog Posts</h1>
          <p style={{ fontSize: 14, color: brand.textSecondary, marginTop: 4 }}>
            {published} published · {posts.length - published} drafts
          </p>
        </div>
        <Link href="/admin/blog/new">
          <Button type="primary" icon={<PlusOutlined />}>New Post</Button>
        </Link>
      </div>
      <Table rowKey="id" columns={columns} dataSource={posts} pagination={{ pageSize: 10, hideOnSinglePage: true }} scroll={{ x: "max-content" }} />
    </div>
  )
}
