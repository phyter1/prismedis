import { cn } from "@prismedis/ui"
import { CommandIcon } from "lucide-react"

export function Logo({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "relative flex items-center text-lg font-medium",
        className,
      )}
    >
      <CommandIcon className="mr-1" />
      prismedis Inc
    </div>
  )
}
