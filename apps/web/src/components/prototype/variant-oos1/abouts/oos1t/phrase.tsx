import * as stylex from "@stylexjs/stylex";

const PREFIXES = ["江苏省", "南京市级", "南京市", "南京", "国家"] as const;
const SUFFIXES = ["有限公司", "中小企业", "研究中心"] as const;

const styles = stylex.create({
  segment: {
    display: "inline-block",
    whiteSpace: "nowrap",
  },
});

function splitName(name: string) {
  const parts: string[] = [];
  let rest = name;
  const prefix = PREFIXES.find(
    (candidate) => rest.startsWith(candidate) && rest.length > candidate.length,
  );
  if (prefix) {
    parts.push(prefix);
    rest = rest.slice(prefix.length);
  }
  const suffix = SUFFIXES.find(
    (candidate) => rest.endsWith(candidate) && rest.length > candidate.length,
  );
  if (suffix) {
    parts.push(rest.slice(0, -suffix.length), suffix);
  } else {
    parts.push(rest);
  }
  return parts;
}

export function Phrase({ text }: { text: string }) {
  return splitName(text).map((part, index) => (
    <span key={`${index}-${part}`} {...stylex.props(styles.segment)}>
      {part}
    </span>
  ));
}
