import * as stylex from "@stylexjs/stylex";

import { ui } from "./layout";
import { StrobeText, useEntry } from "./strobe";
import { bp, face, tone } from "./tokens.stylex";
import { merge } from "solid-js";

const styles = stylex.create({
  head: {
    alignItems: "baseline",
    rowGap: 14,
    marginBottom: { default: 40, [bp.tablet]: 56, [bp.desktop]: 72 },
  },
  title: {
    margin: 0,
    fontFamily: face.sans,
    fontWeight: 500,
    fontSize: { default: 36, [bp.tablet]: 48, [bp.desktop]: "clamp(54px, 4.75vw, 70px)" },
    lineHeight: 1.08,
    letterSpacing: "0.01em",
    color: tone.ink,
  },
  titleLatin: {
    fontFamily: face.serif,
    fontStyle: "italic",
    fontWeight: 400,
    fontSize: { default: 36, [bp.tablet]: 48, [bp.desktop]: "clamp(52px, 4.6vw, 68px)" },
    lineHeight: 1.04,
    letterSpacing: "-0.005em",
    color: tone.navy,
  },
});

export function PlateHead(props: { title: string; titleId: string; latin?: boolean }) {
  const p = merge({ latin: false }, props);
  const [ref, phase] = useEntry<HTMLDivElement>();
  return (
    <div ref={ref} {...stylex.attrs(ui.shell)}>
      <div {...stylex.attrs(ui.grid, styles.head)}>
        <h2
          id={p.titleId}
          lang={p.latin ? "en" : undefined}
          {...stylex.attrs(ui.q2to4, styles.title, p.latin && styles.titleLatin)}
        >
          <StrobeText phase={phase()}>{p.title}</StrobeText>
        </h2>
      </div>
    </div>
  );
}
