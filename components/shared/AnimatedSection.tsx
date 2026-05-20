"use client"

import { motion, useInView, useReducedMotion } from "framer-motion"
import { useRef } from "react"

interface Props {
  children: React.ReactNode
  delay?: number
  className?: string
  direction?: "up" | "left" | "right" | "none"
}

export function AnimatedSection({ children, delay = 0, className, direction = "up" }: Props) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-80px" })
  const prefersReducedMotion = useReducedMotion()

  const variants = {
    up: { initial: { opacity: 0, y: 24 }, animate: { opacity: 1, y: 0 } },
    left: { initial: { opacity: 0, x: -24 }, animate: { opacity: 1, x: 0 } },
    right: { initial: { opacity: 0, x: 24 }, animate: { opacity: 1, x: 0 } },
    none: { initial: { opacity: 0 }, animate: { opacity: 1 } },
  }

  const { initial, animate } = variants[direction]

  if (prefersReducedMotion) {
    return <div ref={ref} className={className}>{children}</div>
  }

  return (
    <motion.div
      ref={ref}
      initial={initial}
      animate={isInView ? animate : initial}
      transition={{ duration: 0.5, delay, ease: [0.21, 0.47, 0.32, 0.98] }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
