import { IoLogOutSharp } from "react-icons/io5"

import { Button } from "@prismedis/ui/button"

export function SignOutButton() {
  return (
    <Button variant="outline" size="icon">
      <IoLogOutSharp className="size-5" />
      <span className="sr-only">Sign out</span>
    </Button>
  )
}
