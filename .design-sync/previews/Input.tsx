import { Button, Checkbox, Input, Label } from "@fenchem-lp/ui";

const field = { display: "flex", flexDirection: "column", gap: 6 } as const;

export const LabeledFields = () => (
  <div style={{ display: "flex", flexDirection: "column", gap: 14, padding: 8, width: 340 }}>
    <div style={field}>
      <Label htmlFor="in-company">Company</Label>
      <Input id="in-company" placeholder="Nordic Nutraceuticals AB" />
    </div>
    <div style={field}>
      <Label htmlFor="in-email">Work email</Label>
      <Input id="in-email" type="email" placeholder="r.lindqvist@company.com" />
    </div>
    <div style={field}>
      <Label htmlFor="in-volume">Annual volume (kg)</Label>
      <Input id="in-volume" type="number" defaultValue="2500" />
    </div>
  </div>
);

export const States = () => (
  <div style={{ display: "flex", flexDirection: "column", gap: 14, padding: 8, width: 340 }}>
    <div style={field}>
      <Label htmlFor="st-placeholder">Placeholder</Label>
      <Input id="st-placeholder" placeholder="Search ingredients, e.g. Lutein" />
    </div>
    <div style={field}>
      <Label htmlFor="st-filled">Filled</Label>
      <Input id="st-filled" defaultValue="Lutein 20% Beadlet" />
    </div>
    <div style={field}>
      <Label htmlFor="st-disabled">Disabled</Label>
      <Input id="st-disabled" disabled defaultValue="CAS 127-40-2" />
    </div>
    <div style={field}>
      <Label htmlFor="st-invalid">Invalid</Label>
      <Input id="st-invalid" aria-invalid defaultValue="not-an-email" />
      <span style={{ fontSize: 11, color: "var(--destructive)" }}>
        Enter a work email so we can attach the specification.
      </span>
    </div>
  </div>
);

export const SampleRequestForm = () => (
  <div
    style={{
      display: "flex",
      flexDirection: "column",
      gap: 14,
      padding: 16,
      width: 380,
      border: "1px solid var(--border)",
      background: "var(--card)",
    }}
  >
    <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
      <div style={{ fontSize: 13, fontWeight: 600 }}>Request a sample</div>
      <div style={{ fontSize: 11, color: "var(--muted-foreground)" }}>
        ChondroActive™ collagen peptide · 100 g pilot quantity
      </div>
    </div>
    <div style={field}>
      <Label htmlFor="sr-email">Work email</Label>
      <Input id="sr-email" type="email" placeholder="you@company.com" />
    </div>
    <div style={field}>
      <Label htmlFor="sr-app">Application</Label>
      <Input id="sr-app" defaultValue="Joint health · tablet" />
    </div>
    <Label htmlFor="sr-tds" style={{ display: "flex", alignItems: "center", gap: 8 }}>
      <Checkbox id="sr-tds" defaultChecked />
      Include the Technical Data Sheet
    </Label>
    <Button size="sm">Request a specification</Button>
  </div>
);
