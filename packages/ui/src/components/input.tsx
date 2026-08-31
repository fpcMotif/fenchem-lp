import { Input as InputPrimitive } from "@base-ui/react/input";
import { colors, radii } from "@fenchem-lp/ui/tokens.stylex";
import * as stylex from "@stylexjs/stylex";
import type { StyleXStyles } from "@stylexjs/stylex";
import * as React from "react";

const inputStyles = stylex.create({
  base: {
    height: "2rem",
    width: "100%",
    minWidth: 0,
    borderRadius: radii.none,
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: colors.input,
    backgroundColor: "transparent",
    paddingInline: "0.625rem",
    paddingBlock: "0.25rem",
    fontSize: "0.75rem",
    lineHeight: "1rem",
    color: colors.foreground,
    transitionProperty: "color, background-color, border-color, box-shadow",
    transitionDuration: "150ms",
    transitionTimingFunction: "ease",
    outline: "none",
    "::placeholder": {
      color: colors.mutedForeground,
    },
    ":focus-visible": {
      borderColor: colors.ring,
      boxShadow: "0 0 0 1px color-mix(in oklab, var(--ring) 50%, transparent)",
    },
    ":disabled": {
      pointerEvents: "none",
      cursor: "not-allowed",
      backgroundColor: "color-mix(in oklab, var(--input) 50%, transparent)",
      opacity: 0.5,
    },
    // File inputs
    "::file-selector-button": {
      display: "inline-flex",
      height: "1.5rem",
      borderWidth: 0,
      backgroundColor: "transparent",
      fontSize: "0.75rem",
      fontWeight: 500,
      color: colors.foreground,
      cursor: "pointer",
    },
  },
  invalid: {
    borderColor: colors.destructive,
    boxShadow: "0 0 0 1px color-mix(in oklab, var(--destructive) 20%, transparent)",
  },
});

export interface InputProps extends Omit<React.ComponentProps<"input">, "className"> {
  sx?: StyleXStyles;
}

function Input({ sx, type, "aria-invalid": ariaInvalid, ...props }: InputProps) {
  const isInvalid = ariaInvalid === true || ariaInvalid === "true";
  const styleProps = stylex.props(inputStyles.base, isInvalid && inputStyles.invalid, sx);

  return (
    <InputPrimitive
      type={type}
      data-slot="input"
      aria-invalid={ariaInvalid}
      {...styleProps}
      {...props}
    />
  );
}

export { Input, inputStyles };
