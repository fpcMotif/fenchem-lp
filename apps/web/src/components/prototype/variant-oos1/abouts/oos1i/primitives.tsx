import { breakpoints, colors } from "@fenchem-lp/ui/tokens.stylex";
import * as stylex from "@stylexjs/stylex";
import type { ReactNode } from "react";

import { ease, font, layout, media, shear, tone } from "./shear.stylex";

export const base = stylex.create({
  shell: {
    width: "100%",
    maxWidth: 1440,
    marginInline: "auto",
    boxSizing: "border-box",
  },
  inset: {
    paddingInline: { default: 16, [media.tablet]: 40, [media.desktop]: layout.inset },
  },
  focusRing: {
    outlineStyle: { default: "none", ":focus-visible": "solid" },
    outlineWidth: 2,
    outlineColor: colors.brandBlue700,
    outlineOffset: 3,
  },
  srOnly: {
    position: "absolute",
    width: 1,
    height: 1,
    overflow: "hidden",
    clipPath: "inset(50%)",
    whiteSpace: "nowrap",
  },
  quiet: {
    margin: 0,
    fontFamily: font.sans,
    fontSize: 13,
    fontWeight: 400,
    letterSpacing: "0.06em",
    lineHeight: 1.6,
    color: tone.body,
  },
  quietOnDark: {
    color: tone.white80,
  },
  headline: {
    margin: 0,
    fontFamily: font.sans,
    fontSize: { default: 22, [media.desktop]: 24 },
    fontWeight: 500,
    lineHeight: 1.4,
    letterSpacing: "0.04em",
    color: tone.ink,
  },
  prose: {
    margin: 0,
    maxWidth: "36em",
    fontFamily: font.sans,
    fontSize: { default: 15, [media.desktop]: 16 },
    fontWeight: 400,
    lineHeight: 2,
    letterSpacing: "0.04em",
    color: tone.body,
    textWrap: "pretty",
  },
});

export function SectionName({ id, children }: { id: string; children: string }) {
  return (
    <h2 id={id} {...stylex.props(base.srOnly)}>
      {children}
    </h2>
  );
}

const section = stylex.create({
  root: {
    scrollMarginTop: `calc(${layout.header} + 56px + 8px)`,
    paddingTop: { default: 48, [breakpoints.md]: 64, [media.desktop]: 76 },
    paddingBottom: { default: 48, [breakpoints.md]: 64, [media.desktop]: 76 },
  },
  aboveBand: {
    paddingBottom: {
      default: `calc(${shear.drop} + 48px)`,
      [breakpoints.md]: `calc(${shear.drop} + 64px)`,
      [media.desktop]: `calc(${shear.drop} + 76px)`,
    },
  },
  belowBand: {
    paddingTop: {
      default: `calc(${shear.drop} + 48px)`,
      [breakpoints.md]: `calc(${shear.drop} + 64px)`,
      [media.desktop]: `calc(${shear.drop} + 76px)`,
    },
  },
  paper: { backgroundColor: colors.paper },
  page: { backgroundColor: tone.page },
});

const SECTION_SURFACES = { paper: section.paper, page: section.page } as const;

export function Section({
  id,
  labelledBy,
  surface,
  band,
  children,
}: {
  id?: string;
  labelledBy: string;
  surface: keyof typeof SECTION_SURFACES;
  band?: "above" | "below";
  children: ReactNode;
}) {
  return (
    <section
      id={id}
      aria-labelledby={labelledBy}
      {...stylex.props(
        section.root,
        SECTION_SURFACES[surface],
        band === "above" && section.aboveBand,
        band === "below" && section.belowBand,
      )}
    >
      {children}
    </section>
  );
}

const frame = stylex.create({
  host: {
    position: "relative",
    containerType: "inline-size",
    width: "100%",
  },
  clip: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    overflow: "hidden",
    clipPath: shear.cutBoth,
    backgroundColor: tone.tint,
  },
  image: {
    position: "absolute",
    top: 0,
    left: 0,
    display: "block",
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },
});

const frameDynamic = stylex.create({
  ratio: (value: string) => ({ aspectRatio: value }),
  position: (value: string) => ({ objectPosition: value }),
});

export function Frame({
  src,
  alt,
  ratio,
  position = "center",
  priority = false,
}: {
  src: string;
  alt: string;
  ratio: string;
  position?: string;
  priority?: boolean;
}) {
  return (
    <div {...stylex.props(frame.host, frameDynamic.ratio(ratio))}>
      <div {...stylex.props(frame.clip)}>
        <img
          src={src}
          alt={alt}
          loading={priority ? undefined : "lazy"}
          fetchPriority={priority ? "high" : undefined}
          decoding="async"
          {...stylex.props(frame.image, frameDynamic.position(position))}
        />
      </div>
    </div>
  );
}

const button = stylex.create({
  root: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    height: 48,
    paddingInline: 28,
    borderWidth: 0,
    borderRadius: 0,
    fontFamily: font.sans,
    fontSize: 16,
    fontWeight: 500,
    letterSpacing: "0.06em",
    cursor: "pointer",
    transform: {
      default: null,
      ":active": { default: null, [breakpoints.motionOk]: "scale(0.97)" },
    },
    transitionProperty: "background-color, color, transform",
    transitionDuration: "160ms",
    transitionTimingFunction: ease.out,
  },
  primary: {
    backgroundColor: { default: colors.brandBlue700, ":hover": colors.brandBlue800 },
    color: colors.paper,
  },
  secondary: {
    backgroundColor: { default: "transparent", ":hover": tone.tint },
    boxShadow: `inset 0 0 0 1px ${colors.brandBlue700}`,
    color: colors.brandBlue700,
  },
});

const BUTTON_VARIANTS = { primary: button.primary, secondary: button.secondary } as const;

export function Button({
  variant,
  onClick,
  children,
}: {
  variant: keyof typeof BUTTON_VARIANTS;
  onClick: () => void;
  children: ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      {...stylex.props(button.root, BUTTON_VARIANTS[variant], base.focusRing)}
    >
      {children}
    </button>
  );
}
