"use client"

import { useState, useEffect } from "react"

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
  const [repos, setRepos] = useState<Repo[]>([])
  const [syncing, setSyncing] = useState(false)
  const [syncResult, setSyncResult] = useState<{ synced: number; total: number } | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch("/api/github/repos")
      .then((r) => r.json())
      .then((data) => {
        if (Array.isArray(data)) setRepos(data)
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [])

  const handleSync = async () => {
    setSyncing(true)
    setSyncResult(null)
    try {
      const res = await fetch("/api/github/sync", { method: "POST" })
      const result = await res.json()
      setSyncResult(result)
      // Refresh list
      const reposRes = await fetch("/api/github/repos")
      const reposData = await reposRes.json()
      if (Array.isArray(reposData)) setRepos(reposData)
    } catch {
      alert("Sync failed")
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
      // Revert optimistic update on failure
      setRepos((prev) => prev.map((r) => (r.id === id ? { ...r, [field]: !value } : r)))
    }
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-[family-name:var(--font-syne)] text-[32px] font-bold text-[#d9e3f7]">
            GitHub Sync
          </h1>
          <p className="font-[family-name:var(--font-dm-sans)] text-[14px] text-[#bacac2] mt-1">
            Manage which repositories show on your portfolio
          </p>
        </div>
        <button
          type="button"
          onClick={handleSync}
          disabled={syncing}
          className="bg-[#00d4a8] text-[#00382a] font-bold px-5 py-2.5 rounded-lg hover:shadow-[0_0_20px_rgba(0,212,168,0.3)] transition-all font-[family-name:var(--font-dm-sans)] disabled:opacity-50"
        >
          {syncing ? "Syncing..." : "⌘ Sync from GitHub"}
        </button>
      </div>

      {syncResult && (
        <div className="bg-[#45f1c3]/10 border border-[#45f1c3]/20 rounded-lg px-4 py-3 mb-6">
          <p className="font-[family-name:var(--font-dm-sans)] text-[14px] text-[#45f1c3]">
            ✓ Synced {syncResult.synced} of {syncResult.total} repos
          </p>
        </div>
      )}

      {loading ? (
        <p className="text-[#bacac2] font-[family-name:var(--font-dm-sans)]">Loading repos...</p>
      ) : repos.length === 0 ? (
        <div className="text-center py-16 bg-[#091421] border border-[#1C2330] rounded-xl">
          <div className="text-5xl mb-4">⌘</div>
          <p className="font-[family-name:var(--font-dm-sans)] text-[16px] text-[#bacac2] mb-4">
            No repos synced yet. Click &ldquo;Sync from GitHub&rdquo; to get started.
          </p>
        </div>
      ) : (
        <div className="bg-[#091421] border border-[#1C2330] rounded-xl overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[#1C2330]">
                {["Repository", "Language", "Stars", "Show on Site", "Pinned"].map((h) => (
                  <th key={h} className="text-left px-6 py-4 font-[family-name:var(--font-mono)] text-[11px] text-[#bacac2] uppercase tracking-widest">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {repos.map((repo) => (
                <tr key={repo.id} className="border-b border-[#1C2330]/40 hover:bg-[#16202e] transition-colors">
                  <td className="px-6 py-4">
                    <a href={repo.url} target="_blank" rel="noopener noreferrer" className="font-[family-name:var(--font-dm-sans)] text-[14px] font-semibold text-[#d9e3f7] hover:text-[#45f1c3] transition-colors">
                      {repo.name}
                    </a>
                    {repo.description && (
                      <p className="font-[family-name:var(--font-dm-sans)] text-[12px] text-[#85948d] mt-0.5 line-clamp-1">{repo.description}</p>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <span className="font-[family-name:var(--font-mono)] text-[13px] text-[#bacac2]">{repo.language ?? "—"}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="font-[family-name:var(--font-mono)] text-[13px] text-[#bacac2]">⭐ {repo.stars}</span>
                  </td>
                  <td className="px-6 py-4">
                    <label className="relative inline-flex items-center cursor-pointer" aria-label={`Show ${repo.name} on site`}>
                      <input
                        type="checkbox"
                        checked={repo.showOnSite}
                        onChange={(e) => toggleRepo(repo.id, "showOnSite", e.target.checked)}
                        className="sr-only peer"
                        aria-label={`Show ${repo.name} on site`}
                      />
                      <div className="w-10 h-5 bg-[#2b3544] peer-focus:outline-none rounded-full peer peer-checked:bg-[#00d4a8] after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:after:translate-x-5" />
                    </label>
                  </td>
                  <td className="px-6 py-4">
                    <label className="relative inline-flex items-center cursor-pointer" aria-label={`Pin ${repo.name}`}>
                      <input
                        type="checkbox"
                        checked={repo.pinned}
                        onChange={(e) => toggleRepo(repo.id, "pinned", e.target.checked)}
                        className="sr-only peer"
                        aria-label={`Pin ${repo.name}`}
                      />
                      <div className="w-10 h-5 bg-[#2b3544] peer-focus:outline-none rounded-full peer peer-checked:bg-[#45f1c3] after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:after:translate-x-5" />
                    </label>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
