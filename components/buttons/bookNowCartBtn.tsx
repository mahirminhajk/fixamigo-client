"use client";
import UserRegSheet from "../sheets/userRegSheet";
import { Button } from "@/components/ui/button";
import { Sheet } from "@/components/ui/sheet";
import { useHydratedStore } from "@/hooks/useHydratedStore";
import { useUserStore } from "@/stores/userStore";
import { useState } from "react";
import { useRouter } from "next/navigation";

const BookNowCartBtn = () => {
  //* router
  const router = useRouter();

  //* user-store
  const user = useHydratedStore(useUserStore, (state) => state.user);

  //* sheet
  const [open, setOpen] = useState(false);
  const onOpenChange = () => setOpen(!open);

  const onCompleted = () => {
    setOpen(false);
    router.push("/repair/checkout");
  };

  //* book-now btn
  const onClick = () => {
    if (!user?._id) {
      setOpen(true);
    } else {
      router.push("/repair/checkout");
    }
  };

  //* save hydration error
  if (!user) return null;

  return (
    <>
      <Sheet open={open} onOpenChange={onOpenChange}>
        <UserRegSheet onCompleted={onCompleted} />
      </Sheet>
      <Button
        onClick={onClick}
        className="w-full bg-black text-white hover:bg-gray-800 font-semibold p-4 mt-3 rounded-[6px] text-lg"
      >
        Book now
      </Button>
    </>
  );
};

export default BookNowCartBtn;
