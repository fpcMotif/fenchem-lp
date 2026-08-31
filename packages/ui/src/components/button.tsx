import { Button as ButtonPrimitive } from "@base-ui/react/button";
import {
  buttonStyles,
  type ButtonSize,
  type ButtonVariant,
} from "@fenchem-lp/ui/lib/button-variants";
import * as stylex from "@stylexjs/stylex";
import type { StyleXStyles } from "@stylexjs/stylex";

export interface ButtonProps extends Omit<ButtonPrimitive.Props, "className"> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  sx?: StyleXStyles;
}

function Button({ variant = "default", size = "default", sx, ...props }: ButtonProps) {
  const variantKey = `variant_${variant}` as keyof typeof buttonStyles;
  const sizeKey = `size_${size.replace("-", "_")}` as keyof typeof buttonStyles;

  const styleProps = stylex.props(
    buttonStyles.base,
    buttonStyles[variantKey],
    buttonStyles[sizeKey],
    sx,
  );

  return <ButtonPrimitive data-slot="button" {...styleProps} {...props} />;
}

export { Button };
