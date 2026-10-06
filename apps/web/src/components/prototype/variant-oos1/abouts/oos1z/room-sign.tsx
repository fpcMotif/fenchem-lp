import * as stylex from "@stylexjs/stylex";
import type { ReactNode } from "react";

import { ui } from "./shared";
import { bp, face, tone } from "./tokens.stylex";

const styles = stylex.create({
  sign: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    textAlign: "center",
  },
  gallery: {
    margin: 0,
    display: "flex",
    alignItems: "center",
    gap: 12,
    color: tone.navy,
  },
  rule: {
    width: 28,
    height: 1,
    backgroundColor: tone.lineStrong,
  },
  title: {
    margin: 0,
    marginTop: { default: 18, [bp.desktop]: 22 },
    fontFamily: face.sans,
    fontWeight: 300,
    fontSize: { default: 36, [bp.tablet]: 46, [bp.desktop]: 56 },
    lineHeight: 1.2,
    letterSpacing: "0.04em",
    color: tone.navy,
    fontFeatureSettings: '"palt"',
  },
  english: {
    margin: 0,
    marginTop: 8,
    fontSize: { default: 20, [bp.desktop]: 25 },
    lineHeight: 1.3,
    color: tone.body,
  },
  note: {
    marginTop: { default: 22, [bp.desktop]: 28 },
    maxWidth: "34em",
  },
});

export function RoomSign({
  numeral,
  id,
  title,
  english,
  children,
}: {
  numeral: string;
  id: string;
  title: string;
  english: string;
  children?: ReactNode;
}) {
  return (
    <header {...stylex.props(styles.sign)}>
      <p lang="en" {...stylex.props(ui.caps, styles.gallery)}>
        <span aria-hidden="true" {...stylex.props(styles.rule)} />
        Gallery {numeral}
        <span aria-hidden="true" {...stylex.props(styles.rule)} />
      </p>
      <h2 id={id} {...stylex.props(styles.title)}>
        {title}
      </h2>
      <p lang="en" {...stylex.props(ui.italic, styles.english)}>
        {english}
      </p>
      {children ? <div {...stylex.props(styles.note)}>{children}</div> : null}
    </header>
  );
}
