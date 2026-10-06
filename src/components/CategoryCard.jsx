import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa6";
import { Link } from "@/lib/router";
import { CategoryIcon } from "@/lib/icons";
import { waLink } from "@/lib/utils";

export const cardVariants = {
  hidden: { opacity: 0, y: 24, scale: 0.97 },
  show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
};

/** Card kategori: icon, nama, deskripsi, tombol. Nokos langsung ke WhatsApp. */
export default function CategoryCard({ cat }) {
  const wa = cat.type === "wa";
  const props = wa
    ? { href: waLink(`Halo Leman, saya mau tanya stok & harga ${cat.name}`), target: "_blank", rel: "noopener noreferrer" }
    : { to: `/store/${cat.slug}` };
  const Wrap = wa ? "a" : Link;
  return (
    <motion.div variants={cardVariants} whileHover={{ y: -8 }} transition={{ type: "spring", stiffness: 320, damping: 22 }} className="h-full">
      <Wrap {...props} aria-label={`${cat.name} — ${wa ? "Chat WhatsApp" : "Lihat Harga"}`} className="group glass relative flex h-full flex-col gap-4 overflow-hidden rounded-3xl p-5 transition-[border-color,box-shadow] duration-300 hover:border-primary/50 hover:shadow-[0_28px_60px_-28px_hsl(var(--primary)/0.65)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
        <span aria-hidden="true" className="pointer-events-none absolute -right-10 -top-10 size-36 rounded-full bg-primary/20 blur-3xl transition-opacity duration-500 group-hover:opacity-100 md:opacity-60" />
        <span className="relative grid size-12 place-items-center rounded-2xl bg-primary/15 text-primary ring-1 ring-primary/30 shadow-[0_0_24px_-6px_hsl(var(--primary)/0.7)] transition-transform duration-500 group-hover:scale-110 group-hover:-rotate-6">
          <CategoryIcon icon={cat.icon} className="size-6" />
        </span>
        <div className="relative flex-1">
          <h2 className="text-lg font-bold leading-tight tracking-tight">{cat.name}</h2>
          <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{cat.desc}</p>
        </div>
        <span className="relative inline-flex items-center justify-between rounded-full bg-primary px-4 py-2.5 text-[13px] font-semibold text-primary-foreground shadow-[0_10px_30px_-10px_hsl(var(--primary)/0.8)] transition-transform duration-300 group-hover:translate-x-0.5">
          {wa ? "Chat WhatsApp" : "Lihat Harga"}
          {wa ? <FaWhatsapp className="size-4" /> : <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />}
        </span>
      </Wrap>
    </motion.div>
  );
}
