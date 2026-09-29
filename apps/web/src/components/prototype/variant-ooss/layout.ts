import * as stylex from "@stylexjs/stylex";

import { layout as layoutTokens, media } from "./tokens.stylex";

export const layout = stylex.create({
  shell: {
    width: "100%",
    maxWidth: layoutTokens.shellMax,
    marginInline: "auto",
    boxSizing: "border-box",
  },
  inset: {
    paddingInline: {
      default: layoutTokens.insetMobile,
      [media.tablet]: layoutTokens.insetTablet,
      [media.desktop]: layoutTokens.insetDesktop,
    },
  },
  grid12: {
    display: { default: "block", [media.tabletUp]: "grid" },
    gridTemplateColumns: "repeat(12, minmax(0, 1fr))",
    columnGap: layoutTokens.gutter,
  },
  section: {
    paddingBlock: {
      default: layoutTokens.sectionPadMobile,
      [media.tablet]: layoutTokens.sectionPadTablet,
      [media.desktop]: layoutTokens.sectionPadDesktop,
    },
  },
  visuallyHidden: {
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
});
