import { colors } from "@fenchem-lp/ui/tokens.stylex";
import * as stylex from "@stylexjs/stylex";
import type { ReactNode } from "react";

export type Range = readonly [number, number];

const styles = stylex.create({
  mark: {
    paddingInline: 1,
    marginInline: -1,
    borderRadius: 2,
    backgroundColor: colors.brandGreen200,
    color: "#1a1a1a",
  },
});

export const toTerms = (query: string) => query.trim().toLowerCase().split(/\s+/).filter(Boolean);

export const findRanges = (text: string, terms: string[]): Range[] => {
  if (terms.length === 0) return [];
  const lower = text.toLowerCase();
  const found: [number, number][] = [];
  for (const term of terms) {
    let at = lower.indexOf(term);
    while (at !== -1) {
      found.push([at, at + term.length]);
      at = lower.indexOf(term, at + term.length);
    }
  }
  found.sort((a, b) => a[0] - b[0]);
  const merged: [number, number][] = [];
  for (const [start, end] of found) {
    const last = merged.at(-1);
    if (last && start <= last[1]) last[1] = Math.max(last[1], end);
    else merged.push([start, end]);
  }
  return merged;
};

export function Marked({
  text,
  ranges,
  offset = 0,
}: {
  text: string;
  ranges: Range[];
  offset?: number;
}) {
  const end = offset + text.length;
  const parts: ReactNode[] = [];
  let cursor = offset;
  for (const [start, stop] of ranges) {
    if (stop <= cursor || start >= end) continue;
    const from = Math.max(start, cursor);
    const to = Math.min(stop, end);
    if (from > cursor) parts.push(text.slice(cursor - offset, from - offset));
    parts.push(
      <mark key={from} {...stylex.props(styles.mark)}>
        {text.slice(from - offset, to - offset)}
      </mark>,
    );
    cursor = to;
  }
  if (cursor < end) parts.push(text.slice(cursor - offset));
  return <>{parts}</>;
}
