import { authRouter } from "./router/auth"
import { postRouter } from "./router/post"
import { tickRouter } from "./router/tick"
import { userRouter } from "./router/user"
import { createTRPCRouter } from "./trpc"

export const appRouter = createTRPCRouter({
  auth: authRouter,
  post: postRouter,
  user: userRouter,
  tick: tickRouter,
})

// export type definition of API
export type AppRouter = typeof appRouter
