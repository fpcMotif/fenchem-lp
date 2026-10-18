import { colors, radii } from "@fenchem-lp/ui/tokens.stylex";
import * as stylex from "@stylexjs/stylex";
import type { StyleXStyles } from "@stylexjs/stylex";
import type { ComponentProps } from "@solidjs/web";
import { omit } from "solid-js";

const pulse = stylex.keyframes({
  "0%, 100%": { opacity: 1 },
  "50%": { opacity: 0.5 },
});

const skeletonStyles = stylex.create({
  base: {
    backgroundColor: colors.muted,
    borderRadius: radii.none,
    animationName: pulse,
    animationDuration: "2s",
    animationTimingFunction: "cubic-bezier(0.4, 0, 0.6, 1)",
    animationIterationCount: "infinite",
  },
});

export interface SkeletonProps extends Omit<ComponentProps<"div">, "class"> {
  sx?: StyleXStyles;
}

function Skeleton(props: SkeletonProps) {
  const rest = omit(props, "sx");

  return <div data-slot="skeleton" {...stylex.attrs(skeletonStyles.base, props.sx)} {...rest} />;
}

export { Skeleton };
