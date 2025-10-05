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
      <div className="w-full max-w-md mx-auto lg:max-w-none p-4">
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
                  className={`relative py-4 pr-2 rounded-[6px] shadow-sm transition-colors duration-200 ${
                    highlight
                      ? "bg-gradient-to-r from-green-50 to-green-100 border border-green-200"
                      : "bg-gray-100"
                  }`}
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
                      <div>
                        <p
                          className={`font-medium ${
                            highlight ? "text-green-800" : "text-black"
                          }`}
                        >
                          {item.label}
                        </p>
                        <div className="flex items-center space-x-2 text-sm">
                          <span
                            className={`font-semibold ${
                              highlight ? "text-green-700" : "text-blue-600"
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
                              isRange
                                ? "text-amber-700"
                                : highlight
                                ? "text-green-800"
                                : "text-black"
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
          <div className="hidden lg:grid lg:grid-cols-2 xl:grid-cols-3 gap-4">
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
                  className={`relative p-4 rounded-[6px] shadow-sm hover:shadow-md transition-all duration-200 ${
                    highlight
                      ? "bg-gradient-to-br from-green-50 to-green-100 border border-green-200 ring-1 ring-green-300"
                      : "bg-gray-100"
                  }`}
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
                        <p
                          className={`font-medium text-sm ${
                            highlight ? "text-green-800" : "text-black"
                          }`}
                        >
                          {item.label}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex flex-col space-y-1">
                        <div className="flex items-center space-x-2 text-sm">
                          <span
                            className={`font-semibold ${
                              highlight ? "text-green-700" : "text-blue-600"
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
                            isRange
                              ? "text-amber-700"
                              : highlight
                              ? "text-green-800"
                              : "text-black"
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
