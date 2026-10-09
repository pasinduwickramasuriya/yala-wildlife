import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:ring-2 focus-visible:ring-[#1a73e8] active:scale-[0.98]",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:brightness-105",
        destructive:
          "bg-destructive text-white hover:bg-destructive/90 focus-visible:ring-destructive/40",
        outline:
          "border border-[#dadce0] bg-white text-[#1f1f1f] hover:bg-[#f8f9fa] hover:text-black",
        secondary:
          "bg-[#f8f9fa] text-[#1f1f1f] hover:bg-[#f1f3f4]",
        ghost: "hover:bg-[#f8f9fa] text-[#1f1f1f]",
        link: "text-[#1a73e8] underline-offset-4 hover:underline p-0 h-auto",
        success:
          "bg-[#137333] text-white hover:bg-[#0d5926] focus-visible:ring-green-700/40",
      },
      size: {
        default: "h-10 px-5 py-2 has-[>svg]:px-4",
        sm: "h-8 rounded-full gap-1.5 px-3.5 text-xs has-[>svg]:px-3",
        lg: "h-11 rounded-full px-6 text-sm sm:text-base has-[>svg]:px-5",
        icon: "size-10 rounded-full",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  }) {
  const Comp = asChild ? Slot : "button";

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Button, buttonVariants };
