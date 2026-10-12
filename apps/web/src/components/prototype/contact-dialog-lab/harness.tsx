import * as stylex from "@stylexjs/stylex";
import { LazyMotion, MotionConfig, domMax } from "motion/react";
import { useEffect, useLayoutEffect, useRef, useState, type ComponentType } from "react";
import { createPortal } from "react-dom";

import { VariantOOS1 } from "../variant-oos1/index";
import { PickerHostContext, type DialogVariantProps, type InquirySubjectId } from "./kit";
import { DrawerDialog } from "./variants/drawer";
import { LetterDialog } from "./variants/letter";
import { RouteDialog } from "./variants/route";
import { SplitDialog } from "./variants/split";

const VARIANTS: { name: string; Component: ComponentType<DialogVariantProps> }[] = [
  { name: "Split", Component: SplitDialog },
  { name: "Drawer", Component: DrawerDialog },
  { name: "Route", Component: RouteDialog },
  { name: "Letter", Component: LetterDialog },
];

const PICKER_CSS = `
.proto-picker {
  position: fixed;
  bottom: 24px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 2147483647;
  display: flex;
  align-items: center;
  gap: 2px;
  padding: 4px;
  border-radius: 999px;
  background: rgba(10, 10, 10, 0.82);
  -webkit-backdrop-filter: blur(12px) saturate(1.4);
  backdrop-filter: blur(12px) saturate(1.4);
  box-shadow:
    0 0 0 1px rgba(255, 255, 255, 0.08) inset,
    0 8px 24px rgba(0, 0, 0, 0.24),
    0 2px 6px rgba(0, 0, 0, 0.12);
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
  font-size: 13px;
  line-height: 1;
  -webkit-font-smoothing: antialiased;
  user-select: none;
  -webkit-user-select: none;
}

.proto-picker-highlight {
  position: absolute;
  top: 4px;
  left: 0;
  height: 28px;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.12);
  will-change: transform;
}

.proto-picker[data-ready] .proto-picker-highlight {
  transition:
    transform 250ms cubic-bezier(0.23, 1, 0.32, 1),
    width 250ms cubic-bezier(0.23, 1, 0.32, 1);
}

@media (prefers-reduced-motion: reduce) {
  .proto-picker[data-ready] .proto-picker-highlight { transition: none; }
}

.proto-picker-item {
  position: relative;
  display: flex;
  align-items: center;
  height: 28px;
  padding: 0 12px;
  border: 0;
  border-radius: 999px;
  background: transparent;
  color: rgba(255, 255, 255, 0.55);
  font: inherit;
  cursor: pointer;
  transition: color 150ms ease-out;
}

.proto-picker-item:hover {
  color: rgba(255, 255, 255, 0.85);
}

.proto-picker-item:active {
  transform: scale(0.97);
}

.proto-picker-item:focus-visible {
  outline: 2px solid rgba(255, 255, 255, 0.4);
  outline-offset: 2px;
}

.proto-picker-item[data-active] {
  color: #fff;
}

.proto-picker-divider {
  width: 1px;
  height: 16px;
  margin: 0 4px;
  background: rgba(255, 255, 255, 0.12);
}

.proto-picker-replay {
  padding: 0 10px;
  font-size: 14px;
}

.proto-picker[data-position="top"] {
  bottom: auto;
  top: 24px;
}

.state-switcher {
  all: unset;
  position: fixed;
  bottom: max(24px, env(safe-area-inset-bottom));
  left: 50%;
  translate: -50% 0;
  z-index: 2147483647;
  display: flex;
  gap: 2px;
  max-width: calc(100vw - 32px);
  overflow-x: auto;
  scrollbar-width: none;
  padding: 4px;
  border-radius: 999px;
  background: rgb(20 20 20 / 0.9);
  box-shadow: inset 0 0 0 1px rgb(255 255 255 / 0.1), 0 8px 24px rgb(0 0 0 / 0.25);
  font: 13px/1 system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
  user-select: none;
}
.state-switcher button {
  all: unset;
  flex: none;
  padding: 7px 14px;
  border-radius: 999px;
  font: inherit;
  color: rgb(255 255 255 / 0.6);
  cursor: pointer;
}
.state-switcher button:hover {
  color: rgb(255 255 255 / 0.85);
}
.state-switcher button[aria-pressed="true"] {
  background: rgb(255 255 255 / 0.14);
  color: rgb(255 255 255);
}
.state-switcher button:focus-visible {
  outline: 2px solid rgb(255 255 255 / 0.7);
  outline-offset: 2px;
}
`;

const styles = stylex.create({
  page: {
    minWidth: 0,
  },
});

const clampIndex = (index: number) => Math.min(Math.max(index, 0), VARIANTS.length - 1);

const SPLIT_STATES = [
  { id: "pristine", label: "Pristine" },
  { id: "technical", label: "Technical" },
  { id: "errors", label: "Errors" },
  { id: "submitted", label: "Submitted" },
  { id: "long-text", label: "Long Text" },
] as const;

export function ContactDialogLab({
  initial,
  state = "pristine",
}: {
  initial: number;
  state?: string;
}) {
  const [current, setCurrent] = useState(() => clampIndex(initial));
  const [activeState, setActiveState] = useState(() =>
    SPLIT_STATES.some((s) => s.id === state) ? state : "pristine",
  );
  const [switcherVisible, setSwitcherVisible] = useState(true);
  const [mountKey, setMountKey] = useState(0);
  const [open, setOpen] = useState(true);
  const [subject, setSubject] = useState<InquirySubjectId | null>(null);
  const [mounted, setMounted] = useState(false);
  const [pickerHost, setPickerHost] = useState<HTMLElement | null>(null);
  const [readyHost, setReadyHost] = useState<HTMLElement | null | undefined>(undefined);
  const highlightRef = useRef<HTMLSpanElement>(null);
  const itemRefs = useRef<(HTMLButtonElement | null)[]>([]);
  useEffect(() => {
    const id = setTimeout(() => setMounted(true), 0);
    return () => clearTimeout(id);
  }, []);

  const moveHighlight = () => {
    const item = itemRefs.current[current];
    const highlight = highlightRef.current;
    if (!item || !highlight) return;
    highlight.style.width = `${item.offsetWidth}px`;
    highlight.style.transform = `translateX(${item.offsetLeft}px)`;
  };

  useLayoutEffect(moveHighlight);

  useEffect(() => {
    window.addEventListener("resize", moveHighlight);
    return () => window.removeEventListener("resize", moveHighlight);
  });

  useEffect(() => {
    if (!mounted) return;
    let second = 0;
    const first = requestAnimationFrame(() => {
      second = requestAnimationFrame(() => setReadyHost(pickerHost));
    });
    return () => {
      cancelAnimationFrame(first);
      cancelAnimationFrame(second);
    };
  }, [mounted, pickerHost]);

  const openDialog = (nextSubject: InquirySubjectId | null) => {
    setSubject(nextSubject);
    setMountKey((key) => key + 1);
    setOpen(true);
  };

  const setActive = (index: number) => {
    if (index < 0 || index >= VARIANTS.length) return;
    setCurrent(index);
    openDialog(null);
    const url = new URL(window.location.href);
    url.searchParams.set("v", String(index + 1));
    window.history.replaceState(window.history.state, "", url);
  };

  const switchState = (nextState: string) => {
    setActiveState(nextState);
    const url = new URL(window.location.href);
    url.searchParams.set("__state", nextState);
    window.history.replaceState(window.history.state, "", url);
  };

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement;
      if (/^(INPUT|TEXTAREA|SELECT)$/.test(target.tagName) || target.isContentEditable) return;
      if (event.metaKey || event.ctrlKey || event.altKey) return;

      if (current === 0) {
        if (event.key === "h" || event.key === "H") {
          setSwitcherVisible((v) => !v);
          return;
        }
        const digit = Number.parseInt(event.key, 10);
        if (digit >= 1 && digit <= SPLIT_STATES.length) {
          switchState(SPLIT_STATES[digit - 1].id);
          return;
        }
        const currentIndex = SPLIT_STATES.findIndex((s) => s.id === activeState);
        if (event.key === "ArrowRight") {
          switchState(SPLIT_STATES[(currentIndex + 1) % SPLIT_STATES.length].id);
          return;
        }
        if (event.key === "ArrowLeft") {
          switchState(
            SPLIT_STATES[(currentIndex - 1 + SPLIT_STATES.length) % SPLIT_STATES.length].id,
          );
          return;
        }
      }

      if (event.key === "r" || event.key === "R") openDialog(subject);
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  });

  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey)
        return;
      const link = (event.target as Element).closest('main a[href="#contact"]');
      if (!link) return;
      event.preventDefault();
      event.stopPropagation();
      openDialog(link.closest("#contact-visit") ? "visit" : null);
    };
    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, []);

  const Variant = VARIANTS[current].Component;

  const picker = (
    <nav
      className="proto-picker"
      aria-label="Prototype variants"
      data-position="top"
      data-ready={readyHost === pickerHost ? "" : undefined}
    >
      <span ref={highlightRef} className="proto-picker-highlight" aria-hidden="true" />
      {VARIANTS.map((variant, index) => (
        <button
          key={variant.name}
          ref={(node) => {
            itemRefs.current[index] = node;
          }}
          type="button"
          className="proto-picker-item"
          data-active={index === current ? "" : undefined}
          aria-current={index === current ? "true" : undefined}
          onClick={() => setActive(index)}
        >
          {variant.name}
        </button>
      ))}
      <span className="proto-picker-divider" aria-hidden="true" />
      <button
        type="button"
        className="proto-picker-item proto-picker-replay"
        aria-label="Replay animation (R)"
        onClick={() => openDialog(subject)}
      >
        ↻
      </button>
    </nav>
  );

  return (
    <LazyMotion features={domMax} strict>
      <MotionConfig reducedMotion="user">
        <style>{PICKER_CSS}</style>
        <div {...stylex.props(styles.page)}>
          <VariantOOS1 startView="contact" />
        </div>
        {mounted ? (
          <PickerHostContext value={setPickerHost}>
            {open ? (
              <Variant
                key={`${current}-${mountKey}-${activeState}`}
                subject={subject}
                onClose={() => setOpen(false)}
                state={activeState}
              />
            ) : null}
            {current === 0 && switcherVisible
              ? createPortal(
                  <nav className="state-switcher" aria-label="States">
                    {SPLIT_STATES.map((s) => (
                      <button
                        key={s.id}
                        type="button"
                        data-state={s.id}
                        aria-pressed={activeState === s.id ? "true" : "false"}
                        onClick={() => switchState(s.id)}
                      >
                        {s.label}
                      </button>
                    ))}
                  </nav>,
                  document.body,
                )
              : null}
            {createPortal(picker, pickerHost ?? document.body)}
          </PickerHostContext>
        ) : null}
      </MotionConfig>
    </LazyMotion>
  );
}
