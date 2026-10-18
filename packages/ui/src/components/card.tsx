import { colors, radii } from "@fenchem-lp/ui/tokens.stylex";
import * as stylex from "@stylexjs/stylex";
import type { StyleXStyles } from "@stylexjs/stylex";
import type { ComponentProps } from "@solidjs/web";
import { omit } from "solid-js";

const cardStyles = stylex.create({
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

export interface CardProps extends Omit<ComponentProps<"div">, "class"> {
  size?: "default" | "sm";
  sx?: StyleXStyles;
}

function Card(props: CardProps) {
  const rest = omit(props, "sx", "size");

  return (
    <div
      data-slot="card"
      data-size={props.size ?? "default"}
      {...stylex.attrs(cardStyles.card, props.size === "sm" && cardStyles.card_sm, props.sx)}
      {...rest}
    />
  );
}

export interface CardHeaderProps extends Omit<ComponentProps<"div">, "class"> {
  size?: "default" | "sm";
  sx?: StyleXStyles;
}

function CardHeader(props: CardHeaderProps) {
  const rest = omit(props, "sx", "size");

  return (
    <div
      data-slot="card-header"
      {...stylex.attrs(cardStyles.header, props.size === "sm" && cardStyles.header_sm, props.sx)}
      {...rest}
    />
  );
}

export interface CardTitleProps extends Omit<ComponentProps<"div">, "class"> {
  sx?: StyleXStyles;
}

function CardTitle(props: CardTitleProps) {
  const rest = omit(props, "sx");

  return <div data-slot="card-title" {...stylex.attrs(cardStyles.title, props.sx)} {...rest} />;
}

export interface CardDescriptionProps extends Omit<ComponentProps<"div">, "class"> {
  sx?: StyleXStyles;
}

function CardDescription(props: CardDescriptionProps) {
  const rest = omit(props, "sx");

  return (
    <div
      data-slot="card-description"
      {...stylex.attrs(cardStyles.description, props.sx)}
      {...rest}
    />
  );
}

export interface CardActionProps extends Omit<ComponentProps<"div">, "class"> {
  sx?: StyleXStyles;
}

function CardAction(props: CardActionProps) {
  const rest = omit(props, "sx");

  return <div data-slot="card-action" {...stylex.attrs(cardStyles.action, props.sx)} {...rest} />;
}

export interface CardContentProps extends Omit<ComponentProps<"div">, "class"> {
  size?: "default" | "sm";
  sx?: StyleXStyles;
}

function CardContent(props: CardContentProps) {
  const rest = omit(props, "sx", "size");

  return (
    <div
      data-slot="card-content"
      {...stylex.attrs(cardStyles.content, props.size === "sm" && cardStyles.content_sm, props.sx)}
      {...rest}
    />
  );
}

export interface CardFooterProps extends Omit<ComponentProps<"div">, "class"> {
  size?: "default" | "sm";
  sx?: StyleXStyles;
}

function CardFooter(props: CardFooterProps) {
  const rest = omit(props, "sx", "size");

  return (
    <div
      data-slot="card-footer"
      {...stylex.attrs(cardStyles.footer, props.size === "sm" && cardStyles.footer_sm, props.sx)}
      {...rest}
    />
  );
}

export { Card, CardHeader, CardFooter, CardTitle, CardAction, CardDescription, CardContent };
