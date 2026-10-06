import { motion } from "framer-motion";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/components/theme-provider";
import { cn } from "@/lib/utils";

/**
 * Switch light/dark (gaya checkbox-switch Uiverse, versi React + Tailwind).
 * Pilihan disimpan ThemeProvider ke localStorage ("leman_theme").
 */
export default function ThemeToggle({ className }) {
  const { theme, toggleTheme } = useTheme();
  const dark = theme === "dark";
  return (
    <button
      type="button"
      role="switch"
      aria-checked={dark}
      aria-label={dark ? "Ganti ke mode terang" : "Ganti ke mode gelap"}
      onClick={toggleTheme}
      className={cn(
        "glass relative h-8 w-[62px] shrink-0 rounded-full p-0.5 transition-[box-shadow,border-color] duration-500",
        "hover:border-primary/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        dark ? "shadow-[0_0_20px_-6px_hsl(var(--primary)/0.7)]" : "",
        className
      )}
    >
      <Sun aria-hidden="true" className={cn("absolute left-2 top-1/2 size-4 -translate-y-1/2 transition-opacity duration-300", dark ? "text-muted-foreground opacity-60" : "opacity-0")} />
      <Moon aria-hidden="true" className={cn("absolute right-2 top-1/2 size-4 -translate-y-1/2 transition-opacity duration-300", dark ? "opacity-0" : "text-muted-foreground opacity-60")} />
      <motion.span
        aria-hidden="true"
        initial={false}
        animate={{ x: dark ? 30 : 0, rotate: dark ? 360 : 0 }}
        transition={{ type: "spring", stiffness: 420, damping: 28 }}
        className="relative grid size-7 place-items-center rounded-full bg-primary text-primary-foreground shadow-[0_4px_14px_-2px_hsl(var(--primary)/0.8)]"
      >
        {dark ? <Moon className="size-4" /> : <Sun className="size-4" />}
      </motion.span>
    </button>
  );
}
