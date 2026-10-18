import { colors } from "@fenchem-lp/ui/tokens.stylex";
import * as stylex from "@stylexjs/stylex";
import type { JSX } from "@solidjs/web";
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

export function Marked(props: { text: string; ranges: Range[]; offset?: number }) {
  return <>{markParts(props.text, props.ranges, props.offset ?? 0)}</>;
}

function markParts(text: string, ranges: Range[], offset: number) {
  const end = offset + text.length;
  const parts: JSX.Element[] = [];
  let cursor = offset;
  for (const [start, stop] of ranges) {
    if (stop <= cursor || start >= end) continue;
    const from = Math.max(start, cursor);
    const to = Math.min(stop, end);
    if (from > cursor) parts.push(text.slice(cursor - offset, from - offset));
    parts.push(
      <mark {...stylex.attrs(styles.mark)}>{text.slice(from - offset, to - offset)}</mark>,
    );
    cursor = to;
  }
  if (cursor < end) parts.push(text.slice(cursor - offset));
  return parts;
}
