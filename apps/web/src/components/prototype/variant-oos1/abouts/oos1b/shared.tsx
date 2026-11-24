import * as stylex from "@stylexjs/stylex";
import { children, createSignal, onSettled, Show, type Accessor } from "solid-js";
import type { JSX } from "@solidjs/web";

import { createExternalStore } from "@/compat/external-store";

import { bp, face, space, tone } from "./tokens.stylex";

// stylex.attrs with reactive (accessor) arguments resolves at runtime here, because
// the StyleX compiler tries to evaluate them at build time and throws.
const sxProps: typeof stylex.attrs = (...args) => stylex.attrs(...args);

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

export function Tag(props: { numeral: string; label?: JSX.Element; pinned?: boolean }) {
  return (
    <span {...stylex.attrs(tagStyles.tag, (props.pinned ?? true) && tagStyles.pinned)}>
      <span>{props.numeral}</span>
      <Show when={props.label}>
        {(label) => <span {...stylex.attrs(tagStyles.muted)}>{label()}</span>}
      </Show>
    </span>
  );
}

const headStyles = stylex.create({
  head: {
    marginBottom: { default: 40, [bp.tablet]: 56, [bp.desktop]: 72 },
  },
  rule: {
    height: 1,
    marginBottom: { default: 22, [bp.tablet]: 30, [bp.desktop]: 36 },
    backgroundColor: tone.ruleFaint,
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
});

export function SectionHead(props: { id: string; title: string }) {
  return (
    <div {...stylex.attrs(headStyles.head)}>
      <div aria-hidden="true" {...stylex.attrs(headStyles.rule)} />
      <h2 id={props.id} {...stylex.attrs(headStyles.title)}>
        {props.title}
      </h2>
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

export function Mat(props: {
  raised?: boolean;
  bare?: boolean;
  head?: JSX.Element;
  foot?: JSX.Element;
  layout?: stylex.StyleXStyles;
  children: JSX.Element;
}) {
  const raised = () => props.raised ?? false;
  const bare = () => props.bare ?? false;
  const head = children(() => props.head);
  const foot = children(() => props.foot);
  return (
    <div
      {...sxProps(
        matStyles.mat,
        raised() && matStyles.raised,
        !raised() && !bare() && matStyles.flat,
        foot() ? matStyles.withFoot : null,
        props.layout,
      )}
    >
      {head() ? <div {...stylex.attrs(matStyles.head)}>{head()}</div> : null}
      {props.children}
      {foot() ? <div {...stylex.attrs(matStyles.foot)}>{foot()}</div> : null}
    </div>
  );
}

export function Bevel(props: { field?: stylex.StyleXStyles; children: JSX.Element }) {
  return (
    <div {...stylex.attrs(matStyles.bevel)}>
      <div {...stylex.attrs(matStyles.core, props.field)}>{props.children}</div>
    </div>
  );
}

export function useMediaQuery(query: string): Accessor<boolean> {
  return createExternalStore(
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
  let node: T | undefined;
  const ref = (el: T) => (node = el);
  const [arrived, setArrived] = createSignal(false);
  onSettled(() => {
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
  });
  return [ref, arrived] as const;
}
