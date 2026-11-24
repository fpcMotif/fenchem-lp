import {
  buttonStyles,
  type ButtonSize,
  type ButtonVariant,
} from "@fenchem-lp/ui/lib/button-variants";
import * as stylex from "@stylexjs/stylex";
import type { StyleXStyles } from "@stylexjs/stylex";
import { Button as UiButton } from "@ui-sdk/solid/button";
import type { ComponentProps } from "@solidjs/web";
import { omit } from "solid-js";

type UiButtonProps = ComponentProps<typeof UiButton>;

export interface ButtonProps extends Omit<UiButtonProps, "style" | "render"> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  sx?: StyleXStyles;
  render?: UiButtonProps["render"];
}

// The StyleX compiler cannot evaluate a computed style key; resolve it at runtime instead.
const sxProps = (...args: ReadonlyArray<StyleXStyles | undefined>) => stylex.attrs(...args);

function Button(props: ButtonProps) {
  const rest = omit(props, "variant", "size", "sx", "type", "class");
  const attrs = () => {
    const variantKey = `variant_${props.variant ?? "default"}` as keyof typeof buttonStyles;
    const sizeKey =
      `size_${(props.size ?? "default").replace("-", "_")}` as keyof typeof buttonStyles;
    return sxProps(buttonStyles.base, buttonStyles[variantKey], buttonStyles[sizeKey], props.sx);
  };

  return (
    <UiButton
      type={props.type ?? "button"}
      {...rest}
      class={(state) => [
        attrs().class,
        typeof props.class === "function" ? props.class(state) : props.class,
      ]}
      style={attrs().style as UiButtonProps["style"]}
    />
  );
}

export { Button };
