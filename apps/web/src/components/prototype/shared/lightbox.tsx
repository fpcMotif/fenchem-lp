import * as stylex from "@stylexjs/stylex";
import type { StyleXStyles } from "@stylexjs/stylex";
import { createEffect, createSignal, type Accessor } from "solid-js";
import type { JSX } from "@solidjs/web";

export type LightboxState = {
  readonly index: number | null;
  /** True once the viewer has stepped from the photo they opened. */
  readonly stepped: boolean;
  open: (index: number) => void;
  close: () => void;
  step: (delta: number) => void;
};

export function useLightbox(count: number | Accessor<number>): LightboxState {
  const total = () => (typeof count === "function" ? count() : count);
  const [index, setIndex] = createSignal<number | null>(null);
  const [stepped, setStepped] = createSignal(false);
  return {
    get index() {
      return index();
    },
    get stepped() {
      return stepped();
    },
    open: (next: number) => {
      setStepped(false);
      setIndex(next);
    },
    close: () => setIndex(null),
    step: (delta: number) => {
      setStepped(true);
      setIndex((current) => (current === null ? null : (current + delta + total()) % total()));
    },
  };
}

type FocusTarget = HTMLElement | null | undefined;

/** A modal <dialog> that follows `lightbox.index`, steps on arrow keys and preloads both neighbours. */
export function LightboxDialog<T extends { large: string }>(props: {
  lightbox: LightboxState;
  items: readonly T[];
  label?: string;
  sx?: StyleXStyles;
  /** Focused after opening; LightboxControls already focuses Previous. */
  initialFocus?: FocusTarget | Accessor<FocusTarget>;
  children: (item: T, index: number) => JSX.Element;
}) {
  let dialog!: HTMLDialogElement;

  createEffect(
    () => props.lightbox.index,
    (index) => {
      if (index !== null && !dialog.open) {
        dialog.showModal();
        const focus = props.initialFocus;
        (typeof focus === "function" ? focus() : focus)?.focus();
      }
      if (index === null && dialog.open) dialog.close();
    },
  );

  createEffect(
    () => props.lightbox.index,
    (index) => {
      if (index === null) return;
      for (const delta of [1, -1]) {
        const neighbor = new Image();
        neighbor.src = props.items[(index + delta + props.items.length) % props.items.length].large;
      }
    },
  );

  return (
    <dialog
      ref={dialog}
      aria-label={props.label ?? "Campus photos"}
      onClose={() => props.lightbox.close()}
      onKeyDown={(event) => {
        if (event.key !== "ArrowRight" && event.key !== "ArrowLeft") return;
        event.preventDefault();
        event.stopPropagation();
        props.lightbox.step(event.key === "ArrowRight" ? 1 : -1);
      }}
      {...stylex.attrs(props.sx)}
    >
      {props.lightbox.index === null
        ? null
        : props.children(props.items[props.lightbox.index], props.lightbox.index)}
    </dialog>
  );
}
