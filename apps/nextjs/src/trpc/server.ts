import { cache } from "react"
import { headers } from "next/headers"
import { createCaller, createTRPCContext } from "@prismedis/api"
import { auth } from "@prismedis/auth"
import { db as mongodb } from "@prismedis/db/mongodb"
import { db as mysql } from "@prismedis/db/mysql"

/**
 * This wraps the `createTRPCContext` helper and provides the required context for the tRPC API when
 * handling a tRPC call from a React Server Component.
 */
const createContext = cache(async () => {
  const heads = new Headers(headers())
  heads.set("x-trpc-source", "rsc")

  return createTRPCContext({
    session: await auth(),
    mysql,
    mongodb,
    headers: heads,
  })
})

export const api = createCaller(createContext)
