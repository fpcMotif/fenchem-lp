import { api } from "@fenchem-lp/backend/convex/_generated/api";
import { Button } from "@fenchem-lp/ui/components/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@fenchem-lp/ui/components/dropdown-menu";
import { colors } from "@fenchem-lp/ui/tokens.stylex";
import { convexQuery } from "@convex-dev/react-query";
import * as stylex from "@stylexjs/stylex";
import { useQuery } from "@tanstack/react-query";

import { authClient } from "@/lib/auth-client";

const styles = stylex.create({
  content: {
    backgroundColor: colors.card,
  },
});

export default function UserMenu() {
  const { data: user } = useQuery(convexQuery(api.auth.getCurrentUser, {}));

  return (
    <DropdownMenu>
      <DropdownMenuTrigger render={<Button variant="outline" />}>{user?.name}</DropdownMenuTrigger>
      <DropdownMenuContent sx={styles.content}>
        <DropdownMenuGroup>
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>{user?.email}</DropdownMenuItem>
          <DropdownMenuItem
            variant="destructive"
            onClick={() => {
              void authClient.signOut({
                fetchOptions: {
                  onSuccess: () => {
                    location.reload();
                  },
                },
              });
            }}
          >
            Sign Out
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
