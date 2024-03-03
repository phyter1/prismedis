import { authRouter } from "./router/auth"
import { internalUIRouter } from "./router/internal/ui"
import { postRouter } from "./router/post"
import { userRouter } from "./router/user"
import { createTRPCRouter } from "./trpc"

export const appRouter = createTRPCRouter({
  auth: authRouter,
  post: postRouter,
  user: userRouter,
  internal_ui: internalUIRouter,
})

// export type definition of API
export type AppRouter = typeof appRouter
