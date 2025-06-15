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

  const itemInCart = isInCart(sparePart._id);

  const handleToggleCart = () => {
    if (itemInCart) {
      removeFromCart(sparePart._id);
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
      className={itemInCart ? "" : "bg-black hover:bg-black/80"} // Custom black color for default state
    >
      {itemInCart ? <FaTrash className="size-4" /> : <FaCartPlus className="size-4" />}
    </Button>
  );
}
