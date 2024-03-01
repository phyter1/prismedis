import { MongoClient, ServerApiVersion } from "mongodb"
import Papr from "papr"

export let client: MongoClient

const papr = new Papr()

export const connect = async () => {
  if (!client) {
    client = await MongoClient.connect(process.env.MONGODB_URI!, {
      serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
      },
    })

    papr.initialize(client.db(APP_TITLE))

    await papr.updateSchemas()
  }
}

export const disconnect = async () => {
  await client.close()
}

export default papr
