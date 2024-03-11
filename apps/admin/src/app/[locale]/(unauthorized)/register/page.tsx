import { registerAction } from "@prismedis/auth/register"
import { Card, CardContent, CardHeader, CardTitle } from "@prismedis/ui/card"
import { LoginRegisterForm } from "@prismedis/ui/forms/login"

export default async function Page() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Register</CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <LoginRegisterForm action={registerAction} />
      </CardContent>
    </Card>
  )
}
