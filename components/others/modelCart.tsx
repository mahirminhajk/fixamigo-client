"use client";
import { useCartStore } from "@/stores/cartStore";
import { useHydratedStore } from "@/hooks/useHydratedStore";
import { usePathname } from "next/navigation";

function ModelCart() {
  const cart = useHydratedStore(useCartStore, (state) => state.cart);
  const getTotalPrice = useCartStore((state) => state.getTotalPrice);
  const hasRangeItems = useCartStore((state) => state.hasRangeItems);
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

  const hasRangeItemsForDevice = hasRangeItems(cartItem.device._id);
  const totalPrice = getTotalPrice(cartItem.device._id);
  // Detect presence of UNKNOWN spare parts (quote-after-order items)
  const hasUnknownItemsForDevice = cartItem.spareParts.some(
    (p) => p.type === "UNKNOWN"
  );
  const totalPriceColorClass = hasRangeItemsForDevice
    ? "text-[#D2691E]"
    : "text-blue-600";

  return (
    <div className="p-6 bg-white rounded-[6px] shadow-sm max-w-md mx-auto lg:max-w-none lg:shadow-md">
      <h2 className="text-lg font-semibold mt-6 lg:mt-0 mb-3">Price Summary</h2>

      {cartItem.spareParts.length > 0 ? (
        <div className="space-y-3">
          {/* Desktop: Show items in a more compact way */}
          <div className="hidden lg:block">
            <div className="bg-gray-50 rounded-[6px] p-4 space-y-2">
              {cartItem.spareParts.map((item) => (
                <div key={item._id} className="flex justify-between text-sm">
                  <span className="text-gray-700">{item.label}</span>
                  <span className="text-gray-900 font-medium">
                    {item.price.range && item.price.endPrice
                      ? `₹${item.price.endPrice}*`
                      : `₹${item.price.final}`}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Mobile: Original layout */}
          <div className="lg:hidden">
            {cartItem.spareParts.map((item) => (
              <div
                key={item._id}
                className="flex justify-between text-gray-600 mb-2"
              >
                <span>{item.label}</span>
                <span className="text-gray-900">
                  {item.price.range && item.price.endPrice
                    ? `₹${item.price.endPrice}*`
                    : `₹${item.price.final}`}
                </span>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <p className="text-gray-500">No items in cart</p>
      )}

      <hr className="my-3 lg:my-4 border-gray-300" />

      <div className="flex justify-between font-semibold text-lg">
        <span>Total Price</span>
        <span className={`font-semibold ${totalPriceColorClass}`}>
          ₹{totalPrice}
          {hasRangeItemsForDevice ? "*" : ""}
        </span>
      </div>

      {hasRangeItemsForDevice && (
        <div className="mt-2 text-xs text-[#D2691E]">
          <p>
            * Maximum estimated price. Final price will be confirmed by service
            partner.
          </p>
        </div>
      )}
      {hasUnknownItemsForDevice && (
        <div className="mt-2 text-xs text-[#D2691E] text-wrap">
          <p>Price will be confirmed after order.</p>
        </div>
      )}

      {/* Desktop: Add some additional info */}
      <div className="hidden lg:block mt-4 text-xs text-gray-500">
        <p>• Free pickup and delivery</p>
        <p>• 30-day warranty on select parts</p>
        <p>• Pay after service completion</p>
      </div>
    </div>
  );
}

export default ModelCart;
