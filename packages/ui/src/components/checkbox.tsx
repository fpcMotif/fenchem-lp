"use client";

import { Check as CheckIcon } from "@fenchem-lp/ui/components/lucide";
import { colors, radii } from "@fenchem-lp/ui/tokens.stylex";
import * as stylex from "@stylexjs/stylex";
import type { StyleXStyles } from "@stylexjs/stylex";
import {
  Checkbox as UiCheckbox,
  CheckboxIndicator as UiCheckboxIndicator,
  type CheckboxCheckedChangeReason,
} from "@ui-sdk/solid/checkbox";
import type { ChangeDetails } from "@ui-sdk/core";
import type { ComponentProps } from "@solidjs/web";
import { omit } from "solid-js";

const checkboxStyles = stylex.create({
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

const sxProps = (...args: ReadonlyArray<StyleXStyles | false | null | undefined>) =>
  stylex.attrs(...args);

type UiCheckboxProps = ComponentProps<typeof UiCheckbox>;

export interface CheckboxProps extends Omit<
  UiCheckboxProps,
  "class" | "style" | "onCheckedChange"
> {
  onCheckedChange?: (checked: boolean, details: ChangeDetails<CheckboxCheckedChangeReason>) => void;
  sx?: StyleXStyles;
}

function Checkbox(props: CheckboxProps) {
  const rest = omit(props, "sx", "onCheckedChange", "children");
  const isInvalid = () => {
    const ariaInvalid: unknown = props["aria-invalid"];
    return ariaInvalid === true || ariaInvalid === "true";
  };

  return (
    <UiCheckbox
      {...rest}
      onCheckedChange={(checked, details) => {
        props.onCheckedChange?.(checked === true, details);
      }}
      class={(state) =>
        sxProps(
          checkboxStyles.root,
          state.checked && checkboxStyles.checked,
          state.disabled && checkboxStyles.disabled,
          isInvalid() && checkboxStyles.invalid,
          props.sx,
        ).class
      }
      style={() => sxProps(props.sx).style as Record<string, string | number> | undefined}
    >
      <UiCheckboxIndicator {...stylex.attrs(checkboxStyles.indicator)}>
        <CheckIcon size={14} />
      </UiCheckboxIndicator>
    </UiCheckbox>
  );
}

export { Checkbox };
