"use client"

import Link from "next/link"
import { UserIcon } from "lucide-react"

import { Button } from "@prismedis/components/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@prismedis/components/dropdown-menu"
import { useI18n } from "@prismedis/locales/client"

import { logoutAction } from "@/actions/logout"
import { api } from "@/trpc/react"

export function UserMenu() {
  const t = useI18n()
  const { data: user } = api.user.profile.useQuery()

  const logout = () => {
    console.log("logout")
    logoutAction().catch((err) => {
      console.error("Failed to logout", err)
    })
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          <UserIcon />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p
              className="text-sm leading-none"
              dangerouslySetInnerHTML={{
                __html: t("welcome", { name: user?.name }),
              }}
            ></p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />

        <DropdownMenuGroup>
          <DropdownMenuItem>
            <Link href="/users/settings">{t("common.settings")}</Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>

        <DropdownMenuSeparator />

        <form action={logout}>
          <DropdownMenuItem>
            <button>{t("auth.signout")}</button>
          </DropdownMenuItem>
        </form>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
