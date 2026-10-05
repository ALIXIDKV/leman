# Leman — Premium Creator Portfolio + Digital Marketplace

Vite + React 18 · **Tailwind CSS** · **shadcn/ui** · **Ant Design** · **Framer Motion**

## Jalankan
```bash
npm install
npm run dev       # development  (http://localhost:5173)
npm run build     # production   -> dist/
npm run preview   # cek hasil build
```
Vercel: otomatis (`vercel.json` → `npm run build`, output `dist`).

## Struktur
```
src/
  main.jsx · App.jsx · index.css       entry, susunan halaman, tema (CSS variables) + utilitas glass
  components/
    ThemeCharacterToggle.jsx           tombol dark/light dengan karakter berjalan (Framer Motion + Tailwind animation)
    theme-provider.jsx                 sumber kebenaran dark/light + sinkron ke Ant Design
    player-provider.jsx · MiniPlayer   pemutar lagu persisten (lagu tidak putus saat scroll/pindah section)
    Navbar · Hero · About · Marketplace · ProductCard · OrderDialog · Contact · Footer
    ui/                                shadcn/ui: button, badge, card, sheet, navigation-menu
  lib/
    config.js                          nama, tagline, nomor WA, link sosmed
    data.js                            kategori, produk, harga, lagu
    storage.js                         baca override dari panel admin (localStorage)
public/
  assets/                              logo, favicon, lagu (aset lama, tidak diubah)
  admin.html + admin.css + js/         panel admin lama (mandiri, fungsi utuh)
scripts/sync-admin-data.mjs            menyalin src/lib/{config,data}.js -> public/js (otomatis saat dev/build)
```
Ganti harga/produk: `src/lib/data.js`. Ganti WA/sosmed: `src/lib/config.js`.
Password default admin: env `ADMIN_PASSWORD` saat build (default `leman2024`) — client-side, bukan keamanan sungguhan.

## Dark / light mode
`ThemeProvider` menyimpan tema di `localStorage` (`leman_theme`), memasang class `dark` pada `<html>`, dan script kecil di
`index.html` menerapkannya sebelum render pertama (tanpa kedip). Default: dark. Semua warna memakai CSS variable
(`src/index.css`), jadi light mode adalah tema penuh, bukan sekadar invert.

## Yang dihapus
Halaman/route Tools, menu, `tools.js`, data & dependensi Tools (QR, downloader, dll.), `api/download.js`
(proxy Tools; sekaligus menghapus API key yang tertanam di kode), `build.mjs`, Tailwind config lama, dan seluruh CSS lama.
URL lama (`/tools.html`, `/market.html`, `/kontak.html`) di-redirect lewat `vercel.json`.
