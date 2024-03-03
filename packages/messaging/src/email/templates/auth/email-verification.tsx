import {
  Body,
  Container,
  Head,
  Html,
  Preview,
  render,
  Section,
  Tailwind,
} from "@react-email/components"

import { APP_TITLE } from "@prismedis/constants"
import tailwindConfig from "@prismedis/tailwind-config"
import { Card, CardContent, CardHeader, CardTitle } from "@prismedis/ui/card"
import { Logo } from "@prismedis/ui/logo"

interface Props {
  name: string
  code: string
}

export const RegistrationVerificationCodeEmail = ({ code, name }: Props) => {
  return (
    <Tailwind config={tailwindConfig}>
      <Html>
        <Head />
        <Preview>
          Verify your email address to complete your {APP_TITLE} registration
        </Preview>
        <Body>
          <Container>
            <Section>
              <Card className="mt-4">
                <CardHeader>
                  <CardTitle className="flex justify-center p-4">
                    <Logo size="xl" appName="" />
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col gap-2">
                    <div className="">Hi {name},</div>
                    <div className="pb-8">
                      Thank you for registering for an account on {APP_TITLE}.
                      To complete our registration, please verify your account
                      by using the following code:
                    </div>
                    {/* <div className="rounded-lg border px-4 py-3 text-center font-mono text-sm">
                      {code}
                    </div> */}
                    <div className="rounded-xl bg-[#0f172a] px-4 py-3 text-center font-mono text-2xl tracking-[2rem] text-[#f8fafc]">
                      {code}
                    </div>
                    <div className="pt-8">Have a nice day!</div>
                  </div>
                </CardContent>
              </Card>
            </Section>
          </Container>
        </Body>
      </Html>
    </Tailwind>
  )
}

export const renderRegistrationVerificationCodeEmail = (props: Props) =>
  render(<RegistrationVerificationCodeEmail {...props} />)
