import { colors, radii } from "@fenchem-lp/ui/tokens.stylex";
import * as stylex from "@stylexjs/stylex";
import type { StyleXStyles } from "@stylexjs/stylex";
import * as React from "react";

export const cardStyles = stylex.create({
  card: {
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
    overflow: "hidden",
    borderRadius: radii.none,
    backgroundColor: colors.card,
    paddingBlock: "1rem",
    fontSize: "0.75rem",
    lineHeight: "1.625",
    color: colors.cardForeground,
    boxShadow: "0 0 0 1px color-mix(in oklab, var(--foreground) 10%, transparent)",
  },
  card_sm: {
    gap: "0.5rem",
    paddingBlock: "0.75rem",
  },
  header: {
    display: "grid",
    gridAutoRows: "min-content",
    alignItems: "start",
    gap: "0.25rem",
    borderRadius: radii.none,
    paddingInline: "1rem",
    containerType: "inline-size",
  },
  header_sm: {
    paddingInline: "0.75rem",
  },
  title: {
    fontSize: "0.875rem",
    lineHeight: "1.25rem",
    fontWeight: 500,
  },
  description: {
    fontSize: "0.75rem",
    lineHeight: "1.625",
    color: colors.mutedForeground,
  },
  action: {
    gridColumn: 2,
    gridRow: "1 / span 2",
    alignSelf: "start",
    justifySelf: "end",
  },
  content: {
    paddingInline: "1rem",
  },
  content_sm: {
    paddingInline: "0.75rem",
  },
  footer: {
    display: "flex",
    alignItems: "center",
    borderRadius: radii.none,
    borderTopWidth: 1,
    borderTopStyle: "solid",
    borderTopColor: colors.border,
    padding: "1rem",
  },
  footer_sm: {
    padding: "0.75rem",
  },
});

export interface CardProps extends Omit<React.ComponentProps<"div">, "className"> {
  size?: "default" | "sm";
  sx?: StyleXStyles;
}

function Card({ sx, size = "default", ...props }: CardProps) {
  const styleProps = stylex.props(cardStyles.card, size === "sm" && cardStyles.card_sm, sx);

  return <div data-slot="card" data-size={size} {...styleProps} {...props} />;
}

export interface CardHeaderProps extends Omit<React.ComponentProps<"div">, "className"> {
  size?: "default" | "sm";
  sx?: StyleXStyles;
}

function CardHeader({ sx, size, ...props }: CardHeaderProps) {
  const styleProps = stylex.props(cardStyles.header, size === "sm" && cardStyles.header_sm, sx);

  return <div data-slot="card-header" {...styleProps} {...props} />;
}

export interface CardTitleProps extends Omit<React.ComponentProps<"div">, "className"> {
  sx?: StyleXStyles;
}

function CardTitle({ sx, ...props }: CardTitleProps) {
  const styleProps = stylex.props(cardStyles.title, sx);

  return <div data-slot="card-title" {...styleProps} {...props} />;
}

export interface CardDescriptionProps extends Omit<React.ComponentProps<"div">, "className"> {
  sx?: StyleXStyles;
}

function CardDescription({ sx, ...props }: CardDescriptionProps) {
  const styleProps = stylex.props(cardStyles.description, sx);

  return <div data-slot="card-description" {...styleProps} {...props} />;
}

export interface CardActionProps extends Omit<React.ComponentProps<"div">, "className"> {
  sx?: StyleXStyles;
}

function CardAction({ sx, ...props }: CardActionProps) {
  const styleProps = stylex.props(cardStyles.action, sx);

  return <div data-slot="card-action" {...styleProps} {...props} />;
}

export interface CardContentProps extends Omit<React.ComponentProps<"div">, "className"> {
  size?: "default" | "sm";
  sx?: StyleXStyles;
}

function CardContent({ sx, size, ...props }: CardContentProps) {
  const styleProps = stylex.props(cardStyles.content, size === "sm" && cardStyles.content_sm, sx);

  return <div data-slot="card-content" {...styleProps} {...props} />;
}

export interface CardFooterProps extends Omit<React.ComponentProps<"div">, "className"> {
  size?: "default" | "sm";
  sx?: StyleXStyles;
}

function CardFooter({ sx, size, ...props }: CardFooterProps) {
  const styleProps = stylex.props(cardStyles.footer, size === "sm" && cardStyles.footer_sm, sx);

  return <div data-slot="card-footer" {...styleProps} {...props} />;
}

export { Card, CardHeader, CardFooter, CardTitle, CardAction, CardDescription, CardContent };
