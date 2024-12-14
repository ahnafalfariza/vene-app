import { User, LogOut, Ticket } from "lucide-react";
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
} from "@/components/ui/dropdown-menu";

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
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem>
              <User />
              <span>Edit Profile</span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Ticket />
              <span>My Events</span>
            </DropdownMenuItem>
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
