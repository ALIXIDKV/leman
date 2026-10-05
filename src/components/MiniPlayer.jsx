import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Music2, Pause, Play } from "lucide-react";
import { usePlayer } from "@/components/player-provider";

/** mini player melayang — geser ke kanan untuk menyembunyikan (lagu tetap jalan) */
export default function MiniPlayer() {
  const { songs, index, playing, progress, toggle } = usePlayer();
  const [dismissedFor, setDismissedFor] = useState(null);
  const song = index >= 0 ? songs[index] : null;
  const hidden = song && dismissedFor === index;

  useEffect(() => {
    if (index < 0) setDismissedFor(null);
  }, [index]);

  return (
    <div className="pointer-events-none fixed bottom-[calc(env(safe-area-inset-bottom)+1rem)] left-4 z-40 max-w-[calc(100vw-6.5rem)]">
      <AnimatePresence mode="wait">
        {song && !hidden && (
          <motion.div
            key="bar"
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={{ left: 0, right: 0.6 }}
            onDragEnd={(_, info) => info.offset.x > 90 && setDismissedFor(index)}
            initial={{ opacity: 0, y: 30, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, x: 120 }}
            transition={{ type: "spring", stiffness: 320, damping: 28 }}
            className="glass-strong pointer-events-auto flex w-[19rem] max-w-full touch-pan-y items-center gap-3 rounded-full p-2 pr-5"
          >
            <button
              type="button"
              onClick={() => toggle(index)}
              aria-label={playing ? "Jeda lagu" : "Putar lagu"}
              className="grid size-11 shrink-0 place-items-center rounded-full bg-primary text-primary-foreground shadow-[0_0_18px_-2px_hsl(var(--primary)/0.7)] transition-transform active:scale-90"
            >
              {playing ? <Pause className="size-4" /> : <Play className="size-4 translate-x-px" />}
            </button>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-semibold leading-tight">{song.title}</p>
              <p className="truncate text-xs text-muted-foreground">{song.artist}</p>
              <div className="mt-1.5 h-[3px] overflow-hidden rounded-full bg-foreground/10">
                <div className="h-full rounded-full bg-primary" style={{ width: `${progress * 100}%` }} />
              </div>
            </div>
          </motion.div>
        )}
        {song && hidden && (
          <motion.button
            key="handle"
            type="button"
            onClick={() => setDismissedFor(null)}
            aria-label="Tampilkan pemutar lagu"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            className="glass-strong pointer-events-auto grid size-12 place-items-center rounded-full text-primary"
          >
            <Music2 className={playing ? "size-5 animate-pulse" : "size-5"} />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}
