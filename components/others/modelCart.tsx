"use client";
import { useCartStore } from "@/stores/cartStore";
import { useHydratedStore } from "@/hooks/useHydratedStore";

function ModelCart() {
  const cart = useHydratedStore(useCartStore, (state) => state.cart);
  const getTotalPrice = useCartStore((state) => state.getTotalPrice);

  if (!cart) return null; // Save us from hydration error

  return (
    <div className="p-6 bg-white rounded-[6px] max-w-md mx-auto">
      <h2 className="text-lg font-semibold mt-6 mb-3">Price Summary</h2>

      {cart.spareParts.length > 0 ? (
        cart.spareParts.map((item) => (
          <div
            key={item._id}
            className="flex justify-between text-gray-600 mb-2"
          >
            <span>{item.label}</span>
            <span className="text-gray-900">₹{item.price.final}</span>
          </div>
        ))
      ) : (
        <p className="text-gray-500">No items in cart</p>
      )}

      <hr className="my-2 border-gray-300" />
      <div className="flex justify-between font-semibold">
        <span>Total Price</span>
        <span className="text-blue-600">₹{getTotalPrice()}</span>
      </div>
    </div>
  );
}

export default ModelCart;
