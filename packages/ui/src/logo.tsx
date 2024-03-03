import { Oxanium } from "next/font/google"
import { SiPrisma } from "react-icons/si"

import { cn } from "./index"

const oxanium = Oxanium({
  subsets: ["latin"],
})
export const Logo = ({
  appName,
  size = "sm",
}: {
  appName: string
  size: "sm" | "md" | "lg" | "xl"
}) => {
  return (
    <div
      className={cn("flex items-center gap-1", {
        "gap-1.5": size === "md",
        "gap-2": size === "lg",
        "gap-3": size === "xl",
      })}
    >
      <SiPrisma
        className={cn("h-5 w-5 text-primary", {
          "h-6 w-6": size === "md",
          "h-8 w-8": size === "lg",
          "h-10 w-10": size === "xl",
        })}
      />
      <h1
        className={cn(
          oxanium.className,
          "pt-1 text-xl font-light tracking-tight",
          {
            "text-2xl": size === "md",
            "pt-1.5 text-3xl": size === "lg",
            "pt-2 text-4xl": size === "xl",
          },
        )}
      >
        Prismedis
      </h1>
      <h1
        className={cn(
          oxanium.className,
          "pt-1 text-xl font-semibold tracking-tight",
          {
            "text-2xl": size === "md",
            "pt-1.5 text-3xl": size === "lg",
            "pt-2 text-4xl": size === "xl",
          },
        )}
      >
        {appName}
      </h1>
    </div>
  )
}
