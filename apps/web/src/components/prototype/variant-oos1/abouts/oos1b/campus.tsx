import * as stylex from "@stylexjs/stylex";

import { useLightbox } from "@/components/prototype/shared/lightbox";

import { ABOUT_CAMPUS } from "../../about-data";
import { INDEX_PLATES_VISITED_THEN_UNVISITED, ROOMS_IN_WALKING_ORDER } from "./journey";
import { Lightbox } from "./lightbox";
import { NestedSequence } from "./nested-sequence";
import { PlateIndex } from "./plate-index";
import { PortalStage } from "./portal-stage";
import { SectionHead, useMediaQuery } from "./shared";
import { srOnly, ui } from "./shared-values";

const PORTAL_QUERY = "(min-width: 1024px) and (prefers-reduced-motion: no-preference)";
const WALK = ROOMS_IN_WALKING_ORDER.map((room) => room.plate.english).join(", ");

export function Campus() {
  const portal = useMediaQuery(PORTAL_QUERY);
  const plates = INDEX_PLATES_VISITED_THEN_UNVISITED;
  const lightbox = useLightbox(plates.length);

  return (
    <section
      id="about-campus"
      aria-labelledby="oos1b-campus"
      {...stylex.attrs(ui.anchor, ui.section)}
    >
      <div {...stylex.attrs(ui.shell)}>
        <SectionHead
          id="oos1b-campus"
          index={2}
          eyebrow="Campus"
          title={ABOUT_CAMPUS.title}
          note="Each photograph is a doorway into the next."
        />
        <p {...srOnly}>
          Walk through in order: {WALK}, then look back at the headquarters from above.
        </p>
      </div>

      {portal() ? (
        <PortalStage />
      ) : (
        <div {...stylex.attrs(ui.shell)}>
          <NestedSequence />
        </div>
      )}

      <div {...stylex.attrs(ui.shell)}>
        <PlateIndex plates={plates} onOpen={lightbox.open} />
      </div>

      <Lightbox lightbox={lightbox} plates={plates} />
    </section>
  );
}
