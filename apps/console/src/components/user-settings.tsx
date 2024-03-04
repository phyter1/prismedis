import Link from "next/link"
import { User } from "lucide-react"

import { Button } from "@prismedis/ui/button"

export function UserSettings() {
  return (
    <Button variant="outline" size="icon" asChild>
      <Link href="/user/settings">
        <User className="size-5" />
        <span className="sr-only">User Settings</span>
      </Link>
    </Button>
  )
}
