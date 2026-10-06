import { motion } from "framer-motion";
import { Home, MessageCircle, ShoppingBag } from "lucide-react";
import Ambient from "@/components/Ambient";
import MiniPlayer from "@/components/MiniPlayer";
import WhatsAppFab from "@/components/WhatsAppFab";
import ThemeToggle from "@/components/ThemeToggle";
import { Link, useRouter } from "@/lib/router";
import { LOGO_SRC } from "@/lib/brand";
import { cn } from "@/lib/utils";

export const NAV = [
  { to: "/home", label: "Home", icon: Home },
  { to: "/store", label: "Store", icon: ShoppingBag },
  { to: "/contact", label: "Contact", icon: MessageCircle },
];

function TopBar() {
  const { path } = useRouter();
  const isActive = (to) => path === to || (to === "/store" && path.startsWith("/store/"));
  return (
    <header className="fixed inset-x-0 top-0 z-40">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5">
        <Link to="/home" className="flex items-center gap-2.5" aria-label="Leman — Home">
          <img src={LOGO_SRC} alt="" className="size-9 rounded-xl object-cover object-[50%_25%] ring-1 ring-primary/40" />
          <span className="text-[15px] font-bold tracking-tight">Leman<span className="text-primary">.</span></span>
        </Link>

        {/* desktop: pill navigation */}
        <nav className="glass absolute left-1/2 hidden -translate-x-1/2 items-center gap-1 rounded-full p-1 md:flex" aria-label="Utama">
          {NAV.map(({ to, label }) => (
            <Link key={to} to={to} className={cn("relative rounded-full px-5 py-1.5 text-sm font-semibold transition-colors", isActive(to) ? "text-primary-foreground" : "text-muted-foreground hover:text-foreground")}>
              {isActive(to) && <motion.span layoutId="top-pill" className="absolute inset-0 rounded-full bg-primary shadow-[0_0_20px_-4px_hsl(var(--primary)/0.8)]" transition={{ type: "spring", stiffness: 380, damping: 32 }} />}
              <span className="relative">{label}</span>
            </Link>
          ))}
        </nav>

        <ThemeToggle />
      </div>
    </header>
  );
}

/** Bottom navigation ala iOS dock — hanya di mobile */
function BottomNav() {
  const { path } = useRouter();
  return (
    <nav aria-label="Navigasi utama" className="fixed inset-x-0 bottom-[calc(env(safe-area-inset-bottom)+0.75rem)] z-50 flex justify-center px-6 md:hidden">
      <div className="glass-strong flex w-full max-w-[19rem] items-center justify-between gap-1 rounded-full p-1.5 shadow-[0_12px_40px_-8px_hsl(var(--primary)/0.45)]">
        {NAV.map(({ to, label, icon: Icon }) => {
          const active = path === to || (to === "/store" && path.startsWith("/store/"));
          return (
            <Link key={to} to={to} aria-current={active ? "page" : undefined} className="relative flex flex-1 flex-col items-center gap-0.5 rounded-full py-2 text-[10px] font-semibold">
              {active && <motion.span layoutId="dock-pill" className="absolute inset-0 rounded-full bg-primary/15 ring-1 ring-primary/40 shadow-[0_0_18px_-4px_hsl(var(--primary)/0.7)]" transition={{ type: "spring", stiffness: 400, damping: 30 }} />}
              <Icon className={cn("relative size-5 transition-colors", active ? "text-primary" : "text-muted-foreground")} />
              <span className={cn("relative transition-colors", active ? "text-foreground" : "text-muted-foreground")}>{label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}

export default function Layout({ children }) {
  return (
    <>
      <Ambient />
      <TopBar />
      <div className="min-h-[100svh] pb-32 pt-16 md:pb-16">{children}</div>
      <BottomNav />
      <MiniPlayer />
      <WhatsAppFab />
    </>
  );
}
