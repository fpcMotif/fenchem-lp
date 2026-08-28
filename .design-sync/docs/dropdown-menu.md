---
category: Base UI
---
Menu overlay — DropdownMenuTrigger + DropdownMenuContent with items, checkbox/radio items, labels, separators, shortcuts, and submenus.

## Usage
```tsx
<DropdownMenu>
  <DropdownMenuTrigger render={<Button variant="outline">Regions</Button>} />
  <DropdownMenuContent>
    <DropdownMenuLabel>Distribution</DropdownMenuLabel>
    <DropdownMenuItem>North America</DropdownMenuItem>
    <DropdownMenuItem>EMEA</DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>
```
