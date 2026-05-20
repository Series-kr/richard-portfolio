import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import bcrypt from "bcryptjs"

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    Credentials({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null
        if (String(credentials.email) !== process.env.ADMIN_EMAIL) return null

        const passwordHash = process.env.ADMIN_PASSWORD_HASH
        if (!passwordHash) return null

        const isValid = await bcrypt.compare(String(credentials.password), passwordHash)
        if (!isValid) return null

        return { id: "admin", email: String(credentials.email), role: "admin" }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) token.role = (user as { role?: string }).role
      return token
    },
    async session({ session, token }) {
      if (session.user) {
        ;(session.user as { role?: string }).role = token.role as string
      }
      return session
    },
    authorized({ auth, request }) {
      const isAdminRoute = request.nextUrl.pathname.startsWith("/admin")
      if (isAdminRoute) {
        const isLoginPage = request.nextUrl.pathname === "/admin/login"
        if (isLoginPage) return true
        return !!auth?.user
      }
      return true
    },
  },
  pages: {
    signIn: "/admin/login",
  },
  session: { strategy: "jwt" },
})
