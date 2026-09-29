import * as stylex from "@stylexjs/stylex";
import type { StyleXStyles } from "@stylexjs/stylex";
import { ArrowRight } from "lucide-react";
import type { ReactNode } from "react";

import { MaskLine, Reveal } from "./motion";
import { color, ease, font, layout as layoutTokens, media } from "./tokens.stylex";

export const layout = stylex.create({
  shell: {
    width: "100%",
    maxWidth: layoutTokens.shellMax,
    marginInline: "auto",
    boxSizing: "border-box",
  },
  inset: {
    paddingInline: {
      default: layoutTokens.insetMobile,
      [media.tablet]: layoutTokens.insetTablet,
      [media.desktop]: layoutTokens.insetDesktop,
    },
  },
  grid12: {
    display: { default: "block", [media.tabletUp]: "grid" },
    gridTemplateColumns: "repeat(12, minmax(0, 1fr))",
    columnGap: layoutTokens.gutter,
  },
  section: {
    paddingBlock: {
      default: layoutTokens.sectionPadMobile,
      [media.tablet]: layoutTokens.sectionPadTablet,
      [media.desktop]: layoutTokens.sectionPadDesktop,
    },
  },
  visuallyHidden: {
    position: "absolute",
    width: 1,
    height: 1,
    padding: 0,
    margin: -1,
    overflow: "hidden",
    clip: "rect(0, 0, 0, 0)",
    whiteSpace: "nowrap",
    borderWidth: 0,
  },
});

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

export function SectionTitle({
  id,
  children,
  tone = "light",
  index = 1,
  sx,
}: {
  id: string;
  children: ReactNode;
  tone?: Tone;
  index?: number;
  sx?: StyleXStyles;
}) {
  return (
    <h2 id={id} {...stylex.props(styles.title, tone === "dark" && styles.titleDark, sx)}>
      <MaskLine index={index}>{children}</MaskLine>
    </h2>
  );
}

export function Eyebrow({
  label,
  tone = "light",
  sx,
}: {
  number?: string;
  label?: string;
  tone?: Tone;
  sx?: StyleXStyles;
}) {
  if (!label) return null;
  return (
    <p {...stylex.props(styles.eyebrow, tone === "dark" && styles.eyebrowDark, sx)}>{label}</p>
  );
}

type SectionHeaderProps = {
  id: string;
  number?: string;
  label?: string;
  title: string;
  lead?: string;
  action?: ReactNode;
  tone?: Tone;
  sx?: StyleXStyles;
};

export function SectionHeader({ id, title, lead, action, tone = "light", sx }: SectionHeaderProps) {
  const dark = tone === "dark";
  return (
    <div {...stylex.props(styles.header, sx)}>
      <SectionTitle
        id={id}
        tone={tone}
        sx={[styles.titlePlace, action ? styles.titleBaseline : null]}
      >
        {title}
      </SectionTitle>
      {lead ? (
        <Reveal as="p" index={1} sx={[styles.lead, dark && styles.leadDark]}>
          {lead}
        </Reveal>
      ) : null}
      {action ? (
        <Reveal index={1} sx={styles.action}>
          {action}
        </Reveal>
      ) : null}
    </div>
  );
}

type ButtonProps = {
  href: string;
  children: ReactNode;
  onDark?: boolean;
  tone?: "royal" | "white";
  size?: "regular" | "large";
  sx?: StyleXStyles;
};

export function Button({
  href,
  children,
  onDark = false,
  tone = "royal",
  size = "regular",
  sx,
}: ButtonProps) {
  const white = tone === "white";
  return (
    <a
      href={href}
      {...stylex.props(
        styles.button,
        onDark && styles.buttonOnDark,
        white && styles.buttonWhite,
        size === "large" && styles.buttonLarge,
        sx,
      )}
    >
      <span {...stylex.props(styles.buttonLabel, white && styles.buttonLabelWhite)}>
        {children}
      </span>
    </a>
  );
}

type TextLinkProps = {
  href: string;
  children: ReactNode;
  tone?: "ink" | "white";
  sx?: StyleXStyles;
};

export function TextLink({ href, children, tone = "ink", sx }: TextLinkProps) {
  return (
    <a
      href={href}
      {...stylex.props(
        styles.textLink,
        tone === "white" ? styles.textLinkWhite : styles.textLinkInk,
        stylex.defaultMarker(),
        sx,
      )}
    >
      {children}
      <ArrowRight
        size={16}
        strokeWidth={2}
        absoluteStrokeWidth
        aria-hidden="true"
        {...stylex.props(styles.arrow)}
      />
    </a>
  );
}
