import * as stylex from "@stylexjs/stylex";
import type { StyleXStyles } from "@stylexjs/stylex";
import type { ReactNode } from "react";
import { useEffect, useRef } from "react";

export function LightboxControls({
  onStep,
  onClose,
  previous,
  next,
  close,
}: {
  onStep: (delta: number) => void;
  onClose: () => void;
  previous: { icon: ReactNode; sx: StyleXStyles };
  next: { icon: ReactNode; sx: StyleXStyles };
  close: { icon: ReactNode; sx: StyleXStyles };
}) {
  const previousRef = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    queueMicrotask(() => previousRef.current?.focus());
  }, []);

  return (
    <>
      <button
        ref={previousRef}
        type="button"
        aria-label="上一张"
        onClick={() => onStep(-1)}
        {...stylex.props(previous.sx)}
      >
        {previous.icon}
      </button>
      <button
        type="button"
        aria-label="下一张"
        onClick={() => onStep(1)}
        {...stylex.props(next.sx)}
      >
        {next.icon}
      </button>
      <button type="button" aria-label="关闭" onClick={onClose} {...stylex.props(close.sx)}>
        {close.icon}
      </button>
    </>
  );
}
