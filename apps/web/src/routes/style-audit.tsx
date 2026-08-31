import { Button } from "@fenchem-lp/ui/components/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@fenchem-lp/ui/components/card";
import { Checkbox } from "@fenchem-lp/ui/components/checkbox";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@fenchem-lp/ui/components/dropdown-menu";
import { Input } from "@fenchem-lp/ui/components/input";
import { Label } from "@fenchem-lp/ui/components/label";
import { Skeleton } from "@fenchem-lp/ui/components/skeleton";
import { breakpoints, colors, radii, typography } from "@fenchem-lp/ui/tokens.stylex";
import * as stylex from "@stylexjs/stylex";
import { createFileRoute } from "@tanstack/react-router";
import { ArrowRight, ChevronRight, Download, Mail, Plus, Trash2 } from "lucide-react";
import * as React from "react";

export const Route = createFileRoute("/style-audit")({
  component: StyleAuditComponent,
});

const auditStyles = stylex.create({
  page: {
    minHeight: "100vh",
    backgroundColor: colors.background,
    color: colors.foreground,
    padding: "2rem",
    display: "flex",
    flexDirection: "column",
    gap: "3rem",
    fontFamily: typography.body,
  },
  header: {
    borderBottomWidth: 1,
    borderBottomStyle: "solid",
    borderBottomColor: colors.border,
    paddingBottom: "1rem",
  },
  title: {
    fontSize: "1.5rem",
    fontWeight: 700,
    margin: 0,
  },
  desc: {
    fontSize: "0.875rem",
    color: colors.mutedForeground,
    margin: 0,
    marginTop: "0.25rem",
  },
  matrixGrid: {
    display: "grid",
    gridTemplateColumns: {
      default: "1fr",
      [breakpoints.xl]: "1fr 1fr",
    },
    gap: "2rem",
  },
  panel: {
    padding: "1.5rem",
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: colors.border,
    backgroundColor: colors.background,
    color: colors.foreground,
    display: "flex",
    flexDirection: "column",
    gap: "2rem",
    borderRadius: radii.none,
  },
  panelTitle: {
    fontSize: "1.125rem",
    fontWeight: 600,
    borderBottomWidth: 1,
    borderBottomStyle: "solid",
    borderBottomColor: colors.border,
    paddingBottom: "0.5rem",
    margin: 0,
  },
  section: {
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
  },
  sectionTitle: {
    fontSize: "0.875rem",
    fontWeight: 600,
    textTransform: "uppercase",
    letterSpacing: "0.05em",
    color: colors.mutedForeground,
    margin: 0,
  },
  flexRow: {
    display: "flex",
    flexWrap: "wrap",
    gap: "0.5rem",
    alignItems: "center",
  },
  flexRowGap6: {
    display: "flex",
    flexWrap: "wrap",
    gap: "1.5rem",
    alignItems: "center",
  },
  formGrid: {
    display: "grid",
    gridTemplateColumns: {
      default: "1fr",
      [breakpoints.sm]: "1fr 1fr",
    },
    gap: "1rem",
  },
  formField: {
    display: "flex",
    flexDirection: "column",
    gap: "0.375rem",
  },
  fieldRow: {
    display: "flex",
    alignItems: "center",
    gap: "0.5rem",
  },
  skeletonLine: {
    height: "1rem",
    width: "250px",
  },
  skeletonBlock: {
    height: "2rem",
    width: "100%",
  },
  skeletonCircle: {
    height: "2.5rem",
    width: "2.5rem",
    borderRadius: "9999px",
  },
  skeletonSmall1: {
    height: "0.75rem",
    width: "150px",
  },
  skeletonSmall2: {
    height: "0.75rem",
    width: "100px",
  },
  footerText: {
    fontSize: "0.75rem",
    color: colors.mutedForeground,
  },
  footerEnd: {
    justifyContent: "space-between",
  },
});

function StyleAuditComponent() {
  const [checked, setChecked] = React.useState(true);
  const [radioVal, setRadioVal] = React.useState("option1");

  return (
    <div {...stylex.props(auditStyles.page)}>
      <header {...stylex.props(auditStyles.header)}>
        <h1 {...stylex.props(auditStyles.title)}>Design System Style Audit Matrix</h1>
        <p {...stylex.props(auditStyles.desc)}>
          Visual verification and computed-style comparison matrix for UI primitives in light & dark
          polarity.
        </p>
      </header>

      {/* Light & Dark Matrix side-by-side or stacked */}
      <div {...stylex.props(auditStyles.matrixGrid)}>
        {/* Light Polarity */}
        <div id="audit-light" {...stylex.props(auditStyles.panel)}>
          <h2 {...stylex.props(auditStyles.panelTitle)}>Light Theme Polarity</h2>
          <ComponentMatrix
            checked={checked}
            setChecked={setChecked}
            radioVal={radioVal}
            setRadioVal={setRadioVal}
          />
        </div>

        {/* Dark Polarity */}
        <div id="audit-dark" className="dark" {...stylex.props(auditStyles.panel)}>
          <h2 {...stylex.props(auditStyles.panelTitle)}>Dark Theme Polarity</h2>
          <ComponentMatrix
            checked={checked}
            setChecked={setChecked}
            radioVal={radioVal}
            setRadioVal={setRadioVal}
          />
        </div>
      </div>
    </div>
  );
}

function ComponentMatrix({
  checked,
  setChecked,
  radioVal,
  setRadioVal,
}: {
  checked: boolean;
  setChecked: (v: boolean) => void;
  radioVal: string;
  setRadioVal: (v: string) => void;
}) {
  const variants = ["default", "outline", "secondary", "ghost", "destructive", "link"] as const;
  const sizes = ["xs", "sm", "default", "lg", "icon-xs", "icon-sm", "icon", "icon-lg"] as const;

  return (
    <div {...stylex.props(auditStyles.section)}>
      {/* Buttons */}
      <section {...stylex.props(auditStyles.section)}>
        <h3 {...stylex.props(auditStyles.sectionTitle)}>1. Buttons</h3>
        <div {...stylex.props(auditStyles.flexRow)}>
          {variants.map((v) => (
            <Button key={v} variant={v} id={`btn-variant-${v}`}>
              {v.toUpperCase()}
            </Button>
          ))}
          <Button disabled id="btn-disabled">
            Disabled
          </Button>
          <Button id="btn-with-icon">
            <Mail size={16} data-icon="inline-start" />
            With Icon
            <ArrowRight size={16} data-icon="inline-end" />
          </Button>
        </div>

        <div {...stylex.props(auditStyles.flexRow)}>
          {sizes.map((s) => (
            <Button key={s} size={s} variant="outline" id={`btn-size-${s}`}>
              {s.includes("icon") ? <Plus size={16} /> : s}
            </Button>
          ))}
        </div>
      </section>

      {/* Inputs & Labels */}
      <section {...stylex.props(auditStyles.section)}>
        <h3 {...stylex.props(auditStyles.sectionTitle)}>2. Inputs & Labels</h3>
        <div {...stylex.props(auditStyles.formGrid)}>
          <div {...stylex.props(auditStyles.formField)}>
            <Label htmlFor="input-default">Default Input</Label>
            <Input id="input-default" placeholder="Enter text..." />
          </div>
          <div {...stylex.props(auditStyles.formField)}>
            <Label htmlFor="input-disabled">Disabled Input</Label>
            <Input id="input-disabled" disabled placeholder="Disabled field" />
          </div>
          <div {...stylex.props(auditStyles.formField)}>
            <Label htmlFor="input-invalid">Invalid State</Label>
            <Input id="input-invalid" aria-invalid="true" defaultValue="invalid@value" />
          </div>
          <div {...stylex.props(auditStyles.formField)}>
            <Label htmlFor="input-file">File Input</Label>
            <Input id="input-file" type="file" />
          </div>
        </div>
      </section>

      {/* Checkboxes */}
      <section {...stylex.props(auditStyles.section)}>
        <h3 {...stylex.props(auditStyles.sectionTitle)}>3. Checkboxes</h3>
        <div {...stylex.props(auditStyles.flexRowGap6)}>
          <div {...stylex.props(auditStyles.fieldRow)}>
            <Checkbox
              id="chk-default"
              checked={checked}
              onCheckedChange={(c) => setChecked(Boolean(c))}
            />
            <Label htmlFor="chk-default">Interactive ({checked ? "Checked" : "Unchecked"})</Label>
          </div>
          <div {...stylex.props(auditStyles.fieldRow)}>
            <Checkbox id="chk-unchecked" checked={false} />
            <Label htmlFor="chk-unchecked">Unchecked</Label>
          </div>
          <div {...stylex.props(auditStyles.fieldRow)}>
            <Checkbox id="chk-disabled" disabled checked={true} />
            <Label htmlFor="chk-disabled">Disabled Checked</Label>
          </div>
          <div {...stylex.props(auditStyles.fieldRow)}>
            <Checkbox id="chk-invalid" aria-invalid="true" checked={false} />
            <Label htmlFor="chk-invalid">Aria Invalid</Label>
          </div>
        </div>
      </section>

      {/* Cards */}
      <section {...stylex.props(auditStyles.section)}>
        <h3 {...stylex.props(auditStyles.sectionTitle)}>4. Cards</h3>
        <div {...stylex.props(auditStyles.formGrid)}>
          <Card id="card-default">
            <CardHeader>
              <CardTitle>Standard Card Title</CardTitle>
              <CardDescription>A descriptive subtitle for this card component.</CardDescription>
              <CardAction>
                <Button size="icon-xs" variant="ghost">
                  <Download size={12} />
                </Button>
              </CardAction>
            </CardHeader>
            <CardContent>
              <p {...stylex.props(auditStyles.footerText)}>
                Card content body demonstrating typography and padding behavior under standard size.
              </p>
            </CardContent>
            <CardFooter sx={auditStyles.footerEnd}>
              <span {...stylex.props(auditStyles.footerText)}>Card footer</span>
              <Button size="sm">Action</Button>
            </CardFooter>
          </Card>

          <Card size="sm" id="card-sm">
            <CardHeader>
              <CardTitle>Compact Card (size="sm")</CardTitle>
              <CardDescription>Smaller margins and tighter text rhythm.</CardDescription>
            </CardHeader>
            <CardContent>
              <p {...stylex.props(auditStyles.footerText)}>Compact layout content area.</p>
            </CardContent>
            <CardFooter>
              <Button size="xs" variant="outline">
                Small Action
              </Button>
            </CardFooter>
          </Card>
        </div>
      </section>

      {/* Skeleton */}
      <section {...stylex.props(auditStyles.section)}>
        <h3 {...stylex.props(auditStyles.sectionTitle)}>5. Skeleton</h3>
        <div {...stylex.props(auditStyles.section)}>
          <Skeleton sx={auditStyles.skeletonLine} id="skel-line" />
          <Skeleton sx={auditStyles.skeletonBlock} id="skel-block" />
          <div {...stylex.props(auditStyles.fieldRow)}>
            <Skeleton sx={auditStyles.skeletonCircle} id="skel-circle" />
            <div {...stylex.props(auditStyles.formField)}>
              <Skeleton sx={auditStyles.skeletonSmall1} />
              <Skeleton sx={auditStyles.skeletonSmall2} />
            </div>
          </div>
        </div>
      </section>

      {/* Dropdown Menu */}
      <section {...stylex.props(auditStyles.section)}>
        <h3 {...stylex.props(auditStyles.sectionTitle)}>6. Dropdown Menu</h3>
        <div {...stylex.props(auditStyles.flexRow)}>
          <DropdownMenu>
            <DropdownMenuTrigger
              render={
                <Button variant="outline" id="dd-trigger">
                  Open Menu <ChevronRight size={16} />
                </Button>
              }
            />
            <DropdownMenuContent id="dd-content" align="start">
              <DropdownMenuLabel>Account Actions</DropdownMenuLabel>
              <DropdownMenuItem>
                Profile <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
              </DropdownMenuItem>
              <DropdownMenuItem>
                Billing <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuLabel>Preferences</DropdownMenuLabel>
                <DropdownMenuCheckboxItem
                  checked={checked}
                  onCheckedChange={(c) => setChecked(Boolean(c))}
                >
                  Enable Notifications
                </DropdownMenuCheckboxItem>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuSub>
                <DropdownMenuSubTrigger>More Options</DropdownMenuSubTrigger>
                <DropdownMenuSubContent>
                  <DropdownMenuRadioGroup value={radioVal} onValueChange={setRadioVal}>
                    <DropdownMenuRadioItem value="option1">Option 1</DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value="option2">Option 2</DropdownMenuRadioItem>
                  </DropdownMenuRadioGroup>
                </DropdownMenuSubContent>
              </DropdownMenuSub>
              <DropdownMenuSeparator />
              <DropdownMenuItem variant="destructive">
                <Trash2 size={16} /> Delete Account
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </section>
    </div>
  );
}
