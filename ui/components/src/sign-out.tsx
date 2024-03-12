"use client"

import { ReactNode } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"

import { cn } from "@prismedis/components"
import { Button } from "@prismedis/components/button"

export interface NavProps {
  links: {
    link: string
    text: string
    match?: string
    icon?: ReactNode
  }[]
}

export const Nav = ({ links }: NavProps) => {
  "use client"
  const pathname = usePathname()
  return (
    <nav className="flex h-full w-[15rem] flex-1 bg-primary pt-3">
      <ul className="text-primary-forground ml-2 flex w-full flex-col gap-4 py-2">
        {links.map((link) => {
          const isActive = new RegExp(link.match ?? "").test(pathname ?? "")
          return (
            <li aria-current={isActive ? "page" : "false"} key={link.text}>
              <Button
                asChild
                variant="ghost"
                onClick={
                  typeof link.link === "function" ? link.link : undefined
                }
                className={cn(
                  "border-r-none flex w-full rounded-l-lg rounded-r-none border-y-2 border-l-2 p-6 text-lg font-light text-primary-foreground hover:border-primary hover:bg-white hover:text-primary dark:hover:border-white dark:hover:bg-primary-foreground dark:hover:text-primary",
                  {
                    "border-primary bg-white text-primary hover:bg-white  hover:text-primary dark:border-white dark:bg-primary-foreground dark:hover:bg-primary-foreground":
                      isActive,
                  },
                )}
              >
                <Link href={typeof link.link === "string" ? link.link : ""}>
                  {link.icon ?? null}
                  <p className="w-full text-left ">{link.text}</p>
                </Link>
              </Button>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
