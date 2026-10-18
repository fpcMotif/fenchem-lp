import { createFileRoute, notFound } from "@tanstack/solid-router";

import { ContactDialogLab } from "@/components/prototype/contact-dialog-lab/harness";

export const Route = createFileRoute("/prototypes/contact-dialog")({
  validateSearch: (search: {
    v?: unknown;
    __state?: unknown;
  }): { v?: number; __state?: string } => {
    const v = Number(search.v);
    return {
      v: Number.isInteger(v) && v > 0 ? v : undefined,
      __state: typeof search.__state === "string" ? search.__state : undefined,
    };
  },
  beforeLoad: () => {
    if (!import.meta.env.DEV) throw notFound();
  },
  component: ContactDialogLabRoute,
});

function ContactDialogLabRoute() {
  const search = Route.useSearch();
  return (
    <ContactDialogLab initial={(search().v ?? 1) - 1} state={search().__state ?? "pristine"} />
  );
}
