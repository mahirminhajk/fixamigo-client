"use client";

import { useHydratedStore } from "@/hooks/useHydratedStore";
import { useUserStore } from "@/stores/userStore";
import { User, UserRoundCheckIcon } from "lucide-react";
import { Sheet, SheetTrigger } from "@/components/ui/sheet";
import UserRegSheet from "../sheets/userRegSheet";
import { useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import api from "@/lib/axiosInstance";

import { Button } from "@/components/ui/button"; // Import Button

const ProfileBtn = () => {
  //* user-store
  const clearUser = useUserStore((state) => state.clearUser);

  const [open, setOpen] = useState(false);
  const onOpenChange = () => setOpen(!open);

  const onCompleted = () => {
    setOpen(false);
  };

  const onSignOut = async () => {
    await api.post("/auth/logout", {});
    clearUser();
  };

  const user = useHydratedStore(useUserStore, (state) => state.user);
  return (
    <div>
      {user?._id ? (
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="ghost" size="icon" aria-label="Open user profile menu">
              <UserRoundCheckIcon className="size-6" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-60"> {/* Adjusted width slightly */}
            <div>
              <div className="flex flex-col space-y-1 p-2 border-b mb-2"> {/* Reduced padding, added border */}
                <h4 className="text-sm font-semibold">{user.name}</h4>
                <p className="text-xs text-muted-foreground"> {/* Slightly smaller text for phone */}
                  {user.phoneNo}
                </p>
              </div>
              <div className="flex flex-col space-y-1">
                <Button
                  variant="ghost"
                  size="sm"
                  className="w-full justify-start"
                  // onClick={() => {/* TODO: Implement navigation to My Orders */}}
                >
                  My Orders
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="w-full justify-start text-red-500 hover:text-red-500 hover:bg-red-50"
                  onClick={onSignOut}
                >
                  Sign Out
                </Button>
              </div>
            </div>
          </PopoverContent>
        </Popover>
      ) : (
        <Sheet open={open} onOpenChange={onOpenChange}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" aria-label="Open login menu">
              {/* Removed pt-1 as Button size="icon" handles centering */}
              <User className="size-6" /> 
            </Button>
          </SheetTrigger>
          <UserRegSheet onCompleted={onCompleted} />
        </Sheet>
      )}
    </div>
  );
};

export default ProfileBtn;
