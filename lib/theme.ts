import { createTheme } from "@mui/material/styles"

/**
 * "Aurum" — a Linear.app-inspired dark surface with a single gold accent.
 * Near-black layered backgrounds, hairline borders, restrained typography.
 * `brand` feeds inline `sx`/style values; `theme` drives Material UI globally.
 */
export const brand = {
  bgBase: "#08090A",
  bgContainer: "#0F1011",
  bgElevated: "#16181B",
  border: "#23252A",
  borderSubtle: "#18191C",
  primary: "#E6B450",
  primaryHover: "#F0C66B",
  primarySoft: "#F2D08A",
  success: "#4CC38A",
  text: "#F7F8F8",
  textSecondary: "#8A8F98",
  textMuted: "#62666D",
  siderBg: "#0B0C0E",
} as const

const fontBody = "var(--font-inter), Inter, system-ui, -apple-system, sans-serif"
const fontDisplay = "var(--font-display), 'Space Grotesk', system-ui, sans-serif"

export const theme = createTheme({
  cssVariables: true,
  palette: {
    mode: "dark",
    primary: { main: brand.primary, dark: "#C99A35", light: brand.primaryHover, contrastText: "#0A0A0A" },
    success: { main: brand.success },
    background: { default: brand.bgBase, paper: brand.bgContainer },
    text: { primary: brand.text, secondary: brand.textSecondary },
    divider: brand.border,
  },
  shape: { borderRadius: 8 },
  typography: {
    fontFamily: fontBody,
    h1: { fontFamily: fontDisplay, fontWeight: 700, letterSpacing: "-0.035em" },
    h2: { fontFamily: fontDisplay, fontWeight: 700, letterSpacing: "-0.03em" },
    h3: { fontFamily: fontDisplay, fontWeight: 700, letterSpacing: "-0.025em" },
    h4: { fontFamily: fontDisplay, fontWeight: 700, letterSpacing: "-0.02em" },
    h5: { fontFamily: fontDisplay, fontWeight: 700 },
    h6: { fontFamily: fontDisplay, fontWeight: 600 },
    button: { textTransform: "none", fontWeight: 600, letterSpacing: 0 },
    body1: { letterSpacing: "-0.01em" },
    body2: { letterSpacing: "-0.01em" },
  },
  components: {
    MuiPaper: { styleOverrides: { root: { backgroundImage: "none" } } },
    MuiCard: {
      defaultProps: { elevation: 0 },
      styleOverrides: {
        root: {
          backgroundColor: brand.bgContainer,
          backgroundImage: "none",
          border: `1px solid ${brand.border}`,
          transition: "border-color 0.2s ease, background-color 0.2s ease",
        },
      },
    },
    MuiButton: {
      defaultProps: { disableElevation: true },
      styleOverrides: {
        root: { borderRadius: 8, paddingInline: 16 },
        contained: {
          "&.MuiButton-colorPrimary": {
            color: "#0A0A0A",
            boxShadow: "inset 0 1px 0 rgba(255,255,255,0.18)",
            "&:hover": { backgroundColor: brand.primaryHover },
          },
        },
        outlined: { borderColor: brand.border, "&:hover": { borderColor: brand.textSecondary, backgroundColor: brand.bgElevated } },
        text: { "&:hover": { backgroundColor: brand.bgElevated } },
      },
    },
    MuiToggleButton: {
      styleOverrides: {
        root: {
          color: brand.textSecondary,
          borderColor: brand.border,
          "&.Mui-selected": { color: "#0A0A0A", backgroundColor: brand.primary, "&:hover": { backgroundColor: brand.primaryHover } },
        },
      },
    },
    MuiAppBar: { styleOverrides: { root: { backgroundImage: "none" } } },
    MuiOutlinedInput: { styleOverrides: { root: { backgroundColor: brand.bgBase } } },
    MuiChip: { styleOverrides: { root: { fontWeight: 500 } } },
    MuiLink: { defaultProps: { underline: "none" } },
  },
})
