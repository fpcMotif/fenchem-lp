import * as stylex from "@stylexjs/stylex";
import { ArrowRight } from "lucide-react";
import { useState } from "react";

import { MixedSpot } from "./band";
import { SectionHead } from "./shared";
import { ui } from "./shared-values";
import { bp, chrome, face, tone } from "./tokens.stylex";

const styles = stylex.create({
  section: {
    paddingBottom: { default: 88, [bp.tablet]: 120, [bp.desktop]: 160 },
  },
  head: {
    gridColumn: { default: "1 / -1", [bp.desktop]: "1 / 6", [bp.wide]: "1 / 5" },
  },
  body: {
    gridColumn: { default: "1 / -1", [bp.desktop]: "6 / 10", [bp.wide]: "5 / 10" },
    marginTop: { default: 28, [bp.desktop]: 44 },
  },
  lead: {
    margin: 0,
    maxWidth: "24em",
    fontFamily: face.sans,
    fontSize: { default: 17, [bp.desktop]: 20 },
    lineHeight: 1.9,
    color: tone.ink,
    textWrap: "pretty",
  },
  actions: {
    display: "flex",
    flexWrap: "wrap",
    alignItems: "center",
    gap: { default: 16, [bp.desktop]: 28 },
    marginTop: { default: 28, [bp.desktop]: 40 },
  },
  primary: {
    display: "inline-flex",
    alignItems: "center",
    gap: 12,
    minHeight: 52,
    paddingInline: 24,
    borderWidth: 0,
    borderRadius: 2,
    backgroundColor: { default: tone.navy, ":hover": tone.blue },
    color: "#ffffff",
    fontFamily: face.sans,
    fontSize: 16,
    fontWeight: 500,
    letterSpacing: "0.04em",
    cursor: "pointer",
    transitionProperty: "background-color",
    transitionDuration: "200ms",
  },
  secondary: {
    paddingBlock: 6,
    paddingInline: 0,
    borderWidth: 0,
    borderBottomWidth: 1,
    borderBottomStyle: "solid",
    borderBottomColor: { default: tone.rule, ":hover": tone.ink },
    backgroundColor: "transparent",
    color: tone.ink,
    fontFamily: face.sans,
    fontSize: 16,
    cursor: "pointer",
    transitionProperty: "border-color",
    transitionDuration: "200ms",
  },
  plateCol: {
    gridColumn: { default: "1 / 3", [bp.tablet]: "6 / -1", [bp.desktop]: "10 / 12" },
    marginTop: { default: 48, [bp.desktop]: 0 },
  },
  plate: {
    position: "relative",
    height: { default: 220, [bp.desktop]: 300 },
    backgroundColor: tone.plate,
    boxShadow: "inset 0 0 0 1px rgba(11, 42, 92, 0.14)",
    borderRadius: 2,
  },
  front: {
    position: "absolute",
    top: 40,
    left: 10,
    right: 10,
    height: 1,
    backgroundImage: "linear-gradient(90deg, rgba(26, 26, 26, 0.36) 50%, rgba(26, 26, 26, 0) 50%)",
    backgroundSize: "6px 1px",
  },
  origin: {
    position: "absolute",
    bottom: 64,
    left: 10,
    right: 10,
    height: 1,
    backgroundColor: tone.pencil,
  },
  slot: {
    position: "absolute",
    left: "50%",
    bottom: 64,
    width: 64,
    height: 30,
    marginLeft: -32,
    marginBottom: -15,
  },
  outline: {
    position: "absolute",
    inset: -6,
    borderWidth: 1,
    borderStyle: "dashed",
    borderColor: tone.pencil,
    borderRadius: "50%",
  },
  sample: {
    position: "absolute",
    inset: 0,
    opacity: 0,
    transform: "scale(0.3)",
    transitionProperty: "opacity, transform",
    transitionDuration: { default: "700ms", [bp.motionReduce]: "0ms" },
    transitionTimingFunction: chrome.ease,
  },
  sampleOn: {
    opacity: 1,
    transform: "scale(1)",
  },
  laneWord: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 12,
    margin: 0,
    textAlign: "center",
    fontFamily: face.serif,
    fontStyle: "italic",
    fontSize: 16,
    color: tone.body,
  },
});

export function Closing({ onNavigateHome }: { onNavigateHome: (hash?: string) => void }) {
  const [primed, setPrimed] = useState(false);

  return (
    <section aria-labelledby="oos1w-closing" {...stylex.props(ui.section, styles.section)}>
      <div {...stylex.props(ui.shell)}>
        <div {...stylex.props(ui.grid, ui.ruled)}>
          <div {...stylex.props(styles.head)}>
            <SectionHead
              num="07"
              word="Correspondence"
              title={["留一条泳道，", "给你的项目。"]}
              titleId="oos1w-closing"
            />
          </div>

          <div {...stylex.props(styles.body)}>
            <p {...stylex.props(styles.lead)}>原料与解决方案的需求，欢迎与我们联系。</p>
            <div {...stylex.props(styles.actions)}>
              <button
                type="button"
                onClick={() => onNavigateHome("contact")}
                onPointerEnter={() => setPrimed(true)}
                onPointerLeave={() => setPrimed(false)}
                onFocus={() => setPrimed(true)}
                onBlur={() => setPrimed(false)}
                {...stylex.props(styles.primary, ui.focusRing)}
              >
                联系我们
                <ArrowRight size={18} strokeWidth={1.5} aria-hidden="true" />
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

          <div aria-hidden="true" {...stylex.props(styles.plateCol)}>
            <div {...stylex.props(styles.plate)}>
              <span {...stylex.props(styles.front)} />
              <span {...stylex.props(styles.origin)} />
              <span {...stylex.props(styles.slot)}>
                <span {...stylex.props(styles.outline)} />
                <span {...stylex.props(styles.sample, primed && styles.sampleOn)}>
                  <MixedSpot />
                </span>
              </span>
              <p lang="en" {...stylex.props(styles.laneWord)}>
                your sample
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
