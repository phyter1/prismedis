import { providers } from "@prismedis/auth"
import { ActionForm } from "@prismedis/ui/action-form"

export default async function Page() {
  return (
    <>
      <h1>Create an account</h1>
      <ActionForm action={providers.email.handleRegister}>
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
