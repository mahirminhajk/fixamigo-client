"use client";

import { useHydratedStore } from "@/hooks/useHydratedStore";
import { useUserStore } from "@/stores/userStore";
import { Coins, User, UserRoundCheckIcon } from "lucide-react";
// Removed SheetTrigger; using global auth hook
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useAuthSheet } from "@/hooks/useAuthSheet";
import api from "@/lib/axiosInstance";
import { useWalletStore } from "@/stores/walletStore";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

import { Button } from "@/components/ui/button"; // Import Button

const ProfileBtn = () => {
  //* user-store
  const clearUser = useUserStore((state) => state.clearUser);
  const walletBalance = useHydratedStore(
    useWalletStore,
    (state) => state.balance
  );
  const fetchWalletBalance = useWalletStore((state) => state.fetchBalance);
  const clearWallet = useWalletStore((state) => state.clearWallet);

  const { openAuth } = useAuthSheet();

  const router = useRouter();

  const onCompleted = () => {};

  const onSignOut = async () => {
    await api.post("/auth/logout", {});
    clearUser();
    clearWallet();
  };

  const navigateToOrders = () => {
    router.push("/my-services");
  };

  const user = useHydratedStore(useUserStore, (state) => state.user);
  useEffect(() => {
    if (user?._id && !walletBalance) {
      fetchWalletBalance();
    }
  }, [user?._id, walletBalance, fetchWalletBalance]);
  return (
    <div>
      {user?._id ? (
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              aria-label="Open user profile menu"
            >
              <UserRoundCheckIcon className="size-6" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-60">
            {" "}
            {/* Adjusted width slightly */}
            <div>
              <div className="flex flex-col space-y-1 p-2 border-b mb-2">
                {" "}
                {/* Reduced padding, added border */}
                <h4 className="text-sm font-semibold">{user.name}</h4>
                <p className="text-xs text-muted-foreground">
                  {" "}
                  {/* Slightly smaller text for phone */}
                  {user.phoneNo}
                </p>
              </div>
              {/* Fixcoin Wallet summary */}
              <Link
                href="/wallet"
                className="flex items-center justify-between p-2 rounded-lg bg-blue-50 hover:bg-blue-100 transition-colors border border-blue-100 mb-2"
                title="View Fixcoin wallet"
              >
                <div className="flex items-center gap-2">
                  <Coins className="w-4 h-4 text-blue-600" />
                  <div className="flex flex-col leading-tight">
                    <span className="text-xs text-blue-700">Fixcoin Wallet</span>
                    <span className="text-sm font-semibold text-blue-900">
                      {(walletBalance?.available ?? 0).toLocaleString()} Fixcoins
                    </span>
                  </div>
                </div>
                <span className="text-xs font-medium text-blue-700 underline">View</span>
              </Link>
              <div className="flex flex-col space-y-1">
                <Button
                  variant="ghost"
                  size="sm"
                  className="w-full justify-start"
                  onClick={navigateToOrders}
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
        <Button
          variant="ghost"
          size="icon"
          aria-label="Open login menu"
          onClick={() => openAuth({ onCompleted })}
        >
          <User className="size-6" />
        </Button>
      )}
    </div>
  );
};

export default ProfileBtn;
