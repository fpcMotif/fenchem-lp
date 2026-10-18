import * as stylex from "@stylexjs/stylex";
import type { StyleXStyles } from "@stylexjs/stylex";
import type { JSX } from "@solidjs/web";
import { onSettled } from "solid-js";

export function LightboxControls(props: {
  onStep: (delta: number) => void;
  onClose: () => void;
  previous: { icon: JSX.Element; sx: StyleXStyles };
  next: { icon: JSX.Element; sx: StyleXStyles };
  close: { icon: JSX.Element; sx: StyleXStyles };
}) {
  let previousButton: HTMLButtonElement | undefined;
  onSettled(() => {
    queueMicrotask(() => previousButton?.focus());
  });

  return (
    <>
      <button
        ref={previousButton}
        type="button"
        aria-label="Previous photo"
        onClick={() => props.onStep(-1)}
        {...stylex.attrs(props.previous.sx)}
      >
        {props.previous.icon}
      </button>
      <button
        type="button"
        aria-label="Next photo"
        onClick={() => props.onStep(1)}
        {...stylex.attrs(props.next.sx)}
      >
        {props.next.icon}
      </button>
      <button
        type="button"
        aria-label="Close"
        onClick={() => props.onClose()}
        {...stylex.attrs(props.close.sx)}
      >
        {props.close.icon}
      </button>
    </>
  );
}
