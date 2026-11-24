import { createFileRoute, notFound } from "@tanstack/solid-router";

import { TasteCanvas } from "@/components/prototype/taste-canvas/canvas";
import { ITEMS } from "@/components/prototype/taste-canvas/examples";

export const Route = createFileRoute("/prototypes/taste-canvas")({
  beforeLoad: () => {
    if (!import.meta.env.DEV) throw notFound();
  },
  component: TasteCanvasRoute,
});

function TasteCanvasRoute() {
  return <TasteCanvas items={ITEMS} label="Culture canvas" />;
}
