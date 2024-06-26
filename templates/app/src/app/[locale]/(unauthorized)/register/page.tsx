import { providers } from "@prismedis/auth"
import { Card, CardContent, CardHeader, CardTitle } from "@prismedis/components/card"
import { LoginRegisterForm } from "@prismedis/components/forms/login"

export default async function Page() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Register</CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <LoginRegisterForm action={providers.email.registerAction} />
      </CardContent>
    </Card>
  )
}
