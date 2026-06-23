import { prisma } from "@/lib/prisma"
import { MessagesTable } from "@/components/admin/MessagesTable"
import { brand } from "@/lib/theme"

export const dynamic = "force-dynamic"

export default async function AdminMessagesPage() {
  const messages = await prisma.contactMessage.findMany({ orderBy: { createdAt: "desc" } }).catch(() => [])
  const unread = messages.filter((m) => !m.read).length

  return (
    <div>
      <div style={{ marginBottom: 32 }}>
        <h1 style={{ fontFamily: "var(--font-display)", fontSize: 32, fontWeight: 700, color: brand.text, margin: 0 }}>Messages</h1>
        <p style={{ fontSize: 14, color: brand.textSecondary, marginTop: 4 }}>
          {unread} unread · {messages.length} total
        </p>
      </div>
      <MessagesTable messages={messages} />
    </div>
  )
}
