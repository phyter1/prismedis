import { email_templates } from "@prismedis/messaging"

export default async function Page() {
  return (
    <email_templates.RegistrationVerificationCodeEmail
      name="Ryan"
      code="123465"
    />
  )
}
