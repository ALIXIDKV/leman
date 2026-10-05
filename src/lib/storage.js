// Membaca data override dari panel admin (localStorage). Key SAMA dengan admin lama,
// jadi produk/lagu/logo yang diedit lewat /admin.html tetap muncul di website baru.
import { CATEGORIES, PRODUCTS, SONGS } from "@/lib/data";

export const LS = {
  DATA: "leman_admin_data",
  SONGS: "leman_admin_songs",
  LOGO: "leman_admin_logo",
  ORDERS: "leman_orders",
  THEME: "leman_theme",
  PLAYER: "leman_player_state",
};

function read(key) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function getCategories() {
  const s = read(LS.DATA);
  return Array.isArray(s?.categories) ? s.categories : CATEGORIES;
}
export function getProducts() {
  const s = read(LS.DATA);
  return Array.isArray(s?.products) ? s.products : PRODUCTS;
}
export function getSongs() {
  const s = read(LS.SONGS);
  return Array.isArray(s) ? s : SONGS;
}
export function getLogo() {
  try {
    return localStorage.getItem(LS.LOGO) || "/assets/logo.jpg";
  } catch {
    return "/assets/logo.jpg";
  }
}
export function logOrder(order) {
  try {
    const list = JSON.parse(localStorage.getItem(LS.ORDERS) || "[]");
    list.unshift({ ...order, time: new Date().toISOString() });
    localStorage.setItem(LS.ORDERS, JSON.stringify(list.slice(0, 300)));
  } catch {
    /* storage penuh/diblokir — order tetap terkirim ke WhatsApp */
  }
}
