import { Server, PenTool, Bot, Smartphone, Sparkles, TrendingUp, Star } from "lucide-react";

const MAP = {
  server: Server,
  "pen-tool": PenTool,
  bot: Bot,
  smartphone: Smartphone,
  sparkles: Sparkles,
  "trending-up": TrendingUp,
};

/** icon kategori: nama lucide, <img src>, atau emoji (hasil edit admin) */
export function CategoryIcon({ icon, className }) {
  const key = String(icon || "").trim();
  const Cmp = MAP[key];
  if (Cmp) return <Cmp className={className} aria-hidden="true" />;
  const img = key.match(/<img[^>]+src=["']([^"']+)["']/i);
  if (img) return <img src={img[1]} alt="" loading="lazy" className={className} />;
  if (key && key.length <= 4) return <span className={className} aria-hidden="true">{key}</span>;
  return <Star className={className} aria-hidden="true" />;
}
