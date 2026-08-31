import { colors, radii } from "@fenchem-lp/ui/tokens.stylex";
import * as stylex from "@stylexjs/stylex";
import type { StyleXStyles } from "@stylexjs/stylex";
import * as React from "react";

const pulse = stylex.keyframes({
  "0%, 100%": { opacity: 1 },
  "50%": { opacity: 0.5 },
});

export const skeletonStyles = stylex.create({
  base: {
    backgroundColor: colors.muted,
    borderRadius: radii.none,
    animationName: pulse,
    animationDuration: "2s",
    animationTimingFunction: "cubic-bezier(0.4, 0, 0.6, 1)",
    animationIterationCount: "infinite",
  },
});

export interface SkeletonProps extends Omit<React.ComponentProps<"div">, "className"> {
  sx?: StyleXStyles;
}

function Skeleton({ sx, ...props }: SkeletonProps) {
  const styleProps = stylex.props(skeletonStyles.base, sx);

  return <div data-slot="skeleton" {...styleProps} {...props} />;
}

export { Skeleton };
