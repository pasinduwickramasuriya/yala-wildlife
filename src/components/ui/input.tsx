import * as React from "react"

import { cn } from "@/lib/utils"

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "placeholder:text-[#9aa0a6] text-[#1f1f1f] border-[#dadce0] focus-visible:border-[#1a73e8] focus-visible:ring-2 focus-visible:ring-[#1a73e8]/20 flex h-11 w-full min-w-0 rounded-xl border bg-white px-4 py-2.5 text-base md:text-[15px] transition-colors outline-none disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      {...props}
    />
  )
}

export { Input }
