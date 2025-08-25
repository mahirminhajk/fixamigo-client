import { useCartStore } from "@/stores/cartStore";
import { useHydratedStore } from "@/hooks/useHydratedStore";
import { getSparePartsIcon } from "@/lib/utils";
import { IOrder } from "@/types/order";
import { SparePartType } from "@/types/spareParts";
import Image from "next/image";
import PriceRangeInfo from "../list/PriceRangeInfo";

interface CheckoutOrderSummaryProps {
  order: IOrder | null;
  deviceSlug: string | null;
}

const CheckoutOrderSummary = ({
  order,
  deviceSlug,
}: CheckoutOrderSummaryProps) => {
  const cart = useHydratedStore(useCartStore, (state) => state.cart);
  const getTotalPrice = useCartStore((state) => state.getTotalPrice);
  const hasRangeItems = useCartStore((state) => state.hasRangeItems);

  // Find the cart item for the selected device
  const cartItem = cart?.items?.find((item) => item.device.slug === deviceSlug);

  if (!cartItem || !cartItem.spareParts.length) {
    return null;
  }

  const hasRangeItemsForDevice = hasRangeItems(cartItem.device._id);
  const totalCartPrice = getTotalPrice(cartItem.device._id);
  const hasUnknownOrDiagnosis = cartItem.spareParts.some(
    (p) =>
      p.type === SparePartType.UNKNOWN || p.type === SparePartType.DIAGNOSIS
  );

  return (
    <div className="bg-white p-4 lg:p-6 rounded-xl shadow-md space-y-4 w-full max-w-md lg:max-w-none mx-auto lg:mx-0">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-lg lg:text-xl">Order Summary</h3>
        {hasRangeItemsForDevice && (
          <PriceRangeInfo hasPriceRange={hasRangeItemsForDevice} />
        )}
      </div>

      {/* Device Info */}
      <div className="border-b border-gray-200 pb-3">
        <div className="flex items-center gap-3">
          <Image
            src={cartItem.device.images?.[0] || "/logos/logo.png"}
            alt={cartItem.device.name}
            title={cartItem.device.name.toLocaleUpperCase()}
            width={48}
            height={48}
            className="rounded-md border bg-white object-contain lg:w-12 lg:h-12"
          />
          <div className="flex-1">
            <p className="font-semibold text-gray-900 lg:text-lg">
              {cartItem.device.name}
            </p>
            <p className="text-sm text-gray-600 lg:text-base">
              {cartItem.device.company}
            </p>
          </div>
        </div>
      </div>

      {/* Spare Parts List */}
      <div className="space-y-3">
        <h4 className="font-medium text-gray-700 lg:text-lg">
          Selected Services
        </h4>
        {cartItem.spareParts.map((item) => (
          <div
            key={item._id}
            className="flex items-center justify-between py-2 gap-3"
          >
            <div className="flex items-center gap-3 flex-1 min-w-0">
              <Image
                src={getSparePartsIcon(item.category)}
                alt={item.label}
                title={item.label.toUpperCase()}
                width={32}
                height={32}
                className="object-contain flex-shrink-0 lg:w-8 lg:h-8"
              />
              <span className="text-sm lg:text-base text-gray-700 truncate">
                {item.label}
              </span>
            </div>
            {item.type === SparePartType.UNKNOWN ||
            item.type === SparePartType.DIAGNOSIS ? (
              <span className="font-semibold text-sm lg:text-base flex-shrink-0 text-[#D2691E]">
                Quote after order
              </span>
            ) : (
              <span
                className={`font-semibold text-sm lg:text-base flex-shrink-0 ${
                  item.price.range &&
                  item.price.startPrice &&
                  item.price.endPrice
                    ? "text-[#D2691E]"
                    : "text-black"
                }`}
              >
                {item.price.range &&
                item.price.startPrice &&
                item.price.endPrice
                  ? `₹${item.price.startPrice} - ₹${item.price.endPrice}*`
                  : `₹${item.price.final}`}
              </span>
            )}
          </div>
        ))}
      </div>

      {/* Price Summary */}
      <div className="border-t border-gray-200 pt-3 space-y-2">
        <div className="flex justify-between text-sm lg:text-base">
          <span className="text-gray-600">Subtotal</span>
          <span
            className={`font-semibold ${
              hasRangeItemsForDevice ? "text-[#D2691E]" : "text-black"
            }`}
          >
            ₹{totalCartPrice.toLocaleString()}
            {hasRangeItemsForDevice ? "*" : ""}
          </span>
        </div>

        <div className="flex justify-between text-sm lg:text-base">
          <span className="text-gray-600">Delivery</span>
          <span className="font-semibold">₹{order?.price?.delivery || 0}</span>
        </div>

        <hr className="border-gray-300" />

        <div className="flex justify-between font-bold text-base lg:text-lg">
          <span>Total</span>
          <span
            className={
              hasRangeItemsForDevice ? "text-[#D2691E]" : "text-blue-600"
            }
          >
            ₹{(totalCartPrice + (order?.price?.delivery || 0)).toLocaleString()}
            {hasRangeItemsForDevice ? "*" : ""}
          </span>
        </div>

        {hasRangeItemsForDevice && (
          <div className="mt-2 text-xs lg:text-sm text-[#D2691E]">
            <p>
              * Maximum estimated price. Final price will be confirmed by
              service partner.
            </p>
          </div>
        )}
        {hasUnknownOrDiagnosis && (
          <div className="mt-1 text-xs lg:text-sm text-[#D2691E]">
            <p>Price will be confirmed after order.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CheckoutOrderSummary;
