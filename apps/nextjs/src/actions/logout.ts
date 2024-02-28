"use server"

import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import { auth, lucia } from "@prismedis/auth"

export async function logoutAction(): Promise<ActionResult> {
  console.log("logoutAction", lucia, auth, cookies)
  const { session } = await auth()
  console.log("session", session)
  if (!session) {
    return {
      error: "Unauthorized",
    }
  }

  await lucia.invalidateSession(session.id)

  const sessionCookie = lucia.createBlankSessionCookie()
  cookies().set(
    sessionCookie.name,
    sessionCookie.value,
    sessionCookie.attributes,
  )
  return redirect("/auth")
}

interface ActionResult {
  error: string | null
}
