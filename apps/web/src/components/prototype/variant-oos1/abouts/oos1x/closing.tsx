import * as stylex from "@stylexjs/stylex";
import { ArrowRight } from "@fenchem-lp/ui/components/lucide";

import type { AboutPageProps } from "../../index";
import { AT_REST } from "./counterweight";
import { Pair } from "./pair";
import { type, ui } from "./shared";
import { bp, face, grid, scale, tone } from "./tokens.stylex";

const CLOSING_LINES = ["平衡，", "从一次对话开始。"] as const;

const styles = stylex.create({
  section: {
    paddingTop: { default: 56, [bp.wide]: 120 },
    paddingBottom: { default: 24, [bp.wide]: 64 },
  },
  title: {
    fontSize: "clamp(30px, 3.9vw, 56px)",
    lineHeight: 1.22,
    letterSpacing: "0.04em",
  },
  line: {
    display: "block",
  },
  english: {
    marginTop: { default: 12, [bp.wide]: 18 },
    fontSize: "clamp(20px, 1.67vw, 24px)",
  },
  action: {
    display: "inline-flex",
    alignItems: "center",
    columnGap: "0.4em",
    padding: 0,
    borderWidth: 0,
    backgroundColor: "transparent",
    fontFamily: face.sans,
    fontSize: scale.heading,
    fontWeight: 900,
    lineHeight: 1,
    letterSpacing: "0.06em",
    color: tone.navy,
    cursor: "pointer",
    textAlign: "start",
  },
  arrow: {
    flexShrink: 0,
    width: "0.9em",
    height: "0.9em",
    transform: {
      default: "none",
      [stylex.when.ancestor(":hover")]: { default: "none", [bp.hoverMotion]: "translateX(8px)" },
    },
    transitionProperty: "transform",
    transitionDuration: "420ms",
    transitionTimingFunction: grid.ease,
  },
});

export function Closing(props: AboutPageProps) {
  return (
    <section aria-labelledby="oos1x-closing" {...stylex.attrs(styles.section)}>
      <Pair
        lever={AT_REST}
        loadLine
        load={
          <div>
            <button
              type="button"
              onClick={() => props.onNavigateHome("contact")}
              {...stylex.attrs(styles.action, ui.focusRing, stylex.defaultMarker())}
            >
              联系泛成
              <ArrowRight strokeWidth={2.75} aria-hidden="true" {...stylex.attrs(styles.arrow)} />
            </button>
          </div>
        }
      >
        <h2 id="oos1x-closing" {...stylex.attrs(type.light, styles.title)}>
          {CLOSING_LINES.map((line) => (
            <span {...stylex.attrs(styles.line)}>{line}</span>
          ))}
        </h2>
        <p lang="en" {...stylex.attrs(type.serif, styles.english)}>
          Balance begins with a conversation.
        </p>
      </Pair>
    </section>
  );
}
