import { breakpoints, colors } from "@fenchem-lp/ui/tokens.stylex";
import * as stylex from "@stylexjs/stylex";
import type { JSX } from "@solidjs/web";
import { ease, font, layout, media, shear, tone } from "./shear.stylex";
import { base } from "./primitives-values";
import { merge } from "solid-js";

export function SectionName(props: { id: string; children: string }) {
  return (
    <h2 id={props.id} {...stylex.attrs(base.srOnly)}>
      {props.children}
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

export function Section(props: {
  id?: string;
  labelledBy: string;
  surface: keyof typeof SECTION_SURFACES;
  band?: "above" | "below";
  children: JSX.Element;
}) {
  return (
    <section
      id={props.id}
      aria-labelledby={props.labelledBy}
      {...stylex.attrs(
        section.root,
        SECTION_SURFACES[props.surface],
        props.band === "above" && section.aboveBand,
        props.band === "below" && section.belowBand,
      )}
    >
      {props.children}
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

export function Frame(props: {
  src: string;
  alt: string;
  ratio: string;
  position?: string;
  priority?: boolean;
}) {
  const p = merge({ position: "center", priority: false }, props);
  return (
    <div {...stylex.attrs(frame.host, frameDynamic.ratio(p.ratio))}>
      <div {...stylex.attrs(frame.clip)}>
        <img
          src={p.src}
          alt={p.alt}
          loading={p.priority ? undefined : "lazy"}
          fetchpriority={p.priority ? "high" : undefined}
          decoding="async"
          {...stylex.attrs(frame.image, frameDynamic.position(p.position))}
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

export function Button(props: {
  variant: keyof typeof BUTTON_VARIANTS;
  onClick: () => void;
  children: JSX.Element;
}) {
  return (
    <button
      type="button"
      onClick={props.onClick}
      {...stylex.attrs(button.root, BUTTON_VARIANTS[props.variant], base.focusRing)}
    >
      {props.children}
    </button>
  );
}
