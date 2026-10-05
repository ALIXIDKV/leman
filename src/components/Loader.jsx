import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { LOGO_SRC } from "@/lib/brand";

export default function Loader() {
  const [show, setShow] = useState(true);
  useEffect(() => {
    const t0 = Date.now();
    const hide = () => window.setTimeout(() => setShow(false), Math.max(0, 900 - (Date.now() - t0)));
    let id;
    if (document.readyState === "complete") id = hide();
    else window.addEventListener("load", () => (id = hide()), { once: true });
    const safety = window.setTimeout(() => setShow(false), 2800); // jaga-jaga supaya tidak nyangkut
    return () => {
      window.clearTimeout(id);
      window.clearTimeout(safety);
    };
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key="loader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.04, filter: "blur(10px)" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-[100] grid place-content-center justify-items-center gap-6 bg-background"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="relative"
          >
            <span className="absolute inset-0 -z-10 animate-pulse-ring rounded-[1.75rem] bg-primary/40" />
            <img src={LOGO_SRC} alt="Leman Market" className="size-20 rounded-[1.75rem] object-cover shadow-[0_0_60px_-8px_hsl(var(--primary)/0.55)] ring-1 ring-foreground/10" />
          </motion.div>
          <div className="h-[3px] w-28 overflow-hidden rounded-full bg-foreground/10">
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: "100%" }}
              transition={{ duration: 1, repeat: Infinity, ease: "easeInOut" }}
              className="h-full w-1/2 rounded-full bg-primary"
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
