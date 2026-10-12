import { createFileRoute, notFound } from "@tanstack/react-router";

import { ContactDialogLab } from "@/components/prototype/contact-dialog-lab/harness";

export const Route = createFileRoute("/prototypes/contact-dialog")({
  beforeLoad: () => {
    if (!import.meta.env.DEV) throw notFound();
  },
  validateSearch: (search: { v?: unknown }): { v?: number } => {
    const v = Number(search.v);
    return { v: Number.isInteger(v) && v > 0 ? v : undefined };
  },
  component: ContactDialogLabRoute,
});

function ContactDialogLabRoute() {
  const { v = 1 } = Route.useSearch();
  return <ContactDialogLab initial={v - 1} />;
}
