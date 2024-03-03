"use client"

import Link from "next/link"
import { UserIcon } from "lucide-react"

import { useI18n } from "@prismedis/locales/client"
import { Button } from "@prismedis/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@prismedis/ui/dropdown-menu"

import { api } from "@/trpc/react"

export function UserMenu() {
  const t = useI18n()
  const { data: user } = api.user.profile.useQuery()
  const { mutate: logout } = api.auth.logout.useMutation()

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

        <DropdownMenuItem>
          <button
            onClick={(e) => {
              e.preventDefault()
              e.stopPropagation()
              logout()
            }}
          >
            {t("auth.signout")}
          </button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
