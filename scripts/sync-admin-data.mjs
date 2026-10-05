// Menyalin src/lib/{config,data}.js -> public/js/{config,data}.js (versi global untuk panel admin lama).
// Dijalankan otomatis oleh `npm run dev` / `npm run build`, supaya data produk cukup diedit di satu tempat.
import fs from "node:fs";

const banner = "// AUTO-GENERATED oleh scripts/sync-admin-data.mjs — JANGAN diedit di sini, edit di src/lib/.\n";
const read = (p) => fs.readFileSync(p, "utf8");
fs.mkdirSync("public/js", { recursive: true });

const cfg = read("src/lib/config.js").replace(/export const SITE =/, "window.LEMAN_CONFIG =");
const adminPass = process.env.ADMIN_PASSWORD || "leman2024"; // password default panel admin (client-side, bukan keamanan sungguhan)
fs.writeFileSync(
  "public/js/config.js",
  banner + cfg.trimEnd() + `\nwindow.LEMAN_CONFIG.adminPassword = ${JSON.stringify(adminPass)};\n`
);

fs.writeFileSync("public/js/data.js", banner + read("src/lib/data.js").replace(/^export /gm, ""));
console.log("[sync:admin] public/js/config.js & data.js diperbarui");
