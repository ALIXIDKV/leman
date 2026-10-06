import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Input } from "antd";
import { Search } from "lucide-react";
import ProductCard from "@/components/ProductCard";
import OrderDialog from "@/components/OrderDialog";
import { getCategories, getProducts } from "@/lib/storage";
import { cn } from "@/lib/utils";

// 5 grup filter; kategori admin dipetakan lewat id (kategori baru → Service)
const GROUPS = ["Semua", "Design", "Panel", "Bot", "Premium App", "Service"];
const groupOf = (id) => (id.startsWith("panel") ? "Panel" : id.startsWith("desain") ? "Design" : id.startsWith("script") ? "Bot" : id.startsWith("apk") ? "Premium App" : "Service");

export default function StorePage() {
  const [categories] = useState(getCategories);
  const [products] = useState(getProducts);
  const [group, setGroup] = useState("Semua");
  const [q, setQ] = useState("");
  const [order, setOrder] = useState(null);

  const catMap = useMemo(() => Object.fromEntries(categories.map((c) => [c.id, c])), [categories]);
  const firstIds = useMemo(() => new Set(categories.map((c) => products.find((p) => p.categoryId === c.id)?.id)), [categories, products]);

  const list = useMemo(() => {
    const t = q.trim().toLowerCase();
    return products.filter((p) => {
      const c = catMap[p.categoryId];
      if (!c) return false;
      if (group !== "Semua" && groupOf(c.id) !== group) return false;
      return !t || `${p.name} ${c.name}`.toLowerCase().includes(t);
    });
  }, [products, catMap, group, q]);

  return (
    <section className="mx-auto max-w-6xl px-5 py-10 sm:py-14">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
        <span className="eyebrow">Digital Marketplace</span>
        <h1 className="mt-3 text-[clamp(2.4rem,8vw,4.5rem)] font-extrabold leading-none tracking-[-0.04em]">
          Leman <span className="font-serif font-normal italic text-primary">Store</span>
        </h1>
        <p className="mt-3 text-muted-foreground">Premium Digital Product</p>
      </motion.div>

      <div className="sticky top-16 z-30 -mx-5 mt-8 bg-gradient-to-b from-background via-background/85 to-transparent px-5 pb-4 pt-2">
        <Input size="large" allowClear value={q} onChange={(e) => setQ(e.target.value)} prefix={<Search className="size-4 text-muted-foreground" />} placeholder="Cari produk…" aria-label="Cari produk" className="!rounded-full" />
        <div className="no-scrollbar -mx-5 mt-3 flex gap-2 overflow-x-auto px-5" role="tablist" aria-label="Kategori">
          {GROUPS.map((g) => (
            <button key={g} type="button" role="tab" aria-selected={group === g} onClick={() => setGroup(g)} className={cn("relative shrink-0 rounded-full px-4 py-1.5 text-[13px] font-semibold transition-colors", group === g ? "text-primary-foreground" : "glass text-muted-foreground hover:text-foreground")}>
              {group === g && <motion.span layoutId="store-chip" className="absolute inset-0 rounded-full bg-primary shadow-[0_0_18px_-4px_hsl(var(--primary)/0.8)]" transition={{ type: "spring", stiffness: 400, damping: 32 }} />}
              <span className="relative">{g}</span>
            </button>
          ))}
        </div>
      </div>

      <motion.div layout className="mt-4 grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 lg:grid-cols-4">
        <AnimatePresence mode="popLayout">
          {list.map((p) => (
            <motion.div key={p.id} layout initial="hidden" animate="show" exit="exit" variants={{ hidden: {}, show: {}, exit: {} }}>
              <ProductCard product={p} category={catMap[p.categoryId]} first={firstIds.has(p.id)} onOrder={setOrder} />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {list.length === 0 && <p className="glass mx-auto mt-10 max-w-sm rounded-3xl p-8 text-center text-sm text-muted-foreground">Produk tidak ditemukan. Coba kata kunci lain.</p>}

      <OrderDialog open={Boolean(order)} product={order} category={order && catMap[order.categoryId]} onClose={() => setOrder(null)} />
    </section>
  );
}
