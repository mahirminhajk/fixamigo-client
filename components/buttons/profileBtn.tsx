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
      {user ? (
        <Popover>
          <PopoverTrigger asChild>
            <UserRoundCheckIcon className="w-6 h-6 cursor-pointer" />
          </PopoverTrigger>
          <PopoverContent className="w-80">
            <div>
              <div className="flex flex-col space-y-4 p-4">
                <div className="space-y-1">
                  <h4 className="text-sm font-semibold">{user.name}</h4>
                  <p className="text-sm text-muted-foreground">
                    {user.phoneNo}
                  </p>
                </div>
              </div>
              <div className="flex flex-col space-y-1">
                <button className="text-sm text-left hover:bg-accent hover:text-accent-foreground rounded-md p-2">
                  My Orders
                </button>
                <button
                  className="text-sm text-left text-red-500 hover:bg-red-50 rounded-md p-2"
                  onClick={onSignOut}
                >
                  Sign Out
                </button>
              </div>
            </div>
          </PopoverContent>
        </Popover>
      ) : (
        <Sheet open={open} onOpenChange={onOpenChange}>
          <SheetTrigger>
            <div className="pt-1">
              <User className="cursor-pointer" />
            </div>
          </SheetTrigger>
          <UserRegSheet onCompleted={onCompleted} />
        </Sheet>
      )}
    </div>
  );
};

export default ProfileBtn;
