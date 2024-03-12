import type { Metadata, Viewport } from "next"

import { cn } from "@prismedis/components"
import { TailwindIndicator } from "@prismedis/components/tailwind-indicator"
import { ThemeProvider } from "@prismedis/components/theme"
import { Toaster } from "@prismedis/components/toast"
import { APP_DESCRIPTION, APP_TITLE } from "@prismedis/constants"

import { TRPCReactProvider } from "@/trpc/react"

import "@/app/globals.css"

export const metadata: Metadata = {
  title: {
    default: APP_TITLE,
    template: `${APP_TITLE} | %s`,
  },
  description: APP_DESCRIPTION,
  icons: [{ rel: "icon", url: "/icon.png" }],
}

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          "min-h-screen bg-background font-sans text-foreground antialiased",
        )}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <TRPCReactProvider>{children}</TRPCReactProvider>
          <TailwindIndicator />

          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  )
}
