import { colors } from "@fenchem-lp/ui/tokens.stylex";
import * as stylex from "@stylexjs/stylex";
import type { ReactNode } from "react";
import { type Range } from "./marked-values";

const styles = stylex.create({
  mark: {
    paddingInline: 1,
    marginInline: -1,
    borderRadius: 2,
    backgroundColor: colors.brandGreen200,
    color: "#1a1a1a",
  },
});

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
