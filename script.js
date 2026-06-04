const titleEl = document.getElementById("site-title");
const subtitleEl = document.getElementById("site-subtitle");
const noticeBox = document.getElementById("notice-box");
const footerText = document.getElementById("footer-text");
const categoryGrid = document.getElementById("category-grid");
const itemsList = document.getElementById("items-list");
const activeCategoryTitle = document.getElementById("active-category-title");
const searchInput = document.getElementById("search-input");
const emptyState = document.getElementById("empty-state");
const showAllButton = document.getElementById("show-all-button");

let activeCategory = new URLSearchParams(window.location.search).get("kategori") || "all";
let searchTerm = "";

function setupSite() {
  document.title = PORTAL_DATA.site.title;
  titleEl.textContent = PORTAL_DATA.site.title;
  subtitleEl.textContent = PORTAL_DATA.site.subtitle;

  if (PORTAL_DATA.site.notice) {
    noticeBox.textContent = PORTAL_DATA.site.notice;
    noticeBox.hidden = false;
  }

  footerText.textContent = `Dikelola oleh ${PORTAL_DATA.site.title}. Terakhir diperbarui: ${PORTAL_DATA.site.lastUpdated}`;
}

function renderCategories() {
  categoryGrid.innerHTML = "";

  PORTAL_DATA.categories.forEach((category) => {
    const button = document.createElement("button");
    button.className = `category-card ${activeCategory === category.id ? "active" : ""}`;
    button.type = "button";
    button.innerHTML = `
      <span class="category-icon">${category.icon}</span>
      <h3>${category.title}</h3>
      <p>${category.description}</p>
    `;

    button.addEventListener("click", () => {
      activeCategory = category.id;
      searchTerm = "";
      searchInput.value = "";
      updateUrlCategory(category.id);
      renderAll();
      document.querySelector(".content-panel").scrollIntoView({ behavior: "smooth", block: "start" });
    });

    categoryGrid.appendChild(button);
  });
}

function getCategoryById(id) {
  return PORTAL_DATA.categories.find((category) => category.id === id);
}

function itemMatchesSearch(item) {
  const text = `${item.name} ${item.description} ${item.address || ""}`.toLowerCase();
  return text.includes(searchTerm.toLowerCase());
}

function getFilteredItems() {
  return PORTAL_DATA.items.filter((item) => {
    const categoryMatch = activeCategory === "all" || item.category === activeCategory;
    const searchMatch = !searchTerm || itemMatchesSearch(item);
    return categoryMatch && searchMatch;
  });
}

function buildActions(item) {
  const actions = [];

  if (item.mapsUrl) {
    actions.push(`<a class="action-link" href="${item.mapsUrl}" target="_blank" rel="noopener">Buka Maps</a>`);
  }

  if (item.whatsapp) {
    actions.push(`<a class="action-link secondary" href="https://wa.me/${item.whatsapp}" target="_blank" rel="noopener">WhatsApp</a>`);
  }

  if (item.phone) {
    actions.push(`<a class="action-link light" href="tel:${item.phone}">Telepon</a>`);
  }

  return actions.join("");
}

function renderItems() {
  const filteredItems = getFilteredItems();
  itemsList.innerHTML = "";

  const category = getCategoryById(activeCategory);
  activeCategoryTitle.textContent = activeCategory === "all" ? "Semua Informasi" : category?.title || "Informasi";

  filteredItems.forEach((item) => {
    const card = document.createElement("article");
    card.className = "info-card";
    card.innerHTML = `
      <div class="info-card-header">
        <span class="info-icon">${item.icon || "📌"}</span>
        <div>
          <h3>${item.name}</h3>
          <p class="info-meta">${item.description}<br>${item.address ? `Lokasi: ${item.address}` : ""}</p>
          <div class="info-actions">${buildActions(item)}</div>
        </div>
      </div>
    `;
    itemsList.appendChild(card);
  });

  emptyState.hidden = filteredItems.length > 0;
}

function updateUrlCategory(categoryId) {
  const url = new URL(window.location.href);
  if (categoryId === "all") {
    url.searchParams.delete("kategori");
  } else {
    url.searchParams.set("kategori", categoryId);
  }
  window.history.replaceState({}, "", url);
}

function renderAll() {
  renderCategories();
  renderItems();
}

searchInput.addEventListener("input", (event) => {
  searchTerm = event.target.value.trim();
  renderItems();
});

showAllButton.addEventListener("click", () => {
  activeCategory = "all";
  searchTerm = "";
  searchInput.value = "";
  updateUrlCategory("all");
  renderAll();
});

setupSite();
renderAll();
