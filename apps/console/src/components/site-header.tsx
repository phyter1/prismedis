import Link from "next/link"

import { Logo } from "@prismedis/ui/logo"
import { ThemeToggle } from "@prismedis/ui/theme"

import { LanguageSwitcher } from "@/components/language-switcher"
import { SignOut } from "./sign-out"
import { UserSettings } from "./user-settings"

export function SiteHeader({ appName }: { appName: string }) {
  return (
    <header className=" sticky top-0 z-50 w-full border-b bg-background/95 py-4 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container">
        <nav
          className="mx-auto flex items-center justify-between "
          aria-label="Global"
        >
          <Link href="/" className="-m-1.5 p-1.5">
            <Logo appName={appName} size="sm" />
          </Link>

          <div className="flex gap-1">
            <SignOut />
            <UserSettings />
            <LanguageSwitcher />
            <ThemeToggle />
          </div>
        </nav>
      </div>
    </header>
  )
}
