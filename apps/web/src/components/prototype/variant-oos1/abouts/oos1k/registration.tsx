import * as stylex from "@stylexjs/stylex";

import { sky } from "./tokens.stylex";

const styles = stylex.create({
  mark: {
    position: "absolute",
    pointerEvents: "none",
    borderColor: sky.tint,
    borderStyle: "solid",
    borderWidth: 0,
    opacity: 0.72,
  },
  large: { width: 22, height: 22 },
  small: { width: 10, height: 10 },
  topLargeStart: { top: -14, left: -14, borderTopWidth: 1, borderLeftWidth: 1 },
  topLargeEnd: { top: -14, right: -14, borderTopWidth: 1, borderRightWidth: 1 },
  bottomLargeStart: { bottom: -14, left: -14, borderBottomWidth: 1, borderLeftWidth: 1 },
  bottomLargeEnd: { bottom: -14, right: -14, borderBottomWidth: 1, borderRightWidth: 1 },
  topSmallStart: { top: -5, left: -5, borderTopWidth: 1, borderLeftWidth: 1 },
  topSmallEnd: { top: -5, right: -5, borderTopWidth: 1, borderRightWidth: 1 },
  bottomSmallStart: { bottom: -5, left: -5, borderBottomWidth: 1, borderLeftWidth: 1 },
  bottomSmallEnd: { bottom: -5, right: -5, borderBottomWidth: 1, borderRightWidth: 1 },
});

const CORNERS = {
  large: [styles.topLargeStart, styles.topLargeEnd, styles.bottomLargeStart, styles.bottomLargeEnd],
  small: [styles.topSmallStart, styles.topSmallEnd, styles.bottomSmallStart, styles.bottomSmallEnd],
} as const;

export function Registration(props: { size: "large" | "small" }) {
  return (
    <>
      {CORNERS[props.size].map((corner) => (
        <span
          aria-hidden="true"
          {...stylex.attrs(
            styles.mark,
            props.size === "large" ? styles.large : styles.small,
            corner,
          )}
        />
      ))}
    </>
  );
}
