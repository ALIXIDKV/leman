// Membaca data override dari panel admin (localStorage). Key SAMA dengan admin lama,
// jadi produk/lagu/logo yang diedit lewat /admin.html tetap muncul di website baru.
import { SONGS } from "@/lib/data";

export const LS = {
  SONGS: "leman_admin_songs",
  LOGO: "leman_admin_logo",
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
