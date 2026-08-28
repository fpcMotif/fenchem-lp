import { Skeleton } from "@fenchem-lp/ui";

const panel = {
  border: "1px solid var(--border)",
  background: "var(--card)",
  padding: 16,
} as const;

/* Skeleton sizes come from className in app code, but preview Tailwind classes
 * don't resolve — inline width/height guarantee visible blocks. The pulse is
 * pinned off so a frozen-clock capture never lands mid-fade. */
const block = (width: number, height: number) => ({ width, height, animation: "none" });

export const IngredientCardLoading = () => (
  <div style={{ ...panel, display: "flex", flexDirection: "column", gap: 14, width: 360 }}>
    <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
      <Skeleton className="size-12" style={block(48, 48)} />
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        <Skeleton className="h-4 w-40" style={block(160, 14)} />
        <Skeleton className="h-3 w-28" style={block(112, 10)} />
      </div>
    </div>
    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
      <Skeleton className="h-3 w-full" style={block(328, 10)} />
      <Skeleton className="h-3 w-full" style={block(328, 10)} />
      <Skeleton className="h-3 w-2/3" style={block(210, 10)} />
    </div>
    <Skeleton className="h-8 w-36" style={block(144, 32)} />
  </div>
);

export const SpecTableLoading = () => (
  <div style={{ ...panel, display: "flex", flexDirection: "column", gap: 12, width: 460 }}>
    <div style={{ display: "flex", gap: 16 }}>
      <Skeleton className="h-3 w-32" style={block(140, 10)} />
      <Skeleton className="h-3 w-20" style={block(90, 10)} />
      <Skeleton className="h-3 w-20" style={block(90, 10)} />
      <Skeleton className="h-3 w-16" style={block(70, 10)} />
    </div>
    <div style={{ height: 1, background: "var(--border)" }} />
    {[0, 1, 2, 3].map((i) => (
      <div key={i} style={{ display: "flex", gap: 16, alignItems: "center" }}>
        <Skeleton className="h-3 w-32" style={block(140, 12)} />
        <Skeleton className="h-3 w-20" style={block(90, 12)} />
        <Skeleton className="h-3 w-20" style={block(90, 12)} />
        <Skeleton className="h-3 w-16" style={block(70, 12)} />
      </div>
    ))}
  </div>
);

export const ProductGridLoading = () => (
  <div style={{ display: "flex", gap: 16, padding: 8 }}>
    {[0, 1, 2].map((i) => (
      <div
        key={i}
        style={{ ...panel, display: "flex", flexDirection: "column", gap: 10, width: 180 }}
      >
        <Skeleton className="h-24 w-full" style={block(148, 88)} />
        <Skeleton className="h-4 w-32" style={block(130, 13)} />
        <Skeleton className="h-3 w-24" style={block(96, 10)} />
        <Skeleton className="h-3 w-20" style={block(72, 10)} />
      </div>
    ))}
  </div>
);
