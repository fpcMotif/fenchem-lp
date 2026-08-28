import {
  Button,
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
  DropdownMenuTrigger,
} from "@fenchem-lp/ui";
import { CaptureStatic } from "./_lib/capture-static";

/* The popup inherits the trigger width (w-(--anchor-width)), so the trigger is
 * sized explicitly; animation is pinned off because the capture clock is frozen. */
const trigger = { width: 260, justifyContent: "space-between" } as const;
const popup = { animation: "none", opacity: 1 } as const;

export const DivisionMenu = () => (
  <div style={{ padding: 12 }}>
    <CaptureStatic />
    <DropdownMenu open modal={false}>
      <DropdownMenuTrigger render={<Button variant="outline" style={trigger} />}>
        Nutrition division ▾
      </DropdownMenuTrigger>
      <DropdownMenuContent style={popup}>
        {/* GroupLabel needs a Group/RadioGroup ancestor or Base UI throws. */}
        <DropdownMenuGroup>
          <DropdownMenuLabel>Switch division</DropdownMenuLabel>
          <DropdownMenuItem>Nutrition</DropdownMenuItem>
          <DropdownMenuItem>Food &amp; Beverage</DropdownMenuItem>
          <DropdownMenuItem>Cosmetics</DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          All ingredients
          <DropdownMenuShortcut>⌘K</DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  </div>
);

export const CatalogFilters = () => (
  <div style={{ padding: 12 }}>
    <CaptureStatic />
    <DropdownMenu open modal={false}>
      <DropdownMenuTrigger render={<Button variant="outline" style={trigger} />}>
        Filter catalog ▾
      </DropdownMenuTrigger>
      <DropdownMenuContent style={popup}>
        <DropdownMenuGroup>
          <DropdownMenuLabel>Certifications</DropdownMenuLabel>
          <DropdownMenuCheckboxItem checked>Kosher / Halal</DropdownMenuCheckboxItem>
          <DropdownMenuCheckboxItem checked={false}>Non-GMO verified</DropdownMenuCheckboxItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuRadioGroup value="lead-time">
          <DropdownMenuLabel>Sort by</DropdownMenuLabel>
          <DropdownMenuRadioItem value="lead-time">Lead time</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="moq">Minimum order quantity</DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  </div>
);
