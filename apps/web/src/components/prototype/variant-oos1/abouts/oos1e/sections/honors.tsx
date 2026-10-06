import * as stylex from "@stylexjs/stylex";

import { ABOUT_HONORS } from "../../../about-data";
import { Sheet } from "../sheet";
import { base, Reveal } from "../shared";
import { HONORS_SHEET } from "../sheets";
import { Stamp } from "../stamp";
import { color, media } from "../tokens.stylex";

const LEVEL_LABEL = {
  national: "国家级",
  provincial: "江苏省级",
  municipal: "南京市级",
} as const;

const LEVELS = ["national", "provincial", "municipal"] as const;

const styles = stylex.create({
  groups: {
    display: "flex",
    flexDirection: "column",
    gap: { default: 48, [media.lgUp]: 64 },
  },
  group: {
    display: "grid",
    gridTemplateColumns: {
      default: "minmax(0, 1fr)",
      [media.lgUp]: "minmax(0, 0.7fr) minmax(0, 2fr)",
    },
    columnGap: 48,
    rowGap: 12,
    alignItems: "start",
  },
  label: {
    paddingTop: { default: 0, [media.lgUp]: 18 },
  },
  list: {
    display: "grid",
    gridTemplateColumns: {
      default: "minmax(0, 1fr)",
      [media.mdUp]: "repeat(2, minmax(0, 1fr))",
    },
    columnGap: 48,
    margin: 0,
    padding: 0,
    listStyle: "none",
  },
  listSingle: {
    gridTemplateColumns: "minmax(0, 1fr)",
  },
  item: {
    paddingBlock: { default: 14, [media.lgUp]: 16 },
    borderTopWidth: 1,
    borderTopStyle: "solid",
    borderTopColor: color.hairline,
    fontSize: { default: 17, [media.lgUp]: 20 },
    fontWeight: 500,
    lineHeight: 1.4,
    letterSpacing: "0.06em",
    color: color.ink,
  },
  itemLead: {
    fontSize: { default: 22, [media.lgUp]: 28 },
  },
  mark: {
    position: "relative",
    display: "inline-block",
  },
  stamp: {
    top: "50%",
    left: { default: "calc(100% + 14px)", [media.lgUp]: "calc(100% + 20px)" },
    width: { default: 76, [media.lgUp]: 92 },
    marginTop: { default: -38, [media.lgUp]: -46 },
  },
});

export function HonorsSheet() {
  return (
    <Sheet def={HONORS_SHEET}>
      <div {...stylex.props(styles.groups)}>
        {LEVELS.map((level, groupIdx) => {
          const label = LEVEL_LABEL[level];
          const entries = ABOUT_HONORS.items.filter((item) => item.level === level);
          return (
            <Reveal key={level} step={groupIdx} sx={styles.group}>
              <p {...stylex.props(base.quiet, styles.label)}>{label}</p>
              <ul {...stylex.props(styles.list, entries.length === 1 && styles.listSingle)}>
                {entries.map((honor) => (
                  <li
                    key={honor.id}
                    {...stylex.props(styles.item, level === "national" && styles.itemLead)}
                  >
                    {level === "national" ? (
                      <span {...stylex.props(styles.mark)}>
                        {honor.title}
                        <Stamp
                          kind="cert"
                          ring={`${label} · FENCHEM · ${label} · FENCHEM · `}
                          tilt={-8}
                          thump={false}
                          sx={styles.stamp}
                        />
                      </span>
                    ) : (
                      honor.title
                    )}
                  </li>
                ))}
              </ul>
            </Reveal>
          );
        })}
      </div>
    </Sheet>
  );
}
