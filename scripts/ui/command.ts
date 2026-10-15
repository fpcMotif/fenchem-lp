import { createHash } from "node:crypto";
import { fileURLToPath } from "node:url";

import type { Browser } from "@playwright/test";

export type Plan = {
  steps: string[];
  run: (browser: Browser) => Promise<boolean>;
};

export type Command = {
  summary: string;
  usage: string;
  plan: (argv: string[], origin: string) => Plan;
};

export type Target = { label: string; url: string };

export type Capture = {
  height: number;
  full: boolean;
  selector?: string;
  css: string;
};

export const OUT_ROOT = fileURLToPath(new URL("../../.cache/ui/", import.meta.url));

export const CAPTURE_OPTIONS = {
  widths: { type: "string", default: "1440,390" },
  height: { type: "string", default: "900" },
  full: { type: "boolean", default: false },
  selector: { type: "string" },
  css: { type: "string", default: "" },
} as const;

export const CAPTURE_USAGE = `  --widths 1440,390   viewport widths
  --height 900        viewport height
  --full              the whole scrolled page instead of the first screen
  --selector CSS      only the first element matching CSS
  --css "..."         extra CSS injected before capture`;

export function toTarget(label: string, origin: string): Target {
  return { label, url: /^https?:\/\//.test(label) ? label : new URL(label, origin).href };
}

export function slug(label: string) {
  return (
    label
      .replace(/^https?:\/\//, "")
      .replace(/[^a-zA-Z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "")
      .slice(0, 60) || "root"
  );
}

export function fileKey(label: string) {
  return `${slug(label)}-${createHash("sha1").update(label).digest("hex").slice(0, 8)}`;
}

export function positiveInt(value: string, flag: string) {
  const number = Number(value);
  if (!Number.isInteger(number) || number <= 0)
    throw new Error(`${flag} takes a positive integer, got "${value}"`);
  return number;
}

export function parseWidths(value: string) {
  return value.split(",").map((width) => positiveInt(width, "--widths"));
}

export function parseCapture(values: {
  widths: string;
  height: string;
  full: boolean;
  selector?: string;
  css: string;
}) {
  const capture: Capture = {
    height: positiveInt(values.height, "--height"),
    full: values.full,
    selector: values.selector,
    css: values.css,
  };
  return { widths: parseWidths(values.widths), capture };
}

export function describeCapture(capture: Capture) {
  return [
    capture.full ? "full page" : `first ${capture.height}px`,
    capture.selector && `selector ${capture.selector}`,
    capture.css && "extra css",
  ]
    .filter(Boolean)
    .join(", ");
}
