"use client"; // ✅ Ensure this is a client component

import { useCartStore } from "@/stores/cartStore";
import { useHydratedStore } from "@/hooks/useHydratedStore";
import { FaCartPlus, FaTrash } from "react-icons/fa";
import { ISparePart, ICartDevice } from "@/types";
import { Button } from "@/components/ui/button"; // Import the Button component

interface AddToCartBtnProps {
  sparePart: ISparePart;
  cartDevice: ICartDevice;
}

export default function AddToCartBtn({
  sparePart,
  cartDevice,
}: AddToCartBtnProps) {
  const cart = useHydratedStore(useCartStore, (state) => state.cart);
  const addToCart = useCartStore((state) => state.addToCart);
  const removeFromCart = useCartStore((state) => state.removeFromCart);
  const isInCart = useCartStore((state) => state.isInCart);

  if (!cart) return null;

  // Check if the spare part is in the cart for the current device only
  const itemInCart = isInCart(cartDevice._id, sparePart._id);

  const handleToggleCart = () => {
    if (itemInCart) {
      removeFromCart(cartDevice._id, sparePart._id);
    } else {
      addToCart(cartDevice, sparePart);
    }
  };

  return (
    <Button
      variant={itemInCart ? "destructive" : "default"}
      size="icon" // Using "icon" size for a compact button, ensures 36x36px hit area
      onClick={handleToggleCart}
      aria-label={itemInCart ? "Remove from cart" : "Add to cart"}
      className={
        itemInCart
          ? ""
          : "bg-gradient-to-r from-sky-600 to-indigo-600 text-white shadow-md shadow-sky-600/20 hover:from-sky-500 hover:to-indigo-500 transition-all duration-200"
      }
    >
      {itemInCart ? (
        <FaTrash className="size-4" />
      ) : (
        <FaCartPlus className="size-4" />
      )}
    </Button>
  );
}
