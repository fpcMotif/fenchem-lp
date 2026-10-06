import * as stylex from "@stylexjs/stylex";
import { ArrowRight } from "lucide-react";

import { ABOUT_BANNER } from "../../about-data";
import { SectionHead } from "./section-head";
import { ui } from "./shared";
import { bp, chrome, face, tone } from "./tokens.stylex";

const styles = stylex.create({
  section: {
    backgroundColor: tone.mist,
    paddingTop: { default: 88, [bp.tablet]: 112, [bp.desktop]: 144 },
    paddingBottom: { default: 88, [bp.tablet]: 112, [bp.desktop]: 144 },
  },
  copy: {
    gridColumn: { default: "1 / -1", [bp.desktop]: "1 / 9" },
  },
  line: {
    margin: 0,
    marginTop: { default: 24, [bp.desktop]: 32 },
    fontFamily: face.sans,
    fontWeight: 300,
    fontSize: { default: 34, [bp.tablet]: 48, [bp.laptop]: 52, [bp.wide]: 64 },
    lineHeight: 1.2,
    letterSpacing: "0.02em",
    color: tone.ink,
    fontFeatureSettings: '"palt"',
  },
  note: {
    margin: 0,
    marginTop: { default: 16, [bp.desktop]: 20 },
    fontSize: { default: 21, [bp.desktop]: 26 },
    lineHeight: 1.3,
    color: tone.body,
  },
  actions: {
    gridColumn: { default: "1 / -1", [bp.desktop]: "9 / 13" },
    alignSelf: "end",
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    gap: 20,
    marginTop: { default: 40, [bp.desktop]: 0 },
  },
  primary: {
    position: "relative",
    display: "inline-flex",
    alignItems: "center",
    gap: 14,
    paddingBlock: 10,
    borderWidth: 0,
    backgroundColor: "transparent",
    fontFamily: face.sans,
    fontSize: { default: 20, [bp.desktop]: 22 },
    fontWeight: 500,
    letterSpacing: "0.06em",
    color: tone.blue,
    cursor: "pointer",
    "::after": {
      content: '""',
      position: "absolute",
      left: 0,
      right: 0,
      bottom: 0,
      height: 1,
      backgroundColor: tone.blue,
      transformOrigin: "left center",
      transform: {
        default: "scaleX(0.32)",
        [stylex.when.ancestor(":hover")]: "scaleX(1)",
      },
      transitionProperty: "transform",
      transitionDuration: "500ms",
      transitionTimingFunction: chrome.ease,
    },
  },
  secondary: {
    paddingBlock: 6,
    borderWidth: 0,
    backgroundColor: "transparent",
    fontFamily: face.sans,
    fontSize: 16,
    letterSpacing: "0.06em",
    color: { default: tone.body, ":hover": tone.navy },
    cursor: "pointer",
  },
});

export function Closing({ onNavigateHome }: { onNavigateHome: (hash?: string) => void }) {
  return (
    <section aria-labelledby="oos1o-closing" {...stylex.props(styles.section)}>
      <div {...stylex.props(ui.shell, ui.grid)}>
        <div {...stylex.props(styles.copy)}>
          <SectionHead id="oos1o-closing" label="Contact" title="联系泛成" quiet />
          <p {...stylex.props(styles.line)}>这一圈，仍在生长。</p>
          <p lang="en" {...stylex.props(ui.serif, styles.note)}>
            {ABOUT_BANNER.tagline}
          </p>
        </div>
        <div {...stylex.props(styles.actions)}>
          <button
            type="button"
            onClick={() => onNavigateHome("contact")}
            {...stylex.props(styles.primary, ui.focusRing, stylex.defaultMarker())}
          >
            联系我们
            <ArrowRight size={20} strokeWidth={1.5} aria-hidden="true" />
          </button>
          <button
            type="button"
            onClick={() => onNavigateHome()}
            {...stylex.props(styles.secondary, ui.focusRing)}
          >
            返回首页
          </button>
        </div>
      </div>
    </section>
  );
}
