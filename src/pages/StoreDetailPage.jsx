import { motion } from "framer-motion";
import { Result, Tag, Tooltip } from "antd";
import { ArrowLeft, Gift, ShieldCheck } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa6";
import { Button } from "@/components/ui/button";
import { Link, useRouter } from "@/lib/router";
import { CategoryIcon } from "@/lib/icons";
import { STORE_CATEGORIES } from "@/lib/data";
import { formatRupiah, waLink } from "@/lib/utils";

const rows = { hidden: {}, show: { transition: { staggerChildren: 0.05 } } };
const row = { hidden: { opacity: 0, y: 14 }, show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] } } };

const priceOf = (it) => it.priceText || (it.price ? formatRupiah(it.price) : null);

export default function StoreDetailPage() {
  const { path } = useRouter();
  const cat = STORE_CATEGORIES.find((c) => `/store/${c.slug}` === path);

  if (!cat) {
    return (
      <section className="mx-auto max-w-6xl px-5 py-16">
        <Result status="404" title="Kategori tidak ditemukan" extra={<Button asChild><Link to="/store">Kembali ke Store</Link></Button>} />
      </section>
    );
  }

  const order = (it) => waLink(`Halo Leman, saya mau order:\n${cat.title} — ${it.label}${priceOf(it) ? ` (${priceOf(it)})` : ""}`);
  const ask = waLink(`Halo Leman, saya mau tanya ${cat.name}`);

  return (
    <section className="mx-auto max-w-3xl px-5 py-8 sm:py-12">
      <Link to="/store" className="inline-flex items-center gap-1.5 text-sm font-semibold text-muted-foreground transition-colors hover:text-primary">
        <ArrowLeft className="size-4" /> Semua kategori
      </Link>

      <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="glass relative mt-5 overflow-hidden rounded-3xl p-6 sm:p-8">
        <span aria-hidden="true" className="pointer-events-none absolute -right-12 -top-12 size-48 rounded-full bg-primary/25 blur-3xl" />
        <div className="relative flex items-center gap-4">
          <span className="grid size-14 shrink-0 place-items-center rounded-2xl bg-primary/15 text-primary ring-1 ring-primary/30 shadow-[0_0_28px_-6px_hsl(var(--primary)/0.7)]">
            <CategoryIcon icon={cat.icon} className="size-7" />
          </span>
          <div className="min-w-0">
            <h1 className="text-2xl font-extrabold leading-tight tracking-tight sm:text-3xl">{cat.title}</h1>
            <p className="mt-1 text-sm text-muted-foreground">{cat.desc}</p>
          </div>
        </div>
        {(cat.badge || cat.bonus) && (
          <div className="relative mt-5 flex flex-wrap gap-2">
            {cat.badge && <Tag color="green" icon={<ShieldCheck className="mr-1 inline size-3.5 align-[-2px]" />} className="!rounded-full !px-3 !py-0.5 !text-[12px] !font-semibold">{cat.badge}</Tag>}
            {cat.bonus && <Tag color="gold" icon={<Gift className="mr-1 inline size-3.5 align-[-2px]" />} className="!rounded-full !px-3 !py-0.5 !text-[12px] !font-semibold">{cat.bonus}</Tag>}
          </div>
        )}
      </motion.div>

      {cat.type === "wa" ? (
        <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} className="mt-5">
          <Button asChild size="lg" className="w-full"><a href={ask} target="_blank" rel="noopener noreferrer"><FaWhatsapp className="!size-5" /> {cat.cta}</a></Button>
        </motion.div>
      ) : (
        <motion.ul variants={rows} initial="hidden" animate="show" className="mt-5 grid gap-2.5">
          {cat.items.map((it) => (
            <motion.li key={it.label} variants={row} whileHover={{ x: 4 }} className="glass group flex items-center justify-between gap-3 rounded-2xl px-4 py-3 transition-[border-color] duration-300 hover:border-primary/40">
              <div className="min-w-0">
                <p className="truncate text-[15px] font-bold">{it.label}</p>
                {it.note && <p className="text-[11px] text-muted-foreground">{it.note}</p>}
              </div>
              <div className="flex shrink-0 items-center gap-3">
                {priceOf(it) && <span className="text-gradient text-base font-extrabold tabular-nums sm:text-lg">{priceOf(it)}</span>}
                <Tooltip title="Order via WhatsApp">
                  <Button asChild size="sm" className="px-3.5">
                    <a href={cat.type === "app" ? waLink(`Halo Leman, saya mau tanya harga ${it.label}`) : order(it)} target="_blank" rel="noopener noreferrer" aria-label={`${cat.type === "app" ? "Tanya harga" : "Beli"} ${it.label} via WhatsApp`}>
                      <FaWhatsapp /> {cat.type === "app" ? "Tanya" : "Beli"}
                    </a>
                  </Button>
                </Tooltip>
              </div>
            </motion.li>
          ))}
        </motion.ul>
      )}
    </section>
  );
}
