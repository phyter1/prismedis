import { headers } from "next/headers"
import Link from "next/link"

import { Button } from "./button"
import { cn } from "./index"

export interface NavProps {
  links: {
    link: string | (() => void)
    text: string
    match?: RegExp
  }[]
}

export const Nav = ({ links }: NavProps) => {
  const headersList = headers()
  const pathname = headersList.get("next-url")

  return (
    <>
      <nav className="hidden h-full w-[15rem] flex-1 bg-primary pt-3 md:flex">
        <ul className="text-primary-forground ml-2 flex w-full flex-col gap-2 py-2">
          {links.map((link) => {
            const isActive = link.match?.test(pathname ?? "")
            return (
              <li aria-current={isActive ? "page" : "false"} key={link.text}>
                <Button
                  asChild
                  variant="ghost"
                  onClick={
                    typeof link.link === "function" ? link.link : undefined
                  }
                  className={cn(
                    "border-r-none flex w-full rounded-l-lg rounded-r-none border-y-2 border-l-2 text-primary-foreground hover:bg-primary hover:text-primary",
                    { "bg-primary-foreground text-primary": isActive },
                  )}
                >
                  <Link href={typeof link.link === "string" ? link.link : ""}>
                    <p className="w-full text-left ">
                      {link.text} {isActive ? "Active" : "Inactive"}
                    </p>
                  </Link>
                </Button>
              </li>
            )
          })}
        </ul>
      </nav>
    </>
  )
}
