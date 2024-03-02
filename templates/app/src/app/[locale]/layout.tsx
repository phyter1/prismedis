import type { ReactNode } from "react"
import { LocaleProvider } from "@prismedis/locales/provider"

export interface LocaleLayoutProps {
  children: ReactNode
  params: {
    locale: string
  }
}

export default async function LocaleLayout({
  children,
  params,
}: LocaleLayoutProps) {
  return <LocaleProvider params={params}>{children}</LocaleProvider>
}
