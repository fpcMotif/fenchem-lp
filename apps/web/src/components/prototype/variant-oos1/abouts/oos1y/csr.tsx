import { colors } from "@fenchem-lp/ui/tokens.stylex";
import * as stylex from "@stylexjs/stylex";
import { Factory, Leaf, Recycle, type LucideIcon } from "lucide-react";

import { ABOUT_CSR } from "../../about-data";
import { Reveal } from "./reveal";
import { srOnly, ui } from "./shared";
import { bp, face, tone } from "./tokens.stylex";

const ICONS: Record<(typeof ABOUT_CSR.outcomes)[number]["icon"], LucideIcon> = {
  factory: Factory,
  recycle: Recycle,
  leaf: Leaf,
};

const styles = stylex.create({
  section: {
    paddingTop: { default: 88, [bp.tablet]: 120, [bp.desktop]: 144 },
  },
  photoBox: {
    position: "relative",
    overflow: "hidden",
    aspectRatio: { default: "4 / 5", [bp.tablet]: "4 / 3", [bp.desktop]: "16 / 10" },
    backgroundColor: "#7fa3cf",
  },
  photo: {
    objectPosition: { default: "56% 0%", [bp.tablet]: "50% 0%", [bp.desktop]: "50% 0%" },
  },
  paneRow: {
    position: "relative",
    marginTop: { default: "-49.69%", [bp.tablet]: "-29.81%", [bp.desktop]: "-22.33%" },
  },
  pane: {
    width: { default: "100%", [bp.tablet]: "88%", [bp.desktop]: "min(100%, 960px)" },
    padding: {
      default: "28px 22px 30px",
      [bp.tablet]: "40px 40px 44px",
      [bp.desktop]: "48px 56px 52px",
    },
  },
  statement: {
    fontSize: { default: 22, [bp.tablet]: 34, [bp.desktop]: 44 },
    lineHeight: 1.36,
    letterSpacing: "0.04em",
  },
  line: {
    display: "block",
  },
  body: {
    display: "flex",
    flexDirection: { default: "column", [bp.desktop]: "row" },
    gap: { default: 24, [bp.desktop]: 56 },
    marginTop: { default: 22, [bp.desktop]: 34 },
  },
  desc: {
    flexGrow: 1,
    flexBasis: 0,
    margin: 0,
    fontFamily: face.sans,
    fontSize: { default: 15, [bp.desktop]: 16 },
    lineHeight: 1.95,
    color: tone.onGlass,
    maxWidth: "26em",
    textWrap: "pretty",
  },
  outcomes: {
    flexShrink: 0,
    width: { default: "100%", [bp.desktop]: 260 },
    margin: 0,
    padding: 0,
    listStyleType: "none",
  },
  outcome: {
    display: "flex",
    alignItems: "center",
    gap: 12,
    paddingBlock: 12,
    borderTopWidth: { default: 1, ":first-child": 0 },
    borderTopStyle: "solid",
    borderTopColor: "rgba(26, 26, 26, 0.1)",
    fontFamily: face.sans,
    fontSize: 15,
    lineHeight: 1.4,
    color: tone.ink,
  },
  icon: {
    flexShrink: 0,
    color: colors.brandGreen700,
  },
});

export function CsrPane() {
  return (
    <section
      id="about-csr"
      aria-labelledby="oos1y-csr"
      {...stylex.props(ui.anchor, styles.section)}
    >
      <h2 id="oos1y-csr" {...srOnly}>
        Responsibility
      </h2>
      <div {...stylex.props(styles.photoBox)}>
        <img
          src={ABOUT_CSR.image}
          alt={ABOUT_CSR.imageAlt}
          loading="lazy"
          decoding="async"
          {...stylex.props(ui.fill, styles.photo)}
        />
      </div>
      <div {...stylex.props(ui.shell, styles.paneRow)}>
        <div {...stylex.props(ui.glass, styles.pane)}>
          <Reveal>
            <p {...stylex.props(ui.etched, styles.statement)}>
              {ABOUT_CSR.statement.map((line) => (
                <span key={line} {...stylex.props(styles.line)}>
                  {line}
                </span>
              ))}
            </p>
            <div {...stylex.props(styles.body)}>
              <p {...stylex.props(styles.desc)}>{ABOUT_CSR.desc}</p>
              <ul {...stylex.props(styles.outcomes)}>
                {ABOUT_CSR.outcomes.map((outcome) => {
                  const Icon = ICONS[outcome.icon];
                  return (
                    <li key={outcome.title} {...stylex.props(styles.outcome)}>
                      <Icon
                        size={16}
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
          </Reveal>
        </div>
      </div>
    </section>
  );
}
