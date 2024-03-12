import { Oxanium } from "next/font/google"
import { IoPrismSharp } from "react-icons/io5"

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
      <IoPrismSharp
        className={cn("h-5 w-5 text-primary", {
          "h-6 w-6": size === "md",
          "h-8 w-8": size === "lg",
          "h-10 w-10": size === "xl",
        })}
      />
      <h1
        className={cn(oxanium.className, "text-xl font-light tracking-tight", {
          "text-2xl": size === "md",
          "pt-1.5 text-3xl": size === "lg",
          "pt-2 text-4xl": size === "xl",
        })}
      >
        Prismedis <span className="font-semibold">{appName}</span>
      </h1>
    </div>
  )
}
