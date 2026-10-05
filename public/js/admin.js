/* Password gate — client-side only, jadi bukan keamanan beneran.
   Default-nya diambil dari config.js (window.LEMAN_CONFIG.adminPassword),
   tapi bisa juga diganti langsung dari panel admin (disimpen di localStorage
   per-browser — kalau ada, ini yang menang). Untuk situs yang beneran jual
   barang, ini sebaiknya diganti login server + database. */
function getAdminPassword() {
  const fromConfig = (window.LEMAN_CONFIG && window.LEMAN_CONFIG.adminPassword) || "leman2024";
  return localStorage.getItem(LS.ADMIN_PASS) || fromConfig;
}

const lock = document.getElementById("adminLock");
const app = document.getElementById("adminApp");

function unlock() {
  lock.style.display = "none";
  app.style.display = "block";
  renderAll();
}

if (sessionStorage.getItem("leman_admin_ok") === "1") {
  unlock();
}

document.getElementById("adminLoginBtn").addEventListener("click", tryLogin);
document.getElementById("adminPass").addEventListener("keydown", e => { if (e.key === "Enter") tryLogin(); });
function tryLogin() {
  const val = document.getElementById("adminPass").value;
  if (val === getAdminPassword()) {
    sessionStorage.setItem("leman_admin_ok", "1");
    unlock();
  } else {
    document.getElementById("adminLoginError").style.display = "block";
  }
}
document.getElementById("adminLogout").addEventListener("click", () => {
  sessionStorage.removeItem("leman_admin_ok");
  location.reload();
});

/* ---------- ganti password admin ---------- */
document.getElementById("saveAdminPass").addEventListener("click", () => {
  const val = document.getElementById("newAdminPass").value.trim();
  const msg = document.getElementById("adminPassMsg");
  if (val.length < 4) {
    msg.textContent = "Password minimal 4 karakter.";
    msg.style.color = "var(--danger)";
    msg.style.display = "block";
    return;
  }
  localStorage.setItem(LS.ADMIN_PASS, val);
  document.getElementById("newAdminPass").value = "";
  msg.textContent = "Password berhasil diganti. Dipakai mulai login berikutnya.";
  msg.style.color = "#16a34a";
  msg.style.display = "block";
});
document.getElementById("resetAdminPass").addEventListener("click", () => {
  localStorage.removeItem(LS.ADMIN_PASS);
  const msg = document.getElementById("adminPassMsg");
  msg.textContent = `Password dikembalikan ke default dari config.js (${(window.LEMAN_CONFIG && window.LEMAN_CONFIG.adminPassword) || "leman2024"}).`;
  msg.style.color = "#16a34a";
  msg.style.display = "block";
});

/* working copies (edited in the tables, saved on button click) */
let workingCats = [];
let workingProds = [];
let workingSongs = [];

function renderAll() {
  workingCats = JSON.parse(JSON.stringify(getActiveCategories()));
  workingProds = JSON.parse(JSON.stringify(getActiveProducts()));
  workingSongs = JSON.parse(JSON.stringify(getActiveSongs()));
  renderCatRows();
  renderProdRows();
  renderSongRows();
  renderOrders();
  renderStats();
  const savedLogo = localStorage.getItem(LS.LOGO);
  if (savedLogo) document.getElementById("logoPreview").src = savedLogo;
}

function renderStats() {
  document.getElementById("statProducts").textContent = workingProds.length;
  document.getElementById("statCategories").textContent = workingCats.length;
  document.getElementById("statSongs").textContent = workingSongs.length;
  const orders = JSON.parse(localStorage.getItem(LS.ORDERS) || "[]");
  document.getElementById("statOrders").textContent = orders.length;
  const visits = localStorage.getItem("leman_visit_count");
  document.getElementById("statVisits").textContent = visits || "belum ada data";
}

/* ---------- categories table ---------- */
function renderCatRows() {
  const wrap = document.getElementById("catRows");
  wrap.innerHTML = "";
  workingCats.forEach((cat, i) => {
    const row = document.createElement("div");
    row.className = "arow";
    row.innerHTML = `
      <input data-f="name" placeholder="Nama kategori" value="${escapeHtml(cat.name)}">
      <input data-f="icon" placeholder="Icon (emoji atau <img src=...>)" value="${escapeHtml(cat.icon || "")}">
      <label style="display:flex;align-items:center;gap:6px;font-size:.8rem;color:var(--ink-dim);white-space:nowrap;">
        <input type="checkbox" data-f="isPanel" ${cat.isPanel ? "checked" : ""} style="width:18px;height:18px;flex:none;"> Panel?
      </label>
      <input data-f="note" placeholder="Catatan (opsional)" value="${escapeHtml(cat.note || "")}">
      <button class="del" data-i="${i}">✕</button>
    `;
    row.querySelectorAll("[data-f]").forEach(inp => {
      inp.addEventListener("input", () => {
        const f = inp.dataset.f;
        workingCats[i][f] = f === "isPanel" ? inp.checked : inp.value;
      });
    });
    row.querySelector(".del").addEventListener("click", () => {
      workingCats.splice(i, 1);
      renderCatRows();
    });
    wrap.appendChild(row);
  });
}
document.getElementById("addCatRow").addEventListener("click", () => {
  workingCats.push({ id: "cat-" + Date.now(), name: "Kategori Baru", icon: "★", isPanel: false, note: "" });
  renderCatRows();
});
document.getElementById("saveCats").addEventListener("click", () => {
  saveData();
  alert("Kategori tersimpan (di browser ini).");
});

/* ---------- products table ---------- */
function renderProdRows() {
  const wrap = document.getElementById("prodRows");
  wrap.innerHTML = "";
  workingProds.forEach((p, i) => {
    const row = document.createElement("div");
    row.className = "crow";
    const opts = workingCats.map(c => `<option value="${c.id}" ${c.id === p.categoryId ? "selected" : ""}>${escapeHtml(c.name)}</option>`).join("");
    row.innerHTML = `
      <span style="font-size:.72rem;color:var(--ink-dim);">#${i + 1}</span>
      <input data-f="name" placeholder="Nama produk" value="${escapeHtml(p.name)}">
      <input data-f="price" type="number" value="${p.price || ""}" placeholder="Harga (0 = Chat WA)">
      <select data-f="categoryId">${opts}</select>
      <button class="del" data-i="${i}">✕</button>
    `;
    row.querySelectorAll("[data-f]").forEach(inp => {
      inp.addEventListener("input", () => {
        const f = inp.dataset.f;
        workingProds[i][f] = f === "price" ? (parseInt(inp.value) || null) : inp.value;
      });
    });
    row.querySelector(".del").addEventListener("click", () => {
      workingProds.splice(i, 1);
      renderProdRows();
    });
    wrap.appendChild(row);
  });
}
document.getElementById("addProdRow").addEventListener("click", () => {
  const firstCat = workingCats[0] ? workingCats[0].id : "";
  workingProds.push({ id: "prod-" + Date.now(), categoryId: firstCat, name: "Produk Baru", price: 0 });
  renderProdRows();
});
document.getElementById("saveProds").addEventListener("click", () => {
  saveData();
  alert("Produk tersimpan (di browser ini).");
});

/* ---------- lagu favorit table ---------- */
function renderSongRows() {
  const wrap = document.getElementById("songRows");
  wrap.innerHTML = "";
  workingSongs.forEach((s, i) => {
    const row = document.createElement("div");
    row.className = "srow";
    row.innerHTML = `
      <input data-f="title" placeholder="Judul lagu" value="${escapeHtml(s.title || "")}">
      <input data-f="artist" placeholder="Artis" value="${escapeHtml(s.artist || "")}">
      <input data-f="src" placeholder="assets/songs/namafile.mp3" value="${escapeHtml(s.src || "")}">
      <button class="del" data-i="${i}">✕</button>
    `;
    row.querySelectorAll("[data-f]").forEach(inp => {
      inp.addEventListener("input", () => {
        workingSongs[i][inp.dataset.f] = inp.value;
      });
    });
    row.querySelector(".del").addEventListener("click", () => {
      workingSongs.splice(i, 1);
      renderSongRows();
    });
    wrap.appendChild(row);
  });
}
document.getElementById("addSongRow").addEventListener("click", () => {
  workingSongs.push({ id: "song-" + Date.now(), title: "Lagu Baru", artist: "", src: "" });
  renderSongRows();
});
document.getElementById("saveSongs").addEventListener("click", () => {
  // query buat fallback pencarian YouTube dibikin otomatis dari artis+judul
  workingSongs.forEach(s => { s.query = `${s.artist || ""} ${s.title || ""}`.trim(); });
  localStorage.setItem(LS.SONGS, JSON.stringify(workingSongs));
  renderStats();
  alert("Lagu tersimpan (di browser ini). Refresh website buat lihat perubahannya.");
});

function saveData() {
  localStorage.setItem(LS.DATA, JSON.stringify({ categories: workingCats, products: workingProds }));
  renderStats();
}

/* ---------- logo ---------- */
document.getElementById("logoUpload").addEventListener("change", e => {
  const file = e.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = () => {
    localStorage.setItem(LS.LOGO, reader.result);
    document.getElementById("logoPreview").src = reader.result;
    document.querySelectorAll("[data-logo]").forEach(img => (img.src = reader.result));
  };
  reader.readAsDataURL(file);
});
document.getElementById("logoReset").addEventListener("click", () => {
  localStorage.removeItem(LS.LOGO);
  document.getElementById("logoPreview").src = "assets/logo.jpg";
  document.querySelectorAll("[data-logo]").forEach(img => (img.src = "assets/logo.jpg"));
});

/* ---------- orders ---------- */
function renderOrders() {
  const body = document.getElementById("ordersBody");
  const orders = JSON.parse(localStorage.getItem(LS.ORDERS) || "[]");
  body.innerHTML = orders.length
    ? orders.map(o => `<tr>
        <td>${new Date(o.time).toLocaleString("id-ID")}</td>
        <td>${escapeHtml(o.product || "")}</td>
        <td>${escapeHtml(o.category || "")}</td>
        <td>${escapeHtml(o.name || "-")}</td>
        <td>${escapeHtml(o.contact || "-")}</td>
      </tr>`).join("")
    : `<tr><td colspan="5" style="text-align:center;color:var(--ink-dim);">Belum ada pesanan tercatat.</td></tr>`;
}
document.getElementById("clearOrders").addEventListener("click", () => {
  if (!confirm("Hapus semua riwayat pesanan lokal?")) return;
  localStorage.removeItem(LS.ORDERS);
  renderOrders();
  renderStats();
});

/* ---------- export / reset ---------- */
document.getElementById("exportBtn").addEventListener("click", () => {
  const blob = new Blob([JSON.stringify({ categories: workingCats, products: workingProds, songs: workingSongs }, null, 2)], { type: "application/json" });
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = "leman-market-data.json";
  a.click();
});
document.getElementById("resetAllBtn").addEventListener("click", () => {
  if (!confirm("Reset kategori, produk, lagu, logo, dan password admin ke bawaan file (menghapus semua perubahan admin)?")) return;
  localStorage.removeItem(LS.DATA);
  localStorage.removeItem(LS.SONGS);
  localStorage.removeItem(LS.LOGO);
  localStorage.removeItem(LS.ADMIN_PASS);
  renderAll();
});

function escapeHtml(str) {
  return String(str).replace(/[&<>"']/g, m => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[m]));
}
