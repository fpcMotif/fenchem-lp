import { colors, radii } from "@fenchem-lp/ui/tokens.stylex";
import * as stylex from "@stylexjs/stylex";
import type { StyleXStyles } from "@stylexjs/stylex";

export const buttonStyles = stylex.create({
  base: {
    display: "inline-flex",
    flexShrink: 0,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: radii.none,
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "transparent",
    backgroundClip: "padding-box",
    fontSize: "0.75rem",
    lineHeight: "1rem",
    fontWeight: 500,
    whiteSpace: "nowrap",
    transitionProperty: "all",
    transitionDuration: "150ms",
    transitionTimingFunction: "ease",
    outline: "none",
    userSelect: "none",
    textDecoration: "none",
    cursor: "pointer",
    ":focus-visible": {
      borderColor: colors.ring,
      boxShadow: "0 0 0 1px color-mix(in oklab, var(--ring) 50%, transparent)",
    },
    ":disabled": {
      pointerEvents: "none",
      opacity: 0.5,
      cursor: "not-allowed",
    },
  },
  // Variant styles
  variant_default: {
    backgroundColor: colors.primary,
    color: colors.primaryForeground,
    ":hover": {
      backgroundColor: "color-mix(in oklab, var(--primary) 80%, transparent)",
    },
  },
  variant_outline: {
    borderColor: colors.border,
    backgroundColor: colors.background,
    color: colors.foreground,
    ":hover": {
      backgroundColor: colors.muted,
      color: colors.foreground,
    },
  },
  variant_secondary: {
    backgroundColor: colors.secondary,
    color: colors.secondaryForeground,
    ":hover": {
      backgroundColor: "color-mix(in oklab, var(--secondary) 80%, transparent)",
    },
  },
  variant_ghost: {
    backgroundColor: "transparent",
    color: colors.foreground,
    ":hover": {
      backgroundColor: colors.muted,
      color: colors.foreground,
    },
  },
  variant_destructive: {
    backgroundColor: "color-mix(in oklab, var(--destructive) 10%, transparent)",
    color: colors.destructive,
    ":hover": {
      backgroundColor: "color-mix(in oklab, var(--destructive) 20%, transparent)",
    },
    ":focus-visible": {
      borderColor: "color-mix(in oklab, var(--destructive) 40%, transparent)",
      boxShadow: "0 0 0 1px color-mix(in oklab, var(--destructive) 20%, transparent)",
    },
  },
  variant_link: {
    backgroundColor: "transparent",
    color: colors.primary,
    textUnderlineOffset: 4,
    ":hover": {
      textDecoration: "underline",
    },
  },

  // Size styles
  size_default: {
    height: "2rem",
    gap: "0.375rem",
    paddingInline: "0.625rem",
  },
  size_xs: {
    height: "1.5rem",
    gap: "0.25rem",
    paddingInline: "0.5rem",
    fontSize: "0.75rem",
  },
  size_sm: {
    height: "1.75rem",
    gap: "0.25rem",
    paddingInline: "0.625rem",
  },
  size_lg: {
    height: "2.25rem",
    gap: "0.375rem",
    paddingInline: "0.625rem",
  },
  size_icon: {
    height: "2rem",
    width: "2rem",
    paddingInline: 0,
    paddingBlock: 0,
  },
  size_icon_xs: {
    height: "1.5rem",
    width: "1.5rem",
    paddingInline: 0,
    paddingBlock: 0,
  },
  size_icon_sm: {
    height: "1.75rem",
    width: "1.75rem",
    paddingInline: 0,
    paddingBlock: 0,
  },
  size_icon_lg: {
    height: "2.25rem",
    width: "2.25rem",
    paddingInline: 0,
    paddingBlock: 0,
  },
});

export type ButtonVariant = "default" | "outline" | "secondary" | "ghost" | "destructive" | "link";
export type ButtonSize =
  | "default"
  | "xs"
  | "sm"
  | "lg"
  | "icon"
  | "icon-xs"
  | "icon-sm"
  | "icon-lg";

export interface ButtonVariantProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  sx?: StyleXStyles;
}

export function getButtonStyles(
  variant: ButtonVariant = "default",
  size: ButtonSize = "default",
  sx?: StyleXStyles,
) {
  const variantKey = `variant_${variant}` as keyof typeof buttonStyles;
  const sizeKey = `size_${size.replace("-", "_")}` as keyof typeof buttonStyles;

  return [buttonStyles.base, buttonStyles[variantKey], buttonStyles[sizeKey], sx];
}
