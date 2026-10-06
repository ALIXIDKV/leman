import { motion } from "framer-motion";
import { Pause, Play } from "lucide-react";
import { usePlayer } from "@/components/player-provider";
import { cn } from "@/lib/utils";

/** Daftar lagu favorit (memakai player global yang sudah ada) */
export default function Songs() {
  const { songs, index, playing, progress, toggle } = usePlayer();
  return (
    <div className="grid gap-2 sm:grid-cols-2">
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
              "relative flex items-center gap-3 overflow-hidden rounded-2xl border p-2.5 text-left transition-colors",
              current ? "border-primary/40 bg-primary/10" : "border-white/10 bg-white/5 hover:border-primary/30"
            )}
          >
            <span className={cn("grid size-9 shrink-0 place-items-center rounded-full", current ? "bg-primary text-primary-foreground" : "bg-foreground/10")}>
              {isPlaying ? <Pause className="size-3.5" /> : <Play className="size-3.5 translate-x-px" />}
            </span>
            <span className="min-w-0 flex-1">
              <span className="block truncate text-sm font-semibold">{s.title}</span>
              <span className="block truncate text-xs text-muted-foreground">{s.artist}</span>
            </span>
            {current && <span className="absolute inset-x-0 bottom-0 h-[2px] bg-foreground/10"><span className="block h-full bg-primary" style={{ width: `${progress * 100}%` }} /></span>}
          </motion.button>
        );
      })}
    </div>
  );
}
