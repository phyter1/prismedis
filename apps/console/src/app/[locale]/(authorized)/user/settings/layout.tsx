import type { Metadata } from "next"

import { Separator } from "@prismedis/components/separator"

import { SettingsSidebar } from "@/app/[locale]/(authorized)/user/settings/components/sidebar"

export const metadata: Metadata = {
  title: "User settings",
  description: "Advanced form example using react-hook-form and Zod.",
}

const navItems = [
  {
    title: "Profile",
    href: "/user/settings",
  },
  {
    title: "Sessions",
    href: "/user/settings/sessions",
  },
]

interface SettingsLayoutProps {
  children: React.ReactNode
}

export default function SettingsLayout({ children }: SettingsLayoutProps) {
  return (
    <>
      <div className="space-y-6 py-16">
        <div className="space-y-0.5">
          <h2 className="text-2xl font-bold tracking-tight">Settings</h2>
          <p className="text-muted-foreground">Manage your account settings</p>
        </div>
        <Separator className="my-6" />
        <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
          <aside className="lg:w-1/5">
            <SettingsSidebar items={navItems} />
          </aside>
          <div className="flex-1">
            <div className="mx-auto flex w-full lg:max-w-2xl">{children}</div>
          </div>
        </div>
      </div>
    </>
  )
}
