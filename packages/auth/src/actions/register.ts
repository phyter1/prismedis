import { cookies, headers } from "next/headers"
import { generateId, Scrypt } from "lucia"

import { db, schema } from "@prismedis/db/postgres"
import { LoginRegisterSchema } from "@prismedis/validators/login-register"

import { lucia } from ".."

export const registerAction = async (formData: LoginRegisterSchema) => {
  "use server"
  const { email, password } = formData
  if (!email || !password) {
    return {
      error: "Invalid email or password",
    }
  }
  const result = LoginRegisterSchema.safeParse({
    email,
    password,
  })
  if (!result.success) {
    const error = result.error.format()
    return {
      error:
        error.email?._errors?.[0] ??
        error.password?._errors?.[0] ??
        "Invalid email or password",
    }
  }

  const hashedPassword = await new Scrypt().hash(password)
  const userId = generateId(15)

  // check if user exists

  try {
    await db.transaction(async (tx) => {
      const existingUser = await tx.query.users.findFirst({
        columns: {
          id: true,
        },
        where: (users, { eq }) => {
          return eq(users.email, email)
        },
      })
      if (existingUser) {
        throw new Error()
      }
      await tx.insert(schema.users).values({
        id: userId,
        email,
        password: hashedPassword,
      })
    })
  } catch (err) {
    console.log("User insert error")
    console.log(err)
    return {
      error: "User already exists",
    }
  }
  const user = await db.query.users.findFirst({
    where: (users, { eq }) => {
      return eq(users.id, userId)
    },
  })
  if (!user) {
    return {
      error: "User not found",
    }
  }
  const header = headers()
  const ipAddress =
    header.get("x-real-ip") ??
    header.get("x-forwarded-for") ??
    header.get("cf-connecting-ip") ??
    header.get("fastly-client-ip") ??
    header.get("true-client-ip") ??
    header.get("x-client-ip") ??
    header.get("x-cluster-client-ip") ??
    header.get("x-forwarded") ??
    header.get("forwarded-for") ??
    header.get("forwarded") ??
    header.get("via") ??
    "unknown"
  const userAgent = header.get("user-agent") ?? "unknown"
  const session = await lucia.createSession(userId, {
    userRole: user?.role ?? "user",
    userAgent,
    ipAddress,
  })
  const sessionCookie = lucia.createSessionCookie(session.id)
  cookies().set(
    sessionCookie.name,
    sessionCookie.value,
    sessionCookie.attributes,
  )
  return {
    success: true,
  }
}
