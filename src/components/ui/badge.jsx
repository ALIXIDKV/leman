import * as React from "react";
import { cva } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-[11px] font-semibold tracking-wide transition-colors",
  {
    variants: {
      variant: {
        default: "bg-primary/15 text-primary ring-1 ring-inset ring-primary/30",
        secondary: "bg-secondary text-secondary-foreground",
        outline: "text-muted-foreground ring-1 ring-inset ring-border/20",
        glass: "glass text-foreground/80",
      },
    },
    defaultVariants: { variant: "default" },
  }
);

function Badge({ className, variant, ...props }) {
  return <span className={cn(badgeVariants({ variant }), className)} {...props} />;
}

export { Badge, badgeVariants };
