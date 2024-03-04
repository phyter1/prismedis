import type { Metadata } from "next"
import { redirect } from "next/navigation"

import { auth } from "@prismedis/auth"
import { SignOutButton } from "@prismedis/ui/sign-out"
import { SiteHeader } from "@prismedis/ui/site-header"

import { APP_NAME } from "@/constants"
import { api } from "@/trpc/server"

export const metadata: Metadata = {
  title: "Dashboard",
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await auth()

  const signOut = async () => {
    "use server"
    await api.auth.logout().catch(console.error)
  }

  if (!session.user) {
    redirect("/login")
  }

  return (
    <>
      <SiteHeader appName={APP_NAME} userSettingsHref="/user/settings">
        <form action={signOut}>
          <SignOutButton />
        </form>
      </SiteHeader>
      <div className="container">{children}</div>
    </>
  )
}
