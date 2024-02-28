import type { Metadata, Viewport } from "next"
import { cn } from "@prismedis/ui"
import { TailwindIndicator } from "@prismedis/ui/tailwind-indicator"
import { ThemeProvider } from "@prismedis/ui/theme"
import { Toaster } from "@prismedis/ui/toast"

import { TRPCReactProvider } from "@/trpc/react"

import "@/app/globals.css"

export const metadata: Metadata = {
  title: "Prismedis",
  description: "Health data, smarter",
}

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
}

export default function RootLayout({
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
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <TRPCReactProvider>{children}</TRPCReactProvider>
          <TailwindIndicator />

          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  )
}
