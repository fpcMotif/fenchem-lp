import { colors } from "@fenchem-lp/ui/tokens.stylex";
import * as stylex from "@stylexjs/stylex";
import type { StyleXStyles } from "@stylexjs/stylex";
import { ArrowRight, Check, CheckCircle2, ChevronDown, X } from "@fenchem-lp/ui/components/lucide";
import {
  Dialog,
  DialogBackdrop,
  DialogClose,
  DialogContent,
  DialogTitle,
} from "@ui-sdk/solid/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectItemIndicator,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@ui-sdk/solid/select";
import {
  createSignal,
  createUniqueId,
  flush,
  For,
  onSettled,
  Show,
  untrack,
  useContext,
} from "solid-js";

import { color, ease } from "../../variant-oos1/tokens.stylex";
import {
  COMPANY,
  CONTACT_DETAILS,
  ContactIcon,
  Field,
  FieldError,
  fieldAria,
  labStyles,
  PickerHostContext,
  type DialogVariantProps,
  type InquirySubjectId,
} from "../kit";

const REQUEST_TYPES = [
  {
    id: "general",
    label: "一般咨询",
    placeholder: "请简要描述您想了解的内容，如公司概况、产品目录、到访预约或合作方式",
  },
  {
    id: "technical",
    label: "技术咨询",
    placeholder: "请描述目标功效、剂型与配方问题，或所需样品与技术文件（COA、TDS、MSDS）",
  },
  {
    id: "commercial",
    label: "商务咨询",
    placeholder: "请填写品名、规格、预计年用量、包装要求与交付地点",
  },
] as const;
const QR_CODES = [
  {
    id: "wechat",
    label: "官方微信",
    image: "/prototype/contact/wechat-qr.png",
    alt: "泛成官方微信公众号二维码",
  },
  {
    id: "xiaohongshu",
    label: "泛成小红书",
    image: "/prototype/contact/xiaohongshu-qr.png",
    alt: "泛成小红书主页二维码",
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
const LONG_TEXT_FIXTURE = {
  contactName: "Wolfeschlegelsteinhausenbergerdorff Jr.",
  company: "International Botanical Ingredients & Formulation Holdings GmbH & Co. KG",
  phone: "+86 (025) 8421-8888 ext. 99887766554433221100",
  email: "very.long.enterprise.procurement.officer@subdomain.fenchem-international-holding.com",
  message:
    "We are conducting an extensive high-throughput botanical bioavailability benchmark across multiple functional cosmetics matrices. Need full documentation covering COA, TDS, MSDS, batch stability reports, allergen declarations, and Kosher/Halal certification under accelerated 40°C/75% RH conditions.",
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
const HAIRLINE = "rgba(26, 26, 26, 0.12)";
const DESKTOP = "@media (min-width: 768px)";
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
  backdrop: {
    position: "fixed",
    inset: 0,
    backgroundColor: BACKDROP,
    animationName: fadeIn,
    animationDuration: "200ms",
    animationTimingFunction: ease.out,
  },
  backdropClosing: {
    animationName: fadeOut,
    animationDuration: "150ms",
    animationTimingFunction: ease.out,
    animationFillMode: "forwards",
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
    height: { default: "100dvh", [DESKTOP]: "min(640px, calc(100dvh - 64px))" },
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

  details: {
    display: { default: "none", [DESKTOP]: "flex" },
    flexDirection: "column",
    gap: 16,
    margin: 0,
  },
  detailRow: {
    display: "grid",
    gridTemplateColumns: "18px minmax(0, 1fr)",
    columnGap: 12,
    alignItems: "flex-start",
    padding: 0,
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
  qrSection: {
    display: { default: "none", [DESKTOP]: "flex" },
    flexDirection: "column",
    gap: 12,
    margin: 0,
    marginTop: "auto",
  },
  qrHeaderTitle: {
    fontSize: 11,
    fontWeight: 600,
    letterSpacing: "0.06em",
    textTransform: "uppercase",
    color: ON_NAVY_MUTED,
  },
  dualQrRow: {
    display: "flex",
    alignItems: "flex-start",
    gap: 14,
  },
  dualQrCard: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 8,
    margin: 0,
    cursor: "default",
    transitionProperty: "transform",
    transitionDuration: "160ms",
    transitionTimingFunction: ease.out,
    transform: {
      default: null,
      ":hover": { default: null, [HOVER]: "translateY(-2px)" },
    },
  },
  dualQrImage: {
    boxSizing: "border-box",
    flexShrink: 0,
    width: 80,
    height: 80,
    padding: 6,
    borderRadius: CONTROL_RADIUS,
    backgroundColor: colors.paper,
    boxShadow: {
      default: "0 0 0 1px rgba(255, 255, 255, 0.08), 0 4px 12px -2px rgba(0, 0, 0, 0.24)",
      ":hover": {
        default: null,
        [HOVER]: "0 0 0 1px rgba(255, 255, 255, 0.16), 0 10px 24px -4px rgba(0, 0, 0, 0.4)",
      },
    },
    transitionProperty: "box-shadow",
    transitionDuration: "160ms",
    transitionTimingFunction: ease.out,
  },
  dualQrCaption: {
    fontSize: 12,
    lineHeight: 1.4,
    color: ON_NAVY_MUTED,
    textAlign: "center",
    letterSpacing: "0.02em",
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
  chevron: {
    color: color.ink,
    transitionProperty: "transform",
    transitionDuration: {
      default: "0s",
      ["@media (prefers-reduced-motion: no-preference)"]: "200ms",
    },
    transitionTimingFunction: ease.out,
  },
  chevronOpen: {
    transform: "rotate(180deg)",
  },
  listbox: {
    width: "var(--anchor-width)",
    margin: 0,
    padding: 4,
    listStyle: "none",
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: FIELD_BORDER,
    borderRadius: CONTROL_RADIUS,
    backgroundColor: colors.paper,
    boxShadow: "0 16px 32px -16px rgba(6, 20, 44, 0.28)",
    transformOrigin: "var(--transform-origin)",
    animationName: { default: fadeIn, ["@media (prefers-reduced-motion: no-preference)"]: listIn },
    animationDuration: "150ms",
    animationTimingFunction: ease.out,
  },
  option: {
    display: "grid",
    gridTemplateColumns: "minmax(0, 1fr) 16px",
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
    gridTemplateColumns: {
      default: "1fr",
      ["@media (min-width: 640px)"]: "repeat(2, minmax(0, 1fr))",
    },
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
    flexDirection: { default: "column", ["@media (min-width: 640px)"]: "row" },
    alignItems: { default: "stretch", ["@media (min-width: 640px)"]: "center" },
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

const sxProps = (...args: ReadonlyArray<StyleXStyles | false | null | undefined>) =>
  stylex.attrs(...args);

function RequestTypeSelect(props: {
  value: RequestTypeId;
  onChange: (value: RequestTypeId) => void;
}) {
  const selected = () => REQUEST_TYPES.find((type) => type.id === props.value) ?? REQUEST_TYPES[0];

  return (
    <Select
      name="requestType"
      items={REQUEST_TYPES.map((type) => ({ value: type.id, label: type.label }))}
      value={props.value}
      onValueChange={(next) => {
        if (next) props.onChange(next as RequestTypeId);
      }}
    >
      <div {...stylex.attrs(labStyles.field, styles.select)}>
        <SelectLabel {...stylex.attrs(labStyles.label)}>咨询类型</SelectLabel>
        <SelectTrigger
          class={(state) =>
            sxProps(labStyles.input, styles.trigger, state.open && styles.triggerOpen).class
          }
        >
          {(state) => (
            <>
              <SelectValue>
                {() => <span {...stylex.attrs(styles.triggerValue)}>{selected().label}</span>}
              </SelectValue>
              <ChevronDown
                size={20}
                strokeWidth={1.75}
                aria-hidden="true"
                {...sxProps(styles.chevron, state.open && styles.chevronOpen)}
              />
            </>
          )}
        </SelectTrigger>
        <SelectContent {...stylex.attrs(styles.listbox)}>
          <For each={REQUEST_TYPES}>
            {(type) => (
              <SelectItem
                value={type.id}
                label={type.label}
                class={(state) =>
                  sxProps(
                    styles.option,
                    state.highlighted && styles.optionActive,
                    state.selected && styles.optionSelected,
                  ).class
                }
              >
                {type.label}
                <SelectItemIndicator>
                  <Check
                    size={16}
                    strokeWidth={2}
                    nonScalingStroke
                    aria-hidden="true"
                    {...stylex.attrs(styles.optionCheck)}
                  />
                </SelectItemIndicator>
              </SelectItem>
            )}
          </For>
        </SelectContent>
      </div>
    </Select>
  );
}

export function SplitDialog(props: DialogVariantProps) {
  const state = untrack(() => props.state ?? "pristine");
  const [open, setOpen] = createSignal(true);
  const [closing, setClosing] = createSignal(false);
  const setPickerHost = useContext(PickerHostContext);
  const titleId = createUniqueId();
  let closed = false;

  onSettled(() => {
    const root = document.documentElement;
    const previous = root.style.overflow;
    root.style.overflow = "hidden";
    return () => {
      root.style.overflow = previous;
      setPickerHost(null);
    };
  });

  const finishClose = () => {
    if (closed) return;
    closed = true;
    setOpen(false);
    setPickerHost(null);
    document.documentElement.style.overflow = "";
    props.onClose();
  };

  const requestClose = () => {
    if (closing()) return;
    setClosing(true);
    window.setTimeout(finishClose, 400);
  };

  const [requestType, setRequestType] = createSignal<RequestTypeId>(
    untrack(() => {
      if (state === "technical") return "technical";
      if (state === "commercial") return "commercial";
      return props.subject ? REQUEST_TYPE_FOR_SUBJECT[props.subject] : "general";
    }),
  );
  const [submitted, setSubmitted] = createSignal(state === "submitted");
  const [errors, setErrors] = createSignal<Record<string, string>>(
    state === "errors" ? { ...MISSING_ERRORS } : {},
  );
  let doneTitleRef: HTMLHeadingElement | undefined;
  const active = () => REQUEST_TYPES.find((type) => type.id === requestType()) ?? REQUEST_TYPES[0];

  const handleSubmit = (event: SubmitEvent & { currentTarget: HTMLFormElement }) => {
    event.preventDefault();
    const invalid = Array.from(event.currentTarget.elements)
      .filter(isFormField)
      .filter((field) => !field.validity.valid);
    if (invalid.length > 0) {
      setErrors(Object.fromEntries(invalid.map((field) => [field.name, errorFor(field)])));
      invalid[0].focus();
      return;
    }
    setErrors({});
    setSubmitted(true);
    flush();
    doneTitleRef?.focus();
  };

  const updateError = (event: Event) => {
    const field = event.target;
    if (!isFormField(field) || !(field.name in errors())) return;
    setErrors((current) =>
      field.validity.valid
        ? Object.fromEntries(Object.entries(current).filter(([name]) => name !== field.name))
        : { ...current, [field.name]: errorFor(field) },
    );
  };

  return (
    <Dialog
      open={open()}
      onOpenChange={(next) => {
        if (!next) requestClose();
      }}
    >
      <DialogBackdrop {...stylex.attrs(styles.backdrop, closing() && styles.backdropClosing)} />
      <DialogContent
        ref={(el) => setPickerHost(el)}
        lang="zh-CN"
        aria-labelledby={titleId}
        onClick={(event) => {
          if (event.target === event.currentTarget) requestClose();
        }}
        {...stylex.attrs(labStyles.dialog)}
      >
        <div
          onAnimationEnd={(event) => {
            if (closing() && event.target === event.currentTarget) finishClose();
          }}
          {...stylex.attrs(styles.panel, closing() && styles.panelClosing)}
        >
          <aside aria-label="公司信息" {...stylex.attrs(styles.aside)}>
            <div>
              <p {...stylex.attrs(styles.companyName)}>{COMPANY.name}</p>
            </div>
            <div {...stylex.attrs(styles.quickLinks)}>
              {CONTACT_DETAILS.filter((d) => d.href).map((detail) => (
                <a href={detail.href!} {...stylex.attrs(styles.detailLink, styles.quickLinkItem)}>
                  <ContactIcon detail={detail} size={14} />
                  <span>{detail.value}</span>
                </a>
              ))}
            </div>
            <dl {...stylex.attrs(styles.details)}>
              {CONTACT_DETAILS.map((detail) => (
                <div {...stylex.attrs(styles.detailRow)}>
                  <dt
                    title={detail.term}
                    aria-label={detail.term}
                    {...stylex.attrs(styles.detailTerm)}
                  >
                    <ContactIcon detail={detail} size={15} />
                  </dt>
                  <dd {...stylex.attrs(styles.detailValue)}>
                    {detail.href ? (
                      <a href={detail.href} {...stylex.attrs(styles.detailLink)}>
                        {detail.value}
                      </a>
                    ) : (
                      detail.value
                    )}
                  </dd>
                </div>
              ))}
            </dl>
            <div {...stylex.attrs(styles.qrSection)}>
              <span {...stylex.attrs(styles.qrHeaderTitle)}>扫码关注官方社媒</span>
              <div {...stylex.attrs(styles.dualQrRow)}>
                {QR_CODES.map((qr) => (
                  <figure {...stylex.attrs(styles.dualQrCard)}>
                    <img
                      src={qr.image}
                      alt={qr.alt}
                      width={88}
                      height={88}
                      {...stylex.attrs(styles.dualQrImage)}
                    />
                    <figcaption {...stylex.attrs(styles.dualQrCaption)}>{qr.label}</figcaption>
                  </figure>
                ))}
              </div>
            </div>
          </aside>

          <div {...stylex.attrs(styles.main)}>
            <header {...stylex.attrs(styles.mainHead)}>
              <DialogTitle id={titleId} {...stylex.attrs(styles.title)}>
                给我们留言
              </DialogTitle>
              <DialogClose
                aria-label="关闭"
                {...stylex.attrs(labStyles.closeButton, styles.closeOnNavy)}
              >
                <X size={20} strokeWidth={1.75} aria-hidden="true" />
              </DialogClose>
            </header>

            <Show
              when={!submitted()}
              fallback={
                <div {...stylex.attrs(styles.done)}>
                  <CheckCircle2
                    size={36}
                    strokeWidth={2.5}
                    nonScalingStroke
                    aria-hidden="true"
                    {...stylex.attrs(styles.doneIcon, stagger(0))}
                  />
                  <h3
                    ref={doneTitleRef}
                    tabindex={-1}
                    {...stylex.attrs(styles.doneTitle, stagger(1))}
                  >
                    需求已提交
                  </h3>
                </div>
              }
            >
              <form
                novalidate
                onSubmit={handleSubmit}
                onInput={updateError}
                {...stylex.attrs(styles.form)}
              >
                <div {...stylex.attrs(styles.formBody)}>
                  <RequestTypeSelect value={requestType()} onChange={setRequestType} />
                  <div {...stylex.attrs(styles.grid)}>
                    <Field id="split-name" label="联系人姓名" required error={errors().contactName}>
                      <input
                        id="split-name"
                        name="contactName"
                        required
                        autocomplete="name"
                        value={state === "long-text" ? LONG_TEXT_FIXTURE.contactName : undefined}
                        {...stylex.attrs(
                          labStyles.input,
                          errors().contactName ? labStyles.inputInvalid : null,
                        )}
                      />
                    </Field>
                    <Field id="split-company" label="公司或机构" required error={errors().company}>
                      <input
                        id="split-company"
                        name="company"
                        required
                        autocomplete="organization"
                        value={state === "long-text" ? LONG_TEXT_FIXTURE.company : undefined}
                        {...stylex.attrs(
                          labStyles.input,
                          errors().company ? labStyles.inputInvalid : null,
                        )}
                      />
                    </Field>
                    <Field id="split-phone" label="手机号" required error={errors().phone}>
                      <input
                        id="split-phone"
                        name="phone"
                        type="tel"
                        required
                        autocomplete="tel"
                        inputmode="tel"
                        value={state === "long-text" ? LONG_TEXT_FIXTURE.phone : undefined}
                        {...fieldAria("split-phone", errors().phone)}
                        {...stylex.attrs(
                          labStyles.input,
                          errors().phone ? labStyles.inputInvalid : null,
                        )}
                      />
                    </Field>
                    <Field id="split-email" label="工作邮箱" required error={errors().email}>
                      <input
                        id="split-email"
                        name="email"
                        type="email"
                        required
                        autocomplete="email"
                        spellcheck={false}
                        placeholder="name@company.com"
                        value={state === "long-text" ? LONG_TEXT_FIXTURE.email : undefined}
                        {...fieldAria("split-email", errors().email)}
                        {...stylex.attrs(
                          labStyles.input,
                          errors().email ? labStyles.inputInvalid : null,
                        )}
                      />
                    </Field>
                    <Field
                      id="split-message"
                      label="需求描述"
                      required
                      error={errors().message}
                      sx={styles.full}
                    >
                      <textarea
                        id="split-message"
                        name="message"
                        required
                        placeholder={active().placeholder}
                        value={state === "long-text" ? LONG_TEXT_FIXTURE.message : undefined}
                        {...stylex.attrs(
                          labStyles.input,
                          labStyles.textarea,
                          errors().message ? labStyles.inputInvalid : null,
                        )}
                      />
                    </Field>
                  </div>
                </div>
                <div {...stylex.attrs(styles.footer)}>
                  <div {...stylex.attrs(styles.consent)}>
                    <label {...stylex.attrs(labStyles.consent)}>
                      <input
                        id="split-consent"
                        type="checkbox"
                        name="consent"
                        required
                        checked={state === "long-text" ? true : undefined}
                        {...fieldAria("split-consent", errors().consent)}
                        {...stylex.attrs(labStyles.checkbox)}
                      />
                      <span>同意泛成就本次咨询联系我，配方信息严格保密</span>
                    </label>
                    <FieldError
                      id="split-consent"
                      error={errors().consent}
                      sx={styles.consentError}
                    />
                  </div>
                  <button
                    type="submit"
                    {...stylex.attrs(
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
                      {...stylex.attrs(labStyles.buttonArrow)}
                    />
                  </button>
                </div>
              </form>
            </Show>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
