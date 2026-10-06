import * as stylex from "@stylexjs/stylex";

import { ABOUT_CSR } from "../../about-data";
import { SheetHeader } from "./sheet-header";
import { ui } from "./shared";
import { bp, face, tone } from "./tokens.stylex";

const ENGLISH = ["Energy", "Material", "Carbon"] as const;
const TARGET = { x: 59, y: 41 } as const;
const ROW_CENTERS = [100 / 6, 50, 500 / 6] as const;

const styles = stylex.create({
  intro: {
    marginTop: { default: 32, [bp.tablet]: 48, [bp.desktop]: 64 },
  },
  statement: {
    gridColumn: { default: "1 / -1", [bp.tabletUp]: "1 / 9" },
    margin: 0,
    fontFamily: face.sans,
    fontSize: { default: 26, [bp.tablet]: 34, [bp.desktop]: 40 },
    fontWeight: 500,
    lineHeight: 1.45,
    letterSpacing: "0.03em",
    color: tone.navy,
  },
  line: {
    display: "block",
  },
  desc: {
    gridColumn: { default: "1 / -1", [bp.tabletUp]: "9 / 13" },
    alignSelf: "end",
    margin: 0,
    marginTop: { default: 16, [bp.tabletUp]: 0 },
    fontFamily: face.sans,
    fontSize: { default: 16, [bp.desktop]: 17 },
    lineHeight: 1.85,
    color: tone.body,
    textWrap: "pretty",
  },
  assembly: {
    display: "flex",
    flexDirection: { default: "column", [bp.tabletUp]: "row" },
    marginTop: { default: 32, [bp.tablet]: 48, [bp.desktop]: 64 },
  },
  photo: {
    position: "relative",
    flexShrink: 0,
    width: { default: "100%", [bp.tabletUp]: "62%" },
    aspectRatio: "3 / 2",
    margin: 0,
    backgroundColor: tone.tint,
  },
  image: {
    display: "block",
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },
  overlay: {
    position: "absolute",
    inset: 0,
    display: { default: "none", [bp.tabletUp]: "block" },
    width: "100%",
    height: "100%",
    overflow: "visible",
  },
  target: {
    position: "absolute",
    width: 16,
    height: 16,
    marginTop: -8,
    marginLeft: -8,
    boxSizing: "border-box",
    borderRadius: "50%",
    borderWidth: 2,
    borderStyle: "solid",
    borderColor: "#ffffff",
    backgroundColor: tone.navy,
    boxShadow: "0 0 0 1px rgba(11, 42, 92, 0.45), 0 0 0 7px rgba(255, 255, 255, 0.35)",
  },
  parts: {
    display: "flex",
    flexDirection: "column",
    flexGrow: 1,
    margin: 0,
    padding: 0,
    listStyleType: "none",
    borderTopWidth: { default: 1.5, [bp.tabletUp]: 0 },
    borderTopStyle: "solid",
    borderTopColor: tone.navy,
  },
  part: {
    display: "flex",
    alignItems: "center",
    flexGrow: { default: 0, [bp.tabletUp]: 1 },
    flexBasis: { default: "auto", [bp.tabletUp]: 0 },
    gap: { default: 14, [bp.desktop]: 18 },
    paddingBlock: { default: 16, [bp.tabletUp]: 0 },
    borderBottomWidth: { default: 1, [bp.tabletUp]: 0 },
    borderBottomStyle: "solid",
    borderBottomColor: tone.rule,
  },
  shoulder: {
    display: { default: "none", [bp.tabletUp]: "block" },
    flexShrink: 0,
    width: { default: 0, [bp.tablet]: 24, [bp.desktop]: 48 },
    height: 1,
    backgroundColor: tone.line,
  },
  partText: {
    display: "flex",
    flexDirection: "column",
    gap: 4,
  },
  partTitle: {
    margin: 0,
    fontFamily: face.sans,
    fontSize: { default: 21, [bp.tablet]: 20, [bp.desktop]: 26 },
    fontWeight: 500,
    lineHeight: 1.35,
    color: tone.ink,
  },
});

const CASED = { fill: "none", vectorEffect: "non-scaling-stroke" } as const;

export function Csr() {
  return (
    <section
      id="about-csr"
      aria-labelledby="oos1m-csr"
      {...stylex.props(ui.shell, ui.section, ui.anchor)}
    >
      <SheetHeader
        sheet={4}
        title={ABOUT_CSR.title}
        english="One site, three outcomes"
        titleId="oos1m-csr"
      />
      <div {...stylex.props(ui.grid, styles.intro)}>
        <p {...stylex.props(styles.statement)}>
          {ABOUT_CSR.statement.map((line) => (
            <span key={line} {...stylex.props(styles.line)}>
              {line}
            </span>
          ))}
        </p>
        <p {...stylex.props(styles.desc)}>{ABOUT_CSR.desc}</p>
      </div>
      <div {...stylex.props(styles.assembly)}>
        <figure {...stylex.props(styles.photo)}>
          <img
            src={ABOUT_CSR.image}
            alt={ABOUT_CSR.imageAlt}
            loading="lazy"
            decoding="async"
            {...stylex.props(styles.image)}
          />
          <svg
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            aria-hidden="true"
            {...stylex.props(styles.overlay)}
          >
            {ROW_CENTERS.map((y) => (
              <g key={y}>
                <path
                  d={`M${TARGET.x} ${TARGET.y}L100 ${y}`}
                  {...CASED}
                  stroke="rgba(11, 42, 92, 0.35)"
                  strokeWidth={3}
                />
                <path
                  d={`M${TARGET.x} ${TARGET.y}L100 ${y}`}
                  {...CASED}
                  stroke="#ffffff"
                  strokeWidth={1}
                />
              </g>
            ))}
          </svg>
          <span
            aria-hidden="true"
            style={{ left: `${TARGET.x}%`, top: `${TARGET.y}%` }}
            {...stylex.props(styles.target)}
          />
        </figure>
        <ol {...stylex.props(styles.parts)}>
          {ABOUT_CSR.outcomes.map((outcome, index) => (
            <li key={outcome.title} {...stylex.props(styles.part)}>
              <span aria-hidden="true" {...stylex.props(styles.shoulder)} />
              <span aria-hidden="true" {...stylex.props(ui.balloon)}>
                {index + 1}
              </span>
              <span {...stylex.props(styles.partText)}>
                <span lang="en" {...stylex.props(ui.label)}>
                  {ENGLISH[index]}
                </span>
                <span {...stylex.props(styles.partTitle)}>{outcome.title}</span>
              </span>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
