import { setTimeout as sleep } from "node:timers/promises";

import { chromium, type Browser, type Page, type Request } from "@playwright/test";
import pixelmatch from "pixelmatch";
import { PNG } from "pngjs";

import type { Capture } from "./command";

export const NOISE_THRESHOLD = 0.01;
const DEV_OVERLAY_CSS = "[data-mesurer-root]{display:none!important}";
const PAGES_AT_ONCE = 4;
const STILL_ATTEMPTS = 6;
export const PAGE_EPOCH = Date.UTC(2026, 0, 15, 9);
export const ADVANCE_MS = 2_000;
const ADVANCE_STEP_MS = 100;
const QUIET_MS = 300;
const QUIET_LIMIT_MS = 10_000;
const SCROLL_PAUSE_MS = 150;

export type Viewport = { width: number; height: number };

export type Health = { status: number; overflowX: number; overflowing: string[]; errors: string[] };

export type Render = Health & { png: Buffer; still: boolean };

export type Shot = { full: boolean; selector?: string; path?: string };

export type Tab = {
  page: Page;
  health: () => Promise<Health>;
  advance: () => Promise<void>;
  scrollThrough: () => Promise<void>;
  screenshot: (shot: Shot) => Promise<Buffer>;
};

function ignoreResizesOnceCapturing() {
  let capturing = false;
  Object.defineProperty(window, "__uiStartCapturing", { value: () => (capturing = true) });
  const stopWhileCapturing = (event: Event) => {
    if (capturing) event.stopImmediatePropagation();
  };
  const NativeResizeObserver = window.ResizeObserver;
  window.ResizeObserver = class extends NativeResizeObserver {
    constructor(callback: ResizeObserverCallback) {
      super((entries, observer) => {
        if (!capturing) callback(entries, observer);
      });
    }
  };
  window.addEventListener("resize", stopWhileCapturing, true);
  window.visualViewport?.addEventListener("resize", stopWhileCapturing, true);
  const matchMedia = window.matchMedia.bind(window);
  window.matchMedia = (query) => {
    const list = matchMedia(query);
    list.addEventListener("change", stopWhileCapturing, true);
    return list;
  };
}

function limiter(size: number) {
  let active = 0;
  const waiting: (() => void)[] = [];
  return async <T>(task: () => Promise<T>) => {
    if (active < size) active++;
    else await new Promise<void>((resolve) => waiting.push(resolve));
    try {
      return await task();
    } finally {
      const next = waiting.shift();
      if (next) next();
      else active--;
    }
  };
}

const slot = limiter(PAGES_AT_ONCE);

export async function withBrowser<T>(run: (browser: Browser) => Promise<T>) {
  const browser = await chromium.launch({
    channel: "chrome",
    headless: true,
    args: ["--disable-gpu"],
  });
  try {
    return await run(browser);
  } finally {
    await browser.close();
  }
}

export function withPage<T>(
  browser: Browser,
  url: string,
  viewport: Viewport,
  css: string,
  use: (tab: Tab) => Promise<T>,
) {
  return slot(async () => {
    const context = await browser.newContext({
      viewport,
      deviceScaleFactor: 1,
      ignoreHTTPSErrors: true,
      reducedMotion: "reduce",
    });
    try {
      const page = await context.newPage();
      await page.addInitScript(ignoreResizesOnceCapturing);
      await page.clock.install({ time: PAGE_EPOCH - 60_000 });
      await page.clock.pauseAt(PAGE_EPOCH);
      const errors: string[] = [];
      page.on("pageerror", (error) => errors.push(error.message));
      page.on("console", (message) => {
        if (message.type() === "error" && !message.location().url.endsWith("/favicon.ico"))
          errors.push(message.text());
      });
      const loading = new Set<Request>();
      let lastActivity = Date.now();
      page.on("request", (request) => {
        loading.add(request);
        lastActivity = Date.now();
      });
      const loaded = (request: Request) => {
        loading.delete(request);
        lastActivity = Date.now();
      };
      page.on("requestfinished", loaded);
      page.on("requestfailed", loaded);

      const settle = async () => {
        const deadline = Date.now() + QUIET_LIMIT_MS;
        while (Date.now() < deadline && (loading.size > 0 || Date.now() - lastActivity < QUIET_MS))
          await sleep(50);
        await page.evaluate(async () => {
          await document.fonts.ready;
          await Promise.all(
            [...document.images]
              .filter((image) => image.complete)
              .map((image) => image.decode().catch(() => undefined)),
          );
        });
      };
      const advance = async () => {
        for (let ran = 0; ran < ADVANCE_MS; ran += ADVANCE_STEP_MS)
          await page.clock.runFor(ADVANCE_STEP_MS);
        await settle();
      };
      const scrollThrough = async () => {
        for (let y = 0; ; y += viewport.height * 0.8) {
          const height = await page.evaluate((top) => {
            window.scrollTo({ top, behavior: "instant" });
            return document.documentElement.scrollHeight;
          }, y);
          if (y >= height) break;
          await sleep(SCROLL_PAUSE_MS);
        }
        await page.evaluate(() => window.scrollTo({ top: 0, behavior: "instant" }));
        await advance();
      };
      const screenshot = async ({ full, selector, path }: Shot) => {
        await page.evaluate(() =>
          (window as unknown as { __uiStartCapturing: () => void }).__uiStartCapturing(),
        );
        const settings = { animations: "disabled", caret: "hide", path } as const;
        return selector
          ? page.locator(selector).first().screenshot(settings)
          : page.screenshot({ ...settings, fullPage: full });
      };

      const response = await page.goto(url, { waitUntil: "networkidle" });
      const status = response?.status() ?? 0;
      if (status === 404) throw new Error(`${url} answered 404; check the target`);
      await page.addStyleTag({ content: DEV_OVERLAY_CSS + css });
      await advance();
      const health = async () => ({
        status,
        ...(await page.evaluate(measureOverflow)),
        errors: [...errors],
      });
      return await use({ page, health, advance, scrollThrough, screenshot });
    } finally {
      await context.close();
    }
  });
}

function measureOverflow() {
  const viewport = document.documentElement.clientWidth;
  const overflowX = document.documentElement.scrollWidth - viewport;
  const overflowing: string[] = [];
  if (overflowX <= 0) return { overflowX, overflowing };
  const clipped = (element: Element) => {
    for (let parent = element.parentElement; parent; parent = parent.parentElement)
      if (getComputedStyle(parent).overflowX !== "visible") return true;
    return false;
  };
  const sticksOut = (element: Element) => {
    const rect = element.getBoundingClientRect();
    return rect.width > 0 && rect.right > viewport + 0.5;
  };
  for (const element of document.body.querySelectorAll("*")) {
    if (!sticksOut(element) || clipped(element) || [...element.children].some(sticksOut)) continue;
    const name = element.id
      ? `#${element.id}`
      : [...element.classList]
          .filter((value) => !/^x[a-z0-9]{5,9}$/.test(value))
          .slice(0, 1)
          .map((value) => `.${value}`)
          .join("");
    const text = (element.textContent ?? "").trim().slice(0, 24);
    overflowing.push(
      `<${element.tagName.toLowerCase()}${name}>${text ? ` "${text}"` : ""} right ${Math.round(element.getBoundingClientRect().right)}px`,
    );
    if (overflowing.length === 3) break;
  }
  return { overflowX, overflowing };
}

function samePixels(a: Buffer, b: Buffer) {
  const [x, y] = [PNG.sync.read(a), PNG.sync.read(b)];
  if (x.width !== y.width || x.height !== y.height) return false;
  return pixelmatch(x.data, y.data, null, x.width, x.height, { threshold: NOISE_THRESHOLD }) === 0;
}

export function render(
  browser: Browser,
  url: string,
  width: number,
  capture: Capture,
  waitForStill: boolean,
) {
  const viewport = { width, height: capture.height };
  return withPage(
    browser,
    url,
    viewport,
    capture.css,
    async ({ health, scrollThrough, screenshot }) => {
      if (capture.full) await scrollThrough();
      const take = () => screenshot({ full: capture.full, selector: capture.selector });
      let png = await take();
      let still = !waitForStill;
      for (let attempt = 1; !still && attempt < STILL_ATTEMPTS; attempt++) {
        const next = await take();
        still = next.equals(png) || samePixels(next, png);
        png = next;
      }
      return { png, still, ...(await health()) } satisfies Render;
    },
  );
}

export function problems({ status, overflowX, overflowing, errors }: Health, still = true) {
  const found: string[] = [];
  if (status >= 400) found.push(`status    the page answered ${status}`);
  if (!still)
    found.push(
      `unstable  the page kept changing across ${STILL_ATTEMPTS} screenshots, so this render cannot be compared reliably`,
    );
  if (overflowX > 0)
    found.push(
      `overflow  page scrolls sideways by ${overflowX}px; sticking out: ${overflowing.join(", ") || "none found outside clipped boxes"}`,
    );
  if (errors.length > 0)
    found.push(`errors    ${errors.length} in the console; first: ${errors[0]?.slice(0, 160)}`);
  return found;
}
