import type { Providers } from "@prismedis/auth"
import { cookies } from "next/headers"
import { providers } from "@prismedis/auth"
import { generateState } from "arctic"

export async function GET(
  request: Request,
  {
    params,
  }: {
    params: { provider: string }
  },
): Promise<Response> {
  if (!Object.keys(providers).includes(params.provider)) {
    console.error("Invalid oauth provider", params.provider)
    return new Response(null, {
      status: 400,
    })
  }

  const state = generateState()
  const currentProvider = providers[params.provider as Providers]
  const url = await currentProvider.getAuthorizationUrl(state)
  cookies().set(`oauth_state`, state, {
    path: "/",
    secure: process.env.NODE_ENV === "production",
    httpOnly: true,
    maxAge: 60 * 10,
    sameSite: "lax",
  })

  return Response.redirect(url)
}
