import Link from "next/link"
import { prisma } from "@/lib/prisma"

export default async function AdminProjectsPage() {
  const projects = await prisma.project.findMany({
    orderBy: [{ featured: "desc" }, { order: "asc" }],
  })

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-[family-name:var(--font-syne)] text-[32px] font-bold text-[#d9e3f7]">
            Projects
          </h1>
          <p className="font-[family-name:var(--font-dm-sans)] text-[14px] text-[#bacac2] mt-1">
            {projects.length} projects in database
          </p>
        </div>
        <Link
          href="/admin/projects/new"
          className="bg-[#00d4a8] text-[#00382a] font-bold px-5 py-2.5 rounded-lg hover:shadow-[0_0_20px_rgba(0,212,168,0.3)] transition-all font-[family-name:var(--font-dm-sans)]"
        >
          + New Project
        </Link>
      </div>

      <div className="bg-[#091421] border border-[#1C2330] rounded-xl overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-[#1C2330]">
              {["Title", "Category", "Featured", "Status", "Actions"].map((h) => (
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
            {projects.map((project) => (
              <tr key={project.id} className="border-b border-[#1C2330]/40 hover:bg-[#16202e] transition-colors">
                <td className="px-6 py-4">
                  <div className="font-[family-name:var(--font-dm-sans)] text-[14px] font-semibold text-[#d9e3f7]">
                    {project.title}
                  </div>
                  <div className="font-[family-name:var(--font-mono)] text-[12px] text-[#85948d]">
                    /{project.slug}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className="font-[family-name:var(--font-mono)] text-[11px] bg-[#45f1c3]/10 text-[#45f1c3] border border-[#45f1c3]/20 px-2 py-0.5 rounded uppercase">
                    {project.category}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span className={`font-[family-name:var(--font-mono)] text-[11px] ${project.featured ? "text-[#45f1c3]" : "text-[#85948d]"}`}>
                    {project.featured ? "★ Featured" : "—"}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span
                    className={`font-[family-name:var(--font-mono)] text-[11px] px-2 py-0.5 rounded uppercase ${
                      project.status === "published"
                        ? "bg-[#45f1c3]/10 text-[#45f1c3] border border-[#45f1c3]/20"
                        : "bg-[#85948d]/10 text-[#85948d] border border-[#85948d]/20"
                    }`}
                  >
                    {project.status}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <Link
                      href={`/admin/projects/${project.id}`}
                      className="font-[family-name:var(--font-dm-sans)] text-[13px] text-[#45f1c3] hover:underline"
                    >
                      Edit
                    </Link>
                    <Link
                      href={`/projects/${project.slug}`}
                      target="_blank"
                      className="font-[family-name:var(--font-dm-sans)] text-[13px] text-[#bacac2] hover:text-[#d9e3f7]"
                    >
                      View ↗
                    </Link>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
