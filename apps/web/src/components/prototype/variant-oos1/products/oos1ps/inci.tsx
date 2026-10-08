import * as stylex from "@stylexjs/stylex";
import type { ReactNode } from "react";

const INCI_LATIN = /（[^）]*）/g;

const styles = stylex.create({
  keepTogether: {
    whiteSpace: "nowrap",
  },
});

export function Inci({ text }: { text: string }) {
  const parts: ReactNode[] = [];
  let last = 0;
  for (const match of text.matchAll(INCI_LATIN)) {
    parts.push(text.slice(last, match.index));
    parts.push(
      <span key={match.index} {...stylex.props(styles.keepTogether)}>
        {match[0]}
      </span>,
    );
    last = match.index + match[0].length;
  }
  parts.push(text.slice(last));
  return <>{parts}</>;
}
