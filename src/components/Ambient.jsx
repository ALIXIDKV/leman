import { motion, useScroll, useTransform } from "framer-motion";

/** latar: deep black + gradient halus + glow + noise */
export default function Ambient() {
  const { scrollYProgress } = useScroll();
  const y1 = useTransform(scrollYProgress, [0, 1], ["0%", "-18%"]);
  const y2 = useTransform(scrollYProgress, [0, 1], ["0%", "14%"]);
  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-background">
      <motion.div
        style={{ y: y1 }}
        className="absolute -left-40 -top-40 size-[38rem] animate-float-slow rounded-full bg-primary/[0.13] blur-[130px] dark:bg-primary/[0.09]"
      />
      <motion.div
        style={{ y: y2 }}
        className="absolute -right-52 top-[28%] size-[34rem] animate-float-slow rounded-full bg-teal-400/[0.10] blur-[140px] [animation-delay:-8s] dark:bg-indigo-500/[0.10]"
      />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,transparent_35%,hsl(var(--background))_95%)]" />
      <div className="noise absolute inset-0 opacity-[0.05] mix-blend-overlay dark:opacity-[0.07]" />
    </div>
  );
}
