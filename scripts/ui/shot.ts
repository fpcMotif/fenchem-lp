import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { parseArgs } from "node:util";

import { problems, render } from "./browser";
import {
  CAPTURE_OPTIONS,
  CAPTURE_USAGE,
  OUT_ROOT,
  describeCapture,
  fileKey,
  measureEach,
  parseCapture,
  toTarget,
  type Command,
} from "./command";

export const shot: Command = {
  summary: "screenshot pages at each width",
  usage: `Usage: bun run ui shot <target...> [options]

Screenshots each target at each width and reports page errors and sideways
overflow. Red when any render has either.

${CAPTURE_USAGE}
  --out DIR           output folder (default: .cache/ui/shot)`,

  plan(argv, origin) {
    const { values, positionals } = parseArgs({
      args: argv,
      allowPositionals: true,
      options: { ...CAPTURE_OPTIONS, out: { type: "string", default: join(OUT_ROOT, "shot") } },
    });
    if (positionals.length === 0) throw new Error("Name at least one target to screenshot.");
    const { widths, capture } = parseCapture(values);
    const jobs = positionals.flatMap((label) =>
      widths.map((width) => ({
        target: toTarget(label, origin),
        width,
        file: join(values.out, `${fileKey(label)}-${width}.png`),
      })),
    );

    return {
      steps: jobs.map(
        (job) =>
          `render ${job.target.url} at ${job.width}px (${describeCapture(capture)}) → ${job.file}`,
      ),
      async run(browser) {
        mkdirSync(values.out, { recursive: true });
        return measureEach(
          jobs,
          (job) => `${job.width}px  ${job.target.label}`,
          (job) => render(browser, job.target.url, job.width, capture, false),
          (job, result) => {
            writeFileSync(job.file, result.png);
            const found = problems(result);
            console.log(`${job.width}px  ${job.target.label}  ${found.length ? "RED" : "ok"}`);
            for (const line of found) console.log(`  ${line}`);
            console.log(`  file      ${job.file}`);
            return found.length > 0;
          },
        );
      },
    };
  },
};
