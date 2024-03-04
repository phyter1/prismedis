/**
 * Source:
 * - https://v3.lucia-auth.com/database/drizzle
 * - https://v3.lucia-auth.com/guides/oauth/multiple-providers
 */

import {
  datetime,
  index,
  json,
  mysqlEnum,
  varchar,
} from "drizzle-orm/mysql-core"

import { mySqlTable } from "./_table"

export const users = mySqlTable(
  "user",
  {
    id: varchar("id", {
      length: 255,
    }).primaryKey(),
    email: varchar("email", { length: 255 }).notNull().unique(),
    phone: varchar("phone", { length: 255 }).unique(),
    name: varchar("name", { length: 255 }),
    password: varchar("password", { length: 255 }),
    role: mysqlEnum("role", ["user", "admin", "internal"])
      .notNull()
      .default("user"),
    profile: json("profile")
      .$type<{ avatar: string }>()
      .notNull()
      .default({ avatar: "" }),
    preferences: json("preferences")
      .$type<{ preferredContactMethod: "email" | "sms" }>()
      .notNull()
      .default({
        preferredContactMethod: "email",
      }),
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
    userRole: mysqlEnum("user_role", ["user", "admin", "internal"]),
  },
  (t) => ({
    userIdx: index("user_idx").on(t.userId),
  }),
)

export const internalUsers = mySqlTable(
  "internal_user",
  {
    id: varchar("id", { length: 255 }).primaryKey(),
    userId: varchar("user_id", { length: 255 }).notNull(),
    role: mysqlEnum("role", [
      "admin",
      "dev",
      "design",
      "product",
      "qa",
      "support",
      "marketing",
      "executive",
    ]).notNull(),
    accountsManaged: json("accounts_managed")
      .$type<{ accountId: string }[]>()
      .default([]),
  },
  (t) => ({
    userIdx: index("user_idx").on(t.userId),
  }),
)

export const accounts = mySqlTable(
  "account",
  {
    ownerUserId: varchar("user_id", {
      length: 255,
    }).notNull(),
    name: varchar("name", { length: 255 }).notNull(),
    description: varchar("description", { length: 255 }),
  },
  (t) => ({
    ownerUserIdx: index("user_idx").on(t.ownerUserId),
  }),
)

export const accountUsers = mySqlTable(
  "account_user",
  {
    accountId: varchar("account_id", {
      length: 255,
    }).notNull(),
    userId: varchar("user_id", {
      length: 255,
    }).notNull(),
    role: mysqlEnum("role", ["user", "admin"]).notNull().default("user"),
  },
  (t) => ({
    accountUserIdx: index("account_user_idx").on(t.accountId, t.userId),
  }),
)
