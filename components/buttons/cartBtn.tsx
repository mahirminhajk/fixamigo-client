"use client";

import { BsCart2 } from "react-icons/bs";
import { FaCartPlus } from "react-icons/fa6";
import Link from "next/link";

import { useCartStore } from "@/stores/cartStore";
import { useHydratedStore } from "@/hooks/useHydratedStore";

import { Button } from "@/components/ui/button"; // Import Button

function CartBtn() {
  const cart = useHydratedStore(useCartStore, (state) => state.cart);
  const isCartEmpty = useCartStore((state) => state.isCartEmpty);

  if (!cart) return null; // Save us from hydration mismatch

  return (
    <Button asChild variant="ghost" size="icon" aria-label="View cart">
      <Link href="/cart">
        {isCartEmpty() ? (
          <BsCart2 className="size-6" /> 
        ) : (
          <FaCartPlus className="size-6" />
        )}
      </Link>
    </Button>
  );
}

export default CartBtn;
