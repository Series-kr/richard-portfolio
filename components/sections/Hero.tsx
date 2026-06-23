"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { Button } from "@mui/material"
import ArrowForwardIcon from "@mui/icons-material/ArrowForward"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faBriefcase, faChevronDown } from "@fortawesome/free-solid-svg-icons"
import { faGithub, faLinkedin } from "@fortawesome/free-brands-svg-icons"
import { brand } from "@/lib/theme"

const socials = [
  { href: "https://github.com/Series-kr", icon: faGithub, label: "GitHub" },
  { href: "https://linkedin.com/in/richardkorankye", icon: faLinkedin, label: "LinkedIn" },
]

export function Hero() {
  return (
    <section
      style={{
        position: "relative",
        minHeight: 880,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        padding: "0 24px",
      }}
    >
      <div className="grid-bg" style={{ position: "absolute", inset: 0, pointerEvents: "none" }} />
      <div
        style={{
          position: "absolute",
          top: "42%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 620,
          height: 620,
          background: "rgba(79, 70, 229, 0.10)",
          borderRadius: "50%",
          filter: "blur(130px)",
          pointerEvents: "none",
        }}
      />

      <div style={{ position: "relative", zIndex: 10, maxWidth: 880 }}>
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            background: brand.bgContainer,
            border: `1px solid ${brand.border}`,
            padding: "6px 16px",
            borderRadius: 999,
            marginBottom: 32,
          }}
        >
          <span
            className="pulse-dot"
            style={{ width: 8, height: 8, borderRadius: "50%", background: brand.success }}
          />
          <span
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 11,
              fontWeight: 600,
              color: brand.textSecondary,
              textTransform: "uppercase",
              letterSpacing: "0.1em",
            }}
          >
            Open to opportunities
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(44px, 8vw, 72px)",
            fontWeight: 700,
            color: brand.text,
            margin: "0 0 16px",
            lineHeight: 1.1,
            letterSpacing: "-0.03em",
          }}
        >
          I build systems that <span style={{ color: brand.primary }}>scale.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          style={{
            fontSize: 18,
            color: brand.textSecondary,
            margin: "0 auto 24px",
            maxWidth: 640,
            lineHeight: 1.7,
          }}
        >
          Senior Full-Stack Engineer & Systems Architect. 7+ years designing and shipping
          production-grade platforms for EdTech, FinTech, and enterprise markets.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.35 }}
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: 12,
            color: brand.textMuted,
            marginBottom: 40,
          }}
        >
          Node.js · PHP/Laravel · React · PostgreSQL · Docker · AWS · Claude AI
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          style={{
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent: "center",
            gap: 16,
            marginBottom: 48,
          }}
        >
          <Link href="#projects">
            <Button variant="contained" size="large" startIcon={<FontAwesomeIcon icon={faBriefcase} />}>
              See My Work
            </Button>
          </Link>
          <Link href="/#contact">
            <Button variant="outlined" size="large" endIcon={<ArrowForwardIcon />} sx={{ borderColor: brand.border, color: brand.text }}>
              Get In Touch
            </Button>
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 20 }}
        >
          {socials.map((s) => (
            <a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={s.label}
              style={{
                width: 40,
                height: 40,
                borderRadius: 8,
                background: brand.bgContainer,
                border: `1px solid ${brand.border}`,
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                color: brand.textSecondary,
              }}
            >
              <FontAwesomeIcon icon={s.icon} />
            </a>
          ))}
          <a
            href="mailto:richardkorankye07@gmail.com"
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 12,
              color: brand.textMuted,
              textTransform: "uppercase",
              letterSpacing: "0.1em",
            }}
          >
            richardkorankye07@gmail.com
          </a>
        </motion.div>
      </div>

      <motion.a
        href="#projects"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 1 }}
        aria-label="Scroll to projects"
        style={{
          position: "absolute",
          bottom: 32,
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 6,
          color: brand.textMuted,
        }}
      >
        <span style={{ fontFamily: "var(--font-mono)", fontSize: 10, textTransform: "uppercase", letterSpacing: "0.2em" }}>
          Scroll
        </span>
        <motion.div animate={{ y: [0, 4, 0] }} transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}>
          <FontAwesomeIcon icon={faChevronDown} />
        </motion.div>
      </motion.a>
    </section>
  )
}
