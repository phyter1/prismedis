import {
  LoginEmailSchema,
  LoginRegisterSchema,
  LoginVerificationSchema,
} from "@prismedis/validators/login-register"

import { basicAuthProcedure, createTRPCRouter, publicProcedure } from "../trpc"

export const authRouter = createTRPCRouter({
  getSession: publicProcedure.query(({ ctx }) => {
    return ctx.session
  }),
  getSecretMessage: basicAuthProcedure.query(() => {
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
      return ctx.auth.loginEmail(input)
    }),
  loginVerify: publicProcedure
    .input(LoginVerificationSchema)
    .mutation(({ ctx, input }) => {
      console.log("input", input)
      return ctx.auth.loginVerify(input)
    }),
  register: publicProcedure
    .input(LoginRegisterSchema)
    .mutation(({ ctx, input }) => {
      return ctx.auth.register(input)
    }),
  logout: basicAuthProcedure.mutation(({ ctx }) => {
    return ctx.auth.logout()
  }),
})
