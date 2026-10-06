import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useAnimationControls, useReducedMotion } from "framer-motion";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/components/theme-provider";
import { cn } from "@/lib/utils";

/**
 * Easter egg dark/light mode. Default: tidak ada apa-apa selain tombol.
 * Saat tombol diklik (satu kali, tidak looping):
 *  1 lampu kecil menyala → 2 pintu muncul dari glow → 3 pintu terbuka → 4 karakter keluar
 *  5 berjalan ke tombol → 6 menekan tombol → 7 tema berganti → 8 berjalan kembali
 *  9 masuk pintu → 10 pintu menghilang (lampu padam)
 * Tema berganti tepat sekali per klik (juga saat error / unmount / reduced-motion).
 */
const STAGE_W = 124; // px, ruang animasi di sebelah kiri tombol
const CHAR_W = 22;
const DOOR_X = 4;
const PRESS_X = STAGE_W - CHAR_W + 3; // ujung tangan menyentuh tombol
const EASE = [0.22, 1, 0.36, 1];
const wait = (ms) => new Promise((r) => setTimeout(r, ms));

export default function ThemeCharacterAnimation({ className }) {
  const { theme, toggleTheme } = useTheme();
  const reduce = useReducedMotion();
  const [stage, setStage] = useState(false);
  const [lamp, setLamp] = useState(false);
  const [phase, setPhase] = useState("idle"); // idle | walking | pressing
  const [facing, setFacing] = useState(1);
  const alive = useRef(true);
  const busy = useRef(false);
  const doorWrap = useAnimationControls();
  const leaf = useAnimationControls();
  const char = useAnimationControls();
  const btn = useAnimationControls();

  useEffect(() => {
    alive.current = true;
    return () => {
      alive.current = false;
    };
  }, []);

  const run = useCallback(async () => {
    if (busy.current) return;
    busy.current = true;
    let toggled = false;
    const flip = () => {
      if (toggled) return;
      toggled = true;
      toggleTheme();
    };
    try {
      if (reduce) return flip();
      setStage(true);
      await wait(60); // tunggu stage ter-mount
      setLamp(true); // 1. lampu menyala
      await wait(650);
      await doorWrap.start({ opacity: 1, scale: 1, transition: { duration: 0.6, ease: EASE } }); // 2. pintu dari glow
      await leaf.start({ rotateY: -74, transition: { duration: 0.55, ease: EASE } }); // 3. pintu terbuka
      if (!alive.current) return;
      await char.start({ opacity: 1, scale: 1, transition: { duration: 0.25 } }); // 4. karakter keluar
      setPhase("walking");
      await char.start({ x: PRESS_X, transition: { duration: 1.9, ease: "easeInOut" } }); // 5. jalan ke tombol
      if (!alive.current) return;
      setPhase("pressing"); // 6. menekan
      await wait(300);
      btn.start({ scale: [1, 0.84, 1], transition: { duration: 0.38 } });
      flip(); // 7. tema berubah
      await wait(450);
      if (!alive.current) return;
      setPhase("idle");
      setFacing(-1);
      await wait(220);
      setPhase("walking");
      await char.start({ x: DOOR_X, transition: { duration: 1.9, ease: "easeInOut" } }); // 8. kembali
      if (!alive.current) return;
      setPhase("idle");
      await char.start({ opacity: 0, scale: 0.8, transition: { duration: 0.25 } }); // 9. masuk pintu
      await leaf.start({ rotateY: 0, transition: { duration: 0.45 } });
      await doorWrap.start({ opacity: 0, scale: 0.6, transition: { duration: 0.5 } }); // 10. pintu hilang
      setLamp(false);
      await wait(400);
    } catch (err) {
      console.error("[ThemeCharacterAnimation]", err);
    } finally {
      flip(); // pengaman: tema tetap berganti 1x
      busy.current = false;
      if (alive.current) {
        setStage(false);
        setLamp(false);
        setPhase("idle");
        setFacing(1);
      }
    }
  }, [reduce, toggleTheme, doorWrap, leaf, char, btn]);

  const isDark = theme === "dark";

  return (
    <div className={cn("relative size-9 shrink-0", className)}>
      {/* panggung hanya ada selama animasi */}
      <AnimatePresence>
        {stage && (
          <motion.div
            aria-hidden="true"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{ width: STAGE_W }}
            className="pointer-events-none absolute bottom-0 right-full mr-1 h-10 select-none"
          >
            {/* lampu kecil */}
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: lamp ? 1 : 0 }}
              transition={{ duration: 0.4 }}
              className="absolute -top-2.5 left-[13px] size-2 rounded-full bg-amber-200 shadow-[0_0_14px_5px_rgba(253,230,138,0.65)]"
            />
            {/* pintu: muncul dari glow */}
            <motion.div
              initial={{ opacity: 0, scale: 0.6 }}
              animate={doorWrap}
              style={{ left: DOOR_X - 2, transformOrigin: "50% 100%" }}
              className="absolute bottom-0 h-[40px] w-[26px] rounded-t-[11px] bg-gradient-to-b from-amber-200 to-amber-500 shadow-[0_0_22px_2px_hsl(var(--primary)/0.65)] ring-1 ring-primary/50"
            >
              <motion.div
                initial={{ rotateY: 0 }}
                animate={leaf}
                style={{ transformPerspective: 260, transformOrigin: "0% 50%" }}
                className="absolute inset-0 z-[3] rounded-t-[11px] bg-gradient-to-br from-emerald-400 to-emerald-700 ring-1 ring-black/30"
              >
                <span className="absolute right-[5px] top-[22px] size-[4px] rounded-full bg-amber-200" />
              </motion.div>
            </motion.div>
            {/* karakter */}
            <motion.div
              initial={{ x: DOOR_X, opacity: 0, scale: 0.85 }}
              animate={char}
              className="absolute bottom-0 left-0 z-[2] h-[36px] w-[22px] origin-bottom"
            >
              <motion.div animate={{ scaleX: facing }} transition={{ duration: 0.18 }} className="size-full">
                <MiniCharacter phase={phase} />
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        type="button"
        onClick={run}
        animate={btn}
        aria-label={isDark ? "Ganti ke mode terang" : "Ganti ke mode gelap"}
        className="glass relative z-[4] grid size-9 place-items-center rounded-full text-foreground transition-shadow duration-300 hover:shadow-[0_0_22px_-2px_hsl(var(--primary)/0.6)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.span key={theme} initial={{ rotate: -90, scale: 0.4, opacity: 0 }} animate={{ rotate: 0, scale: 1, opacity: 1 }} exit={{ rotate: 90, scale: 0.4, opacity: 0 }} transition={{ duration: 0.28 }} className="grid place-items-center">
            {isDark ? <Moon className="size-[18px]" /> : <Sun className="size-[18px] text-amber-500" />}
          </motion.span>
        </AnimatePresence>
      </motion.button>
    </div>
  );
}

/** karakter mini: topi hitam (kilas balik ke foto brand), hoodie mint. Menghadap kanan. */
function MiniCharacter({ phase }) {
  const walking = phase === "walking";
  const pressing = phase === "pressing";
  const pivot = "[transform-box:fill-box] [transform-origin:50%_6%]";
  return (
    <svg viewBox="0 0 24 40" className="size-full overflow-visible" fill="none">
      {/* bayangan */}
      <ellipse cx="12" cy="38.6" rx="7.5" ry="1.3" fill="rgba(0,0,0,0.28)" />

      {/* kaki belakang */}
      <g className={cn(pivot, walking && "animate-leg-b")}>
        <rect x="9.6" y="25" width="3.4" height="11" rx="1.7" fill="#232733" />
        <rect x="9.2" y="34.2" width="5.4" height="3" rx="1.5" fill="#cfd3dc" />
      </g>

      {/* lengan belakang */}
      <g className={cn(pivot, walking && "animate-arm-a")}>
        <rect x="5.4" y="15.4" width="3.2" height="10" rx="1.6" fill="#10b981" />
        <circle cx="7" cy="26.2" r="1.7" fill="#f1c7a0" />
      </g>

      {/* badan + kepala (bergoyang saat jalan) */}
      <g className={cn(walking && "animate-bob")}>
        <rect x="7" y="14" width="10" height="12.4" rx="4.2" fill="#34d399" />
        <rect x="7" y="21" width="10" height="1.6" fill="#10b981" opacity=".55" />
        <circle cx="12" cy="9" r="5.6" fill="#f1c7a0" />
        {/* topi */}
        <path d="M6.2 8.2C6.2 3.4 8.7 1.2 12 1.2s5.8 2.2 5.8 7z" fill="#17171b" />
        <path d="M14.6 7.1h7c0 1.5-1.1 2.2-2.6 2.2h-4.4z" fill="#0d0d10" />
        <rect x="11" y="3.4" width="2.6" height="2" rx=".5" fill="#fff" opacity=".85" />
        {/* wajah */}
        <circle cx="15.2" cy="11" r=".95" fill="#1a1a1f" />
        <circle cx="16.6" cy="12.9" r="1" fill="#f59e8c" opacity=".55" />
        <path d="M13.4 13.6q1.1.8 2.2.1" stroke="#7a3f2b" strokeWidth=".7" strokeLinecap="round" />
      </g>

      {/* kaki depan */}
      <g className={cn(pivot, walking && "animate-leg-a")}>
        <rect x="11.4" y="25" width="3.4" height="11" rx="1.7" fill="#2f3441" />
        <rect x="11" y="34.2" width="5.6" height="3" rx="1.5" fill="#fff" />
      </g>

      {/* lengan depan — terangkat ke depan saat menekan tombol */}
      <g
        className={cn(pivot, "transition-transform duration-300 ease-out", walking && "animate-arm-b")}
        style={pressing ? { transform: "rotate(-90deg)" } : undefined}
      >
        <rect x="14.6" y="15.4" width="3.2" height="10" rx="1.6" fill="#6ee7b7" />
        <circle cx="16.2" cy="26.2" r="1.75" fill="#f1c7a0" />
      </g>
    </svg>
  );
}
