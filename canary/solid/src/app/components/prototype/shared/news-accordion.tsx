import * as stylex from "@stylexjs/stylex";
import type { StyleXStyles } from "@stylexjs/stylex";
import { createUniqueId, For, Show, type JSX } from "solid-js";

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

function DetailText(props: { text: string }) {
  return (
    <For each={splitWithUrls(props.text)}>
      {(segment) =>
        segment.isLink ? (
          <a href={segment.part} {...stylex.props(local.link)}>
            {segment.part}
          </a>
        ) : (
          segment.part
        )
      }
    </For>
  );
}

export function NewsAccordion(props: {
  item: { title: string; details: readonly string[] };
  open: boolean;
  onToggle: () => void;
  icon: JSX.Element;
  styles: Record<
    "newsHeading" | "newsTrigger" | "newsPanel" | "newsPanelInner" | "mutedText",
    StyleXStyles
  >;
}) {
  const panelId = createUniqueId();
  const reduce = useReducedMotion();
  return (
    <Show
      when={props.item.details.length !== 0}
      fallback={
        <h3 {...stylex.props(props.styles.newsHeading)}>
          <span {...stylex.props(props.styles.newsTrigger, local.staticTrigger)}>
            {props.item.title}
          </span>
        </h3>
      }
    >
      <h3 {...stylex.props(props.styles.newsHeading)}>
        <button
          type="button"
          aria-expanded={props.open}
          aria-controls={panelId}
          onClick={() => props.onToggle()}
          {...stylex.props(props.styles.newsTrigger)}
        >
          <span>{props.item.title}</span>
          {props.icon}
        </button>
      </h3>
      <Collapse
        id={panelId}
        open={props.open}
        transition={{ duration: reduce() ? 0 : 0.25, ease: EASE }}
        {...stylex.props(props.styles.newsPanel)}
      >
        <div {...stylex.props(props.styles.newsPanelInner)}>
          <For each={props.item.details}>
            {(detail) => (
              <p {...stylex.props(props.styles.mutedText)}>
                <DetailText text={detail} />
              </p>
            )}
          </For>
        </div>
      </Collapse>
    </Show>
  );
}
