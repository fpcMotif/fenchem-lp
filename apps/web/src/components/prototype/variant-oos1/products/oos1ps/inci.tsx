import * as stylex from "@stylexjs/stylex";
import type { JSX } from "@solidjs/web";

const INCI_LATIN = /（[^）]*）/g;

const styles = stylex.create({
  keepTogether: {
    whiteSpace: "nowrap",
  },
});

export function Inci(props: { text: string }) {
  return <>{inciParts(props.text)}</>;
}

function inciParts(text: string) {
  const parts: JSX.Element[] = [];
  let last = 0;
  for (const match of text.matchAll(INCI_LATIN)) {
    parts.push(text.slice(last, match.index));
    parts.push(<span {...stylex.attrs(styles.keepTogether)}>{match[0]}</span>);
    last = match.index + match[0].length;
  }
  parts.push(text.slice(last));
  return parts;
}
