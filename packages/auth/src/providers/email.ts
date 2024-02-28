import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import { generateId, Scrypt } from "lucia"

import { db, schema } from "@prismedis/db"

import { lucia } from ".."

interface ActionResult {
  error: string
}

export const name = "Email"

export const handleRegister = async (
  _: unknown,
  formData: FormData,
): Promise<ActionResult> => {
  "use server"
  const email = formData.get("email")
  if (
    typeof email !== "string" ||
    // eslint-disable-next-line no-control-regex
    !email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)
  ) {
    return {
      error: "Invalid email",
    }
  }
  const password = formData.get("password")
  const strength =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
  if (typeof password !== "string" || !strength.test(password)) {
    return {
      error: "Invalid password",
    }
  }

  const hashedPassword = await new Scrypt().hash(password)
  const userId = generateId(15)

  // check if user exists

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
      return
    }
    await tx.insert(schema.users).values({
      id: userId,
      email,
      password: hashedPassword,
    })
  })
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
  redirect("/")
}

export const handleLogin = async (
  _: unknown,
  formData: FormData,
): Promise<ActionResult> => {
  "use server"
  const email = formData.get("email")
  if (
    typeof email !== "string" ||
    // eslint-disable-next-line no-control-regex
    !email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)
  ) {
    return {
      error: "Invalid email",
    }
  }
  const password = formData.get("password")
  if (typeof password !== "string") {
    return {
      error: "Invalid password",
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
  redirect("/")
}
