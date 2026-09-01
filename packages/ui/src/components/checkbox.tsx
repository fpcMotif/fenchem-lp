"use client";

import { Checkbox as CheckboxPrimitive } from "@base-ui/react/checkbox";
import { colors, radii } from "@fenchem-lp/ui/tokens.stylex";
import * as stylex from "@stylexjs/stylex";
import type { StyleXStyles } from "@stylexjs/stylex";
import { CheckIcon } from "lucide-react";

export const checkboxStyles = stylex.create({
  root: {
    position: "relative",
    display: "flex",
    height: "1rem",
    width: "1rem",
    flexShrink: 0,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: radii.none,
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: colors.input,
    backgroundColor: "transparent",
    transitionProperty: "color, background-color, border-color",
    transitionDuration: "150ms",
    transitionTimingFunction: "ease",
    outline: "none",
    cursor: "pointer",
    ":focus-visible": {
      borderColor: colors.ring,
      boxShadow: "0 0 0 1px color-mix(in oklab, var(--ring) 50%, transparent)",
    },
  },
  checked: {
    borderColor: colors.primary,
    backgroundColor: colors.primary,
    color: colors.primaryForeground,
  },
  disabled: {
    cursor: "not-allowed",
    opacity: 0.5,
    pointerEvents: "none",
  },
  invalid: {
    borderColor: colors.destructive,
    boxShadow: "0 0 0 1px color-mix(in oklab, var(--destructive) 20%, transparent)",
  },
  indicator: {
    display: "grid",
    placeContent: "center",
    color: "currentColor",
    width: "0.875rem",
    height: "0.875rem",
  },
});

export interface CheckboxProps extends Omit<CheckboxPrimitive.Root.Props, "className"> {
  sx?: StyleXStyles;
}

function Checkbox({ sx, "aria-invalid": ariaInvalid, ...props }: CheckboxProps) {
  const isInvalid = ariaInvalid === true || ariaInvalid === "true";

  return (
    <CheckboxPrimitive.Root
      data-slot="checkbox"
      aria-invalid={ariaInvalid}
      render={(rootProps, state) => {
        const styleProps = stylex.props(
          checkboxStyles.root,
          state.checked && checkboxStyles.checked,
          state.disabled && checkboxStyles.disabled,
          isInvalid && checkboxStyles.invalid,
          sx,
        );

        return (
          <button type="button" {...rootProps} {...styleProps}>
            <CheckboxPrimitive.Indicator
              data-slot="checkbox-indicator"
              render={(indicatorProps) => {
                const indStyleProps = stylex.props(checkboxStyles.indicator);
                return (
                  <span {...indicatorProps} {...indStyleProps}>
                    <CheckIcon size={14} />
                  </span>
                );
              }}
            />
          </button>
        );
      }}
      {...props}
    />
  );
}

export { Checkbox };
