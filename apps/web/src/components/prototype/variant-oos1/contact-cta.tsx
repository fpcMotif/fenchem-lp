import { colors } from "@fenchem-lp/ui/tokens.stylex";
import * as stylex from "@stylexjs/stylex";
import { createUniqueId, For, merge, Show } from "solid-js";

import { CTA } from "./content";
import { RiseReveal } from "./rise-reveal";
import { color, ease, font, layout, media } from "./tokens.stylex";

const OOX_WORD_ON_TINT = "#d7e1f1";
const WORD_ON_TINT = `color-mix(in srgb, ${OOX_WORD_ON_TINT} 80%, ${color.blueTint})`;
const WORD_TRACKING = "0.06em";
const DESKTOP = "@media (min-width: 1280px)";
const WORD_EM_WIDTH = 4.36;
const WORD_INK_EM_WIDTH = 4.34;
const wordSize = (inset: string) => `calc((100vw - 2 * ${inset}) / ${WORD_INK_EM_WIDTH})`;
const WORD_SIZE = {
  default: wordSize("24px"),
  [media.tablet]: wordSize("40px"),
  [DESKTOP]: `min(360px, (100vw - 2 * ${layout.inset124}) / ${WORD_EM_WIDTH})`,
};
const WORD_CAP_ABOVE_EDGE = 0.581;
const WORD_FULL_CAP_ABOVE_EDGE = 0.744;
const WORD_CAP_PADDING = {
  default: `calc(${WORD_SIZE.default} * ${WORD_FULL_CAP_ABOVE_EDGE})`,
  [media.tablet]: `calc(${WORD_SIZE[media.tablet]} * ${WORD_FULL_CAP_ABOVE_EDGE})`,
  [DESKTOP]: `calc(${WORD_SIZE[DESKTOP]} * ${WORD_CAP_ABOVE_EDGE})`,
};

export type ContactCtaAction = {
  label: string;
  tone?: "primary" | "secondary";
} & ({ href: string; onClick?: never } | { onClick: () => void; href?: never });

export type ContactCtaActions =
  | readonly []
  | readonly [ContactCtaAction]
  | readonly [ContactCtaAction, ContactCtaAction];

const styles = stylex.create({
  section: {
    position: "relative",
    display: "flex",
    justifyContent: "center",
    overflow: "clip",
    paddingTop: { default: 80, [DESKTOP]: 128 },
    paddingBottom: WORD_CAP_PADDING,
    paddingInline: { default: 24, [media.tablet]: 40, [DESKTOP]: layout.inset124 },
    scrollMarginTop: layout.headerHeight,
    backgroundColor: color.blueTint,
  },
  word: {
    position: "absolute",
    left: "50%",
    bottom: 0,
    fontFamily: font.display,
    fontSize: WORD_SIZE,
    fontWeight: 800,
    lineHeight: 0.74,
    letterSpacing: `-${WORD_TRACKING}`,
    paddingInlineEnd: WORD_TRACKING,
    textTransform: "uppercase",
    whiteSpace: "nowrap",
    color: WORD_ON_TINT,
    translate: { default: "-50% 0", [DESKTOP]: "-50% 22%" },
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
    fontSize: { default: 26, [media.tablet]: 32, [DESKTOP]: 40 },
    fontWeight: 700,
    lineHeight: 1.2,
    color: color.ink,
    textWrap: "balance",
  },
  subtitle: {
    margin: 0,
    fontSize: { default: 16, [DESKTOP]: 18 },
    lineHeight: 1.6,
    color: color.bodyText,
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
      ":active": {
        default: null,
        ["@media (prefers-reduced-motion: no-preference)"]: "scale(0.96)",
      },
    },
    transitionProperty: "background-color, color, transform",
    transitionDuration: "160ms",
    transitionTimingFunction: ease.out,
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
    backgroundColor: { default: colors.paper, ":hover": color.neutralTint },
    color: colors.brandBlue700,
  },
});

export function ContactCta(rawProps: {
  id?: string;
  title?: string;
  subtitle?: string;
  actions?: ContactCtaActions;
}) {
  const props = merge({ title: CTA.title, actions: [CTA.action] as ContactCtaActions }, rawProps);
  const titleId = createUniqueId();
  return (
    <section id={props.id} aria-labelledby={titleId} {...stylex.attrs(styles.section)}>
      <span aria-hidden="true" lang="en" {...stylex.attrs(styles.word)}>
        Fenchem
      </span>
      <RiseReveal sx={styles.inner}>
        <div {...stylex.attrs(styles.heading)}>
          <h2 id={titleId} {...stylex.attrs(styles.title)}>
            {props.title}
          </h2>
          <Show when={props.subtitle}>
            <p {...stylex.attrs(styles.subtitle)}>{props.subtitle}</p>
          </Show>
        </div>
        <Show when={props.actions.length > 0}>
          <div {...stylex.attrs(styles.actions)}>
            <For each={props.actions}>
              {(action) => {
                const sx = stylex.attrs(
                  styles.button,
                  action.tone === "secondary" ? styles.secondary : styles.primary,
                );
                return action.href === undefined ? (
                  <button type="button" onClick={action.onClick} {...sx}>
                    {action.label}
                  </button>
                ) : (
                  <a href={action.href} {...sx}>
                    {action.label}
                  </a>
                );
              }}
            </For>
          </div>
        </Show>
      </RiseReveal>
    </section>
  );
}
