import Link from "next/link"
import { prisma } from "@/lib/prisma"
import { formatDate } from "@/lib/utils"

export default async function AdminBlogPage() {
  const posts = await prisma.blogPost.findMany({
    orderBy: { createdAt: "desc" },
  })

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-[family-name:var(--font-syne)] text-[32px] font-bold text-[#d9e3f7]">
            Blog Posts
          </h1>
          <p className="font-[family-name:var(--font-dm-sans)] text-[14px] text-[#bacac2] mt-1">
            {posts.filter((p) => p.published).length} published · {posts.filter((p) => !p.published).length} drafts
          </p>
        </div>
        <Link
          href="/admin/blog/new"
          className="bg-[#00d4a8] text-[#00382a] font-bold px-5 py-2.5 rounded-lg hover:shadow-[0_0_20px_rgba(0,212,168,0.3)] transition-all font-[family-name:var(--font-dm-sans)]"
        >
          + New Post
        </Link>
      </div>

      <div className="bg-[#091421] border border-[#1C2330] rounded-xl overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-[#1C2330]">
              {["Title", "Category", "Status", "Views", "Date", "Actions"].map((h) => (
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
            {posts.map((post) => (
              <tr key={post.id} className="border-b border-[#1C2330]/40 hover:bg-[#16202e] transition-colors">
                <td className="px-6 py-4">
                  <div className="font-[family-name:var(--font-dm-sans)] text-[14px] font-semibold text-[#d9e3f7] max-w-xs truncate">
                    {post.title}
                  </div>
                  {post.generatedByAI && (
                    <span className="font-[family-name:var(--font-mono)] text-[11px] text-[#45f1c3]/60">AI</span>
                  )}
                </td>
                <td className="px-6 py-4">
                  <span className="font-[family-name:var(--font-mono)] text-[11px] bg-[#45f1c3]/10 text-[#45f1c3] border border-[#45f1c3]/20 px-2 py-0.5 rounded uppercase">
                    {post.category}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span
                    className={`font-[family-name:var(--font-mono)] text-[11px] px-2 py-0.5 rounded uppercase ${
                      post.published
                        ? "bg-[#45f1c3]/10 text-[#45f1c3] border border-[#45f1c3]/20"
                        : "bg-[#85948d]/10 text-[#85948d] border border-[#85948d]/20"
                    }`}
                  >
                    {post.published ? "Published" : "Draft"}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span className="font-[family-name:var(--font-mono)] text-[13px] text-[#bacac2]">
                    {post.views}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span className="font-[family-name:var(--font-mono)] text-[12px] text-[#85948d]">
                    {post.publishedAt ? formatDate(post.publishedAt) : formatDate(post.createdAt)}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <Link
                      href={`/admin/blog/${post.id}`}
                      className="font-[family-name:var(--font-dm-sans)] text-[13px] text-[#45f1c3] hover:underline"
                    >
                      Edit
                    </Link>
                    {post.published && (
                      <Link
                        href={`/blog/${post.slug}`}
                        target="_blank"
                        className="font-[family-name:var(--font-dm-sans)] text-[13px] text-[#bacac2] hover:text-[#d9e3f7]"
                      >
                        View ↗
                      </Link>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {posts.length === 0 && (
          <div className="text-center py-16">
            <p className="font-[family-name:var(--font-dm-sans)] text-[16px] text-[#bacac2] mb-4">
              No blog posts yet.
            </p>
            <Link
              href="/admin/blog/new"
              className="bg-[#00d4a8] text-[#00382a] font-bold px-6 py-2.5 rounded-lg font-[family-name:var(--font-dm-sans)]"
            >
              Create Your First Post
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}
