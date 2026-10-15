import { breakpoints, colors } from "@fenchem-lp/ui/tokens.stylex";
import * as stylex from "@stylexjs/stylex";
import { ArrowLeft, ArrowRight, CheckCircle2, X } from "lucide-react";
import { AnimatePresence, m } from "motion/react";
import { useId, useLayoutEffect, useRef, useState, type SubmitEvent } from "react";

import { EASE } from "@/components/prototype/motion-constants";
import { useReducedMotion } from "@/components/prototype/use-reduced-motion";

import { color, ease, font } from "../../variant-oos1/tokens.stylex";
import { Field, useLabDialog } from "../kit";
import {
  COMPANY,
  INQUIRY_SUBJECTS,
  NEXT_STEPS,
  SUBJECT_ROUTES,
  labStyles,
  subjectById,
  type DialogVariantProps,
  type InquirySubjectId,
} from "../kit-values";

const BACKDROP = "rgba(6, 20, 44, 0.5)";
const HAIRLINE = "rgba(26, 26, 26, 0.12)";
const TINT = "#f3f5fa";
const BLUE_WASH = "#e6ecf7";
const HOVER = "@media (hover: hover)";

const fadeIn = stylex.keyframes({ "0%": { opacity: 0 }, "100%": { opacity: 1 } });
const fadeOut = stylex.keyframes({ "0%": { opacity: 1 }, "100%": { opacity: 0 } });
const riseIn = stylex.keyframes({
  "0%": { opacity: 0, transform: "translateY(12px)" },
  "100%": { opacity: 1, transform: "none" },
});
const sinkOut = stylex.keyframes({
  "0%": { opacity: 1, transform: "none", filter: "none" },
  "100%": { opacity: 0, transform: "translateY(-12px)", filter: "blur(4px)" },
});

const styles = stylex.create({
  dialog: {
    "::backdrop": {
      backgroundColor: BACKDROP,
      animationName: fadeIn,
      animationDuration: "200ms",
      animationTimingFunction: ease.out,
    },
  },
  dialogClosing: {
    "::backdrop": {
      animationName: fadeOut,
      animationDuration: "150ms",
      animationFillMode: "forwards",
    },
  },
  panel: {
    position: "absolute",
    top: { default: "auto", [breakpoints.md]: "50%" },
    bottom: { default: 0, [breakpoints.md]: "auto" },
    left: { default: 0, [breakpoints.md]: "50%" },
    translate: { default: null, [breakpoints.md]: "-50% -50%" },
    display: "flex",
    flexDirection: "column",
    boxSizing: "border-box",
    width: { default: "100%", [breakpoints.md]: "min(640px, calc(100vw - 64px))" },
    maxHeight: { default: "calc(100dvh - 24px)", [breakpoints.md]: "calc(100dvh - 64px)" },
    overflow: "hidden",
    backgroundColor: colors.paper,
    boxShadow: "0 32px 80px -24px rgba(6, 20, 44, 0.5)",
    animationName: { default: fadeIn, [breakpoints.motionOk]: riseIn },
    animationDuration: "240ms",
    animationTimingFunction: ease.out,
  },
  panelClosing: {
    animationName: { default: fadeOut, [breakpoints.motionOk]: sinkOut },
    animationDuration: "150ms",
    animationTimingFunction: "ease-out",
    animationFillMode: "forwards",
  },
  head: {
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "space-between",
    gap: 12,
    flexShrink: 0,
    paddingTop: 24,
    paddingBottom: 16,
    paddingInlineStart: { default: 20, [breakpoints.md]: 32 },
    paddingInlineEnd: { default: 8, [breakpoints.md]: 16 },
  },
  progress: {
    display: "flex",
    alignItems: "center",
    gap: 10,
    margin: 0,
    marginBottom: 8,
    fontFamily: font.display,
    fontSize: 12,
    fontWeight: 600,
    letterSpacing: "0.18em",
    textTransform: "uppercase",
    color: colors.brandBlue700,
  },
  progressTrack: {
    display: "flex",
    gap: 4,
  },
  progressDot: {
    width: 16,
    height: 3,
    backgroundColor: HAIRLINE,
    transitionProperty: "background-color",
    transitionDuration: "200ms",
  },
  progressDotOn: {
    backgroundColor: colors.brandBlue700,
  },
  title: {
    margin: 0,
    fontSize: { default: 20, [breakpoints.md]: 24 },
    fontWeight: 700,
    lineHeight: 1.35,
    color: color.ink,
    outlineStyle: "none",
  },
  scroll: {
    flexGrow: 1,
    minHeight: 0,
    overflowY: "auto",
    overscrollBehavior: "contain",
  },
  clip: {
    overflow: "hidden",
  },
  measure: {
    paddingInline: { default: 20, [breakpoints.md]: 32 },
    paddingBottom: { default: "max(24px, env(safe-area-inset-bottom))", [breakpoints.md]: 28 },
  },

  options: {
    borderTopWidth: 1,
    borderTopStyle: "solid",
    borderTopColor: HAIRLINE,
  },
  option: {
    display: "grid",
    gridTemplateColumns: "minmax(0, 1fr) auto",
    alignItems: "center",
    columnGap: 16,
    width: "100%",
    paddingBlock: 16,
    paddingInline: 12,
    marginInline: -12,
    boxSizing: "content-box",
    borderWidth: 0,
    borderBottomWidth: 1,
    borderBottomStyle: "solid",
    borderBottomColor: HAIRLINE,
    backgroundColor: { default: "transparent", ":hover": { default: null, [HOVER]: TINT } },
    fontFamily: "inherit",
    textAlign: "start",
    color: color.ink,
    cursor: "pointer",
    transitionProperty: "background-color",
    transitionDuration: "150ms",
    outlineStyle: { default: "none", ":focus-visible": "solid" },
    outlineWidth: 2,
    outlineColor: colors.brandBlue700,
    outlineOffset: -2,
    WebkitTapHighlightColor: "transparent",
  },
  optionText: {
    display: "flex",
    flexDirection: "column",
    gap: 2,
    minWidth: 0,
  },
  optionLabel: {
    fontSize: 16,
    fontWeight: 700,
    lineHeight: 1.5,
  },
  optionMeta: {
    fontSize: 13,
    lineHeight: 1.6,
    color: color.muted,
  },
  optionArrow: {
    color: {
      default: color.muted,
      [stylex.when.ancestor(":hover")]: { default: null, [HOVER]: colors.brandBlue700 },
    },
    transform: {
      default: null,
      [stylex.when.ancestor(":hover")]: {
        default: null,
        "@media (hover: hover) and (prefers-reduced-motion: no-preference)": "translateX(3px)",
      },
    },
    transitionProperty: "color, transform",
    transitionDuration: "150ms",
    transitionTimingFunction: ease.out,
  },
  companyLine: {
    display: "flex",
    flexWrap: "wrap",
    alignItems: "baseline",
    columnGap: 16,
    rowGap: 2,
    margin: 0,
    marginTop: 20,
    fontSize: 13,
    lineHeight: 1.7,
    color: color.bodyText,
  },
  companyLink: {
    fontWeight: 600,
    fontVariantNumeric: "tabular-nums",
    color: colors.brandBlue700,
    textDecorationLine: { default: "none", ":hover": { default: null, [HOVER]: "underline" } },
    textUnderlineOffset: 3,
  },

  routeCard: {
    display: "grid",
    gridTemplateColumns: "minmax(0, 1fr) auto",
    alignItems: "start",
    gap: 12,
    padding: 16,
    marginBottom: 24,
    borderInlineStartWidth: 3,
    borderInlineStartStyle: "solid",
    borderInlineStartColor: colors.brandBlue700,
    backgroundColor: BLUE_WASH,
  },
  routeTeam: {
    margin: 0,
    fontSize: 15,
    fontWeight: 700,
    color: color.ink,
  },
  routeEnglish: {
    marginInlineStart: 8,
    fontFamily: font.serifAccent,
    fontSize: 15,
    fontStyle: "italic",
    fontWeight: 400,
    color: color.muted,
  },
  routeMeta: {
    margin: 0,
    marginTop: 4,
    fontSize: 13,
    lineHeight: 1.7,
    color: color.bodyText,
  },
  change: {
    display: "inline-flex",
    alignItems: "center",
    gap: 6,
    height: 32,
    paddingInlineStart: 8,
    paddingInlineEnd: 10,
    borderWidth: 0,
    backgroundColor: { default: "transparent", ":hover": { default: null, [HOVER]: colors.paper } },
    fontFamily: "inherit",
    fontSize: 13,
    fontWeight: 600,
    color: colors.brandBlue700,
    cursor: "pointer",
    transitionProperty: "background-color",
    transitionDuration: "150ms",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: 16,
  },
  pair: {
    display: "grid",
    gridTemplateColumns: { default: "1fr", [breakpoints.sm]: "repeat(2, minmax(0, 1fr))" },
    gap: 16,
  },
  submitRow: {
    display: "flex",
    flexDirection: { default: "column", [breakpoints.sm]: "row" },
    alignItems: { default: "stretch", [breakpoints.sm]: "center" },
    justifyContent: "space-between",
    gap: 16,
    marginTop: 4,
    paddingTop: 20,
    borderTopWidth: 1,
    borderTopStyle: "solid",
    borderTopColor: HAIRLINE,
  },

  done: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    gap: 12,
  },
  doneIcon: {
    color: colors.brandBlue700,
  },
  ticket: {
    display: "inline-flex",
    alignItems: "baseline",
    gap: 10,
    paddingBlock: 6,
    paddingInline: 12,
    backgroundColor: TINT,
    fontSize: 13,
    color: color.bodyText,
  },
  ticketValue: {
    fontFamily: font.display,
    fontWeight: 700,
    letterSpacing: "0.06em",
    fontVariantNumeric: "tabular-nums",
    color: color.ink,
  },
  doneText: {
    margin: 0,
    fontSize: 15,
    lineHeight: 1.8,
    color: color.bodyText,
  },
  steps: {
    alignSelf: "stretch",
    borderTopWidth: 1,
    borderTopStyle: "solid",
    borderTopColor: HAIRLINE,
  },
  step: {
    display: "flex",
    gap: 14,
    paddingBlock: 12,
    borderBottomWidth: 1,
    borderBottomStyle: "solid",
    borderBottomColor: HAIRLINE,
    fontSize: 14,
    lineHeight: 1.6,
  },
  stepIndex: {
    flexShrink: 0,
    width: 22,
    fontFamily: font.display,
    fontSize: 13,
    fontWeight: 800,
    letterSpacing: "0.1em",
    color: colors.brandBlue700,
  },
});

type Step = "topic" | "details" | "done";

const STEP_TITLE: Record<Step, string> = {
  topic: "您想咨询什么？",
  details: "留下联系方式",
  done: "已转交对应团队",
};

const indexLabel = (index: number) => String(index + 1).padStart(2, "0");

function useMeasuredHeight() {
  const ref = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState<number | "auto">("auto");

  useLayoutEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new ResizeObserver(([entry]) => setHeight(entry.borderBoxSize[0].blockSize));
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return [ref, height] as const;
}

export function RouteDialog({ subject, onClose }: DialogVariantProps) {
  const { closing, requestClose, dialogProps, panelProps } = useLabDialog(onClose);
  const reduce = useReducedMotion();
  const titleId = useId();
  const formId = useId();
  const titleRef = useRef<HTMLHeadingElement>(null);
  const [measureRef, height] = useMeasuredHeight();
  const [step, setStep] = useState<Step>(subject ? "details" : "topic");
  const [direction, setDirection] = useState<1 | -1>(1);
  const [subjectId, setSubjectId] = useState<InquirySubjectId>(subject ?? INQUIRY_SUBJECTS[0].id);
  const [ticket, setTicket] = useState("");
  const route = SUBJECT_ROUTES[subjectId];
  const active = subjectById(subjectId);

  const go = (next: Step, towards: 1 | -1) => {
    setDirection(towards);
    setStep(next);
    titleRef.current?.focus();
  };

  const handleSubmit = (event: SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();
    setTicket(
      `FC-${subjectId.slice(0, 2).toUpperCase()}-${Math.floor(1000 + Math.random() * 9000)}`,
    );
    go("done", 1);
  };

  const heightTransition = { duration: reduce ? 0 : 0.2, ease: EASE };
  const stepTransition = { duration: reduce ? 0 : 0.2, ease: EASE };
  const offset = reduce ? 0 : 24;
  const stepIndex = step === "topic" ? 0 : 1;

  return (
    <dialog
      aria-labelledby={titleId}
      {...dialogProps}
      {...stylex.props(labStyles.dialog, styles.dialog, closing && styles.dialogClosing)}
    >
      <button
        type="button"
        tabIndex={-1}
        aria-label="关闭"
        onClick={requestClose}
        {...stylex.props(labStyles.dismiss)}
      />
      <div {...panelProps} {...stylex.props(styles.panel, closing && styles.panelClosing)}>
        <header {...stylex.props(styles.head)}>
          <div>
            <p {...stylex.props(styles.progress)}>
              <span lang="en">{step === "done" ? "Sent" : `Step ${stepIndex + 1} / 2`}</span>
              <span aria-hidden="true" {...stylex.props(styles.progressTrack)}>
                {[0, 1].map((index) => (
                  <span
                    key={index}
                    {...stylex.props(
                      styles.progressDot,
                      (step === "done" || index <= stepIndex) && styles.progressDotOn,
                    )}
                  />
                ))}
              </span>
            </p>
            <h2 id={titleId} ref={titleRef} tabIndex={-1} {...stylex.props(styles.title)}>
              {STEP_TITLE[step]}
            </h2>
          </div>
          <button
            type="button"
            aria-label="关闭"
            onClick={requestClose}
            {...stylex.props(labStyles.closeButton)}
          >
            <X size={20} strokeWidth={1.75} aria-hidden="true" />
          </button>
        </header>

        <div {...stylex.props(styles.scroll)}>
          <m.div
            layout={!reduce}
            style={{ height }}
            transition={heightTransition}
            {...stylex.props(styles.clip)}
          >
            <m.div ref={measureRef} layout="position" {...stylex.props(styles.measure)}>
              <AnimatePresence mode="wait" initial={false} custom={direction}>
                <m.div
                  key={step}
                  custom={direction}
                  initial={{ opacity: 0, x: offset * direction }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{
                    opacity: 0,
                    x: (-offset / 2) * direction,
                    transition: { duration: reduce ? 0 : 0.12, ease: EASE },
                  }}
                  transition={stepTransition}
                >
                  {step === "topic" ? (
                    <>
                      <ul {...stylex.props(labStyles.list, styles.options)}>
                        {INQUIRY_SUBJECTS.map((item) => {
                          const target = SUBJECT_ROUTES[item.id];
                          return (
                            <li key={item.id}>
                              <button
                                type="button"
                                onClick={() => {
                                  setSubjectId(item.id);
                                  go("details", 1);
                                }}
                                {...stylex.props(styles.option)}
                              >
                                <span {...stylex.props(styles.optionText)}>
                                  <span {...stylex.props(styles.optionLabel)}>{item.label}</span>
                                  <span {...stylex.props(styles.optionMeta)}>
                                    {target.team} · {target.reply}
                                  </span>
                                </span>
                                <ArrowRight
                                  size={18}
                                  strokeWidth={2}
                                  nonScalingStroke
                                  aria-hidden="true"
                                  {...stylex.props(styles.optionArrow)}
                                />
                              </button>
                            </li>
                          );
                        })}
                      </ul>
                      <p {...stylex.props(styles.companyLine)}>
                        <span>{COMPANY.name}</span>
                        <span>
                          急事请致电{" "}
                          <a
                            href={COMPANY.phone.href ?? undefined}
                            {...stylex.props(styles.companyLink, labStyles.focusRing)}
                          >
                            {COMPANY.phone.value}
                          </a>
                        </span>
                      </p>
                    </>
                  ) : step === "details" ? (
                    <>
                      <div {...stylex.props(styles.routeCard)}>
                        <div>
                          <p {...stylex.props(styles.routeTeam)}>
                            {route.team}
                            <span lang="en" {...stylex.props(styles.routeEnglish)}>
                              {route.english}
                            </span>
                          </p>
                          <p {...stylex.props(styles.routeMeta)}>
                            {active.label} · {route.reply} ·{" "}
                            <a
                              href={route.channel.href ?? undefined}
                              {...stylex.props(styles.companyLink, labStyles.focusRing)}
                            >
                              {route.channel.value}
                            </a>
                          </p>
                        </div>
                        <button
                          type="button"
                          onClick={() => go("topic", -1)}
                          {...stylex.props(styles.change, labStyles.focusRing)}
                        >
                          <ArrowLeft
                            size={14}
                            strokeWidth={2}
                            nonScalingStroke
                            aria-hidden="true"
                          />
                          更换
                        </button>
                      </div>
                      <form id={formId} onSubmit={handleSubmit} {...stylex.props(styles.form)}>
                        <div {...stylex.props(styles.pair)}>
                          <Field id={`${formId}-name`} label="联系人姓名" required>
                            <input
                              id={`${formId}-name`}
                              name="contactName"
                              required
                              autoComplete="name"
                              {...stylex.props(labStyles.input)}
                            />
                          </Field>
                          <Field id={`${formId}-company`} label="公司或机构" required>
                            <input
                              id={`${formId}-company`}
                              name="company"
                              required
                              autoComplete="organization"
                              {...stylex.props(labStyles.input)}
                            />
                          </Field>
                          <Field id={`${formId}-phone`} label="手机号" required>
                            <input
                              id={`${formId}-phone`}
                              name="phone"
                              type="tel"
                              required
                              autoComplete="tel"
                              inputMode="tel"
                              {...stylex.props(labStyles.input)}
                            />
                          </Field>
                          <Field id={`${formId}-email`} label="工作邮箱" required>
                            <input
                              id={`${formId}-email`}
                              name="email"
                              type="email"
                              required
                              autoComplete="email"
                              spellCheck={false}
                              {...stylex.props(labStyles.input)}
                            />
                          </Field>
                        </div>
                        <Field id={`${formId}-message`} label="需求描述" required>
                          <textarea
                            id={`${formId}-message`}
                            name="message"
                            required
                            placeholder={active.placeholder}
                            {...stylex.props(labStyles.input, labStyles.textarea)}
                          />
                        </Field>
                        <div {...stylex.props(styles.submitRow)}>
                          <label {...stylex.props(labStyles.consent)}>
                            <input
                              type="checkbox"
                              name="consent"
                              required
                              {...stylex.props(labStyles.checkbox)}
                            />
                            <span>同意泛成就本次咨询与我联系</span>
                          </label>
                          <button
                            type="submit"
                            {...stylex.props(
                              labStyles.primaryButton,
                              labStyles.trailingIcon,
                              labStyles.focusRing,
                              stylex.defaultMarker(),
                            )}
                          >
                            发送给{route.team}
                            <ArrowRight
                              size={18}
                              strokeWidth={2}
                              nonScalingStroke
                              aria-hidden="true"
                              {...stylex.props(labStyles.buttonArrow)}
                            />
                          </button>
                        </div>
                      </form>
                    </>
                  ) : (
                    <div role="status" {...stylex.props(styles.done)}>
                      <CheckCircle2
                        size={32}
                        strokeWidth={2.5}
                        nonScalingStroke
                        aria-hidden="true"
                        {...stylex.props(styles.doneIcon)}
                      />
                      <p {...stylex.props(styles.ticket)}>
                        咨询编号 <span {...stylex.props(styles.ticketValue)}>{ticket}</span>
                      </p>
                      <p {...stylex.props(styles.doneText)}>
                        {route.team}已收到您的「{active.label}」需求，{route.reply}。
                      </p>
                      <ol aria-label="接下来" {...stylex.props(labStyles.list, styles.steps)}>
                        {NEXT_STEPS.map((item, index) => (
                          <li key={item} {...stylex.props(styles.step)}>
                            <span aria-hidden="true" {...stylex.props(styles.stepIndex)}>
                              {indexLabel(index)}
                            </span>
                            {item}
                          </li>
                        ))}
                      </ol>
                      <button
                        type="button"
                        onClick={requestClose}
                        {...stylex.props(labStyles.primaryButton, labStyles.focusRing)}
                      >
                        完成
                      </button>
                    </div>
                  )}
                </m.div>
              </AnimatePresence>
            </m.div>
          </m.div>
        </div>
      </div>
    </dialog>
  );
}
