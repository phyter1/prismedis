/**
 * Source:
 * - https://v3.lucia-auth.com/database/drizzle
 * - https://v3.lucia-auth.com/guides/oauth/multiple-providers
 */

import {
  index,
  jsonb,
  pgEnum,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core"
import { createInsertSchema, createSelectSchema } from "drizzle-zod"

import {
  EmailSchema,
  PasswordSchema,
} from "@prismedis/validators/login-register"

import { pgTable } from "./_table"

export const UserRole = pgEnum("user_role", ["user", "internal"])

export const users = pgTable(
  "user",
  {
    id: varchar("id", {
      length: 255,
    }).primaryKey(),
    email: varchar("email", { length: 255 }).notNull().unique(),
    phone: varchar("phone", { length: 32 }).unique(),
    name: varchar("name", { length: 255 }),
    password: varchar("password", { length: 512 }),
    role: UserRole("user_role"),
    profile: jsonb("profile")
      .$type<{ avatar: string }>()
      .notNull()
      .default({ avatar: "" }),
    preferences: jsonb("preferences")
      .$type<{ preferredContactMethod: "email" | "sms" }>()
      .notNull()
      .default({
        preferredContactMethod: "email",
      }),
  },
  (t) => ({
    emailIdx: index("user_email_index").on(t.email),
  }),
)

export const insertUserSchema = createInsertSchema(users, {
  email: EmailSchema,
  password: PasswordSchema,
})
export const selectUserSchema = createSelectSchema(users, {
  email: EmailSchema,
})

export const sessions = pgTable(
  "session",
  {
    id: varchar("id", {
      length: 255,
    }).primaryKey(),
    userId: varchar("user_id", {
      length: 255,
    }).notNull(),
    expiresAt: timestamp("expires_at", {
      precision: 6,
      withTimezone: true,
    }),
    userAgent: varchar("user_agent", { length: 255 }),
    ipAddress: varchar("ip_address", { length: 255 }),
    userRole: UserRole("user_role").notNull(),
  },
  (t) => ({
    userIdx: index("session_user_index").on(t.userId),
  }),
)

export const insertSessionSchema = createInsertSchema(sessions)
export const selectSessionSchema = createSelectSchema(sessions)

export const InternalUserRole = pgEnum("internal_user_role", [
  "admin",
  "dev",
  "design",
  "product",
  "qa",
  "support",
  "marketing",
  "executive",
])

export const internalUsers = pgTable(
  "internal_user",
  {
    id: varchar("id", { length: 255 }).primaryKey(),
    userId: varchar("user_id", { length: 255 }).notNull(),
    role: InternalUserRole("internal_user_role"),
    accountsManaged: jsonb("accounts_managed")
      .$type<{ accountId: string }[]>()
      .default([]),
  },
  (t) => ({
    userIdx: index("internal_user_user_index").on(t.userId),
  }),
)

export const insertInternalUserSchema = createInsertSchema(internalUsers)
export const selectInternalUserSchema = createSelectSchema(internalUsers)

export const accounts = pgTable(
  "account",
  {
    id: varchar("id", { length: 255 }).primaryKey(),
    ownerUserId: varchar("user_id", {
      length: 255,
    }).notNull(),
    name: varchar("name", { length: 255 }).notNull(),
    description: text("description"),
  },
  (t) => ({
    ownerUserIdx: index("account_owner_user_index").on(t.ownerUserId),
  }),
)

export const insertAccountSchema = createInsertSchema(accounts)
export const selectAccountSchema = createSelectSchema(accounts)

export const accountUsers = pgTable(
  "account_user",
  {
    id: varchar("id", {
      length: 255,
    }).primaryKey(),
    accountId: varchar("account_id", {
      length: 255,
    }).notNull(),
    userId: varchar("user_id", {
      length: 255,
    }).notNull(),
    role: UserRole("user_role"),
  },
  (t) => ({
    accountUserIdx: index("account_user_account_user_index").on(
      t.accountId,
      t.userId,
    ),
  }),
)

export const insertAccountUserSchema = createInsertSchema(accountUsers)
export const selectAccountUserSchema = createSelectSchema(accountUsers)
