import * as stylex from "@stylexjs/stylex";
import type { StyleXStyles } from "@stylexjs/stylex";

import { bp, face, tone } from "./tokens.stylex";

const styles = stylex.create({
  head: {
    display: "flex",
    flexDirection: "column",
    gap: { default: 10, [bp.desktop]: 14 },
  },
  display: {
    margin: 0,
    fontFamily: face.sans,
    fontWeight: 400,
    fontSize: { default: 40, [bp.tablet]: 52, [bp.laptop]: 60, [bp.wide]: 72 },
    lineHeight: 1.12,
    letterSpacing: "0.04em",
    color: tone.ink,
    fontFeatureSettings: '"palt"',
  },
  quiet: {
    margin: 0,
    fontFamily: face.sans,
    fontWeight: 500,
    fontSize: { default: 24, [bp.desktop]: 28 },
    lineHeight: 1.3,
    letterSpacing: "0.06em",
    color: tone.navy,
  },
});

export function SectionHead({
  id,
  title,
  quiet = false,
  sx,
}: {
  id: string;
  title: string;
  quiet?: boolean;
  sx?: StyleXStyles;
}) {
  return (
    <div {...stylex.props(styles.head, sx)}>
      <h2 id={id} {...stylex.props(quiet ? styles.quiet : styles.display)}>
        {title}
      </h2>
    </div>
  );
}
