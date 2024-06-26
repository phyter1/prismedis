import type { Metadata } from "next"
import { redirect } from "next/navigation"

import { auth } from "@prismedis/auth"
import { Nav } from "@prismedis/components/navigation"
import { SiteHeader } from "@prismedis/components/site-header"

import { APP_NAME } from "@/constants"

export const metadata: Metadata = {
  title: "Console",
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await auth()

  if (!session.user) {
    redirect("/login")
  }

  return (
    <div className="flex h-full flex-1 flex-col">
      <SiteHeader appName={APP_NAME} userSettingsHref="/user/settings" />
      <div className="flex h-full w-full flex-1">
        <div>
          <Nav links={[]} />
        </div>
        <div className="container">{children}</div>
      </div>
    </div>
  )
}
