import type { Metadata, Viewport } from "next"

import { APP_DESCRIPTION } from "@prismedis/constants"
import { cn } from "@prismedis/components"
import { TailwindIndicator } from "@prismedis/components/tailwind-indicator"
import { ThemeProvider } from "@prismedis/components/theme"
import { Toaster } from "@prismedis/components/toast"

import { TRPCReactProvider } from "@/trpc/react"

import "@/app/globals.css"

import { APP_NAME } from "@/constants"

export const metadata: Metadata = {
  title: {
    default: APP_NAME,
    template: `${APP_NAME} | %s`,
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
          "flex min-h-screen  w-full flex-1 flex-col bg-background font-sans text-foreground antialiased",
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
