import Image from "next/image";
import AddToCartBtn from "../buttons/addToCartBtn";
import { getDiscountPercentage, getSparePartsIcon } from "@/lib/utils";
import { ICartDevice, ISparePart } from "@/types";
// import Link from "next/link"; // Removed support/help card from here; now rendered in DeviceDetailsContent
import PriceRangeInfo from "./PriceRangeInfo";
import { CornerOfferBadge } from "../ui/OfferBadge";
import { getSparePartOffer, calculateDiscountedPrice } from "@/lib/offers";

interface ListSparePartsProps {
  spareParts: ISparePart[];
  cartDevice: ICartDevice;
}

function ListSpareParts({ spareParts, cartDevice }: ListSparePartsProps) {
  // Check if any spare part has price range
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
              // Check if this spare part has an offer
              const sparePartOffer = getSparePartOffer(
                cartDevice.slug,
                item.category
              );
              const hasOffer = !!sparePartOffer;

              return (
                <div
                  key={item._id}
                  className={`relative py-4 pr-2 rounded-[6px] shadow-sm ${
                    hasOffer
                      ? "bg-gradient-to-r from-green-50 to-green-100 border border-green-200"
                      : "bg-gray-100"
                  }`}
                >
                  {/* Show offer badge if available */}
                  {hasOffer && (
                    <CornerOfferBadge
                      type="percentage"
                      value={sparePartOffer.discountPercentage}
                      position="top-right"
                      size="sm"
                    />
                  )}

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
                            hasOffer ? "text-green-800" : "text-black"
                          }`}
                        >
                          {item.label}
                        </p>
                        <div className="flex items-center space-x-2 text-sm">
                          {hasOffer ? (
                            // Show special offer pricing
                            <>
                              <span className="text-green-600 font-bold text-xs bg-green-100 px-2 py-1 rounded">
                                EXTRA {sparePartOffer.discountPercentage}% OFF
                              </span>
                              <span className="line-through text-gray-500">
                                ₹{item.price.final}
                              </span>
                              <span className="font-bold text-green-700">
                                ₹
                                {
                                  calculateDiscountedPrice(
                                    item.price.final,
                                    sparePartOffer.discountPercentage
                                  ).discountedPrice
                                }
                              </span>
                            </>
                          ) : (
                            // Regular pricing display
                            <>
                              <span className="text-blue-600 font-semibold">
                                -
                                {getDiscountPercentage(
                                  item.price.total,
                                  item.price.final
                                )}
                                %
                              </span>
                              {!(
                                item.price.range &&
                                item.price.startPrice &&
                                item.price.endPrice
                              ) && (
                                <span className="line-through text-gray-500">
                                  ₹{item.price.total}
                                </span>
                              )}
                              <span
                                className="font-bold"
                                style={{
                                  color:
                                    item.price.range &&
                                    item.price.startPrice &&
                                    item.price.endPrice
                                      ? "#D2691E"
                                      : "black",
                                }}
                              >
                                {item.price.range &&
                                item.price.startPrice &&
                                item.price.endPrice
                                  ? `₹${item.price.startPrice} - ₹${item.price.endPrice}`
                                  : `₹${item.price.final}`}
                              </span>
                            </>
                          )}
                        </div>
                        {hasOffer && (
                          <p className="text-xs text-green-600 font-medium mt-1">
                            Save extra ₹
                            {
                              calculateDiscountedPrice(
                                item.price.final,
                                sparePartOffer.discountPercentage
                              ).savedAmount
                            }{" "}
                            with this offer!
                          </p>
                        )}
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
              // Check if this spare part has an offer
              const sparePartOffer = getSparePartOffer(
                cartDevice.slug,
                item.category
              );
              const hasOffer = !!sparePartOffer;

              return (
                <div
                  key={item._id}
                  className={`relative p-4 rounded-[6px] shadow-sm hover:shadow-md transition-all duration-200 ${
                    hasOffer
                      ? "bg-gradient-to-br from-green-50 to-green-100 border border-green-200 ring-1 ring-green-300"
                      : "bg-gray-100"
                  }`}
                >
                  {/* Show offer badge if available */}
                  {hasOffer && (
                    <CornerOfferBadge
                      type="percentage"
                      value={sparePartOffer.discountPercentage}
                      position="top-right"
                      size="sm"
                    />
                  )}

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
                            hasOffer ? "text-green-800" : "text-black"
                          }`}
                        >
                          {item.label}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex flex-col space-y-1">
                        {hasOffer ? (
                          // Show special offer pricing
                          <>
                            <div className="flex items-center space-x-2 text-sm">
                              <span className="text-green-600 font-bold text-xs bg-green-100 px-2 py-1 rounded">
                                EXTRA {sparePartOffer.discountPercentage}% OFF
                              </span>
                            </div>
                            <div className="flex items-center space-x-2 text-sm">
                              <span className="line-through text-gray-500">
                                ₹{item.price.final}
                              </span>
                              <span className="font-bold text-green-700">
                                ₹
                                {
                                  calculateDiscountedPrice(
                                    item.price.final,
                                    sparePartOffer.discountPercentage
                                  ).discountedPrice
                                }
                              </span>
                            </div>
                            <p className="text-xs text-green-600 font-medium">
                              Save extra ₹
                              {
                                calculateDiscountedPrice(
                                  item.price.final,
                                  sparePartOffer.discountPercentage
                                ).savedAmount
                              }
                              !
                            </p>
                          </>
                        ) : (
                          // Regular pricing display
                          <>
                            <div className="flex items-center space-x-2 text-sm">
                              <span className="text-blue-600 font-semibold">
                                -
                                {getDiscountPercentage(
                                  item.price.total,
                                  item.price.final
                                )}
                                %
                              </span>
                              {!(
                                item.price.range &&
                                item.price.startPrice &&
                                item.price.endPrice
                              ) && (
                                <span className="line-through text-gray-500">
                                  ₹{item.price.total}
                                </span>
                              )}
                            </div>
                            <span
                              className="font-bold"
                              style={{
                                color:
                                  item.price.range &&
                                  item.price.startPrice &&
                                  item.price.endPrice
                                    ? "#D2691E"
                                    : "black",
                              }}
                            >
                              {item.price.range &&
                              item.price.startPrice &&
                              item.price.endPrice
                                ? `₹${item.price.startPrice} - ₹${item.price.endPrice}`
                                : `₹${item.price.final}`}
                            </span>
                          </>
                        )}
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
