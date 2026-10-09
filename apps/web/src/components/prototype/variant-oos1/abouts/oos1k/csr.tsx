import * as stylex from "@stylexjs/stylex";

import { ABOUT_CSR } from "../../about-data";
import { ChartHeading, useDusk } from "./shared";
import { ui } from "./shared-values";
import { bp, face, sky } from "./tokens.stylex";

const BELT_RISE = [0, 7, 14] as const;
const BELT_CENTER = 3.5;
const NUMERALS = ["i", "ii", "iii"] as const;

const styles = stylex.create({
  grid: {
    display: "grid",
    gridTemplateColumns: { default: "minmax(0, 1fr)", [bp.desktop]: "repeat(12, minmax(0, 1fr))" },
    columnGap: 24,
    rowGap: { default: 48, [bp.tablet]: 64 },
    alignItems: "center",
  },
  plate: {
    gridColumn: { default: "auto", [bp.desktop]: "1 / span 6" },
    gridRow: { default: "2", [bp.desktop]: "1" },
    margin: 0,
    padding: { default: 8, [bp.desktop]: 10 },
    backgroundColor: sky.navy,
    boxShadow: `inset 0 0 0 1px ${sky.hair}`,
  },
  image: {
    display: "block",
    width: "100%",
    height: "auto",
    aspectRatio: "3 / 2",
    objectFit: "cover",
    opacity: 0.92,
  },
  strip: {
    display: "flex",
    alignItems: "baseline",
    justifyContent: "space-between",
    gap: 12,
    paddingTop: { default: 10, [bp.desktop]: 12 },
    paddingBottom: 2,
    paddingInline: 2,
  },
  plateName: {
    color: sky.text,
  },
  numeral: {
    fontSize: 18,
    marginInlineStart: 4,
    color: sky.star,
  },
  plateCaption: {
    fontFamily: face.sans,
    fontSize: { default: 15, [bp.desktop]: 16 },
    letterSpacing: "0.06em",
    color: sky.star,
  },
  text: {
    gridColumn: { default: "auto", [bp.desktop]: "8 / span 5" },
    gridRow: { default: "1", [bp.desktop]: "1" },
    display: "flex",
    flexDirection: "column",
    gap: { default: 32, [bp.desktop]: 40 },
  },
  statement: {
    margin: 0,
    fontFamily: face.sans,
    fontSize: { default: 26, [bp.tablet]: 32, [bp.laptop]: 26, [bp.wide]: 32 },
    fontWeight: 500,
    lineHeight: 1.55,
    letterSpacing: "0.04em",
    color: sky.star,
  },
  line: {
    display: "block",
  },
  beltWrap: {
    position: "relative",
    paddingTop: 14,
  },
  belt: {
    position: "relative",
    display: "grid",
    gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
    margin: 0,
    padding: 0,
    listStyleType: "none",
  },
  beltLine: {
    position: "absolute",
    top: 14,
    left: "16.667%",
    width: "66.667%",
    height: 20,
    overflow: "visible",
  },
  beltStroke: {
    stroke: sky.tint,
    strokeOpacity: 0.4,
    strokeWidth: 1,
  },
  star: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 14,
    textAlign: "center",
  },
  point: {
    width: 7,
    height: 7,
    borderRadius: "50%",
    backgroundColor: sky.star,
  },
  outcome: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 4,
  },
  outcomeNumeral: {
    fontSize: 17,
    color: sky.faint,
  },
  outcomeTitle: {
    whiteSpace: "nowrap",
    fontFamily: face.sans,
    fontSize: { default: 15, [bp.desktop]: 17 },
    letterSpacing: "0.04em",
    color: sky.star,
  },
});

const rise = stylex.create({
  offset: (px: number) => ({ transform: `translateY(${-px}px)` }),
});

export function Csr() {
  const [beltRef, hidden] = useDusk<HTMLDivElement>();

  return (
    <section id="about-csr" aria-labelledby="oos1k-csr" {...stylex.props(ui.section, ui.shell)}>
      <div {...stylex.props(styles.grid)}>
        <figure {...stylex.props(styles.plate)}>
          <img
            src={ABOUT_CSR.image}
            alt={ABOUT_CSR.imageAlt}
            loading="lazy"
            decoding="async"
            {...stylex.props(styles.image)}
          />
          <figcaption {...stylex.props(styles.strip)}>
            <span lang="en" {...stylex.props(ui.label, styles.plateName)}>
              Plate
              <span {...stylex.props(ui.designation, styles.numeral)}>VIII</span>
            </span>
            <span {...stylex.props(styles.plateCaption)}>园区水景</span>
          </figcaption>
        </figure>

        <div {...stylex.props(styles.text)}>
          <ChartHeading
            id="oos1k-csr"
            numeral="IV"
            label="Responsibility"
            title={ABOUT_CSR.title}
            note="A belt of three stars"
          />
          <p {...stylex.props(styles.statement)}>
            {ABOUT_CSR.statement.map((line) => (
              <span key={line} {...stylex.props(styles.line)}>
                {line}
              </span>
            ))}
          </p>
          <p {...stylex.props(ui.body)}>{ABOUT_CSR.desc}</p>
          <div ref={beltRef} {...stylex.props(styles.beltWrap)}>
            <svg
              aria-hidden="true"
              viewBox="0 0 100 20"
              preserveAspectRatio="none"
              {...stylex.props(styles.beltLine, ui.dim, hidden && ui.dimHidden, ui.dimDelay(700))}
            >
              <line
                x1={0}
                y1={BELT_CENTER - BELT_RISE[0]}
                x2={100}
                y2={BELT_CENTER - BELT_RISE[2]}
                vectorEffect="non-scaling-stroke"
                {...stylex.props(styles.beltStroke)}
              />
            </svg>
            <ol {...stylex.props(styles.belt)}>
              {ABOUT_CSR.outcomes.map((outcome, index) => (
                <li
                  key={outcome.title}
                  {...stylex.props(
                    styles.star,
                    rise.offset(BELT_RISE[index]),
                    ui.dim,
                    hidden && ui.dimHidden,
                    ui.dimDelay(index * 220),
                  )}
                >
                  <span aria-hidden="true" {...stylex.props(styles.point)} />
                  <span {...stylex.props(styles.outcome)}>
                    <span
                      aria-hidden="true"
                      {...stylex.props(ui.designation, styles.outcomeNumeral)}
                    >
                      {NUMERALS[index]}
                    </span>
                    <span {...stylex.props(styles.outcomeTitle)}>{outcome.title}</span>
                  </span>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}
