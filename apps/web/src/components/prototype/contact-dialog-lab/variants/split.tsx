import { breakpoints, colors } from "@fenchem-lp/ui/tokens.stylex";
import * as stylex from "@stylexjs/stylex";
import { ArrowRight, Check, CheckCircle2, ChevronDown, X } from "lucide-react";
import {
  useEffect,
  useId,
  useRef,
  useState,
  type ChangeEvent,
  type KeyboardEvent,
  type SubmitEvent,
} from "react";
import { flushSync } from "react-dom";

import { color, ease, font } from "../../variant-oos1/tokens.stylex";
import {
  COMPANY,
  CONTACT_DETAILS,
  ContactIcon,
  Field,
  FieldError,
  fieldAria,
  labStyles,
  useLabDialog,
  type DialogVariantProps,
  type InquirySubjectId,
} from "../kit";

const REQUEST_TYPES = [
  {
    id: "general",
    label: "一般咨询",
    english: "General Information",
    placeholder: "请简要描述您想了解的内容，如公司概况、产品目录、到访预约或合作方式",
  },
  {
    id: "technical",
    label: "技术咨询",
    english: "Technical Information",
    placeholder: "请描述目标功效、剂型与配方问题，或所需样品与技术文件（COA、TDS、MSDS）",
  },
  {
    id: "commercial",
    label: "商务咨询",
    english: "Commercial Information",
    placeholder: "请填写品名、规格、预计年用量、包装要求与交付地点",
  },
] as const;

const MISSING_ERRORS: Record<string, string> = {
  contactName: "请填写联系人姓名",
  company: "请填写公司或机构名称",
  phone: "请填写手机号",
  email: "请填写工作邮箱",
  message: "请填写需求描述",
  consent: "请勾选同意后再提交",
};
const EMAIL_FORMAT_ERROR = "邮箱格式不正确，请按 name@company.com 的格式填写";

type FormField = HTMLInputElement | HTMLTextAreaElement;

const isFormField = (element: unknown): element is FormField =>
  element instanceof HTMLInputElement || element instanceof HTMLTextAreaElement;

const errorFor = (field: FormField) =>
  field.validity.typeMismatch ? EMAIL_FORMAT_ERROR : MISSING_ERRORS[field.name];

type RequestTypeId = (typeof REQUEST_TYPES)[number]["id"];

const REQUEST_TYPE_FOR_SUBJECT: Record<InquirySubjectId, RequestTypeId> = {
  sample: "technical",
  formulation: "technical",
  visit: "general",
  other: "general",
};

const BACKDROP = "rgba(6, 20, 44, 0.56)";
const FIELD_BORDER = "#8a93a3";
const CONTROL_RADIUS = 8;
const OPTION_RADIUS = 3;
const HOVER = "@media (hover: hover)";
const ON_NAVY = "rgba(255, 255, 255, 0.92)";
const ON_NAVY_MUTED = "rgba(255, 255, 255, 0.58)";
const NAVY_RULE = "rgba(255, 255, 255, 0.14)";
const HAIRLINE = "rgba(26, 26, 26, 0.12)";
const DESKTOP = breakpoints.md;
const STICKY_FOOTER_ROOM = 176;
const SHEET_MOTION = "@media (prefers-reduced-motion: no-preference) and (max-width: 767.98px)";
const POP_MOTION = "@media (prefers-reduced-motion: no-preference) and (min-width: 768px)";
const EASE_DRAWER = "cubic-bezier(0.32, 0.72, 0, 1)";
const STAGGER_MS = 50;

const fadeIn = stylex.keyframes({ "0%": { opacity: 0 }, "100%": { opacity: 1 } });
const fadeOut = stylex.keyframes({ "0%": { opacity: 1 }, "100%": { opacity: 0 } });
const sheetIn = stylex.keyframes({
  "0%": { transform: "translateY(100%)" },
  "100%": { transform: "none" },
});
const sheetOut = stylex.keyframes({
  "0%": { transform: "none" },
  "100%": { transform: "translateY(100%)" },
});
const popIn = stylex.keyframes({
  "0%": { opacity: 0, transform: "translateY(8px) scale(0.97)" },
  "100%": { opacity: 1, transform: "none" },
});
const popOut = stylex.keyframes({
  "0%": { opacity: 1, transform: "none", filter: "none" },
  "100%": { opacity: 0, transform: "translateY(-12px)", filter: "blur(4px)" },
});
const listIn = stylex.keyframes({
  "0%": { opacity: 0, transform: "translateY(-4px) scale(0.98)" },
  "100%": { opacity: 1, transform: "none" },
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
      animationTimingFunction: ease.out,
      animationFillMode: "forwards",
    },
  },
  panel: {
    position: "absolute",
    top: { default: 0, [DESKTOP]: "50%" },
    left: { default: 0, [DESKTOP]: "50%" },
    translate: { default: null, [DESKTOP]: "-50% -50%" },
    display: "grid",
    gridTemplateColumns: {
      default: "minmax(0, 1fr)",
      [DESKTOP]: "minmax(0, 360px) minmax(0, 1fr)",
    },
    gridTemplateRows: { default: "auto 1fr", [DESKTOP]: "minmax(0, 1fr)" },
    boxSizing: "border-box",
    width: { default: "100%", [DESKTOP]: "min(1040px, calc(100vw - 64px))" },
    height: { default: "100dvh", [DESKTOP]: "min(720px, calc(100dvh - 64px))" },
    overflowY: { default: "auto", [DESKTOP]: "hidden" },
    overscrollBehavior: "contain",
    scrollPaddingBottom: { default: STICKY_FOOTER_ROOM, [DESKTOP]: 0 },
    backgroundColor: colors.paper,
    boxShadow: "0 32px 80px -24px rgba(6, 20, 44, 0.55)",
    animationName: { default: fadeIn, [SHEET_MOTION]: sheetIn, [POP_MOTION]: popIn },
    animationDuration: { default: "240ms", [SHEET_MOTION]: "360ms" },
    animationTimingFunction: { default: ease.out, [SHEET_MOTION]: EASE_DRAWER },
  },
  panelClosing: {
    animationName: { default: fadeOut, [SHEET_MOTION]: sheetOut, [POP_MOTION]: popOut },
    animationDuration: { default: "150ms", [SHEET_MOTION]: "200ms" },
    animationTimingFunction: { default: ease.out, [SHEET_MOTION]: EASE_DRAWER },
    animationFillMode: "forwards",
  },

  aside: {
    display: "flex",
    flexDirection: "column",
    gap: { default: 20, [DESKTOP]: 28 },
    minWidth: 0,
    padding: { default: "24px 20px", [DESKTOP]: "40px 36px" },
    overflowY: { default: "visible", [DESKTOP]: "auto" },
    overscrollBehavior: "contain",
    backgroundColor: color.navyDeep,
    color: ON_NAVY,
  },
  companyName: {
    margin: 0,
    fontSize: { default: 18, [DESKTOP]: 20 },
    fontWeight: 700,
    lineHeight: 1.4,
    color: colors.paper,
  },
  companyEnglish: {
    margin: 0,
    marginTop: 4,
    fontFamily: font.serifAccent,
    fontSize: { default: 16, [DESKTOP]: 18 },
    fontStyle: "italic",
    lineHeight: 1.3,
    color: ON_NAVY_MUTED,
  },
  details: {
    display: { default: "none", [DESKTOP]: "block" },
    margin: 0,
    borderTopWidth: 1,
    borderTopStyle: "solid",
    borderTopColor: NAVY_RULE,
  },
  detailRow: {
    display: "grid",
    gridTemplateColumns: "18px minmax(0, 1fr)",
    columnGap: 12,
    alignItems: "flex-start",
    paddingBlock: 12,
    borderBottomWidth: 1,
    borderBottomStyle: "solid",
    borderBottomColor: NAVY_RULE,
  },
  detailTerm: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: 18,
    height: 22,
    color: ON_NAVY_MUTED,
  },
  detailValue: {
    margin: 0,
    minWidth: 0,
    fontSize: 14,
    lineHeight: 1.6,
    fontVariantNumeric: "tabular-nums",
    color: ON_NAVY,
    overflowWrap: "break-word",
  },
  detailLink: {
    color: { default: ON_NAVY, ":hover": { default: null, [HOVER]: colors.paper } },
    textDecorationLine: { default: "none", ":hover": { default: null, [HOVER]: "underline" } },
    textDecorationThickness: 1,
    textUnderlineOffset: 4,
    outlineStyle: { default: "none", ":focus-visible": "solid" },
    outlineWidth: 2,
    outlineColor: colors.paper,
    outlineOffset: 2,
  },
  quickLinks: {
    display: { default: "flex", [DESKTOP]: "none" },
    flexWrap: "wrap",
    columnGap: 20,
    rowGap: 6,
    fontSize: 14,
    fontVariantNumeric: "tabular-nums",
  },
  quickLinkItem: {
    display: "inline-flex",
    alignItems: "center",
    gap: 6,
  },
  qr: {
    display: { default: "none", [DESKTOP]: "flex" },
    alignItems: "center",
    gap: 16,
    margin: 0,
    marginTop: "auto",
  },
  qrImage: {
    boxSizing: "border-box",
    flexShrink: 0,
    width: 112,
    height: 112,
    padding: 8,
    borderRadius: CONTROL_RADIUS,
    backgroundColor: colors.paper,
  },
  qrCaption: {
    fontSize: 14,
    lineHeight: 1.6,
    color: ON_NAVY,
  },

  main: {
    display: "flex",
    flexDirection: "column",
    minWidth: 0,
    minHeight: { default: "auto", [DESKTOP]: 0 },
  },
  mainHead: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 16,
    flexShrink: 0,
    paddingTop: { default: 20, [DESKTOP]: 32 },
    paddingBottom: 16,
    paddingInlineStart: { default: 20, [DESKTOP]: 40 },
    paddingInlineEnd: { default: 8, [DESKTOP]: 20 },
  },
  title: {
    margin: 0,
    fontSize: { default: 22, [DESKTOP]: 26 },
    fontWeight: 700,
    lineHeight: 1.3,
    color: color.ink,
  },
  closeOnNavy: {
    position: { default: "absolute", [DESKTOP]: "static" },
    top: 8,
    right: 8,
    color: { default: colors.paper, [DESKTOP]: color.ink },
  },
  form: {
    display: "flex",
    flexDirection: "column",
    flexGrow: 1,
    minHeight: 0,
  },
  formBody: {
    display: "flex",
    flexDirection: "column",
    gap: 20,
    flexGrow: 1,
    minHeight: 0,
    overflowY: { default: "visible", [DESKTOP]: "auto" },
    overscrollBehavior: "contain",
    paddingInline: { default: 20, [DESKTOP]: 40 },
    paddingBottom: 24,
  },
  select: {
    position: "relative",
  },
  trigger: {
    display: "grid",
    gridTemplateColumns: "minmax(0, 1fr) auto",
    alignItems: "center",
    columnGap: 12,
    cursor: "pointer",
    userSelect: "none",
    WebkitTapHighlightColor: "transparent",
  },
  triggerOpen: {
    borderColor: colors.brandBlue700,
    outlineStyle: "solid",
  },
  triggerValue: {
    display: "flex",
    alignItems: "baseline",
    gap: 10,
    minWidth: 0,
    whiteSpace: "nowrap",
  },
  english: {
    overflow: "hidden",
    fontSize: 13,
    whiteSpace: "nowrap",
    textOverflow: "ellipsis",
    color: color.muted,
  },
  chevron: {
    color: color.ink,
    transitionProperty: "transform",
    transitionDuration: { default: "0s", [breakpoints.motionOk]: "200ms" },
    transitionTimingFunction: ease.out,
  },
  chevronOpen: {
    transform: "rotate(180deg)",
  },
  listbox: {
    position: "absolute",
    top: "calc(100% + 4px)",
    left: 0,
    right: 0,
    zIndex: 2,
    margin: 0,
    padding: 4,
    listStyle: "none",
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: FIELD_BORDER,
    borderRadius: CONTROL_RADIUS,
    backgroundColor: colors.paper,
    boxShadow: "0 16px 32px -16px rgba(6, 20, 44, 0.28)",
    transformOrigin: "top center",
    animationName: { default: fadeIn, [breakpoints.motionOk]: listIn },
    animationDuration: "150ms",
    animationTimingFunction: ease.out,
  },
  option: {
    display: "grid",
    gridTemplateColumns: "auto minmax(0, 1fr) 16px",
    alignItems: "baseline",
    columnGap: 10,
    paddingBlock: 11,
    paddingInline: 8,
    borderRadius: OPTION_RADIUS,
    fontSize: 16,
    lineHeight: 1.4,
    color: color.ink,
    cursor: "pointer",
  },
  optionActive: {
    outlineStyle: "solid",
    outlineWidth: 2,
    outlineColor: colors.brandBlue700,
    outlineOffset: -2,
  },
  optionSelected: {
    fontWeight: 500,
    color: colors.brandBlue700,
  },
  optionCheck: {
    alignSelf: "center",
    color: colors.brandBlue700,
  },
  grid: {
    display: "grid",
    gridTemplateColumns: { default: "1fr", [breakpoints.sm]: "repeat(2, minmax(0, 1fr))" },
    columnGap: 16,
    rowGap: 18,
  },
  full: {
    gridColumn: "1 / -1",
  },
  footer: {
    position: { default: "sticky", [DESKTOP]: "static" },
    bottom: 0,
    display: "flex",
    flexDirection: { default: "column", [breakpoints.sm]: "row" },
    alignItems: { default: "stretch", [breakpoints.sm]: "center" },
    justifyContent: "space-between",
    gap: 16,
    flexShrink: 0,
    paddingBlock: 16,
    paddingBottom: { default: "max(16px, env(safe-area-inset-bottom))", [DESKTOP]: 16 },
    paddingInline: { default: 20, [DESKTOP]: 40 },
    borderTopWidth: 1,
    borderTopStyle: "solid",
    borderTopColor: HAIRLINE,
    backgroundColor: colors.paper,
  },
  consent: {
    display: "flex",
    flexDirection: "column",
    gap: 4,
    maxWidth: "24em",
  },
  consentError: {
    paddingInlineStart: 28,
  },

  done: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    gap: 14,
    flexGrow: 1,
    paddingInline: { default: 20, [DESKTOP]: 40 },
    paddingBlock: 32,
  },
  doneIcon: {
    color: colors.brandBlue700,
  },
  staggerItem: {
    animationDuration: "300ms",
    animationFillMode: "both",
  },
  staggerDelay: (index: number) => ({
    animationDelay: `${index * STAGGER_MS}ms`,
  }),
  doneTitle: {
    margin: 0,
    fontSize: 22,
    fontWeight: 700,
    color: color.ink,
    outlineStyle: "none",
  },
});

const stagger = (index: number) => [
  labStyles.swapIn,
  styles.staggerItem,
  styles.staggerDelay(index),
];

function RequestTypeSelect({
  value,
  onChange,
}: {
  value: RequestTypeId;
  onChange: (value: RequestTypeId) => void;
}) {
  const baseId = useId();
  const labelId = `${baseId}-label`;
  const listId = `${baseId}-list`;
  const optionId = (index: number) => `${baseId}-option-${index}`;
  const rootRef = useRef<HTMLDivElement>(null);
  const selectedIndex = REQUEST_TYPES.findIndex((type) => type.id === value);
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(selectedIndex);
  const selected = REQUEST_TYPES[selectedIndex];

  useEffect(() => {
    if (!open) return;
    const closeOnOutside = (event: PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
    };
    document.addEventListener("pointerdown", closeOnOutside);
    return () => document.removeEventListener("pointerdown", closeOnOutside);
  }, [open]);

  const openAt = (index: number) => {
    setActiveIndex(index);
    setOpen(true);
  };

  const choose = (index: number) => {
    onChange(REQUEST_TYPES[index].id);
    setOpen(false);
  };

  const last = REQUEST_TYPES.length - 1;

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (!open) {
      if (["ArrowDown", "ArrowUp", "Enter", " "].includes(event.key)) {
        event.preventDefault();
        openAt(selectedIndex);
      } else if (event.key === "Home" || event.key === "End") {
        event.preventDefault();
        openAt(event.key === "Home" ? 0 : last);
      }
      return;
    }
    switch (event.key) {
      case "ArrowDown":
        event.preventDefault();
        setActiveIndex((index) => Math.min(index + 1, last));
        break;
      case "ArrowUp":
        event.preventDefault();
        setActiveIndex((index) => Math.max(index - 1, 0));
        break;
      case "Home":
        event.preventDefault();
        setActiveIndex(0);
        break;
      case "End":
        event.preventDefault();
        setActiveIndex(last);
        break;
      case "Enter":
      case " ":
        event.preventDefault();
        choose(activeIndex);
        break;
      case "Escape":
        event.preventDefault();
        event.stopPropagation();
        setOpen(false);
        break;
      case "Tab":
        setOpen(false);
        break;
    }
  };

  return (
    <div ref={rootRef} {...stylex.props(labStyles.field, styles.select)}>
      <span id={labelId} {...stylex.props(labStyles.label)}>
        咨询类型
      </span>
      <input type="hidden" name="requestType" value={value} />
      <div
        role="combobox"
        tabIndex={0}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={listId}
        aria-labelledby={labelId}
        aria-activedescendant={open ? optionId(activeIndex) : undefined}
        onClick={() => (open ? setOpen(false) : openAt(selectedIndex))}
        onKeyDown={handleKeyDown}
        {...stylex.props(labStyles.input, styles.trigger, open && styles.triggerOpen)}
      >
        <span {...stylex.props(styles.triggerValue)}>
          {selected.label}
          <span lang="en" {...stylex.props(styles.english)}>
            {selected.english}
          </span>
        </span>
        <ChevronDown
          size={20}
          strokeWidth={1.75}
          aria-hidden="true"
          {...stylex.props(styles.chevron, open && styles.chevronOpen)}
        />
      </div>
      <ul
        id={listId}
        role="listbox"
        aria-labelledby={labelId}
        hidden={!open}
        {...stylex.props(styles.listbox)}
      >
        {REQUEST_TYPES.map((type, index) => {
          const isSelected = index === selectedIndex;
          return (
            <li
              key={type.id}
              id={optionId(index)}
              role="option"
              aria-selected={isSelected}
              onPointerDown={(event) => event.preventDefault()}
              onPointerMove={() => setActiveIndex(index)}
              onClick={() => choose(index)}
              {...stylex.props(
                styles.option,
                index === activeIndex && styles.optionActive,
                isSelected && styles.optionSelected,
              )}
            >
              {type.label}
              <span lang="en" {...stylex.props(styles.english)}>
                {type.english}
              </span>
              {isSelected ? (
                <Check
                  size={16}
                  strokeWidth={2}
                  nonScalingStroke
                  aria-hidden="true"
                  {...stylex.props(styles.optionCheck)}
                />
              ) : null}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export function SplitDialog({ subject, onClose }: DialogVariantProps) {
  const { closing, requestClose, dialogProps, panelProps } = useLabDialog(onClose);
  const titleId = useId();
  const [requestType, setRequestType] = useState<RequestTypeId>(
    subject ? REQUEST_TYPE_FOR_SUBJECT[subject] : "general",
  );
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const doneTitleRef = useRef<HTMLHeadingElement>(null);
  const active = REQUEST_TYPES.find((type) => type.id === requestType) ?? REQUEST_TYPES[0];

  const handleSubmit = (event: SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();
    const invalid = Array.from(event.currentTarget.elements)
      .filter(isFormField)
      .filter((field) => !field.validity.valid);
    if (invalid.length > 0) {
      flushSync(() =>
        setErrors(Object.fromEntries(invalid.map((field) => [field.name, errorFor(field)]))),
      );
      invalid[0].focus();
      return;
    }
    flushSync(() => {
      setErrors({});
      setSubmitted(true);
    });
    doneTitleRef.current?.focus();
  };

  const updateError = (event: ChangeEvent<HTMLFormElement>) => {
    const field = event.target;
    if (!isFormField(field) || !(field.name in errors)) return;
    setErrors((current) =>
      field.validity.valid
        ? Object.fromEntries(Object.entries(current).filter(([name]) => name !== field.name))
        : { ...current, [field.name]: errorFor(field) },
    );
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
        aria-hidden="true"
        onClick={requestClose}
        {...stylex.props(labStyles.dismiss)}
      />
      <div {...panelProps} {...stylex.props(styles.panel, closing && styles.panelClosing)}>
        <aside aria-label="公司信息" {...stylex.props(styles.aside)}>
          <div>
            <p {...stylex.props(styles.companyName)}>{COMPANY.name}</p>
            <p lang="en" {...stylex.props(styles.companyEnglish)}>
              {COMPANY.english}
            </p>
          </div>
          <div {...stylex.props(styles.quickLinks)}>
            {CONTACT_DETAILS.filter((d) => d.href).map((detail) => (
              <a
                key={detail.term}
                href={detail.href!}
                {...stylex.props(styles.detailLink, styles.quickLinkItem)}
              >
                <ContactIcon detail={detail} size={14} />
                <span>{detail.value}</span>
              </a>
            ))}
          </div>
          <dl {...stylex.props(styles.details)}>
            {CONTACT_DETAILS.map((detail) => (
              <div key={detail.term} {...stylex.props(styles.detailRow)}>
                <dt
                  title={detail.term}
                  aria-label={detail.term}
                  {...stylex.props(styles.detailTerm)}
                >
                  <ContactIcon detail={detail} size={15} />
                </dt>
                <dd {...stylex.props(styles.detailValue)}>
                  {detail.href ? (
                    <a href={detail.href} {...stylex.props(styles.detailLink)}>
                      {detail.value}
                    </a>
                  ) : (
                    detail.value
                  )}
                </dd>
              </div>
            ))}
          </dl>
          <figure {...stylex.props(styles.qr)}>
            <img
              src="/prototype/contact/xiaohongshu-qr.png"
              alt="泛成小红书主页二维码"
              width={112}
              height={112}
              {...stylex.props(styles.qrImage)}
            />
            <figcaption {...stylex.props(styles.qrCaption)}>扫码关注泛成小红书</figcaption>
          </figure>
        </aside>

        <div {...stylex.props(styles.main)}>
          <header {...stylex.props(styles.mainHead)}>
            <h2 id={titleId} {...stylex.props(styles.title)}>
              给我们留言
            </h2>
            <button
              type="button"
              aria-label="关闭"
              onClick={requestClose}
              {...stylex.props(labStyles.closeButton, styles.closeOnNavy)}
            >
              <X size={20} strokeWidth={1.75} aria-hidden="true" />
            </button>
          </header>

          {submitted ? (
            <div {...stylex.props(styles.done)}>
              <CheckCircle2
                size={36}
                strokeWidth={2.5}
                nonScalingStroke
                aria-hidden="true"
                {...stylex.props(styles.doneIcon, stagger(0))}
              />
              <h3 ref={doneTitleRef} tabIndex={-1} {...stylex.props(styles.doneTitle, stagger(1))}>
                需求已提交
              </h3>
            </div>
          ) : (
            <form
              noValidate
              onSubmit={handleSubmit}
              onChange={updateError}
              {...stylex.props(styles.form)}
            >
              <div {...stylex.props(styles.formBody)}>
                <RequestTypeSelect value={requestType} onChange={setRequestType} />
                <div {...stylex.props(styles.grid)}>
                  <Field id="split-name" label="联系人姓名" required error={errors.contactName}>
                    <input
                      id="split-name"
                      name="contactName"
                      required
                      autoComplete="name"
                      {...fieldAria("split-name", errors.contactName)}
                      {...stylex.props(
                        labStyles.input,
                        errors.contactName ? labStyles.inputInvalid : null,
                      )}
                    />
                  </Field>
                  <Field id="split-company" label="公司或机构" required error={errors.company}>
                    <input
                      id="split-company"
                      name="company"
                      required
                      autoComplete="organization"
                      {...fieldAria("split-company", errors.company)}
                      {...stylex.props(
                        labStyles.input,
                        errors.company ? labStyles.inputInvalid : null,
                      )}
                    />
                  </Field>
                  <Field id="split-phone" label="手机号" required error={errors.phone}>
                    <input
                      id="split-phone"
                      name="phone"
                      type="tel"
                      required
                      autoComplete="tel"
                      inputMode="tel"
                      {...fieldAria("split-phone", errors.phone)}
                      {...stylex.props(
                        labStyles.input,
                        errors.phone ? labStyles.inputInvalid : null,
                      )}
                    />
                  </Field>
                  <Field id="split-email" label="工作邮箱" required error={errors.email}>
                    <input
                      id="split-email"
                      name="email"
                      type="email"
                      required
                      autoComplete="email"
                      spellCheck={false}
                      placeholder="name@company.com"
                      {...fieldAria("split-email", errors.email)}
                      {...stylex.props(
                        labStyles.input,
                        errors.email ? labStyles.inputInvalid : null,
                      )}
                    />
                  </Field>
                  <Field
                    id="split-message"
                    label="需求描述"
                    required
                    error={errors.message}
                    sx={styles.full}
                  >
                    <textarea
                      id="split-message"
                      name="message"
                      required
                      placeholder={active.placeholder}
                      {...fieldAria("split-message", errors.message)}
                      {...stylex.props(
                        labStyles.input,
                        labStyles.textarea,
                        errors.message ? labStyles.inputInvalid : null,
                      )}
                    />
                  </Field>
                </div>
              </div>
              <div {...stylex.props(styles.footer)}>
                <div {...stylex.props(styles.consent)}>
                  <label {...stylex.props(labStyles.consent)}>
                    <input
                      id="split-consent"
                      type="checkbox"
                      name="consent"
                      required
                      {...fieldAria("split-consent", errors.consent)}
                      {...stylex.props(labStyles.checkbox)}
                    />
                    <span>同意泛成就本次咨询联系我，配方信息严格保密</span>
                  </label>
                  <FieldError id="split-consent" error={errors.consent} sx={styles.consentError} />
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
                  提交
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
