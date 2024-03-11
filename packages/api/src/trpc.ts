/**
 * YOU PROBABLY DON'T NEED TO EDIT THIS FILE, UNLESS:
 * 1. You want to modify request context (see Part 1)
 * 2. You want to create a new middleware or type of procedure (see Part 3)
 *
 * tl;dr - this is where all the tRPC server stuff is created and plugged in.
 * The pieces you will need to use are documented accordingly near the end
 */
import { initTRPC, TRPCError } from "@trpc/server"
import superjson from "superjson"
import { ZodError } from "zod"

import type { AuthResponse } from "@prismedis/auth"
import { auth } from "@prismedis/auth"
import {
  loginAction,
  loginEmailAction,
  loginVerificationAction,
} from "@prismedis/auth/login"
import { logoutAction } from "@prismedis/auth/logout"
import { registerAction } from "@prismedis/auth/register"
import { db as mongodb } from "@prismedis/db/mongodb"
import { db as postgres } from "@prismedis/db/postgres"

/**
 * 1. CONTEXT
 *
 * This section defines the "contexts" that are available in the backend API.
 *
 * These allow you to access things when processing a request, like the database, the session, etc.
 *
 * This helper generates the "internals" for a tRPC context. The API handler and RSC clients each
 * wrap this and provides the required context.
 *
 * @see https://trpc.io/docs/server/context
 */

export const createTRPCContext = async (opts: {
  headers: Headers
  session: AuthResponse | null
  userAgent: string
  ipAddress: string
}) => {
  const session = opts.session ?? (await auth())
  const serverSecret = process.env.SERVER_SECRET
  return {
    session,
    postgres,
    mongodb,
    serverSecret,
    auth: {
      loginEmail: loginEmailAction,
      loginVerify: loginVerificationAction,
      login: loginAction,
      logout: logoutAction,
      register: registerAction,
    },
  }
}

/**
 * 2. INITIALIZATION
 *
 * This is where the trpc api is initialized, connecting the context and
 * transformer
 */
const t = initTRPC.context<typeof createTRPCContext>().create({
  transformer: superjson,
  errorFormatter: ({ shape, error }) => ({
    ...shape,
    data: {
      ...shape.data,
      zodError: error.cause instanceof ZodError ? error.cause.flatten() : null,
    },
  }),
})

/**
 * Create a server-side caller
 * @see https://trpc.io/docs/server/server-side-calls
 */
export const createCallerFactory = t.createCallerFactory

/**
 * 3. ROUTER & PROCEDURE (THE IMPORTANT BIT)
 *
 * These are the pieces you use to build your tRPC API. You should import these
 * a lot in the /src/server/api/routers folder
 */

/**
 * This is how you create new routers and subrouters in your tRPC API
 * @see https://trpc.io/docs/router
 */
export const createTRPCRouter = t.router

/**
 * Public (unauthed) procedure
 *
 * This is the base piece you use to build new queries and mutations on your
 * tRPC API. It does not guarantee that a user querying is authorized, but you
 * can still access user session data if they are logged in
 */
export const publicProcedure = t.procedure

/**
 * Protected (authenticated) procedure
 *
 * If you want a query or mutation to ONLY be accessible to logged in users, use this. It verifies
 * the session is valid and guarantees `ctx.session.user` is not null.
 *
 * @see https://trpc.io/docs/procedures
 */
export const protectedProcedure = t.procedure.use(({ ctx, next }) => {
  if (!ctx.session?.user) {
    throw new TRPCError({ code: "UNAUTHORIZED" })
  }
  return next({
    ctx: {
      // infers the `session` as non-nullable
      session: { ...ctx.session, user: ctx.session.user },
    },
  })
})
/**
 * Internal user procedure
 *
 * If you want a query or mutation to ONLY be accessible to the internal users, use this. It verifies
 * the session is valid and guarantees that the caller is the user with the role of 'internal'.
 *
 * @see https://trpc.io/docs/procedures
 **/
export const internalProcedure = t.procedure.use(async ({ ctx, next }) => {
  if (!ctx.session.user?.id) {
    throw new TRPCError({ code: "UNAUTHORIZED" })
  }
  const user = await postgres.query.users.findFirst({
    where(fields, operators) {
      return operators.and(
        operators.eq(fields.id, ctx.session.user?.id ?? ""),
        operators.eq(fields.role, "internal"),
      )
    },
  })
  if (!user) {
    throw new TRPCError({ code: "UNAUTHORIZED" })
  }
  return next({
    ctx: {
      session: { ...ctx.session, user: ctx.session.user },
    },
  })
})

/**
 * Protected (server) procedure
 *
 * This is a set of procedures that are only accessible to the server. It verifies the session is valid and guarantees that the caller is the server.
 *
 * @see https://trpc.io/docs/procedures
 */
export const serverProcedure = t.procedure.use(({ ctx, next }) => {
  if (ctx.serverSecret !== process.env.SERVER_SECRET) {
    throw new TRPCError({ code: "UNAUTHORIZED" })
  }
  return next({
    ctx: {
      // infers the `session` as non-nullable
      session: { ...ctx.session },
    },
  })
})
