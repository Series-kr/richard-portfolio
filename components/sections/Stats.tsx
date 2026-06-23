"use client"

import { useInView } from "framer-motion"
import { useRef } from "react"
import { Box, Typography } from "@mui/material"
import CountUp from "react-countup"
import { brand } from "@/lib/theme"

const stats = [
  { value: 91000, suffix: "+", label: "Lines of Code Shipped" },
  { value: 6, suffix: "+", label: "Production SaaS Platforms" },
  { value: 7, suffix: "+", label: "Years Building Systems" },
  { value: 5, suffix: "", label: "Companies Served" },
]

export function Stats() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: "-80px" })

  return (
    <Box
      ref={ref}
      component="section"
      sx={{
        borderTop: `1px solid ${brand.borderSubtle}`,
        borderBottom: `1px solid ${brand.borderSubtle}`,
        background: brand.bgBase,
        py: 5,
        px: 3,
      }}
    >
      <Box
        sx={{
          maxWidth: 1200,
          mx: "auto",
          display: "grid",
          gridTemplateColumns: { xs: "1fr 1fr", md: "repeat(4, 1fr)" },
          gap: 4,
        }}
      >
        {stats.map((stat) => (
          <Box key={stat.label}>
            <Typography sx={{ fontFamily: "var(--font-mono)", fontWeight: 700, color: brand.primary, fontSize: 34, lineHeight: 1.1 }}>
              {inView ? (
                <CountUp end={stat.value} duration={2} separator="," suffix={stat.suffix} />
              ) : (
                `0${stat.suffix}`
              )}
            </Typography>
            <Typography
              sx={{
                fontFamily: "var(--font-mono)",
                fontSize: 11,
                fontWeight: 600,
                color: brand.textSecondary,
                textTransform: "uppercase",
                letterSpacing: "0.12em",
                mt: 0.5,
              }}
            >
              {stat.label}
            </Typography>
          </Box>
        ))}
      </Box>
    </Box>
  )
}
