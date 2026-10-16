import * as stylex from "@stylexjs/stylex";
import {
  useContext,
  useEffect,
  useRef,
  useState,
  type AnimationEvent,
  type ReactNode,
  type SyntheticEvent,
} from "react";
import { Clock, Mail, MapPin, Phone } from "lucide-react";

import { PickerHostContext, labStyles } from "./kit-values";

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
