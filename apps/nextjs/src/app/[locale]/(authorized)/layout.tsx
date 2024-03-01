import { redirect } from "next/navigation"
import { auth } from "@prismedis/auth"

import { SiteHeader } from "@/components/site-header"

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
      <SiteHeader />
      <div className="container">{children}</div>
    </>
  )
}
