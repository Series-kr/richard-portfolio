"use client"

import { useState } from "react"
import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation"

export default function AdminLoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    })

    setLoading(false)

    if (result?.error) {
      setError("Invalid credentials. Please try again.")
    } else {
      router.push("/admin")
      router.refresh()
    }
  }

  const inputClass =
    "w-full bg-[#16202e] border border-[#1C2330] rounded-lg px-4 py-3 text-[#d9e3f7] font-[family-name:var(--font-dm-sans)] text-[16px] focus:outline-none focus:border-[#45f1c3] focus:ring-1 focus:ring-[#45f1c3]/20 transition-colors"

  return (
    <div className="min-h-screen bg-[#080B10] flex items-center justify-center px-4 dot-grid">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="font-[family-name:var(--font-syne)] text-5xl font-bold text-[#45f1c3] tracking-tighter mb-2">
            RK
          </div>
          <p className="font-[family-name:var(--font-mono)] text-[11px] text-[#bacac2] uppercase tracking-widest">
            Admin Login
          </p>
        </div>

        <div className="bg-[#091421] border border-[#1C2330] rounded-xl p-8">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="font-[family-name:var(--font-mono)] text-[10px] font-semibold text-[#bacac2] uppercase tracking-widest block mb-2">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={inputClass}
                placeholder="admin@example.com"
                required
              />
            </div>

            <div>
              <label className="font-[family-name:var(--font-mono)] text-[10px] font-semibold text-[#bacac2] uppercase tracking-widest block mb-2">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={inputClass}
                placeholder="••••••••"
                required
              />
            </div>

            {error && (
              <p className="text-[#ffb4ab] font-[family-name:var(--font-dm-sans)] text-[14px]">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#00d4a8] text-[#00382a] font-bold py-3 rounded-lg transition-all hover:shadow-[0_0_20px_rgba(0,212,168,0.3)] active:scale-[0.98] disabled:opacity-50 font-[family-name:var(--font-dm-sans)] text-[16px]"
            >
              {loading ? "Signing in..." : "Sign In"}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
