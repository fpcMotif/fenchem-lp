import * as stylex from "@stylexjs/stylex";
import { useInView } from "@/compat/motion";
import { dynamic as dynamicTag, type JSX } from "@solidjs/web";
import { createExternalStore } from "@/compat/external-store";
import { ui } from "./shared-values";
import { createSignal, merge } from "solid-js";

const REVEAL_STEP_MS = 90;
const REVEAL_MAX_STEPS = 4;
const subscribeObserverSupport = () => () => {};
const getObserverFallback = () => typeof IntersectionObserver === "undefined";
const getServerObserverFallback = () => false;

const revealDelay = (index: number) => Math.min(index, REVEAL_MAX_STEPS) * REVEAL_STEP_MS;

const sxAttrs = (...args: ReadonlyArray<stylex.StyleXStyles | false | null | undefined>) =>
  stylex.attrs(...args);

const dynamic = stylex.create({
  delay: (ms: number) => ({ transitionDelay: `${ms}ms` }),
});

export function useReveal<T extends HTMLElement>() {
  const [ref, setRef] = createSignal<T>();
  const inView = useInView(ref, { once: true, margin: "0px 0px -10% 0px" });
  const unobservable = createExternalStore(
    subscribeObserverSupport,
    getObserverFallback,
    getServerObserverFallback,
  );
  return { ref: setRef, shown: () => inView() || unobservable() };
}

export function Reveal(props: {
  children: JSX.Element;
  step?: number;
  sx?: stylex.StyleXStyles;
  as?: "div" | "li" | "figure" | "article";
}) {
  const Tag = dynamicTag(() => props.as ?? "div");
  const { ref, shown } = useReveal<HTMLElement>();
  return (
    <Tag
      ref={ref}
      {...sxAttrs(
        ui.reveal,
        shown() && ui.revealShown,
        dynamic.delay(revealDelay(props.step ?? 0)),
        props.sx,
      )}
    >
      {props.children}
    </Tag>
  );
}

export function Section(props: {
  id: string;
  label: string;
  background: stylex.StyleXStyles;
  sx?: stylex.StyleXStyles;
  children: JSX.Element;
}) {
  const nameId = `${props.id}-name`;
  return (
    <section
      id={props.id}
      aria-labelledby={nameId}
      {...stylex.attrs(ui.section, props.background, props.sx)}
    >
      <h2 id={nameId} {...stylex.attrs(ui.srOnly)}>
        {props.label}
      </h2>
      <div {...stylex.attrs(ui.shell, ui.inset)}>{props.children}</div>
    </section>
  );
}

export function ArchPhoto(props: {
  src: string;
  alt: string;
  mode: "load" | "view";
  priority?: boolean;
  ratio: stylex.StyleXStyles;
  position: stylex.StyleXStyles;
}) {
  const p = merge({ priority: false }, props);
  const { ref, shown } = useReveal<HTMLDivElement>();
  return (
    <div ref={ref} {...stylex.attrs(ui.frame, ui.arch, p.ratio)}>
      <img
        src={p.src}
        alt={p.alt}
        loading={p.priority ? undefined : "lazy"}
        fetchpriority={p.priority ? "high" : undefined}
        decoding="async"
        {...stylex.attrs(ui.fill, p.position)}
      />
      <span
        aria-hidden="true"
        {...stylex.attrs(
          ui.veil,
          p.mode === "load" ? ui.veilOnLoad : ui.veilOnView,
          p.mode === "view" && shown() && ui.veilLifted,
        )}
      />
    </div>
  );
}
