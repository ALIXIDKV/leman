import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Progress } from "antd";
import { BadgeCheck, Headphones, Pause, Play } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import { usePlayer } from "@/components/player-provider";
import { LOGO_SRC } from "@/lib/brand";
import { cn } from "@/lib/utils";

const SKILLS = [
  ["Editing", 40],
  ["Jualan", 80],
  ["Memasak", 50],
  ["Hosting", 20],
];
const HOBBIES = [
  ["🍳", "Memasak"],
  ["🥋", "Taekwondo"],
  ["🏸", "Badminton"],
  ["🎾", "Tenis"],
];
const ACHIEVEMENTS = [
  "3+ tahun berkarya di industri kreatif",
  "50+ proyek diselesaikan",
  "100% komitmen & amanah",
  "Moderator komunitas Ourin",
  "Fighter Taekwondo",
];

function Skills() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <div ref={ref} className="mt-6 grid gap-5">
      {SKILLS.map(([name, v], i) => (
        <div key={name}>
          <div className="mb-1.5 flex justify-between text-xs">
            <span className="font-medium text-foreground/80">{name}</span>
            <span className="tabular-nums text-muted-foreground">{v}%</span>
          </div>
          <Progress
            percent={inView ? v : 0}
            showInfo={false}
            strokeWidth={6}
            strokeLinecap="round"
            strokeColor={{ from: "#10b981", to: "#00ff88" }}
            trailColor="rgba(128,128,128,0.18)"
            aria-label={name}
            style={{ transitionDelay: `${i * 120}ms` }}
          />
        </div>
      ))}
    </div>
  );
}

function Equalizer({ active }) {
  return (
    <span className="flex h-4 items-end gap-[3px]" aria-hidden="true">
      {[0, 0.25, 0.5].map((d) => (
        <span
          key={d}
          style={{ animationDelay: `${d}s`, animationPlayState: active ? "running" : "paused" }}
          className="h-full w-[3px] origin-bottom animate-eq rounded-full bg-primary"
        />
      ))}
    </span>
  );
}

function Songs() {
  const { songs, index, playing, progress, toggle } = usePlayer();
  return (
    <div className="grid gap-2.5 sm:grid-cols-2">
      {songs.map((s, i) => {
        const current = index === i;
        const isPlaying = current && playing;
        return (
          <motion.button
            key={s.id || i}
            type="button"
            whileTap={{ scale: 0.98 }}
            onClick={() => toggle(i)}
            aria-label={`${isPlaying ? "Jeda" : "Putar"} ${s.title}`}
            className={cn(
              "group relative flex items-center gap-3.5 overflow-hidden rounded-2xl border p-3 text-left transition-all duration-300",
              current ? "border-primary/40 bg-primary/10" : "border-border/10 bg-foreground/[0.03] hover:border-primary/30 hover:bg-foreground/[0.06]"
            )}
          >
            <span
              className={cn(
                "grid size-11 shrink-0 place-items-center rounded-full transition-all duration-300",
                current ? "bg-primary text-primary-foreground shadow-[0_0_20px_-2px_hsl(var(--primary)/0.7)]" : "bg-foreground/10 group-hover:bg-primary group-hover:text-primary-foreground"
              )}
            >
              {isPlaying ? <Pause className="size-4" /> : <Play className="size-4 translate-x-px" />}
            </span>
            <span className="min-w-0 flex-1">
              <span className="block truncate text-sm font-semibold">{s.title}</span>
              <span className="block truncate text-xs text-muted-foreground">{s.artist}</span>
            </span>
            {current && <Equalizer active={isPlaying} />}
            {current && (
              <span className="absolute inset-x-0 bottom-0 h-[2px] bg-foreground/10">
                <span className="block h-full bg-primary" style={{ width: `${progress * 100}%` }} />
              </span>
            )}
          </motion.button>
        );
      })}
    </div>
  );
}

export default function About() {
  return (
    <section id="about" className="mx-auto max-w-6xl scroll-mt-24 px-5 py-20 sm:py-28">
      <SectionHeading eyebrow="About" title="Di balik" accent="Leman" description="Creative designer yang berkembang lewat desain, editing, dan dunia digital." />

      <div className="mt-12 grid gap-4 md:grid-cols-6">
        {/* profil */}
        <Reveal className="md:col-span-4">
          <Card className="h-full overflow-hidden">
            <CardHeader className="flex-row items-center gap-4 space-y-0 p-6 sm:p-8 sm:pb-0">
              <div className="relative">
                <span className="absolute -inset-1.5 rounded-[1.4rem] bg-gradient-to-br from-primary/60 to-transparent opacity-60 blur-md" />
                <img src={LOGO_SRC} alt="Leman" className="relative size-16 rounded-[1.2rem] object-cover object-[50%_25%] ring-1 ring-primary/40 sm:size-20" />
              </div>
              <div>
                <CardTitle className="text-xl sm:text-2xl">Tentang Leman</CardTitle>
                <CardDescription className="mt-1">Kareem Dary Khayri Yusuf Gaza</CardDescription>
              </div>
            </CardHeader>
            <CardContent className="p-6 pt-5 sm:p-8 sm:pt-6">
              <p className="text-[15px] leading-relaxed text-muted-foreground">
                Leman adalah seorang <strong className="font-semibold text-foreground">creative designer</strong> yang punya passion di bidang desain, editing, dan berbagai industri kreatif. Sebagai anak kedua dari tiga bersaudara, ia dikenal sebagai pribadi yang aktif, kreatif, dan terus berkembang. Di komunitas <strong className="font-semibold text-foreground">Ourin</strong>, Leman berperan sebagai Moderator.
              </p>
              <p className="mt-3 text-[15px] leading-relaxed text-muted-foreground">
                Di luar dunia kreatif, Leman punya jiwa kompetitif dan aktif berolahraga — seorang fighter Taekwondo, sekaligus tertarik pada badminton dan tenis.
              </p>
              <div className="mt-6 flex flex-wrap gap-2">
                {["Graphic Design", "Photo & Video Editing", "Sales & Marketing", "Hosting"].map((t) => (
                  <Badge key={t} variant="outline" className="px-3 py-1 text-xs">
                    {t}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        </Reveal>

        {/* pencapaian */}
        <Reveal delay={0.1} className="md:col-span-2">
          <Card className="h-full">
            <CardHeader>
              <CardTitle>Achievement</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="grid gap-3.5">
                {ACHIEVEMENTS.map((a) => (
                  <li key={a} className="flex items-start gap-3 text-sm text-muted-foreground">
                    <BadgeCheck className="mt-0.5 size-[18px] shrink-0 text-primary" />
                    <span>{a}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </Reveal>

        {/* keahlian */}
        <Reveal delay={0.05} className="md:col-span-3">
          <Card className="h-full">
            <CardHeader className="pb-0">
              <CardTitle>Keahlian</CardTitle>
            </CardHeader>
            <CardContent>
              <Skills />
            </CardContent>
          </Card>
        </Reveal>

        {/* hobi */}
        <Reveal delay={0.1} className="md:col-span-3">
          <Card className="h-full">
            <CardHeader className="pb-0">
              <CardTitle>Hobi</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4 md:grid-cols-2 lg:grid-cols-4">
                {HOBBIES.map(([emoji, label]) => (
                  <motion.div
                    key={label}
                    whileHover={{ y: -6, rotate: -2 }}
                    transition={{ type: "spring", stiffness: 300, damping: 18 }}
                    className="rounded-2xl border border-border/10 bg-foreground/[0.04] py-5 text-center"
                  >
                    <div className="text-2xl">{emoji}</div>
                    <div className="mt-2 text-xs font-medium text-muted-foreground">{label}</div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </Reveal>

        {/* lagu favorit */}
        <Reveal delay={0.05} className="md:col-span-6">
          <Card>
            <CardHeader className="flex-row items-center gap-3 space-y-0 pb-4">
              <span className="grid size-9 place-items-center rounded-xl bg-primary/15 text-primary">
                <Headphones className="size-[18px]" />
              </span>
              <CardTitle>Lagu Favorit</CardTitle>
            </CardHeader>
            <CardContent>
              <Songs />
            </CardContent>
          </Card>
        </Reveal>
      </div>
    </section>
  );
}
