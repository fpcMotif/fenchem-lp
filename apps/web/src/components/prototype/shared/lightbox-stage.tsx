import * as stylex from "@stylexjs/stylex";
import type { StyleXStyles } from "@stylexjs/stylex";
import type { JSX } from "@solidjs/web";

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

export function LightboxStage(props: {
  children: JSX.Element;
  onClose: () => void;
  sx?: StyleXStyles;
}) {
  return (
    <div {...stylex.attrs(styles.stage, props.sx)}>
      <button
        type="button"
        tabindex={-1}
        aria-label="Close photo"
        onClick={() => props.onClose()}
        {...stylex.attrs(styles.backdrop)}
      />
      {props.children}
    </div>
  );
}
