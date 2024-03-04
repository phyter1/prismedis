import type { Metadata, Viewport } from "next"

import { cn } from "@prismedis/ui"
import { TailwindIndicator } from "@prismedis/ui/tailwind-indicator"
import { ThemeProvider } from "@prismedis/ui/theme"
import { Toaster } from "@prismedis/ui/toast"

import { TRPCReactProvider } from "@/trpc/react"

import "@/app/globals.css"

import { APP_DESCRIPTION, APP_NAME } from "@/constants"

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
