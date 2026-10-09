import * as stylex from "@stylexjs/stylex";
import { useState } from "react";

import { ABOUT_CAMPUS } from "../../about-data";
import { INDEX_PLATES_VISITED_THEN_UNVISITED, ROOMS_IN_WALKING_ORDER } from "./journey";
import { Lightbox } from "./lightbox";
import { NestedSequence } from "./nested-sequence";
import { PlateIndex } from "./plate-index";
import { PortalStage } from "./portal-stage";
import { SectionHead, useMediaQuery } from "./shared";
import { srOnly, ui } from "./shared-values";

const PORTAL_QUERY = "(min-width: 1024px) and (prefers-reduced-motion: no-preference)";
const WALK = ROOMS_IN_WALKING_ORDER.map((room) => room.plate.caption).join("、");

export function Campus() {
  const portal = useMediaQuery(PORTAL_QUERY);
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [stepped, setStepped] = useState(false);
  const plates = INDEX_PLATES_VISITED_THEN_UNVISITED;

  return (
    <section
      id="about-campus"
      aria-labelledby="oos1b-campus"
      {...stylex.props(ui.anchor, ui.section)}
    >
      <div {...stylex.props(ui.shell)}>
        <SectionHead
          id="oos1b-campus"
          index={2}
          eyebrow="Campus"
          title={ABOUT_CAMPUS.title}
          note="Each photograph is a doorway into the next."
        />
        <p {...srOnly}>依次走过{WALK}，最后从高处回望总部园区。</p>
      </div>

      {portal ? (
        <PortalStage />
      ) : (
        <div {...stylex.props(ui.shell)}>
          <NestedSequence />
        </div>
      )}

      <div {...stylex.props(ui.shell)}>
        <PlateIndex
          plates={plates}
          onOpen={(index) => {
            setStepped(false);
            setOpenIndex(index);
          }}
        />
      </div>

      <Lightbox
        plates={plates}
        index={openIndex}
        stepped={stepped}
        onClose={() => setOpenIndex(null)}
        onStep={(delta) => {
          setStepped(true);
          setOpenIndex((current) =>
            current === null ? null : (current + delta + plates.length) % plates.length,
          );
        }}
      />
    </section>
  );
}
