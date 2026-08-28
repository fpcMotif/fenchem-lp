import { Button, Toaster, toast } from "@fenchem-lp/ui";
import { useEffect } from "react";
import { CaptureStatic, SnapDelayed } from "./_lib/capture-static";

/* .ds-single (the preview root) is transformed, so it — not the viewport — is
 * the containing block for sonner's fixed stack. A full-width surface of a
 * fixed height puts the toast in its bottom-right corner, like a real page. */
const surface = {
  position: "relative",
  height: 420,
  padding: 20,
  border: "1px solid var(--border)",
  background: "var(--background)",
} as const;

const panel = {
  display: "flex",
  flexDirection: "column",
  gap: 10,
  padding: 16,
  width: 320,
  border: "1px solid var(--border)",
  background: "var(--card)",
} as const;

export const SpecificationSent = () => {
  /* Parent effects run after the Toaster child has subscribed, so the toast lands. */
  useEffect(() => {
    toast("Specification sent", {
      description: "ChondroActive™ TDS + CoA are on their way to r.lindqvist@company.com.",
    });
  }, []);
  return (
    <div style={surface}>
      <CaptureStatic />
      <SnapDelayed />
      <Toaster position="bottom-right" />
      <div style={panel}>
        <div style={{ fontSize: 13, fontWeight: 600 }}>ChondroActive™</div>
        <div style={{ fontSize: 11, color: "var(--muted-foreground)" }}>
          Joint health · Nutrition division
        </div>
        <Button size="sm">Request a specification</Button>
      </div>
    </div>
  );
};

export const StatusToasts = () => {
  useEffect(() => {
    toast.success("Sample request confirmed", {
      description: "100 g of Lutein 20% Beadlet ships from Nanjing in 3 business days.",
    });
    toast.error("Lot FC-LUT-240518-A unavailable", {
      description: "Reserved for another customer — we quoted the next available lot.",
    });
  }, []);
  return (
    <div style={surface}>
      <CaptureStatic />
      <SnapDelayed />
      <Toaster position="bottom-right" expand />
      <div style={panel}>
        <div style={{ fontSize: 13, fontWeight: 600 }}>Lutein 20% Beadlet</div>
        <div style={{ fontSize: 11, color: "var(--muted-foreground)" }}>
          Eye health · microencapsulated for tablets
        </div>
        <Button size="sm" variant="outline">
          Check lot availability
        </Button>
      </div>
    </div>
  );
};
