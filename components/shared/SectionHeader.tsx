import { brand } from "@/lib/theme"

interface Props {
  label?: string
  title: string
  subtitle?: string
  center?: boolean
}

export function SectionHeader({ label, title, subtitle, center = false }: Props) {
  return (
    <div style={{ textAlign: center ? "center" : "left", marginBottom: center ? 64 : 48 }}>
      {label && (
        <p
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: 11,
            fontWeight: 600,
            color: brand.primary,
            textTransform: "uppercase",
            letterSpacing: "0.12em",
            margin: "0 0 12px",
          }}
        >
          {label}
        </p>
      )}
      <h2
        style={{
          fontFamily: "var(--font-display)",
          fontSize: 32,
          fontWeight: 700,
          color: brand.text,
          lineHeight: 1.25,
          margin: 0,
        }}
      >
        {title}
      </h2>
      {subtitle && (
        <p style={{ fontSize: 16, color: brand.textSecondary, marginTop: 8, lineHeight: 1.7 }}>{subtitle}</p>
      )}
    </div>
  )
}
