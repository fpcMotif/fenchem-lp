/// <reference lib="dom" />
/// <reference lib="dom.iterable" />
import { mkdirSync } from "node:fs";
import { join } from "node:path";
import { parseArgs } from "node:util";

import { problems, withPage } from "./browser";
import { OUT_ROOT, fileKey, parseWidths, positiveInt, toTarget, type Command } from "./command";

type Item = {
  n: number;
  label: string;
  left: number;
  right: number;
  width: number;
  delta: number;
  ink: boolean;
};

function measureAndDraw({ tolerance, full }: { tolerance: number; full: boolean }): Item[] {
  const vw = document.documentElement.clientWidth;
  const vh = full ? document.documentElement.scrollHeight : window.innerHeight;
  const cx = vw / 2;
  const canvas = document.createElement("canvas").getContext("2d")!;
  const ATOMIC = "a, button, svg, img, picture, video, canvas, input, select, textarea";

  const inkRect = (el: Element) => {
    const range = document.createRange();
    range.selectNodeContents(el);
    const box = range.getBoundingClientRect();
    const cs = getComputedStyle(el);
    if (
      range.getClientRects().length !== 1 ||
      cs.fontVariantNumeric !== "normal" ||
      cs.fontFeatureSettings !== "normal"
    ) {
      return { rect: box, ink: false };
    }
    canvas.font = `${cs.fontStyle} ${cs.fontWeight} ${cs.fontSize} ${cs.fontFamily}`;
    const raw = (el.textContent ?? "").trim();
    const text =
      cs.textTransform === "uppercase"
        ? raw.toUpperCase()
        : cs.textTransform === "lowercase"
          ? raw.toLowerCase()
          : raw;
    const chars = Array.from(new Intl.Segmenter().segment(text), (s) => s.segment);
    const firstChar = chars[0] ?? "";
    const lastChar = chars.at(-1) ?? "";
    const first = canvas.measureText(firstChar);
    const last = canvas.measureText(lastChar);
    const spacing = cs.letterSpacing === "normal" ? 0 : parseFloat(cs.letterSpacing);
    const fullCell = /[　-〿＀-￯]/;
    const left = fullCell.test(firstChar) ? box.left : box.left - first.actualBoundingBoxLeft;
    const right =
      box.right -
      spacing -
      (fullCell.test(lastChar) ? 0 : last.width - last.actualBoundingBoxRight);
    return { rect: new DOMRect(left, box.top, right - left, box.height), ink: true };
  };

  const union = (rects: DOMRect[]) => {
    const left = Math.min(...rects.map((r) => r.left));
    const top = Math.min(...rects.map((r) => r.top));
    const right = Math.max(...rects.map((r) => r.right));
    const bottom = Math.max(...rects.map((r) => r.bottom));
    return new DOMRect(left, top, right - left, bottom - top);
  };

  const clippedOut = (el: Element, rect: DOMRect) => {
    for (let p: Element | null = el; p && p !== document.body; p = p.parentElement) {
      const o = getComputedStyle(p);
      if (o.overflowX === "visible" && o.overflowY === "visible") continue;
      const c = p.getBoundingClientRect();
      if (
        rect.right <= c.left + 0.5 ||
        rect.left >= c.right - 0.5 ||
        rect.bottom <= c.top + 0.5 ||
        rect.top >= c.bottom - 0.5
      ) {
        return true;
      }
    }
    return false;
  };

  const found: { el: Element; rect: DOMRect; ink: boolean; kind: string }[] = [];
  const seen = new Set<string>();
  for (const el of document.body.querySelectorAll("*")) {
    if (el.closest("[data-mesurer-root], [data-center-audit], script, style")) continue;
    const atomic = el.closest(ATOMIC);
    if (atomic && atomic !== el) continue;
    if (!el.checkVisibility({ opacityProperty: true, visibilityProperty: true })) continue;
    const own = el.getBoundingClientRect();
    if (own.width < 2 || own.height < 2) continue;
    const cs = getComputedStyle(el);
    let measured: { rect: DOMRect; ink: boolean; kind: string };
    if (atomic === el) {
      measured = { rect: el.getBoundingClientRect(), ink: false, kind: "box" };
    } else if (el.children.length === 0 && el.textContent?.trim()) {
      const inRunningText =
        cs.display === "inline" &&
        [...(el.parentElement?.childNodes ?? [])].some(
          (node) => node !== el && node.textContent?.trim(),
        );
      if (inRunningText) continue;
      measured = { ...inkRect(el), kind: "text" };
    } else if (/flex|grid/.test(cs.display) && el.children.length >= 2) {
      const rects = [...el.children]
        .filter((c) => c.checkVisibility({ opacityProperty: true }))
        .map((c) => c.getBoundingClientRect())
        .filter((r) => r.width > 0 && r.height > 0);
      if (rects.length < 2) continue;
      measured = { rect: union(rects), ink: false, kind: "group" };
    } else {
      continue;
    }
    const { rect } = measured;
    if (rect.width < 8 || rect.height < 6 || rect.bottom <= 0 || rect.top >= vh) continue;
    if (rect.left <= 1 && rect.right >= vw - 1) continue;
    if (Math.abs((rect.left + rect.right) / 2 - cx) > tolerance) continue;
    if (clippedOut(el, rect)) continue;
    const key = [rect.left, rect.right].map((v) => Math.round(v * 2)).join();
    if (seen.has(key)) continue;
    seen.add(key);
    found.push({ el, ...measured });
  }

  const NS = "http://www.w3.org/2000/svg";
  const host = document.createElement("div");
  host.dataset.centerAudit = "";
  host.style.cssText = `position:${full ? "absolute" : "fixed"};left:0;top:0;width:${vw}px;height:${vh}px;z-index:2147483647;pointer-events:none`;
  const svg = document.createElementNS(NS, "svg");
  svg.setAttribute("width", String(vw));
  svg.setAttribute("height", String(vh));
  svg.style.cssText =
    "position:absolute;inset:0;overflow:visible;font:600 11px/1 ui-monospace,SFMono-Regular,Menlo,monospace";
  host.appendChild(svg);
  document.body.appendChild(host);

  const draw = (name: string, attrs: Record<string, string | number>, text?: string) => {
    const node = document.createElementNS(NS, name);
    for (const [k, v] of Object.entries(attrs)) node.setAttribute(k, String(v));
    if (text) node.textContent = text;
    svg.appendChild(node);
    return node as SVGGraphicsElement;
  };
  const label = (x: number, y: number, text: string, fill: string, anchor = "middle") => {
    const node = draw(
      "text",
      { x, y, fill: "#fff", "text-anchor": anchor, "dominant-baseline": "middle" },
      text,
    );
    const box = node.getBBox();
    const pill = draw("rect", {
      x: box.x - 3,
      y: box.y - 2,
      width: box.width + 6,
      height: box.height + 4,
      rx: 3,
      fill,
    });
    svg.insertBefore(pill, node);
  };
  const fmt = (v: number) => (Math.abs(v) < 0.05 ? "0" : v.toFixed(1));
  const RED = "#e5484d";
  const GREEN = "#2f9e44";
  const BLUE = "#0b6cff";
  const GRAY = "#6b7280";

  draw("line", { x1: cx, y1: 0, x2: cx, y2: vh, stroke: RED, "stroke-dasharray": "6 4" });
  label(cx + 6, 12, `center x=${fmt(cx)}`, RED, "start");

  return found.map(({ el, rect, ink, kind }, i) => {
    const n = i + 1;
    const delta = (rect.left + rect.right) / 2 - cx;
    const off = Math.abs(delta) >= 0.5;
    const tone = off ? RED : GREEN;
    const midY = (rect.top + rect.bottom) / 2;
    draw("rect", {
      x: rect.left,
      y: rect.top,
      width: rect.width,
      height: rect.height,
      fill: "none",
      stroke: off ? RED : BLUE,
      "stroke-dasharray": "4 3",
    });
    const tagY = rect.top - 8 < 24 ? rect.top + 10 : rect.top - 8;
    label(
      Math.max(rect.left, 0) + 4,
      tagY,
      `#${n} Δ${delta >= 0.05 ? "+" : ""}${fmt(delta)}${ink ? " ink" : ""}`,
      tone,
      "start",
    );
    if (off) {
      draw("line", {
        x1: (rect.left + rect.right) / 2,
        y1: midY,
        x2: cx,
        y2: midY,
        stroke: RED,
        "stroke-dasharray": "2 2",
      });
      draw("circle", { cx: (rect.left + rect.right) / 2, cy: midY, r: 2.5, fill: RED });
    }
    if (rect.left > 0) {
      draw("line", {
        x1: 0,
        y1: midY,
        x2: rect.left,
        y2: midY,
        stroke: GRAY,
        "stroke-dasharray": "1 3",
      });
      label(rect.left / 2, midY - 8, `L ${fmt(rect.left)}`, GRAY);
    }
    if (rect.right < vw) {
      draw("line", {
        x1: rect.right,
        y1: midY,
        x2: vw,
        y2: midY,
        stroke: GRAY,
        "stroke-dasharray": "1 3",
      });
      label((rect.right + vw) / 2, midY - 8, `R ${fmt(vw - rect.right)}`, GRAY);
    }
    const tag = el.tagName.toLowerCase();
    const text = (el as HTMLElement).innerText?.split("\n")[0]?.trim().slice(0, 24) ?? "";
    return {
      n,
      label: `${kind} <${tag}>${text ? ` "${text}"` : ""}`,
      left: +rect.left.toFixed(1),
      right: +(vw - rect.right).toFixed(1),
      width: +rect.width.toFixed(1),
      delta: +delta.toFixed(1),
      ink,
    };
  });
}

export const align: Command = {
  summary: "measure how far near-center elements sit off center",
  usage: `Usage: bun run ui align <target...> [options]

Draws a dotted center line, outlines every element whose center sits near it,
and labels its offset from center (Δ) and its left/right distances (L/R).
Single-line text is measured by its visible ink, not its layout box.
Red when any near-center element is off center by 0.5px or more, or the page
has errors or sideways overflow.

  --widths 1440,1920   viewport widths to capture
  --height 1000        viewport height
  --tolerance 40       max |Δ| in px for an element to count as centered
  --scroll-to bottom   "top", "bottom", or a CSS selector to scroll into view
  --css "..."          extra CSS injected before measuring
  --full               scroll the whole page, mark every section in one tall
                       screenshot, and print only the off-center elements
  --out DIR            screenshot folder (default: .cache/ui/align)`,

  plan(argv, origin) {
    const { values, positionals } = parseArgs({
      args: argv,
      allowPositionals: true,
      options: {
        widths: { type: "string", default: "1440,1920" },
        height: { type: "string", default: "1000" },
        tolerance: { type: "string", default: "40" },
        "scroll-to": { type: "string", default: "bottom" },
        css: { type: "string", default: "" },
        full: { type: "boolean", default: false },
        out: { type: "string", default: join(OUT_ROOT, "align") },
      },
    });
    if (positionals.length === 0) throw new Error("Name at least one target to measure.");
    const height = positiveInt(values.height, "--height");
    const tolerance = positiveInt(values.tolerance, "--tolerance");
    const jobs = positionals.flatMap((label) =>
      parseWidths(values.widths).map((width) => ({
        target: toTarget(label, origin),
        width,
        file: join(values.out, `${fileKey(label)}-${width}.png`),
      })),
    );

    return {
      steps: jobs.map(
        (job) =>
          `measure ${job.target.url} at ${job.width}×${height} (${values.full ? "full page" : `scrolled to ${values["scroll-to"]}`}) → ${job.file}`,
      ),
      async run(browser) {
        mkdirSync(values.out, { recursive: true });
        const results = await Promise.all(
          jobs.map((job) =>
            withPage(
              browser,
              job.target.url,
              { width: job.width, height },
              values.css,
              async ({ page, health, advance, scrollThrough, screenshot }) => {
                if (values.full) await scrollThrough();
                else {
                  for (let pass = 0; pass < 2; pass++) {
                    const found = await page.evaluate((target) => {
                      if (target === "top") window.scrollTo(0, 0);
                      else if (target === "bottom")
                        window.scrollTo(0, document.documentElement.scrollHeight);
                      else {
                        const element = document.querySelector(target);
                        if (!element) return false;
                        element.scrollIntoView({ block: "center" });
                      }
                      return true;
                    }, values["scroll-to"]);
                    if (!found)
                      throw new Error(`--scroll-to "${values["scroll-to"]}" matches nothing`);
                    await advance();
                  }
                }
                const pageHealth = await health();
                const items = await page.evaluate(measureAndDraw, {
                  tolerance,
                  full: values.full,
                });
                await screenshot({ full: values.full, path: job.file });
                return { job, items, found: problems(pageHealth) };
              },
            ),
          ),
        );

        let red = false;
        for (const { job, items, found } of results) {
          const off = items.filter((item) => Math.abs(item.delta) >= 0.5);
          red ||= off.length > 0 || found.length > 0;
          console.log(
            `\n${job.width}×${height}  ${job.target.label}  ${off.length || found.length ? "RED" : "ok"}`,
          );
          console.log(`  ${items.length} near-center elements, ${off.length} off center by ≥0.5px`);
          for (const line of found) console.log(`  ${line}`);
          console.log(`  file      ${job.file}`);
          console.table(values.full ? off : items);
        }
        return red;
      },
    };
  },
};
