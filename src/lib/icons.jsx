import { Zap, ShieldCheck, PenTool, Bot, Smartphone, Crown, TrendingUp, Star } from "lucide-react";

const MAP = {
  zap: Zap,
  "shield-check": ShieldCheck,
  "pen-tool": PenTool,
  bot: Bot,
  smartphone: Smartphone,
  crown: Crown,
  "trending-up": TrendingUp,
};

/** icon kategori berdasarkan nama lucide (fallback: bintang) */
export function CategoryIcon({ icon, className }) {
  const Cmp = MAP[String(icon || "").trim()] || Star;
  return <Cmp className={className} aria-hidden="true" />;
}
