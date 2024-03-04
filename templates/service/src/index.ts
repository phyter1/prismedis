import type { Env, Schema } from "hono"
import { createBullBoard } from "@bull-board/api"
import { BullMQAdapter } from "@bull-board/api/bullMQAdapter"
import { HonoAdapter } from "@bull-board/hono"
import { serve } from "@hono/node-server"
import { serveStatic } from "@hono/node-server/serve-static"
import { Queue as QueueMQ, Worker } from "bullmq"
import { Hono } from "hono"
import { showRoutes } from "hono/dev"

const sleep = (t: number) =>
  new Promise((resolve) => setTimeout(resolve, t * 1000))

const host = process.env.REDIS_HOST
const port = parseInt(process.env.REDIS_PORT!)
const username = process.env.REDIS_USERNAME
const password = process.env.REDIS_PASSWORD
if (!host || !port || !username || !password) {
  throw new Error("Missing Redis connection details")
}
const redisOptions = {
  port,
  host,
  username,
  password,
}

const createQueueMQ = (name: string) =>
  new QueueMQ(name, { connection: redisOptions })

// eslint-disable-next-line @typescript-eslint/require-await
async function setupBullMQProcessor(queueName: string) {
  new Worker(
    queueName,
    async (job) => {
      for (let i = 0; i <= 100; i++) {
        await sleep(Math.random())
        await job.updateProgress(i)
        await job.log(`Processing job at interval ${i}`)

        if (Math.random() * 200 < 1) throw new Error(`Random error ${i}`)
      }

      return { jobId: `This is the return value of job (${job.id})` }
    },
    { connection: redisOptions },
  )
}

const run = async () => {
  const exampleBullMq1 = createQueueMQ("BullMQ1")
  const exampleBullMq2 = createQueueMQ("BullMQ2")
  const exampleBullMq3 = createQueueMQ("BullMQ3")

  await setupBullMQProcessor(exampleBullMq1.name)
  await setupBullMQProcessor(exampleBullMq2.name)
  await setupBullMQProcessor(exampleBullMq3.name)

  const app = new Hono()

  const serverAdapter = new HonoAdapter(serveStatic)

  createBullBoard({
    queues: [
      new BullMQAdapter(exampleBullMq1),
      new BullMQAdapter(exampleBullMq2),
      new BullMQAdapter(exampleBullMq3),
    ],
    serverAdapter,
  })

  const basePath = "/ui"
  serverAdapter.setBasePath(basePath)
  app.route(
    basePath,
    serverAdapter.registerPlugin() as unknown as Hono<Env, Schema, string>,
  )

  app.get("/add", async (c) => {
    const queue = c.req.query("queue") as "1" | "2" | "3"
    switch (queue) {
      case "1":
        await exampleBullMq1.add("Add", { title: c.req.query("title") })
        break
      case "2":
        await exampleBullMq2.add("Add", { title: c.req.query("title") })
        break
      case "3":
        await exampleBullMq3.add("Add", { title: c.req.query("title") })
        break
    }

    return c.json({ ok: true })
  })

  showRoutes(app)

  serve({ fetch: app.fetch, port: 8081 }, ({ address, port }) => {
    console.log(`Running on ${address}:${port}...`)
    console.log(`For the UI of instance1, open http://localhost:${port}/ui`)
    console.log("Make sure Redis is running on port 6379 by default")
    console.log("To populate the queue, run:")
    console.log(`  curl http://localhost:${port}/add?title=Example`)
  })
}

run().catch((e) => {
  console.error(e)
  process.exit(1)
})
