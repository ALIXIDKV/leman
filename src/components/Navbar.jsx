import { useEffect, useState } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { Menu, Home, User, Store, Send, ArrowUpRight } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa6";
import { NavigationMenu, NavigationMenuItem, NavigationMenuLink, NavigationMenuList } from "@/components/ui/navigation-menu";
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import ThemeCharacterToggle from "@/components/ThemeCharacterToggle";
import { LOGO_SRC } from "@/lib/brand";
import { SITE } from "@/lib/config";
import { cn, waLink } from "@/lib/utils";

export const NAV_ITEMS = [
  { id: "home", label: "Home", icon: Home },
  { id: "about", label: "About", icon: User },
  { id: "market", label: "Market", icon: Store },
  { id: "contact", label: "Contact", icon: Send },
];

function goTo(e, id) {
  e?.preventDefault();
  const el = id === "home" ? null : document.getElementById(id);
  if (id === "home") window.scrollTo({ top: 0, behavior: "smooth" });
  else el?.scrollIntoView({ behavior: "smooth", block: "start" });
  history.replaceState(null, "", id === "home" ? window.location.pathname : `#${id}`);
}

function useScrollSpy() {
  const [active, setActive] = useState("home");
  useEffect(() => {
    const els = NAV_ITEMS.map((n) => document.getElementById(n.id)).filter(Boolean);
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: "-45% 0px -50% 0px" }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
  return active;
}

export default function Navbar() {
  const active = useScrollSpy();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 28, mass: 0.3 });

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 16);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

  return (
    <>
      <motion.div style={{ scaleX: progress }} className="fixed inset-x-0 top-0 z-[60] h-[2px] origin-left bg-primary shadow-[0_0_12px_hsl(var(--primary))]" />
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="fixed inset-x-0 top-0 z-50 px-3 pt-[calc(env(safe-area-inset-top)+0.75rem)] sm:px-5"
      >
        <div
          className={cn(
            "mx-auto flex h-14 max-w-5xl items-center gap-2 rounded-full px-2 pr-2 transition-all duration-500 sm:pl-3",
            scrolled ? "glass-strong" : "border border-transparent bg-transparent"
          )}
        >
          <a href="/" onClick={(e) => goTo(e, "home")} aria-label={SITE.siteName} className="mr-auto flex items-center gap-2.5 rounded-full pr-2">
            <img src={LOGO_SRC} alt="" className="size-10 rounded-full object-cover object-[50%_30%] ring-1 ring-foreground/15" />
            <span className="font-serif text-[26px] italic leading-none tracking-tight">Leman</span>
          </a>

          <NavigationMenu className="hidden md:flex">
            <NavigationMenuList>
              {NAV_ITEMS.map((n) => (
                <NavigationMenuItem key={n.id}>
                  <NavigationMenuLink asChild active={active === n.id}>
                    <a
                      href={`#${n.id}`}
                      onClick={(e) => goTo(e, n.id)}
                      className={cn(
                        "relative rounded-full px-4 py-2 text-sm font-medium transition-colors duration-300",
                        active === n.id ? "text-foreground" : "text-muted-foreground hover:text-foreground"
                      )}
                    >
                      {active === n.id && (
                        <motion.span
                          layoutId="nav-pill"
                          transition={{ type: "spring", stiffness: 420, damping: 34 }}
                          className="absolute inset-0 -z-10 rounded-full bg-foreground/[0.08] ring-1 ring-inset ring-foreground/10"
                        />
                      )}
                      {n.label}
                    </a>
                  </NavigationMenuLink>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>

          <ThemeCharacterToggle />

          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button variant="glass" size="icon" className="md:hidden" aria-label="Buka menu">
                <Menu />
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <SheetHeader>
                <SheetTitle className="font-serif text-3xl font-normal italic">Leman</SheetTitle>
                <SheetDescription>{SITE.tagline}</SheetDescription>
              </SheetHeader>
              <nav className="mt-4 flex flex-col gap-1.5">
                {NAV_ITEMS.map((n, i) => (
                  <SheetClose asChild key={n.id}>
                    <motion.a
                      initial={{ opacity: 0, x: 24 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.12 + i * 0.06, duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                      href={`#${n.id}`}
                      onClick={(e) => {
                        e.preventDefault();
                        window.setTimeout(() => goTo(null, n.id), 350); // tunggu sheet menutup
                      }}
                      className={cn(
                        "flex items-center gap-4 rounded-2xl px-4 py-4 text-lg font-semibold transition-colors active:scale-[0.98]",
                        active === n.id ? "bg-primary/15 text-primary" : "text-foreground/80 hover:bg-foreground/[0.06]"
                      )}
                    >
                      <n.icon className="size-5" />
                      {n.label}
                    </motion.a>
                  </SheetClose>
                ))}
              </nav>
              <Button asChild size="lg" className="mt-auto w-full">
                <a href={waLink()} target="_blank" rel="noopener noreferrer">
                  <FaWhatsapp className="!size-5" />
                  Chat WhatsApp
                  <ArrowUpRight />
                </a>
              </Button>
            </SheetContent>
          </Sheet>
        </div>
      </motion.header>
    </>
  );
}
