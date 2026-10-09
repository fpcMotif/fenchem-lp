import * as stylex from "@stylexjs/stylex";
import type { StyleXStyles } from "@stylexjs/stylex";

export function ProductSummary({
  product,
  sx,
  styles,
}: {
  product: { title: string; description: string; tags: readonly string[] };
  sx?: StyleXStyles;
  styles: Record<
    "productTitleBlock" | "productTitle" | "rule" | "mutedText" | "list",
    StyleXStyles
  >;
}) {
  return (
    <div {...stylex.props(sx)}>
      <div {...stylex.props(styles.productTitleBlock)}>
        <h3 {...stylex.props(styles.productTitle)}>{product.title}</h3>
        <hr {...stylex.props(styles.rule)} />
        <p {...stylex.props(styles.mutedText)}>{product.description}</p>
      </div>
      <ul {...stylex.props(styles.list)}>
        {product.tags.map((tag) => (
          <li key={tag} {...stylex.props(styles.mutedText)}>
            {tag}
          </li>
        ))}
      </ul>
    </div>
  );
}
