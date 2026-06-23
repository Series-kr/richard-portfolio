"use client"

import { useState } from "react"
import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation"
import { Box, Card, TextField, Button, Alert } from "@mui/material"
import { brand } from "@/lib/theme"

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
    const result = await signIn("credentials", { email, password, redirect: false })
    setLoading(false)
    if (result?.error) {
      setError("Invalid credentials. Please try again.")
    } else {
      router.push("/admin")
      router.refresh()
    }
  }

  return (
    <Box className="grid-bg" sx={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", p: 2 }}>
      <Box sx={{ width: "100%", maxWidth: 400 }}>
        <Box sx={{ textAlign: "center", mb: 4 }}>
          <div style={{ fontFamily: "var(--font-display)", fontSize: 48, fontWeight: 700, color: brand.primary, letterSpacing: "-0.05em", marginBottom: 8 }}>
            RK
          </div>
          <p style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: brand.textSecondary, textTransform: "uppercase", letterSpacing: "0.15em" }}>
            Operations Console
          </p>
        </Box>

        <Card sx={{ p: 4 }}>
          {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
          <Box component="form" onSubmit={handleSubmit} sx={{ display: "flex", flexDirection: "column", gap: 2.5 }}>
            <TextField label="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} autoComplete="username" fullWidth required />
            <TextField label="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} autoComplete="current-password" fullWidth required />
            <Button type="submit" variant="contained" size="large" disabled={loading}>
              {loading ? "Signing in…" : "Sign In"}
            </Button>
          </Box>
        </Card>
      </Box>
    </Box>
  )
}
