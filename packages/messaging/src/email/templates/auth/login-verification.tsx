import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Preview,
  render,
  Row,
  Section,
  Tailwind,
  Text,
} from "@react-email/components"

import { APP_TITLE } from "@prismedis/constants"
import tailwindConfig from "@prismedis/tailwind-config"

interface Props {
  name: string
  code: string
}

export const LoginVerificationCodeEmail = ({ code, name }: Props) => {
  return (
    <Html>
      <Head />
      <Preview>
        Verify your email address to complete your {APP_TITLE} login
      </Preview>

      <Tailwind config={tailwindConfig}>
        <Body className="bg-[#f8fafc]">
          <Container className="mt-10 border bg-white">
            <Heading className="py-4 text-center font-mono text-3xl tracking-wide">
              Prismedis
            </Heading>
            <Section>
              <Row>
                <Text className="px-4 text-base">Hi, {name}</Text>
              </Row>
              <Row>
                <Text className="px-4 text-base">
                  Thank you for logging into your account on {APP_TITLE}. To
                  complete our login, please verify your account by using the
                  following code:
                </Text>
              </Row>
              <Row>
                <Text className="bg-[#0f172a] px-4 py-3 text-center font-mono text-2xl tracking-[2rem] text-[#f8fafc]">
                  {code}
                </Text>
              </Row>
              <Row>
                <div className="px-4 py-8 text-base">Have a nice day!</div>
              </Row>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  )
}

export const renderLoginVerificationCodeEmail = (props: Props) =>
  render(<LoginVerificationCodeEmail {...props} />)
