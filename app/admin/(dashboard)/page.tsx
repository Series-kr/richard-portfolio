import Link from "next/link"
import { prisma } from "@/lib/prisma"

export default async function AdminDashboard() {
  const [projects, posts, messages, skills, experiences, repos] = await Promise.all([
    prisma.project.count(),
    prisma.blogPost.count(),
    prisma.contactMessage.count({ where: { read: false } }),
    prisma.skill.count(),
    prisma.experience.count(),
    prisma.gitHubRepo.count({ where: { showOnSite: true } }),
  ])

  const recentMessages = await prisma.contactMessage.findMany({
    orderBy: { createdAt: "desc" },
    take: 5,
  })

  const statCards = [
    { label: "Projects", value: projects, href: "/admin/projects", icon: "📁", color: "text-[#45f1c3]" },
    { label: "Blog Posts", value: posts, href: "/admin/blog", icon: "✍️", color: "text-[#ffcea6]" },
    { label: "Unread Messages", value: messages, href: "/admin/messages", icon: "📬", color: "text-[#45f1c3]" },
    { label: "Skills", value: skills, href: "/admin/skills", icon: "⚡", color: "text-[#28dfb3]" },
    { label: "Experience Entries", value: experiences, href: "/admin/experience", icon: "💼", color: "text-[#45f1c3]" },
    { label: "GitHub Repos", value: repos, href: "/admin/github", icon: "⌘", color: "text-[#ffcea6]" },
  ]

  return (
    <div>
      <div className="mb-8">
        <h1 className="font-[family-name:var(--font-syne)] text-[32px] font-bold text-[#d9e3f7]">
          Dashboard
        </h1>
        <p className="font-[family-name:var(--font-dm-sans)] text-[14px] text-[#bacac2] mt-1">
          Welcome back, Richard. Here&apos;s an overview of your portfolio.
        </p>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
        {statCards.map((card) => (
          <Link
            key={card.label}
            href={card.href}
            className="bg-[#091421] border border-[#1C2330] p-6 rounded-xl active-glow transition-all duration-300 block"
          >
            <div className="text-2xl mb-3">{card.icon}</div>
            <div className={`font-[family-name:var(--font-syne)] text-[40px] font-bold ${card.color}`}>
              {card.value}
            </div>
            <div className="font-[family-name:var(--font-mono)] text-[11px] text-[#bacac2] uppercase tracking-widest mt-1">
              {card.label}
            </div>
          </Link>
        ))}
      </div>

      {/* Quick actions */}
      <div className="grid md:grid-cols-2 gap-6 mb-8">
        <div className="bg-[#091421] border border-[#1C2330] p-6 rounded-xl">
          <h2 className="font-[family-name:var(--font-syne)] text-[20px] font-bold text-[#d9e3f7] mb-4">
            Quick Actions
          </h2>
          <div className="space-y-3">
            {[
              { href: "/admin/blog/new", label: "Write New Blog Post", icon: "✍️" },
              { href: "/admin/projects/new", label: "Add New Project", icon: "📁" },
              { href: "/admin/github", label: "Sync GitHub Repos", icon: "⌘" },
            ].map((action) => (
              <Link
                key={action.href}
                href={action.href}
                className="flex items-center gap-3 p-3 rounded-lg border border-[#1C2330] hover:bg-[#16202e] hover:border-[#45f1c3]/30 transition-all font-[family-name:var(--font-dm-sans)] text-[14px] text-[#d9e3f7]"
              >
                <span>{action.icon}</span>
                {action.label}
              </Link>
            ))}
          </div>
        </div>

        {/* Recent messages */}
        <div className="bg-[#091421] border border-[#1C2330] p-6 rounded-xl">
          <h2 className="font-[family-name:var(--font-syne)] text-[20px] font-bold text-[#d9e3f7] mb-4">
            Recent Messages
          </h2>
          {recentMessages.length === 0 ? (
            <p className="font-[family-name:var(--font-dm-sans)] text-[14px] text-[#bacac2]">
              No messages yet.
            </p>
          ) : (
            <div className="space-y-3">
              {recentMessages.map((msg) => (
                <div key={msg.id} className="p-3 rounded-lg border border-[#1C2330]">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-[family-name:var(--font-dm-sans)] text-[14px] font-semibold text-[#d9e3f7]">
                      {msg.name}
                    </span>
                    {!msg.read && (
                      <span className="w-2 h-2 rounded-full bg-[#45f1c3]" />
                    )}
                  </div>
                  <p className="font-[family-name:var(--font-dm-sans)] text-[12px] text-[#bacac2] line-clamp-1">
                    {msg.subject}
                  </p>
                  <p className="font-[family-name:var(--font-mono)] text-[11px] text-[#85948d] mt-1">
                    {msg.email}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
