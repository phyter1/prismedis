import { cookies, headers } from "next/headers"
import { Scrypt } from "lucia"

import { db as mongodb } from "@prismedis/db/mongodb"
import { db as mysql } from "@prismedis/db/mysql"
import { email as emailer } from "@prismedis/messaging"
import {
  LoginEmailSchema,
  LoginRegisterSchema,
  LoginVerificationSchema,
} from "@prismedis/validators/login-register"

import { lucia } from ".."
import { renderLoginVerificationCodeEmail } from "../../../messaging/src/email/templates"

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
  const session = await lucia.createSession(user.id, {
    userAgent,
    ipAddress,
    userRole: user.role,
  })
  const sessionCookie = lucia.createSessionCookie(session.id)
  cookies().set(
    sessionCookie.name,
    sessionCookie.value,
    sessionCookie.attributes,
  )
  return { success: true }
}

export const loginEmailAction = async ({ email }: { email: string }) => {
  "use server"
  console.log("email", email)
  if (!email) {
    return {
      error: "Invalid email",
    }
  }
  const result = LoginEmailSchema.safeParse({
    email,
  })
  if (!result.success) {
    console.log("result.error", result.error)
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
    notificationMethod: "email",
    user: user.id,
    // random 6 digit number
    code: Math.floor(100000 + Math.random() * 900000) + "",
  })
  // SEND THE VALIDATION CODE VIA EMAIL
  await emailer.sendMail({
    from: "no_reply@phytertek.com",
    to: user.email,
    subject: "Prismedis Login Verification Code",
    text: `Your verification code is ${validation.code}`,
    html: renderLoginVerificationCodeEmail({ name: "", code: validation.code }),
  })
  cookies().set("prismedis-verification-id", validation._id.toString())
  return { success: true }
}

export const loginVerificationAction = async ({ code }: { code: string }) => {
  "use server"
  if (!code) {
    return {
      error: "Invalid code",
    }
  }
  const result = LoginVerificationSchema.safeParse({
    code,
  })
  if (!result.success) {
    const error = result.error.format()
    return {
      error: error.code?._errors?.[0] ?? "Invalid code",
    }
  }
  const verificationId = cookies().get("prismedis-verification-id")
  const verification = await mongodb.verification.findOne({
    _id: new mongodb.ObjectId(verificationId?.value),
    code,
  })
  if (!verification) {
    return {
      error: "Invalid code",
    }
  }
  const user = await mysql.query.users.findFirst({
    where(fields, { eq }) {
      return eq(fields.id, verification.user)
    },
  })
  if (!user) {
    return {
      error: "Invalid user",
    }
  }
  // DELETE THE VALIDATION RECORD
  await mongodb.verification.deleteOne({
    _id: verification._id,
  })
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
  // CREATE A SESSION
  const session = await lucia.createSession(verification.user, {
    userAgent,
    ipAddress,
    userRole: user.role,
  })
  const sessionCookie = lucia.createSessionCookie(session.id)
  cookies().set(
    sessionCookie.name,
    sessionCookie.value,
    sessionCookie.attributes,
  )
  return { success: true }
}
