import { cache } from "react"
import { headers } from "next/headers"

import { createCaller, createTRPCContext } from "@prismedis/api"
import { auth } from "@prismedis/auth"

/**
 * This wraps the `createTRPCContext` helper and provides the required context for the tRPC API when
 * handling a tRPC call from a React Server Component.
 */
const createContext = cache(async () => {
  const heads = new Headers(headers())
  heads.set("x-trpc-source", "rsc")

  // get the ip address from the request headers
  const ipAddress =
    heads.get("x-real-ip") ??
    heads.get("x-forwarded-for") ??
    heads.get("cf-connecting-ip") ??
    heads.get("fastly-client-ip") ??
    heads.get("true-client-ip") ??
    heads.get("x-client-ip") ??
    heads.get("x-cluster-client-ip") ??
    heads.get("x-forwarded") ??
    heads.get("forwarded-for") ??
    heads.get("forwarded") ??
    heads.get("via") ??
    "unknown"

  // get the user agent from the request headers
  const userAgent = heads.get("user-agent") ?? "unknown"

  return createTRPCContext({
    session: await auth(),
    headers: heads,
    ipAddress,
    userAgent,
  })
})

export const api = createCaller(createContext)
