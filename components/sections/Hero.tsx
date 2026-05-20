"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faBriefcase, faArrowRight, faChevronDown } from "@fortawesome/free-solid-svg-icons"
import { faGithub, faLinkedin } from "@fortawesome/free-brands-svg-icons"

export function Hero() {
  return (
    <section className="relative min-h-[920px] flex flex-col items-center justify-center text-center px-6 dot-grid">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#080B10]/50 to-[#080B10] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#45f1c3]/5 rounded-full blur-[120px]" />

      <div className="relative z-10 max-w-4xl">
        {/* Available badge */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="inline-flex items-center gap-2 bg-[#121c2a] border border-[#1C2330] px-4 py-1.5 rounded-full mb-8"
        >
          <span className="w-2 h-2 rounded-full bg-[#45f1c3] pulse-teal shadow-[0_0_8px_#45f1c3]" />
          <span className="font-[family-name:var(--font-mono)] text-[11px] font-semibold text-[#bacac2] uppercase tracking-[0.1em]">
            Open to opportunities
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="font-[family-name:var(--font-syne)] text-[48px] md:text-[72px] font-bold text-[#d9e3f7] mb-4 tracking-tight leading-[1.1]"
        >
          I build systems that{" "}
          <span className="text-[#45f1c3]">actually work.</span>
        </motion.h1>

        {/* Subheading */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="font-[family-name:var(--font-dm-sans)] text-[16px] md:text-[18px] text-[#bacac2] mb-6 max-w-2xl mx-auto leading-relaxed"
        >
          Senior Full Stack Engineer based in Accra, Ghana with 7+ years of experience building SaaS
          platforms, ERP systems, and AI-integrated applications for real businesses.
        </motion.p>

        {/* Meta info */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.35 }}
          className="flex items-center justify-center gap-6 mb-12 text-[#85948d] font-[family-name:var(--font-mono)] text-[12px]"
        >
          <span>Node.js · PHP/Laravel · React · PostgreSQL</span>
          <span className="hidden md:inline text-[#1C2330]">|</span>
          <span className="hidden md:inline">Docker · AWS · Claude AI</span>
        </motion.div>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-col md:flex-row items-center justify-center gap-4 mb-12"
        >
          <Link
            href="#projects"
            className="w-full md:w-auto inline-flex items-center justify-center gap-2 bg-[#00d4a8] text-[#00382a] font-bold px-10 py-4 rounded-lg active:scale-95 transition-all hover:shadow-[0_0_30px_rgba(0,212,168,0.3)] font-[family-name:var(--font-dm-sans)]"
          >
            <FontAwesomeIcon icon={faBriefcase} className="w-4 h-4" />
            View My Work
          </Link>
          <Link
            href="/blog"
            className="w-full md:w-auto inline-flex items-center justify-center gap-2 bg-transparent border border-[#3b4a44]/60 text-[#d9e3f7] font-bold px-10 py-4 rounded-lg hover:bg-[#212a39] transition-all active:scale-95 font-[family-name:var(--font-dm-sans)]"
          >
            Read My Blog
            <FontAwesomeIcon icon={faArrowRight} className="w-4 h-4" />
          </Link>
        </motion.div>

        {/* Social links */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="flex items-center justify-center gap-5"
        >
          <a
            href="https://github.com/Series-kr"
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 rounded-lg bg-[#121c2a] border border-[#1C2330] flex items-center justify-center text-[#bacac2] hover:text-[#45f1c3] hover:border-[#45f1c3]/40 transition-all"
            aria-label="GitHub"
          >
            <FontAwesomeIcon icon={faGithub} className="w-5 h-5" />
          </a>
          <a
            href="https://linkedin.com/in/richardkorankye"
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 rounded-lg bg-[#121c2a] border border-[#1C2330] flex items-center justify-center text-[#bacac2] hover:text-[#45f1c3] hover:border-[#45f1c3]/40 transition-all"
            aria-label="LinkedIn"
          >
            <FontAwesomeIcon icon={faLinkedin} className="w-5 h-5" />
          </a>
          <a
            href="mailto:richardkorankye07@gmail.com"
            className="font-[family-name:var(--font-mono)] text-[12px] text-[#85948d] hover:text-[#45f1c3] transition-colors uppercase tracking-widest"
          >
            richardkorankye07@gmail.com
          </a>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.a
        href="#projects"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 1.0 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 text-[#85948d] hover:text-[#45f1c3] transition-colors"
        aria-label="Scroll to projects"
      >
        <span className="font-[family-name:var(--font-mono)] text-[10px] uppercase tracking-widest">Scroll</span>
        <motion.div
          animate={{ y: [0, 4, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <FontAwesomeIcon icon={faChevronDown} className="w-3.5 h-3.5" />
        </motion.div>
      </motion.a>
    </section>
  )
}
