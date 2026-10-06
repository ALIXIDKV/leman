import { motion } from "framer-motion";
import { FaWhatsapp } from "react-icons/fa6";
import { waLink } from "@/lib/utils";

export default function WhatsAppFab() {
  return (
    <motion.a
      href={waLink()}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat WhatsApp"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 2.2, type: "spring", stiffness: 260, damping: 18 }}
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.92 }}
      className="fixed bottom-[calc(env(safe-area-inset-bottom)+5.5rem)] md:bottom-[calc(env(safe-area-inset-bottom)+1rem)] right-4 z-40 grid size-14 place-items-center rounded-full bg-primary text-primary-foreground shadow-[0_10px_34px_-6px_hsl(var(--primary)/0.8)]"
    >
      <span className="absolute inset-0 animate-pulse-ring rounded-full bg-primary/50" />
      <FaWhatsapp className="relative size-7" />
    </motion.a>
  );
}
