import * as stylex from "@stylexjs/stylex";
import { useEffect, useRef, useState, useSyncExternalStore, type ReactNode } from "react";

import { bp, chrome, face, motion, space, tone } from "./tokens.stylex";

export const ROMAN = ["I", "II", "III", "IV", "V", "VI", "VII", "VIII"] as const;

export const ui = stylex.create({
  reset: {
    margin: 0,
  },
  srOnly: {
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
  shell: {
    width: "100%",
    maxWidth: 1440,
    marginInline: "auto",
    boxSizing: "border-box",
    paddingInline: space.gutter,
  },
  anchor: {
    scrollMarginTop: chrome.anchor,
  },
  section: {
    paddingTop: { default: 88, [bp.tablet]: 120, [bp.desktop]: 160 },
  },
  frame: {
    position: "relative",
    boxSizing: "border-box",
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: tone.rule,
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
  serif: {
    fontFamily: face.serif,
    fontStyle: "italic",
    fontWeight: 400,
    color: tone.body,
  },
  focusRing: {
    outlineStyle: { default: "none", ":focus-visible": "solid" },
    outlineWidth: 2,
    outlineColor: tone.blue,
    outlineOffset: 4,
  },
});

export const srOnly = stylex.props(ui.srOnly);

const tagStyles = stylex.create({
  tag: {
    display: "inline-flex",
    alignItems: "center",
    gap: 6,
    boxSizing: "border-box",
    height: 18,
    paddingInline: 6,
    fontFamily: face.latin,
    fontSize: 11,
    fontWeight: 500,
    lineHeight: 1,
    letterSpacing: "0.06em",
    color: tone.navy,
    backgroundColor: tone.page,
    boxShadow: "0 0 0 1px rgba(11, 42, 92, 0.26)",
    whiteSpace: "nowrap",
  },
  pinned: {
    position: "absolute",
    top: -9,
    insetInlineStart: { default: 8, [bp.upTablet]: 12 },
    zIndex: 1,
  },
  muted: {
    fontFamily: face.sans,
    fontSize: 12,
    color: tone.body,
    fontWeight: 400,
  },
});

export function Tag({
  numeral,
  label,
  pinned = true,
}: {
  numeral: string;
  label?: ReactNode;
  pinned?: boolean;
}) {
  return (
    <span {...stylex.props(tagStyles.tag, pinned && tagStyles.pinned)}>
      <span>{numeral}</span>
      {label ? <span {...stylex.props(tagStyles.muted)}>{label}</span> : null}
    </span>
  );
}

const headStyles = stylex.create({
  head: {
    marginBottom: { default: 40, [bp.tablet]: 56, [bp.desktop]: 72 },
  },
  rule: {
    display: "flex",
    alignItems: "center",
    gap: { default: 14, [bp.upTablet]: 20 },
    marginBottom: { default: 22, [bp.tablet]: 30, [bp.desktop]: 36 },
    fontFamily: face.latin,
    fontSize: 11,
    fontWeight: 500,
    lineHeight: 1,
    letterSpacing: "0.24em",
    textTransform: "uppercase",
    color: tone.quiet,
  },
  index: {
    fontVariantNumeric: "tabular-nums",
    letterSpacing: "0.12em",
  },
  line: {
    flexGrow: 1,
    height: 1,
    backgroundColor: tone.ruleFaint,
  },
  row: {
    display: "flex",
    flexWrap: "wrap",
    alignItems: "last baseline",
    justifyContent: "space-between",
    columnGap: 48,
    rowGap: { default: 12, [bp.upTablet]: 16 },
  },
  title: {
    margin: 0,
    fontFamily: face.sans,
    fontSize: { default: 30, [bp.tablet]: 38, [bp.laptop]: 42, [bp.wide]: 48 },
    fontWeight: 500,
    lineHeight: 1.15,
    letterSpacing: "0.08em",
    color: tone.ink,
  },
  note: {
    margin: 0,
    maxWidth: "20em",
    fontSize: { default: 18, [bp.tablet]: 20, [bp.laptop]: 21, [bp.wide]: 23 },
    lineHeight: 1.3,
    textAlign: { default: "start", [bp.desktop]: "end" },
    textWrap: "balance",
    color: tone.note,
  },
});

export function SectionHead({
  id,
  index,
  eyebrow,
  title,
  note,
}: {
  id: string;
  index: number;
  eyebrow: string;
  title: string;
  note?: string;
}) {
  return (
    <div {...stylex.props(headStyles.head)}>
      <div aria-hidden="true" lang="en" {...stylex.props(headStyles.rule)}>
        <span {...stylex.props(headStyles.index)}>{String(index).padStart(2, "0")}</span>
        <span {...stylex.props(headStyles.line)} />
        <span>{eyebrow}</span>
      </div>
      <div {...stylex.props(headStyles.row)}>
        <h2 id={id} {...stylex.props(headStyles.title)}>
          {title}
        </h2>
        {note ? (
          <p lang="en" {...stylex.props(ui.serif, headStyles.note)}>
            {note}
          </p>
        ) : null}
      </div>
    </div>
  );
}

const matStyles = stylex.create({
  mat: {
    position: "relative",
    boxSizing: "border-box",
    paddingTop: space.mat,
    paddingInline: space.mat,
    paddingBottom: space.matFoot,
    backgroundColor: tone.page,
  },
  withFoot: {
    paddingBottom: { default: 18, [bp.upTablet]: 24 },
  },
  raised: {
    boxShadow:
      "0 0 0 1px rgba(26, 26, 26, 0.07), 0 1px 1px rgba(11, 42, 92, 0.04), 0 30px 60px -44px rgba(11, 42, 92, 0.32)",
  },
  flat: {
    boxShadow: "0 0 0 1px rgba(26, 26, 26, 0.07)",
  },
  head: {
    marginBottom: { default: 16, [bp.upTablet]: 24 },
  },
  foot: {
    marginTop: { default: 14, [bp.upTablet]: 20 },
  },
  bevel: {
    position: "relative",
    boxSizing: "border-box",
    padding: 4,
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: tone.bevelOuter,
    backgroundColor: tone.page,
  },
  core: {
    position: "relative",
    boxShadow: "0 0 0 1px rgba(11, 42, 92, 0.18)",
  },
});

export const bevel = stylex.create({
  edge: {
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: tone.bevelOuter,
    outlineWidth: 1,
    outlineStyle: "solid",
    outlineColor: tone.bevelInner,
    outlineOffset: -6,
  },
});

export function Mat({
  raised = false,
  bare = false,
  head,
  foot,
  layout,
  children,
}: {
  raised?: boolean;
  bare?: boolean;
  head?: ReactNode;
  foot?: ReactNode;
  layout?: stylex.StyleXStyles;
  children: ReactNode;
}) {
  return (
    <div
      {...stylex.props(
        matStyles.mat,
        raised && matStyles.raised,
        !raised && !bare && matStyles.flat,
        foot ? matStyles.withFoot : null,
        layout,
      )}
    >
      {head ? <div {...stylex.props(matStyles.head)}>{head}</div> : null}
      {children}
      {foot ? <div {...stylex.props(matStyles.foot)}>{foot}</div> : null}
    </div>
  );
}

export function Bevel({ field, children }: { field?: stylex.StyleXStyles; children: ReactNode }) {
  return (
    <div {...stylex.props(matStyles.bevel)}>
      <div {...stylex.props(matStyles.core, field)}>{children}</div>
    </div>
  );
}

export function useMediaQuery(query: string): boolean {
  return useSyncExternalStore(
    (onChange) => {
      const list = window.matchMedia(query);
      list.addEventListener("change", onChange);
      return () => list.removeEventListener("change", onChange);
    },
    () => window.matchMedia(query).matches,
    () => false,
  );
}

export function useArrived<T extends Element>() {
  const ref = useRef<T>(null);
  const [arrived, setArrived] = useState(false);
  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setArrived(true);
        observer.disconnect();
      },
      { rootMargin: "0px 0px -18% 0px" },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);
  return [ref, arrived] as const;
}

const stepStyles = stylex.create({
  base: {
    transitionProperty: "opacity, transform",
    transitionDuration: "900ms",
    transitionTimingFunction: motion.ease,
  },
  waiting: {
    opacity: { default: 1, [bp.motionOk]: 0 },
    transform: { default: "none", [bp.motionOk]: "scale(0.985)" },
  },
  delay: (transitionDelay: string) => ({ transitionDelay }),
});

export function stepIn(arrived: boolean, depth: number) {
  return [
    stepStyles.base,
    !arrived && stepStyles.waiting,
    stepStyles.delay(`${Math.round(depth * 140)}ms`),
  ] as const;
}
