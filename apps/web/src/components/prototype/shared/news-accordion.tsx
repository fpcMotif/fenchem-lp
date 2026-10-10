import * as stylex from "@stylexjs/stylex";
import type { StyleXStyles } from "@stylexjs/stylex";
import { useId, type ReactNode } from "react";

import { EASE } from "../motion-constants";
import { useReducedMotion } from "../use-reduced-motion";
import { Collapse } from "./collapse";

const URL_PATTERN = /(https?:\/\/\S+)/;

const local = stylex.create({
  staticTrigger: {
    cursor: "default",
    color: "inherit",
  },
  link: {
    color: "inherit",
    textDecoration: "underline",
    textUnderlineOffset: "0.2em",
  },
});

function DetailText({ text }: { text: string }) {
  return (
    <>
      {text.split(URL_PATTERN).map((part, index) =>
        index % 2 === 1 ? (
          <a key={index} href={part} {...stylex.props(local.link)}>
            {part}
          </a>
        ) : (
          part
        ),
      )}
    </>
  );
}

export function NewsAccordion({
  item,
  open,
  onToggle,
  icon,
  styles,
}: {
  item: { title: string; details: readonly string[] };
  open: boolean;
  onToggle: () => void;
  icon: ReactNode;
  styles: Record<
    "newsHeading" | "newsTrigger" | "newsPanel" | "newsPanelInner" | "mutedText",
    StyleXStyles
  >;
}) {
  const panelId = useId();
  const reduce = useReducedMotion();
  if (item.details.length === 0) {
    return (
      <h3 {...stylex.props(styles.newsHeading)}>
        <span {...stylex.props(styles.newsTrigger, local.staticTrigger)}>{item.title}</span>
      </h3>
    );
  }
  return (
    <>
      <h3 {...stylex.props(styles.newsHeading)}>
        <button
          type="button"
          aria-expanded={open}
          aria-controls={panelId}
          onClick={onToggle}
          {...stylex.props(styles.newsTrigger)}
        >
          <span>{item.title}</span>
          {icon}
        </button>
      </h3>
      <Collapse
        id={panelId}
        open={open}
        transition={{ duration: reduce ? 0 : 0.25, ease: EASE }}
        {...stylex.props(styles.newsPanel)}
      >
        <div {...stylex.props(styles.newsPanelInner)}>
          {item.details.map((detail) => (
            <p key={detail} {...stylex.props(styles.mutedText)}>
              <DetailText text={detail} />
            </p>
          ))}
        </div>
      </Collapse>
    </>
  );
}
