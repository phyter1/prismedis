import { createCaller } from "../index"
import { createTRPCRouter, serverProcedure } from "../trpc"

export const tickRouter = createTRPCRouter({
  tick: serverProcedure.query(async ({ ctx }) => {
    console.log("tick", Date.now())
    // wait 100ms and call self again

    //   await new Promise((resolve) => {
    //     setTimeout(() => {
    //       // call this api route
    //       const caller = createCaller(ctx)
    //       caller.tick.tick().then(resolve).catch(resolve)
    //     }, 1500)
    //   })
  }),
})
