import { redirect } from "next/navigation"
import { auth } from "@/auth"
import { AdminSidebar } from "@/components/layout/AdminSidebar"

export const dynamic = "force-dynamic"

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const session = await auth()

  if (!session?.user) {
    redirect("/admin/login")
  }

  return (
    <div className="flex min-h-screen bg-[#080B10]">
      <AdminSidebar />
      <main className="flex-1 overflow-auto">
        <div className="p-8">{children}</div>
      </main>
    </div>
  )
}
