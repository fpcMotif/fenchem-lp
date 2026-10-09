"use client";

import { Tabs as TabsPrimitive } from "@base-ui/react/tabs";
import * as stylex from "@stylexjs/stylex";
import type { StyleXStyles } from "@stylexjs/stylex";

export interface TabsProps extends Omit<TabsPrimitive.Root.Props, "className" | "style"> {
  sx?: StyleXStyles;
}

function Tabs({ sx, ...props }: TabsProps) {
  return <TabsPrimitive.Root data-slot="tabs" {...props} {...stylex.props(sx)} />;
}

export interface TabsListProps extends Omit<TabsPrimitive.List.Props, "className" | "style"> {
  sx?: StyleXStyles;
}

function TabsList({ sx, ...props }: TabsListProps) {
  return <TabsPrimitive.List data-slot="tabs-list" {...props} {...stylex.props(sx)} />;
}

export interface TabsTriggerProps extends Omit<TabsPrimitive.Tab.Props, "className" | "style"> {
  sx?: StyleXStyles;
}

function TabsTrigger({ sx, ...props }: TabsTriggerProps) {
  return <TabsPrimitive.Tab data-slot="tabs-trigger" {...props} {...stylex.props(sx)} />;
}

export interface TabsContentProps extends Omit<TabsPrimitive.Panel.Props, "className" | "style"> {
  sx?: StyleXStyles;
}

function TabsContent({ sx, ...props }: TabsContentProps) {
  return <TabsPrimitive.Panel data-slot="tabs-content" {...props} {...stylex.props(sx)} />;
}

export { Tabs, TabsContent, TabsList, TabsTrigger };
