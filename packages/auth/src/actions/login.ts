import { cookies } from "next/headers"
import { db } from "@prismedis/db/mysql"
import { LoginRegisterSchema } from "@prismedis/validators/login-register"
import { Scrypt } from "lucia"

import { lucia } from ".."

export const loginAction = async (formData: LoginRegisterSchema) => {
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
  const user = await db.query.users.findFirst({
    where: (users, { eq }) => {
      return eq(users.email, email)
    },
  })
  const scrypt = new Scrypt()
  const isValid = await scrypt.verify(user?.password ?? "", password)
  if (!isValid || !user) {
    return {
      error: "Invalid email or password",
    }
  }
  const session = await lucia.createSession(user.id, {
    userAgent: "unknown",
    ipAddress: "unknown",
  })
  const sessionCookie = lucia.createSessionCookie(session.id)
  cookies().set(
    sessionCookie.name,
    sessionCookie.value,
    sessionCookie.attributes,
  )
  return { success: true }
}
