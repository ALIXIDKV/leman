import { useEffect, useRef, useState } from "react";
import { animate, motion, useInView, useMotionValue, useReducedMotion, useScroll, useSpring, useTransform } from "framer-motion";
import { ArrowRight, ChevronDown, Layers, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { LOGO_SRC } from "@/lib/brand";
import { getCategories } from "@/lib/storage";

function CountUp({ to, suffix = "" }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const [v, setV] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const c = animate(0, to, { duration: 1.6, ease: [0.22, 1, 0.36, 1], onUpdate: (l) => setV(Math.round(l)) });
    return () => c.stop();
  }, [inView, to]);
  return (
    <span ref={ref}>
      {v}
      {suffix}
    </span>
  );
}

const STATS = [
  { to: 3, suffix: "+", label: "Tahun berkarya" },
  { to: 50, suffix: "+", label: "Proyek selesai" },
  { to: 100, suffix: "%", label: "Komitmen & amanah" },
];

const line = { hidden: { y: "110%" }, show: (i) => ({ y: 0, transition: { duration: 0.9, delay: 0.7 + i * 0.12, ease: [0.22, 1, 0.36, 1] } }) };

export default function Hero() {
  const reduce = useReducedMotion();
  const ref = useRef(null);
  const catCount = getCategories().length;

  // parallax saat scroll
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const yPhoto = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : 90]);
  const yText = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : -40]);

  // tilt 3D mengikuti pointer
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rx = useSpring(useTransform(my, [-0.5, 0.5], [7, -7]), { stiffness: 140, damping: 18 });
  const ry = useSpring(useTransform(mx, [-0.5, 0.5], [-9, 9]), { stiffness: 140, damping: 18 });
  const onMove = (e) => {
    if (reduce || e.pointerType === "touch") return;
    const r = e.currentTarget.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  };
  const onLeave = () => {
    mx.set(0);
    my.set(0);
  };

  return (
    <section id="home" ref={ref} className="relative scroll-mt-0 pb-16 pt-28 sm:pt-32 lg:min-h-[100svh] lg:pb-20 lg:pt-36">
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-5 lg:grid-cols-[1.15fr_1fr] lg:gap-10">
        {/* teks */}
        <motion.div style={{ y: yText }} className="relative z-10">
          <motion.span initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6, duration: 0.7 }} className="eyebrow">
            Leman Market
          </motion.span>

          <h1 className="mt-6 text-[clamp(2.9rem,9.5vw,6.4rem)] font-extrabold leading-[0.95] tracking-[-0.035em]">
            <span className="block overflow-hidden pb-[0.08em]">
              <motion.span custom={0} variants={line} initial="hidden" animate="show" className="block">
                Creative
              </motion.span>
            </span>
            <span className="block overflow-hidden pb-[0.12em]">
              <motion.span custom={1} variants={line} initial="hidden" animate="show" className="block font-serif font-normal italic text-primary">
                Designer
              </motion.span>
            </span>
            <span className="block overflow-hidden pb-[0.08em] text-foreground/90">
              <motion.span custom={2} variants={line} initial="hidden" animate="show" className="block">
                &amp; Digital Creator
              </motion.span>
            </span>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.8 }}
            className="mt-7 max-w-md text-[15px] leading-relaxed text-muted-foreground sm:text-base"
          >
            <span className="font-semibold text-foreground">Premium Digital Store.</span> Creative designer, editor, dan penjual segala kebutuhan digital — dari logo, panel, script bot, sampai aplikasi premium.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.35, duration: 0.8 }}
            className="mt-8 flex flex-wrap gap-3"
          >
            <Button asChild size="lg">
              <a href="#market" onClick={(e) => { e.preventDefault(); document.getElementById("market")?.scrollIntoView({ behavior: "smooth" }); }}>
                Buka Leman Market
                <ArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
              </a>
            </Button>
            <Button asChild size="lg" variant="glass">
              <a href="#contact" onClick={(e) => { e.preventDefault(); document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" }); }}>
                Sosial Media
              </a>
            </Button>
          </motion.div>

          <motion.dl
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5, duration: 0.8 }}
            className="mt-12 flex max-w-md gap-7 border-t border-border/10 pt-6 sm:gap-10"
          >
            {STATS.map((s) => (
              <div key={s.label} className="flex flex-col-reverse">
                <dt className="mt-1 text-[11px] leading-tight text-muted-foreground">{s.label}</dt>
                <dd className="text-3xl font-extrabold tracking-tight sm:text-4xl">
                  <CountUp to={s.to} suffix={s.suffix} />
                </dd>
              </div>
            ))}
          </motion.dl>
        </motion.div>

        {/* foto */}
        <motion.div style={{ y: yPhoto }} className="relative mx-auto w-full max-w-[26rem] lg:max-w-none">
          <div className="absolute -inset-10 -z-10 rounded-full bg-primary/25 blur-[90px] dark:bg-primary/20" />
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
            onPointerMove={onMove}
            onPointerLeave={onLeave}
            style={{ rotateX: rx, rotateY: ry, transformPerspective: 1100 }}
            className="relative"
          >
            <div className="glass-strong relative aspect-[6/7] overflow-hidden rounded-[2.2rem] p-2 sm:rounded-[2.8rem] sm:p-2.5">
              <img
                src={LOGO_SRC}
                alt="Leman — Creative Designer"
                fetchPriority="high"
                className="size-full rounded-[1.75rem] object-cover object-[50%_40%] sm:rounded-[2.35rem]"
              />
              <div className="pointer-events-none absolute inset-2 rounded-[1.75rem] bg-gradient-to-t from-background/55 via-transparent to-transparent sm:inset-2.5 sm:rounded-[2.35rem]" />
              <div className="pointer-events-none absolute inset-0 rounded-[inherit] ring-1 ring-inset ring-foreground/10" />
            </div>

            {/* kartu melayang */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.6, duration: 0.8 }}
              className="absolute -left-2 top-[14%] sm:-left-8"
            >
              <div className="glass-strong flex animate-float items-center gap-3 rounded-2xl py-2.5 pl-3 pr-4">
                <span className="relative grid size-9 place-items-center rounded-xl bg-primary/15 text-primary">
                  <Layers className="size-[18px]" />
                </span>
                <div className="leading-tight">
                  <p className="text-sm font-bold">{catCount} kategori</p>
                  <p className="text-[11px] text-muted-foreground">produk digital</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.8, duration: 0.8 }}
              className="absolute -right-2 bottom-[16%] sm:-right-8"
            >
              <div className="glass-strong flex animate-float items-center gap-3 rounded-2xl py-2.5 pl-3 pr-4 [animation-delay:-3s]">
                <span className="grid size-9 place-items-center rounded-xl bg-primary/15 text-primary">
                  <ShieldCheck className="size-[18px]" />
                </span>
                <div className="leading-tight">
                  <p className="text-sm font-bold">Ourin</p>
                  <p className="text-[11px] text-muted-foreground">Moderator</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 2, duration: 0.7 }}
              className="absolute bottom-5 left-5 hidden sm:block"
            >
              <div className="glass flex items-center gap-2 rounded-full px-3.5 py-1.5 text-xs font-semibold">
                <span className="relative flex size-2">
                  <span className="absolute inline-flex size-full animate-ping rounded-full bg-primary opacity-70" />
                  <span className="relative inline-flex size-2 rounded-full bg-primary" />
                </span>
                Order via WhatsApp
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>

      <motion.a
        href="#about"
        onClick={(e) => { e.preventDefault(); document.getElementById("about")?.scrollIntoView({ behavior: "smooth" }); }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.4 }}
        aria-label="Scroll ke bawah"
        className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 text-muted-foreground transition-colors hover:text-foreground lg:block"
      >
        <ChevronDown className="size-6 animate-bounce" />
      </motion.a>
    </section>
  );
}
