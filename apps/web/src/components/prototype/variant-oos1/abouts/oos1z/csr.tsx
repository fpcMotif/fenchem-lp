import * as stylex from "@stylexjs/stylex";
import { Factory, Leaf, Recycle, type LucideIcon } from "lucide-react";

import { ABOUT_CSR } from "../../about-data";
import { RoomSign } from "./room-sign";
import { LAKE, PLACE, sectionTitle, ui } from "./shared";
import { bp, chrome, face, tone } from "./tokens.stylex";

const ICONS: Record<(typeof ABOUT_CSR.outcomes)[number]["icon"], LucideIcon> = {
  factory: Factory,
  recycle: Recycle,
  leaf: Leaf,
};

const styles = stylex.create({
  section: {
    position: "relative",
    zIndex: 0,
    scrollMarginTop: 80,
  },
  lakeWrap: {
    marginTop: { default: 0, [bp.corridor]: chrome.lakeLift },
    height: { default: "auto", [bp.corridor]: chrome.lakeWrap },
  },
  lake: {
    position: { default: "relative", [bp.corridor]: "sticky" },
    top: chrome.header,
    margin: 0,
    overflow: "hidden",
    height: {
      default: "min(76svh, 620px)",
      [bp.tablet]: "72svh",
      [bp.desktop]: chrome.stage,
    },
    backgroundColor: tone.tint,
  },
  dock: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: { default: 16, [bp.desktop]: 28 },
    display: "flex",
    justifyContent: "center",
    paddingInline: 16,
  },
  plate: {
    display: "flex",
    alignItems: "center",
    flexWrap: "wrap",
    justifyContent: "center",
    columnGap: 16,
    rowGap: 2,
    minHeight: 48,
    boxSizing: "border-box",
    paddingBlock: 8,
    paddingInline: 20,
    backgroundColor: tone.paper,
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: tone.line,
  },
  number: {
    fontSize: 20,
    lineHeight: 1,
    color: tone.navy,
  },
  title: {
    fontFamily: face.sans,
    fontSize: 15,
    color: tone.ink,
  },
  meta: {
    fontSize: 16,
    color: tone.body,
  },
  wall: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    textAlign: "center",
  },
  statement: {
    margin: 0,
    marginTop: { default: 48, [bp.desktop]: 72 },
    fontFamily: face.sans,
    fontWeight: 300,
    fontSize: { default: 30, [bp.tablet]: 44, [bp.desktop]: 58 },
    lineHeight: 1.5,
    letterSpacing: "0.04em",
    color: tone.navy,
    fontFeatureSettings: '"palt"',
  },
  line: {
    display: "block",
  },
  desc: {
    margin: 0,
    marginTop: { default: 28, [bp.desktop]: 36 },
    maxWidth: "30em",
    fontFamily: face.sans,
    fontSize: { default: 15, [bp.desktop]: 16 },
    lineHeight: 2,
    color: tone.body,
  },
  balanced: {
    display: "block",
    textWrap: "balance",
  },
  outcomes: {
    display: "flex",
    flexDirection: { default: "column", [bp.tablet]: "row", [bp.desktop]: "row" },
    alignItems: "center",
    margin: 0,
    marginTop: { default: 48, [bp.desktop]: 64 },
    padding: 0,
    listStyleType: "none",
    borderTopWidth: 1,
    borderTopStyle: "solid",
    borderTopColor: tone.line,
  },
  outcome: {
    display: "flex",
    alignItems: "center",
    gap: 12,
    paddingTop: { default: 20, [bp.desktop]: 28 },
    paddingInline: { default: 0, [bp.tablet]: 24, [bp.desktop]: 32 },
    fontFamily: face.sans,
    fontSize: { default: 16, [bp.desktop]: 17 },
    color: tone.ink,
  },
  icon: {
    color: tone.navy,
    flexShrink: 0,
  },
});

export function Csr() {
  return (
    <section id="about-csr" aria-labelledby="oos1z-csr" {...stylex.props(styles.section)}>
      <div {...stylex.props(styles.lakeWrap)}>
        <figure {...stylex.props(styles.lake)}>
          <img
            src={ABOUT_CSR.image}
            alt={ABOUT_CSR.imageAlt}
            loading="lazy"
            decoding="async"
            {...stylex.props(ui.fill)}
          />
          <figcaption {...stylex.props(styles.dock)}>
            <span {...stylex.props(styles.plate)}>
              <span lang="en" {...stylex.props(ui.number, styles.number)}>
                Nº {LAKE.number}
              </span>
              <span {...stylex.props(styles.title)}>{LAKE.title}</span>
              <span lang="en" {...stylex.props(ui.italic, styles.meta)}>
                {LAKE.english}, {PLACE}
              </span>
            </span>
          </figcaption>
        </figure>
      </div>
      <div {...stylex.props(ui.shell, ui.room)}>
        <div {...stylex.props(styles.wall)}>
          <RoomSign
            numeral="III"
            id="oos1z-csr"
            title={sectionTitle("about-csr")}
            english="Responsibility"
          />
          <p {...stylex.props(styles.statement)}>
            {ABOUT_CSR.statement.map((line) => (
              <span key={line} {...stylex.props(styles.line)}>
                {line}
              </span>
            ))}
          </p>
          <p {...stylex.props(styles.desc)}>
            <span {...stylex.props(styles.balanced)}>{ABOUT_CSR.desc}</span>
          </p>
          <ul {...stylex.props(styles.outcomes)}>
            {ABOUT_CSR.outcomes.map((outcome) => {
              const Icon = ICONS[outcome.icon];
              return (
                <li key={outcome.icon} {...stylex.props(styles.outcome)}>
                  <Icon
                    size={22}
                    strokeWidth={1.25}
                    aria-hidden="true"
                    {...stylex.props(styles.icon)}
                  />
                  {outcome.title}
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
