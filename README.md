# Richard Korankye — Developer Portfolio

> Production-grade portfolio platform and CMS — built as a full-stack engineering work sample.

**Live:** [richard-portfolio-henna.vercel.app](https://richard-portfolio-henna.vercel.app)
**Stack:** Next.js 16 · TypeScript · Ant Design v6 · PostgreSQL · Prisma · Groq LLM

---

## What this is

This is not a template. It is a complete, working full-stack system: a public portfolio backed by an
authenticated admin CMS, AI-assisted blog drafting, automated GitHub synchronisation, and a full SEO
surface — all deployed on EU infrastructure for GDPR alignment.

It exists to serve as its own work sample. The same engineering discipline that goes into a production
SaaS platform — typed end-to-end, server-validated, theme-tokenised — went into the site you are reading
the source of.

## Architecture

The App Router is split into two route groups:

- **`(public)`** — server-rendered marketing/portfolio surface (home, projects, case studies, blog, about, contact).
- **`(admin)`** — an authenticated "Operations Console" with full CRUD over every content type, guarded by
  NextAuth middleware and server-side session checks.

Data lives in PostgreSQL (Supabase, **eu-west-1**) accessed through Prisma. The UI is built entirely on
Ant Design v6 with a custom **"Precision Engineering"** dark theme applied globally via a single
`ConfigProvider` token set — no hardcoded colours outside the theme.

## Features

### Public Site
- Hero with animated "systems pulse" stat counters (Ant Design `Statistic` + CountUp on scroll)
- Filterable project case studies (Problem · Solution · Impact) with JSON-LD `Article` schema
- AI-assisted technical blog with Markdown rendering and a reading-progress bar
- Skills matrix, interactive experience timeline, live GitHub activity
- Contact form with Zod-mirrored validation → Resend email + DB persistence

### Admin Dashboard
- Collapsible Ant Design `Layout`/`Sider` shell with unread-message badge
- Ant Design `Table` views with row actions, filters, and `Popconfirm` delete for all entities
- Ant Design `Form` create/edit flows for projects and blog posts
- GitHub curation with `Switch` toggles for visibility and pinning
- Statistic-card dashboard overview

### AI & Integrations
- **Groq LLM** blog drafting with topic/keyword/audience/tone/length controls, returning structured SEO metadata
- **Octokit** GitHub sync (REST + GraphQL)
- **Resend** transactional email
- Dynamic sitemap, RSS feed, `@vercel/og` OG images, JSON-LD structured data

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 16 (App Router, RSC) |
| Language | TypeScript (strict) |
| UI Library | Ant Design v6 (custom dark theme) |
| Animation | Framer Motion |
| Database | PostgreSQL via Supabase (eu-west-1) |
| ORM | Prisma |
| Auth | NextAuth v5 |
| AI | Groq LLM (blog generation) |
| GitHub Sync | Octokit (REST + GraphQL) |
| Email | Resend |
| Validation | Zod |
| Deployment | Vercel (serverless + edge) |

## Local Development

### Prerequisites
- Node.js 20+
- PostgreSQL database (Supabase recommended)
- Accounts/keys for: Groq, Resend, GitHub token

### Installation

```bash
git clone https://github.com/Series-kr/richard-portfolio
cd richard-portfolio
npm install
cp .env.local.example .env.local   # fill in values
npx prisma migrate deploy
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). The admin console lives at `/admin/login`.

## Deployment

1. Push to GitHub — Vercel auto-deploys `master`.
2. Add all environment variables (below) in the Vercel dashboard.
3. **Database:** create the Supabase project in **eu-west-1**; use the Supavisor pooler URL
   (port 6543, transaction mode) as `DATABASE_URL` and the direct connection as `DIRECT_URL` (migrations only).

### Environment variables

```
DATABASE_URL=          # Supavisor pooler (port 6543, transaction mode)
DIRECT_URL=            # Direct connection (migrations only)
NEXTAUTH_URL=
NEXTAUTH_SECRET=
ADMIN_EMAIL=
ADMIN_PASSWORD_HASH=   # bcrypt hash (12 rounds)
GROQ_API_KEY=
GITHUB_TOKEN=
GITHUB_USERNAME=
RESEND_API_KEY=
CONTACT_EMAIL=
NEXT_PUBLIC_SITE_URL=
```

## Project Structure

```
app/
  (public)/        # Public portfolio routes
  admin/           # Authenticated console (login + dashboard group)
  api/             # Route handlers (contact, blog, projects, github, ai)
components/
  layout/          # Navbar, Footer
  sections/        # Home page sections
  projects/ blog/  # Cards & renderers
  admin/           # AdminShell, tables, forms (AntD)
  shared/          # SectionHeader, TechBadge, AnimatedSection
lib/               # prisma, auth, groq, github, resend, theme, validations
prisma/            # schema + seed
```

## Security

- All admin routes protected by NextAuth middleware + server-side session checks
- Every mutating API route validates session and input with Zod before DB writes
- AI generation endpoint is auth-gated to prevent API-key abuse
- Passwords hashed with bcrypt (12 rounds); secrets only in environment variables
- Content-Security-Policy and hardening headers set in `next.config.ts`

## License

MIT
