import { Queue as QueueMQ } from "bullmq"

const host = process.env.REDIS_HOST
const port = parseInt(process.env.REDIS_PORT!)
const username = process.env.REDIS_USERNAME
const password = process.env.REDIS_PASSWORD
if (!host || !port || !username || !password) {
  throw new Error("Missing Redis connection details")
}
export const redisOptions = {
  port,
  host,
  username,
  password,
}

export const createQueueMQ = (name: string) =>
  new QueueMQ(name, { connection: redisOptions })
