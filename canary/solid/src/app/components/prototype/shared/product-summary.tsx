import * as stylex from "@stylexjs/stylex";
import type { StyleXStyles } from "@stylexjs/stylex";
import { For } from "solid-js";

export function ProductSummary(props: {
  product: { title: string; description: string; tags: readonly string[] };
  sx?: StyleXStyles;
  styles: Record<
    "productTitleBlock" | "productTitle" | "rule" | "mutedText" | "list",
    StyleXStyles
  >;
}) {
  const styles = props.styles;
  return (
    <div {...stylex.props(props.sx)}>
      <div {...stylex.props(styles.productTitleBlock)}>
        <h3 {...stylex.props(styles.productTitle)}>{props.product.title}</h3>
        <hr {...stylex.props(styles.rule)} />
        <p {...stylex.props(styles.mutedText)}>{props.product.description}</p>
      </div>
      <ul {...stylex.props(styles.list)}>
        <For each={props.product.tags}>
          {(tag) => <li {...stylex.props(styles.mutedText)}>{tag}</li>}
        </For>
      </ul>
    </div>
  );
}
