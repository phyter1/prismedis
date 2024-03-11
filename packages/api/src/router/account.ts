import { createTRPCRouter, internalProcedure } from "../trpc"

export const authRouter = createTRPCRouter({
  getAccounts: internalProcedure.query(async ({ ctx }) => {
    const accounts = await ctx.postgres.query.accounts.findMany()
    return accounts
  }),
})
