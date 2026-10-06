// Data Leman Store & lagu. Edit harga/teks di sini.
// icon = nama icon lucide (lihat src/lib/icons.jsx). type: "price" (daftar harga) | "app" (daftar tanpa harga) | "wa" (langsung WhatsApp).
// (File ini juga disalin ke public/js/data.js untuk panel admin lewat `npm run sync:admin`.)

export const STORE_CATEGORIES = [
  {
    slug: "panel-ilegal",
    name: "Panel Pterodactyl Ilegal",
    title: "Panel Pterodactyl Murah",
    desc: "Panel murah mulai Rp2.000, siap pakai.",
    icon: "zap",
    type: "price",
    badge: "Garansi 3 hari",
    items: [
      { label: "UNLI", price: 5000 },
      { label: "RESELLER", price: 2000 },
      { label: "PT", price: 3000 },
      { label: "OWN", price: 4000 },
      { label: "TK", price: 5000 },
      { label: "CEO", price: 7000 },
    ],
  },
  {
    slug: "panel-legal",
    name: "Panel Pterodactyl Legal",
    title: "Panel Legal",
    desc: "Panel resmi, stabil, garansi lebih panjang.",
    icon: "shield-check",
    type: "price",
    badge: "Garansi 25 hari",
    items: [
      { label: "5GB", price: 5000 },
      { label: "6GB", price: 6000 },
      { label: "7GB", price: 7000 },
      { label: "8GB", price: 8000 },
      { label: "9GB", price: 9500 },
      { label: "10GB", price: 10000 },
      { label: "Unlimited", price: 11000 },
      { label: "Reseller", price: 15000 },
    ],
  },
  {
    slug: "design-logo",
    name: "Design Logo",
    title: "Design Logo",
    desc: "Logo custom untuk brand, bot, dan channel.",
    icon: "pen-tool",
    type: "price",
    items: [{ label: "Harga logo", priceText: "Rp1.000 – Rp10.000", note: "Tergantung tingkat kerumitan" }],
  },
  {
    slug: "script-bot",
    name: "Script Bot Ourin",
    title: "Script Bot WhatsApp Ourin Deluxe MD",
    desc: "Script bot WhatsApp Ourin Deluxe MD.",
    icon: "bot",
    type: "price",
    items: [
      { label: "No Up", price: 15000 },
      { label: "3x Up", price: 35000 },
      { label: "Full Up", price: 60000 },
    ],
  },
  {
    slug: "nokos",
    name: "Nokos",
    title: "Nokos",
    desc: "Nomor kosong untuk verifikasi. Tanya stok via WhatsApp.",
    icon: "smartphone",
    type: "wa",
    cta: "Chat WhatsApp",
    items: [],
  },
  {
    slug: "aplikasi-premium",
    name: "Aplikasi Premium",
    title: "Aplikasi Premium",
    desc: "Streaming & editing premium, harga tanya via WhatsApp.",
    icon: "crown",
    type: "app",
    items: ["YouTube Premium", "Netflix", "Capcut", "Canva", "Alight Motion", "Wetv", "Iqiyi", "Viu", "Spotify"].map((label) => ({ label })),
  },
  {
    slug: "suntik-saluran",
    name: "Suntik Saluran",
    title: "Suntik Saluran",
    desc: "Tambah pengikut saluran, mulai Rp500.",
    icon: "trending-up",
    type: "price",
    bonus: "Pembelian di atas 5K bonus 50 member",
    items: [
      [50, 500], [100, 1000], [200, 2000], [300, 3000], [400, 4000], [500, 5000],
      [600, 6000], [700, 7000], [800, 8000], [900, 9000], [1000, 10000],
    ].map(([n, price]) => ({ label: `${n === 1000 ? "1rb" : n} P`, price })),
  },
];

// ---- Lagu Favorit ----
// src = path mp3 di public/assets/songs/. Kalau kosong/gagal, tombol fallback ke pencarian YouTube (query).
export const SONGS = [
  { id: "song-1", title: "Band4Band", artist: "Central Cee, Lil Baby", src: "assets/songs/band4band.mp3", query: "Central Cee Lil Baby Band4Band" },
  { id: "song-2", title: "Hope", artist: "XXXTENTACION", src: "assets/songs/hope.mp3", query: "XXXTENTACION Hope" },
  { id: "song-3", title: "Starboy", artist: "The Weeknd, Daft Punk", src: "assets/songs/starboy.mp3", query: "The Weeknd Daft Punk Starboy" },
  { id: "song-4", title: "Bad Liar", artist: "Imagine Dragons", src: "assets/songs/bad-liar.mp3", query: "Imagine Dragons Bad Liar" },
];
