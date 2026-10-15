import {
  existsSync,
  mkdirSync,
  readFileSync,
  readdirSync,
  renameSync,
  rmSync,
  writeFileSync,
} from "node:fs";
import { join } from "node:path";
import { parseArgs } from "node:util";

import { problems, render } from "./browser";
import {
  CAPTURE_OPTIONS,
  CAPTURE_USAGE,
  describeCapture,
  fileKey,
  OUT_ROOT,
  parseCapture,
  toTarget,
  type Capture,
  type Command,
} from "./command";

const BASELINES = join(OUT_ROOT, "baselines");
const STAGING = ".partial";

export type Baseline = { target: string; widths: number[]; capture: Capture; chrome: string };

export const baselineDir = (target: string) => join(BASELINES, fileKey(target));

export const baselineImage = (target: string, width: number) =>
  join(baselineDir(target), `${width}.png`);

function parseBaseline(file: string): Baseline {
  const value = JSON.parse(readFileSync(file, "utf8"));
  if (
    typeof value?.target !== "string" ||
    !Array.isArray(value.widths) ||
    typeof value.capture?.height !== "number" ||
    typeof value.chrome !== "string"
  )
    throw new Error(`${file} is not a baseline; snap its target again`);
  return value;
}

export function loadBaselines(only?: string): Baseline[] {
  const dirs =
    only !== undefined
      ? [baselineDir(only)]
      : existsSync(BASELINES)
        ? readdirSync(BASELINES)
            .filter((name) => !name.endsWith(STAGING))
            .map((name) => join(BASELINES, name))
        : [];
  return dirs
    .map((dir) => join(dir, "baseline.json"))
    .filter((file) => existsSync(file))
    .map(parseBaseline);
}

export const snap: Command = {
  summary: "save pages as baselines for a later diff",
  usage: `Usage: bun run ui snap <target...> [options]

Saves each target at each width, with these capture options, as the baseline
that \`bun run ui diff\` compares against. Snapping a target again replaces its
baseline. Baselines live in .cache/ui/baselines. Each render waits until two
screenshots in a row match. Red when a render never holds still, has page
errors or an error status, or scrolls sideways; the baseline is saved anyway.

${CAPTURE_USAGE}`,

  plan(argv, origin) {
    const { values, positionals } = parseArgs({
      args: argv,
      allowPositionals: true,
      options: CAPTURE_OPTIONS,
    });
    if (positionals.length === 0) throw new Error("Name at least one target to snap.");
    const { widths, capture } = parseCapture(values);
    const targets = positionals.map((label) => toTarget(label, origin));

    return {
      steps: targets.flatMap((target) =>
        widths.map(
          (width) =>
            `render ${target.url} at ${width}px (${describeCapture(capture)}) → ${baselineImage(target.label, width)}`,
        ),
      ),
      async run(browser) {
        const saved = await Promise.all(
          targets.map(async (target) => {
            const renders = await Promise.all(
              widths.map(async (width) => ({
                width,
                result: await render(browser, target.url, width, capture, true),
              })),
            );
            const baseline: Baseline = {
              target: target.label,
              widths,
              capture,
              chrome: browser.version(),
            };
            const dir = baselineDir(target.label);
            const staging = `${dir}${STAGING}`;
            rmSync(staging, { recursive: true, force: true });
            mkdirSync(staging, { recursive: true });
            for (const { width, result } of renders)
              writeFileSync(join(staging, `${width}.png`), result.png);
            writeFileSync(join(staging, "baseline.json"), JSON.stringify(baseline, null, 2));
            rmSync(dir, { recursive: true, force: true });
            renameSync(staging, dir);
            return {
              target,
              dir,
              found: renders.flatMap(({ width, result }) =>
                problems(result, result.still).map((line) => `${width}px ${line}`),
              ),
            };
          }),
        );
        for (const { target, dir, found } of saved) {
          console.log(
            `saved  ${target.label}  ${widths.join(",")}px  ${found.length ? "RED" : "ok"}`,
          );
          for (const line of found) console.log(`  ${line}`);
          console.log(`  dir       ${dir}`);
        }
        return saved.some(({ found }) => found.length > 0);
      },
    };
  },
};
