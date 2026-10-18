import { colors } from "@fenchem-lp/ui/tokens.stylex";
import * as stylex from "@stylexjs/stylex";
import { Loader2 } from "@fenchem-lp/ui/components/lucide";

const spin = stylex.keyframes({
  from: {
    transform: "rotate(0deg)",
  },
  to: {
    transform: "rotate(360deg)",
  },
});

const styles = stylex.create({
  container: {
    display: "flex",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
    paddingTop: "2rem",
  },
  spinner: {
    animationName: spin,
    animationDuration: "1s",
    animationTimingFunction: "linear",
    animationIterationCount: "infinite",
    color: colors.foreground,
  },
});

export default function Loader() {
  return (
    <div {...stylex.attrs(styles.container)}>
      <Loader2 {...stylex.attrs(styles.spinner)} />
    </div>
  );
}
