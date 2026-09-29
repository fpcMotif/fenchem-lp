import { chromium } from "@playwright/test";
import * as fs from "node:fs";
import * as path from "node:path";

const TARGET_BASE_URL = "https://a42c302a6-f65f9ca15e26.3fd49b.workstation.wanwang.xin";
const OUTPUT_DIR = path.resolve("docs/workstation-capture");
const SITE_DIR = path.join(OUTPUT_DIR, "site");
const SLICES_DIR = path.join(OUTPUT_DIR, "slices");

fs.mkdirSync(SITE_DIR, { recursive: true });
fs.mkdirSync(SLICES_DIR, { recursive: true });
fs.mkdirSync(path.join(SITE_DIR, "assets"), { recursive: true });
fs.mkdirSync(path.join(SITE_DIR, "AppUpload/Image"), { recursive: true });

async function downloadAsset(urlPath: string, destPath: string) {
  const fullUrl = urlPath.startsWith("http")
    ? urlPath
    : `${TARGET_BASE_URL}${urlPath.startsWith("/") ? "" : "/"}${urlPath}`;
  try {
    const res = await fetch(fullUrl);
    if (!res.ok) {
      console.warn(`[WARN] Failed to fetch ${fullUrl} (${res.status})`);
      return false;
    }
    const arrayBuffer = await res.arrayBuffer();
    fs.mkdirSync(path.dirname(destPath), { recursive: true });
    fs.writeFileSync(destPath, Buffer.from(arrayBuffer));
    console.log(`[OK] Saved ${urlPath} -> ${destPath} (${arrayBuffer.byteLength} bytes)`);
    return true;
  } catch (err) {
    console.error(`[ERROR] Fetching ${fullUrl}:`, err);
    return false;
  }
}

async function main() {
  console.log("=== Launching Chrome via CDP or Playwright ===");
  // Connect to existing browser or launch fresh
  let browser;
  try {
    browser = await chromium.connectOverCDP("http://127.0.0.1:53121");
    console.log("Connected to agent-browser CDP session!");
  } catch {
    console.log("CDP connection failed, launching fresh chromium instance...");
    browser = await chromium.launch({ headless: true });
  }

  const context =
    browser.contexts()[0] ||
    (await browser.newContext({
      viewport: { width: 1440, height: 900 },
      deviceScaleFactor: 2,
    }));

  const page =
    context.pages().find((p) => p.url().includes("wanwang.xin")) || (await context.newPage());

  await page.setViewportSize({ width: 1440, height: 900 });
  if (!page.url().includes("wanwang.xin")) {
    console.log("Navigating to target page...");
    await page.goto(TARGET_BASE_URL, { waitUntil: "networkidle" });
  }

  // Dismiss any snapshot modal if still present
  await page.evaluate(() => {
    const btns = Array.from(document.querySelectorAll("button"));
    const dismissBtn = btns.find((b) => b.textContent?.includes("我已知晓"));
    if (dismissBtn) dismissBtn.click();

    // Also remove any banner script elements or ultron host overlay that might interfere
    const host = document.getElementById("ultron-shadow-host");
    if (host) host.remove();
  });

  await page.waitForTimeout(500);

  // Trigger lazy loading by smooth scroll
  console.log("Scrolling page to trigger lazy loads and animations...");
  await page.evaluate(async () => {
    await new Promise<void>((resolve) => {
      let total = 0;
      const step = 600;
      const timer = setInterval(() => {
        window.scrollBy(0, step);
        total += step;
        if (total >= document.documentElement.scrollHeight) {
          clearInterval(timer);
          window.scrollTo(0, 0);
          setTimeout(resolve, 400);
        }
      }, 80);
    });
  });

  await page.waitForTimeout(1000);

  // Measure page dimensions
  const dimensions = await page.evaluate(() => {
    return {
      scrollHeight: document.documentElement.scrollHeight,
      scrollWidth: document.documentElement.scrollWidth,
      viewportWidth: window.innerWidth,
      viewportHeight: window.innerHeight,
    };
  });
  console.log("Page dimensions:", dimensions);

  // Capture Desktop Viewport & Fullpage screenshots
  console.log("Capturing desktop screenshots...");
  await page.screenshot({
    path: path.join(OUTPUT_DIR, "desktop-viewport-1440x900.png"),
    fullPage: false,
  });
  await page.screenshot({
    path: path.join(OUTPUT_DIR, "desktop-fullpage-1440.png"),
    fullPage: true,
  });

  // Capture consecutive 1800px slices conforming to design-critic-loop
  console.log("Capturing 1800px vertical slices...");
  const sliceHeight = 1800;
  const totalHeight = dimensions.scrollHeight;
  const numSlices = Math.ceil(totalHeight / sliceHeight);

  for (let i = 0; i < numSlices; i++) {
    const y = i * sliceHeight;
    const currentSliceH = Math.min(sliceHeight, totalHeight - y);
    await page.setViewportSize({ width: 1440, height: currentSliceH });
    await page.evaluate((top) => window.scrollTo(0, top), y);
    await page.waitForTimeout(300);
    await page.screenshot({
      path: path.join(SLICES_DIR, `slice-${String(i + 1).padStart(2, "0")}.png`),
    });
    console.log(`Saved slice ${i + 1}/${numSlices} (y: ${y} to ${y + currentSliceH})`);
  }
  // Restore standard viewport
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.evaluate(() => window.scrollTo(0, 0));

  // Extract all assets (scripts, styles, images, backgrounds)
  console.log("Extracting assets from DOM...");
  const assetUrls: string[] = await page.evaluate(() => {
    const urls = new Set<string>();

    // Links & scripts
    document.querySelectorAll("script[src]").forEach((el) => {
      const src = el.getAttribute("src");
      if (src) urls.add(src);
    });
    document.querySelectorAll("link[href]").forEach((el) => {
      const href = el.getAttribute("href");
      if (href) urls.add(href);
    });

    // Images
    document.querySelectorAll("img[src]").forEach((el) => {
      const src = el.getAttribute("src");
      if (src) urls.add(src);
    });

    // Background images in computed styles
    document.querySelectorAll("*").forEach((el) => {
      const style = window.getComputedStyle(el);
      const bg = style.backgroundImage;
      if (bg && bg !== "none") {
        const matches = bg.matchAll(/url\((['"]?)(.*?)\1\)/g);
        for (const m of matches) {
          if (m[2] && !m[2].startsWith("data:")) urls.add(m[2]);
        }
      }
    });

    return Array.from(urls);
  });

  console.log(`Found ${assetUrls.length} assets referenced in DOM.`);

  // Explicit known chunks from Vite build
  const knownAssets = [
    "/favicon.png",
    "/favicon-dark.png",
    "/assets/index-25pPz5MR.js",
    "/assets/index-2Fe_LgyB.css",
    "/assets/public-layout-DOtA4w_f.js",
    "/assets/dropdown-menu-D88pNK4a.js",
    "/assets/index-C6C9Fd6I.js",
    "/assets/index-1rwslFp9.js",
    "/assets/check-BnVm3EGq.js",
    "/assets/search-Dr5WIagZ.js",
    "/assets/member-auth-store-BvsgpZBh.js",
    "/assets/member-api-B494A4Zv.js",
    "/assets/home-page-sr417Htn.js",
    "/assets/home-page-CZ462Oxv.css",
    "/AppUpload/Image/ca8375bebf1a4d6ab634a64e6dcdd68e.png",
    "/AppUpload/Image/5d73428d722e4a00927fc9f28a9dd4bc.png",
    "/AppUpload/Image/d8b476aaddeb4d93af3d3bb9d5de32f6.png",
    "/AppUpload/Image/3ef0ce2695d843ff9476399c75207f4b.png",
    "/AppUpload/Image/14c79e1e972644a2964af724eb9249ee.png",
    "/AppUpload/Image/614078814e8f4ac5a502f02664dd2f03.png",
    "/AppUpload/Image/d23d17a965454ad9acfcba73cb9b6089.png",
  ];

  const allAssetsToDownload = Array.from(new Set([...assetUrls, ...knownAssets])).filter(
    (url) =>
      !url.startsWith("data:") &&
      !url.startsWith("#") &&
      !url.includes("ultron-loader") &&
      !url.includes("banner.js"),
  );

  for (const assetUrl of allAssetsToDownload) {
    let cleanPath = assetUrl;
    if (cleanPath.startsWith(TARGET_BASE_URL)) {
      cleanPath = cleanPath.slice(TARGET_BASE_URL.length);
    }
    if (cleanPath.startsWith("/")) cleanPath = cleanPath.slice(1);

    const dest = path.join(SITE_DIR, cleanPath);
    await downloadAsset(assetUrl, dest);
  }

  // Parse CSS files to find any extra font/image assets
  const cssFiles = fs.readdirSync(path.join(SITE_DIR, "assets")).filter((f) => f.endsWith(".css"));
  for (const cssFile of cssFiles) {
    const cssContent = fs.readFileSync(path.join(SITE_DIR, "assets", cssFile), "utf-8");
    const matches = cssContent.matchAll(/url\((['"]?)(.*?)\1\)/g);
    for (const match of matches) {
      const subUrl = match[2];
      if (subUrl && !subUrl.startsWith("data:") && !subUrl.startsWith("http")) {
        // relative to /assets/ or root
        const normalized = subUrl.startsWith("/") ? subUrl.slice(1) : path.join("assets", subUrl);
        const dest = path.join(SITE_DIR, normalized);
        await downloadAsset(subUrl, dest);
      }
    }
  }

  // Extract fully rendered HTML
  console.log("Extracting hydrated HTML...");
  const renderedHTML = await page.evaluate(() => {
    return document.documentElement.outerHTML;
  });
  fs.writeFileSync(path.join(OUTPUT_DIR, "rendered.html"), renderedHTML, "utf-8");

  // Create an offline-friendly HTML version in SITE_DIR
  let offlineHTML = renderedHTML
    .replaceAll(`"${TARGET_BASE_URL}/`, `"./`)
    .replaceAll(`'/assets/`, `'./assets/`)
    .replaceAll(`"/assets/`, `"./assets/`)
    .replaceAll(`"/AppUpload/`, `"./AppUpload/`)
    .replaceAll(`href="favicon.png"`, `href="./favicon.png"`)
    .replaceAll(`href="favicon-dark.png"`, `href="./favicon-dark.png"`);

  // Remove the banner script and ultron script from offline page
  offlineHTML = offlineHTML.replace(/<script[^>]*banner\.js[^>]*><\/script>/g, "");
  offlineHTML = offlineHTML.replace(/<script[^>]*ultron-loader[^>]*><\/script>/g, "");

  fs.writeFileSync(path.join(SITE_DIR, "index.html"), offlineHTML, "utf-8");
  console.log("Saved standalone offline index.html to site/index.html");

  // Extract Structure, Typography, Color Palette, and Copy
  console.log("Extracting Design tokens and section copy...");
  const pageAudit = await page.evaluate(() => {
    const sections = Array.from(document.querySelectorAll("section, main, header, footer")).map(
      (el, i) => {
        const rect = el.getBoundingClientRect();
        const headings = Array.from(el.querySelectorAll("h1, h2, h3, h4")).map((h) => ({
          tag: h.tagName,
          text: h.textContent?.trim(),
        }));
        const textSample = el.textContent?.trim().replace(/\s+/g, " ").slice(0, 200);
        return {
          index: i,
          tag: el.tagName,
          id: el.id,
          className: el.className,
          rect: { y: Math.round(rect.y + window.scrollY), height: Math.round(rect.height) },
          headings,
          sample: textSample,
        };
      },
    );

    const colors = new Set<string>();
    const fonts = new Set<string>();

    document.querySelectorAll("*").forEach((el) => {
      const s = window.getComputedStyle(el);
      if (s.color) colors.add(s.color);
      if (s.backgroundColor && s.backgroundColor !== "rgba(0, 0, 0, 0)")
        colors.add(s.backgroundColor);
      if (s.fontFamily) fonts.add(s.fontFamily);
    });

    return {
      title: document.title,
      sections,
      colors: Array.from(colors).slice(0, 30),
      fonts: Array.from(fonts),
    };
  });

  fs.writeFileSync(
    path.join(OUTPUT_DIR, "design-audit.json"),
    JSON.stringify(pageAudit, null, 2),
    "utf-8",
  );

  // Mobile screenshot
  console.log("Capturing Mobile screenshots (390x844 iPhone 14)...");
  await page.setViewportSize({ width: 390, height: 844 });
  await page.waitForTimeout(500);
  await page.screenshot({
    path: path.join(OUTPUT_DIR, "mobile-viewport-390x844.png"),
    fullPage: false,
  });
  await page.screenshot({
    path: path.join(OUTPUT_DIR, "mobile-fullpage-390.png"),
    fullPage: true,
  });

  // Restore desktop viewport
  await page.setViewportSize({ width: 1440, height: 900 });

  console.log("=== Capture Complete! ===");
}

main().catch((err) => {
  console.error("Fatal error:", err);
  process.exit(1);
});
