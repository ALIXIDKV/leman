import { motion } from "framer-motion";
import { Rate } from "antd";
import { ArrowUpRight } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CategoryIcon } from "@/lib/icons";
import { formatRupiah } from "@/lib/utils";

export const itemVariants = {
  hidden: { opacity: 0, y: 22, scale: 0.97 },
  show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
  exit: { opacity: 0, scale: 0.96, transition: { duration: 0.18 } },
};

// rating/badge/gambar bisa diisi per produk (product.rating, product.badge, product.image).
// Jika kosong: rating 4.6–5.0 stabil per produk & badge otomatis.
const hash = (s) => [...s].reduce((a, c) => (a * 31 + c.charCodeAt(0)) >>> 0, 7);
export const ratingOf = (p) => p.rating ?? 4.6 + (hash(p.id) % 5) / 10;
const badgeOf = (p, cat, first) => p.badge ?? (!p.price ? "Tanya stok" : first ? "Best Seller" : cat.isPanel ? "Bergaransi" : "Ready");

export default function ProductCard({ product, category, first, onOrder }) {
  const priced = Boolean(product.price);
  const rating = ratingOf(product);
  return (
    <motion.div variants={itemVariants} layout whileHover={{ y: -6 }} transition={{ type: "spring", stiffness: 320, damping: 24 }} className="h-full">
      <Card className="group h-full cursor-pointer overflow-hidden rounded-3xl transition-[border-color,box-shadow] duration-300 hover:border-primary/40 hover:shadow-[0_24px_50px_-24px_hsl(var(--primary)/0.5)]" onClick={() => onOrder(product)}>
        <div className="relative grid aspect-[16/10] place-items-center overflow-hidden bg-gradient-to-br from-primary/25 via-primary/5 to-transparent">
          {product.image ? (
            <img src={product.image} alt={product.name} loading="lazy" className="size-full object-cover transition-transform duration-500 group-hover:scale-105" />
          ) : (
            <CategoryIcon icon={category.icon} className="size-12 text-primary/80 drop-shadow-[0_0_18px_hsl(var(--primary)/0.6)] transition-transform duration-500 group-hover:scale-110" />
          )}
          <Badge className="absolute left-3 top-3 bg-background/60 backdrop-blur-md">{badgeOf(product, category, first)}</Badge>
        </div>
        <div className="flex flex-col gap-2 p-4">
          <p className="truncate text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">{category.name}</p>
          <h3 className="truncate text-base font-bold leading-tight">{product.name}</h3>
          <div className="flex items-center gap-1.5">
            <Rate disabled allowHalf defaultValue={Math.round(rating * 2) / 2} count={5} style={{ fontSize: 11 }} />
            <span className="text-[11px] tabular-nums text-muted-foreground">{rating.toFixed(1)}</span>
          </div>
          <div className="mt-1 flex items-end justify-between gap-2">
            <p className={priced ? "text-gradient text-xl font-extrabold tracking-tight" : "text-sm font-semibold text-muted-foreground"}>
              {priced ? formatRupiah(product.price) : product.note || "Chat WA"}
            </p>
            <Button size="sm" className="shrink-0 px-3.5" onClick={(e) => { e.stopPropagation(); onOrder(product); }}>
              Beli <ArrowUpRight />
            </Button>
          </div>
          {priced && product.note && <p className="text-[11px] text-muted-foreground">{product.note}</p>}
        </div>
      </Card>
    </motion.div>
  );
}
