import * as stylex from "@stylexjs/stylex";
import type { JSX } from "@solidjs/web";
import { children } from "solid-js";

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

export function RoomSign(props: { id: string; title: string; children?: JSX.Element }) {
  const note = children(() => props.children);
  return (
    <header {...stylex.attrs(styles.sign)}>
      <h2 id={props.id} {...stylex.attrs(styles.title)}>
        {props.title}
      </h2>
      {note() ? <div {...stylex.attrs(styles.note)}>{note()}</div> : null}
    </header>
  );
}
