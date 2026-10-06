import * as stylex from "@stylexjs/stylex";
import { Factory, Leaf, Recycle } from "lucide-react";

import { ABOUT_CSR } from "../../about-data";
import { Cast, LIFT } from "./cast";
import { SectionHead } from "./head";
import { ui } from "./shared";
import { SECTION_HOURS } from "./sun";
import { bp, face, tone } from "./tokens.stylex";

const ICONS = { factory: Factory, recycle: Recycle, leaf: Leaf } as const;

const styles = stylex.create({
  body: {
    rowGap: { default: 48, [bp.desktop]: 72 },
    marginTop: { default: 40, [bp.desktop]: 72 },
    alignItems: "end",
  },
  statement: {
    gridColumn: { default: "1 / -1", [bp.desktop]: "4 / span 8" },
    margin: 0,
    fontFamily: face.sans,
    fontWeight: 700,
    fontSize: { default: 26, [bp.tablet]: 34, [bp.desktop]: "clamp(36px, 3.2vw, 46px)" },
    lineHeight: 1.4,
    letterSpacing: "0.01em",
    color: tone.ink,
  },
  line: {
    display: "block",
  },
  figure: {
    gridColumn: { default: "1 / -1", [bp.tablet]: "1 / span 4", [bp.desktop]: "1 / span 6" },
    position: "relative",
    marginInline: 0,
    marginTop: 0,
    marginBottom: { default: 40, [bp.desktop]: 0 },
  },
  photo: {
    aspectRatio: "5 / 4",
    overflow: "hidden",
    backgroundColor: tone.tint,
  },
  text: {
    gridColumn: { default: "1 / -1", [bp.desktop]: "8 / span 4" },
    display: "flex",
    flexDirection: "column",
    gap: 32,
  },
  outcomes: {
    margin: 0,
    padding: 0,
    listStyleType: "none",
  },
  outcome: {
    display: "flex",
    alignItems: "center",
    gap: 16,
    paddingBlock: 16,
    borderTopWidth: 1,
    borderTopStyle: "solid",
    borderTopColor: tone.lineSoft,
    fontFamily: face.sans,
    fontSize: 16,
    fontWeight: 500,
    color: tone.ink,
  },
  icon: {
    flexShrink: 0,
    color: tone.navy,
  },
});

export function Csr() {
  return (
    <section
      id="about-csr"
      aria-labelledby="oos1t-csr"
      data-hour={SECTION_HOURS.csr}
      {...stylex.props(ui.section, ui.shell)}
    >
      <SectionHead
        titleId="oos1t-csr"
        hour={SECTION_HOURS.csr}
        title={ABOUT_CSR.title}
        english="Responsibility"
      />
      <div {...stylex.props(ui.grid, styles.body)}>
        <p {...stylex.props(styles.statement)}>
          {ABOUT_CSR.statement.map((line) => (
            <span key={line} {...stylex.props(styles.line)}>
              {line}
            </span>
          ))}
        </p>
        <figure {...stylex.props(styles.figure)}>
          <Cast lift={LIFT.block} still />
          <div {...stylex.props(ui.face, styles.photo)}>
            <img
              src={ABOUT_CSR.image}
              alt={ABOUT_CSR.imageAlt}
              loading="lazy"
              decoding="async"
              {...stylex.props(ui.fill)}
            />
          </div>
        </figure>
        <div {...stylex.props(styles.text)}>
          <p {...stylex.props(ui.body)}>{ABOUT_CSR.desc}</p>
          <ul {...stylex.props(styles.outcomes)}>
            {ABOUT_CSR.outcomes.map((outcome) => {
              const Icon = ICONS[outcome.icon];
              return (
                <li key={outcome.title} {...stylex.props(styles.outcome)}>
                  <Icon
                    size={22}
                    strokeWidth={1.5}
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
