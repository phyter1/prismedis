import {
  LoginEmailSchema,
  LoginRegisterSchema,
} from "@prismedis/validators/login-register"

import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc"

export const authRouter = createTRPCRouter({
  getSession: publicProcedure.query(({ ctx }) => {
    return ctx.session
  }),
  getSecretMessage: protectedProcedure.query(() => {
    // testing type validation of overridden next-auth Session in @prismedis/auth package
    return "you can see this secret message!"
  }),
  login: publicProcedure
    .input(LoginRegisterSchema)
    .mutation(({ ctx, input }) => {
      return ctx.auth.login(input)
    }),
  loginEmail: publicProcedure
    .input(LoginEmailSchema)
    .mutation(({ ctx, input }) => {
      console.log(typeof ctx.auth, input)
      return {}
    }),
  register: publicProcedure
    .input(LoginRegisterSchema)
    .mutation(({ ctx, input }) => {
      return ctx.auth.register(input)
    }),
  logout: protectedProcedure.mutation(({ ctx }) => {
    return ctx.auth.logout()
  }),
})
