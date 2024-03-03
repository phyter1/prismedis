import { LogOutIcon } from "lucide-react"

import { logoutAction } from "@prismedis/auth/logout"
import { Button } from "@prismedis/ui/button"

export function SignOut() {
  return (
    <form action={logoutAction}>
      <Button variant="outline" size="icon">
        <LogOutIcon className="size-5" />
        <span className="sr-only">Sign out</span>
      </Button>
    </form>
  )
}
