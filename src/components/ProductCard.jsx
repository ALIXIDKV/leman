import { motion } from "framer-motion";
import { Card } from "antd";
import { ArrowUpRight } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa6";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CategoryIcon } from "@/lib/icons";
import { formatRupiah } from "@/lib/utils";

export const itemVariants = {
  hidden: { opacity: 0, y: 24, scale: 0.97 },
  show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
  exit: { opacity: 0, y: -10, transition: { duration: 0.2 } },
};

export default function ProductCard({ product, category, index, onOrder }) {
  const priced = Boolean(product.price);

  // spotlight yang mengikuti kursor
  const onMove = (e) => {
    const r = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--mx", `${e.clientX - r.left}px`);
    e.currentTarget.style.setProperty("--my", `${e.clientY - r.top}px`);
  };

  return (
    <motion.div
      variants={itemVariants}
      whileHover={{ y: -7 }}
      whileTap={{ scale: 0.985 }}
      transition={{ type: "spring", stiffness: 320, damping: 22 }}
      onMouseMove={onMove}
      onClick={() => onOrder(product)}
      className="spot glass group cursor-pointer rounded-3xl transition-[border-color,box-shadow] duration-300 hover:border-primary/40 hover:shadow-[0_24px_50px_-24px_hsl(var(--primary)/0.45)]"
    >
      <Card variant="borderless" className="h-full !bg-transparent !shadow-none" styles={{ body: { padding: 18, display: "flex", flexDirection: "column", gap: 14, height: "100%" } }}>
        <div className="flex items-center justify-between">
          <Badge variant="glass" className="max-w-[75%] truncate !px-2 text-[10px]">
            <CategoryIcon icon={category.icon} className="size-3 shrink-0 text-primary" />
            <span className="truncate">{category.name}</span>
          </Badge>
          <span className="font-mono text-[11px] tabular-nums text-muted-foreground/60">{String(index + 1).padStart(2, "0")}</span>
        </div>

        <div className="min-h-[3.25rem]">
          <h3 className="text-lg font-bold leading-tight tracking-tight">{product.name}</h3>
          {priced && product.note && <p className="mt-1 text-[11px] leading-snug text-muted-foreground">{product.note}</p>}
        </div>

        <div className="mt-auto">
          <p className={priced ? "text-gradient text-2xl font-extrabold tracking-tight" : "text-base font-semibold text-muted-foreground"}>
            {priced ? formatRupiah(product.price) : product.note || "Chat WA"}
          </p>
          <Button
            size="sm"
            variant="glass"
            className="mt-3.5 w-full justify-between pl-4 pr-3 group-hover:border-primary/50 group-hover:bg-primary group-hover:text-primary-foreground"
            onClick={(e) => {
              e.stopPropagation();
              onOrder(product);
            }}
          >
            <span className="flex items-center gap-2">
              <FaWhatsapp className="!size-4" />
              Pesan
            </span>
            <ArrowUpRight className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Button>
        </div>
      </Card>
    </motion.div>
  );
}
