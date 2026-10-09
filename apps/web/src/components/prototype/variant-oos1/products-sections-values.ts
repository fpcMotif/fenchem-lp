import { breakpoints } from "@fenchem-lp/ui/tokens.stylex";
import * as stylex from "@stylexjs/stylex";

const TABLET = "@media (min-width: 768px) and (max-width: 1279.98px)";

const DESKTOP = breakpoints.xl;

const INSET = "min(120px, 8.333vw)";

export const layout = stylex.create({
  shell: {
    width: "100%",
    maxWidth: 1440,
    marginInline: "auto",
    boxSizing: "border-box",
  },
  inset: {
    paddingInline: { default: 16, [TABLET]: 40, [DESKTOP]: INSET },
  },
});
