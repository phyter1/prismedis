import { Pool } from "@neondatabase/serverless"
import { drizzle } from "drizzle-orm/neon-serverless"

import * as auth from "./schema/auth"

export * from "drizzle-orm"

export const schema = {
  ...auth,
}

const pool = new Pool({
  connectionString: process.env.NEON_URL,
})

export const db = drizzle(pool, { schema })
