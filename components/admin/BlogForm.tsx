"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import {
  Form, Input, Select, Slider, Switch, Button, Row, Col, Card, Space, Modal, Alert, Popconfirm, App, Skeleton, Typography,
} from "antd"
import { RobotOutlined } from "@ant-design/icons"
import { parseJsonArray } from "@/lib/utils"
import { brand } from "@/lib/theme"
import type { GeneratedBlog } from "@/lib/groq"

const CATEGORIES = ["Architecture", "AI", "DevOps", "Engineering", "Career"]
const AI_MODEL = "llama-3.3-70b-versatile"

type Tone = "technical" | "conversational" | "tutorial" | "opinion"

interface BlogValues {
  title: string
  excerpt: string
  content: string
  category: string
  tags: string[]
  seoTitle: string
  seoDescription: string
  seoKeywords: string[]
  readTimeMinutes: number
}

interface GroqValues {
  topic: string
  targetKeyword: string
  audience: string
  tone: Tone
  wordCount: number
  includeCodeExamples: boolean
}

const blogInitial: BlogValues = {
  title: "", excerpt: "", content: "", category: "Engineering", tags: [],
  seoTitle: "", seoDescription: "", seoKeywords: [], readTimeMinutes: 5,
}

export function BlogForm({ id }: { id?: string }) {
  const router = useRouter()
  const { message } = App.useApp()
  const [form] = Form.useForm<BlogValues>()
  const [groqForm] = Form.useForm<GroqValues>()

  const [loading, setLoading] = useState(Boolean(id))
  const [saving, setSaving] = useState(false)
  const [published, setPublished] = useState(false)
  const [generatedByAI, setGeneratedByAI] = useState(false)

  const [modalOpen, setModalOpen] = useState(false)
  const [generating, setGenerating] = useState(false)
  const [genError, setGenError] = useState("")

  useEffect(() => {
    if (!id) return
    fetch(`/api/blog/${id}`)
      .then((r) => r.json())
      .then((post) => {
        form.setFieldsValue({
          title: post.title,
          excerpt: post.excerpt,
          content: post.content,
          category: post.category,
          tags: parseJsonArray(post.tags),
          seoTitle: post.seoTitle ?? "",
          seoDescription: post.seoDescription ?? "",
          seoKeywords: parseJsonArray(post.seoKeywords),
          readTimeMinutes: post.readTimeMinutes,
        })
        setPublished(post.published)
        setGeneratedByAI(post.generatedByAI)
      })
      .catch(() => message.error("Failed to load post"))
      .finally(() => setLoading(false))
  }, [id, form, message])

  const handleGenerate = async () => {
    let values: GroqValues
    try {
      values = await groqForm.validateFields()
    } catch {
      return
    }
    setGenerating(true)
    setGenError("")
    try {
      const res = await fetch("/api/blog/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      })
      if (!res.ok) {
        const err = await res.json().catch(() => ({}))
        throw new Error(err.error || "Generation failed")
      }
      const g: GeneratedBlog = await res.json()
      form.setFieldsValue({
        title: g.title,
        excerpt: g.excerpt,
        content: g.content,
        category: g.category,
        tags: g.tags,
        seoTitle: g.seoTitle,
        seoDescription: g.seoDescription,
        seoKeywords: g.seoKeywords,
        readTimeMinutes: g.readTimeMinutes,
      })
      setGeneratedByAI(true)
      setModalOpen(false)
      message.success("Draft generated — review before publishing")
    } catch (err) {
      setGenError(err instanceof Error ? err.message : "Generation failed")
    } finally {
      setGenerating(false)
    }
  }

  const handleSave = async (publish: boolean) => {
    let values: BlogValues
    try {
      values = await form.validateFields()
    } catch {
      return
    }
    setSaving(true)
    try {
      const res = await fetch(id ? `/api/blog/${id}` : "/api/blog", {
        method: id ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...values,
          seoTitle: values.seoTitle || values.title,
          seoDescription: values.seoDescription || values.excerpt,
          published: publish,
          generatedByAI,
          ...(generatedByAI ? { aiModel: AI_MODEL } : {}),
        }),
      })
      if (!res.ok) throw new Error("Save failed")
      message.success(publish ? "Post published" : "Draft saved")
      router.push("/admin/blog")
      router.refresh()
    } catch {
      message.error("Failed to save post")
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async () => {
    if (!id) return
    try {
      await fetch(`/api/blog/${id}`, { method: "DELETE" })
      message.success("Post deleted")
      router.push("/admin/blog")
      router.refresh()
    } catch {
      message.error("Failed to delete")
    }
  }

  if (loading) return <Skeleton active paragraph={{ rows: 12 }} />

  return (
    <div style={{ maxWidth: 1100 }}>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 16, alignItems: "center", justifyContent: "space-between", marginBottom: 24 }}>
        <h1 style={{ fontFamily: "var(--font-display)", fontSize: 32, fontWeight: 700, color: brand.text, margin: 0 }}>
          {id ? "Edit Post" : "New Blog Post"}
        </h1>
        <Space>
          {id && (
            <Popconfirm title="Delete this post?" onConfirm={handleDelete} okText="Delete" okButtonProps={{ danger: true }}>
              <Button danger>Delete</Button>
            </Popconfirm>
          )}
          {!id && (
            <Button type="primary" ghost icon={<RobotOutlined />} onClick={() => setModalOpen(true)}>
              Generate with Groq AI
            </Button>
          )}
        </Space>
      </div>

      {generatedByAI && (
        <Alert type="success" showIcon style={{ marginBottom: 16 }} message={`Generated with Groq AI (${AI_MODEL}) · Review before publishing`} />
      )}

      <Form form={form} layout="vertical" requiredMark={false} initialValues={blogInitial}>
        <Row gutter={24}>
          <Col xs={24} md={16}>
            <Card variant="outlined" style={{ borderColor: brand.border }}>
              <Form.Item name="title" label="Title" rules={[{ required: true, message: "Title is required" }]}>
                <Input placeholder="Post title..." />
              </Form.Item>
              <Form.Item name="excerpt" label="Excerpt">
                <Input.TextArea rows={2} placeholder="2–3 sentence summary..." />
              </Form.Item>
              <Form.Item name="content" label="Content (Markdown)" rules={[{ required: true, message: "Content is required" }]}>
                <Input.TextArea rows={20} style={{ fontFamily: "var(--font-mono)", fontSize: 13 }} placeholder="Write your post in Markdown..." />
              </Form.Item>
            </Card>
          </Col>

          <Col xs={24} md={8}>
            <Space direction="vertical" size={20} style={{ width: "100%" }}>
              <Card title="Publish" variant="outlined" style={{ borderColor: brand.border }}>
                <Space direction="vertical" style={{ width: "100%" }}>
                  <Button block loading={saving} onClick={() => handleSave(false)}>
                    {published ? "Unpublish / Save Draft" : "Save Draft"}
                  </Button>
                  <Button type="primary" block loading={saving} onClick={() => handleSave(true)}>
                    {published ? "Update" : "Publish"}
                  </Button>
                </Space>
              </Card>

              <Card title="Settings" variant="outlined" style={{ borderColor: brand.border }}>
                <Form.Item name="category" label="Category">
                  <Select options={CATEGORIES.map((c) => ({ value: c, label: c }))} />
                </Form.Item>
                <Form.Item name="tags" label="Tags">
                  <Select mode="tags" tokenSeparators={[","]} placeholder="next.js, react, typescript" />
                </Form.Item>
                <Form.Item name="readTimeMinutes" label="Read Time (minutes)">
                  <Input type="number" min={1} max={60} />
                </Form.Item>
              </Card>

              <Card title="SEO" variant="outlined" style={{ borderColor: brand.border }}>
                <Form.Item name="seoTitle" label="SEO Title">
                  <Input placeholder="55–60 characters" />
                </Form.Item>
                <Form.Item name="seoDescription" label="Meta Description">
                  <Input.TextArea rows={2} placeholder="150–160 characters" />
                </Form.Item>
                <Form.Item name="seoKeywords" label="Keywords">
                  <Select mode="tags" tokenSeparators={[","]} placeholder="react, next.js, ..." />
                </Form.Item>
              </Card>
            </Space>
          </Col>
        </Row>
      </Form>

      <Modal
        title="Generate with Groq AI"
        open={modalOpen}
        onCancel={() => setModalOpen(false)}
        onOk={handleGenerate}
        okText={generating ? "Generating..." : "Generate Post"}
        confirmLoading={generating}
        width={620}
      >
        <Typography.Paragraph type="secondary" style={{ marginTop: -4 }}>
          {AI_MODEL} · SEO-optimised content in seconds
        </Typography.Paragraph>
        {genError && <Alert type="error" showIcon style={{ marginBottom: 16 }} message={genError} />}
        <Form
          form={groqForm}
          layout="vertical"
          requiredMark={false}
          initialValues={{ audience: "developers", tone: "technical", wordCount: 1500, includeCodeExamples: true }}
        >
          <Form.Item name="topic" label="Topic" rules={[{ required: true, message: "Topic is required" }]}>
            <Input placeholder="Building multi-tenant SaaS with Next.js and PostgreSQL" />
          </Form.Item>
          <Form.Item name="targetKeyword" label="Primary SEO Keyword" rules={[{ required: true, message: "Keyword is required" }]}>
            <Input placeholder="multi-tenant SaaS Next.js" />
          </Form.Item>
          <Row gutter={16}>
            <Col xs={24} sm={12}>
              <Form.Item name="audience" label="Audience">
                <Select
                  options={[
                    { value: "developers", label: "Developers" },
                    { value: "business owners", label: "Business Owners" },
                    { value: "students", label: "Students" },
                    { value: "general", label: "General" },
                  ]}
                />
              </Form.Item>
            </Col>
            <Col xs={24} sm={12}>
              <Form.Item name="tone" label="Tone">
                <Select
                  options={[
                    { value: "technical", label: "Technical" },
                    { value: "conversational", label: "Conversational" },
                    { value: "tutorial", label: "Tutorial" },
                    { value: "opinion", label: "Opinion" },
                  ]}
                />
              </Form.Item>
            </Col>
          </Row>
          <Form.Item name="wordCount" label="Word Count">
            <Slider min={800} max={3000} step={100} marks={{ 800: "800", 3000: "3000" }} />
          </Form.Item>
          <Form.Item name="includeCodeExamples" label="Include code examples" valuePropName="checked">
            <Switch />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  )
}
