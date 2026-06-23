"use client"

import type { ReactNode } from "react"
import { AppRouterCacheProvider } from "@mui/material-nextjs/v16-appRouter"
import { ThemeProvider } from "@mui/material/styles"
import CssBaseline from "@mui/material/CssBaseline"
import { SnackbarProvider } from "notistack"
import { theme } from "@/lib/theme"

/**
 * App-wide Material UI setup: emotion SSR cache for the App Router, the global
 * OLED theme, a baseline reset, and a notistack provider for toasts.
 */
export function Providers({ children }: { children: ReactNode }) {
  return (
    <AppRouterCacheProvider options={{ key: "mui" }}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <SnackbarProvider
          maxSnack={3}
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
          autoHideDuration={4000}
        >
          {children}
        </SnackbarProvider>
      </ThemeProvider>
    </AppRouterCacheProvider>
  )
}
