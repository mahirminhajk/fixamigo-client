"use client";

import { useHydratedStore } from "@/hooks/useHydratedStore";
import { useUserStore } from "@/stores/userStore";
import { User, UserRoundCheckIcon } from "lucide-react";
import { Sheet, SheetTrigger } from "@/components/ui/sheet";
import UserRegSheet from "../sheets/userRegSheet";

const ProfileBtn = () => {
  const user = useHydratedStore(useUserStore, (state) => state.user);

  return (
    <div>
      {user ? (
        <UserRoundCheckIcon className="w-6 h-6 cursor-pointer" />
      ) : (
        <Sheet>
          <SheetTrigger>
            <div className="pt-1">
              <User className="cursor-pointer" />
            </div>
          </SheetTrigger>
          <UserRegSheet />
        </Sheet>
      )}
    </div>
  );
};

export default ProfileBtn;
