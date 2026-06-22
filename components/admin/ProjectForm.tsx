"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Form, Input, Select, Switch, Button, Row, Col, Card, Space, Popconfirm, App, Skeleton } from "antd"
import { parseJsonArray } from "@/lib/utils"
import { brand } from "@/lib/theme"

const CATEGORIES = ["SaaS", "EdTech", "AI", "Business", "Mobile"]

interface ProjectValues {
  title: string
  shortDesc: string
  problem: string
  solution: string
  impact: string
  techStack: string[]
  category: string
  featured: boolean
  order: number
  githubUrl: string
  liveUrl: string
  status: "published" | "draft"
}

const initialValues: ProjectValues = {
  title: "",
  shortDesc: "",
  problem: "",
  solution: "",
  impact: "",
  techStack: [],
  category: "SaaS",
  featured: false,
  order: 0,
  githubUrl: "",
  liveUrl: "",
  status: "published",
}

export function ProjectForm({ id }: { id?: string }) {
  const router = useRouter()
  const { message } = App.useApp()
  const [form] = Form.useForm<ProjectValues>()
  const [saving, setSaving] = useState(false)
  const [loading, setLoading] = useState(Boolean(id))

  useEffect(() => {
    if (!id) return
    fetch(`/api/projects/${id}`)
      .then((r) => r.json())
      .then((p) => {
        form.setFieldsValue({
          title: p.title,
          shortDesc: p.shortDesc,
          problem: p.problem,
          solution: p.solution,
          impact: p.impact,
          techStack: parseJsonArray(p.techStack),
          category: p.category,
          featured: p.featured,
          order: p.order,
          githubUrl: p.githubUrl ?? "",
          liveUrl: p.liveUrl ?? "",
          status: p.status,
        })
      })
      .catch(() => message.error("Failed to load project"))
      .finally(() => setLoading(false))
  }, [id, form, message])

  const onFinish = async (values: ProjectValues) => {
    setSaving(true)
    try {
      const res = await fetch(id ? `/api/projects/${id}` : "/api/projects", {
        method: id ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      })
      if (!res.ok) {
        const err = await res.json().catch(() => ({}))
        throw new Error(err?.error ?? "Save failed")
      }
      message.success(id ? "Project updated" : "Project created")
      router.push("/admin/projects")
      router.refresh()
    } catch (e) {
      message.error(e instanceof Error ? e.message : "Save failed. Check for duplicate title/slug.")
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async () => {
    if (!id) return
    try {
      await fetch(`/api/projects/${id}`, { method: "DELETE" })
      message.success("Project deleted")
      router.push("/admin/projects")
      router.refresh()
    } catch {
      message.error("Failed to delete")
    }
  }

  if (loading) return <Skeleton active paragraph={{ rows: 10 }} />

  return (
    <div style={{ maxWidth: 820 }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 24 }}>
        <h1 style={{ fontFamily: "var(--font-display)", fontSize: 32, fontWeight: 700, color: brand.text, margin: 0 }}>
          {id ? "Edit Project" : "New Project"}
        </h1>
        <Space>
          {id && (
            <Popconfirm title="Delete this project?" onConfirm={handleDelete} okText="Delete" okButtonProps={{ danger: true }}>
              <Button danger>Delete</Button>
            </Popconfirm>
          )}
          <Button type="primary" loading={saving} onClick={() => form.submit()}>
            {id ? "Save" : "Save Project"}
          </Button>
        </Space>
      </div>

      <Card variant="outlined" style={{ borderColor: brand.border }}>
        <Form form={form} layout="vertical" requiredMark={false} initialValues={initialValues} onFinish={onFinish}>
          <Form.Item name="title" label="Title" rules={[{ required: true, message: "Title is required" }]}>
            <Input placeholder="Project name..." />
          </Form.Item>
          <Form.Item name="shortDesc" label="Short Description" rules={[{ required: true, message: "A short description is required" }]}>
            <Input.TextArea rows={2} placeholder="1–2 sentence summary..." />
          </Form.Item>
          <Form.Item name="problem" label="Problem">
            <Input.TextArea rows={3} placeholder="What problem did this solve?" />
          </Form.Item>
          <Form.Item name="solution" label="Solution">
            <Input.TextArea rows={3} placeholder="What did you build?" />
          </Form.Item>
          <Form.Item name="impact" label="Impact / Results">
            <Input.TextArea rows={3} placeholder="Measurable outcomes..." />
          </Form.Item>
          <Form.Item name="techStack" label="Tech Stack">
            <Select mode="tags" tokenSeparators={[","]} placeholder="Next.js, Node.js, PostgreSQL..." />
          </Form.Item>

          <Row gutter={16}>
            <Col xs={24} sm={12}>
              <Form.Item name="category" label="Category">
                <Select options={CATEGORIES.map((c) => ({ value: c, label: c }))} />
              </Form.Item>
            </Col>
            <Col xs={24} sm={12}>
              <Form.Item name="status" label="Status">
                <Select options={[{ value: "published", label: "Published" }, { value: "draft", label: "Draft" }]} />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col xs={24} sm={12}>
              <Form.Item name="githubUrl" label="GitHub URL">
                <Input placeholder="https://github.com/..." />
              </Form.Item>
            </Col>
            <Col xs={24} sm={12}>
              <Form.Item name="liveUrl" label="Live URL">
                <Input placeholder="https://..." />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item name="featured" label="Featured project" valuePropName="checked">
            <Switch />
          </Form.Item>
        </Form>
      </Card>
    </div>
  )
}
