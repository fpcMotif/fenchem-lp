import * as stylex from "@stylexjs/stylex";
import type { StyleXStyles } from "@stylexjs/stylex";
import { For, untrack } from "solid-js";

export function ProductSummary(props: {
  product: { title: string; description: string; tags: readonly string[] };
  sx?: StyleXStyles;
  styles: Record<
    "productTitleBlock" | "productTitle" | "rule" | "mutedText" | "list",
    StyleXStyles
  >;
}) {
  const styles = untrack(() => props.styles);
  return (
    <div {...stylex.attrs(props.sx)}>
      <div {...stylex.attrs(styles.productTitleBlock)}>
        <h3 {...stylex.attrs(styles.productTitle)}>{props.product.title}</h3>
        <hr {...stylex.attrs(styles.rule)} />
        <p {...stylex.attrs(styles.mutedText)}>{props.product.description}</p>
      </div>
      <ul {...stylex.attrs(styles.list)}>
        <For each={props.product.tags}>
          {(tag) => <li {...stylex.attrs(styles.mutedText)}>{tag}</li>}
        </For>
      </ul>
    </div>
  );
}
