import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useAnimationControls, useReducedMotion } from "framer-motion";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/components/theme-provider";
import { cn } from "@/lib/utils";

/**
 * Tombol dark/light mode dengan karakter mini.
 *
 * Alur saat tombol diklik:
 *  1. pintu kecil terbuka
 *  2. karakter keluar & berjalan ke tombol
 *  3. karakter menekan tombol  -> tema berganti PADA saat tombol ditekan
 *  4. karakter berbalik & berjalan kembali
 *  5. masuk ke pintu, pintu menutup
 *
 * Logika tema sepenuhnya ada di <ThemeProvider> (toggleTheme). Komponen ini hanya
 * mengatur koreografi, dan menjamin tema berganti tepat SEKALI per klik
 * (juga saat animasi error / komponen unmount / prefers-reduced-motion).
 */

const CHAR_W = 22; // px, lebar karakter
const REACH = 23; // px dari tepi kiri karakter ke ujung tangan saat menekan
const EASE_OUT = [0.22, 1, 0.36, 1];
const wait = (ms) => new Promise((r) => setTimeout(r, ms));

export default function ThemeCharacterToggle({ className }) {
  const { theme, toggleTheme } = useTheme();
  const reduce = useReducedMotion();

  const stageRef = useRef(null);
  const doorRef = useRef(null);
  const btnRef = useRef(null);
  const alive = useRef(true);
  const busy = useRef(false);

  const [phase, setPhase] = useState("idle"); // idle | walking | pressing
  const [facing, setFacing] = useState(1); // 1 = kanan, -1 = kiri
  const [running, setRunning] = useState(false);

  const door = useAnimationControls();
  const char = useAnimationControls();
  const btn = useAnimationControls();

  useEffect(() => {
    alive.current = true;
    return () => {
      alive.current = false;
    };
  }, []);

  const run = useCallback(async () => {
    if (busy.current) return; // abaikan klik selama animasi berjalan
    busy.current = true;
    setRunning(true);

    let toggled = false;
    const flip = () => {
      if (toggled) return;
      toggled = true;
      toggleTheme();
    };

    try {
      if (reduce || !stageRef.current || !doorRef.current || !btnRef.current) {
        flip(); // aksesibilitas: tanpa animasi, tema langsung berganti
        return;
      }

      // ukur posisi nyata (responsif mobile & desktop)
      const s = stageRef.current.getBoundingClientRect();
      const d = doorRef.current.getBoundingClientRect();
      const b = btnRef.current.getBoundingClientRect();
      const doorX = d.left - s.left + d.width / 2 - CHAR_W / 2;
      const pressX = Math.max(doorX + 8, b.left - s.left - REACH);
      const walk = Math.max(0.9, Math.abs(pressX - doorX) / 50); // detik, kecepatan ~50px/s

      char.set({ x: doorX, opacity: 0, scale: 0.85 });
      setFacing(1);

      // 1. pintu terbuka
      await door.start({ rotateY: -74, transition: { duration: 0.5, ease: EASE_OUT } });
      if (!alive.current) return;

      // 2. keluar & berjalan ke tombol
      await char.start({ opacity: 1, scale: 1, transition: { duration: 0.2 } });
      setPhase("walking");
      await char.start({ x: pressX, transition: { duration: walk, ease: "easeInOut" } });
      if (!alive.current) return;

      // 3. menekan tombol
      setPhase("pressing");
      await wait(280); // lengan terangkat
      btn.start({ scale: [1, 0.84, 1], transition: { duration: 0.38, ease: "easeOut" } });
      flip(); // <-- mode berubah di sini
      await wait(420);
      if (!alive.current) return;

      // 4. berbalik, berjalan kembali
      setPhase("idle");
      setFacing(-1);
      await wait(220);
      setPhase("walking");
      await char.start({ x: doorX, transition: { duration: walk, ease: "easeInOut" } });
      if (!alive.current) return;

      // 5. masuk & pintu menutup
      setPhase("idle");
      await char.start({ opacity: 0, scale: 0.8, transition: { duration: 0.24 } });
      await door.start({ rotateY: 0, transition: { duration: 0.45, ease: [0.4, 0, 0.2, 1] } });
    } catch (err) {
      console.error("[ThemeCharacterToggle]", err);
    } finally {
      flip(); // jaring pengaman: kalau animasi gagal, tema tetap berganti 1x
      if (alive.current) {
        setPhase("idle");
        setFacing(1);
        char.set({ opacity: 0 });
        door.set({ rotateY: 0 });
      }
      busy.current = false;
      if (alive.current) setRunning(false);
    }
  }, [reduce, toggleTheme, door, char, btn]);

  const isDark = theme === "dark";

  return (
    <div ref={stageRef} className={cn("relative h-11 w-[104px] shrink-0 select-none sm:w-[136px]", className)}>
      {/* lantai */}
      <div className="absolute inset-x-0 bottom-[1px] h-px bg-gradient-to-r from-transparent via-foreground/20 to-transparent" />

      {/* ruangan di balik pintu (menyala saat terbuka) */}
      <div
        ref={doorRef}
        aria-hidden="true"
        className="absolute bottom-[2px] left-0 z-[1] h-[40px] w-[26px] rounded-t-[11px] bg-gradient-to-b from-amber-200 via-amber-300 to-amber-500 shadow-[inset_0_0_8px_rgba(0,0,0,0.35)] ring-1 ring-foreground/25"
      />

      {/* karakter */}
      <motion.div
        aria-hidden="true"
        initial={{ x: 2, opacity: 0, scale: 0.85 }}
        animate={char}
        className="pointer-events-none absolute bottom-[2px] left-0 z-[2] h-[36px] w-[22px] origin-bottom"
      >
        <motion.div animate={{ scaleX: facing }} transition={{ duration: 0.18, ease: "easeOut" }} className="size-full">
          <MiniCharacter phase={phase} />
        </motion.div>
      </motion.div>

      {/* daun pintu */}
      <motion.div
        aria-hidden="true"
        initial={{ rotateY: 0 }}
        animate={door}
        style={{ transformPerspective: 260, transformOrigin: "0% 50%" }}
        className="pointer-events-none absolute bottom-[2px] left-0 z-[3] h-[40px] w-[26px] rounded-t-[11px] bg-gradient-to-br from-emerald-400 to-emerald-700 shadow-[0_2px_6px_rgba(0,0,0,0.35)] ring-1 ring-black/30"
      >
        <span className="absolute right-[5px] top-[22px] size-[4px] rounded-full bg-amber-200 shadow-[0_0_4px_rgba(253,230,138,0.9)]" />
        <span className="absolute inset-x-[5px] top-[6px] h-[10px] rounded-t-[6px] border border-black/20" />
      </motion.div>

      {/* tombol */}
      <motion.button
        ref={btnRef}
        type="button"
        onClick={run}
        animate={btn}
        aria-label={isDark ? "Ganti ke mode terang" : "Ganti ke mode gelap"}
        aria-busy={running}
        className={cn(
          "glass absolute right-0 top-[4px] z-[4] grid size-9 place-items-center rounded-full text-foreground",
          "transition-shadow duration-300 hover:shadow-[0_0_22px_-2px_hsl(var(--primary)/0.6)]",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
          running && "cursor-progress"
        )}
      >
        {phase === "pressing" && <span className="absolute inset-0 animate-pulse-ring rounded-full ring-2 ring-primary/70" />}
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={theme}
            initial={{ rotate: -90, scale: 0.4, opacity: 0 }}
            animate={{ rotate: 0, scale: 1, opacity: 1 }}
            exit={{ rotate: 90, scale: 0.4, opacity: 0 }}
            transition={{ duration: 0.28, ease: "easeOut" }}
            className="grid place-items-center"
          >
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
