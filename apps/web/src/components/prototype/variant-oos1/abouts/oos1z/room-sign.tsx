import * as stylex from "@stylexjs/stylex";
import type { ReactNode } from "react";

import { bp, face, tone } from "./tokens.stylex";

const styles = stylex.create({
  sign: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    textAlign: "center",
  },
  title: {
    margin: 0,
    fontFamily: face.sans,
    fontWeight: 300,
    fontSize: { default: 36, [bp.tablet]: 46, [bp.desktop]: 56 },
    lineHeight: 1.2,
    letterSpacing: "0.04em",
    color: tone.navy,
    fontFeatureSettings: '"palt"',
  },
  note: {
    marginTop: { default: 22, [bp.desktop]: 28 },
    maxWidth: "34em",
  },
});

export function RoomSign({
  id,
  title,
  children,
}: {
  id: string;
  title: string;
  children?: ReactNode;
}) {
  return (
    <header {...stylex.props(styles.sign)}>
      <h2 id={id} {...stylex.props(styles.title)}>
        {title}
      </h2>
      {children ? <div {...stylex.props(styles.note)}>{children}</div> : null}
    </header>
  );
}
