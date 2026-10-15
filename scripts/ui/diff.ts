import { createHash } from "node:crypto";
import { mkdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { parseArgs } from "node:util";

import pixelmatch from "pixelmatch";
import { PNG } from "pngjs";

import type { Browser } from "@playwright/test";

import { NOISE_THRESHOLD, problems, render } from "./browser";
import {
  CAPTURE_OPTIONS,
  CAPTURE_USAGE,
  OUT_ROOT,
  describeCapture,
  fileKey,
  parseCapture,
  toTarget,
  type Capture,
  type Command,
} from "./command";
import { baselineImage, loadBaselines } from "./snap";

type Rgb = [number, number, number];

const LIGHTER: Rgb = [229, 72, 77];
const DARKER: Rgb = [47, 158, 68];
const PAD: Rgb = [255, 0, 255];
const SHEET: Rgb = [229, 229, 229];
const GUTTER = 16;
const LISTED_BANDS = 6;
const REVIEW_WIDTH = 1400;
const REVIEW_MARGIN = 40;
const REVIEW_BAND_HEIGHT = 320;

type Band = { top: number; bottom: number; left: number; right: number };
type Source = { kind: "live"; url: string } | { kind: "baseline"; file: string; chrome: string };
type Side = { label: string; source: Source };
type Pair = { before: Side; after: Side; width: number; capture: Capture; dir: string };

function filled(width: number, height: number, color: Rgb) {
  const image = new PNG({ width, height });
  const pixel = Uint8Array.of(...color, 255);
  for (let index = 0; index < image.data.length; index += 4) image.data.set(pixel, index);
  return image;
}

function padTo(image: PNG, width: number, height: number) {
  if (image.width === width && image.height === height) return image;
  const padded = filled(width, height, PAD);
  PNG.bitblt(image, padded, 0, 0, image.width, image.height, 0, 0);
  return padded;
}

function rowHashes(image: PNG, columns: number) {
  const stride = image.width * 4;
  return Array.from({ length: image.height }, (_, y) =>
    createHash("md5")
      .update(image.data.subarray(y * stride, y * stride + columns * 4))
      .digest("base64"),
  );
}

function rowIndex(rows: string[]) {
  const index = new Map<string, number[]>();
  rows.forEach((hash, y) => {
    const list = index.get(hash);
    if (list) list.push(y);
    else index.set(hash, [y]);
  });
  return index;
}

function verticalShift(a: PNG, b: PNG) {
  const columns = Math.min(a.width, b.width);
  const scope = a.width === b.width ? "" : ` (measured on the shared ${columns}px)`;
  const rowsA = rowHashes(a, columns);
  const rowsB = rowHashes(b, columns);
  if (rowsA.length === rowsB.length && rowsA.every((hash, y) => hash === rowsB[y]))
    return `none${scope}`;

  const indexA = rowIndex(rowsA);
  const indexB = rowIndex(rowsB);
  const runs: { start: number; end: number; shift: number; rows: number }[] = [];
  rowsA.forEach((hash, y) => {
    const matches = indexB.get(hash);
    if (!matches || matches.length !== 1 || indexA.get(hash)?.length !== 1) return;
    const shift = (matches[0] ?? y) - y;
    const run = runs.at(-1);
    if (run && run.shift === shift) {
      run.end = y;
      run.rows++;
    } else {
      runs.push({ start: y, end: y, shift, rows: 1 });
    }
  });

  const solid: { start: number; end: number; low: number; high: number }[] = [];
  for (const run of runs.filter((candidate) => candidate.rows >= 8)) {
    const previous = solid.at(-1);
    const near =
      previous && Math.max(previous.high, run.shift) - Math.min(previous.low, run.shift) <= 1;
    if (previous && near) {
      previous.end = run.end;
      previous.low = Math.min(previous.low, run.shift);
      previous.high = Math.max(previous.high, run.shift);
    } else {
      solid.push({ start: run.start, end: run.end, low: run.shift, high: run.shift });
    }
  }
  const moved = solid.filter((run) => Math.abs(run.low + run.high) > 1);
  if (moved.length === 0)
    return `no move of 2px or more found among rows that appear once on each side${scope}`;
  const signed = (value: number) => `${value > 0 ? "+" : ""}${value}`;
  const shown = moved
    .slice(0, 4)
    .map(
      (run) =>
        `y ${run.start}–${run.end} moved ${signed(run.high > 0 ? run.high : run.low)}px${run.low === run.high ? "" : " (±1px subpixel)"}`,
    );
  if (moved.length > 4) shown.push(`${moved.length - 4} more`);
  return shown.join(" · ") + scope;
}

function changedBands(diff: PNG) {
  const isChange = (index: number) =>
    [LIGHTER, DARKER].some(
      (color) =>
        diff.data[index] === color[0] &&
        diff.data[index + 1] === color[1] &&
        diff.data[index + 2] === color[2],
    );
  const bands: Band[] = [];
  for (let y = 0; y < diff.height; y++) {
    let left = -1;
    let right = -1;
    for (let x = 0; x < diff.width; x++) {
      if (!isChange((y * diff.width + x) * 4)) continue;
      if (left < 0) left = x;
      right = x;
    }
    if (left < 0) continue;
    const band = bands.at(-1);
    if (band && y - band.bottom <= 24) {
      band.bottom = y;
      band.left = Math.min(band.left, left);
      band.right = Math.max(band.right, right);
    } else {
      bands.push({ top: y, bottom: y, left, right });
    }
  }
  return bands;
}

function describeBands(bands: Band[]) {
  const shown = bands
    .slice(0, LISTED_BANDS)
    .map(
      (band, index) => `${index + 1}: y ${band.top}–${band.bottom} × x ${band.left}–${band.right}`,
    );
  if (bands.length > LISTED_BANDS) shown.push(`${bands.length - LISTED_BANDS} more`);
  return shown.join(" · ") || "none";
}

function sideBySide(images: PNG[]) {
  const height = Math.max(...images.map((image) => image.height));
  const width = images.reduce((sum, image) => sum + image.width, 0) + GUTTER * (images.length - 1);
  const sheet = filled(width, height, SHEET);
  let x = 0;
  for (const image of images) {
    PNG.bitblt(image, sheet, 0, 0, image.width, image.height, x, 0);
    x += image.width + GUTTER;
  }
  return sheet;
}

function stacked(images: PNG[]) {
  const width = Math.max(...images.map((image) => image.width));
  const height =
    images.reduce((sum, image) => sum + image.height, 0) + GUTTER * (images.length - 1);
  const sheet = filled(width, height, SHEET);
  let y = 0;
  for (const image of images) {
    PNG.bitblt(image, sheet, 0, 0, image.width, image.height, 0, y);
    y += image.height + GUTTER;
  }
  return sheet;
}

function crop(image: PNG, left: number, top: number, width: number, height: number) {
  const piece = new PNG({ width, height });
  PNG.bitblt(image, piece, left, top, width, height, 0, 0);
  return piece;
}

function shrinkTo(image: PNG, maxWidth: number) {
  if (image.width <= maxWidth) return image;
  const scale = maxWidth / image.width;
  const width = maxWidth;
  const height = Math.max(1, Math.round(image.height * scale));
  const small = new PNG({ width, height });
  for (let y = 0; y < height; y++) {
    const y0 = Math.floor(y / scale);
    const y1 = Math.min(image.height, Math.max(y0 + 1, Math.floor((y + 1) / scale)));
    for (let x = 0; x < width; x++) {
      const x0 = Math.floor(x / scale);
      const x1 = Math.min(image.width, Math.max(x0 + 1, Math.floor((x + 1) / scale)));
      for (let channel = 0; channel < 4; channel++) {
        let sum = 0;
        for (let sy = y0; sy < y1; sy++)
          for (let sx = x0; sx < x1; sx++)
            sum += image.data[(sy * image.width + sx) * 4 + channel] ?? 0;
        small.data[(y * width + x) * 4 + channel] = Math.round(sum / ((y1 - y0) * (x1 - x0)));
      }
    }
  }
  return small;
}

function changesSheet(a: PNG, b: PNG, bands: Band[]) {
  const rows = bands.slice(0, LISTED_BANDS).map((band) => {
    const left = Math.max(0, band.left - REVIEW_MARGIN);
    const right = Math.min(a.width, band.right + 1 + REVIEW_MARGIN);
    const top = Math.max(0, band.top - REVIEW_MARGIN);
    const bottom = Math.min(a.height, top + REVIEW_BAND_HEIGHT, band.bottom + 1 + REVIEW_MARGIN);
    const [width, height] = [right - left, bottom - top];
    return sideBySide([crop(a, left, top, width, height), crop(b, left, top, width, height)]);
  });
  return shrinkTo(stacked(rows), REVIEW_WIDTH);
}

async function load(browser: Browser, side: Side, width: number, capture: Capture) {
  if (side.source.kind === "baseline")
    return { image: PNG.sync.read(readFileSync(side.source.file)), found: [] };
  const { png, still, ...health } = await render(browser, side.source.url, width, capture, true);
  return { image: PNG.sync.read(png), found: problems(health, still) };
}

function describe(side: Side) {
  return side.source.kind === "live" ? side.source.url : `baseline ${side.source.file}`;
}

function matchImages(before: PNG, after: PNG) {
  const fullWidth = Math.max(before.width, after.width);
  const fullHeight = Math.max(before.height, after.height);
  const a = padTo(before, fullWidth, fullHeight);
  const b = padTo(after, fullWidth, fullHeight);
  const diff = new PNG({ width: fullWidth, height: fullHeight });
  const changed = pixelmatch(a.data, b.data, diff.data, fullWidth, fullHeight, {
    threshold: NOISE_THRESHOLD,
    alpha: 0.15,
    diffColor: LIGHTER,
    diffColorAlt: DARKER,
  });
  return { a, b, diff, changed, percent: (changed / (fullWidth * fullHeight)) * 100 };
}

async function compare(browser: Browser, pair: Pair, maxDiff: number) {
  const [shotA, firstB] = await Promise.all([
    load(browser, pair.before, pair.width, pair.capture),
    load(browser, pair.after, pair.width, pair.capture),
  ]);
  let shotB = firstB;
  let match = matchImages(shotA.image, shotB.image);
  const notes: string[] = [];
  if (match.percent > maxDiff && pair.before.source.kind === "baseline") {
    const again = await load(browser, pair.after, pair.width, pair.capture);
    const second = matchImages(shotA.image, again.image);
    if (second.percent <= maxDiff) {
      notes.push(
        `note      the first render differed by ${match.changed.toLocaleString("en")} px; a second render matched, so that was load noise`,
      );
      shotB = again;
      match = second;
    } else
      notes.push(
        `note      a second render also differed, by ${second.changed.toLocaleString("en")} px`,
      );
  }
  const { a, b, diff, changed, percent } = match;
  const overBudget = percent > maxDiff;

  const bands = changedBands(diff);
  mkdirSync(pair.dir, { recursive: true });
  const files = {
    before: shotA.image,
    after: shotB.image,
    diff,
    compare: sideBySide([a, b, diff]),
  };
  for (const [name, image] of Object.entries(files))
    writeFileSync(join(pair.dir, `${name}.png`), PNG.sync.write(image));
  const changes = join(pair.dir, "changes.png");
  rmSync(changes, { force: true });
  if (bands.length > 0) writeFileSync(changes, PNG.sync.write(changesSheet(a, b, bands)));

  const found = [
    ...shotA.found.map((line) => `before ${line}`),
    ...shotB.found.map((line) => `after  ${line}`),
  ];
  const chrome = browser.version();
  const baselineChrome =
    pair.before.source.kind === "baseline" ? pair.before.source.chrome : undefined;
  const [wa, ha, wb, hb] = [
    shotA.image.width,
    shotA.image.height,
    shotB.image.width,
    shotB.image.height,
  ];
  const grew = hb - ha;
  const shown = Math.min(bands.length, LISTED_BANDS);
  const lines = [
    `${pair.width}px   ${pair.before.label}  →  ${pair.after.label}  ${overBudget || found.length ? "RED" : "ok"}`,
    `  diff      ${changed.toLocaleString("en")} px (${percent.toFixed(3)}%), budget ${maxDiff}%`,
    `  size      ${wa === wb && ha === hb ? `${wa}×${ha}` : `${wa}×${ha} → ${wb}×${hb} (${grew >= 0 ? "+" : ""}${grew}px tall)`}`,
    `  shift     ${verticalShift(shotA.image, shotB.image)}`,
    `  where     ${describeBands(bands)}`,
    ...found.map((line) => `  ${line}`),
    ...notes.map((line) => `  ${line}`),
    ...(baselineChrome && baselineChrome !== chrome
      ? [`  note      baseline rendered by Chrome ${baselineChrome}; this run uses ${chrome}`]
      : []),
    `  files     ${join(pair.dir, "compare.png")} (before | after | diff)`,
    ...(bands.length > 0
      ? [
          `  changes   ${changes} (regions 1–${shown} of ${bands.length}, before | after, top to bottom)`,
        ]
      : []),
  ];
  return { red: overBudget || found.length > 0, lines };
}

export const diff: Command = {
  summary: "compare two pages, or pages against their snapped baselines",
  usage: `Usage: bun run ui diff <before> <after> [options]
       bun run ui diff [target] [--max-diff N]

With two targets, renders both and compares them pixel by pixel. With one
target, compares it against the baseline saved by \`bun run ui snap\`. With no
target, compares every saved baseline. A baseline fixes the widths and capture
options, so baseline diffs take only --max-diff and --out.

Each render waits until two screenshots in a row match. A pixel counts as
changed when its colour moves by more than about two levels out of 255;
smaller shifts are invisible and vary between loads. Prints, per width: changed pixels, size change, vertical shift,
and numbered changed regions. Writes before.png, after.png, diff.png, and
compare.png (before | after | diff). In diff.png, red marks pixels that got
lighter, green marks pixels that got darker, and yellow marks anti-aliasing,
which is not counted. When pixels changed, also writes changes.png: before |
after crops of the first ${LISTED_BANDS} regions, at most ${REVIEW_WIDTH}px wide, small enough
for a model to read.

Red when a width changes more than --max-diff, or a live render never holds
still, has page errors or an error status, or scrolls sideways. A baseline
diff over --max-diff renders the page once more; when that render matches, the
first counts as load noise and a note says so.

${CAPTURE_USAGE}
  --max-diff 0        allowed changed pixels, in percent
  --out DIR           output folder (default: .cache/ui/diff)`,

  plan(argv, origin) {
    const { values, positionals, tokens } = parseArgs({
      args: argv,
      allowPositionals: true,
      tokens: true,
      options: {
        ...CAPTURE_OPTIONS,
        "max-diff": { type: "string", default: "0" },
        out: { type: "string", default: join(OUT_ROOT, "diff") },
      },
    });
    const maxDiff = Number(values["max-diff"]);
    if (!(maxDiff >= 0)) throw new Error(`--max-diff takes a percent, got "${values["max-diff"]}"`);
    if (positionals.length > 2) throw new Error("Name at most two targets: before and after.");

    let pairs: Pair[];
    if (positionals.length === 2) {
      const [before, after] = positionals.map((label) => toTarget(label, origin));
      if (!before || !after) throw new Error("Name both targets.");
      const { widths, capture } = parseCapture(values);
      pairs = widths.map((width) => ({
        before: { label: before.label, source: { kind: "live", url: before.url } },
        after: { label: after.label, source: { kind: "live", url: after.url } },
        width,
        capture,
        dir: join(values.out, fileKey(after.label), String(width)),
      }));
    } else {
      const flag = tokens.find(
        (token) => token.kind === "option" && Object.hasOwn(CAPTURE_OPTIONS, token.name),
      );
      if (flag?.kind === "option")
        throw new Error(
          `--${flag.name} does not apply to a baseline diff; the baseline fixes it. Snap again to change it.`,
        );
      const [only] = positionals;
      const baselines = loadBaselines(only);
      if (baselines.length === 0)
        throw new Error(
          only === undefined
            ? "No baselines saved. Save one with: bun run ui snap <target>"
            : `No baseline for "${only}". Save one with: bun run ui snap "${only}"`,
        );
      pairs = baselines.flatMap((baseline) => {
        const target = toTarget(baseline.target, origin);
        return baseline.widths.map((width) => ({
          before: {
            label: `${baseline.target} (baseline)`,
            source: {
              kind: "baseline",
              file: baselineImage(baseline.target, width),
              chrome: baseline.chrome,
            },
          },
          after: { label: target.label, source: { kind: "live", url: target.url } },
          width,
          capture: baseline.capture,
          dir: join(values.out, fileKey(target.label), String(width)),
        }));
      });
    }

    return {
      steps: pairs.map(
        (pair) =>
          `compare at ${pair.width}px (${describeCapture(pair.capture)}): ${describe(pair.before)} → ${describe(pair.after)}; write ${pair.dir}`,
      ),
      async run(browser) {
        const results = await Promise.all(pairs.map((pair) => compare(browser, pair, maxDiff)));
        for (const { lines } of results) console.log(lines.join("\n") + "\n");
        return results.some(({ red }) => red);
      },
    };
  },
};
