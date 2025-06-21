"use client";
import { useCartStore } from "@/stores/cartStore";
import { useHydratedStore } from "@/hooks/useHydratedStore";
import { usePathname } from "next/navigation";

function ModelCart() {
  const cart = useHydratedStore(useCartStore, (state) => state.cart);
  const getTotalPrice = useCartStore((state) => state.getTotalPrice);
  const pathname = usePathname();

  // Extract deviceSlug from the URL (assuming /repair/mobile-phone/[brand]/[deviceSlug])
  let deviceSlug: string | undefined = undefined;
  if (pathname) {
    const parts = pathname.split("/");
    const idx = parts.findIndex((p) => p === "mobile-phone");
    if (idx !== -1 && parts.length > idx + 2) {
      deviceSlug = parts[idx + 2];
    }
  }

  if (!cart || !deviceSlug) return null;

  // Find the cart item for this device by slug
  const cartItem = cart.items?.find((item) => item.device.slug === deviceSlug);
  if (!cartItem) return null;

  return (
    <div className="p-6 bg-white rounded-[6px] max-w-md mx-auto">
      <h2 className="text-lg font-semibold mt-6 mb-3">Price Summary</h2>
      {cartItem.spareParts.length > 0 ? (
        cartItem.spareParts.map((item) => (
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
        <span className="text-blue-600">
          ₹{getTotalPrice(cartItem.device._id)}
        </span>
      </div>
    </div>
  );
}

export default ModelCart;
