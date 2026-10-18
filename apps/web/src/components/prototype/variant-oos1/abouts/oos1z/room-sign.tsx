import * as stylex from "@stylexjs/stylex";
import type { JSX } from "@solidjs/web";
import { children } from "solid-js";

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

export function RoomSign(props: {
  numeral: string;
  id: string;
  title: string;
  english: string;
  children?: JSX.Element;
}) {
  const note = children(() => props.children);
  return (
    <header {...stylex.attrs(styles.sign)}>
      <p lang="en" {...stylex.attrs(ui.caps, styles.gallery)}>
        <span aria-hidden="true" {...stylex.attrs(styles.rule)} />
        Gallery {props.numeral}
        <span aria-hidden="true" {...stylex.attrs(styles.rule)} />
      </p>
      <h2 id={props.id} {...stylex.attrs(styles.title)}>
        {props.title}
      </h2>
      <p lang="en" {...stylex.attrs(ui.italic, styles.english)}>
        {props.english}
      </p>
      {note() ? <div {...stylex.attrs(styles.note)}>{note()}</div> : null}
    </header>
  );
}
