import { useMemo, useState } from "react";
import { AnimatePresence, LayoutGroup, motion } from "framer-motion";
import { FaWhatsapp } from "react-icons/fa6";
import { PackageOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import ProductCard from "@/components/ProductCard";
import OrderDialog from "@/components/OrderDialog";
import { CategoryIcon } from "@/lib/icons";
import { getCategories, getProducts } from "@/lib/storage";
import { cn, formatRupiah, waLink } from "@/lib/utils";

const gridVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.045, delayChildren: 0.05 } },
  exit: { transition: { staggerChildren: 0.02, staggerDirection: -1 } },
};

export default function Marketplace() {
  const categories = useMemo(getCategories, []);
  const products = useMemo(getProducts, []);
  const [activeId, setActiveId] = useState(categories[0]?.id);
  const [order, setOrder] = useState(null); // { product, category }
  const [open, setOpen] = useState(false);

  const category = categories.find((c) => c.id === activeId) || categories[0];
  const items = useMemo(() => products.filter((p) => p.categoryId === category?.id), [products, category]);
  const minPrice = useMemo(() => {
    const prices = items.map((p) => p.price).filter(Boolean);
    return prices.length ? Math.min(...prices) : null;
  }, [items]);

  const startOrder = (product) => {
    setOrder({ product, category });
    setOpen(true);
  };

  return (
    <section id="market" className="mx-auto max-w-6xl scroll-mt-24 px-5 py-20 sm:py-28">
      <SectionHeading
        eyebrow="Market"
        title="Leman"
        accent="Market"
        description="Pilih kategori, pilih produk, isi form — pesanan langsung diteruskan ke WhatsApp."
      />

      {/* filter kategori */}
      <Reveal delay={0.1} className="-mx-5 mt-10 px-5">
        <LayoutGroup id="market-filter">
          <div role="tablist" aria-label="Kategori produk" className="no-scrollbar -mx-5 flex snap-x gap-2 overflow-x-auto px-5 pb-2">
            {categories.map((c) => {
              const on = c.id === category?.id;
              return (
                <button
                  key={c.id}
                  type="button"
                  role="tab"
                  aria-selected={on}
                  onClick={() => setActiveId(c.id)}
                  className={cn(
                    "relative flex shrink-0 snap-start items-center gap-2 rounded-full px-4 py-2.5 text-sm font-semibold transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                    on ? "text-primary-foreground" : "glass text-muted-foreground hover:text-foreground"
                  )}
                >
                  {on && (
                    <motion.span
                      layoutId="market-chip"
                      transition={{ type: "spring", stiffness: 420, damping: 34 }}
                      className="absolute inset-0 rounded-full bg-primary shadow-[0_8px_28px_-6px_hsl(var(--primary)/0.7)]"
                    />
                  )}
                  <CategoryIcon icon={c.icon} className="relative size-4 shrink-0" />
                  <span className="relative whitespace-nowrap">{c.name}</span>
                </button>
              );
            })}
          </div>
        </LayoutGroup>
      </Reveal>

      {!category ? (
        <p className="mt-10 rounded-3xl border border-dashed border-border/20 p-10 text-center text-sm text-muted-foreground">Belum ada kategori.</p>
      ) : (
        <div className="mt-8 grid gap-5 lg:grid-cols-[19rem_1fr] lg:gap-6">
          {/* panel showcase kategori */}
          <div className="lg:sticky lg:top-28 lg:self-start">
            <AnimatePresence mode="wait">
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="glass-strong relative overflow-hidden rounded-[2rem] p-6"
              >
                <div className="pointer-events-none absolute -right-16 -top-16 size-52 rounded-full bg-primary/25 blur-[70px]" />
                <span className="relative grid size-14 place-items-center rounded-2xl bg-primary text-primary-foreground shadow-[0_10px_34px_-6px_hsl(var(--primary)/0.75)]">
                  <CategoryIcon icon={category.icon} className="size-7" />
                </span>
                <h3 className="relative mt-5 text-3xl font-extrabold leading-tight tracking-tight">{category.name}</h3>
                {category.note && <p className="relative mt-2 text-sm leading-relaxed text-muted-foreground">{category.note}</p>}
                <div className="relative mt-6 grid grid-cols-2 gap-3 border-t border-border/10 pt-5">
                  <div>
                    <p className="text-2xl font-extrabold tabular-nums">{items.length}</p>
                    <p className="text-[11px] text-muted-foreground">produk</p>
                  </div>
                  <div>
                    <p className="text-2xl font-extrabold tabular-nums">{minPrice ? formatRupiah(minPrice) : "—"}</p>
                    <p className="text-[11px] text-muted-foreground">{minPrice ? "mulai dari" : "tanya via WA"}</p>
                  </div>
                </div>
                <Button asChild variant="outline" size="sm" className="relative mt-6 w-full">
                  <a href={waLink(`Halo Leman, saya mau tanya soal ${category.name}`)} target="_blank" rel="noopener noreferrer">
                    <FaWhatsapp className="!size-4" />
                    Tanya dulu
                  </a>
                </Button>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* produk */}
          <div className="min-w-0">
            <AnimatePresence mode="wait">
              {items.length ? (
                <motion.div
                  key={category.id}
                  variants={gridVariants}
                  initial="hidden"
                  animate="show"
                  exit="exit"
                  className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3"
                >
                  {items.map((p, i) => (
                    <ProductCard key={p.id || i} product={p} category={category} index={i} onOrder={startOrder} />
                  ))}
                </motion.div>
              ) : (
                <motion.div key="empty" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="grid place-items-center gap-3 rounded-3xl border border-dashed border-border/20 p-14 text-center text-sm text-muted-foreground">
                  <PackageOpen className="size-8" />
                  Belum ada produk di kategori ini.
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      )}

      <OrderDialog open={open} product={order?.product} category={order?.category} onClose={() => setOpen(false)} />
    </section>
  );
}
