/**
 * REST-based seeder — uses Supabase HTTPS API (no TCP/port 5432 needed).
 * Run with: npx tsx prisma/seed-rest.ts
 */
import { createClient } from "@supabase/supabase-js"
import { randomUUID } from "crypto"

const SUPABASE_URL = "https://klsfeoxnovpcsndgbtwr.supabase.co"
const SERVICE_ROLE_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imtsc2Zlb3hub3ZwY3NuZGdidHdyIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3OTI2MTE5OSwiZXhwIjoyMDk0ODM3MTk5fQ.fW7_ri7Xc4NTM78VhmXeVCYjf-wUnRzp2Jmu-x3MW3c"

const supabase = createClient(SUPABASE_URL, SERVICE_ROLE_KEY, {
  auth: { autoRefreshToken: false, persistSession: false },
})

const now = new Date().toISOString()

async function clearTables() {
  console.log("🗑️  Clearing existing data...")
  for (const table of ["ContactMessage", "GitHubRepo", "BlogPost", "Project", "Skill", "Experience"]) {
    const { error } = await supabase.from(table).delete().neq("id", "____never____")
    if (error) console.warn(`  Warning clearing ${table}:`, error.message)
  }
}

async function seedExperiences() {
  const data = [
    {
      id: randomUUID(),
      company: "JiBiFlow / BreakInvent LLC",
      role: "Software Engineer — Product & Architecture Track",
      roleType: "Full-time · Remote",
      location: "Remote (NC, USA)",
      startDate: new Date("2026-04-01").toISOString(),
      endDate: null,
      current: true,
      order: 1,
      description:
        "Contributing to the engineering and product architecture of a multi-tenant SaaS ecosystem powering Blendara, GloUp, Will&Trust, and OpenCounsel.",
      bullets: JSON.stringify([
        "Contributing to architectural decisions across the JiBiFlow/Blendara ecosystem",
        "Translating product vision into technical structure across multiple product verticals",
        "Fixed critical production payment bugs in the Hubtel integration, restoring transaction reliability",
        "Improved OTP authentication flows, strengthening security and reducing failed login rates",
        "Resolved business logic issues across leaderboard systems and booking workflows",
        "Implemented and refined Role-Based Access Control (RBAC) systems across the platform",
        "Conducting code reviews, design discussions, and trade-off analysis with the core engineering team",
        "Leveraging Claude AI and Claude Code for AI-assisted development, rapid prototyping, and architecture documentation",
        "Operating with strong engineering workflow discipline: Linear tickets, pull requests, Sentry observability, and structured QA",
      ]),
      techStack: JSON.stringify(["PHP", "Node.js", "PostgreSQL", "Docker", "Linear", "Sentry", "GitHub", "Claude AI", "Claude Code"]),
      createdAt: now,
    },
    {
      id: randomUUID(),
      company: "Virtutor Online Ghana",
      role: "Head of IT Department",
      roleType: "Full-time · Remote",
      location: "Accra, Osu (Remote)",
      startDate: new Date("2024-12-01").toISOString(),
      endDate: null,
      current: true,
      order: 2,
      description:
        "Leading all IT operations and full-stack engineering for Virtutor Online — a SaaS platform connecting students with tutors across Ghana for one-on-one and group lessons.",
      bullets: JSON.stringify([
        "Designed and built the full Virtutor Online platform (virtutoronline.com) from the ground up",
        "Implemented OAuth2 and OpenID Connect authentication flows, significantly strengthening platform security",
        "Developed and optimised REST APIs following Clean Architecture principles",
        "Led DevOps operations including Docker containerisation, CI/CD pipelines, GitHub Actions automation",
        "Built and maintained role-based dashboards for four distinct user types: Students, Tutors, Parents, and Administrators",
        "Integrated payment processing and refund management systems for lesson transactions",
        "Set up SMS and email notification systems for bookings, reminders, and platform updates",
        "Implemented Playwright for end-to-end testing, improving release confidence and reducing production regressions",
      ]),
      techStack: JSON.stringify([
        "PHP", "Laravel", "Node.js", "JavaScript", "MySQL", "Tailwind CSS",
        "Bootstrap", "Docker", "GitHub Actions", "OAuth2", "OpenID Connect", "Playwright", "REST APIs",
      ]),
      createdAt: now,
    },
    {
      id: randomUUID(),
      company: "Oric Network Limited",
      role: "Independent Software Engineer / Lead Developer",
      roleType: "Contract & Product Work",
      location: "Accra, Kwabenya (Hybrid)",
      startDate: new Date("2023-12-01").toISOString(),
      endDate: new Date("2024-12-01").toISOString(),
      current: false,
      order: 3,
      description:
        "Led development of multiple client-facing and internal software products under independent contract and product work.",
      bullets: JSON.stringify([
        "Built EduTrack ERP — a complete AI-powered school management system for Ghanaian schools",
        "Developed a three-engine AI fallback architecture (Claude API → Groq → Gemini Flash) for automated exam generation",
        "Built Church Connect — a full church administration platform",
        "Developed PayrollPro — an automated payroll and HR system",
        "Built Oric Admissions — a university admissions guidance platform",
        "Built Divine Word AI — an AI-powered platform for sermon content generation",
        "Designed and optimised PostgreSQL and MySQL schemas, improving query performance by 30%",
        "Applied proactive error handling frameworks that reduced platform downtime by 25%",
        "Handled client onboarding, data migration, server deployment, and post-launch support",
      ]),
      techStack: JSON.stringify([
        "PHP", "JavaScript", "MySQL", "PostgreSQL", "Node.js",
        "OpenAI API", "Claude API", "Groq", "Gemini", "Arkesel SMS", "Paystack", "Dompdf", "Bootstrap",
      ]),
      createdAt: now,
    },
    {
      id: randomUUID(),
      company: "Kingdom Dynasty Limited",
      role: "Full Stack Developer",
      roleType: "Full-time",
      location: "Accra",
      startDate: new Date("2021-11-01").toISOString(),
      endDate: new Date("2022-10-01").toISOString(),
      current: false,
      order: 4,
      description:
        "Full-stack web application development using Laravel, Node.js, and MySQL, delivering high-availability systems with RESTful APIs and payment integrations.",
      bullets: JSON.stringify([
        "Built end-to-end web applications using Laravel, Node.js, and MySQL",
        "Integrated RESTful APIs and payment systems, delivering seamless transactional user experiences",
        "Led backend module design, reducing bug rate significantly through improved code review and QA processes",
        "Delivered technical troubleshooting and performance improvements across production applications",
      ]),
      techStack: JSON.stringify(["Laravel", "Node.js", "MySQL", "JavaScript", "REST APIs", "PHP"]),
      createdAt: now,
    },
    {
      id: randomUUID(),
      company: "Hexagon Soft Limited",
      role: "Junior Software Developer",
      roleType: "Full-time · Hybrid",
      location: "Accra, Ashongman Estate",
      startDate: new Date("2018-11-01").toISOString(),
      endDate: new Date("2021-02-01").toISOString(),
      current: false,
      order: 5,
      description:
        "Early-career software development role involving software design, testing, debugging, and contribution to multiple team-based projects.",
      bullets: JSON.stringify([
        "Participated in software design, testing, and debugging across multiple team projects, reducing production defects by 30%",
        "Maintained code integrity following clean code standards across the team codebase",
        "Contributed to multiple team-based development projects across the full software development lifecycle",
      ]),
      techStack: JSON.stringify(["PHP", "JavaScript", "MySQL", "HTML", "CSS"]),
      createdAt: now,
    },
  ]

  const { error } = await supabase.from("Experience").insert(data)
  if (error) throw new Error(`Experience seed failed: ${error.message}`)
  console.log("✅ Experiences seeded (5)")
}

async function seedProjects() {
  const data = [
    {
      id: randomUUID(), slug: "virtutor-online",
      title: "Virtutor Online Platform",
      shortDesc: "A complete SaaS platform connecting students with tutors across Ghana — handling scheduling, payments, virtual classrooms, and full administrative oversight.",
      problem: "Traditional tutoring businesses struggle to manage bookings, payments, lesson delivery, tutor coordination, and parent visibility in one place.",
      solution: "Built a full multi-role SaaS platform covering the entire tutoring lifecycle — student and tutor onboarding, lesson scheduling, payment processing, virtual classroom integration, attendance tracking, tutor income calculations, refund management, and SMS/email notifications.",
      impact: "Fully automated the lesson booking and payment cycle. Tutor income reports and admin analytics provide complete operational visibility.",
      techStack: JSON.stringify(["PHP", "MySQL", "JavaScript", "Bootstrap", "Tailwind CSS", "Playwright", "GitHub Actions", "OAuth2", "OpenID Connect", "REST APIs", "Docker"]),
      category: "SaaS", featured: true, order: 1,
      imageUrl: "", screenshotUrls: JSON.stringify([]),
      githubUrl: "", liveUrl: "https://virtutoronline.com", status: "published",
      createdAt: now, updatedAt: now,
    },
    {
      id: randomUUID(), slug: "edutrack-erp",
      title: "EduTrack ERP — AI School Management System",
      shortDesc: "An AI-powered school ERP for Ghanaian schools — managing academics, fees, attendance, staff, and AI-driven exam generation from PDFs and images.",
      problem: "Most Ghanaian schools use manual processes or outdated systems for report cards, fee tracking, and parent communication. No affordable, locally-relevant system existed.",
      solution: "Built a comprehensive school ERP covering student information, attendance, fee management with Paystack payments, terminal report generation, an AI exam generator using a three-engine fallback (Claude → Groq → Gemini Flash), SMS parent portal via Arkesel.",
      impact: "The AI exam generator dramatically reduces time spent creating assessments. Automated fee tracking eliminated manual reconciliation for school bursars.",
      techStack: JSON.stringify(["PHP", "JavaScript", "MySQL", "Laravel", "Claude API", "Groq", "Gemini Flash", "Arkesel SMS", "Paystack", "Bootstrap"]),
      category: "EdTech", featured: true, order: 2,
      imageUrl: "", screenshotUrls: JSON.stringify([]),
      githubUrl: "", liveUrl: "https://edutrack.oricnetwork.com", status: "published",
      createdAt: now, updatedAt: now,
    },
    {
      id: randomUUID(), slug: "scout-ai-assistant",
      title: "Scout — Personal AI Productivity Assistant",
      shortDesc: "An intelligent AI assistant integrating Slack, Gmail, Google Calendar, Linear, and Sentry to deliver daily briefings and automate productivity workflows.",
      problem: "Managing engineering work across Slack, Linear, Gmail, calendar, and Sentry creates information overload. Too much time is spent context-switching.",
      solution: "Built Scout using FastAPI and Groq LLMs — integrating all major productivity services. Delivers an automated morning briefing in Slack covering emails, urgent Linear tickets, the day's calendar, and active Sentry alerts. Deployed on Hetzner with Docker.",
      impact: "Eliminated daily manual review of five separate tools. The morning briefing surfaces critical information in under 2 minutes.",
      techStack: JSON.stringify(["FastAPI", "Python", "Docker", "Groq", "Slack API", "Gmail API", "Google Calendar API", "Linear API", "Sentry API", "Hetzner"]),
      category: "AI", featured: true, order: 3,
      imageUrl: "", screenshotUrls: JSON.stringify([]),
      githubUrl: "", liveUrl: "", status: "published",
      createdAt: now, updatedAt: now,
    },
    {
      id: randomUUID(), slug: "jibiflow-blendara-ecosystem",
      title: "JiBiFlow / Blendara Multi-Tenant SaaS",
      shortDesc: "Contributing to the core SaaS ecosystem powering Blendara, GloUp, Will&Trust, and OpenCounsel — architecture, RBAC, payment reliability, and production engineering.",
      problem: "A shared multi-tenant SaaS foundation needs robust permissions, reliable payment flows, and clean engineering practices to support multiple product verticals.",
      solution: "Engineering contributions including RBAC implementation, fixing critical Hubtel payment integration bugs, improving OTP authentication flows, resolving booking and leaderboard logic errors.",
      impact: "Restored production payment reliability, reduced authentication failure rates, and maintained a healthy multi-product engineering codebase.",
      techStack: JSON.stringify(["PHP", "Node.js", "PostgreSQL", "Docker", "Linear", "Sentry", "GitHub", "Claude AI"]),
      category: "SaaS", featured: false, order: 4,
      imageUrl: "", screenshotUrls: JSON.stringify([]),
      githubUrl: "", liveUrl: "", status: "published",
      createdAt: now, updatedAt: now,
    },
    {
      id: randomUUID(), slug: "church-connect",
      title: "Church Connect — Church Management System",
      shortDesc: "A full church administration platform managing members, attendance, tithes and offerings, events, and communication for Ghanaian churches.",
      problem: "Churches across Ghana rely on spreadsheets and paper records, leading to lost data and inefficient administration.",
      solution: "Built a complete platform covering member database, attendance tracking, tithes and offerings management, event scheduling, SMS reminders, and reporting dashboards.",
      impact: "Centralised all church operations into one platform, giving leadership instant visibility into membership trends, financial health, and event attendance.",
      techStack: JSON.stringify(["PHP", "MySQL", "JavaScript", "Bootstrap", "Arkesel SMS API", "REST APIs"]),
      category: "Business Tools", featured: false, order: 5,
      imageUrl: "", screenshotUrls: JSON.stringify([]),
      githubUrl: "", liveUrl: "https://church.oricnetwork.com", status: "published",
      createdAt: now, updatedAt: now,
    },
    {
      id: randomUUID(), slug: "payrollpro",
      title: "PayrollPro — Payroll & HR Management System",
      shortDesc: "An automated payroll system handling salary computation, tax deductions, leave management, and professional PDF payslip generation for Ghanaian businesses.",
      problem: "Manual payroll processing in Ghanaian businesses is error-prone, time-consuming, and difficult to audit.",
      solution: "Built PayrollPro to automate the complete payroll cycle — employee management, salary computation with configurable deduction rules, PDF payslip generation using Dompdf, leave management, and payroll reports.",
      impact: "Eliminated manual payroll calculations and reduced processing time significantly. Generated professional payslips ready for employee distribution.",
      techStack: JSON.stringify(["PHP", "MySQL", "JavaScript", "Dompdf", "Bootstrap", "REST APIs"]),
      category: "Business Tools", featured: false, order: 6,
      imageUrl: "", screenshotUrls: JSON.stringify([]),
      githubUrl: "", liveUrl: "https://payrollpro.oricnetwork.com", status: "published",
      createdAt: now, updatedAt: now,
    },
    {
      id: randomUUID(), slug: "divine-word-ai",
      title: "Divine Word AI — Sermon & Devotional Generator",
      shortDesc: "An AI-powered platform helping pastors generate biblically-grounded sermon outlines, devotionals, Bible studies, and prayer points in multiple languages.",
      problem: "Preparing high-quality sermon content is time-intensive for church leaders managing pastoral duties, counselling, and administration simultaneously.",
      solution: "Built a platform using OpenAI API that generates complete sermon outlines with Scripture references, devotional writing, prayer points, and Bible study guides — supporting multilingual output.",
      impact: "Helps church leaders reduce sermon preparation time while maintaining biblical grounding and cultural relevance.",
      techStack: JSON.stringify(["PHP", "JavaScript", "MySQL", "Bootstrap", "OpenAI API", "REST APIs"]),
      category: "AI", featured: false, order: 7,
      imageUrl: "", screenshotUrls: JSON.stringify([]),
      githubUrl: "", liveUrl: "https://church.oricnetwork.com/sermon", status: "published",
      createdAt: now, updatedAt: now,
    },
    {
      id: randomUUID(), slug: "oric-admissions",
      title: "Oric Admissions — University Guidance Platform",
      shortDesc: "A platform helping Ghanaian students choose universities, check admission requirements, estimate fees, and understand cut-off point analysis.",
      problem: "Ghanaian students face confusion when applying to universities — unclear cut-off points, inconsistent fee information, and no centralised tool for comparing programmes.",
      solution: "Built a comprehensive admissions guidance platform featuring a programme qualification checker, cut-off point analysis tool, school fees estimator, and voucher purchasing functionality.",
      impact: "Simplifies one of the most stressful annual decisions for Ghanaian students and their families, providing data-driven clarity on university selection.",
      techStack: JSON.stringify(["PHP", "MySQL", "JavaScript", "Bootstrap", "REST APIs"]),
      category: "EdTech", featured: false, order: 8,
      imageUrl: "", screenshotUrls: JSON.stringify([]),
      githubUrl: "", liveUrl: "https://admissions.oricnetwork.com", status: "published",
      createdAt: now, updatedAt: now,
    },
    {
      id: randomUUID(), slug: "skyexpense",
      title: "SkyExpense — Personal Finance & Expense Manager",
      shortDesc: "A budgeting and financial planning platform that tracks expenses, debts, savings goals, and investments to help individuals gain control over their finances.",
      problem: "Most individuals in Ghana have no structured way to track spending, manage debt, or plan savings goals.",
      solution: "Built SkyExpense with expense categorisation, debt tracking, savings goal progress, and investment monitoring — all in one locally-relevant platform.",
      impact: "Helps users understand exactly where money goes and plan meaningfully toward financial goals.",
      techStack: JSON.stringify(["PHP", "MySQL", "JavaScript", "Bootstrap", "REST APIs"]),
      category: "Business Tools", featured: false, order: 9,
      imageUrl: "", screenshotUrls: JSON.stringify([]),
      githubUrl: "", liveUrl: "", status: "published",
      createdAt: now, updatedAt: now,
    },
    {
      id: randomUUID(), slug: "agro-chemical-pos",
      title: "Agro-Chemical Shop POS & Inventory System",
      shortDesc: "A complete retail ERP and point-of-sale system for agro-chemical shops — managing stock, sales, expiry dates, and profitability.",
      problem: "Agro-chemical shop owners manage complex inventory with expiry dates, variable pricing, and high-volume daily transactions — all manually.",
      solution: "Built a full POS and inventory management system covering stock tracking, expiry date monitoring, sales recording, profit calculations, and comprehensive reporting.",
      impact: "Eliminated untracked sales and reduced stock losses from expired products through automated expiry date alerts.",
      techStack: JSON.stringify(["PHP", "MySQL", "JavaScript", "Bootstrap", "REST APIs"]),
      category: "Business Tools", featured: false, order: 10,
      imageUrl: "", screenshotUrls: JSON.stringify([]),
      githubUrl: "", liveUrl: "", status: "published",
      createdAt: now, updatedAt: now,
    },
    {
      id: randomUUID(), slug: "wiseway-construction-website",
      title: "Wiseway Construction Works — Website & Workflow Automation",
      shortDesc: "Built the company website and internal automation systems for Wiseway Construction Works LTD, establishing their online presence and operational efficiency.",
      problem: "Wiseway Construction Works had no online presence and relied on manual internal processes for bookings, client management, and content.",
      solution: "Designed and built a professional corporate website showcasing services and company portfolio. Built internal workflow automation tools including a booking system and content management.",
      impact: "Established a credible online presence and automated key operational workflows, reducing manual administrative overhead.",
      techStack: JSON.stringify(["WordPress", "PHP", "JavaScript", "MySQL", "CSS"]),
      category: "Business Tools", featured: false, order: 11,
      imageUrl: "", screenshotUrls: JSON.stringify([]),
      githubUrl: "", liveUrl: "", status: "published",
      createdAt: now, updatedAt: now,
    },
  ]

  const { error } = await supabase.from("Project").insert(data)
  if (error) throw new Error(`Project seed failed: ${error.message}`)
  console.log("✅ Projects seeded (11)")
}

async function seedSkills() {
  const skillData = [
    { name: "React", category: "Frontend", level: 88, order: 1 },
    { name: "Next.js", category: "Frontend", level: 85, order: 2 },
    { name: "TypeScript", category: "Frontend", level: 78, order: 3 },
    { name: "JavaScript (ES2022+)", category: "Frontend", level: 92, order: 4 },
    { name: "Tailwind CSS", category: "Frontend", level: 90, order: 5 },
    { name: "HTML5 & CSS3", category: "Frontend", level: 93, order: 6 },
    { name: "Node.js", category: "Backend", level: 88, order: 1 },
    { name: "Express.js", category: "Backend", level: 87, order: 2 },
    { name: "PHP", category: "Backend", level: 90, order: 3 },
    { name: "Laravel", category: "Backend", level: 88, order: 4 },
    { name: "Python", category: "Backend", level: 72, order: 5 },
    { name: "FastAPI", category: "Backend", level: 70, order: 6 },
    { name: "REST API Design", category: "Backend", level: 92, order: 7 },
    { name: "Clean Architecture", category: "Backend", level: 82, order: 8 },
    { name: "PostgreSQL", category: "Databases", level: 85, order: 1 },
    { name: "MySQL", category: "Databases", level: 90, order: 2 },
    { name: "SQL Server", category: "Databases", level: 72, order: 3 },
    { name: "Redis", category: "Databases", level: 65, order: 4 },
    { name: "Schema Design", category: "Databases", level: 87, order: 5 },
    { name: "Query Optimisation", category: "Databases", level: 83, order: 6 },
    { name: "Docker", category: "DevOps", level: 82, order: 1 },
    { name: "Docker Compose", category: "DevOps", level: 80, order: 2 },
    { name: "GitHub Actions / CI/CD", category: "DevOps", level: 78, order: 3 },
    { name: "Nginx", category: "DevOps", level: 75, order: 4 },
    { name: "Ubuntu Server", category: "DevOps", level: 78, order: 5 },
    { name: "AWS", category: "DevOps", level: 65, order: 6 },
    { name: "Vercel", category: "DevOps", level: 80, order: 7 },
    { name: "Cloudflare Tunnel", category: "DevOps", level: 70, order: 8 },
    { name: "Claude AI / Claude Code", category: "AI & Tooling", level: 90, order: 1 },
    { name: "Groq API", category: "AI & Tooling", level: 85, order: 2 },
    { name: "OpenAI API", category: "AI & Tooling", level: 83, order: 3 },
    { name: "Gemini API", category: "AI & Tooling", level: 75, order: 4 },
    { name: "LLM Integration", category: "AI & Tooling", level: 85, order: 5 },
    { name: "Multi-model Fallback Architecture", category: "AI & Tooling", level: 82, order: 6 },
    { name: "AI Workflow Automation", category: "AI & Tooling", level: 80, order: 7 },
    { name: "Git & GitHub", category: "Practices", level: 90, order: 1 },
    { name: "Agile / Scrum", category: "Practices", level: 82, order: 2 },
    { name: "Linear (Project Management)", category: "Practices", level: 85, order: 3 },
    { name: "Playwright (E2E Testing)", category: "Practices", level: 72, order: 4 },
    { name: "Postman", category: "Practices", level: 88, order: 5 },
    { name: "Sentry (Observability)", category: "Practices", level: 75, order: 6 },
    { name: "Code Reviews", category: "Practices", level: 85, order: 7 },
    { name: "System Architecture", category: "Practices", level: 80, order: 8 },
    { name: "OAuth2", category: "Security", level: 83, order: 1 },
    { name: "OpenID Connect", category: "Security", level: 80, order: 2 },
    { name: "Role-Based Access Control (RBAC)", category: "Security", level: 87, order: 3 },
    { name: "Identity & Access Management", category: "Security", level: 78, order: 4 },
  ]

  const rows = skillData.map((s) => ({ id: randomUUID(), ...s, createdAt: now }))
  const { error } = await supabase.from("Skill").insert(rows)
  if (error) throw new Error(`Skill seed failed: ${error.message}`)
  console.log(`✅ Skills seeded (${rows.length})`)
}

async function main() {
  console.log("🌱 Starting REST-based seed...")
  await clearTables()
  await seedExperiences()
  await seedProjects()
  await seedSkills()
  console.log("🎉 Seed complete!")
}

main().catch((e) => {
  console.error("❌ Seed failed:", e.message)
  process.exit(1)
})
