import Link from "next/link"
import { redirect } from "next/navigation"
import { SiDiscord, SiGithub } from "@icons-pack/react-simple-icons"
import { auth, providers } from "@prismedis/auth"
import { getI18n } from "@prismedis/locales/server"
import { cn } from "@prismedis/ui"
import { Button } from "@prismedis/ui/button"
import { CommandIcon } from "lucide-react"

export async function generateMetadata() {
  const t = await getI18n()
  return {
    title: t("auth.page_title"),
  }
}

function SigninIcon({
  iconName,
  className,
}: {
  iconName: string
  className?: string
}) {
  switch (iconName) {
    case "github":
      return <SiGithub className={cn("mr-1 h-4 w-4", className)} />
    case "discord":
      return <SiDiscord className={cn("mr-1 h-4 w-4", className)} />
    default:
      return <CommandIcon className={cn("mr-1 h-4 w-4", className)} />
  }
}

export default async function AuthPage() {
  const t = await getI18n()
  const session = await auth()

  if (session.user) {
    redirect("/")
  }

  return (
    <>
      <h1 className="mb-4 text-2xl font-semibold tracking-tight">
        {t("auth.headline")}
      </h1>

      {Object.entries(providers).map(([providerKey, provider], index) => (
        <Button variant="outline" type="button" asChild key={index}>
          <Link
            href={
              providerKey === "email"
                ? `
                      /login`
                : `/api/auth/${providerKey}/login`
            }
            prefetch={false}
          >
            <SigninIcon iconName={providerKey} />
            {provider.name}
          </Link>
        </Button>
      ))}
    </>
  )
}
