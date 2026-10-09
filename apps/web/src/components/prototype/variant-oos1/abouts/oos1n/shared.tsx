import * as stylex from "@stylexjs/stylex";
import { useInView } from "motion/react";
import { type ReactNode, useRef, useSyncExternalStore } from "react";
import { ui } from "./shared-values";

const REVEAL_STEP_MS = 90;
const REVEAL_MAX_STEPS = 4;
const subscribeObserverSupport = () => () => {};
const getObserverFallback = () => typeof IntersectionObserver === "undefined";
const getServerObserverFallback = () => false;

const revealDelay = (index: number) => Math.min(index, REVEAL_MAX_STEPS) * REVEAL_STEP_MS;

const dynamic = stylex.create({
  delay: (ms: number) => ({ transitionDelay: `${ms}ms` }),
});

export function useReveal<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -10% 0px" });
  const unobservable = useSyncExternalStore(
    subscribeObserverSupport,
    getObserverFallback,
    getServerObserverFallback,
  );
  return { ref, shown: inView || unobservable };
}

export function Reveal({
  children,
  step: stagger = 0,
  sx,
  as: Tag = "div",
}: {
  children: ReactNode;
  step?: number;
  sx?: stylex.StyleXStyles;
  as?: "div" | "li" | "figure" | "article";
}) {
  const { ref, shown } = useReveal<HTMLDivElement & HTMLLIElement>();
  return (
    <Tag
      ref={ref}
      {...stylex.props(ui.reveal, shown && ui.revealShown, dynamic.delay(revealDelay(stagger)), sx)}
    >
      {children}
    </Tag>
  );
}

export function Section({
  id,
  label,
  background,
  sx,
  children,
}: {
  id: string;
  label: string;
  background: stylex.StyleXStyles;
  sx?: stylex.StyleXStyles;
  children: ReactNode;
}) {
  const nameId = `${id}-name`;
  return (
    <section id={id} aria-labelledby={nameId} {...stylex.props(ui.section, background, sx)}>
      <h2 id={nameId} {...stylex.props(ui.srOnly)}>
        {label}
      </h2>
      <div {...stylex.props(ui.shell, ui.inset)}>{children}</div>
    </section>
  );
}

export function ArchPhoto({
  src,
  alt,
  mode,
  priority = false,
  ratio,
  position,
}: {
  src: string;
  alt: string;
  mode: "load" | "view";
  priority?: boolean;
  ratio: stylex.StyleXStyles;
  position: stylex.StyleXStyles;
}) {
  const { ref, shown } = useReveal<HTMLDivElement>();
  return (
    <div ref={ref} {...stylex.props(ui.frame, ui.arch, ratio)}>
      <img
        src={src}
        alt={alt}
        loading={priority ? undefined : "lazy"}
        fetchPriority={priority ? "high" : undefined}
        decoding="async"
        {...stylex.props(ui.fill, position)}
      />
      <span
        aria-hidden="true"
        {...stylex.props(
          ui.veil,
          mode === "load" ? ui.veilOnLoad : ui.veilOnView,
          mode === "view" && shown && ui.veilLifted,
        )}
      />
    </div>
  );
}
