import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "group relative inline-flex shrink-0 items-center justify-center gap-2 overflow-hidden whitespace-nowrap rounded-full text-sm font-semibold " +
    "transition-all duration-300 ease-out will-change-transform active:scale-[0.96] " +
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background " +
    "disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        // glow + kilau yang menyapu saat hover
        default:
          "bg-primary text-primary-foreground shadow-[0_0_0_1px_hsl(var(--primary)/0.5),0_10px_30px_-8px_hsl(var(--primary)/0.6)] " +
          "hover:-translate-y-0.5 hover:shadow-[0_0_0_1px_hsl(var(--primary)/0.7),0_16px_44px_-8px_hsl(var(--primary)/0.8)] " +
          "before:absolute before:inset-0 before:-translate-x-full before:bg-gradient-to-r before:from-transparent before:via-white/40 before:to-transparent " +
          "before:transition-transform before:duration-700 hover:before:translate-x-full",
        glass:
          "glass text-foreground hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-[0_12px_36px_-12px_hsl(var(--primary)/0.45)]",
        outline: "border border-border/20 bg-transparent text-foreground hover:border-primary/50 hover:bg-primary/10",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "text-muted-foreground hover:bg-foreground/[0.07] hover:text-foreground",
        link: "rounded-none text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-11 px-6",
        sm: "h-9 px-4 text-[13px]",
        lg: "h-[52px] px-8 text-[15px]",
        icon: "size-10",
      },
    },
    defaultVariants: { variant: "default", size: "default" },
  }
);

const Button = React.forwardRef(({ className, variant, size, asChild = false, ...props }, ref) => {
  const Comp = asChild ? Slot : "button";
  return <Comp ref={ref} className={cn(buttonVariants({ variant, size }), className)} {...props} />;
});
Button.displayName = "Button";

export { Button, buttonVariants };
