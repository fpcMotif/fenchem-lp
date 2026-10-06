import { breakpoints, colors } from "@fenchem-lp/ui/tokens.stylex";
import * as stylex from "@stylexjs/stylex";
import { type ReactNode, useEffect, useRef, useState } from "react";

import { useReducedMotion } from "@/components/prototype/use-reduced-motion";

import { ABOUT_HERO } from "../../about-data";
import { band, font, layout, motionCss, step, tone } from "./tokens.stylex";

const NAV_ENGLISH = ["Profile", "Campus", "Culture", "Responsibility", "Honors", "Structure"];

export const NAV_ITEMS = [
  ...ABOUT_HERO.navChips.map((chip, idx) => ({ ...chip, english: NAV_ENGLISH[idx] })),
  { label: "产品与应用", id: "about-products", english: "Products" },
];

export const SECTION_IDS: readonly string[] = NAV_ITEMS.map((item) => item.id);

export const ui = stylex.create({
  root: {
    paddingTop: 80,
    backgroundColor: tone.page,
    color: tone.ink,
    fontFamily: font.cjk,
  },
  shell: {
    width: "100%",
    maxWidth: 1440,
    marginInline: "auto",
    boxSizing: "border-box",
  },
  inset: {
    paddingInline: {
      default: 16,
      [band.mdToXl]: layout.insetMd,
      [breakpoints.xl]: layout.insetXl,
    },
  },
  section: {
    scrollMarginTop: 136,
    paddingBlock: { default: 40, [band.mdToXl]: 60, [breakpoints.xl]: 72 },
  },
  srOnly: {
    position: "absolute",
    width: 1,
    height: 1,
    overflow: "hidden",
    clipPath: "inset(50%)",
    whiteSpace: "nowrap",
    fontWeight: 400,
  },
  focusRing: {
    outlineStyle: { default: "none", ":focus-visible": "solid" },
    outlineWidth: 2,
    outlineColor: colors.brandBlue700,
    outlineOffset: 3,
  },
  fill: {
    position: "absolute",
    top: 0,
    left: 0,
    display: "block",
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },
  figure: {
    margin: 0,
  },
  frame: {
    position: "relative",
    overflow: "hidden",
    backgroundColor: tone.tint,
  },
  caption: {
    marginTop: 12,
    fontSize: step.label,
    fontWeight: 400,
    letterSpacing: "0.06em",
    lineHeight: 1.6,
    color: tone.body,
  },
  quietButton: {
    display: "inline-flex",
    alignItems: "center",
    gap: 10,
    minHeight: 44,
    padding: 0,
    borderWidth: 0,
    backgroundColor: "transparent",
    fontFamily: font.cjk,
    fontSize: step.small,
    fontWeight: 400,
    letterSpacing: "0.08em",
    color: tone.ink,
    cursor: "pointer",
    textDecorationLine: "underline",
    textDecorationThickness: 1,
    textUnderlineOffset: 8,
    textDecorationColor: { default: tone.hairlineStrong, ":hover": tone.ink },
    transitionProperty: "text-decoration-color",
    transitionDuration: "200ms",
    transitionTimingFunction: motionCss.out,
  },
});

const reveal = stylex.create({
  base: {
    transitionProperty: "opacity, transform",
    transitionDuration: "800ms",
    transitionTimingFunction: motionCss.out,
  },
  hidden: {
    opacity: { default: 0, [breakpoints.motionReduce]: 1 },
    transform: { default: null, [breakpoints.motionOk]: "translateY(20px)" },
  },
  shown: {
    opacity: 1,
    transform: "none",
  },
  delay: (ms: number) => ({ transitionDelay: `${ms}ms` }),
});

type RevealState = "static" | "hidden" | "shown";

export function Reveal({
  children,
  delay = 0,
  sx,
  as: Tag = "div",
}: {
  children: ReactNode;
  delay?: number;
  sx?: stylex.StyleXStyles;
  as?: "div" | "li" | "figure" | "article";
}) {
  const ref = useRef<HTMLDivElement & HTMLLIElement>(null);
  const reduce = useReducedMotion();
  const [state, setState] = useState<RevealState>("static");

  useEffect(() => {
    const node = ref.current;
    if (!node || reduce || !("IntersectionObserver" in window)) return;
    if (node.getBoundingClientRect().top < window.innerHeight) return;
    setState("hidden");
    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries.some((entry) => entry.isIntersecting)) return;
        setState("shown");
        observer.disconnect();
      },
      { rootMargin: "0px 0px -8% 0px" },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [reduce]);

  return (
    <Tag
      ref={ref}
      {...stylex.props(
        reveal.base,
        state === "hidden" && reveal.hidden,
        state === "shown" && reveal.shown,
        state === "shown" && delay > 0 && reveal.delay(delay),
        sx,
      )}
    >
      {children}
    </Tag>
  );
}

export function Section({
  id,
  label,
  sx,
  children,
}: {
  id: string;
  label: string;
  sx?: stylex.StyleXStyles;
  children: ReactNode;
}) {
  const nameId = `${id}-name`;
  return (
    <section id={id} aria-labelledby={nameId} {...stylex.props(ui.section, sx)}>
      <h2 id={nameId} {...stylex.props(ui.srOnly)}>
        {label}
      </h2>
      <div {...stylex.props(ui.shell, ui.inset)}>{children}</div>
    </section>
  );
}
