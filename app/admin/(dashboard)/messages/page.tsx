import { prisma } from "@/lib/prisma"
import { formatDate } from "@/lib/utils"

export default async function AdminMessagesPage() {
  const messages = await prisma.contactMessage.findMany({
    orderBy: { createdAt: "desc" },
  })

  return (
    <div>
      <div className="mb-8">
        <h1 className="font-[family-name:var(--font-syne)] text-[32px] font-bold text-[#d9e3f7]">
          Messages
        </h1>
        <p className="font-[family-name:var(--font-dm-sans)] text-[14px] text-[#bacac2] mt-1">
          {messages.filter((m) => !m.read).length} unread · {messages.length} total
        </p>
      </div>

      <div className="bg-[#091421] border border-[#1C2330] rounded-xl overflow-hidden">
        {messages.length === 0 ? (
          <div className="text-center py-16">
            <div className="text-4xl mb-4">📬</div>
            <p className="font-[family-name:var(--font-dm-sans)] text-[16px] text-[#bacac2]">
              No messages yet.
            </p>
          </div>
        ) : (
          <table className="w-full">
            <thead>
              <tr className="border-b border-[#1C2330]">
                {["From", "Subject", "Message", "Date", "Status"].map((h) => (
                  <th
                    key={h}
                    className="text-left px-6 py-4 font-[family-name:var(--font-mono)] text-[11px] text-[#bacac2] uppercase tracking-widest"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {messages.map((msg) => (
                <tr
                  key={msg.id}
                  className="border-b border-[#1C2330]/40 hover:bg-[#16202e] transition-colors"
                >
                  <td className="px-6 py-4">
                    <div className="font-[family-name:var(--font-dm-sans)] text-[14px] font-semibold text-[#d9e3f7]">
                      {msg.name}
                    </div>
                    <div className="font-[family-name:var(--font-mono)] text-[12px] text-[#85948d]">
                      {msg.email}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="font-[family-name:var(--font-dm-sans)] text-[13px] text-[#bacac2]">
                      {msg.subject}
                    </span>
                  </td>
                  <td className="px-6 py-4 max-w-xs">
                    <p className="font-[family-name:var(--font-dm-sans)] text-[13px] text-[#bacac2] line-clamp-2">
                      {msg.message}
                    </p>
                  </td>
                  <td className="px-6 py-4">
                    <span className="font-[family-name:var(--font-mono)] text-[12px] text-[#85948d] whitespace-nowrap">
                      {formatDate(msg.createdAt)}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`font-[family-name:var(--font-mono)] text-[11px] px-2 py-0.5 rounded uppercase ${
                        msg.read
                          ? "bg-[#85948d]/10 text-[#85948d] border border-[#85948d]/20"
                          : "bg-[#45f1c3]/10 text-[#45f1c3] border border-[#45f1c3]/20"
                      }`}
                    >
                      {msg.read ? "Read" : "New"}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  )
}
