import {
  buttonStyles,
  type ButtonSize,
  type ButtonVariant,
} from "@fenchem-lp/ui/lib/button-variants";
import * as stylex from "@stylexjs/stylex";
import type { StyleXStyles } from "@stylexjs/stylex";
import type { ComponentProps } from "@solidjs/web";
import { omit } from "solid-js";

export interface ButtonProps extends Omit<ComponentProps<"button">, "class"> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  sx?: StyleXStyles;
}

// The StyleX compiler cannot evaluate a computed style key; resolve it at runtime instead.
const sxProps = (...args: ReadonlyArray<StyleXStyles | undefined>) => stylex.attrs(...args);

function Button(props: ButtonProps) {
  const rest = omit(props, "variant", "size", "sx");
  const variantKey = () => `variant_${props.variant ?? "default"}` as keyof typeof buttonStyles;
  const sizeKey = () =>
    `size_${(props.size ?? "default").replace("-", "_")}` as keyof typeof buttonStyles;

  return (
    <button
      type="button"
      data-slot="button"
      {...sxProps(buttonStyles.base, buttonStyles[variantKey()], buttonStyles[sizeKey()], props.sx)}
      {...rest}
    />
  );
}

export { Button };
