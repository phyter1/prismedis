import { cookies } from "next/headers"
import { db, schema } from "@prismedis/db/mysql"
import { LoginRegisterSchema } from "@prismedis/validators/login-register"
import { generateId, Scrypt } from "lucia"

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
  } catch {
    return {
      error: "User already exists",
    }
  }
  const session = await lucia.createSession(userId, {
    userAgent: "unknown",
    ipAddress: "unknown",
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
