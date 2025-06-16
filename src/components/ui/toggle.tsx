
import * as React from "react"
import * as TogglePrimitive from "@radix-ui/react-toggle"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const toggleVariants = cva(
  "inline-flex items-center justify-center rounded-full text-sm font-medium ring-offset-background transition-colors hover:bg-muted hover:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=on]:bg-primary data-[state=on]:text-primary-foreground data-[state=off]:bg-input",
  {
    variants: {
      variant: {
        default: "bg-input data-[state=on]:bg-primary",
        outline:
          "border border-input bg-transparent hover:bg-accent hover:text-accent-foreground data-[state=on]:bg-primary data-[state=on]:text-primary-foreground data-[state=on]:border-primary",
      },
      size: {
        default: "h-6 w-11 relative",
        sm: "h-5 w-9 relative", 
        lg: "h-7 w-13 relative",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

const Toggle = React.forwardRef<
  React.ElementRef<typeof TogglePrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof TogglePrimitive.Root> &
    VariantProps<typeof toggleVariants>
>(({ className, variant, size, children, ...props }, ref) => (
  <TogglePrimitive.Root
    ref={ref}
    className={cn(toggleVariants({ variant, size, className }))}
    {...props}
  >
    <div className={cn(
      "pointer-events-none absolute left-0.5 top-0.5 h-5 w-5 rounded-full bg-background shadow-lg ring-0 transition-transform duration-200",
      "data-[state=on]:translate-x-5 data-[state=off]:translate-x-0",
      size === "sm" && "h-4 w-4 data-[state=on]:translate-x-4",
      size === "lg" && "h-6 w-6 data-[state=on]:translate-x-6"
    )} />
    <span className="sr-only">{children}</span>
  </TogglePrimitive.Root>
))

Toggle.displayName = TogglePrimitive.Root.displayName

export { Toggle, toggleVariants }
