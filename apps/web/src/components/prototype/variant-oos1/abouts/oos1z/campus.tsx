import * as stylex from "@stylexjs/stylex";

import { useLightbox } from "@/components/prototype/shared/lightbox";

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
});

export function Campus() {
  const lightbox = useLightbox(WORKS.length);

  return (
    <section
      id="about-campus"
      aria-labelledby="oos1z-campus"
      {...stylex.props(ui.anchor, styles.section)}
    >
      <div {...stylex.props(ui.shell, styles.head)}>
        <RoomSign id="oos1z-campus" title={sectionTitle("about-campus")}>
          <p {...stylex.props(styles.note)}>
            <span {...stylex.props(styles.balanced)}>
              七幅园区影像分列走廊两侧；尽头的一幅，正对着你。
            </span>
          </p>
        </RoomSign>
        <CorridorPlan onOpen={lightbox.open} />
        <GalleryWall onOpen={lightbox.open} />
      </div>
      <Corridor onOpen={lightbox.open} />
      <Lightbox lightbox={lightbox} />
    </section>
  );
}
