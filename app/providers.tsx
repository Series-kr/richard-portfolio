"use client"

import { AntdRegistry } from "@ant-design/nextjs-registry"
import { App as AntdApp, ConfigProvider } from "antd"
import type { ReactNode } from "react"
import { portfolioTheme } from "@/lib/theme"

/**
 * Wraps the app in Ant Design's SSR style registry, the global theme, and the
 * App context (so message/notification/modal hooks work everywhere).
 */
export function Providers({ children }: { children: ReactNode }) {
  return (
    <AntdRegistry>
      <ConfigProvider theme={portfolioTheme}>
        <AntdApp component={false}>{children}</AntdApp>
      </ConfigProvider>
    </AntdRegistry>
  )
}
