import { breakpoints, colors } from "@fenchem-lp/ui/tokens.stylex";
import * as stylex from "@stylexjs/stylex";
import { Check, CheckCircle2, ChevronDown, Copy, Mail, MapPin, Phone, X } from "lucide-react";
import { useId, useRef, useState, type ReactNode, type SubmitEvent } from "react";

import { color, font } from "../../variant-oos1/tokens.stylex";
import {
  COMPANY,
  CONTACT_DETAILS,
  Field,
  INQUIRY_SUBJECTS,
  NEXT_STEPS,
  labStyles,
  subjectById,
  useCopy,
  useLabDialog,
  type DialogVariantProps,
  type InquirySubjectId,
} from "../kit";

const BACKDROP = "rgba(6, 20, 44, 0.32)";
const EASE_DRAWER = "cubic-bezier(0.32, 0.72, 0, 1)";
const HAIRLINE = "rgba(26, 26, 26, 0.12)";
const TINT = "#f3f5fa";
const HOVER = "@media (hover: hover)";

const fadeIn = stylex.keyframes({ "0%": { opacity: 0 }, "100%": { opacity: 1 } });
const fadeOut = stylex.keyframes({ "0%": { opacity: 1 }, "100%": { opacity: 0 } });
const slideIn = stylex.keyframes({
  "0%": { transform: "translateX(100%)" },
  "100%": { transform: "none" },
});
const slideOut = stylex.keyframes({
  "0%": { transform: "none" },
  "100%": { transform: "translateX(100%)" },
});

const styles = stylex.create({
  dialog: {
    "::backdrop": {
      backgroundColor: BACKDROP,
      animationName: fadeIn,
      animationDuration: "300ms",
      animationTimingFunction: EASE_DRAWER,
    },
  },
  dialogClosing: {
    "::backdrop": {
      animationName: fadeOut,
      animationDuration: "200ms",
      animationFillMode: "forwards",
    },
  },
  panel: {
    position: "absolute",
    top: 0,
    right: 0,
    bottom: 0,
    display: "flex",
    flexDirection: "column",
    boxSizing: "border-box",
    width: { default: "100%", [breakpoints.sm]: 480 },
    backgroundColor: colors.paper,
    boxShadow: "-24px 0 64px -32px rgba(6, 20, 44, 0.45)",
    animationName: { default: fadeIn, [breakpoints.motionOk]: slideIn },
    animationDuration: "300ms",
    animationTimingFunction: EASE_DRAWER,
  },
  panelClosing: {
    animationName: { default: fadeOut, [breakpoints.motionOk]: slideOut },
    animationDuration: "200ms",
    animationTimingFunction: "ease-out",
    animationFillMode: "forwards",
  },
  head: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 12,
    flexShrink: 0,
    height: 64,
    paddingInlineStart: 24,
    paddingInlineEnd: 12,
    borderBottomWidth: 1,
    borderBottomStyle: "solid",
    borderBottomColor: HAIRLINE,
  },
  title: {
    margin: 0,
    fontSize: 18,
    fontWeight: 700,
    color: color.ink,
  },
  body: {
    flexGrow: 1,
    minHeight: 0,
    overflowY: "auto",
    overscrollBehavior: "contain",
  },

  company: {
    paddingTop: 24,
    paddingInline: 24,
    paddingBottom: 8,
  },
  companyName: {
    margin: 0,
    fontSize: 16,
    fontWeight: 700,
    lineHeight: 1.5,
    color: color.ink,
  },
  companyEnglish: {
    margin: 0,
    fontFamily: font.serifAccent,
    fontSize: 16,
    fontStyle: "italic",
    color: color.muted,
  },
  channels: {
    marginTop: 16,
    borderTopWidth: 1,
    borderTopStyle: "solid",
    borderTopColor: HAIRLINE,
  },
  channel: {
    display: "grid",
    gridTemplateColumns: "20px minmax(0, 1fr) 40px",
    alignItems: "center",
    columnGap: 12,
    minHeight: 56,
    borderBottomWidth: 1,
    borderBottomStyle: "solid",
    borderBottomColor: HAIRLINE,
  },
  channelIcon: {
    color: colors.brandBlue700,
  },
  channelText: {
    display: "flex",
    flexDirection: "column",
    minWidth: 0,
    paddingBlock: 8,
  },
  channelTerm: {
    fontSize: 12,
    lineHeight: 1.5,
    color: color.muted,
  },
  channelValue: {
    fontSize: 15,
    fontWeight: 500,
    lineHeight: 1.5,
    fontVariantNumeric: "tabular-nums",
    color: color.ink,
    overflowWrap: "break-word",
  },
  channelLink: {
    color: { default: color.ink, ":hover": { default: null, [HOVER]: colors.brandBlue700 } },
    textDecorationLine: "none",
    transitionProperty: "color",
    transitionDuration: "150ms",
  },
  copy: {
    display: "grid",
    placeItems: "center",
    width: 40,
    height: 40,
    padding: 0,
    borderWidth: 0,
    borderRadius: 0,
    backgroundColor: { default: "transparent", ":hover": { default: null, [HOVER]: TINT } },
    color: { default: color.muted, ":hover": { default: null, [HOVER]: color.ink } },
    cursor: "pointer",
    transform: {
      default: null,
      ":enabled:active": { default: null, [breakpoints.motionOk]: "scale(0.96)" },
    },
    transitionProperty: "background-color, color, transform",
    transitionDuration: "150ms",
    transitionTimingFunction: "ease-out",
    WebkitTapHighlightColor: "transparent",
  },
  copied: {
    color: colors.brandBlue700,
  },
  iconStack: {
    display: "grid",
    placeItems: "center",
  },
  iconLayer: {
    display: "grid",
    gridRow: 1,
    gridColumn: 1,
    transitionProperty: {
      default: "opacity",
      [breakpoints.motionOk]: "opacity, transform, filter",
    },
    transitionDuration: "300ms",
    transitionTimingFunction: "cubic-bezier(0.2, 0, 0, 1)",
  },
  iconHidden: {
    opacity: 0,
    transform: { default: null, [breakpoints.motionOk]: "scale(0.25)" },
    filter: { default: null, [breakpoints.motionOk]: "blur(4px)" },
  },

  section: {
    marginTop: 16,
    paddingBlock: 24,
    paddingInline: 24,
    backgroundColor: TINT,
  },
  sectionHead: {
    margin: 0,
    marginBottom: 4,
    fontSize: 16,
    fontWeight: 700,
    color: color.ink,
  },
  sectionLead: {
    margin: 0,
    marginBottom: 20,
    fontSize: 13,
    lineHeight: 1.7,
    color: color.bodyText,
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: 16,
  },
  selectWrap: {
    position: "relative",
  },
  select: {
    appearance: "none",
    paddingInlineEnd: 40,
    cursor: "pointer",
  },
  selectIcon: {
    position: "absolute",
    top: "50%",
    right: 12,
    translate: "0 -50%",
    color: color.muted,
    pointerEvents: "none",
  },
  pair: {
    display: "grid",
    gridTemplateColumns: { default: "1fr", [breakpoints.sm]: "repeat(2, minmax(0, 1fr))" },
    gap: 16,
  },
  footer: {
    display: "flex",
    flexDirection: "column",
    gap: 12,
    flexShrink: 0,
    paddingTop: 16,
    paddingInline: 24,
    paddingBottom: "max(16px, env(safe-area-inset-bottom))",
    borderTopWidth: 1,
    borderTopStyle: "solid",
    borderTopColor: HAIRLINE,
    backgroundColor: colors.paper,
  },
  submit: {
    width: "100%",
  },

  done: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    gap: 10,
  },
  doneIcon: {
    color: colors.brandBlue700,
  },
  doneTitle: {
    margin: 0,
    fontSize: 18,
    fontWeight: 700,
    color: color.ink,
  },
  doneText: {
    margin: 0,
    fontSize: 14,
    lineHeight: 1.8,
    color: color.bodyText,
  },
  steps: {
    display: "flex",
    flexDirection: "column",
    gap: 8,
    marginTop: 6,
  },
  step: {
    display: "flex",
    gap: 10,
    fontSize: 14,
    lineHeight: 1.6,
    color: color.ink,
  },
  stepIndex: {
    flexShrink: 0,
    fontFamily: font.display,
    fontWeight: 800,
    fontSize: 13,
    color: colors.brandBlue700,
  },
  again: {
    marginTop: 8,
    padding: 0,
    borderWidth: 0,
    backgroundColor: "transparent",
    fontFamily: "inherit",
    fontSize: 14,
    fontWeight: 600,
    color: colors.brandBlue700,
    textDecorationLine: { default: "none", ":hover": { default: null, [HOVER]: "underline" } },
    textUnderlineOffset: 4,
    cursor: "pointer",
  },
});

function Channel({
  icon,
  term,
  value,
  href,
  copied,
  onCopy,
}: {
  icon: ReactNode;
  term: string;
  value: string;
  href: string | null;
  copied: boolean;
  onCopy: (valueNode: HTMLElement | null) => void;
}) {
  const valueRef = useRef<HTMLSpanElement>(null);
  return (
    <li {...stylex.props(styles.channel)}>
      <span aria-hidden="true" {...stylex.props(styles.channelIcon)}>
        {icon}
      </span>
      <span {...stylex.props(styles.channelText)}>
        <span {...stylex.props(styles.channelTerm)}>{term}</span>
        <span ref={valueRef} {...stylex.props(styles.channelValue)}>
          {href ? (
            <a href={href} {...stylex.props(styles.channelLink, labStyles.focusRing)}>
              {value}
            </a>
          ) : (
            value
          )}
        </span>
      </span>
      <button
        type="button"
        aria-label={copied ? `${term}已复制` : `复制${term}`}
        onClick={() => onCopy(valueRef.current)}
        {...stylex.props(styles.copy, copied && styles.copied, labStyles.focusRing)}
      >
        <span aria-hidden="true" {...stylex.props(styles.iconStack)}>
          <span {...stylex.props(styles.iconLayer, copied && styles.iconHidden)}>
            <Copy size={16} strokeWidth={1.5} nonScalingStroke />
          </span>
          <span {...stylex.props(styles.iconLayer, !copied && styles.iconHidden)}>
            <Check size={16} strokeWidth={1.5} nonScalingStroke />
          </span>
        </span>
      </button>
    </li>
  );
}

export function DrawerDialog({ subject, onClose }: DialogVariantProps) {
  const { closing, requestClose, dialogProps, panelProps } = useLabDialog(onClose);
  const titleId = useId();
  const formId = useId();
  const { copied, copy } = useCopy();
  const [subjectId, setSubjectId] = useState(subject ?? INQUIRY_SUBJECTS[0].id);
  const [submitted, setSubmitted] = useState(false);
  const active = subjectById(subjectId);

  const handleSubmit = (event: SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitted(true);
  };

  const channels = CONTACT_DETAILS.map((detail) => ({
    icon: detail.href?.startsWith("tel:") ? (
      <Phone size={18} strokeWidth={2} nonScalingStroke />
    ) : detail.href?.startsWith("mailto:") ? (
      <Mail size={18} strokeWidth={2} nonScalingStroke />
    ) : (
      <MapPin size={18} strokeWidth={2} nonScalingStroke />
    ),
    ...detail,
  }));

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
          <h2 id={titleId} {...stylex.props(styles.title)}>
            联系泛成
          </h2>
          <button
            type="button"
            aria-label="关闭"
            onClick={requestClose}
            {...stylex.props(labStyles.closeButton)}
          >
            <X size={20} strokeWidth={1.75} aria-hidden="true" />
          </button>
        </header>

        <div {...stylex.props(styles.body)}>
          <section aria-label="公司信息" {...stylex.props(styles.company)}>
            <p {...stylex.props(styles.companyName)}>{COMPANY.name}</p>
            <p lang="en" {...stylex.props(styles.companyEnglish)}>
              {COMPANY.english}
            </p>
            <ul {...stylex.props(labStyles.list, styles.channels)}>
              {channels.map((channel) => (
                <Channel
                  key={channel.term}
                  icon={channel.icon}
                  term={channel.term}
                  value={channel.value}
                  href={channel.href}
                  copied={copied === channel.value}
                  onCopy={(valueNode) => copy(channel.value, valueNode)}
                />
              ))}
            </ul>
          </section>

          <section aria-labelledby={`${formId}-title`} {...stylex.props(styles.section)}>
            {submitted ? (
              <div role="status" {...stylex.props(styles.done, labStyles.swapIn)}>
                <CheckCircle2
                  size={32}
                  strokeWidth={2.5}
                  nonScalingStroke
                  aria-hidden="true"
                  {...stylex.props(styles.doneIcon)}
                />
                <h3 id={`${formId}-title`} {...stylex.props(styles.doneTitle)}>
                  留言已提交
                </h3>
                <p {...stylex.props(styles.doneText)}>
                  「{active.label}」需求已转交对应团队，工作日 24 小时内回复。
                </p>
                <ol {...stylex.props(labStyles.list, styles.steps)}>
                  {NEXT_STEPS.map((step, index) => (
                    <li key={step} {...stylex.props(styles.step)}>
                      <span aria-hidden="true" {...stylex.props(styles.stepIndex)}>
                        {index + 1}
                      </span>
                      {step}
                    </li>
                  ))}
                </ol>
                <button
                  type="button"
                  onClick={() => setSubmitted(false)}
                  {...stylex.props(styles.again, labStyles.focusRing)}
                >
                  再留一条
                </button>
              </div>
            ) : (
              <>
                <h3 id={`${formId}-title`} {...stylex.props(styles.sectionHead)}>
                  在线留言
                </h3>
                <p {...stylex.props(styles.sectionLead)}>
                  不方便致电？留下需求，专属客户经理会主动联系您。
                </p>
                <form id={formId} onSubmit={handleSubmit} {...stylex.props(styles.form)}>
                  <Field id={`${formId}-subject`} label="咨询主题">
                    <div {...stylex.props(styles.selectWrap)}>
                      <select
                        id={`${formId}-subject`}
                        name="subject"
                        value={subjectId}
                        onChange={(event) => setSubjectId(event.target.value as InquirySubjectId)}
                        {...stylex.props(labStyles.input, styles.select)}
                      >
                        {INQUIRY_SUBJECTS.map((item) => (
                          <option key={item.id} value={item.id}>
                            {item.label}
                          </option>
                        ))}
                      </select>
                      <ChevronDown
                        size={18}
                        strokeWidth={1.5}
                        nonScalingStroke
                        aria-hidden="true"
                        {...stylex.props(styles.selectIcon)}
                      />
                    </div>
                  </Field>
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
                  </div>
                  <div {...stylex.props(styles.pair)}>
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
                </form>
              </>
            )}
          </section>
        </div>

        {submitted ? null : (
          <div {...stylex.props(styles.footer)}>
            <label {...stylex.props(labStyles.consent)}>
              <input
                type="checkbox"
                name="consent"
                form={formId}
                required
                {...stylex.props(labStyles.checkbox)}
              />
              <span>同意泛成就本次咨询联系我，配方信息严格保密</span>
            </label>
            <button
              type="submit"
              form={formId}
              {...stylex.props(labStyles.primaryButton, labStyles.focusRing, styles.submit)}
            >
              发送留言
            </button>
          </div>
        )}
      </div>
    </dialog>
  );
}
