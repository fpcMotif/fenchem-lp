import { createFileRoute, notFound } from "@tanstack/react-router";

import {
  BookmarkRailLab,
  type RailLabVariant,
} from "@/components/prototype/bookmark-rail-lab/harness";
import {
  CenteredVariant,
  EdgeVariant,
  GutterVariant,
  LooseVariant,
} from "@/components/prototype/bookmark-rail-lab/variants";

const VARIANTS: RailLabVariant[] = [
  { name: "Centered", Component: CenteredVariant },
  { name: "Edge", Component: EdgeVariant },
  { name: "Gutter", Component: GutterVariant },
  { name: "Loose", Component: LooseVariant },
];

const positiveInt = (value: unknown) => {
  const number = Number(value);
  return Number.isInteger(number) && number > 0 ? number : undefined;
};

export const Route = createFileRoute("/prototypes/bookmark-rail")({
  validateSearch: (search: { v?: unknown }): { v?: number } => ({ v: positiveInt(search.v) }),
  beforeLoad: () => {
    if (!import.meta.env.DEV) throw notFound();
  },
  component: BookmarkRailLabRoute,
});

function BookmarkRailLabRoute() {
  const { v = 1 } = Route.useSearch();
  const navigate = Route.useNavigate();
  return (
    <BookmarkRailLab
      variants={VARIANTS}
      initial={v - 1}
      onVariantChange={(next) =>
        navigate({
          search: (previous) => ({ ...previous, v: next }),
          replace: true,
          resetScroll: false,
        })
      }
    />
  );
}
