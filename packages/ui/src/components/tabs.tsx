"use client";

import * as stylex from "@stylexjs/stylex";
import type { StyleXStyles } from "@stylexjs/stylex";
import type { ComponentProps } from "@solidjs/web";
import {
  createContext,
  createSignal,
  createUniqueId,
  omit,
  Show,
  useContext,
  type Accessor,
} from "solid-js";

type TabValue = string | number | null;
type Orientation = "horizontal" | "vertical";

type TabsContextValue = {
  value: Accessor<TabValue>;
  select: (value: TabValue, event: Event) => void;
  orientation: Accessor<Orientation>;
  tabId: (value: TabValue) => string;
  panelId: (value: TabValue) => string;
};

const TabsContext = createContext<TabsContextValue | null>(null);

function useTabs(part: string) {
  const context = useContext(TabsContext);
  if (!context) throw new Error(`${part} must be used within <Tabs>`);
  return context;
}

export interface TabsProps extends Omit<ComponentProps<"div">, "class" | "style"> {
  value?: TabValue;
  defaultValue?: TabValue;
  onValueChange?: (value: TabValue, event: Event) => void;
  orientation?: Orientation;
  sx?: StyleXStyles;
}

function Tabs(props: TabsProps) {
  const rest = omit(props, "sx", "value", "defaultValue", "onValueChange", "orientation");
  const baseId = createUniqueId();
  const [uncontrolled, setUncontrolled] = createSignal<TabValue>(props.defaultValue ?? 0);
  const value = () => (props.value !== undefined ? props.value : uncontrolled());
  const orientation = () => props.orientation ?? "horizontal";
  const context: TabsContextValue = {
    value,
    orientation,
    select: (next, event) => {
      if (next === value()) return;
      if (props.value === undefined) setUncontrolled(next);
      props.onValueChange?.(next, event);
    },
    tabId: (tab) => `${baseId}-tab-${String(tab)}`,
    panelId: (tab) => `${baseId}-panel-${String(tab)}`,
  };

  return (
    <TabsContext value={context}>
      <div
        data-slot="tabs"
        data-orientation={orientation()}
        {...rest}
        {...stylex.attrs(props.sx)}
      />
    </TabsContext>
  );
}

export interface TabsListProps extends Omit<ComponentProps<"div">, "class" | "style"> {
  activateOnFocus?: boolean;
  loop?: boolean;
  sx?: StyleXStyles;
}

function TabsList(props: TabsListProps) {
  const rest = omit(props, "sx", "activateOnFocus", "loop", "onKeyDown");
  const tabs = useTabs("TabsList");
  let list!: HTMLDivElement;

  const onKeyDown = (event: KeyboardEvent & { currentTarget: HTMLDivElement; target: Element }) => {
    const onKey = props.onKeyDown;
    if (typeof onKey === "function") onKey(event);
    if (event.defaultPrevented) return;
    const vertical = tabs.orientation() === "vertical";
    const prevKey = vertical ? "ArrowUp" : "ArrowLeft";
    const nextKey = vertical ? "ArrowDown" : "ArrowRight";
    const items = Array.from(
      list.querySelectorAll<HTMLButtonElement>('[role="tab"]:not([disabled])'),
    );
    if (items.length === 0) return;
    const current = items.indexOf(document.activeElement as HTMLButtonElement);
    const loop = props.loop ?? true;
    let index: number;
    if (event.key === nextKey) {
      index = current + 1 >= items.length ? (loop ? 0 : items.length - 1) : current + 1;
    } else if (event.key === prevKey) {
      index = current - 1 < 0 ? (loop ? items.length - 1 : 0) : current - 1;
    } else if (event.key === "Home") {
      index = 0;
    } else if (event.key === "End") {
      index = items.length - 1;
    } else {
      return;
    }
    event.preventDefault();
    const target = items[index];
    target?.focus();
    if (props.activateOnFocus) target?.click();
  };

  return (
    <div
      ref={list}
      role="tablist"
      data-slot="tabs-list"
      aria-orientation={tabs.orientation()}
      data-orientation={tabs.orientation()}
      {...rest}
      {...stylex.attrs(props.sx)}
      onKeyDown={onKeyDown}
    />
  );
}

export interface TabsTriggerProps extends Omit<
  ComponentProps<"button">,
  "class" | "style" | "value"
> {
  value: TabValue;
  sx?: StyleXStyles;
}

function TabsTrigger(props: TabsTriggerProps) {
  const rest = omit(props, "sx", "value", "onClick");
  const tabs = useTabs("TabsTrigger");
  const selected = () => tabs.value() === props.value;

  return (
    <button
      type="button"
      role="tab"
      data-slot="tabs-trigger"
      id={tabs.tabId(props.value)}
      aria-selected={selected() ? "true" : "false"}
      aria-controls={tabs.panelId(props.value)}
      tabindex={selected() ? 0 : -1}
      data-active={selected() ? "" : undefined}
      data-orientation={tabs.orientation()}
      data-disabled={props.disabled ? "" : undefined}
      {...rest}
      {...stylex.attrs(props.sx)}
      onClick={(event) => {
        const onClick = props.onClick;
        if (typeof onClick === "function") onClick(event);
        if (!event.defaultPrevented && !props.disabled) tabs.select(props.value, event);
      }}
    />
  );
}

export interface TabsContentProps extends Omit<ComponentProps<"div">, "class" | "style"> {
  value: TabValue;
  keepMounted?: boolean;
  sx?: StyleXStyles;
}

function TabsContent(props: TabsContentProps) {
  const rest = omit(props, "sx", "value", "keepMounted", "children");
  const tabs = useTabs("TabsContent");
  const selected = () => tabs.value() === props.value;

  return (
    <div
      role="tabpanel"
      data-slot="tabs-content"
      id={tabs.panelId(props.value)}
      aria-labelledby={tabs.tabId(props.value)}
      tabindex={0}
      hidden={!selected()}
      data-hidden={selected() ? undefined : ""}
      data-orientation={tabs.orientation()}
      {...rest}
      {...stylex.attrs(props.sx)}
    >
      <Show when={selected() || props.keepMounted}>{props.children}</Show>
    </div>
  );
}

export { Tabs, TabsContent, TabsList, TabsTrigger };
