import type { Config } from "drizzle-kit"
import * as dotenv from "dotenv"

dotenv.config({ path: "../../.env" })

const uri = [
  "mysql://",
  process.env.MYSQL_USERNAME,
  ":",
  process.env.MYSQL_PASSWORD,
  "@",
  process.env.MYSQL_HOST,
  ":3306/",
  process.env.MYSQL_NAME,
  '?ssl={"rejectUnauthorized":true}',
].join("")

export default {
  schema: "./src/mysql/schema",
  driver: "mysql2",
  dbCredentials: { uri },
  tablesFilter: ["prismedis_*"],
} satisfies Config
