import * as stylex from "@octanejs/stylex";
import type { StyleXStyles } from "@octanejs/stylex";
import { useId } from "octane";
import type { ReactNode } from "@/compat/react-types";

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

function splitWithUrls(text: string) {
  let cursor = 0;
  return text.split(URL_PATTERN).map((part, index) => {
    const key = `${cursor}-${part}`;
    cursor += part.length;
    return { key, part, isLink: index % 2 === 1 };
  });
}

function DetailText({ text }: { text: string }) {
  return (
    <>
      {splitWithUrls(text).map(({ key, part, isLink }) =>
        isLink ? (
          <a key={key} href={part} {...stylex.props(local.link)}>
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
