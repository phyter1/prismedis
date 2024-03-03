import type { PropsWithChildren } from "react"
import { redirect } from "next/navigation"

import { auth } from "@prismedis/auth"
import { Logo as PrismedisLogo } from "@prismedis/ui/logo"

export default async function Layout({ children }: PropsWithChildren) {
  const session = await auth()

  if (session.user) {
    redirect("/")
  }

  return (
    <div className="container relative  grid h-screen flex-col items-center justify-center lg:max-w-none lg:grid-cols-2 lg:px-0">
      <div className="relative hidden h-full flex-col bg-muted p-10 dark:border-r dark:text-white lg:flex">
        <div className="absolute inset-0 bg-zinc-200 dark:bg-zinc-900" />
        <div className="relative flex flex-1 items-center justify-center">
          <PrismedisLogo appName={"Admin"} />
        </div>
      </div>

      <div className="lg:p-8">
        <div className="mx-auto flex  w-[21.875rem] flex-col justify-center space-y-6">
          <div className="flex flex-col space-y-2 text-center">
            <div className="mb-10 flex justify-center lg:hidden">
              <PrismedisLogo appName={"Admin"} />
            </div>
            {children}
          </div>
        </div>
      </div>
    </div>
  )
}
