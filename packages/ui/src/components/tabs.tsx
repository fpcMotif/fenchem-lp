"use client";

import * as stylex from "@stylexjs/stylex";
import type { StyleXStyles } from "@stylexjs/stylex";
import {
  Tabs as UiTabs,
  TabsList as UiTabsList,
  TabsPanel as UiTabsPanel,
  TabsTab as UiTabsTab,
  type TabsValueChangeReason,
} from "@ui-sdk/solid/tabs";
import type { ChangeDetails } from "@ui-sdk/core";
import type { ComponentProps } from "@solidjs/web";
import { omit } from "solid-js";

type Orientation = "horizontal" | "vertical";
type UiTabsProps = ComponentProps<typeof UiTabs>;
type UiTabsListProps = ComponentProps<typeof UiTabsList>;
type UiTabsTabProps = ComponentProps<typeof UiTabsTab>;
type UiTabsPanelProps = ComponentProps<typeof UiTabsPanel>;

export interface TabsProps extends Omit<
  UiTabsProps,
  "class" | "style" | "value" | "defaultValue" | "onValueChange"
> {
  value?: string | null;
  defaultValue?: string | null;
  onValueChange?: (value: string | null, details: ChangeDetails<TabsValueChangeReason>) => void;
  orientation?: Orientation;
  sx?: StyleXStyles;
}

function Tabs(props: TabsProps) {
  const rest = omit(props, "sx");
  return <UiTabs {...rest} {...stylex.attrs(props.sx)} />;
}

export interface TabsListProps extends Omit<UiTabsListProps, "class" | "style"> {
  sx?: StyleXStyles;
}

function TabsList(props: TabsListProps) {
  const rest = omit(props, "sx");
  return <UiTabsList {...rest} {...stylex.attrs(props.sx)} />;
}

export interface TabsTriggerProps extends Omit<UiTabsTabProps, "class" | "style"> {
  sx?: StyleXStyles;
}

function TabsTrigger(props: TabsTriggerProps) {
  const rest = omit(props, "sx");
  return <UiTabsTab {...rest} {...stylex.attrs(props.sx)} />;
}

export interface TabsContentProps extends Omit<UiTabsPanelProps, "class" | "style"> {
  sx?: StyleXStyles;
}

function TabsContent(props: TabsContentProps) {
  const rest = omit(props, "sx");
  return <UiTabsPanel {...rest} {...stylex.attrs(props.sx)} />;
}

export { Tabs, TabsContent, TabsList, TabsTrigger };
