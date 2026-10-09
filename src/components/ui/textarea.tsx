import * as React from "react"

import { cn } from "@/lib/utils"

function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        "placeholder:text-[#9aa0a6] text-[#1f1f1f] border-[#dadce0] focus-visible:border-[#1a73e8] focus-visible:ring-2 focus-visible:ring-[#1a73e8]/20 flex min-h-24 w-full rounded-xl border bg-white p-4 text-base md:text-[15px] transition-colors outline-none disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      {...props}
    />
  )
}

export { Textarea }
