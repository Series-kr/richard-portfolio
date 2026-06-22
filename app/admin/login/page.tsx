"use client"

import { useState } from "react"
import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation"
import { Card, Form, Input, Button, Alert } from "antd"
import { brand } from "@/lib/theme"

interface LoginValues {
  email: string
  password: string
}

export default function AdminLoginPage() {
  const router = useRouter()
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const onFinish = async (values: LoginValues) => {
    setLoading(true)
    setError("")
    const result = await signIn("credentials", { ...values, redirect: false })
    setLoading(false)
    if (result?.error) {
      setError("Invalid credentials. Please try again.")
    } else {
      router.push("/admin")
      router.refresh()
    }
  }

  return (
    <div className="grid-bg" style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", padding: 16 }}>
      <div style={{ width: "100%", maxWidth: 400 }}>
        <div style={{ textAlign: "center", marginBottom: 32 }}>
          <div style={{ fontFamily: "var(--font-display)", fontSize: 48, fontWeight: 700, color: brand.primary, letterSpacing: "-0.05em", marginBottom: 8 }}>
            RK
          </div>
          <p style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: brand.textSecondary, textTransform: "uppercase", letterSpacing: "0.15em" }}>
            Operations Console
          </p>
        </div>

        <Card variant="outlined" style={{ borderColor: brand.border }} styles={{ body: { padding: 32 } }}>
          {error && <Alert type="error" message={error} showIcon style={{ marginBottom: 16 }} />}
          <Form layout="vertical" requiredMark={false} onFinish={onFinish}>
            <Form.Item name="email" label="Email" rules={[{ required: true, type: "email", message: "Enter a valid email" }]}>
              <Input size="large" placeholder="admin@example.com" autoComplete="username" />
            </Form.Item>
            <Form.Item name="password" label="Password" rules={[{ required: true, message: "Password is required" }]}>
              <Input.Password size="large" placeholder="••••••••" autoComplete="current-password" />
            </Form.Item>
            <Button type="primary" size="large" htmlType="submit" loading={loading} block>
              Sign In
            </Button>
          </Form>
        </Card>
      </div>
    </div>
  )
}
