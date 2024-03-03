import type { NextRequest } from "next/server"
import { NextResponse } from "next/server"

import { lucia } from "@prismedis/auth"

const handler = async (req: NextRequest) => {
  const sessionId = req.cookies.get(lucia.sessionCookieName)?.value ?? null

  // no cookie exists
  if (!sessionId) {
    return NextResponse.json({ valid: false })
  }

  const { session } = await lucia.validateSession(sessionId)

  if (!session || session.userRole === "user") {
    return NextResponse.json({ valid: false })
  }

  return NextResponse.json({ valid: true })
}

export { handler as GET }
