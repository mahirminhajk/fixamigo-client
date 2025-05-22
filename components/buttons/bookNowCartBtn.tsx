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
        size="lg" // Use the large size for better hit area and prominence
        className="w-full bg-black text-white hover:bg-gray-800 font-semibold text-lg mt-3" // Kept custom styling for appearance as it's a primary CTA
        // Note: `p-4` and `rounded-[6px]` from original are slightly different from `size="lg"` defaults (h-10 px-6, rounded-md)
        // Retaining most of the specific styling like bg-black, text-lg, font-semibold, and w-full.
        // The default padding for size="lg" is px-6, py approximately (h-10 -> 40px height). Original p-4 is 16px all around.
        // For consistency with Button's defined sizes, one might create a new variant if this exact padding/rounding is reused.
        // For now, this approach keeps the established prominent look.
      >
        Book now
      </Button>
    </>
  );
};

export default BookNowCartBtn;
