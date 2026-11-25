"use client";

import * as stylex from "@stylexjs/stylex";
import type { StyleXStyles } from "@stylexjs/stylex";
import { Toast, ToastDescription, ToastRegion, ToastTitle, toast } from "@ui-sdk/solid/toast";

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

const ALIGN_BY_POS = { left: "start", center: "center", right: "end" } as const;

const Toaster = (props: ToasterProps) => {
  const position = () => props.position ?? "bottom-right";
  const side = () => (position().startsWith("top") ? "top" : "bottom");
  const horizontal = () => position().split("-")[1] as "left" | "center" | "right";
  const attrs = () =>
    sxProps(
      toasterStyles.root,
      side() === "top" ? toasterStyles.top : toasterStyles.bottom,
      horizontal() === "left" && toasterStyles.left,
      horizontal() === "right" && toasterStyles.right,
      horizontal() === "center" && toasterStyles.center,
    );

  return (
    <ToastRegion
      side={side()}
      align={ALIGN_BY_POS[horizontal()]}
      aria-label="Notifications"
      data-sonner-toaster=""
      data-theme="dark"
      data-rich-colors={props.richColors ? "true" : "false"}
      class={`toaster group ${attrs().class ?? ""}`}
      style={`--normal-bg: var(--popover); --normal-text: var(--popover-foreground); --normal-border: var(--border); --border-radius: var(--radius);`}
    >
      {() => (
        <Toast
          data-sonner-toast=""
          class={`cn-toast ${stylex.attrs(toasterStyles.toast).class ?? ""}`}
        >
          <ToastTitle data-title="" {...stylex.attrs(toasterStyles.title)} />
          <ToastDescription data-description="" {...stylex.attrs(toasterStyles.description)} />
        </Toast>
      )}
    </ToastRegion>
  );
};

export { Toaster, toast };
