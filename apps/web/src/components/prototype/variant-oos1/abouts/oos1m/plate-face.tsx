import * as stylex from "@stylexjs/stylex";

import { face, tone } from "./tokens.stylex";

const HOLE_CORNERS = ["topLeft", "topRight", "bottomLeft", "bottomRight"] as const;

const styles = stylex.create({
  recess: {
    position: "absolute",
    inset: "11%",
    boxShadow: "inset 0 0 0 1px rgba(11, 42, 92, 0.2)",
  },
  hole: {
    position: "absolute",
    width: "5.5%",
    aspectRatio: "1",
    borderRadius: "50%",
    backgroundColor: tone.tint,
    boxShadow: "inset 0 0 0 1px rgba(11, 42, 92, 0.7)",
  },
  topLeft: { top: "3.6%", left: "3.6%" },
  topRight: { top: "3.6%", right: "3.6%" },
  bottomLeft: { bottom: "3.6%", left: "3.6%" },
  bottomRight: { bottom: "3.6%", right: "3.6%" },
  glyph: {
    position: "absolute",
    inset: 0,
    display: "grid",
    placeItems: "center",
    fontFamily: face.sans,
    fontWeight: 500,
    lineHeight: 1,
    color: tone.navy,
    userSelect: "none",
  },
  glyphSize: (size: string) => ({ fontSize: size }),
});

export function PlateFace(props: { glyph?: string; glyphSize?: string }) {
  return (
    <>
      <span {...stylex.attrs(styles.recess)} />
      {HOLE_CORNERS.map((corner) => (
        <span {...stylex.attrs(styles.hole, styles[corner])} />
      ))}
      {props.glyph && props.glyphSize ? (
        <span aria-hidden="true" {...stylex.attrs(styles.glyph, styles.glyphSize(props.glyphSize))}>
          {props.glyph}
        </span>
      ) : null}
    </>
  );
}
