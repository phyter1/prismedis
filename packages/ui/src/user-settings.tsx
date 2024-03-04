import Link from "next/link"
import { IoPersonSharp } from "react-icons/io5"

import { Button } from "@prismedis/ui/button"

export function UserSettings({ href }: { href: string }) {
  return (
    <Button variant="outline" size="icon" asChild>
      <Link href={href}>
        <IoPersonSharp className="size-5" />
        <span className="sr-only">User Settings</span>
      </Link>
    </Button>
  )
}
