import { cookies } from "next/headers"
import { Scrypt } from "lucia"

import { db as mongodb } from "@prismedis/db/mongodb"
import { db as mysql } from "@prismedis/db/mysql"
import { email as emailer } from "@prismedis/messaging"
import { LoginRegisterSchema } from "@prismedis/validators/login-register"

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
  const user = await mysql.query.users.findFirst({
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

export const loginEmailAction = async (email: string) => {
  "use server"
  if (!email) {
    return {
      error: "Invalid email",
    }
  }
  const result = LoginRegisterSchema.safeParse({
    email,
  })
  if (!result.success) {
    const error = result.error.format()
    return {
      error: error.email?._errors?.[0] ?? "Invalid email",
    }
  }
  const user = await mysql.query.users.findFirst({
    where: (users, { eq }) => {
      return eq(users.email, email)
    },
  })
  if (!user) {
    return {
      error: "Invalid email",
    }
  }
  // CREATE A VALIDATION RECORD
  const validation = await mongodb.verification.insertOne({
    type: "login",
    user: user.id,
    // random 6 digit number
    code: Math.floor(100000 + Math.random() * 900000) + "",
  })
  // SEND THE VALIDATION CODE VIA EMAIL
  await emailer.sendMail({
    from: "no_reply@phytertek.com",
    to: user.email,
    subject: "Login Verification Code",
    text: `Your verification code is ${validation.code}`,
    html: `Your verification code is <strong>${validation.code}</strong>`,
  })
}
