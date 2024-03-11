import type { Config } from "drizzle-kit"
import * as dotenv from "dotenv"

dotenv.config({ path: "../../.env" })

export default {
  schema: "./src/postgres/schema/**/*.ts",
  out: "./postgres/schema",
  driver: "pg",
  dbCredentials: { connectionString: process.env.NEON_URL! },
  tablesFilter: ["prismedis_*"],
} satisfies Config
