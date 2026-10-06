import * as stylex from "@stylexjs/stylex";
import { ArrowRight } from "lucide-react";

import type { AboutPageProps } from "../../index";
import { Cast } from "./cast";
import { Dial } from "./dial";
import { Gnomon } from "./gnomon";
import { ui } from "./shared";
import { clock, SECTION_HOURS } from "./sun";
import { bp, face, sun, tone } from "./tokens.stylex";

const TITLE = "与泛成同行";
const END = clock(SECTION_HOURS.closing);

const styles = stylex.create({
  section: {
    paddingBottom: { default: 112, [bp.desktop]: 160 },
    "--gfs": sun.closingFont,
    "--gh": "calc(var(--gfs) * 5.3)",
  },
  layout: {
    rowGap: 40,
    paddingTop: { default: 20, [bp.desktop]: 24 },
    borderTopWidth: 1,
    borderTopStyle: "solid",
    borderTopColor: tone.line,
  },
  comp: {
    gridColumn: "1 / -1",
    gridRow: "1",
    position: "relative",
    height: "calc(var(--gh) * 1.86)",
    marginTop: { default: 40, [bp.desktop]: 72 },
  },
  anchor: {
    position: "absolute",
    top: 0,
    left: {
      default: "calc(50% - var(--gh) * 0.5)",
      [bp.tablet]: "calc(50% - var(--gh) * 0.3)",
      [bp.desktop]: "calc(50% - var(--gh) * 0.55)",
    },
    marginLeft: "calc(var(--gfs) * -0.5)",
  },
  text: {
    gridColumn: { default: "1 / -1", [bp.desktop]: "10 / span 3" },
    gridRow: { default: "2", [bp.desktop]: "1" },
    alignSelf: "start",
    marginTop: { default: 0, [bp.desktop]: 72 },
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    gap: 28,
  },
  time: {
    display: "flex",
    alignItems: "baseline",
    gap: 8,
    margin: 0,
    fontFamily: face.serif,
    color: tone.navy,
  },
  digits: {
    fontSize: { default: 48, [bp.desktop]: 64 },
    lineHeight: 0.9,
  },
  half: {
    fontStyle: "italic",
    fontSize: 20,
    color: tone.quiet,
  },
  line: {
    margin: 0,
    fontFamily: face.sans,
    fontSize: { default: 18, [bp.desktop]: 21 },
    fontWeight: 500,
    lineHeight: 1.7,
    color: tone.ink,
    maxWidth: "20em",
    textWrap: "pretty",
  },
  button: {
    position: "relative",
    marginTop: 12,
    padding: 0,
    borderWidth: 0,
    backgroundColor: "transparent",
    cursor: "pointer",
  },
  buttonFace: {
    position: "relative",
    zIndex: 1,
    display: "flex",
    alignItems: "center",
    gap: 14,
    paddingBlock: 18,
    paddingInline: "28px 24px",
    fontFamily: face.sans,
    fontSize: 16,
    fontWeight: 500,
    color: "#ffffff",
    backgroundColor: { default: tone.navy, ":hover": tone.blue },
    transitionProperty: "background-color",
    transitionDuration: "200ms",
  },
});

export function Closing({ onNavigateHome }: AboutPageProps) {
  return (
    <section
      aria-labelledby="oos1t-closing"
      data-hour={SECTION_HOURS.closing}
      {...stylex.props(ui.section, ui.shell, styles.section)}
    >
      <div {...stylex.props(ui.grid, styles.layout)}>
        <div {...stylex.props(styles.comp)}>
          <div {...stylex.props(styles.anchor)}>
            <Gnomon text={TITLE} id="oos1t-closing" level={2}>
              <Dial dayOnly />
            </Gnomon>
          </div>
        </div>
        <div {...stylex.props(styles.text)}>
          <p {...stylex.props(styles.time)}>
            <span {...stylex.props(styles.digits)}>{END.time}</span>
            <span lang="en" {...stylex.props(styles.half)}>
              {END.half}
            </span>
          </p>
          <p {...stylex.props(styles.line)}>从上午九时到午后一时，日影走过了泛成的每一面。</p>
          <button
            type="button"
            onClick={() => onNavigateHome("contact")}
            {...stylex.props(styles.button, ui.focus)}
          >
            <Cast lift={28} />
            <span {...stylex.props(styles.buttonFace)}>
              联系我们
              <ArrowRight size={18} strokeWidth={1.5} aria-hidden="true" />
            </span>
          </button>
        </div>
      </div>
    </section>
  );
}
