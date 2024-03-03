import Link from "next/link"
import { redirect } from "next/navigation"

import { getI18n } from "@prismedis/locales/server"
import { Button } from "@prismedis/ui/button"
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
  const res = await api.auth.login({
    email: data.email,
    password: data.password,
  })
  if (res.error) {
    return { error: res.error }
  }
  redirect("/")
}
export default async function Page() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Log in</CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <LoginRegisterForm action={action} />
        <div className="mt-4 flex items-center text-gray-500">
          <div className="h-[1px] flex-1 bg-gray-200" />
          <p className="mx-4 text-xs">or</p>
          <div className="h-[1px] flex-1 bg-gray-200" />
        </div>
        <Button asChild className="w-full text-xs text-gray-500" variant="link">
          <Link href="/login-email">Log in with email only</Link>
        </Button>
      </CardContent>
    </Card>
  )
}
