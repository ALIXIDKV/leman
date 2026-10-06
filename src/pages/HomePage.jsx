import { useEffect, useRef, useState } from "react";
import { animate, motion, useInView, useReducedMotion } from "framer-motion";
import { ArrowRight, BadgeCheck, Clapperboard, Layers, Megaphone, MonitorSmartphone, PenTool, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Reveal from "@/components/Reveal";
import Songs from "@/components/Songs";
import { Link } from "@/lib/router";
import { LOGO_SRC } from "@/lib/brand";

const STATS = [
  { to: 3, suffix: "+", label: "Years" },
  { to: 50, suffix: "+", label: "Projects" },
  { to: 100, suffix: "%", label: "Commitment" },
];
const ROLES = ["Creative Designer", "Editor", "Digital Creator"];
const SKILLS = [
  { label: "Graphic Design", icon: PenTool },
  { label: "UI Design", icon: MonitorSmartphone },
  { label: "Video Editing", icon: Clapperboard },
  { label: "Marketing", icon: Megaphone },
];
const ACHIEVEMENTS = ["Moderator komunitas Ourin", "Fighter Taekwondo", "50+ proyek diselesaikan", "Komitmen & amanah"];

function CountUp({ to, suffix }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const [v, setV] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const c = animate(0, to, { duration: 1.5, ease: [0.22, 1, 0.36, 1], onUpdate: (l) => setV(Math.round(l)) });
    return () => c.stop();
  }, [inView, to]);
  return <span ref={ref}>{v}{suffix}</span>;
}

const up = (d) => ({ initial: { opacity: 0, y: 22 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.8, delay: d, ease: [0.22, 1, 0.36, 1] } });

function Hero() {
  const reduce = useReducedMotion();
  return (
    <section className="relative mx-auto grid max-w-6xl items-center gap-10 px-5 pb-14 pt-10 lg:min-h-[calc(100svh-4rem)] lg:grid-cols-[1.2fr_1fr] lg:pt-0">
      <div className="relative z-10">
        <motion.span {...up(0.05)} className="eyebrow">Leman Creative Studio</motion.span>
        <motion.h1 {...up(0.15)} className="mt-5 text-[clamp(4rem,17vw,9rem)] font-extrabold leading-[0.9] tracking-[-0.05em]">
          <span className="text-gradient">Leman</span>
        </motion.h1>
        <motion.p {...up(0.3)} className="mt-4 text-xl font-semibold tracking-tight sm:text-2xl">
          Creative Designer <span className="font-serif font-normal italic text-primary">&amp;</span> Digital Creator
        </motion.p>
        <motion.p {...up(0.4)} className="mt-4 max-w-md text-[15px] leading-relaxed text-muted-foreground">
          Desain, editing, dan produk digital premium — dari logo sampai script bot — dalam satu studio.
        </motion.p>
        <motion.div {...up(0.5)} className="mt-8 flex flex-wrap gap-3">
          <Button asChild size="lg">
            <Link to="/store">Buka Store <ArrowRight className="transition-transform group-hover:translate-x-1" /></Link>
          </Button>
          <Button size="lg" variant="glass" onClick={() => document.getElementById("portfolio")?.scrollIntoView({ behavior: reduce ? "auto" : "smooth" })}>
            Lihat Portfolio
          </Button>
        </motion.div>
        <motion.dl {...up(0.65)} className="glass mt-10 inline-flex gap-7 rounded-3xl px-6 py-4 sm:gap-10">
          {STATS.map((s) => (
            <div key={s.label} className="flex flex-col-reverse">
              <dt className="text-[11px] uppercase tracking-widest text-muted-foreground">{s.label}</dt>
              <dd className="text-2xl font-extrabold tracking-tight sm:text-3xl"><CountUp {...s} /></dd>
            </div>
          ))}
        </motion.dl>
      </div>

      <motion.div initial={{ opacity: 0, scale: 0.94, y: 30 }} animate={{ opacity: 1, scale: 1, y: 0 }} transition={{ delay: 0.3, duration: 1, ease: [0.22, 1, 0.36, 1] }} className="relative mx-auto w-full max-w-[24rem]">
        <div className="absolute -inset-10 -z-10 rounded-full bg-primary/25 blur-[90px]" />
        <div className="glass-strong aspect-[6/7] overflow-hidden rounded-[2.4rem] p-2">
          <img src={LOGO_SRC} alt="Leman — Creative Designer" fetchPriority="high" className="size-full rounded-[1.9rem] object-cover object-[50%_40%]" />
        </div>
        <div className="glass-strong absolute -left-3 top-[12%] flex animate-float items-center gap-2.5 rounded-2xl py-2 pl-2.5 pr-3.5 sm:-left-8">
          <span className="grid size-8 place-items-center rounded-xl bg-primary/15 text-primary"><Layers className="size-4" /></span>
          <span className="text-xs font-bold leading-tight">Digital Store<br /><span className="font-medium text-muted-foreground">Premium</span></span>
        </div>
        <div className="glass-strong absolute -right-3 bottom-[14%] flex animate-float items-center gap-2.5 rounded-2xl py-2 pl-2.5 pr-3.5 [animation-delay:-3s] sm:-right-8">
          <span className="grid size-8 place-items-center rounded-xl bg-primary/15 text-primary"><ShieldCheck className="size-4" /></span>
          <span className="text-xs font-bold leading-tight">Ourin<br /><span className="font-medium text-muted-foreground">Moderator</span></span>
        </div>
      </motion.div>
    </section>
  );
}

function About() {
  return (
    <section id="portfolio" className="mx-auto max-w-4xl scroll-mt-20 px-5 py-14">
      <Reveal>
        <span className="eyebrow">About</span>
        <h2 className="mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl">Di balik <span className="font-serif font-normal italic text-primary">Leman</span></h2>
      </Reveal>

      <div className="mt-8 grid gap-4 md:grid-cols-5">
        <Reveal className="md:col-span-3">
          <div className="glass-strong h-full rounded-[2rem] p-6">
            <div className="flex items-center gap-4">
              <img src={LOGO_SRC} alt="Leman" className="size-16 rounded-2xl object-cover object-[50%_25%] ring-1 ring-primary/40" />
              <div>
                <h3 className="text-xl font-bold leading-tight">Leman</h3>
                <p className="text-xs text-muted-foreground">Kareem Dary Khayri Yusuf Gaza</p>
                <div className="mt-2 flex flex-wrap gap-1.5">{ROLES.map((r) => <Badge key={r}>{r}</Badge>)}</div>
              </div>
            </div>
            <p className="mt-5 text-sm leading-relaxed text-muted-foreground">
              Creative designer dengan passion di desain, editing, dan industri kreatif — sekaligus fighter Taekwondo yang suka badminton dan tenis.
            </p>
            <div className="mt-5 grid grid-cols-2 gap-2">
              {SKILLS.map(({ label, icon: Icon }) => (
                <motion.div key={label} whileHover={{ y: -3 }} className="flex items-center gap-2.5 rounded-2xl border border-white/10 bg-white/5 px-3 py-2.5 text-[13px] font-semibold">
                  <Icon className="size-4 shrink-0 text-primary" />{label}
                </motion.div>
              ))}
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.08} className="md:col-span-2">
          <div className="glass h-full rounded-[2rem] p-6">
            <h3 className="text-sm font-bold uppercase tracking-widest text-muted-foreground">Achievement</h3>
            <ul className="mt-4 grid gap-3">
              {ACHIEVEMENTS.map((a) => (
                <li key={a} className="flex items-center gap-2.5 text-sm"><BadgeCheck className="size-4 shrink-0 text-primary" />{a}</li>
              ))}
            </ul>
          </div>
        </Reveal>

        <Reveal delay={0.12} className="md:col-span-5">
          <div className="glass rounded-[2rem] p-5">
            <h3 className="mb-3 px-1 text-sm font-bold uppercase tracking-widest text-muted-foreground">Lagu favorit</h3>
            <Songs />
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export default function HomePage() {
  return (
    <>
      <Hero />
      <About />
    </>
  );
}
