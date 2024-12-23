import { User, LogOut, Ticket, Wallet, Coins } from "lucide-react";
import { signOut } from "@junobuild/core"; // Add signOut import
import { useAuth } from "./auth";
import { generateAvatarImage } from "../utils/common";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuShortcut,
} from "@/components/ui/dropdown-menu";
import { Link } from "react-router";
import EditProfileDialog from "./edit-profile-dialog";
import { Button } from "./ui/button";

const UserDropdownMenu = () => {
  const { user } = useAuth();

  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <img
            src={generateAvatarImage(user.key)}
            className="rounded-lg h-8 w-8 bg-slate-500 select-none cursor-pointer"
          />
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56 left-0">
          <DropdownMenuLabel>My Account Balance</DropdownMenuLabel>
          {/* <DropdownMenuSeparator /> */}
          {/* <DropdownMenuLabel>Balance</DropdownMenuLabel> */}
          <DropdownMenuGroup>
            <DropdownMenuItem>
              59.78 ICP
              <DropdownMenuShortcut className="flex gap-2">
                <Button size="sm" variant="ghost">
                  <Wallet />
                  Withdraw
                </Button>
              </DropdownMenuShortcut>
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuGroup></DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <EditProfileDialog />
            <Link to="/my-event">
              <DropdownMenuItem>
                <Ticket />
                <span>My Events</span>
              </DropdownMenuItem>
            </Link>
            <DropdownMenuItem onClick={signOut}>
              <LogOut />
              <span>Sign out</span>
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default UserDropdownMenu;
