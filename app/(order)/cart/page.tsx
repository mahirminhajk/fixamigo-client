"use client";

import Topbar from "@/components/core/topbar";
import CartList from "@/components/list/cartList";
import EmptyAndNotLogined from "@/components/others/emptyAndNotLogined";
import { useHydratedStore } from "@/hooks/useHydratedStore";
import { useCartStore } from "@/stores/cartStore";
import { BsCart2 } from "react-icons/bs";

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
            {isCartEmpty() ? (
              <EmptyAndNotLogined
                icon={<BsCart2 />}
                title="Your Cart is Empty"
                actionText="Continue shopping"
                actionLink="/repair/mobile-phone"
                showAuth={true}
                description="Sign in to view your saved items or start adding new favorites❤️."
              />
            ) : (
              <CartList />
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
