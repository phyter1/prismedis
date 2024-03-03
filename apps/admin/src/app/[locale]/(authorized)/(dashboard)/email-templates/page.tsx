import Link from "next/link"

import { Button } from "@prismedis/ui/button"

import "@prismedis/ui/card"

import { api } from "@/trpc/server"

export default async function Page() {
  const templates = await api.internal_ui.emailTemplates()
  return (
    <div>
      Email Templates List
      <div>
        {templates.map((t) => {
          const name = `${t.path.split("src/email/templates")[1]}/${t.name.replace(".tsx", "")}`
          const path = name.slice(1)
          return (
            <Button asChild key={path}>
              <Link
                key={path}
                target="_blank"
                rel="noopener noreferrer"
                href={`templates/${path}`}
              >
                {path}
              </Link>
            </Button>
          )
        })}
      </div>
    </div>
  )
}
