import type { Metadata } from "next"
import { redirect } from "next/navigation"
import { IoBusinessSharp } from "react-icons/io5"

import { auth } from "@prismedis/auth"
import { LanguageSwitcher } from "@prismedis/ui/language-switcher"
import { Nav } from "@prismedis/ui/navigation"
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
    <div className="flex h-full flex-1 flex-col">
      <SiteHeader appName={APP_NAME} userSettingsHref="/user/settings">
        <form action={signOut}>
          <SignOutButton />
        </form>
      </SiteHeader>
      <div className="flex h-full w-full flex-1">
        <div>
          <Nav
            links={[
              {
                link: "/accounts",
                text: "Accounts",
                match: "/accounts",
                icon: <IoBusinessSharp className="mr-2 h-6 w-6" />,
              },
              {
                link: "/email-templates",
                text: "Email Templates",
                match: "/email-templates",
              },
            ]}
          />
        </div>
        <div className="container">{children}</div>
      </div>
    </div>
  )
}
