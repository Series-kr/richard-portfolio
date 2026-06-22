import Link from "next/link"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faRss, faEnvelope, faLocationDot } from "@fortawesome/free-solid-svg-icons"
import { faGithub, faLinkedin, faXTwitter } from "@fortawesome/free-brands-svg-icons"
import { brand } from "@/lib/theme"

const socialLinks = [
  { label: "GitHub", href: "https://github.com/Series-kr", icon: faGithub },
  { label: "LinkedIn", href: "https://linkedin.com/in/richardkorankye", icon: faLinkedin },
  { label: "Twitter / X", href: "https://twitter.com/richardkorankye", icon: faXTwitter },
]

const navItems = [
  { href: "/#projects", label: "Projects" },
  { href: "/#experience", label: "Experience" },
  { href: "/#stack", label: "Tech Stack" },
  { href: "/blog", label: "Blog" },
  { href: "/about", label: "About" },
  { href: "/#contact", label: "Contact" },
]

const heading: React.CSSProperties = {
  fontFamily: "var(--font-mono)",
  fontSize: 11,
  fontWeight: 600,
  color: brand.textSecondary,
  textTransform: "uppercase",
  letterSpacing: "0.15em",
  marginBottom: 16,
}

const linkStyle: React.CSSProperties = { fontSize: 14, color: brand.textSecondary, width: "fit-content" }

export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer style={{ background: "#0B1120", borderTop: `1px solid ${brand.borderSubtle}`, padding: "56px 24px" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: 40,
            marginBottom: 40,
          }}
        >
          <div>
            <Link
              href="/"
              style={{ fontFamily: "var(--font-display)", fontSize: 28, fontWeight: 700, color: brand.primary, display: "inline-block", marginBottom: 12 }}
            >
              RK
            </Link>
            <p style={{ fontSize: 14, color: brand.textSecondary, lineHeight: 1.7, marginBottom: 16, maxWidth: 320 }}>
              Senior Full-Stack Engineer building SaaS platforms, ERP systems, and AI-integrated applications.
            </p>
            <div style={{ display: "flex", alignItems: "center", gap: 6, color: brand.textMuted, fontSize: 13, marginBottom: 6 }}>
              <FontAwesomeIcon icon={faLocationDot} style={{ color: brand.primary }} />
              <span>Accra, Ghana</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 6, color: brand.textMuted, fontSize: 13 }}>
              <FontAwesomeIcon icon={faEnvelope} style={{ color: brand.primary }} />
              <a href="mailto:richardkorankye07@gmail.com">richardkorankye07@gmail.com</a>
            </div>
          </div>

          <div>
            <h3 style={heading}>Navigation</h3>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {navItems.map((link) => (
                <Link key={link.href} href={link.href} style={linkStyle}>
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h3 style={heading}>Connect</h3>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {socialLinks.map((link) => (
                <a key={link.label} href={link.href} target="_blank" rel="noopener noreferrer" style={{ ...linkStyle, display: "inline-flex", alignItems: "center", gap: 10 }}>
                  <FontAwesomeIcon icon={link.icon} style={{ color: brand.textMuted }} />
                  {link.label}
                </a>
              ))}
              <a href="/feed.xml" style={{ display: "inline-flex", alignItems: "center", gap: 10, fontFamily: "var(--font-mono)", fontSize: 12, color: brand.textMuted, marginTop: 4 }}>
                <FontAwesomeIcon icon={faRss} />
                RSS Feed
              </a>
            </div>
          </div>
        </div>

        <div
          style={{
            borderTop: `1px solid ${brand.borderSubtle}`,
            paddingTop: 24,
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-between",
            alignItems: "center",
            gap: 12,
          }}
        >
          <p style={{ fontSize: 13, color: brand.textMuted, margin: 0 }}>
            © {year} Richard Korankye. Built with Next.js, TypeScript & Ant Design.
          </p>
          <p style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: brand.textMuted, textTransform: "uppercase", letterSpacing: "0.15em", margin: 0 }}>
            Accra, Ghana · Open to remote
          </p>
        </div>
      </div>
    </footer>
  )
}
