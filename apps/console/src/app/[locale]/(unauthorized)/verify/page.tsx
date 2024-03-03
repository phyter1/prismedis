import { getI18n } from "@prismedis/locales/server"
import { Card, CardContent, CardHeader, CardTitle } from "@prismedis/ui/card"
import { VerifyCodeForm } from "@prismedis/ui/verify-code-form"

import { api } from "@/trpc/server"

export async function generateMetadata() {
  const t = await getI18n()
  return {
    title: t("auth.page_title"),
  }
}
const action = async (data: { code: string }) => {
  "use server"
  console.log("data", data)
  return api.auth.loginVerify({
    code: data.code,
  })
}
export default async function Page() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Verify Code</CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <VerifyCodeForm action={action} />
      </CardContent>
    </Card>
  )
}
