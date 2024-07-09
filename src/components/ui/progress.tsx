"use client"

import * as React from "react"
import * as ProgressPrimitive from "@radix-ui/react-progress"
import { cn } from "@/lib/utils"

type ProgressProps = React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root> & {
  color?: 'primary' | 'tertiary' | 'quaternary' | 'quinary'
}

const Progress = React.forwardRef<
  React.ElementRef<typeof ProgressPrimitive.Root>,
  ProgressProps
>(({ className, value, color = 'primary', ...props }, ref) => (
  <ProgressPrimitive.Root
    ref={ref}
    className={cn(
      "relative h-2 w-full overflow-hidden rounded-full",
      color === 'primary'
        ? "bg-primary/20"
        : color === 'tertiary'
        ? "bg-tertiary/20"
        : color === 'quaternary'
        ? "bg-quaternary/20"
        : "bg-quinary/20",
      className
    )}
    {...props}
  >
    <ProgressPrimitive.Indicator
      className={cn(
        "h-full w-full flex-1 transition-all",
        color === 'primary'
          ? "bg-primary"
          : color === 'tertiary'
          ? "bg-tertiary"
          : color === 'quaternary'
          ? "bg-quaternary"
          : "bg-quinary"
      )}
      style={{ transform: `translateX(-${100 - (value || 0)}%)` }}
    />
  </ProgressPrimitive.Root>
))
Progress.displayName = ProgressPrimitive.Root.displayName

export { Progress }