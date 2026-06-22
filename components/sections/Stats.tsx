"use client"

import { useInView } from "framer-motion"
import { useRef } from "react"
import { Row, Col, Statistic } from "antd"
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
    <section
      ref={ref}
      style={{
        borderTop: `1px solid ${brand.borderSubtle}`,
        borderBottom: `1px solid ${brand.borderSubtle}`,
        background: "#0B1120",
        padding: "40px 24px",
      }}
    >
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <Row gutter={[32, 32]}>
          {stats.map((stat) => (
            <Col key={stat.label} xs={12} md={6}>
              <Statistic
                valueRender={() =>
                  inView ? (
                    <span
                      style={{
                        fontFamily: "var(--font-mono)",
                        fontWeight: 700,
                        color: brand.primary,
                        fontSize: 34,
                      }}
                    >
                      <CountUp end={stat.value} duration={2} separator="," suffix={stat.suffix} />
                    </span>
                  ) : (
                    <span style={{ fontFamily: "var(--font-mono)", fontWeight: 700, color: brand.primary, fontSize: 34 }}>
                      0{stat.suffix}
                    </span>
                  )
                }
                value={stat.value}
                title={
                  <span
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: 11,
                      fontWeight: 600,
                      color: brand.textSecondary,
                      textTransform: "uppercase",
                      letterSpacing: "0.12em",
                    }}
                  >
                    {stat.label}
                  </span>
                }
              />
            </Col>
          ))}
        </Row>
      </div>
    </section>
  )
}
