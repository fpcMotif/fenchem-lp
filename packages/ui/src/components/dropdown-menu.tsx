"use client";

import {
  Check as CheckIcon,
  ChevronRight as ChevronRightIcon,
} from "@fenchem-lp/ui/components/lucide";
import { colors, radii } from "@fenchem-lp/ui/tokens.stylex";
import * as stylex from "@stylexjs/stylex";
import type { StyleXStyles } from "@stylexjs/stylex";
import {
  Menu,
  MenuCheckboxItem,
  MenuContent,
  MenuGroup,
  MenuGroupLabel,
  MenuItem,
  MenuItemIndicator,
  MenuRadioGroup,
  MenuRadioItem,
  MenuSeparator,
  MenuShortcut,
  MenuSub,
  MenuSubContent,
  MenuSubTrigger,
  MenuTrigger,
} from "@ui-sdk/solid/menu";
import type { ComponentProps, JSX } from "@solidjs/web";
import { createContext, createUniqueId, omit, useContext } from "solid-js";

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

const menuStyles = stylex.create({
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

// The StyleX compiler cannot evaluate computed keys or state callbacks; resolve them at runtime.
const sxProps = (...args: ReadonlyArray<StyleXStyles | false | null | undefined>) =>
  stylex.attrs(...args);

export type DropdownMenuProps = ComponentProps<typeof Menu>;

function DropdownMenu(props: DropdownMenuProps) {
  return <Menu {...props} />;
}

export interface DropdownMenuPortalProps {
  children?: JSX.Element;
}

function DropdownMenuPortal(props: DropdownMenuPortalProps) {
  return <>{props.children}</>;
}

export interface DropdownMenuTriggerProps extends Omit<
  ComponentProps<typeof MenuTrigger>,
  "class" | "style"
> {
  sx?: StyleXStyles;
}

function DropdownMenuTrigger(props: DropdownMenuTriggerProps) {
  const rest = omit(props, "sx");
  return <MenuTrigger {...rest} {...stylex.attrs(props.sx)} />;
}

export interface DropdownMenuContentProps extends Omit<
  ComponentProps<typeof MenuContent>,
  "class" | "style"
> {
  sx?: StyleXStyles;
}

const SIDE_STYLES = {
  top: menuStyles.side_top,
  bottom: menuStyles.side_bottom,
  left: menuStyles.side_left,
  right: menuStyles.side_right,
  start: menuStyles.side_left,
  end: menuStyles.side_right,
} as const;

function DropdownMenuContent(props: DropdownMenuContentProps) {
  const rest = omit(props, "sx");
  return (
    <MenuContent
      {...rest}
      class={(state) => {
        const sideStyle = SIDE_STYLES[props.side ?? "bottom"] ?? menuStyles.open;
        return sxProps(menuStyles.content, sideStyle, !state.open && menuStyles.closed, props.sx)
          .class;
      }}
    />
  );
}

const InGroupContext = createContext(false);

export interface DropdownMenuGroupProps extends Omit<
  ComponentProps<typeof MenuGroup>,
  "class" | "style"
> {
  sx?: StyleXStyles;
}

function DropdownMenuGroup(props: DropdownMenuGroupProps) {
  const rest = omit(props, "sx");
  return (
    <InGroupContext value={true}>
      <MenuGroup {...rest} {...stylex.attrs(menuStyles.group, props.sx)} />
    </InGroupContext>
  );
}

export interface DropdownMenuLabelProps extends Omit<
  ComponentProps<typeof MenuGroupLabel>,
  "class" | "style" | "children" | "render"
> {
  inset?: boolean;
  children?: JSX.Element;
  sx?: StyleXStyles;
}

function DropdownMenuLabel(props: DropdownMenuLabelProps) {
  const rest = omit(props, "inset", "sx");
  const inGroup = useContext(InGroupContext);
  if (!inGroup) {
    return (
      <div
        data-slot="dropdown-menu-label"
        data-inset={props.inset ? "true" : undefined}
        {...rest}
        {...stylex.attrs(menuStyles.label, props.inset && menuStyles.label_inset, props.sx)}
      />
    );
  }
  return (
    <MenuGroupLabel
      data-inset={props.inset ? "true" : undefined}
      {...rest}
      {...stylex.attrs(menuStyles.label, props.inset && menuStyles.label_inset, props.sx)}
    />
  );
}

export interface DropdownMenuItemProps extends Omit<
  ComponentProps<typeof MenuItem>,
  "class" | "style"
> {
  inset?: boolean;
  variant?: "default" | "destructive";
  sx?: StyleXStyles;
}

function DropdownMenuItem(props: DropdownMenuItemProps) {
  const rest = omit(props, "inset", "variant", "sx");
  return (
    <MenuItem
      destructive={props.variant === "destructive"}
      data-inset={props.inset ? "true" : undefined}
      data-variant={props.variant ?? "default"}
      {...rest}
      class={(state) =>
        sxProps(
          menuStyles.item,
          props.variant === "destructive" && menuStyles.item_destructive,
          props.inset && menuStyles.item_inset,
          state.disabled && menuStyles.item_disabled,
          state.highlighted && menuStyles.item_highlighted,
          props.sx,
        ).class
      }
    />
  );
}

export type DropdownMenuSubProps = ComponentProps<typeof MenuSub>;

function DropdownMenuSub(props: DropdownMenuSubProps) {
  return <MenuSub {...props} />;
}

export interface DropdownMenuSubTriggerProps extends Omit<
  ComponentProps<typeof MenuSubTrigger>,
  "class" | "style"
> {
  inset?: boolean;
  sx?: StyleXStyles;
}

function DropdownMenuSubTrigger(props: DropdownMenuSubTriggerProps) {
  const rest = omit(props, "inset", "sx", "children");
  return (
    <MenuSubTrigger
      data-inset={props.inset ? "true" : undefined}
      {...rest}
      class={(state) =>
        sxProps(
          menuStyles.subTrigger,
          props.inset && menuStyles.item_inset,
          state.open && menuStyles.item_highlighted,
          props.sx,
        ).class
      }
    >
      {props.children}
      <ChevronRightIcon size={16} style={{ "margin-left": "auto" }} />
    </MenuSubTrigger>
  );
}

export type DropdownMenuSubContentProps = Omit<
  ComponentProps<typeof MenuSubContent>,
  "class" | "style"
> & {
  sx?: StyleXStyles;
};

function DropdownMenuSubContent(props: DropdownMenuSubContentProps) {
  const rest = omit(props, "sx");
  return (
    <MenuSubContent
      {...rest}
      class={(state) =>
        sxProps(
          menuStyles.content,
          menuStyles.subContent,
          !state.open && menuStyles.closed,
          props.sx,
        ).class
      }
    />
  );
}

export interface DropdownMenuCheckboxItemProps extends Omit<
  ComponentProps<typeof MenuCheckboxItem>,
  "class" | "style" | "value" | "onCheckedChange"
> {
  value?: string;
  inset?: boolean;
  onCheckedChange?: (checked: boolean, event?: Event) => void;
  sx?: StyleXStyles;
}

function DropdownMenuCheckboxItem(props: DropdownMenuCheckboxItemProps) {
  const rest = omit(props, "inset", "sx", "children", "value", "onCheckedChange");
  const fallbackId = createUniqueId();

  return (
    <MenuCheckboxItem
      value={props.value ?? fallbackId}
      data-inset={props.inset ? "true" : undefined}
      {...rest}
      onCheckedChange={(checked, details) => props.onCheckedChange?.(checked, details.event)}
      class={(state) =>
        sxProps(
          menuStyles.checkboxItem,
          props.inset && menuStyles.item_inset,
          state.disabled && menuStyles.item_disabled,
          state.highlighted && menuStyles.item_highlighted,
          props.sx,
        ).class
      }
    >
      {props.children}
      <MenuItemIndicator {...stylex.attrs(menuStyles.indicatorContainer)}>
        <CheckIcon size={16} />
      </MenuItemIndicator>
    </MenuCheckboxItem>
  );
}

export interface DropdownMenuRadioGroupProps extends Omit<
  ComponentProps<typeof MenuRadioGroup>,
  "class" | "style" | "name" | "onValueChange"
> {
  name?: string;
  onValueChange?: (value: string, event?: Event) => void;
  sx?: StyleXStyles;
}

function DropdownMenuRadioGroup(props: DropdownMenuRadioGroupProps) {
  const rest = omit(props, "sx", "name", "onValueChange");
  const fallbackName = createUniqueId();

  return (
    <InGroupContext value={true}>
      <MenuRadioGroup
        name={props.name ?? fallbackName}
        {...rest}
        onValueChange={(value, details) => props.onValueChange?.(value, details.event)}
        {...stylex.attrs(props.sx)}
      />
    </InGroupContext>
  );
}

export interface DropdownMenuRadioItemProps extends Omit<
  ComponentProps<typeof MenuRadioItem>,
  "class" | "style"
> {
  inset?: boolean;
  sx?: StyleXStyles;
}

function DropdownMenuRadioItem(props: DropdownMenuRadioItemProps) {
  const rest = omit(props, "inset", "sx", "children");
  return (
    <MenuRadioItem
      data-inset={props.inset ? "true" : undefined}
      {...rest}
      class={(state) =>
        sxProps(
          menuStyles.checkboxItem,
          props.inset && menuStyles.item_inset,
          state.disabled && menuStyles.item_disabled,
          state.highlighted && menuStyles.item_highlighted,
          props.sx,
        ).class
      }
    >
      {props.children}
      <MenuItemIndicator {...stylex.attrs(menuStyles.indicatorContainer)}>
        <CheckIcon size={16} />
      </MenuItemIndicator>
    </MenuRadioItem>
  );
}

export interface DropdownMenuSeparatorProps extends Omit<
  ComponentProps<typeof MenuSeparator>,
  "class" | "style"
> {
  sx?: StyleXStyles;
}

function DropdownMenuSeparator(props: DropdownMenuSeparatorProps) {
  const rest = omit(props, "sx");
  return <MenuSeparator {...rest} {...stylex.attrs(menuStyles.separator, props.sx)} />;
}

export interface DropdownMenuShortcutProps extends Omit<
  ComponentProps<typeof MenuShortcut>,
  "class" | "style"
> {
  sx?: StyleXStyles;
}

function DropdownMenuShortcut(props: DropdownMenuShortcutProps) {
  const rest = omit(props, "sx");
  return <MenuShortcut {...rest} {...stylex.attrs(menuStyles.shortcut, props.sx)} />;
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
