"use client"; // ✅ Ensure this is a client component

import { useCartStore } from "@/stores/cartStore";
import { useHydratedStore } from "@/hooks/useHydratedStore";
import { FaCartPlus, FaTrash } from "react-icons/fa";

interface AddToCartBtnProps {
  sparePart: {
    _id: string;
    label: string;
    category: string;
    totalCost: number;
    discountAmount: number;
    finalPrice: number;
  };
}

export default function AddToCartBtn({ sparePart }: AddToCartBtnProps) {
  const cart = useHydratedStore(useCartStore, (state) => state.cart);
  const addToCart = useCartStore((state) => state.addToCart);
  const removeFromCart = useCartStore((state) => state.removeFromCart);
  const isInCart = useCartStore((state) => state.isInCart);

  if (!cart) return null; // 🚀 Avoids hydration issues

  const itemInCart = isInCart(sparePart._id);

  const handleToggleCart = () => {
    if (itemInCart) {
      removeFromCart(sparePart._id);
    } else {
      addToCart(sparePart);
    }
  };

  return (
    <button
      className={`px-3 py-2 text-sm rounded-[4px] transition duration-300 ${
        itemInCart ? "bg-red-600 text-white" : "bg-black text-white"
      }`}
      onClick={handleToggleCart}
    >
      {itemInCart ? <FaTrash /> : <FaCartPlus />}
    </button>
  );
}
