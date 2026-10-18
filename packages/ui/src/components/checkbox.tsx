"use client";

import { Check as CheckIcon } from "@fenchem-lp/ui/components/lucide";
import { colors, radii } from "@fenchem-lp/ui/tokens.stylex";
import * as stylex from "@stylexjs/stylex";
import type { StyleXStyles } from "@stylexjs/stylex";
import type { ComponentProps } from "@solidjs/web";
import { createSignal, omit, Show } from "solid-js";

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

export interface CheckboxProps extends Omit<
  ComponentProps<"button">,
  "class" | "value" | "onChange" | "type"
> {
  checked?: boolean;
  defaultChecked?: boolean;
  onCheckedChange?: (checked: boolean, event: Event) => void;
  name?: string;
  value?: string;
  required?: boolean;
  readOnly?: boolean;
  sx?: StyleXStyles;
}

function Checkbox(props: CheckboxProps) {
  const rest = omit(
    props,
    "sx",
    "checked",
    "defaultChecked",
    "onCheckedChange",
    "name",
    "value",
    "required",
    "readOnly",
    "disabled",
    "onClick",
  );
  const [uncontrolled, setUncontrolled] = createSignal(props.defaultChecked ?? false);
  const checked = () => props.checked ?? uncontrolled();
  const isInvalid = () => {
    const ariaInvalid: unknown = props["aria-invalid"];
    return ariaInvalid === true || ariaInvalid === "true";
  };

  const toggle = (event: MouseEvent & { currentTarget: HTMLButtonElement; target: Element }) => {
    const onClick = props.onClick;
    if (typeof onClick === "function") onClick(event);
    if (event.defaultPrevented || props.disabled || props.readOnly) return;
    const next = !checked();
    if (props.checked === undefined) setUncontrolled(next);
    props.onCheckedChange?.(next, event);
  };

  return (
    <>
      <button
        type="button"
        role="checkbox"
        data-slot="checkbox"
        aria-checked={checked() ? "true" : "false"}
        aria-required={props.required ? "true" : undefined}
        aria-readonly={props.readOnly ? "true" : undefined}
        data-checked={checked() ? "" : undefined}
        data-unchecked={checked() ? undefined : ""}
        data-disabled={props.disabled ? "" : undefined}
        disabled={props.disabled}
        {...rest}
        {...stylex.attrs(
          checkboxStyles.root,
          checked() && checkboxStyles.checked,
          !!props.disabled && checkboxStyles.disabled,
          isInvalid() && checkboxStyles.invalid,
          props.sx,
        )}
        onClick={toggle}
      >
        <Show when={checked()}>
          <span data-slot="checkbox-indicator" {...stylex.attrs(checkboxStyles.indicator)}>
            <CheckIcon size={14} />
          </span>
        </Show>
      </button>
      <Show when={props.name}>
        <input
          type="checkbox"
          aria-hidden="true"
          tabindex={-1}
          hidden
          name={props.name}
          value={props.value ?? "on"}
          checked={checked()}
          required={props.required}
          disabled={props.disabled}
        />
      </Show>
    </>
  );
}

export { Checkbox };
