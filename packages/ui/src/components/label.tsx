import * as stylex from "@stylexjs/stylex";
import type { StyleXStyles } from "@stylexjs/stylex";
import type { ComponentProps } from "@solidjs/web";
import { omit } from "solid-js";

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

export interface LabelProps extends Omit<ComponentProps<"label">, "class"> {
  sx?: StyleXStyles;
  disabled?: boolean;
}

function Label(props: LabelProps) {
  const rest = omit(props, "sx", "disabled");

  return (
    <label
      data-slot="label"
      {...stylex.attrs(labelStyles.base, props.disabled && labelStyles.disabled, props.sx)}
      {...rest}
    />
  );
}

export { Label };
