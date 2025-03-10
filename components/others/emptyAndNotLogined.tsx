"use client";
import { useUserStore } from "@/stores/userStore";
import { useRouter } from "next/navigation";

import UserRegSheet from "../sheets/userRegSheet";
import { Sheet, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";

interface EmptyAndNotLoginedProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  showAuth?: boolean; // Optionally show the Sign-in button
  showAction?: boolean; // Optionally show the Continue shopping button
  actionText?: string;
  actionLink?: string;
}

const EmptyAndNotLogined = ({
  icon,
  title,
  description,
  showAuth = false,
  showAction = true,
  actionText = "Continue shopping",
  actionLink = "/",
}: EmptyAndNotLoginedProps) => {
  const isLogged = useUserStore((state) => state.isLogged);

  const router = useRouter();

  return (
    <div className="flex flex-col justify-center items-center h-[80vh] w-full">
      <div className="flex flex-col items-center justify-center space-y-4 text-center h-full">
        <div className="text-7xl text-black">{icon}</div>
        <h2 className="text-xl font-semibold">{title}</h2>
        <p className="text-gray-500 text-sm px-6">{description}</p>
        <div className="space-y-2 w-full max-w-xs">
          {showAuth && !isLogged() && (
            <Sheet>
              <SheetTrigger asChild>
                <Button className="w-full bg-black text-white rounded-[6px]">
                  Sign in
                </Button>
              </SheetTrigger>
              <UserRegSheet />
            </Sheet>
          )}
          {showAction && (
            <Button
              variant="outline"
              className="w-full rounded-[6px] hover:bg-gray-100"
              onClick={() => router.push(actionLink)}
            >
              {actionText}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default EmptyAndNotLogined;

{
  /* <div className="jucstify-center items-center h-[80vh] w-full">
<div className="flex flex-col justify-center items-center h-full w-full">
  <div className="flex flex-col items-center justify-center space-y-4 text-center h-full ">
    <BsCart2 className="text-6xl text-black-300" />
    <h2 className="text-xl font-semibold">Your Cart is Empty</h2>
    <p className="text-gray-500 text-sm px-6">
      Sign in to view your saved items or start adding new favorites❤️.
    </p>
    <div className="space-y-2 w-full max-w-xs">
      {!isLogged() && (
        <Sheet>
          <SheetTrigger asChild>
            <Button className="w-full bg-black text-white rounded-[6px]">
              Sign in
            </Button>
          </SheetTrigger>
          <UserRegSheet />
        </Sheet>
      )}
      <Button
        variant="outline"
        className="w-full rounded-[6px] hover:bg-gray-100"
        onClick={() => router.push("/repair/mobile-phone")}
      >
        Continue shopping
      </Button>
    </div>
  </div>
</div>
</div> */
}
