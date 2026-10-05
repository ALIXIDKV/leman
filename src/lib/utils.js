import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { SITE } from "@/lib/config";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export const formatRupiah = (n) => "Rp" + Number(n).toLocaleString("id-ID");

export const waLink = (text) =>
  `https://wa.me/${SITE.waNumber}${text ? `?text=${encodeURIComponent(text)}` : ""}`;

export const assetUrl = (src = "") => (/^(https?:|\/|data:)/.test(src) ? src : `/${src}`);
