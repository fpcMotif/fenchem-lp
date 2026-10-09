import { breakpoints } from "@fenchem-lp/ui/tokens.stylex";
import * as stylex from "@stylexjs/stylex";
import { ease, media, space } from "./palette.stylex";

export const styles = stylex.create({
  section: {
    position: "relative",
    paddingBlock: {
      default: space.sectionSm,
      [media.mdOnly]: space.sectionMd,
      [media.lgOnly]: space.sectionLg,
      [breakpoints.xl]: space.sectionXl,
    },
    scrollMarginTop: space.anchor,
  },
  shell: {
    width: "100%",
    maxWidth: space.shellMax,
    marginInline: "auto",
    boxSizing: "border-box",
    paddingInlineStart: {
      default: space.startSm,
      [media.mdOnly]: space.startMd,
      [media.lgOnly]: space.startLg,
      [breakpoints.xl]: space.startXl,
    },
    paddingInlineEnd: {
      default: space.endSm,
      [media.mdOnly]: space.endMd,
      [media.lgOnly]: space.endLg,
      [breakpoints.xl]: space.endXl,
    },
  },
  reveal: {
    opacity: { default: 1, [breakpoints.motionOk]: 0 },
    transform: { default: null, [breakpoints.motionOk]: "translateY(24px)" },
    transitionProperty: "opacity, transform",
    transitionDuration: "800ms",
    transitionTimingFunction: ease.out,
  },
  revealShown: {
    opacity: 1,
    transform: "none",
  },
  srOnly: {
    position: "absolute",
    width: 1,
    height: 1,
    margin: -1,
    padding: 0,
    overflow: "hidden",
    clipPath: "inset(50%)",
    whiteSpace: "nowrap",
    borderWidth: 0,
  },
  anchor: {
    display: "block",
    height: 0,
  },
});

export const srOnly = styles.srOnly;
