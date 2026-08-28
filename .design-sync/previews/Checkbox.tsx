import { Button, Checkbox, Label } from "@fenchem-lp/ui";

const row = { display: "flex", alignItems: "center", gap: 8 } as const;

export const QuotationDocuments = () => (
  <div style={{ display: "flex", flexDirection: "column", gap: 12, padding: 8, maxWidth: 380 }}>
    <div style={{ fontSize: 12, fontWeight: 600 }}>Documents to include with the quotation</div>
    <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
      <Label htmlFor="doc-coa" style={row}>
        <Checkbox id="doc-coa" defaultChecked />
        Certificate of Analysis (lot-specific)
      </Label>
      <Label htmlFor="doc-tds" style={row}>
        <Checkbox id="doc-tds" defaultChecked />
        Technical Data Sheet
      </Label>
      <Label htmlFor="doc-halal" style={row}>
        <Checkbox id="doc-halal" />
        Kosher / Halal certification
      </Label>
      <Label htmlFor="doc-stability" style={row}>
        <Checkbox id="doc-stability" />
        Accelerated stability data (24 months)
      </Label>
    </div>
  </div>
);

export const States = () => (
  <div style={{ display: "flex", flexDirection: "column", gap: 12, padding: 8, maxWidth: 380 }}>
    <Label htmlFor="st-default" style={row}>
      <Checkbox id="st-default" />
      Nutrition division
    </Label>
    <Label htmlFor="st-checked" style={row}>
      <Checkbox id="st-checked" defaultChecked />
      Cosmetics division
    </Label>
    <Label htmlFor="st-disabled" style={row}>
      <Checkbox id="st-disabled" disabled />
      Feed division — not available in EU
    </Label>
    <Label htmlFor="st-disabled-checked" style={row}>
      <Checkbox id="st-disabled-checked" disabled defaultChecked />
      Food division — locked to your account
    </Label>
    <Label htmlFor="st-invalid" style={row}>
      <Checkbox id="st-invalid" aria-invalid />
      Accept minimum order quantity (required)
    </Label>
  </div>
);

export const ComplianceConsent = () => (
  <div
    style={{
      display: "flex",
      flexDirection: "column",
      gap: 12,
      padding: 16,
      maxWidth: 420,
      border: "1px solid var(--border)",
      background: "var(--card)",
    }}
  >
    <Label htmlFor="consent-nda" style={{ alignItems: "flex-start", gap: 10, lineHeight: 1.5 }}>
      <Checkbox id="consent-nda" defaultChecked style={{ marginTop: 2 }} />
      <span>
        I confirm ChondroActive™ specifications shared here are covered by our mutual NDA and will
        not be forwarded outside my formulation team.
      </span>
    </Label>
    <div style={{ display: "flex", gap: 8 }}>
      <Button size="sm">Request a specification</Button>
      <Button size="sm" variant="ghost">
        Cancel
      </Button>
    </div>
  </div>
);
