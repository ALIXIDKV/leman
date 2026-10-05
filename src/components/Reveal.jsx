import { motion, useReducedMotion } from "framer-motion";

/** fade + naik halus saat masuk viewport */
export default function Reveal({ children, delay = 0, y = 28, className, as = "div", ...props }) {
  const reduce = useReducedMotion();
  const Comp = motion[as] || motion.div;
  return (
    <Comp
      initial={reduce ? false : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-70px" }}
      transition={{ duration: 0.75, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
      {...props}
    >
      {children}
    </Comp>
  );
}
