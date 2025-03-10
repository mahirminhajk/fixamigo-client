"use client";

import { BsCart2 } from "react-icons/bs";
import { FaCartPlus } from "react-icons/fa6";
import Link from "next/link";

import { useCartStore } from "@/stores/cartStore";
import { useHydratedStore } from "@/hooks/useHydratedStore";

function CartBtn() {
  const cart = useHydratedStore(useCartStore, (state) => state.cart);
  const isCartEmpty = useCartStore((state) => state.isCartEmpty);

  if (!cart) return null; // Save us from hydration mismatch

  return (
    <div>
      <Link href="/cart">
        {isCartEmpty() ? (
          <BsCart2 className="w-6 h-6 cursor-pointer" />
        ) : (
          <FaCartPlus className="w-6 h-6 cursor-pointer" />
        )}
      </Link>
    </div>
  );
}

export default CartBtn;
