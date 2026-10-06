import * as stylex from "@stylexjs/stylex";
import { useState } from "react";

import { Corridor } from "./corridor";
import { CorridorPlan } from "./corridor-plan";
import { GalleryWall } from "./gallery-wall";
import { Lightbox } from "./lightbox";
import { RoomSign } from "./room-sign";
import { WORKS, sectionTitle, ui } from "./shared";
import { bp, face, tone } from "./tokens.stylex";

const styles = stylex.create({
  section: {
    position: "relative",
    zIndex: 1,
    paddingTop: { default: 88, [bp.tablet]: 112, [bp.desktop]: 136 },
    paddingBottom: { default: 88, [bp.tablet]: 112, [bp.still]: 136, [bp.corridor]: 0 },
  },
  head: {
    paddingBottom: { default: 0, [bp.corridor]: 96 },
  },
  note: {
    margin: 0,
    fontFamily: face.sans,
    fontSize: { default: 16, [bp.desktop]: 18 },
    lineHeight: 1.9,
    color: tone.ink,
  },
  balanced: {
    display: "block",
    textWrap: "balance",
  },
  noteEnglish: {
    margin: 0,
    marginTop: 6,
    fontSize: { default: 18, [bp.desktop]: 21 },
    lineHeight: 1.4,
    color: tone.body,
  },
});

export function Campus() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [stepped, setStepped] = useState(false);
  const open = (index: number) => {
    setStepped(false);
    setOpenIndex(index);
  };

  return (
    <section
      id="about-campus"
      aria-labelledby="oos1z-campus"
      {...stylex.props(ui.anchor, styles.section)}
    >
      <div {...stylex.props(ui.shell, styles.head)}>
        <RoomSign
          numeral="II"
          id="oos1z-campus"
          title={sectionTitle("about-campus")}
          english="Campus"
        >
          <p {...stylex.props(styles.note)}>
            <span {...stylex.props(styles.balanced)}>
              七幅园区影像分列走廊两侧；尽头的一幅，正对着你。
            </span>
          </p>
          <p lang="en" {...stylex.props(ui.italic, styles.noteEnglish)}>
            Seven works line the corridor. One, at the end, faces you.
          </p>
        </RoomSign>
        <CorridorPlan onOpen={open} />
        <GalleryWall onOpen={open} />
      </div>
      <Corridor onOpen={open} />
      <Lightbox
        index={openIndex}
        stepped={stepped}
        onClose={() => setOpenIndex(null)}
        onStep={(delta) => {
          setStepped(true);
          setOpenIndex((current) =>
            current === null ? null : (current + delta + WORKS.length) % WORKS.length,
          );
        }}
      />
    </section>
  );
}
