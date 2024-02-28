import { Oxanium } from "next/font/google"
import { SiPrisma } from "react-icons/si"

import { cn } from "./index"

const oxanium = Oxanium({
  subsets: ["latin"],
})
export const Logo = () => {
  return (
    <div className="flex items-center gap-1 sm:gap-2">
      <SiPrisma className="h-4 w-4 text-primary sm:h-6 sm:w-6" />
      <h1
        className={cn(
          oxanium.className,
          "text-xl font-light tracking-tight sm:text-3xl",
        )}
      >
        Prismedis
      </h1>
      <h1
        className={cn(
          oxanium.className,
          "text-xl font-semibold tracking-tight sm:text-3xl",
        )}
      >
        Console
      </h1>
    </div>
  )
}
