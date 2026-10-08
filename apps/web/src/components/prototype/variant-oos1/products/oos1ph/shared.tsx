import { colors } from "@fenchem-lp/ui/tokens.stylex";
import * as stylex from "@stylexjs/stylex";
import type { ComponentProps } from "react";

import { chrome, face, media, tone } from "./tokens.stylex";

export const ui = stylex.create({
  srOnly: {
    position: "absolute",
    width: 1,
    height: 1,
    padding: 0,
    margin: -1,
    overflow: "hidden",
    clip: "rect(0, 0, 0, 0)",
    whiteSpace: "nowrap",
    borderWidth: 0,
  },
  shell: {
    width: "100%",
    maxWidth: 1440,
    marginInline: "auto",
    boxSizing: "border-box",
    paddingInline: { default: 16, [media.tablet]: 40, [media.desktop]: chrome.inset },
  },
  section: {
    paddingTop: { default: 64, [media.desktop]: 96 },
    paddingBottom: { default: 72, [media.desktop]: 112 },
    scrollMarginTop: chrome.header,
    fontFamily: face.sans,
    color: tone.ink,
  },
  sectionTitle: {
    margin: 0,
    fontSize: { default: 26, [media.tablet]: 28, [media.desktop]: 32 },
    fontWeight: 400,
    lineHeight: { default: "34px", [media.tablet]: "36px", [media.desktop]: "40px" },
    letterSpacing: "0.04em",
    textWrap: "balance",
    color: tone.ink,
  },
});

const segment = stylex.create({
  track: {
    display: "inline-flex",
    gap: 2,
    padding: 3,
    borderRadius: 6,
    backgroundColor: tone.track,
  },
  trackStretch: {
    display: { default: "flex", [media.table]: "inline-flex" },
  },
  button: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    minHeight: 40,
    margin: 0,
    paddingBlock: 0,
    paddingInline: 16,
    borderWidth: 0,
    borderRadius: 4,
    backgroundColor: { default: "transparent", ":hover": "rgba(255, 255, 255, 0.5)" },
    fontFamily: "inherit",
    fontSize: 14,
    fontWeight: 500,
    lineHeight: "20px",
    letterSpacing: "0.04em",
    whiteSpace: "nowrap",
    color: { default: tone.body, ":hover": colors.brandBlue700 },
    cursor: "pointer",
    transform: {
      default: null,
      ":active": { default: null, [media.motionOk]: "scale(0.98)" },
    },
    transitionProperty: "color, background-color, box-shadow, transform",
    transitionDuration: "150ms",
    transitionTimingFunction: "ease",
    outlineStyle: { default: "none", ":focus-visible": "solid" },
    outlineWidth: 2,
    outlineColor: colors.brandBlue700,
    outlineOffset: 1,
  },
  selected: {
    backgroundColor: { default: tone.paper, ":hover": tone.paper },
    color: { default: tone.ink, ":hover": tone.ink },
    boxShadow: "0 1px 2px rgba(16, 56, 48, 0.12), 0 0 0 1px rgba(16, 56, 48, 0.05)",
    cursor: "default",
  },
  buttonStretch: {
    flexGrow: { default: 1, [media.table]: 0 },
    flexBasis: { default: 0, [media.table]: "auto" },
  },
});

type TrackProps = Omit<ComponentProps<"div">, "className" | "style"> & { stretch?: boolean };

export function SegmentTrack({ stretch = false, ...rest }: TrackProps) {
  return <div {...rest} {...stylex.props(segment.track, stretch && segment.trackStretch)} />;
}

type SegmentButtonProps = Omit<ComponentProps<"button">, "className" | "style" | "type"> & {
  selected: boolean;
  stretch?: boolean;
};

export function SegmentButton({ selected, stretch = false, ...rest }: SegmentButtonProps) {
  return (
    <button
      type="button"
      {...rest}
      {...stylex.props(
        segment.button,
        selected && segment.selected,
        stretch && segment.buttonStretch,
      )}
    />
  );
}
