import { ArrowRight } from "@fenchem-lp/ui/components/lucide";
import { Reveal } from "./motion";
import { MaskLine } from "./motion";
import * as stylex from "@stylexjs/stylex";
import type { StyleXStyles } from "@stylexjs/stylex";
import { children, merge, Show } from "solid-js";
import type { JSX } from "@solidjs/web";
import { color, ease, font, layout as layoutTokens, media } from "./tokens.stylex";

const styles = stylex.create({
  button: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
    boxSizing: "border-box",
    height: 48,
    paddingInline: 24,
    borderRadius: 0,
    backgroundColor: { default: color.royal, ":hover": color.royalHover },
    color: color.royal,
    fontFamily: font.cjk,
    fontSize: 16,
    fontWeight: 700,
    lineHeight: 1.2,
    textDecoration: "none",
    whiteSpace: "nowrap",
    transform: {
      default: null,
      ":active": { default: null, [media.motionOk]: "scale(0.97)" },
    },
    transitionProperty: "background-color, transform",
    transitionDuration: ease.hover,
    transitionTimingFunction: ease.out,
  },
  buttonOnDark: {
    color: color.paper,
  },
  buttonWhite: {
    backgroundColor: { default: color.paper, ":hover": color.paperHover },
  },
  buttonLarge: {
    height: 56,
    paddingInline: 32,
  },
  buttonLabel: {
    color: color.paper,
  },
  buttonLabelWhite: {
    color: color.deep,
  },
  textLink: {
    display: "inline-flex",
    alignItems: "center",
    gap: 8,
    minHeight: 48,
    fontFamily: font.cjk,
    fontSize: 16,
    fontWeight: 700,
    lineHeight: 1.2,
    textDecorationLine: "underline",
    textDecorationThickness: 1,
    textDecorationColor: { default: "transparent", ":hover": "currentColor" },
    textUnderlineOffset: { default: 2, ":hover": 6 },
    transitionProperty: "text-decoration-color, text-underline-offset",
    transitionDuration: ease.hover,
    transitionTimingFunction: ease.out,
  },
  textLinkInk: {
    color: color.ink,
  },
  textLinkWhite: {
    color: color.paper,
  },
  arrow: {
    flexShrink: 0,
    transform: {
      default: null,
      [stylex.when.ancestor(":hover")]: { default: null, [media.hoverMotion]: "translateX(3px)" },
    },
    transitionProperty: "transform",
    transitionDuration: ease.hover,
    transitionTimingFunction: ease.out,
  },

  eyebrow: {
    margin: 0,
    fontFamily: font.display,
    fontSize: 13,
    fontWeight: 600,
    lineHeight: 1.4,
    fontVariantNumeric: "tabular-nums",
    color: color.inkMuted,
  },
  eyebrowDark: {
    color: color.white70,
  },

  header: {
    display: "grid",
    gridTemplateColumns: {
      default: "minmax(0, 1fr)",
      [media.tabletUp]: "repeat(12, minmax(0, 1fr))",
    },
    columnGap: layoutTokens.gutter,
    rowGap: 20,
  },
  title: {
    margin: 0,
    fontFamily: font.cjk,
    fontSize: { default: 30, [media.tablet]: 40, [media.desktop]: 52 },
    fontWeight: 700,
    lineHeight: 1.15,
    letterSpacing: 0,
    color: color.ink,
  },
  titleDark: {
    color: color.paper,
  },
  titlePlace: {
    gridColumn: {
      default: "1 / -1",
      [media.tablet]: "1 / span 10",
      [media.desktop]: "1 / span 7",
    },
  },
  titleBaseline: {
    alignSelf: { default: null, [media.desktop]: "last baseline" },
  },
  lead: {
    gridColumn: {
      default: "1 / -1",
      [media.tablet]: "1 / span 9",
      [media.desktop]: "1 / span 6",
    },
    margin: 0,
    fontSize: { default: 16, [media.tabletUp]: 18 },
    lineHeight: 1.7,
    color: color.inkMuted,
  },
  leadDark: {
    color: color.white80,
  },
  action: {
    gridColumn: { default: "1 / -1", [media.desktop]: "9 / -1" },
    gridRow: { default: "auto", [media.desktop]: "1" },
    justifySelf: { default: "start", [media.desktop]: "end" },
    alignSelf: { default: "start", [media.desktop]: "last baseline" },
  },
});

type Tone = "light" | "dark";

export function SectionTitle(props: {
  id: string;
  children: JSX.Element;
  tone?: Tone;
  index?: number;
  sx?: StyleXStyles;
}) {
  const p = merge({ tone: "light" as Tone, index: 1 }, props);
  return (
    <h2 id={p.id} {...stylex.attrs(styles.title, p.tone === "dark" && styles.titleDark, p.sx)}>
      <MaskLine index={p.index}>{p.children}</MaskLine>
    </h2>
  );
}

export function Eyebrow(props: {
  number?: string;
  label?: string;
  tone?: Tone;
  sx?: StyleXStyles;
}) {
  return (
    <Show when={props.label}>
      <p {...stylex.attrs(styles.eyebrow, props.tone === "dark" && styles.eyebrowDark, props.sx)}>
        {props.label}
      </p>
    </Show>
  );
}

type SectionHeaderProps = {
  id: string;
  number?: string;
  label?: string;
  title: string;
  lead?: string;
  action?: JSX.Element;
  tone?: Tone;
  sx?: StyleXStyles;
};

export function SectionHeader(props: SectionHeaderProps) {
  const p = merge({ tone: "light" as Tone }, props);
  const action = children(() => p.action);
  const dark = () => p.tone === "dark";
  return (
    <div {...stylex.attrs(styles.header, p.sx)}>
      <SectionTitle
        id={p.id}
        tone={p.tone}
        sx={[styles.titlePlace, action() ? styles.titleBaseline : null]}
      >
        {p.title}
      </SectionTitle>
      {p.lead ? (
        <Reveal as="p" index={1} sx={[styles.lead, dark() && styles.leadDark]}>
          {p.lead}
        </Reveal>
      ) : null}
      {action() ? (
        <Reveal index={1} sx={styles.action}>
          {action()}
        </Reveal>
      ) : null}
    </div>
  );
}

type ButtonProps = {
  href: string;
  children: JSX.Element;
  onDark?: boolean;
  tone?: "royal" | "white";
  size?: "regular" | "large";
  sx?: StyleXStyles;
};

export function Button(props: ButtonProps) {
  const p = merge({ onDark: false, tone: "royal" as const, size: "regular" as const }, props);
  const white = () => p.tone === "white";
  return (
    <a
      href={p.href}
      {...stylex.attrs(
        styles.button,
        p.onDark && styles.buttonOnDark,
        white() && styles.buttonWhite,
        p.size === "large" && styles.buttonLarge,
        p.sx,
      )}
    >
      <span {...stylex.attrs(styles.buttonLabel, white() && styles.buttonLabelWhite)}>
        {p.children}
      </span>
    </a>
  );
}

type TextLinkProps = {
  href: string;
  children: JSX.Element;
  tone?: "ink" | "white";
  sx?: StyleXStyles;
};

export function TextLink(props: TextLinkProps) {
  const p = merge({ tone: "ink" as const }, props);
  return (
    <a
      href={p.href}
      {...stylex.attrs(
        styles.textLink,
        p.tone === "white" ? styles.textLinkWhite : styles.textLinkInk,
        stylex.defaultMarker(),
        p.sx,
      )}
    >
      {p.children}
      <ArrowRight
        size={16}
        strokeWidth={2}
        absoluteStrokeWidth
        aria-hidden="true"
        {...stylex.attrs(styles.arrow)}
      />
    </a>
  );
}
