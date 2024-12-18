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
import { Link } from "react-router";
import EditProfileDialog from "./edit-profile-dialog";

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
