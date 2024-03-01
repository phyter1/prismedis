import { lucia } from "@prismedis/auth"
import { eq, schema } from "@prismedis/db/mysql"
import { DeleteSessionSchema, UpdateProfileSchema } from "@prismedis/validators"
import { TRPCError } from "@trpc/server"

import { createTRPCRouter, protectedProcedure } from "../trpc"

export const userRouter = createTRPCRouter({
  profile: protectedProcedure.query(({ ctx }) => {
    return ctx.mysql.query.users.findFirst({
      where: eq(schema.users.id, ctx.session.user.id),
    })
  }),
  updateProfile: protectedProcedure
    .input(UpdateProfileSchema)
    .mutation(({ ctx, input }) => {
      return ctx.mysql
        .update(schema.users)
        .set(input)
        .where(eq(schema.users.id, ctx.session.user.id))
    }),

  sessions: protectedProcedure.query(async ({ ctx }) => {
    return lucia.getUserSessions(ctx.session.user?.id)
  }),

  deleteSession: protectedProcedure
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
