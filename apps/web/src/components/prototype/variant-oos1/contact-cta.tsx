import { breakpoints, colors } from "@fenchem-lp/ui/tokens.stylex";
import * as stylex from "@stylexjs/stylex";
import { useId } from "react";

import { CTA } from "./content";
import { RiseReveal } from "./rise-reveal";

const INK = "#1a1a1a";
const BODY_TEXT = "#4d4d4d";
const TINT = "#e6ecf7";
const PAPER_HOVER = "#f6f6f6";
const OOX_WORD_ON_TINT = "#d7e1f1";
const WORD_ON_TINT = `color-mix(in srgb, ${OOX_WORD_ON_TINT} 80%, ${TINT})`;
const DISPLAY_FONT = '"Inter Tight", "Helvetica Neue", Arial, sans-serif';
const EASE_OUT_CSS = "cubic-bezier(0.22, 1, 0.36, 1)";
const TABLET = "@media (min-width: 768px) and (max-width: 1279.98px)";
const DESKTOP = breakpoints.xl;
const INSET_124 = "min(124px, 8.611vw)";
const HEADER_HEIGHT = 80;

export type ContactCtaAction = {
  label: string;
  tone?: "primary" | "secondary";
} & ({ href: string; onClick?: never } | { onClick: () => void; href?: never });

const styles = stylex.create({
  section: {
    position: "relative",
    display: "flex",
    justifyContent: "center",
    overflow: "clip",
    paddingTop: { default: 80, [DESKTOP]: 128 },
    paddingBottom: { default: 120, [DESKTOP]: 220 },
    paddingInline: { default: 16, [TABLET]: 40, [DESKTOP]: INSET_124 },
    scrollMarginTop: HEADER_HEIGHT,
    backgroundColor: TINT,
  },
  word: {
    position: "absolute",
    left: "50%",
    bottom: 0,
    fontFamily: DISPLAY_FONT,
    fontSize: { default: "30vw", [DESKTOP]: "min(360px, 25vw)" },
    fontWeight: 800,
    lineHeight: 0.74,
    letterSpacing: "-0.06em",
    textTransform: "uppercase",
    whiteSpace: "nowrap",
    color: WORD_ON_TINT,
    translate: "-50% 22%",
    pointerEvents: "none",
    userSelect: "none",
  },
  inner: {
    position: "relative",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 32,
    maxWidth: 720,
    textAlign: "center",
  },
  heading: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 16,
  },
  title: {
    margin: 0,
    fontSize: { default: 26, [TABLET]: 32, [DESKTOP]: 40 },
    fontWeight: 700,
    lineHeight: 1.2,
    color: INK,
    textWrap: "balance",
  },
  subtitle: {
    margin: 0,
    fontSize: { default: 16, [DESKTOP]: 18 },
    lineHeight: 1.6,
    color: BODY_TEXT,
    textWrap: "pretty",
  },
  actions: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: 16,
  },
  button: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
    boxSizing: "border-box",
    minWidth: 160,
    height: 48,
    paddingInline: 24,
    borderWidth: 0,
    borderRadius: 0,
    fontFamily: "inherit",
    fontSize: 16,
    fontWeight: 400,
    lineHeight: 1.2,
    textDecoration: "none",
    cursor: "pointer",
    transform: {
      default: null,
      ":active": { default: null, [breakpoints.motionOk]: "scale(0.96)" },
    },
    transitionProperty: "background-color, color, transform",
    transitionDuration: "160ms",
    transitionTimingFunction: EASE_OUT_CSS,
    outlineStyle: { default: "none", ":focus-visible": "solid" },
    outlineWidth: 2,
    outlineColor: colors.brandBlue700,
    outlineOffset: 2,
  },
  primary: {
    backgroundColor: { default: colors.brandBlue700, ":hover": colors.brandBlue800 },
    color: colors.paper,
  },
  secondary: {
    backgroundColor: { default: colors.paper, ":hover": PAPER_HOVER },
    color: colors.brandBlue700,
  },
});

export function ContactCta({
  id,
  title = CTA.title,
  subtitle,
  actions = [CTA.action],
}: {
  id?: string;
  title?: string;
  subtitle?: string;
  actions?: readonly ContactCtaAction[];
}) {
  const titleId = useId();
  return (
    <section id={id} aria-labelledby={titleId} {...stylex.props(styles.section)}>
      <span aria-hidden="true" lang="en" {...stylex.props(styles.word)}>
        Fenchem
      </span>
      <RiseReveal sx={styles.inner}>
        <div {...stylex.props(styles.heading)}>
          <h2 id={titleId} {...stylex.props(styles.title)}>
            {title}
          </h2>
          {subtitle && <p {...stylex.props(styles.subtitle)}>{subtitle}</p>}
        </div>
        <div {...stylex.props(styles.actions)}>
          {actions.map((action) => {
            const sx = stylex.props(
              styles.button,
              action.tone === "secondary" ? styles.secondary : styles.primary,
            );
            return action.href === undefined ? (
              <button key={action.label} type="button" onClick={action.onClick} {...sx}>
                {action.label}
              </button>
            ) : (
              <a key={action.label} href={action.href} {...sx}>
                {action.label}
              </a>
            );
          })}
        </div>
      </RiseReveal>
    </section>
  );
}
