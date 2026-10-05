// AUTO-GENERATED oleh scripts/sync-admin-data.mjs — JANGAN diedit di sini, edit di src/lib/.
// Semua kategori, produk & lagu Leman Market. Edit harga/teks di sini.
// categoryId di tiap produk harus cocok dengan id di CATEGORIES.
// isPanel:true -> form order menampilkan kolom "Username panel".
// icon = nama icon lucide (server, pen-tool, bot, smartphone, sparkles, trending-up), emoji, atau <img src="...">.
// (File ini juga disalin ke public/js/data.js untuk panel admin lewat `npm run sync:admin`.)

const CATEGORIES = [
  { id: "panel-murah", name: "Panel Murah", icon: "server", isPanel: true, note: "Garansi 3 hari." },
  { id: "panel-legal", name: "Panel Legal", icon: "server", isPanel: true, note: "Garansi 25 hari." },
  { id: "desain-logo", name: "Desain Logo", icon: "pen-tool", isPanel: false, note: "Harga tergantung tingkat kerumitan." },
  { id: "script-bot", name: "Script Bot Ourin", icon: "bot", isPanel: false, note: "Script Bot WhatsApp Ourin Deluxe MD." },
  { id: "nokos", name: "Nokos", icon: "smartphone", isPanel: false, note: "Stok & harga tanya langsung via WhatsApp." },
  { id: "apk-premium", name: "Aplikasi Premium", icon: "sparkles", isPanel: false, note: "Harga per akun, tanya via WhatsApp." },
  { id: "suntik-saluran", name: "Suntik Saluran (SL)", icon: "trending-up", isPanel: false, note: "Pembelian di atas 5K bonus 50 member." },
];

const PRODUCTS = [
  // ---- Panel Murah — garansi 3 hari ----
  { id: "pm-unli", categoryId: "panel-murah", name: "UNLI", price: 5000 },
  { id: "pm-reseller", categoryId: "panel-murah", name: "RESELLER", price: 2000 },
  { id: "pm-pt", categoryId: "panel-murah", name: "PT", price: 3000 },
  { id: "pm-own", categoryId: "panel-murah", name: "OWN", price: 4000 },
  { id: "pm-tk", categoryId: "panel-murah", name: "TK", price: 5000 },
  { id: "pm-ceo", categoryId: "panel-murah", name: "CEO", price: 7000 },

  // ---- Panel Legal — garansi 25 hari ----
  { id: "pl-5gb", categoryId: "panel-legal", name: "5GB", price: 5000 },
  { id: "pl-6gb", categoryId: "panel-legal", name: "6GB", price: 6000 },
  { id: "pl-7gb", categoryId: "panel-legal", name: "7GB", price: 7000 },
  { id: "pl-8gb", categoryId: "panel-legal", name: "8GB", price: 8000 },
  { id: "pl-9gb", categoryId: "panel-legal", name: "9GB", price: 9500 },
  { id: "pl-10gb", categoryId: "panel-legal", name: "10GB", price: 10000 },
  { id: "pl-unlimited", categoryId: "panel-legal", name: "UNLIMITED", price: 11000 },
  { id: "pl-reseller", categoryId: "panel-legal", name: "RESELLER", price: 15000 },

  // ---- Desain logo ----
  { id: "logo-simpel", categoryId: "desain-logo", name: "Logo simpel", price: 1000, note: "mulai dari" },
  { id: "logo-detail", categoryId: "desain-logo", name: "Logo custom detail", price: 10000, note: "sampai" },

  // ---- Script bot ----
  { id: "sc-noup", categoryId: "script-bot", name: "NO UP", price: 15000 },
  { id: "sc-3xup", categoryId: "script-bot", name: "3× UP", price: 35000 },
  { id: "sc-fullup", categoryId: "script-bot", name: "FULL UP", price: 60000 },

  // ---- Nokos ----
  { id: "nokos-tanya", categoryId: "nokos", name: "Cek stok & harga nomor", price: null, note: "Chat WA" },

  // ---- Aplikasi premium ----
  { id: "apk-yt", categoryId: "apk-premium", name: "YouTube Premium", price: null, note: "Chat WA" },
  { id: "apk-netflix", categoryId: "apk-premium", name: "Netflix", price: null, note: "Chat WA" },
  { id: "apk-capcut", categoryId: "apk-premium", name: "CapCut", price: null, note: "Chat WA" },
  { id: "apk-canva", categoryId: "apk-premium", name: "Canva", price: null, note: "Chat WA" },
  { id: "apk-am", categoryId: "apk-premium", name: "Alight Motion", price: null, note: "Chat WA" },
  { id: "apk-wetv", categoryId: "apk-premium", name: "WeTV", price: null, note: "Chat WA" },
  { id: "apk-iqiyi", categoryId: "apk-premium", name: "iQIYI", price: null, note: "Chat WA" },
  { id: "apk-viu", categoryId: "apk-premium", name: "Viu", price: null, note: "Chat WA" },
  { id: "apk-spotify", categoryId: "apk-premium", name: "Spotify", price: null, note: "Chat WA" },

  // ---- Suntik saluran (SL) ----
  { id: "sl-50", categoryId: "suntik-saluran", name: "50 Pengikut", price: 500 },
  { id: "sl-100", categoryId: "suntik-saluran", name: "100 Pengikut", price: 1000 },
  { id: "sl-200", categoryId: "suntik-saluran", name: "200 Pengikut", price: 2000 },
  { id: "sl-300", categoryId: "suntik-saluran", name: "300 Pengikut", price: 3000 },
  { id: "sl-400", categoryId: "suntik-saluran", name: "400 Pengikut", price: 4000 },
  { id: "sl-500", categoryId: "suntik-saluran", name: "500 Pengikut", price: 5000 },
  { id: "sl-600", categoryId: "suntik-saluran", name: "600 Pengikut", price: 6000 },
  { id: "sl-700", categoryId: "suntik-saluran", name: "700 Pengikut", price: 7000 },
  { id: "sl-800", categoryId: "suntik-saluran", name: "800 Pengikut", price: 8000 },
  { id: "sl-900", categoryId: "suntik-saluran", name: "900 Pengikut", price: 9000 },
  { id: "sl-1000", categoryId: "suntik-saluran", name: "1.000 Pengikut", price: 10000, note: "dan seterusnya, lebih dari itu chat WA" },
];

// ---- Lagu Favorit ----
// src = path mp3 di public/assets/songs/. Kalau kosong/gagal, tombol fallback ke pencarian YouTube (query).
const SONGS = [
  { id: "song-1", title: "Band4Band", artist: "Central Cee, Lil Baby", src: "assets/songs/band4band.mp3", query: "Central Cee Lil Baby Band4Band" },
  { id: "song-2", title: "Hope", artist: "XXXTENTACION", src: "assets/songs/hope.mp3", query: "XXXTENTACION Hope" },
  { id: "song-3", title: "Starboy", artist: "The Weeknd, Daft Punk", src: "assets/songs/starboy.mp3", query: "The Weeknd Daft Punk Starboy" },
  { id: "song-4", title: "Bad Liar", artist: "Imagine Dragons", src: "assets/songs/bad-liar.mp3", query: "Imagine Dragons Bad Liar" },
];
