"use client";

import {
  Check as CheckIcon,
  ChevronRight as ChevronRightIcon,
} from "@fenchem-lp/ui/components/lucide";
import { colors, radii } from "@fenchem-lp/ui/tokens.stylex";
import * as stylex from "@stylexjs/stylex";
import type { StyleXStyles } from "@stylexjs/stylex";
import { Portal, type ComponentProps, type JSX } from "@solidjs/web";
import {
  children as resolveChildren,
  createContext,
  createEffect,
  createSignal,
  createUniqueId,
  flush,
  omit,
  onSettled,
  Show,
  untrack,
  useContext,
  type Accessor,
} from "solid-js";

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

type Side = "top" | "bottom" | "left" | "right";
type Align = "start" | "center" | "end";
type OpenChangeDetails = { event?: Event; reason: string };

type MenuContextValue = {
  rootId: string;
  popupId: string;
  parent: MenuContextValue | null;
  open: Accessor<boolean>;
  setOpen: (open: boolean, details: OpenChangeDetails) => void;
  trigger: Accessor<HTMLElement | undefined>;
  setTrigger: (el: HTMLElement | undefined) => void;
  focusFirstOnOpen: { current: boolean };
  subMenus: Set<MenuContextValue>;
};

const MenuContext = createContext<MenuContextValue | null>(null);

function useMenu(part: string) {
  const menu = useContext(MenuContext);
  if (!menu) throw new Error(`${part} must be used within <DropdownMenu>`);
  return menu;
}

function rootOf(menu: MenuContextValue) {
  let current = menu;
  while (current.parent) current = current.parent;
  return current;
}

function closeTree(menu: MenuContextValue, details: OpenChangeDetails, refocus: boolean) {
  const root = rootOf(menu);
  root.setOpen(false, details);
  if (refocus) {
    flush();
    root.trigger()?.focus();
  }
}

function closeSubMenus(menu: MenuContextValue, except?: MenuContextValue) {
  for (const sub of menu.subMenus) {
    if (sub !== except && sub.open()) sub.setOpen(false, { reason: "sibling-open" });
  }
}

const ITEM_SELECTOR = '[role="menuitem"],[role="menuitemcheckbox"],[role="menuitemradio"]';

function menuItems(popup: HTMLElement) {
  return Array.from(popup.querySelectorAll<HTMLElement>(ITEM_SELECTOR)).filter(
    (item) => item.getAttribute("aria-disabled") !== "true",
  );
}

function createMenuState(
  props: {
    open?: boolean;
    defaultOpen?: boolean;
    onOpenChange?: (open: boolean, details: OpenChangeDetails) => void;
  },
  parent: MenuContextValue | null,
): MenuContextValue {
  const [uncontrolled, setUncontrolled] = createSignal(props.defaultOpen ?? false);
  const [trigger, setTrigger] = createSignal<HTMLElement>();
  const open = () => (props.open !== undefined ? props.open : uncontrolled());
  const menu: MenuContextValue = {
    rootId: parent ? parent.rootId : createUniqueId(),
    popupId: createUniqueId(),
    parent,
    open,
    trigger,
    setTrigger: (el) => setTrigger(() => el),
    focusFirstOnOpen: { current: false },
    subMenus: new Set(),
    setOpen: (next, details) => {
      if (next === untrack(open)) return;
      if (!next) closeSubMenus(menu);
      if (props.open === undefined) setUncontrolled(next);
      props.onOpenChange?.(next, details);
    },
  };
  return menu;
}

export interface DropdownMenuProps {
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean, details: OpenChangeDetails) => void;
  modal?: boolean;
  children?: JSX.Element;
  sx?: StyleXStyles;
}

function DropdownMenu(props: DropdownMenuProps) {
  const menu = createMenuState(props, null);
  return <MenuContext value={menu}>{props.children}</MenuContext>;
}

export interface DropdownMenuPortalProps {
  children?: JSX.Element;
  container?: Element;
  sx?: StyleXStyles;
}

function DropdownMenuPortal(props: DropdownMenuPortalProps) {
  return <Portal mount={props.container}>{props.children}</Portal>;
}

export interface DropdownMenuTriggerProps extends Omit<ComponentProps<"button">, "class"> {
  /** An element to use as the trigger instead of the default <button>. */
  render?: JSX.Element;
  sx?: StyleXStyles;
}

function DropdownMenuTrigger(props: DropdownMenuTriggerProps) {
  const rest = omit(props, "render", "sx", "children", "onClick", "onKeyDown", "ref");
  const menu = useMenu("DropdownMenuTrigger");
  const usesRender = "render" in props;

  const toggle = (event: MouseEvent) => {
    if (event.defaultPrevented) return;
    menu.focusFirstOnOpen.current = event.detail === 0;
    menu.setOpen(!menu.open(), { event, reason: "trigger-press" });
  };
  const openFromKeyboard = (event: KeyboardEvent) => {
    if (event.defaultPrevented || (event.key !== "ArrowDown" && event.key !== "ArrowUp")) return;
    event.preventDefault();
    menu.focusFirstOnOpen.current = true;
    menu.setOpen(true, { event, reason: "trigger-press" });
  };
  const ownProps = {
    "data-slot": "dropdown-menu-trigger",
    "aria-haspopup": "menu" as const,
    get "aria-expanded"() {
      return menu.open() ? ("true" as const) : ("false" as const);
    },
    get "aria-controls"() {
      return menu.open() ? menu.popupId : undefined;
    },
    get "data-popup-open"() {
      return menu.open() ? "" : undefined;
    },
  };

  // A ready-made element (render={<Button />}) cannot take props after creation, so wire it up in place.
  const rendered = resolveChildren(() => (usesRender ? props.render : undefined));
  onSettled(() => {
    const el = rendered.toArray().find((node) => node instanceof HTMLElement);
    if (!(el instanceof HTMLElement)) return;
    menu.setTrigger(el);
    const onClick = (event: MouseEvent) => toggle(event);
    el.addEventListener("click", onClick);
    el.addEventListener("keydown", openFromKeyboard);
    return () => {
      el.removeEventListener("click", onClick);
      el.removeEventListener("keydown", openFromKeyboard);
    };
  });
  createEffect(
    () => ({
      el: usesRender ? menu.trigger() : undefined,
      attributes: Object.entries(ownProps),
    }),
    ({ el, attributes }) => {
      if (!el) return;
      for (const [name, value] of attributes) {
        if (value === undefined) el.removeAttribute(name);
        else el.setAttribute(name, value);
      }
    },
  );

  if (usesRender) return <>{rendered()}</>;
  return (
    <button
      type="button"
      {...ownProps}
      {...rest}
      ref={(el) => {
        menu.setTrigger(el);
        const ref = props.ref;
        if (typeof ref === "function") (ref as (el: HTMLButtonElement) => void)(el);
      }}
      onClick={(event) => {
        const onClick = props.onClick;
        if (typeof onClick === "function") onClick(event);
        toggle(event);
      }}
      onKeyDown={(event) => {
        const onKeyDown = props.onKeyDown;
        if (typeof onKeyDown === "function") onKeyDown(event);
        openFromKeyboard(event);
      }}
    >
      {props.children}
    </button>
  );
}

export interface DropdownMenuContentProps extends Omit<ComponentProps<"div">, "class"> {
  align?: Align;
  alignOffset?: number;
  side?: Side;
  sideOffset?: number;
  sx?: StyleXStyles;
}

function DropdownMenuContent(props: DropdownMenuContentProps) {
  const menu = useMenu("DropdownMenuContent");
  return (
    <Show when={menu.open()}>
      <Portal>
        <MenuPopup {...props} />
      </Portal>
    </Show>
  );
}

const VIEWPORT_PADDING = 8;
// The StyleX compiler cannot evaluate a computed style key; resolve it at runtime instead.
const sxProps = (...args: ReadonlyArray<StyleXStyles | false | null | undefined>) =>
  stylex.attrs(...args);

function MenuPopup(props: DropdownMenuContentProps) {
  const rest = omit(props, "align", "alignOffset", "side", "sideOffset", "sx", "onKeyDown");
  const menu = useMenu("DropdownMenuContent");
  const side = () => props.side ?? "bottom";
  const align = () => props.align ?? "start";
  const sideStyle = () => menuStyles[`side_${side()}`] || menuStyles.open;
  let positioner!: HTMLDivElement;
  let popup!: HTMLDivElement;

  const place = () => {
    const anchor = menu.trigger();
    if (!anchor) return;
    const rect = anchor.getBoundingClientRect();
    positioner.style.setProperty("--anchor-width", `${rect.width}px`);
    const width = popup.offsetWidth;
    const height = popup.offsetHeight;
    const sideOffset = props.sideOffset ?? 4;
    const alignOffset = props.alignOffset ?? 0;
    const vertical = side() === "top" || side() === "bottom";
    const [start, length, extent] = vertical
      ? [rect.left, rect.width, width]
      : [rect.top, rect.height, height];
    const cross =
      align() === "start"
        ? start + alignOffset
        : align() === "end"
          ? start + length - extent - alignOffset
          : start + (length - extent) / 2;
    let left: number;
    let top: number;
    let available: number;
    if (side() === "bottom") {
      top = rect.bottom + sideOffset;
      left = cross;
      available = window.innerHeight - top - VIEWPORT_PADDING;
    } else if (side() === "top") {
      top = rect.top - sideOffset - height;
      left = cross;
      available = rect.top - sideOffset - VIEWPORT_PADDING;
    } else if (side() === "right") {
      left = rect.right + sideOffset;
      top = cross;
      available = window.innerHeight - VIEWPORT_PADDING * 2;
    } else {
      left = rect.left - sideOffset - width;
      top = cross;
      available = window.innerHeight - VIEWPORT_PADDING * 2;
    }
    const origin = { bottom: "top", top: "bottom", right: "left", left: "right" }[side()];
    positioner.style.left = `${Math.round(left)}px`;
    positioner.style.top = `${Math.round(top)}px`;
    positioner.style.setProperty("--available-height", `${Math.max(0, available)}px`);
    positioner.style.setProperty(
      "--transform-origin",
      vertical ? `${align() === "end" ? "right" : "left"} ${origin}` : `${origin} top`,
    );
  };

  onSettled(() => {
    place();
    if (menu.focusFirstOnOpen.current) menuItems(popup)[0]?.focus();
    else popup.focus({ preventScroll: true });
    menu.focusFirstOnOpen.current = false;

    const onPointerDown = (event: PointerEvent) => {
      const target = event.target as Element | null;
      if (target?.closest(`[data-menu-root="${menu.rootId}"]`)) return;
      if (target && rootOf(menu).trigger()?.contains(target)) return;
      closeTree(menu, { event, reason: "outside-press" }, false);
    };
    const reposition = () => place();
    if (!menu.parent) document.addEventListener("pointerdown", onPointerDown, true);
    window.addEventListener("resize", reposition);
    window.addEventListener("scroll", reposition, true);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown, true);
      window.removeEventListener("resize", reposition);
      window.removeEventListener("scroll", reposition, true);
    };
  });

  const onKeyDown = (event: KeyboardEvent & { currentTarget: HTMLDivElement; target: Element }) => {
    const onKey = props.onKeyDown;
    if (typeof onKey === "function") onKey(event);
    if (event.defaultPrevented) return;
    const items = menuItems(popup);
    const current = items.indexOf(document.activeElement as HTMLElement);
    const focusAt = (index: number) => items[(index + items.length) % items.length]?.focus();
    switch (event.key) {
      case "ArrowDown":
        event.preventDefault();
        focusAt(current + 1);
        break;
      case "ArrowUp":
        event.preventDefault();
        focusAt(current < 0 ? items.length - 1 : current - 1);
        break;
      case "Home":
        event.preventDefault();
        focusAt(0);
        break;
      case "End":
        event.preventDefault();
        focusAt(items.length - 1);
        break;
      case "Escape":
        event.preventDefault();
        event.stopPropagation();
        closeTree(menu, { event, reason: "escape-key" }, true);
        break;
      case "ArrowLeft":
        if (!menu.parent) break;
        event.preventDefault();
        event.stopPropagation();
        menu.setOpen(false, { event, reason: "list-navigation" });
        flush();
        menu.trigger()?.focus();
        break;
      case "Tab":
        closeTree(menu, { event, reason: "focus-out" }, false);
        break;
    }
  };

  return (
    <div
      ref={positioner}
      data-menu-root={menu.rootId}
      data-side={side()}
      data-align={align()}
      style={{ position: "fixed", left: "0px", top: "0px" }}
      class={stylex.attrs(menuStyles.positioner).class}
    >
      <div
        ref={popup}
        id={menu.popupId}
        role="menu"
        tabindex={-1}
        data-slot="dropdown-menu-content"
        data-open=""
        data-side={side()}
        data-align={align()}
        {...rest}
        {...sxProps(menuStyles.content, sideStyle(), props.sx)}
        onKeyDown={onKeyDown}
      />
    </div>
  );
}

export interface DropdownMenuGroupProps extends Omit<ComponentProps<"div">, "class"> {
  sx?: StyleXStyles;
}

function DropdownMenuGroup(props: DropdownMenuGroupProps) {
  const rest = omit(props, "sx");
  return <div role="group" data-slot="dropdown-menu-group" {...rest} />;
}

export interface DropdownMenuLabelProps extends Omit<ComponentProps<"div">, "class"> {
  inset?: boolean;
  sx?: StyleXStyles;
}

function DropdownMenuLabel(props: DropdownMenuLabelProps) {
  const rest = omit(props, "inset", "sx");

  return (
    <div
      data-slot="dropdown-menu-label"
      data-inset={props.inset ? "true" : undefined}
      {...stylex.attrs(menuStyles.label, props.inset && menuStyles.label_inset, props.sx)}
      {...rest}
    />
  );
}

type ItemBehaviour = {
  disabled?: boolean;
  closeOnClick: boolean;
  onActivate?: (event: MouseEvent) => void;
  onClick?: unknown;
  onPointerMove?: unknown;
};

function createItem(menu: MenuContextValue, behaviour: () => ItemBehaviour) {
  const [highlighted, setHighlighted] = createSignal(false);
  return {
    highlighted,
    handlers: {
      onFocus: () => setHighlighted(true),
      onBlur: () => setHighlighted(false),
      onPointerMove: (event: PointerEvent & { currentTarget: HTMLDivElement; target: Element }) => {
        const onPointerMove = behaviour().onPointerMove;
        if (typeof onPointerMove === "function") onPointerMove(event);
        if (behaviour().disabled) return;
        closeSubMenus(menu);
        if (document.activeElement !== event.currentTarget) {
          event.currentTarget.focus({ preventScroll: true });
        }
      },
      onPointerLeave: (
        event: PointerEvent & { currentTarget: HTMLDivElement; target: Element },
      ) => {
        if (document.activeElement === event.currentTarget) {
          event.currentTarget.closest<HTMLElement>('[role="menu"]')?.focus({ preventScroll: true });
        }
      },
      onKeyDown: (event: KeyboardEvent & { currentTarget: HTMLDivElement; target: Element }) => {
        if (event.key !== "Enter" && event.key !== " ") return;
        event.preventDefault();
        event.currentTarget.click();
      },
      onClick: (event: MouseEvent & { currentTarget: HTMLDivElement; target: Element }) => {
        const onClick = behaviour().onClick;
        if (typeof onClick === "function") onClick(event);
        if (event.defaultPrevented || behaviour().disabled) return;
        behaviour().onActivate?.(event);
        if (behaviour().closeOnClick) closeTree(menu, { event, reason: "item-press" }, true);
      },
    },
  };
}

export interface DropdownMenuItemProps extends Omit<ComponentProps<"div">, "class"> {
  inset?: boolean;
  variant?: "default" | "destructive";
  disabled?: boolean;
  closeOnClick?: boolean;
  sx?: StyleXStyles;
}

function DropdownMenuItem(props: DropdownMenuItemProps) {
  const rest = omit(
    props,
    "inset",
    "variant",
    "sx",
    "disabled",
    "closeOnClick",
    "onClick",
    "onPointerMove",
  );
  const menu = useMenu("DropdownMenuItem");
  const item = createItem(menu, () => ({
    disabled: props.disabled,
    closeOnClick: props.closeOnClick ?? true,
    onClick: props.onClick,
    onPointerMove: props.onPointerMove,
  }));

  return (
    <div
      role="menuitem"
      tabindex={-1}
      data-slot="dropdown-menu-item"
      data-inset={props.inset ? "true" : undefined}
      data-variant={props.variant ?? "default"}
      aria-disabled={props.disabled ? "true" : undefined}
      data-disabled={props.disabled ? "" : undefined}
      data-highlighted={item.highlighted() ? "" : undefined}
      {...rest}
      {...stylex.attrs(
        menuStyles.item,
        props.variant === "destructive" && menuStyles.item_destructive,
        props.inset && menuStyles.item_inset,
        !!props.disabled && menuStyles.item_disabled,
        item.highlighted() && menuStyles.item_highlighted,
        props.sx,
      )}
      {...item.handlers}
    />
  );
}

export interface DropdownMenuSubProps extends DropdownMenuProps {}

function DropdownMenuSub(props: DropdownMenuSubProps) {
  const parent = useMenu("DropdownMenuSub");
  const menu = createMenuState(props, parent);
  parent.subMenus.add(menu);
  return <MenuContext value={menu}>{props.children}</MenuContext>;
}

export interface DropdownMenuSubTriggerProps extends Omit<ComponentProps<"div">, "class"> {
  inset?: boolean;
  disabled?: boolean;
  sx?: StyleXStyles;
}

function DropdownMenuSubTrigger(props: DropdownMenuSubTriggerProps) {
  const rest = omit(props, "inset", "sx", "children", "disabled");
  const menu = useMenu("DropdownMenuSubTrigger");
  const parent = menu.parent ?? menu;
  const [highlighted, setHighlighted] = createSignal(false);
  const openSub = (event: Event, keyboard: boolean) => {
    if (props.disabled) return;
    closeSubMenus(parent, menu);
    menu.focusFirstOnOpen.current = keyboard;
    menu.setOpen(true, { event, reason: keyboard ? "list-navigation" : "trigger-hover" });
  };

  return (
    <div
      ref={(el) => menu.setTrigger(el)}
      role="menuitem"
      tabindex={-1}
      aria-haspopup="menu"
      aria-expanded={menu.open() ? "true" : "false"}
      aria-controls={menu.open() ? menu.popupId : undefined}
      aria-disabled={props.disabled ? "true" : undefined}
      data-slot="dropdown-menu-sub-trigger"
      data-inset={props.inset ? "true" : undefined}
      data-popup-open={menu.open() ? "" : undefined}
      data-highlighted={highlighted() ? "" : undefined}
      {...rest}
      {...stylex.attrs(
        menuStyles.subTrigger,
        props.inset && menuStyles.item_inset,
        (highlighted() || menu.open()) && menuStyles.item_highlighted,
        props.sx,
      )}
      onFocus={() => setHighlighted(true)}
      onBlur={() => setHighlighted(false)}
      onPointerMove={(event) => {
        if (document.activeElement !== event.currentTarget) {
          event.currentTarget.focus({ preventScroll: true });
        }
        openSub(event, false);
      }}
      onClick={(event) => openSub(event, event.detail === 0)}
      onKeyDown={(event) => {
        if (event.key !== "ArrowRight" && event.key !== "Enter" && event.key !== " ") return;
        event.preventDefault();
        event.stopPropagation();
        openSub(event, true);
      }}
    >
      {props.children}
      <ChevronRightIcon size={16} style={{ "margin-left": "auto" }} />
    </div>
  );
}

export interface DropdownMenuSubContentProps extends DropdownMenuContentProps {}

function DropdownMenuSubContent(props: DropdownMenuSubContentProps) {
  return (
    <DropdownMenuContent
      data-slot="dropdown-menu-sub-content"
      align="start"
      alignOffset={-3}
      side="right"
      sideOffset={0}
      {...props}
    />
  );
}

export interface DropdownMenuCheckboxItemProps extends Omit<ComponentProps<"div">, "class"> {
  inset?: boolean;
  checked?: boolean;
  defaultChecked?: boolean;
  onCheckedChange?: (checked: boolean, event: Event) => void;
  disabled?: boolean;
  closeOnClick?: boolean;
  sx?: StyleXStyles;
}

function DropdownMenuCheckboxItem(props: DropdownMenuCheckboxItemProps) {
  const rest = omit(
    props,
    "inset",
    "sx",
    "children",
    "checked",
    "defaultChecked",
    "onCheckedChange",
    "disabled",
    "closeOnClick",
    "onClick",
    "onPointerMove",
  );
  const menu = useMenu("DropdownMenuCheckboxItem");
  const [uncontrolled, setUncontrolled] = createSignal(props.defaultChecked ?? false);
  const checked = () => props.checked ?? uncontrolled();
  const item = createItem(menu, () => ({
    disabled: props.disabled,
    closeOnClick: props.closeOnClick ?? false,
    onClick: props.onClick,
    onPointerMove: props.onPointerMove,
    onActivate: (event) => {
      const next = !checked();
      if (props.checked === undefined) setUncontrolled(next);
      props.onCheckedChange?.(next, event);
    },
  }));

  return (
    <div
      role="menuitemcheckbox"
      tabindex={-1}
      aria-checked={checked() ? "true" : "false"}
      aria-disabled={props.disabled ? "true" : undefined}
      data-slot="dropdown-menu-checkbox-item"
      data-inset={props.inset ? "true" : undefined}
      data-checked={checked() ? "" : undefined}
      data-unchecked={checked() ? undefined : ""}
      data-disabled={props.disabled ? "" : undefined}
      data-highlighted={item.highlighted() ? "" : undefined}
      {...rest}
      {...stylex.attrs(
        menuStyles.checkboxItem,
        props.inset && menuStyles.item_inset,
        !!props.disabled && menuStyles.item_disabled,
        item.highlighted() && menuStyles.item_highlighted,
        props.sx,
      )}
      {...item.handlers}
    >
      {props.children}
      <span
        {...stylex.attrs(menuStyles.indicatorContainer)}
        data-slot="dropdown-menu-checkbox-item-indicator"
      >
        <Show when={checked()}>
          <span>
            <CheckIcon size={16} />
          </span>
        </Show>
      </span>
    </div>
  );
}

type RadioGroupContextValue = {
  value: Accessor<unknown>;
  select: (value: unknown, event: Event) => void;
};

const RadioGroupContext = createContext<RadioGroupContextValue | null>(null);

export interface DropdownMenuRadioGroupProps extends Omit<ComponentProps<"div">, "class"> {
  value?: unknown;
  defaultValue?: unknown;
  onValueChange?: (value: any, event: Event) => void;
  sx?: StyleXStyles;
}

function DropdownMenuRadioGroup(props: DropdownMenuRadioGroupProps) {
  const rest = omit(props, "sx", "value", "defaultValue", "onValueChange");
  const [uncontrolled, setUncontrolled] = createSignal<unknown>(props.defaultValue);
  const group: RadioGroupContextValue = {
    value: () => (props.value !== undefined ? props.value : uncontrolled()),
    select: (value, event) => {
      if (props.value === undefined) setUncontrolled(() => value);
      props.onValueChange?.(value, event);
    },
  };

  return (
    <RadioGroupContext value={group}>
      <div role="group" data-slot="dropdown-menu-radio-group" {...rest} />
    </RadioGroupContext>
  );
}

export interface DropdownMenuRadioItemProps extends Omit<ComponentProps<"div">, "class" | "value"> {
  value: unknown;
  inset?: boolean;
  disabled?: boolean;
  closeOnClick?: boolean;
  sx?: StyleXStyles;
}

function DropdownMenuRadioItem(props: DropdownMenuRadioItemProps) {
  const rest = omit(
    props,
    "inset",
    "sx",
    "children",
    "value",
    "disabled",
    "closeOnClick",
    "onClick",
    "onPointerMove",
  );
  const menu = useMenu("DropdownMenuRadioItem");
  const group = useContext(RadioGroupContext);
  const checked = () => group?.value() === props.value;
  const item = createItem(menu, () => ({
    disabled: props.disabled,
    closeOnClick: props.closeOnClick ?? false,
    onClick: props.onClick,
    onPointerMove: props.onPointerMove,
    onActivate: (event) => group?.select(props.value, event),
  }));

  return (
    <div
      role="menuitemradio"
      tabindex={-1}
      aria-checked={checked() ? "true" : "false"}
      aria-disabled={props.disabled ? "true" : undefined}
      data-slot="dropdown-menu-radio-item"
      data-inset={props.inset ? "true" : undefined}
      data-checked={checked() ? "" : undefined}
      data-unchecked={checked() ? undefined : ""}
      data-disabled={props.disabled ? "" : undefined}
      data-highlighted={item.highlighted() ? "" : undefined}
      {...rest}
      {...stylex.attrs(
        menuStyles.checkboxItem,
        props.inset && menuStyles.item_inset,
        !!props.disabled && menuStyles.item_disabled,
        item.highlighted() && menuStyles.item_highlighted,
        props.sx,
      )}
      {...item.handlers}
    >
      {props.children}
      <span
        {...stylex.attrs(menuStyles.indicatorContainer)}
        data-slot="dropdown-menu-radio-item-indicator"
      >
        <Show when={checked()}>
          <span>
            <CheckIcon size={16} />
          </span>
        </Show>
      </span>
    </div>
  );
}

export interface DropdownMenuSeparatorProps extends Omit<ComponentProps<"div">, "class"> {
  sx?: StyleXStyles;
}

function DropdownMenuSeparator(props: DropdownMenuSeparatorProps) {
  const rest = omit(props, "sx");

  return (
    <div
      role="separator"
      aria-orientation="horizontal"
      data-slot="dropdown-menu-separator"
      {...stylex.attrs(menuStyles.separator, props.sx)}
      {...rest}
    />
  );
}

export interface DropdownMenuShortcutProps extends Omit<ComponentProps<"span">, "class"> {
  sx?: StyleXStyles;
}

function DropdownMenuShortcut(props: DropdownMenuShortcutProps) {
  const rest = omit(props, "sx");

  return (
    <span
      data-slot="dropdown-menu-shortcut"
      {...stylex.attrs(menuStyles.shortcut, props.sx)}
      {...rest}
    />
  );
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
