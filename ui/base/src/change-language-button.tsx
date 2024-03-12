"use client"

import { IoCheckmarkSharp, IoLanguageSharp } from "react-icons/io5"

import { Button } from "@prismedis/components/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@prismedis/components/dropdown-menu"
import { useChangeLocale, useCurrentLocale } from "@prismedis/locales/client"

export function ChangeLocaleButton() {
  const changeLocale = useChangeLocale({ preserveSearchParams: true })
  const currentLanguage = useCurrentLocale()
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          <IoLanguageSharp className="size-5" />
          <span className="sr-only">Change language</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => changeLocale("de")}>
          <span>DE</span>

          {currentLanguage === "de" && (
            <DropdownMenuShortcut>
              <IoCheckmarkSharp className="size-4" />
            </DropdownMenuShortcut>
          )}
        </DropdownMenuItem>

        <DropdownMenuItem onClick={() => changeLocale("en")}>
          <span>EN</span>
          {currentLanguage === "en" && (
            <DropdownMenuShortcut>
              <IoCheckmarkSharp className="size-4" />
            </DropdownMenuShortcut>
          )}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
