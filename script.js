(function () {
  const config = window.PORTAL_CONFIG || {};
  const site = config.site || {};
  let allItems = [];
  let activeCategory = "all";
  let searchTerm = "";

  const $ = (id) => document.getElementById(id);

  function setText(id, value) {
    const el = $(id);
    if (el && value !== undefined && value !== null) el.textContent = value;
  }

  function escapeHtml(value) {
    return String(value ?? "").replace(/[&<>'"]/g, (char) => ({
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      "'": "&#39;",
      '"': "&quot;"
    }[char]));
  }

  function setupSite() {
    setText("brandText", site.brand || site.title || "QR-One");
    setText("brandIcon", site.logo || "🌄");
    setText("logoCard", site.logo || "🌄");
    setText("eyebrow", site.eyebrow || "Portal Informasi Digital");
    setText("siteTitle", site.title || "QR-One");
    setText("siteSubtitle", site.subtitle || "Portal informasi digital");
    setText("siteIntro", site.intro || "");
    setText("noticeBox", site.notice || "");
    setText("validationText", site.validationText || "");
    setText("footerText", site.footer || site.title || "QR-One");
    setText("lastUpdated", `Terakhir diperbarui: ${site.lastUpdated || "-"}`);

    if (site.coverImage) {
      const cover = $("cover");
      cover.style.backgroundImage = `linear-gradient(180deg, rgba(0,0,0,0.06), rgba(247,244,236,0.92)), url("${site.coverImage}")`;
    }

    const formButton = $("formButton");
    if (formButton) {
      if (site.formUrl && !site.formUrl.includes("GANTI_DENGAN")) {
        formButton.href = site.formUrl;
      } else {
        formButton.href = "#";
        formButton.addEventListener("click", (event) => {
          event.preventDefault();
          alert("Link Google Form belum diisi di file data.js");
        });
      }
    }
  }

  function setupChips() {
    const chips = $("categoryChips");
    if (!chips) return;
    const cats = [{ id: "all", title: "Semua" }, ...(config.categories || [])];
    chips.innerHTML = cats.map(cat => `<button class="chip${cat.id === activeCategory ? " active" : ""}" data-category="${escapeHtml(cat.id)}">${escapeHtml(cat.title)}</button>`).join("");
    chips.querySelectorAll("button").forEach(button => {
      button.addEventListener("click", () => {
        activeCategory = button.dataset.category;
        setupChips();
        render();
      });
    });
  }

  function searchable(item) {
    return [item.category, item.name, item.description, item.address, item.status, item.phone]
      .filter(Boolean)
      .join(" ")
      .toLowerCase();
  }

  function getVisibleItems() {
    return allItems.filter(item => {
      const categoryMatch = activeCategory === "all" || item.category === activeCategory;
      const searchMatch = !searchTerm || searchable(item).includes(searchTerm.toLowerCase());
      return categoryMatch && searchMatch;
    });
  }

  function renderActions(item) {
    const actions = [];
    if (item.mapsUrl) actions.push(`<a class="action" href="${escapeHtml(item.mapsUrl)}" target="_blank" rel="noopener">🔗 Buka Maps</a>`);
    if (item.externalUrl) actions.push(`<a class="action" href="${escapeHtml(item.externalUrl)}" target="_blank" rel="noopener">🔗 Buka Link</a>`);
    if (item.phone) actions.push(`<a class="action" href="tel:${escapeHtml(item.phone)}">☎️ Telepon</a>`);
    if (item.whatsapp) actions.push(`<a class="action" href="https://wa.me/${escapeHtml(item.whatsapp)}" target="_blank" rel="noopener">💬 WhatsApp</a>`);
    return actions.length ? `<div class="actions">${actions.join("")}</div>` : "";
  }

  function renderCard(item, fallbackTone) {
    const tone = item.tone || fallbackTone || "green";
    return `
      <article class="info-card" data-tone="${escapeHtml(tone)}">
        <div class="card-heading">
          <span class="icon-badge">${escapeHtml(item.icon || "📌")}</span>
          <h3>${escapeHtml(item.name || "Tanpa judul")}</h3>
        </div>
        ${item.description ? `<p>${escapeHtml(item.description)}</p>` : ""}
        ${item.address ? `<p class="meta">Lokasi: ${escapeHtml(item.address)}</p>` : ""}
        ${item.status ? `<p class="meta">Status: ${escapeHtml(item.status)}</p>` : ""}
        ${renderActions(item)}
      </article>
    `;
  }

  function render() {
    const root = $("portalSections");
    if (!root) return;
    const visible = getVisibleItems();
    const categories = config.categories || [];

    root.innerHTML = categories.map(cat => {
      const items = visible.filter(item => item.category === cat.id);
      if (!items.length && activeCategory !== cat.id) return "";
      return `
        <section class="portal-section${cat.wide ? " wide" : ""}" id="${escapeHtml(cat.id)}">
          <div class="section-title">
            <h2>${escapeHtml(cat.icon || "📌")} ${escapeHtml(cat.title)}</h2>
            <span class="section-count">${items.length} data</span>
          </div>
          <div class="card-list">
            ${items.length ? items.map(item => renderCard(item, cat.tone)).join("") : `<div class="empty">Belum ada data untuk kategori ini.</div>`}
          </div>
        </section>
      `;
    }).join("");

    if (!root.innerHTML.trim()) {
      root.innerHTML = `<div class="empty">Tidak ada data yang cocok dengan pencarian.</div>`;
    }
  }

  function parseCsv(text) {
    const rows = [];
    let row = [];
    let cell = "";
    let inQuotes = false;

    for (let i = 0; i < text.length; i++) {
      const char = text[i];
      const next = text[i + 1];
      if (char === '"') {
        if (inQuotes && next === '"') {
          cell += '"';
          i++;
        } else {
          inQuotes = !inQuotes;
        }
      } else if (char === "," && !inQuotes) {
        row.push(cell);
        cell = "";
      } else if ((char === "\n" || char === "\r") && !inQuotes) {
        if (char === "\r" && next === "\n") i++;
        row.push(cell);
        if (row.some(value => value.trim() !== "")) rows.push(row);
        row = [];
        cell = "";
      } else {
        cell += char;
      }
    }
    row.push(cell);
    if (row.some(value => value.trim() !== "")) rows.push(row);
    return rows;
  }

  function normalizeHeader(header) {
    return String(header || "")
      .trim()
      .toLowerCase()
      .replace(/\s+/g, "_")
      .replace(/[()]/g, "");
  }

  function mapSheetRow(row) {
    const get = (...names) => {
      for (const name of names) {
        const key = normalizeHeader(name);
        if (row[key] !== undefined && String(row[key]).trim() !== "") return String(row[key]).trim();
      }
      return "";
    };

    const approved = get("status_tayang", "status tayang", "approved", "status", "verifikasi");
    const isApproved = ["approved", "setuju", "disetujui", "ya", "yes", "tayang", "publish", "published"].includes(approved.toLowerCase());

    if (!isApproved) return null;

    const categoryRaw = get("kategori", "category", "jenis").toLowerCase();
    const categoryMap = {
      "umkm": "wisata-ekonomi",
      "wisata": "wisata-ekonomi",
      "ekonomi": "wisata-ekonomi",
      "fasilitas umum": "fasum",
      "fasum": "fasum",
      "mitigasi": "mitigasi",
      "jalur evakuasi": "mitigasi",
      "kontak": "mitigasi",
      "informasi": "informasi",
      "pembaruan": "pembaruan"
    };

    return {
      category: categoryMap[categoryRaw] || categoryRaw || "informasi",
      name: get("nama", "judul", "nama usaha", "nama tempat", "name"),
      icon: get("icon", "ikon") || "📌",
      description: get("deskripsi", "keterangan", "description"),
      address: get("alamat", "lokasi", "address"),
      mapsUrl: get("mapsUrl", "maps_url", "google maps", "link maps", "link google maps", "maps"),
      externalUrl: get("externalUrl", "external_url", "link", "website", "instagram"),
      phone: get("phone", "telepon", "nomor telepon", "no hp", "nomor hp"),
      whatsapp: get("whatsapp", "wa", "nomor whatsapp"),
      status: get("catatan", "status", "status_tayang") || "Data dari formulir",
      tone: get("tone", "warna") || "green"
    };
  }

  async function loadSheetItems() {
    const url = config.sheetCsvUrl;
    const status = $("syncStatus");
    if (!url) return [];

    try {
      if (status) {
        status.hidden = false;
        status.textContent = "Memuat data tambahan dari Google Sheet...";
      }
      const response = await fetch(url, { cache: "no-store" });
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      const csv = await response.text();
      const rows = parseCsv(csv);
      if (!rows.length) return [];
      const headers = rows[0].map(normalizeHeader);
      const records = rows.slice(1).map(values => {
        const row = {};
        headers.forEach((header, index) => row[header] = values[index] || "");
        return row;
      });
      const sheetItems = records.map(mapSheetRow).filter(Boolean).filter(item => item.name);
      if (status) {
        status.textContent = `Berhasil memuat ${sheetItems.length} data yang sudah disetujui dari Google Sheet.`;
        setTimeout(() => { status.hidden = true; }, 5000);
      }
      return sheetItems;
    } catch (error) {
      if (status) {
        status.hidden = false;
        status.textContent = "Data Google Sheet belum bisa dimuat. Website tetap memakai data manual.";
      }
      console.error(error);
      return [];
    }
  }

  async function init() {
    setupSite();
    setupChips();

    const manualItems = Array.isArray(config.items) ? config.items : [];
    const sheetItems = await loadSheetItems();
    if (config.sheetCsvUrl && !config.combineManualAndSheet) {
      allItems = sheetItems.length ? sheetItems : manualItems;
    } else {
      allItems = [...manualItems, ...sheetItems];
    }

    const params = new URLSearchParams(window.location.search);
    const categoryFromUrl = params.get("kategori");
    if (categoryFromUrl) {
      const map = {
        umkm: "wisata-ekonomi",
        wisata: "wisata-ekonomi",
        fasum: "fasum",
        evakuasi: "mitigasi",
        mitigasi: "mitigasi",
        kontak: "mitigasi"
      };
      activeCategory = map[categoryFromUrl] || categoryFromUrl;
      setupChips();
    }

    const search = $("searchInput");
    if (search) {
      search.addEventListener("input", (event) => {
        searchTerm = event.target.value.trim();
        render();
      });
    }
    render();
  }

  init();
})();
