import { chromium } from "@playwright/test";
import { createHash } from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const here = path.dirname(fileURLToPath(import.meta.url));
const repo = path.resolve(here, "..");
const args = process.argv.slice(2);
const baseIdx = args.indexOf("--base");
const BASE = baseIdx >= 0 ? args.splice(baseIdx, 2)[1] : "http://localhost:3001";
const keys = args;
if (!keys.length) {
  console.error("usage: export-variant-html.mjs <variant-key>... [--base url]");
  process.exit(1);
}

const runtime = fs.readFileSync(path.join(here, "export-runtime.js"), "utf8");
const protoDir = path.join(repo, "apps/web/src/components/prototype");

function readShaders(key) {
  const webgl = fs.readFileSync(path.join(protoDir, `variant-${key}/webgl.ts`), "utf8");
  const liquid = fs.readFileSync(path.join(protoDir, `variant-${key}/liquid-hero.tsx`), "utf8");
  const tpl = (src, name) =>
    src.match(new RegExp(`(?:const|export const) ${name} = \`([\\s\\S]*?)\`;`))[1];
  const cover = tpl(webgl, "COVER_UV");
  return {
    vertex: tpl(webgl, "FULLSCREEN_VERTEX"),
    fragment: tpl(liquid, "FRAGMENT").replace("${COVER_UV}", cover),
  };
}

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function load(browser, url) {
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto(url, { waitUntil: "networkidle" });
  await sleep(4000);
  return page;
}

async function probe(browser, key) {
  const page = await load(browser, `${BASE}/?variant=${key}`);
  await page.evaluate(() => (document.documentElement.style.scrollBehavior = "auto"));
  const before = await page.evaluate(() => {
    const root = document.body.firstElementChild;
    return [...root.querySelectorAll("*")].map((e) => [
      e.getAttribute("style"),
      e.getAttribute("class"),
    ]);
  });

  const height = await page.evaluate(() => document.documentElement.scrollHeight);
  for (let y = 0; y < height; y += 250) {
    await page.evaluate((v) => scrollTo(0, v), y);
    await sleep(140);
  }
  await page.evaluate(() => scrollTo(0, document.documentElement.scrollHeight));
  await sleep(1800);

  const changes = await page.evaluate(
    ({ before }) => {
      const isStateful = (el) =>
        !!el.closest("header, #news button, #news li > div > div") ||
        el.parentElement?.id === "top" ||
        !!el.closest("#top > div:nth-child(2), #top > div:nth-child(3)") ||
        (el.closest("#about p") && el.parentElement?.tagName === "P") ||
        !!el.closest("#campus > div:first-child > div:first-child") ||
        !!el.closest("#strengths article") ||
        el.matches("#strengths article, #strengths article ~ div");
      const root = document.body.firstElementChild;
      const all = [...root.querySelectorAll("*")];
      if (all.length !== before.length)
        throw new Error(`DOM size changed ${before.length} -> ${all.length}`);
      const out = [];
      all.forEach((e, i) => {
        if (e instanceof SVGElement && e.tagName !== "svg") return;
        if (isStateful(e)) return;
        const style = e.getAttribute("style");
        const cls = e.getAttribute("class");
        const item = { i };
        if (style !== before[i][0] && style) item.style = style;
        if (cls !== before[i][1] && cls) item.cls = cls;
        if (item.style || item.cls) out.push(item);
      });
      return out;
    },
    { before },
  );

  const header = {};
  await page.evaluate(() => scrollTo(0, 0));
  await sleep(600);
  header.top = await page.evaluate(() => document.querySelector("header").className);
  await page.evaluate(() => scrollTo(0, 600));
  await sleep(600);
  header.solid = await page.evaluate(() => document.querySelector("header").className);

  const navInfo = await page.evaluate(() =>
    [...document.querySelectorAll("header nav a")].map((a) => a.getAttribute("href")),
  );
  const navCls = navInfo.map(() => ({ on: "", off: "" }));
  for (let t = 0; t < navInfo.length; t++) {
    await page.evaluate(
      (id) =>
        document
          .getElementById(id.slice(1))
          ?.scrollIntoView({ behavior: "instant", block: "start" }),
      navInfo[t],
    );
    await sleep(700);
    const classes = await page.evaluate(() =>
      [...document.querySelectorAll("header nav a")].map((a) => a.className),
    );
    classes.forEach((c, i) => {
      if (i === t) navCls[i].on = c;
      else if (!navCls[i].off) navCls[i].off = c;
    });
  }

  await page.evaluate(() =>
    document.getElementById("about")?.scrollIntoView({ behavior: "instant", block: "start" }),
  );
  await sleep(600);
  const openIcon = await page.evaluate(
    () => document.querySelector("header button[aria-controls]").innerHTML,
  );
  await page.evaluate(() => document.querySelector("header button[aria-controls]").click());
  await sleep(700);
  const menu = await page.evaluate(() => {
    const btn = document.querySelector("header button[aria-controls]");
    const m = document.getElementById(btn.getAttribute("aria-controls"));
    if (!m) return null;
    return {
      html: m.outerHTML,
      closeIcon: btn.innerHTML,
      links: [...m.querySelectorAll("a")].map((a) => [a.getAttribute("href"), a.className]),
    };
  });
  let menuLinks = [];
  if (menu) {
    const activeHref = "#about";
    const offClass = menu.links.find(([h]) => h !== activeHref)[1];
    menuLinks = menu.links.map(([h, c]) => ({
      on: menu.links.find(([hh]) => hh === activeHref)[1],
      off: h === activeHref ? offClass : c,
    }));
    menu.openIcon = openIcon;
    menu.html = menu.html.replace(/ id="[^"]*"/, "");
    delete menu.links;
    await page.evaluate(() => document.querySelector("header button[aria-controls]").click());
    await sleep(500);
  }

  const news = [];
  const count = await page.evaluate(() => document.querySelectorAll("#news ul > li").length);
  await page.evaluate(() =>
    document.getElementById("news").scrollIntoView({ behavior: "instant", block: "start" }),
  );
  await sleep(600);
  for (let i = 0; i < count; i++) {
    const html = await page.evaluate(async (idx) => {
      const li = document.querySelectorAll("#news ul > li")[idx];
      const btn = li.querySelector("button");
      if (btn.getAttribute("aria-expanded") !== "true") btn.click();
      await new Promise((r) => setTimeout(r, 700));
      const panel = document.getElementById(btn.getAttribute("aria-controls"));
      return panel ? panel.outerHTML.replace(/ id="[^"]*"/, "") : "";
    }, i);
    news.push(html);
  }

  const title = await page.title();
  await page.close();
  return { changes, header, nav: navCls, menu, menuLinks, news, title };
}

async function snapshot(browser, key, info) {
  const page = await load(browser, `${BASE}/?variant=${key}`);
  const result = await page.evaluate(
    ({ changes }) => {
      const root = document.body.firstElementChild;
      const all = [...root.querySelectorAll("*")];
      for (const c of changes) {
        const el = all[c.i];
        if (c.style) el.setAttribute("data-ex-final-style", c.style);
        if (c.cls) el.setAttribute("data-ex-final-class", c.cls);
      }
      const ink = root.querySelector("#about span[style*='opacity']");
      if (ink) ink.parentElement.setAttribute("data-ex", "ink");
      const clone = root.cloneNode(true);
      clone.querySelectorAll("script").forEach((s) => s.remove());
      const sheets = [...document.styleSheets]
        .filter((s) => !(s.href || "").includes("fonts.googleapis"))
        .map((s) => ({
          base: s.href || document.baseURI,
          css: [...s.cssRules].map((r) => r.cssText).join("\n"),
        }));
      const links = [...document.querySelectorAll("link[rel=stylesheet]")]
        .map((l) => l.href)
        .filter((h) => h.includes("fonts.googleapis"));
      const desc = document.querySelector("meta[name=description]")?.content ?? "";
      return {
        html: clone.outerHTML,
        sheets,
        links,
        desc,
        lang: document.documentElement.lang,
        htmlClass: document.documentElement.className,
        bodyClass: document.body.className,
      };
    },
    { changes: info.changes },
  );
  await page.close();
  return result;
}

async function main() {
  const browser = await chromium.launch({ channel: "chrome" });
  const request = (await browser.newContext()).request;

  for (const key of keys) {
    console.log(`\n== ${key}`);
    const info = await probe(browser, key);
    const snap = await snapshot(browser, key, info);
    console.log(`reveal/state changes: ${info.changes.length}, news panels: ${info.news.length}`);

    const outDir = path.join(repo, `apps/web/public/${key}-html`);
    const assetsDir = path.join(outDir, "assets");
    fs.rmSync(outDir, { recursive: true, force: true });
    fs.mkdirSync(assetsDir, { recursive: true });

    const saved = new Map();
    const fetchAsset = async (absUrl) => {
      if (saved.has(absUrl)) return saved.get(absUrl);
      const res = await request.get(absUrl);
      if (!res.ok()) {
        console.warn("  asset failed", res.status(), absUrl);
        saved.set(absUrl, null);
        return null;
      }
      const u = new URL(absUrl);
      let name = path.basename(u.pathname) || "asset";
      let target = path.join(assetsDir, name);
      if (fs.existsSync(target) && !saved.has("__" + target)) {
        name = createHash("md5").update(absUrl).digest("hex").slice(0, 8) + "-" + name;
        target = path.join(assetsDir, name);
      }
      fs.writeFileSync(target, await res.body());
      saved.set("__" + target, true);
      saved.set(absUrl, `assets/${name}`);
      return `assets/${name}`;
    };

    let css = "";
    for (const sheet of snap.sheets) {
      let text = sheet.css;
      const urls = [...text.matchAll(/url\(\s*(["']?)([^"')]+)\1\s*\)/g)];
      for (const m of urls) {
        const raw = m[2];
        if (raw.startsWith("data:") || raw.startsWith("#")) continue;
        const abs = new URL(raw, sheet.base).toString();
        if (/fonts\.(googleapis|gstatic)\.com/.test(abs)) continue;
        const local = await fetchAsset(abs);
        if (local) text = text.split(m[0]).join(`url("${local}")`);
      }
      css += text + "\n";
    }
    const imports = [...css.matchAll(/@import\s+url\([^)]*\)[^;]*;/g)].map((m) => m[0]);
    for (const i of imports) css = css.replace(i, "");
    css = imports.join("\n") + "\n" + css;

    let body = snap.html;
    const srcs = new Set(
      [
        ...body.matchAll(
          /\b(?:src|href)="(\/[^"#]+\.(?:webp|png|jpe?g|svg|gif|avif|mp4|woff2?))"/g,
        ),
      ].map((m) => m[1]),
    );
    for (const s of srcs) {
      const local = await fetchAsset(new URL(s, BASE).toString());
      if (local) body = body.split(`"${s}"`).join(`"${local}"`);
    }
    const preloadHero = body.match(/src="(assets\/hero-background\.[a-z]+)"/)?.[1];

    const exportData = {
      header: info.header,
      nav: info.nav,
      menu: info.menu,
      menuLinks: info.menuLinks,
      news: info.news,
      shaders: readShaders(key),
    };
    const json = JSON.stringify(exportData).replace(/</g, "\\u003c");

    const html = `<!doctype html>
<html lang="${snap.lang || "zh-CN"}" class="${snap.htmlClass}">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${info.title.replace(/</g, "&lt;")}</title>
    <meta name="description" content="${snap.desc.replace(/"/g, "&quot;")}" />
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
${snap.links.map((h) => `    <link rel="stylesheet" href="${h}" />`).join("\n")}
${preloadHero ? `    <link rel="preload" as="image" href="${preloadHero}" />` : ""}
    <link rel="stylesheet" href="styles.css" />
  </head>
  <body class="${snap.bodyClass}">
${body}
    <script>window.__EXPORT__ = ${json};</script>
    <script>
${runtime}
    </script>
  </body>
</html>
`;
    fs.writeFileSync(path.join(outDir, "index.html"), html);
    fs.writeFileSync(path.join(outDir, "styles.css"), css);
    console.log(
      `  wrote ${path.relative(repo, outDir)}/index.html (${(html.length / 1024).toFixed(0)} KB), styles.css (${(css.length / 1024).toFixed(0)} KB), ${fs.readdirSync(assetsDir).length} assets`,
    );
  }
  await browser.close();
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
