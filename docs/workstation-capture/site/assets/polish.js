// FENCHEM Workstation Landing Page — Polish Scripts
document.addEventListener("DOMContentLoaded", () => {
  // 1. Sticky Nav on Scroll
  const header = document.querySelector("header");
  if (header) {
    header.classList.add("polish-nav");
    const checkScroll = () => {
      if (window.scrollY > 40) {
        header.classList.add("scrolled");
      } else {
        header.classList.remove("scrolled");
      }
    };
    window.addEventListener("scroll", checkScroll, { passive: true });
    checkScroll();
  }

  // 2. Accordion Interactive Toggle
  const accordionItems = document.querySelectorAll(".accordion-item");
  accordionItems.forEach((item) => {
    const btn = item.querySelector(".accordion-btn");
    if (!btn) return;
    btn.addEventListener("click", () => {
      const isOpen = item.classList.contains("open");
      // Close all others
      accordionItems.forEach((i) => i.classList.remove("open"));
      if (!isOpen) {
        item.classList.add("open");
      }
    });
  });

  // 3. Continent Tabs in Global Presence
  const tabs = document.querySelectorAll(".continent-tab");
  const regionPanels = document.querySelectorAll(".region-panel");
  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      const targetRegion = tab.getAttribute("data-region");
      tabs.forEach((t) => t.classList.remove("active"));
      tab.classList.add("active");

      regionPanels.forEach((panel) => {
        if (targetRegion === "all" || panel.getAttribute("data-region") === targetRegion) {
          panel.style.display = "block";
        } else {
          panel.style.display = "none";
        }
      });
    });
  });

  // 4. Floating Version Switcher
  const switcher = document.createElement("div");
  switcher.className = "version-toggle-floating";
  const urlParams = new URLSearchParams(window.location.search);
  const isOriginal = urlParams.get("version") === "original";

  switcher.innerHTML = `
    <button class="version-toggle-btn ${!isOriginal ? "active" : "inactive"}" id="btn-show-polished">
      ✨ 优化重构版 (Polished)
    </button>
    <button class="version-toggle-btn ${isOriginal ? "active" : "inactive"}" id="btn-show-original">
      ⏱️ 原始快照 (Original)
    </button>
  `;
  document.body.appendChild(switcher);

  document.getElementById("btn-show-polished")?.addEventListener("click", () => {
    window.location.href = "/";
  });
  document.getElementById("btn-show-original")?.addEventListener("click", () => {
    window.location.href = "/?version=original";
  });

  // 5. ⌘Q Search Shortcut
  document.addEventListener("keydown", (e) => {
    if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "q") {
      e.preventDefault();
      alert("AI 搜索功能已唤起：输入您要检索的原料、品类（例如：透明质酸、姜黄素、益生菌）");
    }
  });

  const searchTriggers = document.querySelectorAll(".search-trigger, .search-pill");
  searchTriggers.forEach((el) => {
    el.style.cursor = "pointer";
    el.addEventListener("click", () => {
      alert("AI 搜索功能已唤起：输入您要检索的原料、品类（例如：透明质酸、姜黄素、益生菌）");
    });
  });
});
