import { breakpoints } from "@fenchem-lp/ui/tokens.stylex";
import * as stylex from "@stylexjs/stylex";
import { size } from "./theme.stylex";

export const wipe = stylex.create({
  hidden: {
    clipPath: { default: null, [breakpoints.motionOk]: "inset(100% 0 0 0)" },
    transitionProperty: "clip-path",
    transitionDuration: "1300ms",
    transitionTimingFunction: size.ease,
  },
  shown: {
    clipPath: "inset(0 0 0 0)",
  },
  delay: (ms: number) => ({ transitionDelay: `${ms}ms` }),
});
