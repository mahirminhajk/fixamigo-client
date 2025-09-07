"use client";
import { Button } from "@/components/ui/button";
import { useHydratedStore } from "@/hooks/useHydratedStore";
import { useUserStore } from "@/stores/userStore";
import { useRouter } from "next/navigation";
import { useAuthSheet } from "@/hooks/useAuthSheet";

interface BookNowCartBtnProps {
  deviceSlug: string;
}

const BookNowCartBtn = ({ deviceSlug }: BookNowCartBtnProps) => {
  //* router
  const router = useRouter();

  //* user-store
  const user = useHydratedStore(useUserStore, (state) => state.user);

  const { openAuth } = useAuthSheet();

  const onCompleted = () => {
    router.push(`/repair/checkout?device=${deviceSlug}`);
  };

  //* book-now btn
  const onClick = () => {
    if (!user?._id) {
      openAuth({ onCompleted });
    } else {
      router.push(`/repair/checkout?device=${deviceSlug}`);
    }
  };

  //* save hydration error
  if (!user) return null;

  return (
    <>
      <Button
        onClick={onClick}
        size="lg"
        className="w-full bg-black text-white hover:bg-gray-800 font-semibold text-lg mt-3"
      >
        Book now
      </Button>
    </>
  );
};

export default BookNowCartBtn;
