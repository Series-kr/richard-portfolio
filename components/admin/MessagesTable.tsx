"use client"

import { Table, Tag, Descriptions } from "antd"
import type { ColumnsType } from "antd/es/table"
import type { ContactMessage } from "@prisma/client"
import { formatDate } from "@/lib/utils"
import { brand } from "@/lib/theme"

export function MessagesTable({ messages }: { messages: ContactMessage[] }) {
  const columns: ColumnsType<ContactMessage> = [
    {
      title: "From",
      dataIndex: "name",
      render: (_, m) => (
        <div>
          <div style={{ fontWeight: 600, color: brand.text }}>{m.name}</div>
          <div style={{ fontFamily: "var(--font-mono)", fontSize: 12, color: brand.textMuted }}>{m.email}</div>
        </div>
      ),
    },
    { title: "Subject", dataIndex: "subject", render: (s: string) => <span style={{ color: brand.textSecondary }}>{s}</span> },
    {
      title: "Date",
      dataIndex: "createdAt",
      render: (d: Date) => <span style={{ fontFamily: "var(--font-mono)", fontSize: 12, color: brand.textMuted }}>{formatDate(d)}</span>,
      sorter: (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
      defaultSortOrder: "descend",
    },
    {
      title: "Status",
      dataIndex: "read",
      render: (read: boolean) => <Tag color={read ? "default" : "processing"}>{read ? "Read" : "New"}</Tag>,
      filters: [
        { text: "New", value: false },
        { text: "Read", value: true },
      ],
      onFilter: (value, m) => m.read === value,
    },
  ]

  return (
    <Table
      rowKey="id"
      columns={columns}
      dataSource={messages}
      pagination={{ pageSize: 12, hideOnSinglePage: true }}
      scroll={{ x: "max-content" }}
      expandable={{
        expandedRowRender: (m) => (
          <Descriptions column={1} size="small" styles={{ label: { color: brand.textMuted } }}>
            <Descriptions.Item label="Message">{m.message}</Descriptions.Item>
          </Descriptions>
        ),
      }}
    />
  )
}
