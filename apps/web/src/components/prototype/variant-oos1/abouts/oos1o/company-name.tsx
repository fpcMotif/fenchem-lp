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

export function CompanyName(props: { name: string }) {
  if (!props.name.endsWith(SUFFIX)) return props.name;
  return (
    <span {...stylex.attrs(styles.name)}>
      {props.name.slice(0, -SUFFIX.length)}
      <span {...stylex.attrs(styles.suffix)}>{SUFFIX}</span>
    </span>
  );
}
