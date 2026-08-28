import { Checkbox, Input, Label } from "@fenchem-lp/ui";

const field = { display: "flex", flexDirection: "column", gap: 6 } as const;

export const FieldLabels = () => (
  <div style={{ display: "flex", flexDirection: "column", gap: 14, padding: 8, width: 340 }}>
    <div style={field}>
      <Label htmlFor="lb-inci">INCI name</Label>
      <Input id="lb-inci" defaultValue="Bakuchiol" />
    </div>
    <div style={field}>
      <Label htmlFor="lb-purity">
        Assay / purity
        <span style={{ color: "var(--destructive)" }}>*</span>
      </Label>
      <Input id="lb-purity" placeholder="≥ 99.0% by HPLC" />
      <span style={{ fontSize: 11, color: "var(--muted-foreground)" }}>
        Stated on every lot-specific Certificate of Analysis.
      </span>
    </div>
  </div>
);

export const WithCheckbox = () => (
  <div style={{ display: "flex", flexDirection: "column", gap: 12, padding: 8, maxWidth: 380 }}>
    <Label htmlFor="lb-eu" style={{ display: "flex", alignItems: "center", gap: 8 }}>
      <Checkbox id="lb-eu" defaultChecked />
      EU Novel Food dossier available
    </Label>
    <Label htmlFor="lb-nonGmo" style={{ display: "flex", alignItems: "center", gap: 8 }}>
      <Checkbox id="lb-nonGmo" />
      Non-GMO Project verified supply chain
    </Label>
  </div>
);

export const DisabledField = () => (
  <div
    className="group"
    data-disabled="true"
    style={{ display: "flex", flexDirection: "column", gap: 6, padding: 8, width: 340 }}
  >
    <Label htmlFor="lb-locked">Batch number (assigned at dispatch)</Label>
    <Input id="lb-locked" disabled defaultValue="FC-LUT-240518-A" />
  </div>
);
