import * as stylex from "@stylexjs/stylex";
import type { ReactNode } from "react";

import type { Plate } from "./journey";
import { ui } from "./shared-values";
import { tone } from "./tokens.stylex";

const styles = stylex.create({
  plate: {
    position: "relative",
    display: "block",
    aspectRatio: "1440 / 820",
    containerType: "inline-size",
    backgroundColor: tone.page,
  },
  hairline: {
    position: "absolute",
    top: "1.2cqw",
    left: "3.2cqw",
    right: "3.2cqw",
    bottom: "4.6cqw",
    boxShadow: "0 0 0 1px rgba(11, 42, 92, 0.62)",
  },
  photo: {
    position: "absolute",
    top: "2.4cqw",
    left: "4.4cqw",
    right: "4.4cqw",
    bottom: "5.8cqw",
    overflow: "hidden",
    backgroundColor: tone.depth2,
  },
});

export function MiniPlate({
  plate,
  photoStyle,
  children,
}: {
  plate: Plate;
  photoStyle?: stylex.StyleXStyles;
  children?: ReactNode;
}) {
  return (
    <span {...stylex.props(styles.plate)}>
      <span {...stylex.props(styles.hairline)} />
      <span {...stylex.props(styles.photo)}>
        <img src={plate.src} alt="" decoding="async" {...stylex.props(ui.fill, photoStyle)} />
        {children}
      </span>
    </span>
  );
}
