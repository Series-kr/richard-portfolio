import Link from "next/link"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faRss, faEnvelope, faLocationDot } from "@fortawesome/free-solid-svg-icons"
import { faGithub, faLinkedin, faXTwitter } from "@fortawesome/free-brands-svg-icons"

const socialLinks = [
  { label: "GitHub", href: "https://github.com/Series-kr", icon: faGithub },
  { label: "LinkedIn", href: "https://linkedin.com/in/richardkorankye", icon: faLinkedin },
  { label: "Twitter / X", href: "https://twitter.com/richardkorankye", icon: faXTwitter },
]

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-[#091421] w-full py-14 border-t border-[#1C2330]/60">
      <div className="max-w-[1200px] mx-auto px-6 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-10">
          {/* Brand */}
          <div>
            <Link
              href="/"
              className="font-[family-name:var(--font-syne)] text-3xl font-bold text-[#45f1c3] tracking-tighter hover:opacity-80 transition-opacity inline-block mb-3"
            >
              RK
            </Link>
            <p className="font-[family-name:var(--font-dm-sans)] text-[14px] text-[#bacac2] leading-relaxed mb-4">
              Senior Full Stack Engineer building SaaS platforms, ERP systems, and AI-integrated applications.
            </p>
            <div className="flex items-center gap-1.5 text-[#85948d] text-[13px] font-[family-name:var(--font-dm-sans)]">
              <FontAwesomeIcon icon={faLocationDot} className="w-3 h-3 text-[#45f1c3]" />
              <span>Accra, Ghana</span>
            </div>
            <div className="flex items-center gap-1.5 text-[#85948d] text-[13px] font-[family-name:var(--font-dm-sans)] mt-1.5">
              <FontAwesomeIcon icon={faEnvelope} className="w-3 h-3 text-[#45f1c3]" />
              <a href="mailto:richardkorankye07@gmail.com" className="hover:text-[#45f1c3] transition-colors">
                richardkorankye07@gmail.com
              </a>
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h3 className="font-[family-name:var(--font-mono)] text-[11px] font-semibold text-[#bacac2] uppercase tracking-widest mb-4">
              Navigation
            </h3>
            <div className="flex flex-col gap-2.5">
              {[
                { href: "/#projects", label: "Projects" },
                { href: "/#experience", label: "Experience" },
                { href: "/#stack", label: "Tech Stack" },
                { href: "/blog", label: "Blog" },
                { href: "/about", label: "About" },
                { href: "/#contact", label: "Contact" },
              ].map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="font-[family-name:var(--font-dm-sans)] text-[14px] text-[#bacac2] hover:text-[#45f1c3] transition-colors w-fit"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Social & Connect */}
          <div>
            <h3 className="font-[family-name:var(--font-mono)] text-[11px] font-semibold text-[#bacac2] uppercase tracking-widest mb-4">
              Connect
            </h3>
            <div className="flex flex-col gap-3">
              {socialLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2.5 font-[family-name:var(--font-dm-sans)] text-[14px] text-[#bacac2] hover:text-[#45f1c3] transition-colors group w-fit"
                >
                  <FontAwesomeIcon icon={link.icon} className="w-4 h-4 text-[#85948d] group-hover:text-[#45f1c3] transition-colors" />
                  {link.label}
                </a>
              ))}
              <a
                href="/feed.xml"
                className="inline-flex items-center gap-2.5 font-[family-name:var(--font-mono)] text-[12px] text-[#85948d] hover:text-[#45f1c3] transition-colors group w-fit mt-1"
              >
                <FontAwesomeIcon icon={faRss} className="w-3.5 h-3.5 group-hover:text-[#45f1c3] transition-colors" />
                RSS Feed
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-[#1C2330]/60 pt-6 flex flex-col md:flex-row justify-between items-center gap-3">
          <p className="font-[family-name:var(--font-dm-sans)] text-[13px] text-[#85948d]">
            © {currentYear} Richard Korankye. Built with Next.js, TypeScript, and precision.
          </p>
          <p className="font-[family-name:var(--font-mono)] text-[11px] text-[#85948d] uppercase tracking-widest">
            Accra, Ghana · Open to remote
          </p>
        </div>
      </div>
    </footer>
  )
}
