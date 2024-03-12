import { TRPCError } from "@trpc/server"

import { t } from "../trpc"

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
