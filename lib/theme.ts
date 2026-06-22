import { theme, type ThemeConfig } from "antd"

/**
 * "Precision Engineering" — the single source of truth for the portfolio's
 * visual language. Every colour the UI uses flows from these tokens via
 * Ant Design's ConfigProvider; components must not hardcode hex values.
 */
export const brand = {
  bgBase: "#0F1629",
  bgContainer: "#1A2235",
  bgElevated: "#1E2740",
  border: "#2D3748",
  borderSubtle: "#222C40",
  primary: "#4F46E5",
  success: "#10B981",
  text: "#FFFFFF",
  textSecondary: "#94A3B8",
  textMuted: "#64748B",
  siderBg: "#0B1120",
} as const

export const portfolioTheme: ThemeConfig = {
  algorithm: theme.darkAlgorithm,
  token: {
    colorPrimary: brand.primary,
    colorSuccess: brand.success,
    colorInfo: brand.primary,
    colorBgBase: brand.bgBase,
    colorBgContainer: brand.bgContainer,
    colorBgElevated: brand.bgElevated,
    colorBorder: brand.border,
    colorBorderSecondary: brand.borderSubtle,
    colorText: brand.text,
    colorTextSecondary: brand.textSecondary,
    colorTextTertiary: brand.textMuted,
    fontFamily: "var(--font-inter), Inter, system-ui, -apple-system, sans-serif",
    fontFamilyCode: "var(--font-mono), 'JetBrains Mono', ui-monospace, monospace",
    borderRadius: 6,
    wireframe: false,
  },
  components: {
    Layout: {
      bodyBg: brand.bgBase,
      headerBg: brand.bgBase,
      siderBg: brand.siderBg,
      footerBg: brand.bgBase,
    },
    Menu: {
      darkItemBg: brand.siderBg,
      darkSubMenuItemBg: brand.siderBg,
      darkItemSelectedBg: brand.primary,
    },
    Card: {
      colorBgContainer: brand.bgContainer,
    },
    Statistic: {
      contentFontSize: 30,
    },
  },
}
