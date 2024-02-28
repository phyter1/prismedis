/**
 * Source:
 * - https://v3.lucia-auth.com/database/drizzle
 * - https://v3.lucia-auth.com/guides/oauth/multiple-providers
 */

import { datetime, index, varchar } from "drizzle-orm/mysql-core"

import { mySqlTable } from "./_table"

export const users = mySqlTable(
  "user",
  {
    id: varchar("id", {
      length: 255,
    }).primaryKey(),
    email: varchar("email", { length: 255 }).notNull().unique(),
    name: varchar("name", { length: 255 }),
    password: varchar("password", { length: 255 }),
  },
  (t) => ({
    emailIdx: index("email_idx").on(t.email),
  }),
)

export const sessions = mySqlTable(
  "session",
  {
    id: varchar("id", {
      length: 255,
    }).primaryKey(),
    userId: varchar("user_id", {
      length: 255,
    }).notNull(),
    expiresAt: datetime("expires_at").notNull(),
    userAgent: varchar("user_agent", { length: 255 }),
    ipAddress: varchar("ip_address", { length: 255 }),
  },
  (t) => ({
    userIdx: index("user_idx").on(t.userId),
  }),
)

export const accounts = mySqlTable(
  "account",
  {
    providerId: varchar("provider_id", { length: 255 }).notNull(),
    providerUserId: varchar("provider_user_id", { length: 255 }).notNull(),
    userId: varchar("user_id", {
      length: 255,
    }).notNull(),
  },
  (t) => ({
    userIdx: index("user_idx").on(t.userId),
  }),
)
