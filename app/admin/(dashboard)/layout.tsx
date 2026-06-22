import { redirect } from "next/navigation"
import { auth } from "@/auth"
import { prisma } from "@/lib/prisma"
import { AdminShell } from "@/components/admin/AdminShell"

export const dynamic = "force-dynamic"

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const session = await auth()
  if (!session?.user) {
    redirect("/admin/login")
  }

  const unreadCount = await prisma.contactMessage.count({ where: { read: false } }).catch(() => 0)

  return <AdminShell unreadCount={unreadCount}>{children}</AdminShell>
}
