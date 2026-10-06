import * as stylex from "@stylexjs/stylex";

const SUFFIX = "有限公司";

const styles = stylex.create({
  name: {
    wordBreak: "keep-all",
  },
  suffix: {
    display: "inline-block",
  },
});

export function CompanyName({ name }: { name: string }) {
  if (!name.endsWith(SUFFIX)) return name;
  return (
    <span {...stylex.props(styles.name)}>
      {name.slice(0, -SUFFIX.length)}
      <span {...stylex.props(styles.suffix)}>{SUFFIX}</span>
    </span>
  );
}
