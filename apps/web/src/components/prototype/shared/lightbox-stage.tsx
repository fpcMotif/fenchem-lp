import * as stylex from "@stylexjs/stylex";
import type { StyleXStyles } from "@stylexjs/stylex";
import type { ReactNode } from "react";

const styles = stylex.create({
  stage: { isolation: "isolate" },
  backdrop: {
    position: "absolute",
    inset: 0,
    zIndex: -1,
    width: "100%",
    height: "100%",
    padding: 0,
    borderWidth: 0,
    backgroundColor: "transparent",
    cursor: "pointer",
  },
});

export function LightboxStage({
  children,
  onClose,
  sx,
}: {
  children: ReactNode;
  onClose: () => void;
  sx?: StyleXStyles;
}) {
  return (
    <div {...stylex.props(styles.stage, sx)}>
      <button
        type="button"
        tabIndex={-1}
        aria-label="关闭照片"
        onClick={onClose}
        {...stylex.props(styles.backdrop)}
      />
      {children}
    </div>
  );
}
