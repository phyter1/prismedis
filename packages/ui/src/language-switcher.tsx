import { Suspense } from "react"

import { ChangeLocaleButton } from "./change-language-button"

export function LanguageSwitcher() {
  return (
    <Suspense>
      <ChangeLocaleButton />
    </Suspense>
  )
}
