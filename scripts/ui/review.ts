import { existsSync, mkdirSync, readFileSync, readdirSync, rmSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { pathToFileURL } from "node:url";
import { parseArgs } from "node:util";

import { OUT_ROOT, type Command } from "./command";
import { DIFF_ROOT, RESULT_FILE, type PairResult } from "./diff";
import { WEB_DIR } from "./server";

const SHEET_WIDTH = 1280;
const SHEET_MAX_HEIGHT = 7600;
const OOS1_DIR = join(WEB_DIR, "src/components/prototype/variant-oos1");

const FAMILIES = [
  "Home variants",
  "OOS1 about variants",
  "OOS1 products variants",
  "OOS1 subpages",
  "Labs",
] as const;
type Family = (typeof FAMILIES)[number];

const folders = (dir: string) =>
  new Set(existsSync(dir) ? readdirSync(dir).filter((name) => name !== "shared") : []);

function familyOf(label: string, abouts: Set<string>, products: Set<string>): Family {
  if (label.includes("/prototypes/")) return "Labs";
  if (label.includes("page=")) return "OOS1 subpages";
  const key = new URLSearchParams(label.split("?")[1] ?? "").get("variant") ?? "";
  if (products.has(key)) return "OOS1 products variants";
  if (abouts.has(key)) return "OOS1 about variants";
  return "Home variants";
}

function loadResults(root: string) {
  if (!existsSync(root)) return [];
  return readdirSync(root).flatMap((page) => {
    const dir = join(root, page);
    if (!existsSync(dir) || !readdirSync(dir).length) return [];
    return readdirSync(dir)
      .map((width) => join(dir, width, RESULT_FILE))
      .filter((file) => existsSync(file))
      .map((file) => JSON.parse(readFileSync(file, "utf8")) as PairResult);
  });
}

const escape = (text: string) => text.replace(/[&<>"]/g, (char) => `&#${char.charCodeAt(0)};`);

const slugOf = (family: Family) => family.toLowerCase().replaceAll(" ", "-");

function sheetHtml(family: Family, results: PairResult[]) {
  const changed = results.filter((result) => result.changes);
  const same = results.filter((result) => result.state !== "cannot measure" && !result.changes);
  const failed = results.filter((result) => result.state === "cannot measure");
  const names = (list: PairResult[]) => list.map((result) => escape(result.after)).join(", ");
  const entries = changed.map(
    (result) => `<section class="entry">
  <h2>${escape(result.after)} <span>${result.changedPixels?.toLocaleString("en")} px changed (${result.percent?.toFixed(2)}%)</span></h2>
  ${result.found.map((line) => `<p class="found">${escape(line)}</p>`).join("")}
  <div class="sides"><b class="before">Before</b><b class="after">After</b></div>
  <img src="${pathToFileURL(result.changes ?? "").href}">
</section>`,
  );
  return `<!doctype html><meta charset="utf-8"><style>
body{margin:0;padding:24px 32px;width:${SHEET_WIDTH - 64}px;font:16px/1.4 -apple-system,Helvetica,sans-serif;color:#111;background:#fff}
h1{font-size:26px;margin:0 0 8px}h2{font-size:18px;margin:0 0 6px}h2 span{font-weight:400;color:#555}
.summary p{margin:4px 0;color:#333}.entry{padding:20px 0;border-top:1px solid #ddd}
.found{margin:2px 0;color:#b42318;font-size:14px}.sides{display:flex;margin:6px 0}.sides b{flex:1}
.before{color:#b42318}.after{color:#067647}img{display:block;max-width:100%}
</style>
<section class="entry summary">
  <h1>${family}: before | after at ${results[0]?.width ?? ""}px</h1>
  <p>${results.length} pages: ${changed.length} changed, ${same.length} unchanged, ${failed.length} could not be measured.</p>
  ${same.length ? `<p>Unchanged: ${names(same)}</p>` : ""}
  ${failed.map((result) => `<p class="found">Could not measure ${escape(result.after)}: ${escape(result.error ?? "")}</p>`).join("")}
</section>
${entries.join("\n")}`;
}

export const review: Command = {
  summary: "draw before | after review sheets from the last diffs",
  offline: true,
  usage: `Usage: bun run ui review [options]

Reads the ${RESULT_FILE} files that \`bun run ui diff\` writes and draws one
review sheet per page family: home variants, OOS1 about variants, OOS1
products variants, OOS1 subpages, and labs. Each sheet opens with counts and
names the pages that did not change or could not be measured. Then it shows
every changed page's before | after crops with its changed pixels and
problems. A family taller than ${SHEET_MAX_HEIGHT}px splits into numbered sheets, so each
fits an image upload. Needs no dev server.

  --width 1440        the diff width to show
  --from DIR          diff folder to read (default: .cache/ui/diff)
  --out DIR           output folder (default: .cache/ui/review)`,

  plan(argv) {
    const { values } = parseArgs({
      args: argv,
      options: {
        width: { type: "string", default: "1440" },
        from: { type: "string", default: DIFF_ROOT },
        out: { type: "string", default: join(OUT_ROOT, "review") },
      },
    });
    const width = Number(values.width);
    if (!(width > 0)) throw new Error(`--width takes pixels, got "${values.width}"`);
    const results = loadResults(values.from).filter((result) => result.width === width);
    if (results.length === 0)
      throw new Error(`No ${width}px diff results in ${values.from}. Run: bun run ui diff`);
    const abouts = folders(join(OOS1_DIR, "abouts"));
    const products = folders(join(OOS1_DIR, "products"));
    const families = FAMILIES.map((family) => ({
      family,
      results: results
        .filter((result) => familyOf(result.after, abouts, products) === family)
        .sort((a, b) => a.after.localeCompare(b.after)),
    })).filter(({ results: list }) => list.length > 0);

    return {
      steps: families.map(
        ({ family, results: list }) =>
          `draw ${family} (${list.length} pages) → ${join(values.out, slugOf(family))}-N.png`,
      ),
      async run(browser) {
        rmSync(values.out, { recursive: true, force: true });
        mkdirSync(values.out, { recursive: true });
        const page = await browser.newPage({
          viewport: { width: SHEET_WIDTH, height: 900 },
          deviceScaleFactor: 1,
        });
        for (const { family, results: list } of families) {
          const html = join(values.out, `${slugOf(family)}.html`);
          writeFileSync(html, sheetHtml(family, list));
          await page.goto(pathToFileURL(html).href, { waitUntil: "load" });
          const boxes = await page.$$eval(".entry", (sections) =>
            sections.map((section) => {
              const box = section.getBoundingClientRect();
              return { top: box.top + window.scrollY, bottom: box.bottom + window.scrollY };
            }),
          );
          const sheets: { top: number; bottom: number }[] = [];
          for (const box of boxes) {
            const last = sheets.at(-1);
            if (last && box.bottom - last.top <= SHEET_MAX_HEIGHT) last.bottom = box.bottom;
            else sheets.push({ ...box });
          }
          const counts = list.reduce<Record<string, number>>((tally, result) => {
            const state = result.changes
              ? "changed"
              : result.state === "cannot measure"
                ? "cannot measure"
                : "unchanged";
            tally[state] = (tally[state] ?? 0) + 1;
            return tally;
          }, {});
          console.log(
            `${family}  ${list.length} pages  ${Object.entries(counts)
              .map(([state, count]) => `${count} ${state}`)
              .join(", ")}`,
          );
          for (const [index, { top, bottom }] of sheets.entries()) {
            const file = join(values.out, `${slugOf(family)}-${index + 1}.png`);
            await page.screenshot({
              path: file,
              fullPage: true,
              clip: { x: 0, y: top, width: SHEET_WIDTH, height: Math.ceil(bottom - top) },
            });
            console.log(`  sheet     ${file}`);
          }
        }
        await page.close();
        return false;
      },
    };
  },
};
