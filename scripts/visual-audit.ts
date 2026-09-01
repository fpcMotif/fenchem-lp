/// <reference lib="dom" />
import { chromium } from "@playwright/test";

async function audit() {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

  const variants = ["v", "h", "d", "a", "j", "k"];
  for (const v of variants) {
    await page.goto(`http://127.0.0.1:3001/?variant=${v}`, { waitUntil: "networkidle" });
    const info = await page.evaluate(() => {
      const h1 = document.querySelector("h1");
      const sH1 = h1 ? window.getComputedStyle(h1) : null;
      const header = document.querySelector("header");
      const sHeader = header ? window.getComputedStyle(header) : null;
      return {
        h1: h1?.textContent?.trim().slice(0, 40),
        h1Font: sH1?.fontFamily,
        h1Size: sH1?.fontSize,
        h1Color: sH1?.color,
        headerBg: sHeader?.backgroundColor,
      };
    });
    console.log(`Variant ${v.toUpperCase()}:`, JSON.stringify(info));
  }

  await page.goto("http://127.0.0.1:3001/style-audit", { waitUntil: "networkidle" });
  const auditInfo = await page.evaluate(() => {
    const btn = document.querySelector("#audit-light #btn-variant-default");
    const sBtn = btn ? window.getComputedStyle(btn) : null;
    const card = document.querySelector("#audit-light #card-default");
    const sCard = card ? window.getComputedStyle(card) : null;
    return {
      btnBg: sBtn?.backgroundColor,
      btnColor: sBtn?.color,
      btnBorderRadius: sBtn?.borderRadius,
      btnHeight: sBtn?.height,
      cardBg: sCard?.backgroundColor,
      cardBorderRadius: sCard?.borderRadius,
    };
  });
  console.log("Style Audit:", JSON.stringify(auditInfo));

  await browser.close();
}

audit().catch(console.error);
