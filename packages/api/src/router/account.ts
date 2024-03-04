import { createTRPCRouter, internalProcedure } from "../trpc"

export const authRouter = createTRPCRouter({
  getAccounts: internalProcedure.query(async ({ ctx }) => {
    const accounts = await ctx.mysql.query.accounts.findMany()
    return accounts
  }),
})
