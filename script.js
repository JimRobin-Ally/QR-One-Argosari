(function () {
  const rupiahSafeText = (value) => String(value || "").trim();

  const setText = (id, value) => {
    const el = document.getElementById(id);
    if (el) el.textContent = value;
  };

  const setSrc = (id, value) => {
    const el = document.getElementById(id);
    if (el && value) el.src = value;
  };

  const normalize = (text) => rupiahSafeText(text).toLowerCase();

  const getFormUrl = () => CONFIG.form && CONFIG.form.url ? CONFIG.form.url : "#daftar";

  function bootSiteText() {
    setText("navTitle", CONFIG.site.title);
    setText("siteTitle", CONFIG.site.title);
    setText("eyebrow", CONFIG.site.eyebrow);
    setText("siteTagline", CONFIG.site.tagline);
    setText("siteIntro", CONFIG.site.intro);
    setText("siteNotice", CONFIG.site.notice);
    setText("validationText", CONFIG.site.validationText);
    setText("footerText", CONFIG.site.footer);
    setText("lastUpdated", `Terakhir diperbarui: ${CONFIG.site.lastUpdated}`);
    setText("formDescription", CONFIG.form.description);

    const formButton = document.getElementById("formButton");
    if (formButton) {
      formButton.href = getFormUrl();
      formButton.textContent = CONFIG.form.buttonText || "Buka Form";
    }

    setSrc("coverImage", CONFIG.assets.cover);
    setSrc("mainLogo", CONFIG.assets.mainLogo);
    setSrc("navLogo", CONFIG.assets.navLogo);
    setSrc("kknLogo", CONFIG.assets.kknLogo);
    setSrc("campusLogo", CONFIG.assets.campusLogo);
  }

  function renderQuickActions() {
    const target = document.getElementById("quickActions");
    if (!target) return;
    target.innerHTML = "";
    (CONFIG.quickActions || []).forEach((action) => {
      const a = document.createElement("a");
      a.className = "quick-action";
      a.href = action.href || "#";
      a.innerHTML = `<span>${action.icon || "🔗"}</span><strong>${action.label || "Tautan"}</strong>`;
      target.appendChild(a);
    });
  }

  function makeCard(item) {
    const url = item.useFormUrl ? getFormUrl() : item.link;
    const article = document.createElement("article");
    article.className = "info-card";
    article.dataset.search = normalize(`${item.title} ${item.description} ${item.status}`);

    const title = rupiahSafeText(item.title);
    const icon = item.icon || "📌";
    const description = rupiahSafeText(item.description);
    const status = rupiahSafeText(item.status);
    const linkText = rupiahSafeText(item.linkText || "Buka Informasi");
    const isRealLink = url && url !== "#";

    article.innerHTML = `
      <div class="card-main">
        <div class="card-icon" aria-hidden="true">${icon}</div>
        <div>
          <h3>${title}</h3>
          <p>${description}</p>
          ${status ? `<p class="status"><strong>Status:</strong> ${status}</p>` : ""}
        </div>
      </div>
      ${isRealLink ? `<a class="card-link" href="${url}" target="_blank" rel="noopener">🔗 ${linkText}</a>` : `<span class="card-link muted">🔒 Link belum diisi</span>`}
    `;

    if (isRealLink) {
      article.addEventListener("click", (event) => {
        if (event.target.tagName.toLowerCase() === "a") return;
        window.open(url, "_blank", "noopener");
      });
      article.classList.add("clickable");
    }

    return article;
  }

  function makeSection(section) {
    const sectionEl = document.createElement("section");
    sectionEl.className = "data-section";
    sectionEl.id = section.id;
    sectionEl.innerHTML = `<h2>${section.title}</h2>`;

    const grid = document.createElement("div");
    grid.className = `cards-grid columns-${section.columns || 1}`;

    (section.items || []).forEach((item) => grid.appendChild(makeCard(item)));
    sectionEl.appendChild(grid);
    return sectionEl;
  }

  function renderSections() {
    const content = document.getElementById("content");
    if (!content) return;
    content.innerHTML = "";

    const layout = document.createElement("div");
    layout.className = "portal-layout";

    const left = document.createElement("div");
    left.className = "layout-column left-column";
    const middle = document.createElement("div");
    middle.className = "layout-column middle-column";
    const right = document.createElement("div");
    right.className = "layout-column right-column";

    DATA_SECTIONS.forEach((section) => {
      const sectionNode = makeSection(section);
      if (["informasi", "umkm-wisata"].includes(section.id)) left.appendChild(sectionNode);
      else if (["fasum", "pembaruan"].includes(section.id)) middle.appendChild(sectionNode);
      else right.appendChild(sectionNode);
    });

    layout.appendChild(left);
    layout.appendChild(middle);
    layout.appendChild(right);
    content.appendChild(layout);
  }

  function wireSearch() {
    const input = document.getElementById("searchInput");
    if (!input) return;
    input.addEventListener("input", () => {
      const query = normalize(input.value);
      const cards = document.querySelectorAll(".info-card");
      cards.forEach((card) => {
        const match = !query || card.dataset.search.includes(query);
        card.classList.toggle("hidden", !match);
      });
      document.querySelectorAll(".data-section").forEach((section) => {
        const visible = section.querySelectorAll(".info-card:not(.hidden)").length > 0;
        section.classList.toggle("hidden", !visible);
      });
    });
  }

  function scrollByUrlParam() {
    const params = new URLSearchParams(window.location.search);
    const kategori = params.get("kategori");
    const aliases = {
      umkm: "umkm-wisata",
      wisata: "umkm-wisata",
      fasum: "fasum",
      evakuasi: "mitigasi",
      mitigasi: "mitigasi",
      daftar: "daftar"
    };
    if (kategori && aliases[kategori]) {
      setTimeout(() => {
        document.getElementById(aliases[kategori])?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 300);
    }
  }

  async function loadSheetRows() {
    if (!CONFIG.googleSheetCsvUrl) return;
    try {
      const response = await fetch(CONFIG.googleSheetCsvUrl);
      const csv = await response.text();
      const rows = csvToObjects(csv);
      const approved = rows.filter((row) => {
        if (!CONFIG.showOnlyApprovedSheetRows) return true;
        return normalize(row.status_tayang) === "disetujui";
      });
      if (!approved.length) return;

      const sheetSection = {
        id: "data-terbaru",
        title: "Data Terbaru dari Form",
        columns: 1,
        items: approved.map((row) => ({
          title: row.nama || row.name || "Data baru",
          icon: row.icon || "📌",
          description: row.deskripsi || row.description || row.kategori || "Data dari Google Form",
          status: row.kategori ? `Kategori: ${row.kategori}` : "Disetujui admin",
          linkText: "Buka Maps/Info",
          link: row.link_google_maps || row.maps || row.link || "#"
        }))
      };
      DATA_SECTIONS.push(sheetSection);
      renderSections();
      wireSearch();
    } catch (error) {
      console.warn("Gagal membaca Google Sheet CSV", error);
    }
  }

  function csvToObjects(csv) {
    const lines = csv.split(/\r?\n/).filter(Boolean);
    if (!lines.length) return [];
    const headers = splitCsvLine(lines.shift()).map((h) => normalize(h).replace(/\s+/g, "_"));
    return lines.map((line) => {
      const values = splitCsvLine(line);
      const row = {};
      headers.forEach((header, index) => { row[header] = values[index] || ""; });
      return row;
    });
  }

  function splitCsvLine(line) {
    const output = [];
    let current = "";
    let quote = false;
    for (let i = 0; i < line.length; i += 1) {
      const char = line[i];
      const next = line[i + 1];
      if (char === '"' && quote && next === '"') {
        current += '"';
        i += 1;
      } else if (char === '"') {
        quote = !quote;
      } else if (char === "," && !quote) {
        output.push(current);
        current = "";
      } else {
        current += char;
      }
    }
    output.push(current);
    return output.map((v) => v.trim());
  }

  bootSiteText();
  renderQuickActions();
  renderSections();
  wireSearch();
  scrollByUrlParam();
  loadSheetRows();
})();
