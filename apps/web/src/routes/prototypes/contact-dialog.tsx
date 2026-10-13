import { createFileRoute, notFound } from "@tanstack/react-router";

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
  const { v = 1, __state = "pristine" } = Route.useSearch();
  return <ContactDialogLab initial={v - 1} state={__state} />;
}
