import { useHydratedStore } from "@/hooks/useHydratedStore";
import { getSparePartsIcon } from "@/lib/utils";
import { useCartStore } from "@/stores/cartStore";
import { SparePartType } from "@/types";
import { IOrder } from "@/types/order";
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
      {hasRangeItemsForDevice && (
        <div className="flex justify-end">
          <PriceRangeInfo hasPriceRange={hasRangeItemsForDevice} />
        </div>
      )}

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
              <div className="flex-1 min-w-0">
                <div className="text-sm lg:text-base text-gray-700 truncate">
                  {item.label}
                </div>

                {/* Quality and Warranty badges for checkout */}
                <div className="flex items-center gap-1 mt-1">
                  {item.quality && (
                    <span
                      className={`px-2 py-0.5 text-[10px] lg:text-xs font-medium rounded ${
                        item.quality === "original"
                          ? "bg-blue-600 text-white"
                          : item.quality === "best"
                          ? "bg-green-600 text-white"
                          : "bg-gray-600 text-white"
                      }`}
                    >
                      {item.quality.toUpperCase()}
                    </span>
                  )}
                  {item.warranty && item.warranty.duration && (
                    <span className="px-2 py-0.5 text-[10px] lg:text-xs font-medium rounded bg-green-100 text-green-700 border border-green-200">
                      {item.warranty.duration} {item.warranty.unit || "months"}{" "}
                      warranty
                    </span>
                  )}
                </div>
              </div>
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

        {/* Coupon Discount */}
        {order?.price?.breakdown?.couponsTotal && order.price.breakdown.couponsTotal > 0 && (
          <div className="flex justify-between text-sm lg:text-base">
            <span className="text-green-600 flex items-center gap-1">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
              </svg>
              Coupon Discount
            </span>
            <span className="font-semibold text-green-600">
              - ₹{order.price.breakdown.couponsTotal.toLocaleString()}
            </span>
          </div>
        )}

        {/* Wallet Discount */}
        {order?.price?.breakdown?.walletDeduction && order.price.breakdown.walletDeduction > 0 && (
          <div className="flex justify-between text-sm lg:text-base">
            <span className="text-blue-600 flex items-center gap-1">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
              </svg>
              Wallet Coins Used
            </span>
            <span className="font-semibold text-blue-600">
              - ₹{order.price.breakdown.walletDeduction.toLocaleString()}
            </span>
          </div>
        )}

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
            ₹{(
              totalCartPrice
              - (order?.price?.breakdown?.couponsTotal || 0)
              - (order?.price?.breakdown?.walletDeduction || 0)
              + (order?.price?.delivery || 0)
            ).toLocaleString()}
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

        {/* Savings Summary */}
        {((order?.price?.breakdown?.couponsTotal || 0) + (order?.price?.breakdown?.walletDeduction || 0)) > 0 && (
          <div className="mt-3 pt-3 border-t border-green-200 bg-green-50 rounded-lg p-3">
            <div className="flex items-center justify-between">
              <span className="text-sm font-semibold text-green-700 flex items-center gap-1">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                You're saving
              </span>
              <span className="text-lg font-bold text-green-700">
                ₹{(
                  (order?.price?.breakdown?.couponsTotal || 0) +
                  (order?.price?.breakdown?.walletDeduction || 0)
                ).toLocaleString()}
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CheckoutOrderSummary;
