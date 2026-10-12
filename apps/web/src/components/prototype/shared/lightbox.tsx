import * as stylex from "@stylexjs/stylex";
import type { StyleXStyles } from "@stylexjs/stylex";
import { useEffect, useMemo, useRef, useState, type ReactNode, type RefObject } from "react";

export type LightboxState = {
  index: number | null;
  /** True once the viewer has stepped from the photo they opened. */
  stepped: boolean;
  open: (index: number) => void;
  close: () => void;
  step: (delta: number) => void;
};

export function useLightbox(count: number): LightboxState {
  const [index, setIndex] = useState<number | null>(null);
  const [stepped, setStepped] = useState(false);
  const actions = useMemo(
    () => ({
      open: (next: number) => {
        setStepped(false);
        setIndex(next);
      },
      close: () => setIndex(null),
      step: (delta: number) => {
        setStepped(true);
        setIndex((current) => (current === null ? null : (current + delta + count) % count));
      },
    }),
    [count],
  );
  return { index, stepped, ...actions };
}

/** A modal <dialog> that follows `lightbox.index`, steps on arrow keys and preloads both neighbours. */
export function LightboxDialog<T extends { large: string }>({
  lightbox,
  items,
  label = "Campus photos",
  sx,
  initialFocus,
  children,
}: {
  lightbox: LightboxState;
  items: readonly T[];
  label?: string;
  sx?: StyleXStyles;
  /** Focused after opening; LightboxControls already focuses Previous. */
  initialFocus?: RefObject<HTMLElement | null>;
  children: (item: T, index: number) => ReactNode;
}) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const { index, close, step } = lightbox;

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (index !== null && !dialog.open) {
      dialog.showModal();
      initialFocus?.current?.focus();
    }
    if (index === null && dialog.open) dialog.close();
  }, [index, initialFocus]);

  useEffect(() => {
    if (index === null) return;
    for (const delta of [1, -1]) {
      const neighbor = new Image();
      neighbor.src = items[(index + delta + items.length) % items.length].large;
    }
  }, [index, items]);

  return (
    <dialog
      ref={dialogRef}
      aria-label={label}
      onClose={close}
      onKeyDown={(event) => {
        if (event.key !== "ArrowRight" && event.key !== "ArrowLeft") return;
        event.preventDefault();
        event.stopPropagation();
        step(event.key === "ArrowRight" ? 1 : -1);
      }}
      {...stylex.props(sx)}
    >
      {index === null ? null : children(items[index], index)}
    </dialog>
  );
}
