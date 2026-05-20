interface Props {
  label?: string
  title: string
  subtitle?: string
  center?: boolean
}

export function SectionHeader({ label, title, subtitle, center = false }: Props) {
  return (
    <div className={center ? "text-center mb-16" : "mb-12"}>
      {label && (
        <p className="font-[family-name:var(--font-mono)] text-[11px] font-semibold text-[#45f1c3] uppercase tracking-[0.1em] mb-3">
          {label}
        </p>
      )}
      <h2 className="font-[family-name:var(--font-syne)] text-[32px] font-bold text-[#d9e3f7] leading-[1.3]">
        {title}
      </h2>
      {subtitle && (
        <p className="font-[family-name:var(--font-dm-sans)] text-[16px] text-[#bacac2] mt-2 leading-relaxed">
          {subtitle}
        </p>
      )}
    </div>
  )
}
