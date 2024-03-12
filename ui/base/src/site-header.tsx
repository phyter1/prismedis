import type { PropsWithChildren } from "react"
import Link from "next/link"

import { Logo } from "@prismedis/components/logo"
import { ThemeToggle } from "@prismedis/components/theme"

import { LanguageSwitcher } from "./language-switcher"
import { UserSettings } from "./user-settings"

export function SiteHeader({
  appName,
  userSettingsHref,
  children,
}: PropsWithChildren<{ appName: string; userSettingsHref: string }>) {
  return (
    <header className=" sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container">
        <nav
          className="mx-auto flex items-center justify-between "
          aria-label="Global"
        >
          <Link href="/" className="-m-1.5 p-1.5">
            <Logo appName={appName} size="sm" />
          </Link>

          <div className="flex gap-1">
            {children}
            <UserSettings href={userSettingsHref} />
            <LanguageSwitcher />
            <ThemeToggle />
          </div>
        </nav>
      </div>
    </header>
  )
}
