import { Button } from "@/components/ui/button";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { generateAvatarImage } from "../utils/common";
import { useAuth } from "./auth";
import { forwardRef } from "react";
import { User } from "lucide-react";

const EditProfileDialog = forwardRef((props, forwardedRef) => {
  const { user } = useAuth();

  return (
    <Dialog>
      <DialogTrigger asChild>
        <DropdownMenuItem
          ref={forwardedRef}
          className="DropdownMenuItem"
          onSelect={(event) => {
            event.preventDefault();
            props.onSelect && onSelect();
          }}
        >
          <User />
          <span>Edit Profile</span>
        </DropdownMenuItem>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[480px]">
        <DialogHeader>
          <DialogTitle>Edit profile</DialogTitle>
          <p className="text-muted-foreground">
            Provide details about yourself and any other pertinent information.
          </p>
        </DialogHeader>
        <div className="space-y-6 py-4">
          <div>
            <h2 className="text-lg font-semibold mb-4">Basic Information</h2>
            <div className="space-y-4">
              <div>
                <Label>Profile photo</Label>
                <p className="text-sm text-muted-foreground">
                  Recommended 300 x 300
                </p>
                <div className="flex items-center gap-4 mt-2">
                  <img
                    src={generateAvatarImage(user.key)}
                    alt="Profile"
                    className="w-16 h-16 rounded-full object-cover"
                  />
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      Change
                    </Button>
                    <Button variant="outline" size="sm">
                      Remove
                    </Button>
                  </div>
                </div>
              </div>

              <div>
                <Label htmlFor="fullName">Full name</Label>
                <Input id="fullName" className="mt-2" />
              </div>

              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={user?.email || ""}
                  className="mt-2 bg-muted"
                  disabled
                />
              </div>

              <div>
                <Label htmlFor="headline">Headline</Label>
                <Input placeholder="Designer" id="headline" className="mt-2" />
              </div>

              <div>
                <Label htmlFor="bio">Bio</Label>
                <Textarea
                  id="bio"
                  placeholder="Example: Hey everyone! I'm a designer and blogger. I love to hike, ski, and travel."
                  className="mt-2 h-24"
                />
                <p className="text-sm text-muted-foreground mt-1">
                  Brief description for your profile. URLs are hyperlinked.
                </p>
              </div>
            </div>
          </div>

          <Button className="w-full">Save</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
});

export default EditProfileDialog;
