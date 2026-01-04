import Image from "next/image";
import AddToCartBtn from "../buttons/addToCartBtn";
import { getDiscountPercentage, getSparePartsIcon } from "@/lib/utils";
import { ICartDevice, ISparePart } from "@/types";
// import Link from "next/link"; // Removed support/help card from here; now rendered in DeviceDetailsContent
import PriceRangeInfo from "./PriceRangeInfo";

interface ListSparePartsProps {
  spareParts: ISparePart[];
  cartDevice: ICartDevice;
}

function ListSpareParts({ spareParts, cartDevice }: ListSparePartsProps) {
  const hasPriceRange = spareParts.some(
    (item) => item.price.range && item.price.startPrice && item.price.endPrice
  );
  const isEmpty = !spareParts || spareParts.length === 0;

  return (
    <>
      <div className="w-full max-w-md mx-auto lg:max-w-none p-4 sm:p-5">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-lg font-bold">READY-PRICED PARTS</h2>
          <PriceRangeInfo hasPriceRange={hasPriceRange} />
        </div>
        <hr className="bg-black mb-4" />

        {isEmpty && (
          <div className="text-sm text-gray-700 bg-gray-50 border border-dashed border-gray-300 rounded-md p-4 mb-4">
            No ready-priced parts available. Please request a quote.
          </div>
        )}

        {/* Mobile Layout - Single Column */}
        {!isEmpty && (
          <div className="lg:hidden space-y-3">
            {spareParts.map((item) => {
              const isRange =
                item.price.range &&
                item.price.startPrice &&
                item.price.endPrice;
              const rawDiscount = getDiscountPercentage(
                item.price.total,
                item.price.final
              );
              const discount = Number(rawDiscount) || 0;
              const highlight = !isRange && discount > 10; // highlight only real priced items above 10%
              return (
                <div
                  key={item._id}
                  className="relative overflow-hidden rounded-[16px] border border-slate-200 bg-white px-2 py-4 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md"
                >
                  <div className="flex items-center justify-between px-4">
                    <div className="flex items-center">
                      <Image
                        src={getSparePartsIcon(item.category)}
                        alt={item.label}
                        title={`${item.label} Icon`}
                        width={48}
                        height={48}
                        className="mr-3"
                      />
                      <div className="flex-1">
                        <p className="font-medium text-black">{item.label}</p>

                        {/* Quality and Warranty badges for mobile */}
                        <div className="flex items-center gap-1 mb-1">
                          {item.quality && (
                            <span
                              className={`px-2 py-0.5 text-[10px] font-medium rounded ${
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
                            <span className="px-2 py-0.5 text-[10px] font-medium rounded bg-green-100 text-green-700 border border-green-200">
                              {item.warranty.duration}{" "}
                              {item.warranty.unit || "months"} warranty
                            </span>
                          )}
                        </div>

                        <div className="flex items-center space-x-2 text-sm">
                          <span
                            className={`font-semibold ${
                              highlight ? "text-green-600" : "text-blue-600"
                            }`}
                          >
                            -{discount}%
                          </span>
                          {!isRange && (
                            <span className="line-through text-gray-500">
                              ₹{item.price.total}
                            </span>
                          )}
                          <span
                            className={`font-bold ${
                              isRange ? "text-amber-700" : "text-black"
                            }`}
                          >
                            {isRange
                              ? `₹${item.price.startPrice} - ₹${item.price.endPrice}`
                              : `₹${item.price.final}`}
                          </span>
                        </div>
                      </div>
                    </div>
                    <AddToCartBtn sparePart={item} cartDevice={cartDevice} />
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Desktop Layout - Grid */}
        {!isEmpty && (
          <div className="hidden gap-4 lg:grid lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
            {spareParts.map((item) => {
              const isRange =
                item.price.range &&
                item.price.startPrice &&
                item.price.endPrice;
              const rawDiscount = getDiscountPercentage(
                item.price.total,
                item.price.final
              );
              const discount = Number(rawDiscount) || 0;
              const highlight = !isRange && discount > 10;
              return (
                <div
                  key={item._id}
                  className="relative rounded-[16px] border border-slate-200 bg-white p-4 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-lg"
                >
                  <div className="flex flex-col space-y-3">
                    <div className="flex items-center">
                      <Image
                        src={getSparePartsIcon(item.category)}
                        alt={item.label}
                        title={`${item.label} Icon`}
                        width={40}
                        height={40}
                        className="mr-3"
                      />
                      <div className="flex-1">
                        <p className="font-medium text-sm text-black">
                          {item.label}
                        </p>

                        {/* Quality and Warranty badges for desktop */}
                        <div className="flex items-center gap-1 mt-1 mb-2">
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
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex flex-col space-y-1">
                        <div className="flex items-center space-x-2 text-sm">
                          <span
                            className={`font-semibold ${
                              highlight ? "text-green-600" : "text-blue-600"
                            }`}
                          >
                            -{discount}%
                          </span>
                          {!isRange && (
                            <span className="line-through text-gray-500">
                              ₹{item.price.total}
                            </span>
                          )}
                        </div>
                        <span
                          className={`font-bold ${
                            isRange ? "text-amber-700" : "text-black"
                          }`}
                        >
                          {isRange
                            ? `₹${item.price.startPrice} - ₹${item.price.endPrice}`
                            : `₹${item.price.final}`}
                        </span>
                      </div>
                      <AddToCartBtn sparePart={item} cartDevice={cartDevice} />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Support/help request card moved to DeviceDetailsContent to appear at end */}
      </div>
    </>
  );
}

export default ListSpareParts;
