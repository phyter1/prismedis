"use client"

import { useChangeLocale, useCurrentLocale } from "@prismedis/locales/client"
import { Button } from "@prismedis/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@prismedis/ui/dropdown-menu"
import { CheckIcon, LanguagesIcon } from "lucide-react"

export function ChangeLocaleButton() {
  const changeLocale = useChangeLocale({ preserveSearchParams: true })
  const currentLanguage = useCurrentLocale()
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          <LanguagesIcon className="size-5" />
          <span className="sr-only">Change language</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => changeLocale("de")}>
          <span>DE</span>

          {currentLanguage === "de" && (
            <DropdownMenuShortcut>
              <CheckIcon className="size-4" />
            </DropdownMenuShortcut>
          )}
        </DropdownMenuItem>

        <DropdownMenuItem onClick={() => changeLocale("en")}>
          <span>EN</span>
          {currentLanguage === "en" && (
            <DropdownMenuShortcut>
              <CheckIcon className="size-4" />
            </DropdownMenuShortcut>
          )}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
