"use client";

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
    <section className="py-6">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="mb-6">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
            Shopping Cart
          </h1>
          <p className="text-gray-600">
            Review your items and proceed to checkout
          </p>
        </div>

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
    </section>
  );
}
