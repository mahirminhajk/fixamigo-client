"use client";
import { ICartDevice, ISparePart, SparePartType } from "@/types";
import { useCartStore } from "@/stores/cartStore";
import { getSparePartsIcon, getDiscountPercentage } from "@/lib/utils";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { MdDelete } from "react-icons/md";
import BookNowCartBtn from "@/components/buttons/bookNowCartBtn";
import PriceRangeInfo from "../PriceRangeInfo";

interface CartDeviceDesktopProps {
  device: ICartDevice;
  spareParts: ISparePart[];
  hasRange: boolean;
}

export default function CartDeviceDesktop({
  device,
  spareParts,
  hasRange,
}: CartDeviceDesktopProps) {
  const removeFromCart = useCartStore((s) => s.removeFromCart);
  const getTotalPrice = useCartStore((s) => s.getTotalPrice);
  const hasUnknownItems = spareParts.some(
    (p) => p.type === SparePartType.UNKNOWN
  );
  const hasDiagnosisItems = spareParts.some(
    (p) => p.type === SparePartType.DIAGNOSIS
  );
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-4">
            <Image
              src={device.images?.[0] || "/logos/logo.png"}
              alt={device.name}
              title={`${device.name} Logo`}
              width={60}
              height={60}
              className="rounded-lg border-2 border-white bg-white object-contain shadow-sm"
            />
            <div className="flex flex-col">
              <h3 className="font-bold text-xl text-black hover:text-blue-600 transition-colors">
                {device.name}
              </h3>
              {hasRange && <PriceRangeInfo hasPriceRange={hasRange} />}
            </div>
          </div>
          <Button
            variant="outline"
            onClick={() =>
              spareParts.forEach((sp) => removeFromCart(device._id, sp._id))
            }
            className="text-red-500 hover:text-red-700 hover:bg-red-50 border-red-200"
          >
            <MdDelete className="mr-2 h-4 w-4" /> Remove All Items
          </Button>
        </div>
      </div>
      <div className="p-6">
        {spareParts.length > 0 ? (
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3 mb-6">
            {spareParts.map((item) => (
              <div
                key={item._id}
                className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg border border-gray-200 hover:shadow-sm transition-shadow"
              >
                <Image
                  src={getSparePartsIcon(item.category)}
                  alt={item.label}
                  title={`${item.label} Icon`}
                  width={48}
                  height={48}
                  className="object-contain"
                />
                <div className="flex-1">
                  <p className="text-gray-900 font-semibold text-base mb-1">
                    {item.label}
                  </p>

                  {/* Quality and Warranty badges for cart desktop */}
                  <div className="flex items-center gap-1 mb-2">
                    {item.quality && (
                      <span
                        className={`px-2 py-0.5 text-xs font-medium rounded ${
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
                      <span className="px-2 py-0.5 text-xs font-medium rounded bg-green-100 text-green-700 border border-green-200">
                        {item.warranty.duration}{" "}
                        {item.warranty.unit || "months"} warranty
                      </span>
                    )}
                  </div>

                  <div className="flex items-center space-x-2">
                    {item.type === SparePartType.UNKNOWN ? (
                      <span className="text-[#D2691E] font-semibold text-sm">
                        Quote after order
                      </span>
                    ) : item.type === SparePartType.DIAGNOSIS ? (
                      <span className="text-[#D2691E] font-semibold text-sm">
                        Price after diagnosis
                      </span>
                    ) : (
                      <>
                        {!(
                          item.price.range &&
                          item.price.startPrice &&
                          item.price.endPrice
                        ) && (
                          <>
                            <span className="text-blue-600 font-semibold text-sm">
                              -
                              {getDiscountPercentage(
                                item.price.total,
                                item.price.final
                              )}
                              %
                            </span>
                            <span className="text-gray-400 line-through text-sm">
                              ₹{item.price.total}
                            </span>
                          </>
                        )}
                        <span
                          className={`font-bold text-base ${
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
                      </>
                    )}
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => removeFromCart(device._id, item._id)}
                  aria-label="Remove item"
                  className="text-red-400 hover:text-red-600 hover:bg-red-50"
                >
                  <MdDelete className="h-5 w-5" />
                </Button>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-400 text-center py-8">No items in cart</p>
        )}
        <div className="flex flex-col lg:flex-row gap-6">
          <div className="flex-1 bg-gray-50 p-6 rounded-xl border border-gray-200">
            <h4 className="font-semibold text-lg mb-4 text-gray-900">
              Price Breakdown
            </h4>
            <div className="space-y-3 mb-4">
              {spareParts.map((item) => (
                <div
                  key={item._id}
                  className="flex justify-between text-gray-700"
                >
                  <span className="capitalize">{item.label.toLowerCase()}</span>
                  {item.type === SparePartType.UNKNOWN ? (
                    <span className="font-medium text-[#D2691E]">
                      Quote after order
                    </span>
                  ) : item.type === SparePartType.DIAGNOSIS ? (
                    <span className="font-medium text-[#D2691E]">
                      After diagnosis
                    </span>
                  ) : (
                    <span className="font-medium">
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
            <hr className="border-dashed border-gray-300 my-4" />
            <div className="flex justify-between font-bold text-xl text-gray-900">
              <span>Total Price</span>
              <span className={hasRange ? "text-[#D2691E]" : "text-blue-600"}>
                ₹{getTotalPrice(device._id).toLocaleString()}
                {hasRange ? "*" : ""}
              </span>
            </div>
            {hasRange && (
              <div className="mt-3 text-sm text-[#D2691E]">
                <p>
                  * Maximum estimated price. Final price will be confirmed by
                  service partner.
                </p>
              </div>
            )}
            {(hasUnknownItems || hasDiagnosisItems) && (
              <div className="mt-3 text-sm text-[#D2691E]">
                <p>Price will be confirmed after order.</p>
              </div>
            )}
          </div>
          <div className="flex flex-col justify-center lg:w-64">
            <BookNowCartBtn deviceSlug={device.slug} />
          </div>
        </div>
      </div>
    </div>
  );
}
