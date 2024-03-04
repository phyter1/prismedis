import type { Metadata } from "next"
import { redirect } from "next/navigation"

import { auth } from "@prismedis/auth"

import { SiteHeader } from "@/components/site-header"
import { APP_NAME } from "@/constants"

export const metadata: Metadata = {
  title: "Dashboard",
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
    <>
      <SiteHeader appName={APP_NAME} />
      <div className="container">{children}</div>
    </>
  )
}
