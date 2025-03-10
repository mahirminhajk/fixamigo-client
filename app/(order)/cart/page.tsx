"use client";

import Topbar from "@/components/core/topbar";
import CartList from "@/components/list/cartList";
import EmptyCart from "@/components/others/emptyCart";
import { useHydratedStore } from "@/hooks/useHydratedStore";
import { useCartStore } from "@/stores/cartStore";

export default function Page() {
  const cart = useHydratedStore(useCartStore, (state) => state.cart);
  const isCartEmpty = useCartStore((state) => state.isCartEmpty);
  if (!cart) return null;

  return (
    <section>
      <div className="flex flex-col items-center">
        <div className="flex-1 p-4 w-full flex justify-center">
          <div className="w-full max-w-md">
            <Topbar title="Cart" />
            {isCartEmpty() ? <EmptyCart /> : <CartList />}
          </div>
        </div>
      </div>
    </section>
  );
}
