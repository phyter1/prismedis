import { redirect } from "next/navigation"

import { getI18n } from "@prismedis/locales/server"
import { Card, CardContent, CardHeader, CardTitle } from "@prismedis/ui/card"
import { LoginRegisterForm } from "@prismedis/ui/forms/login"

import { api } from "@/trpc/server"

export async function generateMetadata() {
  const t = await getI18n()
  return {
    title: t("auth.page_title"),
  }
}
const action = async (data: { email: string; password: string }) => {
  "use server"
  const res = await api.auth.loginEmail({
    email: data.email,
  })
  if (res.error) {
    return { error: res.error }
  }
  redirect("/verify")
}
export default async function Page() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Log in</CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <LoginRegisterForm action={action} />
      </CardContent>
    </Card>
  )
}