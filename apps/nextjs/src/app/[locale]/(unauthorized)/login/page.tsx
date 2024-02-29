import { providers } from "@prismedis/auth"
import { getI18n } from "@prismedis/locales/server"
import { ActionForm } from "@prismedis/ui/action-form"

export async function generateMetadata() {
  const t = await getI18n()
  return {
    title: t("auth.page_title"),
  }
}

export default async function Page() {
  return (
    <>
      <h1>Login to your account</h1>
      <ActionForm action={providers.email.handleLogin}>
        <label htmlFor="email">Email</label>
        <input type="email" name="email" id="email" />
        <br />
        <label htmlFor="password">Password</label>
        <input type="password" name="password" id="password" />
        <br />
        <button>Continue</button>
      </ActionForm>
    </>
  )
}
