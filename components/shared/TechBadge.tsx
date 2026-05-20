interface Props {
  name: string
  variant?: "default" | "primary" | "mono"
  small?: boolean
}

export function TechBadge({ name, variant = "default", small = false }: Props) {
  const size = small ? "text-[11px] px-2 py-0.5" : "text-[13px] px-2.5 py-1"

  const styles = {
    default: `bg-[#2b3544]/50 text-[#d9e3f7] border border-[#1C2330] font-[family-name:var(--font-mono)] rounded ${size}`,
    primary: `bg-[#45f1c3]/10 text-[#45f1c3] border border-[#45f1c3]/20 font-[family-name:var(--font-mono)] rounded ${size}`,
    mono: `font-[family-name:var(--font-mono)] text-[13px] text-[#bacac2]`,
  }

  return <span className={styles[variant]}>{name}</span>
}
