import { motion } from "framer-motion";
import CategoryCard from "@/components/CategoryCard";
import { STORE_CATEGORIES } from "@/lib/data";

const list = { hidden: {}, show: { transition: { staggerChildren: 0.07 } } };

export default function StorePage() {
  return (
    <section className="mx-auto max-w-6xl px-5 py-10 sm:py-14">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
        <span className="eyebrow">Digital Marketplace</span>
        <h1 className="mt-3 text-[clamp(2.4rem,8vw,4.5rem)] font-extrabold leading-none tracking-[-0.04em]">
          Leman <span className="font-serif font-normal italic text-primary">Store</span>
        </h1>
        <p className="mt-3 text-muted-foreground">Pilih kategori untuk melihat harga.</p>
      </motion.div>

      <motion.div variants={list} initial="hidden" animate="show" className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {STORE_CATEGORIES.map((cat) => (
          <CategoryCard key={cat.slug} cat={cat} />
        ))}
      </motion.div>
    </section>
  );
}
