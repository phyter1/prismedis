import { TRPCError } from "@trpc/server"

import { lucia } from "@prismedis/auth"
import { eq, schema } from "@prismedis/db/postgres"
import { DeleteSessionSchema, UpdateProfileSchema } from "@prismedis/validators"

import { basicAuthProcedure, createTRPCRouter } from "../trpc"

export const userRouter = createTRPCRouter({
  profile: basicAuthProcedure.query(({ ctx }) => {
    return ctx.postgres.query.users.findFirst({
      where: eq(schema.users.id, ctx.session.user.id),
    })
  }),
  updateProfile: basicAuthProcedure
    .input(UpdateProfileSchema)
    .mutation(({ ctx, input }) => {
      return ctx.postgres
        .update(schema.users)
        .set(input)
        .where(eq(schema.users.id, ctx.session.user.id))
    }),

  sessions: basicAuthProcedure.query(async ({ ctx }) => {
    return lucia.getUserSessions(ctx.session.user?.id)
  }),

  deleteSession: basicAuthProcedure
    .input(DeleteSessionSchema)
    .mutation(async ({ ctx, input }) => {
      const userSessions = await lucia.getUserSessions(ctx.session.user.id)

      if (userSessions.find((ele) => ele.id === input.sessionId)) {
        return await lucia.invalidateSession(input.sessionId)
      } else {
        throw new TRPCError({ code: "BAD_REQUEST" })
      }
    }),
})
