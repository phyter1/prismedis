import { Button } from "@prismedis/ui/button"
import { LogOutIcon } from "lucide-react"

import { logoutAction } from "@/actions/logout"

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
