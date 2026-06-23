import { createTheme } from "@mui/material/styles"

/**
 * "Precision Engineering" — OLED edition. Single source of truth for the
 * portfolio's colour language. `brand` is consumed by inline `sx`/style values;
 * `theme` drives Material UI globally via ThemeProvider.
 */
export const brand = {
  bgBase: "#0A0A0A",
  bgContainer: "#141414",
  bgElevated: "#1C1C1C",
  border: "#262626",
  borderSubtle: "#1A1A1A",
  primary: "#4F46E5",
  primarySoft: "#A5B4FC",
  success: "#10B981",
  text: "#FFFFFF",
  textSecondary: "#A1A1AA",
  textMuted: "#71717A",
  siderBg: "#0A0A0A",
} as const

const fontBody = "var(--font-inter), Inter, system-ui, -apple-system, sans-serif"
const fontDisplay = "var(--font-display), 'Space Grotesk', system-ui, sans-serif"

export const theme = createTheme({
  cssVariables: true,
  palette: {
    mode: "dark",
    primary: { main: brand.primary, contrastText: "#FFFFFF" },
    success: { main: brand.success },
    background: { default: brand.bgBase, paper: brand.bgContainer },
    text: { primary: brand.text, secondary: brand.textSecondary },
    divider: brand.border,
  },
  shape: { borderRadius: 8 },
  typography: {
    fontFamily: fontBody,
    h1: { fontFamily: fontDisplay, fontWeight: 700, letterSpacing: "-0.03em" },
    h2: { fontFamily: fontDisplay, fontWeight: 700, letterSpacing: "-0.02em" },
    h3: { fontFamily: fontDisplay, fontWeight: 700, letterSpacing: "-0.02em" },
    h4: { fontFamily: fontDisplay, fontWeight: 700 },
    h5: { fontFamily: fontDisplay, fontWeight: 700 },
    h6: { fontFamily: fontDisplay, fontWeight: 600 },
    button: { textTransform: "none", fontWeight: 600 },
  },
  components: {
    MuiPaper: {
      styleOverrides: {
        root: { backgroundImage: "none" },
      },
    },
    MuiCard: {
      defaultProps: { elevation: 0 },
      styleOverrides: {
        root: {
          backgroundColor: brand.bgContainer,
          backgroundImage: "none",
          border: `1px solid ${brand.border}`,
        },
      },
    },
    MuiButton: {
      defaultProps: { disableElevation: true },
      styleOverrides: {
        root: { borderRadius: 8 },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: { backgroundImage: "none" },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: { backgroundColor: brand.bgBase },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: { fontWeight: 500 },
      },
    },
  },
})
