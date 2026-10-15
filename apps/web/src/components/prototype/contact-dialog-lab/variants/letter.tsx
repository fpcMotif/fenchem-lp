import { breakpoints, colors } from "@fenchem-lp/ui/tokens.stylex";
import * as stylex from "@stylexjs/stylex";
import { ArrowRight, ChevronDown, X } from "lucide-react";
import { useId, useRef, useState, type SubmitEvent } from "react";

import { color, ease, font } from "../../variant-oos1/tokens.stylex";
import { useLabDialog } from "../kit";
import {
  COMPANY,
  CONTACT_DETAILS,
  INQUIRY_SUBJECTS,
  SUBJECT_ROUTES,
  labStyles,
  subjectById,
  type DialogVariantProps,
  type InquirySubjectId,
} from "../kit-values";

const BACKDROP = "rgba(6, 20, 44, 0.5)";
const HAIRLINE = "rgba(26, 26, 26, 0.12)";
const RULE = "rgba(26, 26, 26, 0.1)";
const FIELD_BORDER = "#8a93a3";
const LINE_HEIGHT = 36;
const HOVER = "@media (hover: hover)";

const fadeIn = stylex.keyframes({ "0%": { opacity: 0 }, "100%": { opacity: 1 } });
const fadeOut = stylex.keyframes({ "0%": { opacity: 1 }, "100%": { opacity: 0 } });
const slideUp = stylex.keyframes({
  "0%": { opacity: 0, transform: "translateY(32px)" },
  "100%": { opacity: 1, transform: "none" },
});
const slideDown = stylex.keyframes({
  "0%": { opacity: 1, transform: "none", filter: "none" },
  "100%": { opacity: 0, transform: "translateY(-12px)", filter: "blur(4px)" },
});
const stampIn = stylex.keyframes({
  "0%": { opacity: 0, transform: "rotate(-8deg) scale(1.2)" },
  "100%": { opacity: 1, transform: "rotate(-8deg) scale(1)" },
});

const dynamic = stylex.create({
  minHeight: (height: number) => ({ minHeight: height }),
});

const styles = stylex.create({
  dialog: {
    "::backdrop": {
      backgroundColor: BACKDROP,
      animationName: fadeIn,
      animationDuration: "220ms",
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
    top: { default: 0, [breakpoints.md]: "50%" },
    left: { default: 0, [breakpoints.md]: "50%" },
    translate: { default: null, [breakpoints.md]: "-50% -50%" },
    boxSizing: "border-box",
    width: { default: "100%", [breakpoints.md]: "min(760px, calc(100vw - 64px))" },
    height: { default: "100dvh", [breakpoints.md]: "auto" },
    maxHeight: { default: "none", [breakpoints.md]: "calc(100dvh - 64px)" },
    overflowY: "auto",
    overscrollBehavior: "contain",
    borderTopWidth: 4,
    borderTopStyle: "solid",
    borderTopColor: colors.brandBlue700,
    backgroundColor: colors.paper,
    boxShadow: "0 40px 90px -30px rgba(6, 20, 44, 0.55)",
    animationName: { default: fadeIn, [breakpoints.motionOk]: slideUp },
    animationDuration: "300ms",
    animationTimingFunction: ease.out,
  },
  panelClosing: {
    animationName: { default: fadeOut, [breakpoints.motionOk]: slideDown },
    animationDuration: "150ms",
    animationTimingFunction: "ease-out",
    animationFillMode: "forwards",
  },
  close: {
    position: "absolute",
    top: 12,
    right: 12,
    color: color.ink,
  },

  masthead: {
    display: "flex",
    flexWrap: "wrap",
    alignItems: "flex-end",
    justifyContent: "space-between",
    columnGap: 24,
    rowGap: 8,
    paddingTop: { default: 28, [breakpoints.md]: 36 },
    paddingBottom: 16,
    paddingInlineStart: { default: 20, [breakpoints.md]: 48 },
    paddingInlineEnd: { default: 56, [breakpoints.md]: 72 },
  },
  wordmark: {
    margin: 0,
    fontFamily: font.display,
    fontSize: 22,
    fontWeight: 800,
    lineHeight: 1,
    letterSpacing: "0.2em",
    color: colors.brandBlue700,
  },
  companyName: {
    margin: 0,
    marginTop: 8,
    fontSize: 13,
    fontWeight: 500,
    letterSpacing: "0.04em",
    color: color.ink,
  },
  englishBlock: {
    textAlign: { default: "start", [breakpoints.md]: "end" },
  },
  english: {
    margin: 0,
    fontFamily: font.serifAccent,
    fontSize: 18,
    fontStyle: "italic",
    lineHeight: 1.2,
    color: color.ink,
  },
  since: {
    margin: 0,
    marginTop: 4,
    fontFamily: font.display,
    fontSize: 11,
    fontWeight: 600,
    letterSpacing: "0.2em",
    textTransform: "uppercase",
    color: color.muted,
  },
  letterhead: {
    display: "flex",
    flexWrap: "wrap",
    columnGap: 16,
    rowGap: 4,
    marginInline: { default: 20, [breakpoints.md]: 48 },
    paddingBlock: 10,
    borderTopWidth: 1,
    borderTopStyle: "solid",
    borderTopColor: color.ink,
    borderBottomWidth: 1,
    borderBottomStyle: "solid",
    borderBottomColor: HAIRLINE,
    fontSize: 12,
    fontStyle: "normal",
    lineHeight: 1.6,
    letterSpacing: "0.02em",
    fontVariantNumeric: "tabular-nums",
    color: color.bodyText,
  },
  letterheadLink: {
    color: { default: color.bodyText, ":hover": { default: null, [HOVER]: colors.brandBlue700 } },
    textDecorationLine: "none",
    transitionProperty: "color",
    transitionDuration: "150ms",
  },

  body: {
    paddingTop: 24,
    paddingInline: { default: 20, [breakpoints.md]: 48 },
    paddingBottom: { default: "max(28px, env(safe-area-inset-bottom))", [breakpoints.md]: 40 },
  },
  bodySent: {
    display: "grid",
    alignContent: "center",
  },
  date: {
    margin: 0,
    marginBottom: 16,
    fontSize: 13,
    textAlign: "end",
    fontVariantNumeric: "tabular-nums",
    color: color.muted,
  },
  salutation: {
    margin: 0,
    marginBottom: 8,
    fontSize: { default: 16, [breakpoints.md]: 18 },
    fontWeight: 700,
    color: color.ink,
  },
  team: {
    color: colors.brandBlue700,
  },
  prose: {
    margin: 0,
    fontSize: { default: 16, [breakpoints.md]: 17 },
    lineHeight: `${LINE_HEIGHT + 8}px`,
    color: color.ink,
    textIndent: "2em",
  },
  proseFlush: {
    textIndent: 0,
  },
  inline: {
    boxSizing: "border-box",
    display: "inline-block",
    maxWidth: "calc(100% - 3em)",
    height: 34,
    marginInline: 4,
    paddingInline: 4,
    verticalAlign: "baseline",
    borderWidth: 0,
    borderBottomWidth: 1,
    borderBottomStyle: "solid",
    borderBottomColor: {
      default: FIELD_BORDER,
      ":hover": { default: null, [HOVER]: color.ink },
      ":focus-visible": colors.brandBlue700,
    },
    borderRadius: 0,
    backgroundColor: { default: "transparent", ":focus-visible": "#f2f6fd" },
    fontFamily: "inherit",
    fontSize: 16,
    fontWeight: 500,
    textAlign: "center",
    textIndent: 0,
    color: colors.brandBlue800,
    outlineStyle: "none",
    boxShadow: { default: "none", ":focus-visible": `inset 0 -1px 0 ${colors.brandBlue700}` },
    transitionProperty: "border-color, background-color",
    transitionDuration: "150ms",
    "::placeholder": { color: "#9aa3b2", fontWeight: 400 },
  },
  keep: {
    whiteSpace: "nowrap",
  },
  wName: { width: "7em" },
  wCompany: { width: "12em" },
  wEmail: { width: "14em" },
  wPhone: { width: "9.5em" },
  selectWrap: {
    position: "relative",
    display: "inline-block",
    textIndent: 0,
  },
  select: {
    appearance: "none",
    paddingInlineEnd: 22,
    cursor: "pointer",
  },
  selectIcon: {
    position: "absolute",
    top: "50%",
    right: 6,
    translate: "0 -45%",
    color: colors.brandBlue700,
    pointerEvents: "none",
  },
  ruled: {
    boxSizing: "border-box",
    display: "block",
    width: "100%",
    minHeight: LINE_HEIGHT * 4,
    marginBlock: 8,
    padding: 0,
    borderWidth: 0,
    borderRadius: 0,
    backgroundColor: "transparent",
    backgroundImage: `repeating-linear-gradient(to bottom, transparent 0, transparent ${LINE_HEIGHT - 1}px, ${RULE} ${LINE_HEIGHT - 1}px, ${RULE} ${LINE_HEIGHT}px)`,
    backgroundAttachment: "local",
    fontFamily: "inherit",
    fontSize: 16,
    lineHeight: `${LINE_HEIGHT}px`,
    color: colors.brandBlue800,
    resize: "vertical",
    outlineStyle: { default: "none", ":focus-visible": "solid" },
    outlineWidth: 1,
    outlineColor: colors.brandBlue700,
    outlineOffset: 4,
    "::placeholder": { color: "#9aa3b2" },
  },
  sign: {
    display: "flex",
    flexDirection: { default: "column", [breakpoints.sm]: "row" },
    alignItems: { default: "stretch", [breakpoints.sm]: "flex-end" },
    justifyContent: "space-between",
    gap: 20,
    marginTop: 24,
    paddingTop: 20,
    borderTopWidth: 1,
    borderTopStyle: "solid",
    borderTopColor: HAIRLINE,
  },
  closing: {
    margin: 0,
    marginBottom: 12,
    fontSize: 15,
    color: color.bodyText,
  },
  consent: {
    maxWidth: "22em",
  },

  sent: {
    display: "grid",
    gridTemplateColumns: { default: "1fr", [breakpoints.sm]: "auto minmax(0, 1fr)" },
    alignItems: "center",
    gap: { default: 20, [breakpoints.sm]: 32 },
    paddingBlock: 16,
  },
  stamp: {
    display: "grid",
    placeItems: "center",
    alignContent: "center",
    gap: 2,
    width: 128,
    height: 128,
    boxSizing: "border-box",
    borderWidth: 2,
    borderStyle: "solid",
    borderColor: colors.brandBlue700,
    borderRadius: "50%",
    outlineWidth: 1,
    outlineStyle: "solid",
    outlineColor: colors.brandBlue700,
    outlineOffset: -8,
    color: colors.brandBlue700,
    transform: "rotate(-8deg)",
    animationName: { default: fadeIn, [breakpoints.motionOk]: stampIn },
    animationDuration: "220ms",
    animationTimingFunction: ease.out,
  },
  stampWord: {
    fontFamily: font.display,
    fontSize: 20,
    fontWeight: 800,
    letterSpacing: "0.16em",
  },
  stampDate: {
    fontSize: 11,
    fontWeight: 600,
    letterSpacing: "0.08em",
    fontVariantNumeric: "tabular-nums",
  },
  sentTitle: {
    margin: 0,
    fontSize: 20,
    fontWeight: 700,
    color: color.ink,
  },
  sentText: {
    margin: 0,
    marginTop: 8,
    fontSize: 15,
    lineHeight: 1.8,
    color: color.bodyText,
  },
  sentActions: {
    display: "flex",
    flexWrap: "wrap",
    gap: 16,
    alignItems: "center",
    marginTop: 20,
  },
  link: {
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

const ZH_DATE_FORMAT = new Intl.DateTimeFormat("zh-CN", { dateStyle: "long" });
const today = () => ZH_DATE_FORMAT.format(new Date());

export function LetterDialog({ subject, onClose }: DialogVariantProps) {
  const { closing, requestClose, dialogProps, panelProps } = useLabDialog(onClose);
  const titleId = useId();
  const fieldId = useId();
  const [subjectId, setSubjectId] = useState<InquirySubjectId>(subject ?? INQUIRY_SUBJECTS[0].id);
  const [sent, setSent] = useState(false);
  const [lockedHeight, setLockedHeight] = useState(0);
  const [date] = useState(today);
  const bodyRef = useRef<HTMLDivElement>(null);
  const route = SUBJECT_ROUTES[subjectId];
  const active = subjectById(subjectId);

  const handleSubmit = (event: SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLockedHeight(bodyRef.current?.offsetHeight ?? 0);
    setSent(true);
  };

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
        <button
          type="button"
          aria-label="关闭"
          onClick={requestClose}
          {...stylex.props(labStyles.closeButton, styles.close)}
        >
          <X size={20} strokeWidth={1.75} aria-hidden="true" />
        </button>

        <header {...stylex.props(styles.masthead)}>
          <div>
            <p lang="en" aria-hidden="true" {...stylex.props(styles.wordmark)}>
              FENCHEM
            </p>
            <p {...stylex.props(styles.companyName)}>{COMPANY.name}</p>
          </div>
          <div {...stylex.props(styles.englishBlock)}>
            <p lang="en" {...stylex.props(styles.english)}>
              {COMPANY.english}
            </p>
            <p lang="en" {...stylex.props(styles.since)}>
              Est. {COMPANY.established} · Nanjing
            </p>
          </div>
        </header>
        <address {...stylex.props(styles.letterhead)}>
          {CONTACT_DETAILS.map((detail) =>
            detail.href ? (
              <a
                key={detail.term}
                href={detail.href}
                {...stylex.props(styles.letterheadLink, labStyles.focusRing)}
              >
                {detail.value}
              </a>
            ) : (
              <span key={detail.term}>{detail.value}</span>
            ),
          )}
        </address>

        <div
          ref={bodyRef}
          {...stylex.props(
            styles.body,
            sent && styles.bodySent,
            sent && dynamic.minHeight(lockedHeight),
          )}
        >
          {sent ? (
            <div role="status" {...stylex.props(styles.sent, labStyles.swapIn)}>
              <div aria-hidden="true" {...stylex.props(styles.stamp)}>
                <span lang="en" {...stylex.props(styles.stampWord)}>
                  SENT
                </span>
                <span {...stylex.props(styles.stampDate)}>{date}</span>
              </div>
              <div>
                <h2 id={titleId} {...stylex.props(styles.sentTitle)}>
                  信已寄出，{route.team}已收到
                </h2>
                <p {...stylex.props(styles.sentText)}>
                  关于「{active.label}」的来信已登记，{route.reply}。回复将发送至您留下的工作邮箱。
                </p>
                <div {...stylex.props(styles.sentActions)}>
                  <button
                    type="button"
                    onClick={requestClose}
                    {...stylex.props(labStyles.primaryButton, labStyles.focusRing)}
                  >
                    完成
                  </button>
                  <button
                    type="button"
                    onClick={() => setSent(false)}
                    {...stylex.props(styles.link, labStyles.focusRing)}
                  >
                    再写一封
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <p {...stylex.props(styles.date)}>{date}</p>
              <h2 id={titleId} {...stylex.props(styles.salutation)}>
                致 泛成<span {...stylex.props(styles.team)}>{route.team}</span>：
              </h2>
              <p {...stylex.props(styles.prose)}>
                您好！我是
                <span {...stylex.props(styles.keep)}>
                  <input
                    name="contactName"
                    aria-label="联系人姓名"
                    placeholder="姓名"
                    required
                    autoComplete="name"
                    {...stylex.props(styles.inline, styles.wName)}
                  />
                  ，来自
                </span>
                <span {...stylex.props(styles.keep)}>
                  <input
                    name="company"
                    aria-label="公司或机构名称"
                    placeholder="公司或机构名称"
                    required
                    autoComplete="organization"
                    {...stylex.props(styles.inline, styles.wCompany)}
                  />
                  ，想就
                </span>
                <span {...stylex.props(styles.keep)}>
                  <span {...stylex.props(styles.selectWrap)}>
                    <select
                      name="subject"
                      aria-label="咨询主题"
                      value={subjectId}
                      onChange={(event) => setSubjectId(event.target.value as InquirySubjectId)}
                      {...stylex.props(styles.inline, styles.select)}
                    >
                      {INQUIRY_SUBJECTS.map((item) => (
                        <option key={item.id} value={item.id}>
                          {item.label}
                        </option>
                      ))}
                    </select>
                    <ChevronDown
                      size={14}
                      strokeWidth={2}
                      nonScalingStroke
                      aria-hidden="true"
                      {...stylex.props(styles.selectIcon)}
                    />
                  </span>
                  与贵司联系。
                </span>
                具体需求如下：
              </p>
              <label htmlFor={`${fieldId}-message`} {...stylex.props(labStyles.srOnly)}>
                需求描述
              </label>
              <textarea
                id={`${fieldId}-message`}
                name="message"
                required
                placeholder={active.placeholder}
                {...stylex.props(styles.ruled)}
              />
              <p {...stylex.props(styles.prose, styles.proseFlush)}>
                请通过邮箱
                <span {...stylex.props(styles.keep)}>
                  <input
                    name="email"
                    type="email"
                    aria-label="工作邮箱"
                    placeholder="name@company.com"
                    required
                    autoComplete="email"
                    spellCheck={false}
                    {...stylex.props(styles.inline, styles.wEmail)}
                  />
                  或电话
                </span>
                <span {...stylex.props(styles.keep)}>
                  <input
                    name="phone"
                    type="tel"
                    aria-label="手机号"
                    placeholder="手机号"
                    required
                    autoComplete="tel"
                    inputMode="tel"
                    {...stylex.props(styles.inline, styles.wPhone)}
                  />
                  回复我。
                </span>
              </p>
              <div {...stylex.props(styles.sign)}>
                <div>
                  <p {...stylex.props(styles.closing)}>此致　敬礼</p>
                  <label {...stylex.props(labStyles.consent, styles.consent)}>
                    <input
                      type="checkbox"
                      name="consent"
                      required
                      {...stylex.props(labStyles.checkbox)}
                    />
                    <span>同意泛成就本次来信联系我，信息严格保密</span>
                  </label>
                </div>
                <button
                  type="submit"
                  {...stylex.props(
                    labStyles.primaryButton,
                    labStyles.trailingIcon,
                    labStyles.focusRing,
                    stylex.defaultMarker(),
                  )}
                >
                  寄出
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
          )}
        </div>
      </div>
    </dialog>
  );
}
