import Image from "next/image";
import AddToCartBtn from "../buttons/addToCartBtn";
import { getDiscountPercentage, getSparePartsIcon } from "@/lib/utils";
import { ICartDevice, ISparePart } from "@/types";
import Link from "next/link";

interface ListSparePartsProps {
  spareParts: ISparePart[];
  cartDevice: ICartDevice;
}

function ListSpareParts({ spareParts, cartDevice }: ListSparePartsProps) {
  return (
    <>
      <div className="w-full max-w-md mx-auto p-4">
        <h2 className="text-lg font-bold mb-2">SPARE PARTS</h2>
        <hr className="bg-black mb-4" />

        {spareParts.map((item) => (
          <div
            key={item._id}
            className="bg-gray-100 py-4 pr-2 rounded-[6px] shadow-sm mb-3"
          >
            <div className="flex items-center justify-between px-4">
              <div className="flex items-center">
                <Image
                  src={getSparePartsIcon(item.category)}
                  alt={item.label}
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
                    <span className="line-through text-gray-500">
                      ₹{item.price.total}
                    </span>
                    <span className="text-black font-bold">
                      ₹{item.price.final}
                    </span>
                  </div>
                </div>
              </div>
              <AddToCartBtn sparePart={item} cartDevice={cartDevice} />
            </div>
          </div>
        ))}
        {/* Support/help request card styled like spare parts */}
        <div className="bg-gray-100 py-4 rounded-[6px] shadow-sm mb-3">
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
