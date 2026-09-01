"use client";

import { Menu as MenuPrimitive } from "@base-ui/react/menu";
import { colors, radii } from "@fenchem-lp/ui/tokens.stylex";
import * as stylex from "@stylexjs/stylex";
import type { StyleXStyles } from "@stylexjs/stylex";
import { CheckIcon, ChevronRightIcon } from "lucide-react";
import * as React from "react";

const fadeIn = stylex.keyframes({
  "0%": { opacity: 0 },
  "100%": { opacity: 1 },
});

const fadeOut = stylex.keyframes({
  "0%": { opacity: 1 },
  "100%": { opacity: 0 },
});

const zoomIn = stylex.keyframes({
  "0%": { transform: "scale(0.95)" },
  "100%": { transform: "scale(1)" },
});

const zoomOut = stylex.keyframes({
  "0%": { transform: "scale(1)" },
  "100%": { transform: "scale(0.95)" },
});

const slideInFromTop = stylex.keyframes({
  "0%": { transform: "translateY(-0.5rem)" },
  "100%": { transform: "translateY(0)" },
});

const slideInFromBottom = stylex.keyframes({
  "0%": { transform: "translateY(0.5rem)" },
  "100%": { transform: "translateY(0)" },
});

const slideInFromLeft = stylex.keyframes({
  "0%": { transform: "translateX(-0.5rem)" },
  "100%": { transform: "translateX(0)" },
});

const slideInFromRight = stylex.keyframes({
  "0%": { transform: "translateX(0.5rem)" },
  "100%": { transform: "translateX(0)" },
});

export const menuStyles = stylex.create({
  positioner: {
    zIndex: 50,
    outline: "none",
  },
  content: {
    zIndex: 50,
    maxHeight: "var(--available-height)",
    width: "var(--anchor-width)",
    minWidth: "8rem",
    transformOrigin: "var(--transform-origin)",
    overflowX: "hidden",
    overflowY: "auto",
    borderRadius: radii.none,
    backgroundColor: colors.popover,
    color: colors.popoverForeground,
    boxShadow:
      "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1), 0 0 0 1px color-mix(in oklab, var(--foreground) 10%, transparent)",
    outline: "none",
    padding: "0.25rem",
    animationDuration: "100ms",
    animationTimingFunction: "ease-out",
  },
  subContent: {
    minWidth: "6rem",
    width: "auto",
  },
  open: {
    animationName: `${fadeIn}, ${zoomIn}`,
  },
  closed: {
    animationName: `${fadeOut}, ${zoomOut}`,
    overflow: "hidden",
  },
  side_top: {
    animationName: `${fadeIn}, ${zoomIn}, ${slideInFromBottom}`,
  },
  side_bottom: {
    animationName: `${fadeIn}, ${zoomIn}, ${slideInFromTop}`,
  },
  side_left: {
    animationName: `${fadeIn}, ${zoomIn}, ${slideInFromRight}`,
  },
  side_right: {
    animationName: `${fadeIn}, ${zoomIn}, ${slideInFromLeft}`,
  },
  group: {
    padding: 0,
  },
  label: {
    paddingInline: "0.5rem",
    paddingBlock: "0.5rem",
    fontSize: "0.75rem",
    color: colors.mutedForeground,
  },
  label_inset: {
    paddingLeft: "1.75rem",
  },
  item: {
    position: "relative",
    display: "flex",
    cursor: "default",
    alignItems: "center",
    gap: "0.5rem",
    borderRadius: radii.none,
    paddingInline: "0.5rem",
    paddingBlock: "0.5rem",
    fontSize: "0.75rem",
    outline: "none",
    userSelect: "none",
    color: colors.popoverForeground,
    ":hover": {
      backgroundColor: colors.accent,
      color: colors.accentForeground,
    },
    ":focus": {
      backgroundColor: colors.accent,
      color: colors.accentForeground,
    },
  },
  item_highlighted: {
    backgroundColor: colors.accent,
    color: colors.accentForeground,
  },
  item_disabled: {
    pointerEvents: "none",
    opacity: 0.5,
  },
  item_destructive: {
    color: colors.destructive,
    ":hover": {
      backgroundColor: "color-mix(in oklab, var(--destructive) 10%, transparent)",
      color: colors.destructive,
    },
    ":focus": {
      backgroundColor: "color-mix(in oklab, var(--destructive) 10%, transparent)",
      color: colors.destructive,
    },
  },
  item_inset: {
    paddingLeft: "1.75rem",
  },
  subTrigger: {
    position: "relative",
    display: "flex",
    cursor: "default",
    alignItems: "center",
    gap: "0.5rem",
    borderRadius: radii.none,
    paddingInline: "0.5rem",
    paddingBlock: "0.5rem",
    fontSize: "0.75rem",
    outline: "none",
    userSelect: "none",
    color: colors.popoverForeground,
    ":hover": {
      backgroundColor: colors.accent,
      color: colors.accentForeground,
    },
    ":focus": {
      backgroundColor: colors.accent,
      color: colors.accentForeground,
    },
  },
  checkboxItem: {
    position: "relative",
    display: "flex",
    cursor: "default",
    alignItems: "center",
    gap: "0.5rem",
    borderRadius: radii.none,
    paddingBlock: "0.5rem",
    paddingLeft: "0.5rem",
    paddingRight: "2rem",
    fontSize: "0.75rem",
    outline: "none",
    userSelect: "none",
    ":hover": {
      backgroundColor: colors.accent,
      color: colors.accentForeground,
    },
    ":focus": {
      backgroundColor: colors.accent,
      color: colors.accentForeground,
    },
  },
  indicatorContainer: {
    position: "absolute",
    right: "0.5rem",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    pointerEvents: "none",
  },
  separator: {
    marginInline: "-0.25rem",
    height: 1,
    backgroundColor: colors.border,
  },
  shortcut: {
    marginLeft: "auto",
    fontSize: "0.75rem",
    letterSpacing: "0.1em",
    color: colors.mutedForeground,
  },
});

export interface DropdownMenuProps extends MenuPrimitive.Root.Props {
  sx?: StyleXStyles;
}

function DropdownMenu({ _sx, ...props }: DropdownMenuProps & { _sx?: StyleXStyles }) {
  return <MenuPrimitive.Root data-slot="dropdown-menu" {...props} />;
}

export interface DropdownMenuPortalProps extends MenuPrimitive.Portal.Props {
  sx?: StyleXStyles;
}

function DropdownMenuPortal({ _sx, ...props }: DropdownMenuPortalProps & { _sx?: StyleXStyles }) {
  return <MenuPrimitive.Portal data-slot="dropdown-menu-portal" {...props} />;
}

export interface DropdownMenuTriggerProps extends MenuPrimitive.Trigger.Props {
  sx?: StyleXStyles;
}

function DropdownMenuTrigger({ _sx, ...props }: DropdownMenuTriggerProps & { _sx?: StyleXStyles }) {
  return <MenuPrimitive.Trigger data-slot="dropdown-menu-trigger" {...props} />;
}

export interface DropdownMenuContentProps
  extends
    Omit<MenuPrimitive.Popup.Props, "className">,
    Pick<MenuPrimitive.Positioner.Props, "align" | "alignOffset" | "side" | "sideOffset"> {
  sx?: StyleXStyles;
}

function DropdownMenuContent({
  align = "start",
  alignOffset = 0,
  side = "bottom",
  sideOffset = 4,
  sx,
  ...props
}: DropdownMenuContentProps) {
  return (
    <MenuPrimitive.Portal>
      <MenuPrimitive.Positioner
        {...stylex.props(menuStyles.positioner)}
        align={align}
        alignOffset={alignOffset}
        side={side}
        sideOffset={sideOffset}
      >
        <MenuPrimitive.Popup
          data-slot="dropdown-menu-content"
          render={(popupProps, state) => {
            const sideKey = `side_${state.side}` as keyof typeof menuStyles;
            const styleProps = stylex.props(
              menuStyles.content,
              state.open ? menuStyles[sideKey] || menuStyles.open : menuStyles.closed,
              sx,
            );
            return <div {...popupProps} {...styleProps} />;
          }}
          {...props}
        />
      </MenuPrimitive.Positioner>
    </MenuPrimitive.Portal>
  );
}

export interface DropdownMenuGroupProps extends MenuPrimitive.Group.Props {
  sx?: StyleXStyles;
}

function DropdownMenuGroup({ _sx, ...props }: DropdownMenuGroupProps & { _sx?: StyleXStyles }) {
  return <MenuPrimitive.Group data-slot="dropdown-menu-group" {...props} />;
}

export interface DropdownMenuLabelProps extends Omit<MenuPrimitive.GroupLabel.Props, "className"> {
  inset?: boolean;
  sx?: StyleXStyles;
}

function DropdownMenuLabel({ inset, sx, ...props }: DropdownMenuLabelProps) {
  const styleProps = stylex.props(menuStyles.label, inset && menuStyles.label_inset, sx);

  return (
    <MenuPrimitive.GroupLabel
      data-slot="dropdown-menu-label"
      data-inset={inset}
      {...styleProps}
      {...props}
    />
  );
}

export interface DropdownMenuItemProps extends Omit<MenuPrimitive.Item.Props, "className"> {
  inset?: boolean;
  variant?: "default" | "destructive";
  sx?: StyleXStyles;
}

function DropdownMenuItem({ inset, variant = "default", sx, ...props }: DropdownMenuItemProps) {
  return (
    <MenuPrimitive.Item
      data-slot="dropdown-menu-item"
      data-inset={inset}
      data-variant={variant}
      render={(itemProps, state) => {
        const styleProps = stylex.props(
          menuStyles.item,
          variant === "destructive" && menuStyles.item_destructive,
          inset && menuStyles.item_inset,
          state.disabled && menuStyles.item_disabled,
          state.highlighted && menuStyles.item_highlighted,
          sx,
        );
        return <div {...itemProps} {...styleProps} />;
      }}
      {...props}
    />
  );
}

export interface DropdownMenuSubProps extends MenuPrimitive.SubmenuRoot.Props {
  sx?: StyleXStyles;
}

function DropdownMenuSub({ _sx, ...props }: DropdownMenuSubProps & { _sx?: StyleXStyles }) {
  return <MenuPrimitive.SubmenuRoot data-slot="dropdown-menu-sub" {...props} />;
}

export interface DropdownMenuSubTriggerProps extends Omit<
  MenuPrimitive.SubmenuTrigger.Props,
  "className"
> {
  inset?: boolean;
  sx?: StyleXStyles;
}

function DropdownMenuSubTrigger({ inset, sx, children, ...props }: DropdownMenuSubTriggerProps) {
  return (
    <MenuPrimitive.SubmenuTrigger
      data-slot="dropdown-menu-sub-trigger"
      data-inset={inset}
      render={(triggerProps, state) => {
        const styleProps = stylex.props(
          menuStyles.subTrigger,
          inset && menuStyles.item_inset,
          state.highlighted && menuStyles.item_highlighted,
          sx,
        );
        return (
          <div {...triggerProps} {...styleProps}>
            {children}
            <ChevronRightIcon size={16} style={{ marginLeft: "auto" }} />
          </div>
        );
      }}
      {...props}
    />
  );
}

export interface DropdownMenuSubContentProps extends DropdownMenuContentProps {}

function DropdownMenuSubContent({
  align = "start",
  alignOffset = -3,
  side = "right",
  sideOffset = 0,
  sx,
  ...props
}: DropdownMenuSubContentProps) {
  return (
    <DropdownMenuContent
      data-slot="dropdown-menu-sub-content"
      align={align}
      alignOffset={alignOffset}
      side={side}
      sideOffset={sideOffset}
      sx={sx}
      {...props}
    />
  );
}

export interface DropdownMenuCheckboxItemProps extends Omit<
  MenuPrimitive.CheckboxItem.Props,
  "className"
> {
  inset?: boolean;
  sx?: StyleXStyles;
}

function DropdownMenuCheckboxItem({
  inset,
  sx,
  children,
  checked,
  ...props
}: DropdownMenuCheckboxItemProps) {
  return (
    <MenuPrimitive.CheckboxItem
      data-slot="dropdown-menu-checkbox-item"
      data-inset={inset}
      checked={checked}
      render={(itemProps, state) => {
        const styleProps = stylex.props(
          menuStyles.checkboxItem,
          inset && menuStyles.item_inset,
          state.disabled && menuStyles.item_disabled,
          state.highlighted && menuStyles.item_highlighted,
          sx,
        );
        return (
          <div {...itemProps} {...styleProps}>
            {children}
            <span
              {...stylex.props(menuStyles.indicatorContainer)}
              data-slot="dropdown-menu-checkbox-item-indicator"
            >
              <MenuPrimitive.CheckboxItemIndicator>
                <CheckIcon size={16} />
              </MenuPrimitive.CheckboxItemIndicator>
            </span>
          </div>
        );
      }}
      {...props}
    />
  );
}

export interface DropdownMenuRadioGroupProps extends MenuPrimitive.RadioGroup.Props {
  sx?: StyleXStyles;
}

function DropdownMenuRadioGroup({
  _sx,
  ...props
}: DropdownMenuRadioGroupProps & { _sx?: StyleXStyles }) {
  return <MenuPrimitive.RadioGroup data-slot="dropdown-menu-radio-group" {...props} />;
}

export interface DropdownMenuRadioItemProps extends Omit<
  MenuPrimitive.RadioItem.Props,
  "className"
> {
  inset?: boolean;
  sx?: StyleXStyles;
}

function DropdownMenuRadioItem({ inset, sx, children, ...props }: DropdownMenuRadioItemProps) {
  return (
    <MenuPrimitive.RadioItem
      data-slot="dropdown-menu-radio-item"
      data-inset={inset}
      render={(itemProps, state) => {
        const styleProps = stylex.props(
          menuStyles.checkboxItem,
          inset && menuStyles.item_inset,
          state.disabled && menuStyles.item_disabled,
          state.highlighted && menuStyles.item_highlighted,
          sx,
        );
        return (
          <div {...itemProps} {...styleProps}>
            {children}
            <span
              {...stylex.props(menuStyles.indicatorContainer)}
              data-slot="dropdown-menu-radio-item-indicator"
            >
              <MenuPrimitive.RadioItemIndicator>
                <CheckIcon size={16} />
              </MenuPrimitive.RadioItemIndicator>
            </span>
          </div>
        );
      }}
      {...props}
    />
  );
}
export interface DropdownMenuSeparatorProps extends Omit<
  MenuPrimitive.Separator.Props,
  "className"
> {
  sx?: StyleXStyles;
}

function DropdownMenuSeparator({ sx, ...props }: DropdownMenuSeparatorProps) {
  const styleProps = stylex.props(menuStyles.separator, sx);

  return <MenuPrimitive.Separator data-slot="dropdown-menu-separator" {...styleProps} {...props} />;
}

export interface DropdownMenuShortcutProps extends Omit<React.ComponentProps<"span">, "className"> {
  sx?: StyleXStyles;
}

function DropdownMenuShortcut({ sx, ...props }: DropdownMenuShortcutProps) {
  const styleProps = stylex.props(menuStyles.shortcut, sx);

  return <span data-slot="dropdown-menu-shortcut" {...styleProps} {...props} />;
}

export {
  DropdownMenu,
  DropdownMenuPortal,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuItem,
  DropdownMenuCheckboxItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent,
};
