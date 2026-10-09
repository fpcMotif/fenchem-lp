import * as stylex from "@stylexjs/stylex";
import { ArrowRight } from "lucide-react";

import { SectionHead } from "./shared";
import { ui } from "./shared-values";
import { bp, face, motion, space, tone } from "./tokens.stylex";

const styles = stylex.create({
  closing: {
    paddingTop: { default: 104, [bp.tablet]: 140, [bp.desktop]: 184 },
    paddingBottom: { default: 72, [bp.tablet]: 104, [bp.desktop]: 144 },
  },
  grid: {
    display: "grid",
    gridTemplateColumns: { default: "minmax(0, 1fr)", [bp.desktop]: "repeat(12, minmax(0, 1fr))" },
    columnGap: 24,
    alignItems: "center",
  },
  copy: {
    gridColumn: { default: "auto", [bp.desktop]: "1 / 7" },
  },
  door: {
    gridColumn: { default: "auto", [bp.desktop]: "7 / 13" },
    display: "block",
    textDecoration: "none",
    color: "inherit",
  },
  mat: {
    display: "block",
    boxSizing: "border-box",
    paddingTop: space.mat,
    paddingInline: space.mat,
    paddingBottom: space.matFoot,
    backgroundColor: tone.page,
  },
  raised: {
    boxShadow:
      "0 0 0 1px rgba(26, 26, 26, 0.07), 0 1px 1px rgba(11, 42, 92, 0.04), 0 30px 60px -44px rgba(11, 42, 92, 0.32)",
  },
  inner: {
    paddingBottom: space.mat,
  },
  bevel: {
    display: "block",
    padding: 4,
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: {
      default: tone.bevelOuter,
      [stylex.when.ancestor(":hover")]: tone.navy,
      [stylex.when.ancestor(":focus-visible")]: tone.navy,
    },
    backgroundColor: tone.page,
    transitionProperty: "border-color",
    transitionDuration: "260ms",
    transitionTimingFunction: motion.ease,
  },
  bevelInner: {
    transitionDelay: "90ms",
  },
  coreLine: {
    display: "block",
    boxShadow: "0 0 0 1px rgba(11, 42, 92, 0.18)",
  },
  core: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 16,
    minHeight: { default: 72, [bp.tablet]: 96, [bp.desktop]: 120 },
    paddingInline: { default: 20, [bp.desktop]: 32 },
    backgroundColor: {
      default: tone.navy,
      [stylex.when.ancestor(":hover")]: tone.blue,
      [stylex.when.ancestor(":focus-visible")]: tone.blue,
    },
    color: "#ffffff",
    transitionProperty: "background-color",
    transitionDuration: "260ms",
    transitionDelay: "180ms",
  },
  coreLabel: {
    display: "flex",
    alignItems: "baseline",
    gap: 14,
    fontFamily: face.sans,
    fontSize: { default: 18, [bp.desktop]: 22 },
    fontWeight: 500,
    letterSpacing: "0.08em",
    whiteSpace: "nowrap",
  },
  coreEnglish: {
    fontFamily: face.serif,
    fontStyle: "italic",
    fontWeight: 400,
    fontSize: { default: 20, [bp.desktop]: 24 },
    letterSpacing: 0,
    color: "rgba(255, 255, 255, 0.78)",
  },
  arrow: {
    flexShrink: 0,
    transform: {
      default: "none",
      [stylex.when.ancestor(":hover")]: { default: "none", [bp.hoverMotion]: "translateX(6px)" },
    },
    transitionProperty: "transform",
    transitionDuration: "260ms",
    transitionTimingFunction: motion.ease,
  },
});

export function Closing({ onNavigateHome }: { onNavigateHome: (hash?: string) => void }) {
  return (
    <section aria-labelledby="oos1b-closing" {...stylex.props(ui.shell, styles.closing)}>
      <div {...stylex.props(styles.grid)}>
        <div {...stylex.props(styles.copy)}>
          <SectionHead
            id="oos1b-closing"
            index={7}
            eyebrow="Contact"
            title="联系我们"
            note="The next frame is yours."
          />
        </div>
        <a
          href="#contact"
          onClick={(event) => {
            event.preventDefault();
            onNavigateHome("contact");
          }}
          {...stylex.props(styles.door, ui.focusRing, stylex.defaultMarker())}
        >
          <span {...stylex.props(styles.mat, styles.raised)}>
            <span {...stylex.props(styles.bevel)}>
              <span {...stylex.props(styles.coreLine)}>
                <span {...stylex.props(styles.mat, styles.inner)}>
                  <span {...stylex.props(styles.bevel, styles.bevelInner)}>
                    <span {...stylex.props(styles.coreLine)}>
                      <span {...stylex.props(styles.core)}>
                        <span {...stylex.props(styles.coreLabel)}>
                          联系泛成
                          <span lang="en" {...stylex.props(styles.coreEnglish)}>
                            Get in touch
                          </span>
                        </span>
                        <ArrowRight
                          size={22}
                          strokeWidth={1.5}
                          aria-hidden="true"
                          {...stylex.props(styles.arrow)}
                        />
                      </span>
                    </span>
                  </span>
                </span>
              </span>
            </span>
          </span>
        </a>
      </div>
    </section>
  );
}
