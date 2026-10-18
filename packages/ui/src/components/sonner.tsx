"use client";

import * as stylex from "@stylexjs/stylex";
import type { StyleXStyles } from "@stylexjs/stylex";
import { createSignal, For, onSettled } from "solid-js";

type ToastPosition =
  | "top-left"
  | "top-center"
  | "top-right"
  | "bottom-left"
  | "bottom-center"
  | "bottom-right";

export interface ToasterProps {
  richColors?: boolean;
  position?: ToastPosition;
}

export interface ToastOptions {
  description?: string;
  duration?: number;
}

type ToastEntry = { id: number; message: string; description?: string; duration: number };

const DEFAULT_DURATION = 4000;
const [toasts, setToasts] = createSignal<ToastEntry[]>([]);
let nextId = 0;

function dismiss(id: number) {
  setToasts((list) => list.filter((entry) => entry.id !== id));
}

function toast(message: string, options: ToastOptions = {}) {
  const id = ++nextId;
  setToasts((list) => [
    ...list,
    {
      id,
      message,
      description: options.description,
      duration: options.duration ?? DEFAULT_DURATION,
    },
  ]);
  return id;
}
toast.dismiss = dismiss;

const enter = stylex.keyframes({
  "0%": { opacity: 0, transform: "translateY(0.5rem)" },
  "100%": { opacity: 1, transform: "translateY(0)" },
});

const toasterStyles = stylex.create({
  root: {
    position: "fixed",
    zIndex: 999999999,
    display: "flex",
    flexDirection: "column",
    gap: "0.5rem",
    width: "min(356px, calc(100vw - 2rem))",
    margin: 0,
    padding: 0,
    listStyle: "none",
    pointerEvents: "none",
  },
  top: { top: "1.5rem", flexDirection: "column-reverse" },
  bottom: { bottom: "1.5rem" },
  left: { left: "1.5rem" },
  right: { right: "1.5rem" },
  center: { left: "50%", transform: "translateX(-50%)" },
  toast: {
    display: "flex",
    flexDirection: "column",
    gap: "0.125rem",
    padding: "1rem",
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "var(--normal-border)",
    borderRadius: "var(--border-radius)",
    backgroundColor: "var(--normal-bg)",
    color: "var(--normal-text)",
    fontSize: "13px",
    lineHeight: 1.4,
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
    pointerEvents: "auto",
    animationName: enter,
    animationDuration: "200ms",
    animationTimingFunction: "ease-out",
  },
  title: { fontWeight: 500 },
  description: { opacity: 0.8 },
});

// The StyleX compiler cannot evaluate these runtime conditions; resolve them at runtime instead.
const sxProps = (...args: ReadonlyArray<StyleXStyles | false | null | undefined>) =>
  stylex.attrs(...args);

function ToastItem(props: { entry: ToastEntry }) {
  onSettled(() => {
    const timer = window.setTimeout(() => dismiss(props.entry.id), props.entry.duration);
    return () => window.clearTimeout(timer);
  });

  return (
    <li
      role="status"
      aria-live="polite"
      aria-atomic="true"
      data-sonner-toast=""
      class={`cn-toast ${stylex.attrs(toasterStyles.toast).class ?? ""}`}
    >
      <div data-title="" {...stylex.attrs(toasterStyles.title)}>
        {props.entry.message}
      </div>
      {props.entry.description ? (
        <div data-description="" {...stylex.attrs(toasterStyles.description)}>
          {props.entry.description}
        </div>
      ) : null}
    </li>
  );
}

const Toaster = (props: ToasterProps) => {
  const position = () => props.position ?? "bottom-right";
  const vertical = () => (position().startsWith("top") ? "top" : "bottom");
  const horizontal = () => position().split("-")[1] as "left" | "center" | "right";
  const attrs = () =>
    sxProps(
      toasterStyles.root,
      vertical() === "top" ? toasterStyles.top : toasterStyles.bottom,
      horizontal() === "left" && toasterStyles.left,
      horizontal() === "right" && toasterStyles.right,
      horizontal() === "center" && toasterStyles.center,
    );

  return (
    <section aria-label="Notifications" tabindex={-1}>
      <ol
        data-sonner-toaster=""
        data-theme="dark"
        data-rich-colors={props.richColors ? "true" : "false"}
        data-y-position={vertical()}
        data-x-position={horizontal()}
        class={`toaster group ${attrs().class ?? ""}`}
        style={`--normal-bg: var(--popover); --normal-text: var(--popover-foreground); --normal-border: var(--border); --border-radius: var(--radius);${attrs().style ?? ""}`}
      >
        <For each={toasts()}>{(entry) => <ToastItem entry={entry} />}</For>
      </ol>
    </section>
  );
};

export { Toaster, toast };
