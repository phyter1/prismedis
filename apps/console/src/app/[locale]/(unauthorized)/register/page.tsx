import { redirect } from "next/navigation"

import type { LoginRegisterSchema } from "@prismedis/validators/login-register"
import { Card, CardContent, CardHeader, CardTitle } from "@prismedis/components/card"
import { LoginRegisterForm } from "@prismedis/components/forms/login"

import { api } from "@/trpc/server"

const action = async (data: LoginRegisterSchema) => {
  "use server"
  const res = await api.auth.register(data)
  if (res.error) {
    return { error: res.error }
  }
  redirect("/")
}

export default async function Page() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Register</CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <LoginRegisterForm action={action} />
      </CardContent>
    </Card>
  )
}
