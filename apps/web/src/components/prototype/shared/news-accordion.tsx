import * as stylex from "@stylexjs/stylex";
import type { StyleXStyles } from "@stylexjs/stylex";
import { Collapsible, CollapsiblePanel, CollapsibleTrigger } from "@ui-sdk/solid/collapsible";
import { For, Show } from "solid-js";
import type { JSX } from "@solidjs/web";

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
          <a href={segment.part} {...stylex.attrs(local.link)}>
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
  return (
    <Show
      when={props.item.details.length !== 0}
      fallback={
        <h3 {...stylex.attrs(props.styles.newsHeading)}>
          <span {...stylex.attrs(props.styles.newsTrigger, local.staticTrigger)}>
            {props.item.title}
          </span>
        </h3>
      }
    >
      <Collapsible open={props.open} onOpenChange={() => props.onToggle()}>
        <h3 {...stylex.attrs(props.styles.newsHeading)}>
          <CollapsibleTrigger {...stylex.attrs(props.styles.newsTrigger)}>
            <span>{props.item.title}</span>
            {props.icon}
          </CollapsibleTrigger>
        </h3>
        <CollapsiblePanel data-collapsible-animated="" {...stylex.attrs(props.styles.newsPanel)}>
          <div {...stylex.attrs(props.styles.newsPanelInner)}>
            <For each={props.item.details}>
              {(detail) => (
                <p {...stylex.attrs(props.styles.mutedText)}>
                  <DetailText text={detail} />
                </p>
              )}
            </For>
          </div>
        </CollapsiblePanel>
      </Collapsible>
    </Show>
  );
}
