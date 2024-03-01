"server only"

import { drizzle } from "drizzle-orm/mysql2"
import mysql from "mysql2"

import * as auth from "./schema/auth"
import * as post from "./schema/post"

export const schema = { ...auth, ...post }

export { mySqlTable as tableCreator } from "./schema/_table"

export * from "drizzle-orm"

const connection = mysql.createPool({
  host: process.env.MYSQL_HOST!,
  user: process.env.MYSQL_USERNAME!,
  password: process.env.MYSQL_PASSWORD!,
  database: process.env.MYSQL_NAME!,
  connectionLimit: 2,
  ssl: {
    rejectUnauthorized: true,
  },
})

export const db = drizzle(connection, { schema, mode: "default" })

// const connection = mysql.createConnection({
//   host: process.env.DB_HOST!,
//   user: process.env.DB_USERNAME!,
//   password: process.env.DB_PASSWORD!,
//   database: process.env.DB_NAME!,
// })

// export const db = drizzle(connection.promise(), { schema, mode: "default" })
