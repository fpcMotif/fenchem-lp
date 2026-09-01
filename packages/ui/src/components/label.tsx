import * as stylex from "@stylexjs/stylex";
import type { StyleXStyles } from "@stylexjs/stylex";
import * as React from "react";

const labelStyles = stylex.create({
  base: {
    display: "flex",
    alignItems: "center",
    gap: "0.5rem",
    fontSize: "0.75rem",
    lineHeight: 1,
    userSelect: "none",
    fontWeight: 500,
  },
  disabled: {
    pointerEvents: "none",
    opacity: 0.5,
    cursor: "not-allowed",
  },
});

export interface LabelProps extends Omit<React.ComponentProps<"label">, "className"> {
  sx?: StyleXStyles;
  disabled?: boolean;
}

function Label({ sx, disabled, htmlFor, ...props }: LabelProps) {
  const styleProps = stylex.props(labelStyles.base, disabled && labelStyles.disabled, sx);

  return <label data-slot="label" htmlFor={htmlFor} {...styleProps} {...props} />;
}

export { Label, labelStyles };
