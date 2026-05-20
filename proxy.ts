export { auth as proxy } from "@/auth"

export const config = {
  matcher: [
    "/admin",
    "/admin/blog",
    "/admin/blog/:path*",
    "/admin/projects",
    "/admin/projects/:path*",
    "/admin/skills",
    "/admin/experience",
    "/admin/github",
  ],
}
