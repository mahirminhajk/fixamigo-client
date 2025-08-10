import Image from "next/image";
import AddToCartBtn from "../buttons/addToCartBtn";
import { getDiscountPercentage, getSparePartsIcon } from "@/lib/utils";
import { ICartDevice, ISparePart } from "@/types";
import Link from "next/link";
import PriceRangeInfo from "./PriceRangeInfo";

interface ListSparePartsProps {
  spareParts: ISparePart[];
  cartDevice: ICartDevice;
}

function ListSpareParts({ spareParts, cartDevice }: ListSparePartsProps) {
  // Check if any spare part has price range
  const hasPriceRange = spareParts.some(
    (item) => item.price.range && item.price.startPrice && item.price.endPrice
  );

  return (
    <>
      <div className="w-full max-w-md mx-auto lg:max-w-none p-4">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-lg font-bold">SPARE PARTS</h2>
          <PriceRangeInfo hasPriceRange={hasPriceRange} />
        </div>
        <hr className="bg-black mb-4" />

        {/* Mobile Layout - Single Column */}
        <div className="lg:hidden space-y-3">
          {spareParts.map((item) => (
            <div
              key={item._id}
              className="bg-gray-100 py-4 pr-2 rounded-[6px] shadow-sm"
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
                    <p className="font-medium text-black">{item.label}</p>
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
                    </div>
                  </div>
                </div>
                <AddToCartBtn sparePart={item} cartDevice={cartDevice} />
              </div>
            </div>
          ))}
        </div>

        {/* Desktop Layout - Grid */}
        <div className="hidden lg:grid lg:grid-cols-2 xl:grid-cols-3 gap-4">
          {spareParts.map((item) => (
            <div
              key={item._id}
              className="bg-gray-100 p-4 rounded-[6px] shadow-sm hover:shadow-md transition-shadow duration-200"
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
                    <p className="font-medium text-black text-sm">
                      {item.label}
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex flex-col space-y-1">
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
                  </div>
                  <AddToCartBtn sparePart={item} cartDevice={cartDevice} />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Support/help request card styled like spare parts */}
        <div className="bg-gray-100 py-4 rounded-[6px] shadow-sm mt-4 lg:col-span-full">
          <Link
            href={`/support-request?type=service&value=${cartDevice.slug}`}
            className="flex items-center justify-between px-4"
          >
            <div className="flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6 text-blue-500 mr-3"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 16h-1v-4h-1m1-4h.01M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"
                />
              </svg>
              <span className="text-sm font-medium text-gray-800">
                Can&apos;t find the service you need? Request here
              </span>
            </div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </Link>
        </div>
      </div>
    </>
  );
}

export default ListSpareParts;
