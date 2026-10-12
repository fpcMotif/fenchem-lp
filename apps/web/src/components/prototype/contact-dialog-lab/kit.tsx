import { breakpoints, colors } from "@fenchem-lp/ui/tokens.stylex";
import * as stylex from "@stylexjs/stylex";
import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  type AnimationEvent,
  type ReactNode,
  type SyntheticEvent,
} from "react";
import { Clock, Mail, MapPin, Phone } from "lucide-react";

import { ABOUT_HERO } from "../variant-oos1/about-data";
import {
  CONTACT_DETAILS,
  INQUIRY_SUBJECTS,
  type InquirySubjectId,
} from "../variant-oos1/contact-data";
import { color, ease } from "../variant-oos1/tokens.stylex";

export {
  CONTACT_DETAILS,
  INQUIRY_SUBJECTS,
  NEXT_STEPS,
  SERVICE_PROMISES,
  VISIT_LOCATION,
  type InquirySubjectId,
} from "../variant-oos1/contact-data";

export type DialogVariantProps = {
  subject: InquirySubjectId | null;
  onClose: () => void;
};

const primaryPhone = CONTACT_DETAILS.find((d) => d.href?.startsWith("tel:")) ?? CONTACT_DETAILS[0];
const primaryEmail =
  CONTACT_DETAILS.find((d) => d.href?.startsWith("mailto:")) ?? CONTACT_DETAILS[0];

export const COMPANY = {
  name: ABOUT_HERO.title,
  english: ABOUT_HERO.englishTitle,
  established: "1995",
  phone: primaryPhone,
} as const;

export const SUBJECT_ROUTES: Record<
  InquirySubjectId,
  { team: string; english: string; reply: string; channel: (typeof CONTACT_DETAILS)[number] }
> = {
  sample: {
    team: "样品服务中心",
    english: "Sample desk",
    reply: "48 小时内顺丰寄样",
    channel: primaryEmail,
  },
  formulation: {
    team: "应用研发中心",
    english: "Application lab",
    reply: "1 对 1 配方工程师答疑",
    channel: primaryEmail,
  },
  visit: {
    team: "总部行政接待",
    english: "Visitor desk",
    reply: "提前 3 个工作日确认到访",
    channel: primaryPhone,
  },
  other: {
    team: "综合事务部",
    english: "General office",
    reply: "工作日 24 小时内回复",
    channel: primaryEmail,
  },
};

export function ContactIcon({
  detail,
  size = 15,
  strokeWidth = 1.75,
}: {
  detail: { href?: string | null; icon?: string };
  size?: number;
  strokeWidth?: number;
}) {
  const icon =
    detail.icon ??
    (detail.href?.startsWith("tel:")
      ? "phone"
      : detail.href?.startsWith("mailto:")
        ? "mail"
        : "map-pin");

  switch (icon) {
    case "phone":
      return <Phone size={size} strokeWidth={strokeWidth} nonScalingStroke aria-hidden="true" />;
    case "mail":
      return <Mail size={size} strokeWidth={strokeWidth} nonScalingStroke aria-hidden="true" />;
    case "clock":
      return <Clock size={size} strokeWidth={strokeWidth} nonScalingStroke aria-hidden="true" />;
    case "map-pin":
    default:
      return <MapPin size={size} strokeWidth={strokeWidth} nonScalingStroke aria-hidden="true" />;
  }
}

export const subjectById = (id: InquirySubjectId) =>
  INQUIRY_SUBJECTS.find((item) => item.id === id) ?? INQUIRY_SUBJECTS[0];

export const PickerHostContext = createContext<(host: HTMLElement | null) => void>(() => {});

const EXIT_FALLBACK_MS = 400;

export function useLabDialog(onClose: () => void) {
  const ref = useRef<HTMLDialogElement>(null);
  const [closing, setClosing] = useState(false);
  const setPickerHost = useContext(PickerHostContext);

  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    if (!dialog.open) {
      dialog.showModal();
      dialog.focus();
    }
    setPickerHost(dialog);
    const root = document.documentElement;
    const previous = root.style.overflow;
    root.style.overflow = "hidden";
    return () => {
      root.style.overflow = previous;
      setPickerHost(null);
    };
  }, [setPickerHost]);

  const finish = () => {
    if (ref.current?.open) ref.current.close();
  };

  const requestClose = () => {
    setClosing(true);
    window.setTimeout(finish, EXIT_FALLBACK_MS);
  };

  return {
    closing,
    requestClose,
    dialogProps: {
      ref,
      lang: "zh-CN",
      tabIndex: -1,
      onCancel: (event: SyntheticEvent<HTMLDialogElement>) => {
        event.preventDefault();
        requestClose();
      },
      onClose: () => {
        setPickerHost(null);
        document.documentElement.style.overflow = "";
        onClose();
      },
    },
    panelProps: {
      onAnimationEnd: (event: AnimationEvent<HTMLElement>) => {
        if (closing && event.target === event.currentTarget) finish();
      },
    },
  };
}

const COPIED_MS = 1600;

export function useCopy() {
  const [copied, setCopied] = useState<string | null>(null);

  useEffect(() => {
    if (copied === null) return;
    const timer = window.setTimeout(() => setCopied(null), COPIED_MS);
    return () => window.clearTimeout(timer);
  }, [copied]);

  const copy = (text: string, selectOnFailure: HTMLElement | null) => {
    navigator.clipboard.writeText(text).then(
      () => setCopied(text),
      () => {
        setCopied(null);
        if (selectOnFailure) window.getSelection()?.selectAllChildren(selectOnFailure);
      },
    );
  };

  return { copied, copy };
}

const HOVER = "@media (hover: hover)";
const FIELD_BORDER = "#8a93a3";
const REQUIRED_MARK = "#b91c1c";
const CONTROL_RADIUS = 8;

const motionKeys = {
  fadeIn: stylex.keyframes({ "0%": { opacity: 0 }, "100%": { opacity: 1 } }),
  swapIn: stylex.keyframes({
    "0%": { opacity: 0, transform: "translateY(8px)" },
    "100%": { opacity: 1, transform: "none" },
  }),
};

export const labStyles = stylex.create({
  dialog: {
    position: "fixed",
    inset: 0,
    width: "100vw",
    height: "100dvh",
    maxWidth: "none",
    maxHeight: "none",
    margin: 0,
    padding: 0,
    borderWidth: 0,
    overflow: "hidden",
    backgroundColor: "transparent",
    color: color.ink,
    outlineStyle: "none",
  },
  dismiss: {
    position: "absolute",
    inset: 0,
    width: "100%",
    height: "100%",
    padding: 0,
    borderWidth: 0,
    backgroundColor: "transparent",
    cursor: "default",
  },
  srOnly: {
    position: "absolute",
    width: 1,
    height: 1,
    margin: -1,
    overflow: "hidden",
    clipPath: "inset(50%)",
    whiteSpace: "nowrap",
    borderWidth: 0,
  },
  list: {
    margin: 0,
    paddingInlineStart: 0,
    listStyle: "none",
  },
  focusRing: {
    outlineStyle: { default: "none", ":focus-visible": "solid" },
    outlineWidth: 2,
    outlineColor: colors.brandBlue700,
    outlineOffset: 2,
  },
  swapIn: {
    animationName: { default: motionKeys.fadeIn, [breakpoints.motionOk]: motionKeys.swapIn },
    animationDuration: "240ms",
    animationTimingFunction: ease.out,
  },

  field: {
    display: "flex",
    flexDirection: "column",
    gap: 8,
    minWidth: 0,
  },
  label: {
    fontSize: 13,
    fontWeight: 500,
    letterSpacing: "0.02em",
    color: color.ink,
  },
  requiredMark: {
    marginInlineStart: 2,
    color: REQUIRED_MARK,
  },
  error: {
    margin: 0,
    fontSize: 13,
    lineHeight: 1.6,
    color: REQUIRED_MARK,
  },
  inputInvalid: {
    borderColor: { default: REQUIRED_MARK, ":focus-visible": colors.brandBlue700 },
  },
  input: {
    boxSizing: "border-box",
    width: "100%",
    height: 44,
    paddingInline: 12,
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: {
      default: FIELD_BORDER,
      ":hover": { default: null, [HOVER]: color.ink },
      ":focus-visible": colors.brandBlue700,
    },
    borderRadius: CONTROL_RADIUS,
    backgroundColor: colors.paper,
    fontFamily: "inherit",
    fontSize: 16,
    color: color.ink,
    transitionProperty: "border-color",
    transitionDuration: "150ms",
    transitionTimingFunction: "ease",
    outlineStyle: { default: "none", ":focus-visible": "solid" },
    outlineWidth: 1,
    outlineColor: colors.brandBlue700,
    outlineOffset: 0,
    "::placeholder": { color: color.muted },
  },
  textarea: {
    height: "auto",
    minHeight: 112,
    paddingBlock: 10,
    lineHeight: 1.7,
    resize: "vertical",
  },
  consent: {
    display: "flex",
    alignItems: "flex-start",
    gap: 10,
    minWidth: 0,
    fontSize: 13,
    lineHeight: 1.7,
    color: color.bodyText,
    cursor: "pointer",
  },
  checkbox: {
    flexShrink: 0,
    width: 18,
    height: 18,
    margin: 0,
    marginTop: 3,
    accentColor: colors.brandBlue700,
    cursor: "pointer",
  },
  primaryButton: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    flexShrink: 0,
    height: 48,
    paddingInline: 24,
    borderWidth: 0,
    borderRadius: CONTROL_RADIUS,
    backgroundColor: {
      default: colors.brandBlue700,
      ":hover": { default: null, [HOVER]: colors.brandBlue800 },
    },
    fontFamily: "inherit",
    fontSize: 15,
    fontWeight: 500,
    letterSpacing: "0.04em",
    color: colors.paper,
    cursor: "pointer",
    transform: {
      default: null,
      ":enabled:active": { default: null, [breakpoints.motionOk]: "scale(0.96)" },
    },
    transitionProperty: "background-color, transform",
    transitionDuration: "150ms",
    transitionTimingFunction: `ease, ${ease.out}`,
    WebkitTapHighlightColor: "transparent",
  },
  trailingIcon: {
    paddingInlineEnd: 22,
  },
  buttonArrow: {
    transform: {
      default: null,
      [stylex.when.ancestor(":hover")]: {
        default: null,
        "@media (hover: hover) and (prefers-reduced-motion: no-preference)": "translateX(3px)",
      },
    },
    transitionProperty: "transform",
    transitionDuration: "150ms",
    transitionTimingFunction: ease.out,
  },
  closeButton: {
    display: "grid",
    placeItems: "center",
    flexShrink: 0,
    width: 40,
    height: 40,
    padding: 0,
    borderWidth: 0,
    borderRadius: 0,
    backgroundColor: "transparent",
    color: "inherit",
    cursor: "pointer",
    opacity: { default: 0.72, ":hover": { default: null, [HOVER]: 1 }, ":focus-visible": 1 },
    transform: {
      default: null,
      ":enabled:active": { default: null, [breakpoints.motionOk]: "scale(0.96)" },
    },
    transitionProperty: "opacity, transform",
    transitionDuration: "150ms",
    transitionTimingFunction: ease.out,
    WebkitTapHighlightColor: "transparent",
    outlineStyle: { default: "none", ":focus-visible": "solid" },
    outlineWidth: 2,
    outlineColor: "currentColor",
    outlineOffset: -2,
  },
});

export const fieldAria = (id: string, error?: string) => ({
  "aria-describedby": error ? `${id}-error` : undefined,
  "aria-invalid": error ? true : undefined,
});

export function FieldError({
  id,
  error,
  sx,
}: {
  id: string;
  error?: string;
  sx?: stylex.StyleXStyles;
}) {
  return error ? (
    <p id={`${id}-error`} {...stylex.props(labStyles.error, sx)}>
      {error}
    </p>
  ) : null;
}

export function Field({
  id,
  label,
  required = false,
  error,
  sx,
  children,
}: {
  id: string;
  label: string;
  required?: boolean;
  error?: string;
  sx?: stylex.StyleXStyles;
  children: ReactNode;
}) {
  return (
    <div {...stylex.props(labStyles.field, sx)}>
      <label htmlFor={id} {...stylex.props(labStyles.label)}>
        {label}
        {required ? (
          <span aria-hidden="true" {...stylex.props(labStyles.requiredMark)}>
            *
          </span>
        ) : null}
      </label>
      {children}
      <FieldError id={id} error={error} />
    </div>
  );
}
