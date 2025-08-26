"use client";
import { useHydratedStore } from "@/hooks/useHydratedStore";
import { useCartStore } from "@/stores/cartStore";
import CartDeviceMobile from "./cart/CartDeviceMobile";
import CartDeviceDesktop from "./cart/CartDeviceDesktop";
import { Button } from "../ui/button";
import { MdDelete } from "react-icons/md";

const CartList = () => {
  const cart = useHydratedStore(useCartStore, (state) => state.cart);
  const clearCart = useCartStore((state) => state.clearCart);
  const hasRangeItems = useCartStore((state) => state.hasRangeItems);

  if (!cart || !Array.isArray(cart.items) || cart.items.length === 0)
    return null;

  return (
    <main className="w-full flex flex-col items-center pb-28 bg-gray-50 min-h-screen">
      {/* Mobile and Tablet Layout */}
      <div className="w-full max-w-md lg:hidden p-4">
        {cart.items.map((cartItem) => (
          <CartDeviceMobile
            key={cartItem.device._id}
            device={cartItem.device}
            spareParts={cartItem.spareParts}
            hasRange={hasRangeItems(cartItem.device._id)}
          />
        ))}
        <div className="mt-4">
          <Button
            variant="destructive"
            size="lg"
            onClick={clearCart}
            className="relative inline-flex items-center justify-center gap-3 w-full px-6 md:px-8 py-3 md:py-4
                       bg-gradient-to-r from-[#D2691E] to-[#121212]
                       hover:from-[#121212] hover:to-[#D2691E]
                       text-white font-bold rounded-2xl
                       shadow-xl hover:shadow-2xl
                       transform transition-all duration-300
                       hover:scale-105 hover:-translate-y-1
                       focus:outline-none focus:ring-4 focus:ring-[#D2691E]/50
                       border-0"
          >
            <MdDelete className="text-lg" />
            Clear Entire Cart
          </Button>
        </div>
      </div>

      {/* Desktop Layout */}
      <div className="hidden lg:block w-full max-w-6xl p-4">
        <div className="grid gap-8">
          {cart.items.map((cartItem) => (
            <CartDeviceDesktop
              key={cartItem.device._id}
              device={cartItem.device}
              spareParts={cartItem.spareParts}
              hasRange={hasRangeItems(cartItem.device._id)}
            />
          ))}

          {/* Desktop Clear Cart Button */}
          <div className="flex justify-center mt-8">
            <Button
              variant="destructive"
              size="lg"
              onClick={clearCart}
              className="relative inline-flex items-center justify-center gap-3 px-8 py-4
                         bg-gradient-to-r from-[#D2691E] to-[#121212]
                         hover:from-[#121212] hover:to-[#D2691E]
                         text-white font-bold rounded-2xl
                         shadow-xl hover:shadow-2xl
                         transform transition-all duration-300
                         hover:scale-105 hover:-translate-y-1
                         focus:outline-none focus:ring-4 focus:ring-[#D2691E]/50
                         border-0 min-w-[280px]"
            >
              <MdDelete className="text-lg" />
              Clear Entire Cart
            </Button>
          </div>
        </div>
      </div>
    </main>
  );
};

export default CartList;
