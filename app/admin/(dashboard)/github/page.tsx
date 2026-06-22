"use client"

import { useState, useEffect } from "react"
import { Table, Button, Switch, Tag, Alert, App } from "antd"
import { SyncOutlined, StarFilled } from "@ant-design/icons"
import type { ColumnsType } from "antd/es/table"
import { brand } from "@/lib/theme"

interface Repo {
  id: string
  repoId: number
  name: string
  description: string | null
  language: string | null
  stars: number
  forks: number
  showOnSite: boolean
  pinned: boolean
  url: string
}

export default function AdminGithubPage() {
  const { message } = App.useApp()
  const [repos, setRepos] = useState<Repo[]>([])
  const [syncing, setSyncing] = useState(false)
  const [syncResult, setSyncResult] = useState<{ synced: number; total: number } | null>(null)
  const [loading, setLoading] = useState(true)

  const loadRepos = async () => {
    try {
      const data = await fetch("/api/github/repos").then((r) => r.json())
      if (Array.isArray(data)) setRepos(data)
    } catch {
      /* ignore */
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadRepos()
  }, [])

  const handleSync = async () => {
    setSyncing(true)
    setSyncResult(null)
    try {
      const res = await fetch("/api/github/sync", { method: "POST" })
      const result = await res.json()
      setSyncResult(result)
      await loadRepos()
      message.success(`Synced ${result.synced} of ${result.total} repos`)
    } catch {
      message.error("Sync failed")
    } finally {
      setSyncing(false)
    }
  }

  const toggleRepo = async (id: string, field: "showOnSite" | "pinned", value: boolean) => {
    setRepos((prev) => prev.map((r) => (r.id === id ? { ...r, [field]: value } : r)))
    try {
      await fetch(`/api/github/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ [field]: value }),
      })
    } catch {
      setRepos((prev) => prev.map((r) => (r.id === id ? { ...r, [field]: !value } : r)))
      message.error("Update failed")
    }
  }

  const columns: ColumnsType<Repo> = [
    {
      title: "Repository",
      dataIndex: "name",
      render: (_, r) => (
        <div>
          <a href={r.url} target="_blank" rel="noopener noreferrer" style={{ fontWeight: 600, color: brand.text }}>
            {r.name}
          </a>
          {r.description && <div style={{ fontSize: 12, color: brand.textMuted }}>{r.description}</div>}
        </div>
      ),
    },
    { title: "Language", dataIndex: "language", render: (l: string | null) => (l ? <Tag>{l}</Tag> : <span style={{ color: brand.textMuted }}>—</span>) },
    {
      title: "Stars",
      dataIndex: "stars",
      sorter: (a, b) => a.stars - b.stars,
      render: (s: number) => (
        <span style={{ fontFamily: "var(--font-mono)" }}>
          <StarFilled style={{ color: "#F5A623" }} /> {s}
        </span>
      ),
    },
    { title: "Show on Site", dataIndex: "showOnSite", render: (v: boolean, r) => <Switch checked={v} onChange={(c) => toggleRepo(r.id, "showOnSite", c)} /> },
    { title: "Pinned", dataIndex: "pinned", render: (v: boolean, r) => <Switch checked={v} onChange={(c) => toggleRepo(r.id, "pinned", c)} /> },
  ]

  return (
    <div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 16, alignItems: "center", justifyContent: "space-between", marginBottom: 32 }}>
        <div>
          <h1 style={{ fontFamily: "var(--font-display)", fontSize: 32, fontWeight: 700, color: brand.text, margin: 0 }}>GitHub Sync</h1>
          <p style={{ fontSize: 14, color: brand.textSecondary, marginTop: 4 }}>Manage which repositories show on your portfolio.</p>
        </div>
        <Button type="primary" icon={<SyncOutlined spin={syncing} />} loading={syncing} onClick={handleSync}>
          Sync from GitHub
        </Button>
      </div>

      {syncResult && <Alert type="success" showIcon style={{ marginBottom: 16 }} message={`Synced ${syncResult.synced} of ${syncResult.total} repos`} />}

      <Table rowKey="id" loading={loading} columns={columns} dataSource={repos} pagination={{ pageSize: 12, hideOnSinglePage: true }} scroll={{ x: "max-content" }} />
    </div>
  )
}
