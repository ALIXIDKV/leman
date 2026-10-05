/* admin-core.js — helper ringan untuk panel admin (pengganti app.js lama).
   Key localStorage SAMA dengan website React (src/lib/storage.js), jadi perubahan admin tetap terbaca. */
const LS = {
  DATA: "leman_admin_data",
  SONGS: "leman_admin_songs",
  LOGO: "leman_admin_logo",
  ADMIN_PASS: "leman_admin_pass",
  ORDERS: "leman_orders",
  THEME: "leman_theme",
};

function getStoredData() {
  try { const raw = localStorage.getItem(LS.DATA); return raw ? JSON.parse(raw) : null; } catch (e) { return null; }
}
function getActiveCategories() {
  const s = getStoredData();
  return (s && s.categories) || (typeof CATEGORIES !== "undefined" ? CATEGORIES : []);
}
function getActiveProducts() {
  const s = getStoredData();
  return (s && s.products) || (typeof PRODUCTS !== "undefined" ? PRODUCTS : []);
}
function getActiveSongs() {
  try { const raw = localStorage.getItem(LS.SONGS); if (raw) return JSON.parse(raw); } catch (e) { /* pakai default */ }
  return typeof SONGS !== "undefined" ? SONGS : [];
}

/* logo override */
(function () {
  const logo = localStorage.getItem(LS.LOGO);
  if (logo) document.querySelectorAll("[data-logo]").forEach((img) => (img.src = logo));
})();

/* tema admin: berbagi key dengan website ("dark" | "light") */
(function () {
  const root = document.documentElement;
  const btn = document.getElementById("themeToggle");
  const apply = (t) => { root.setAttribute("data-theme", t); if (btn) btn.textContent = t === "dark" ? "🌙" : "☀️"; };
  let t = localStorage.getItem(LS.THEME) === "light" ? "light" : "dark";
  apply(t);
  if (btn) btn.addEventListener("click", () => {
    t = t === "dark" ? "light" : "dark";
    localStorage.setItem(LS.THEME, t);
    apply(t);
  });
})();

/* loader */
(function () {
  const loader = document.getElementById("loader");
  if (!loader) return;
  const hide = () => (loader.style.display = "none");
  if (document.readyState === "complete") hide(); else window.addEventListener("load", hide);
  setTimeout(hide, 2000);
})();
