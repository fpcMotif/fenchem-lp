import * as stylex from "@stylexjs/stylex";
import { useState } from "react";

import { useReducedMotion } from "@/components/prototype/use-reduced-motion";

import { ABOUT_CAMPUS } from "../../about-data";
import { Lightbox } from "./lightbox";
import { PlateArc } from "./plate-arc";
import { PlateList } from "./plate-list";
import { PLATES } from "./plates";
import { ChartHeading, ui } from "./shared";
import { bp } from "./tokens.stylex";

const styles = stylex.create({
  head: {
    display: "grid",
    gridTemplateColumns: { default: "minmax(0, 1fr)", [bp.desktop]: "repeat(12, minmax(0, 1fr))" },
    columnGap: 24,
    rowGap: 16,
    alignItems: "end",
    marginBottom: { default: 48, [bp.tablet]: 64, [bp.desktop]: 24 },
  },
  heading: {
    gridColumn: { default: "auto", [bp.desktop]: "1 / span 7" },
  },
  hint: {
    gridColumn: { default: "auto", [bp.desktop]: "9 / span 4" },
    justifySelf: { default: "start", [bp.desktop]: "end" },
  },
});

export function Campus() {
  const reduce = useReducedMotion();
  const [open, setOpen] = useState<number | null>(null);
  const count = PLATES.length;

  return (
    <section
      id="about-campus"
      aria-labelledby="oos1k-campus"
      {...stylex.props(ui.section, ui.shell)}
    >
      <div {...stylex.props(styles.head)}>
        <div {...stylex.props(styles.heading)}>
          <ChartHeading
            id="oos1k-campus"
            numeral="II"
            label="Campus"
            title={ABOUT_CAMPUS.title}
            note="An archive of seven plates"
          />
        </div>
        <p {...stylex.props(ui.label, styles.hint)}>点击底片查看大图</p>
      </div>

      {reduce ? null : <PlateArc onOpen={setOpen} />}
      <PlateList always={reduce} onOpen={setOpen} />

      <Lightbox
        photos={PLATES}
        index={open}
        onClose={() => setOpen(null)}
        onStep={(delta) =>
          setOpen((current) => (current === null ? null : (current + delta + count) % count))
        }
      />
    </section>
  );
}
