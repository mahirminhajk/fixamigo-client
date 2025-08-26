"use client";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { MdDelete } from "react-icons/md";
import { ICartDevice, ISparePart, SparePartType } from "@/types";
import { getSparePartsIcon } from "@/lib/utils";
import PriceRangeInfo from "../PriceRangeInfo";
import { useCartStore } from "@/stores/cartStore";
import BookNowCartBtn from "@/components/buttons/bookNowCartBtn";
import SparePartPriceDisplay from "./SparePartPriceDisplay";

interface CartDeviceMobileProps {
  device: ICartDevice;
  spareParts: ISparePart[];
  hasRange: boolean;
}

export default function CartDeviceMobile({
  device,
  spareParts,
  hasRange,
}: CartDeviceMobileProps) {
  const removeFromCart = useCartStore((s) => s.removeFromCart);
  const getTotalPrice = useCartStore((s) => s.getTotalPrice);
  const clearPartGroup = () => {
    spareParts.forEach((sp) => removeFromCart(device._id, sp._id));
  };
  const hasUnknownItems = spareParts.some(
    (p) => p.type === SparePartType.UNKNOWN
  );
  const hasDiagnosisItems = spareParts.some(
    (p) => p.type === SparePartType.DIAGNOSIS
  );
  return (
    <div className="pb-6 mb-8 border-b border-gray-300">
      <div className="flex justify-between items-center mb-4 pt-4 px-2">
        <div className="flex items-center gap-3">
          <Link
            href={`/repair/mobile-phone/${device.company.toLowerCase()}/${
              device.slug
            }`}
            className="flex items-center gap-3 hover:opacity-80 transition-opacity"
            title={`View ${device.name} repair options`}
          >
            <Image
              src={device.images?.[0] || "/logos/logo.png"}
              alt={device.name}
              title={`${device.name} Logo`}
              width={40}
              height={40}
              className="rounded-md border bg-white object-contain"
            />
            <div className="flex flex-col">
              <span className="font-semibold text-lg text-black hover:text-blue-600 transition-colors">
                {device.name}
              </span>
              {hasRange && <PriceRangeInfo hasPriceRange={hasRange} />}
            </div>
          </Link>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={clearPartGroup}
          className="text-red-500 hover:text-red-700"
        >
          Remove All
        </Button>
      </div>
      <div className="space-y-3 mb-4">
        {spareParts.length > 0 ? (
          spareParts.map((item) => (
            <div
              key={item._id}
              className="flex items-center space-x-3 p-3 border-b border-gray-200 bg-gray-50"
            >
              <Image
                src={getSparePartsIcon(item.category)}
                alt={item.label}
                title={`${item.label} Icon`}
                width={36}
                height={36}
                className="object-contain"
              />
              <div className="flex-1 text-sm">
                <p className="text-gray-800 font-medium">{item.label}</p>
                <div className="flex items-center space-x-2">
                  <SparePartPriceDisplay part={item} />
                </div>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => removeFromCart(device._id, item._id)}
                aria-label="Remove item"
                className="text-red-400 hover:text-red-600"
              >
                <MdDelete className="size-5" />
              </Button>
            </div>
          ))
        ) : (
          <p className="text-gray-400 text-center">No items in cart</p>
        )}
      </div>
      <div className="bg-gray-100 p-4 border border-gray-200 mt-2">
        <div className="mb-2">
          {spareParts.map((item) => (
            <div
              key={item._id}
              className="flex justify-between text-gray-600 text-sm mb-1"
            >
              <span>{item.label.toLowerCase()}</span>
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
        <hr className="border-dashed my-2" />
        <div className="flex justify-between font-bold text-black text-base">
          <span>Total Price</span>
          <span className={hasRange ? "text-[#D2691E]" : "text-blue-600"}>
            ₹{getTotalPrice(device._id).toLocaleString()}
            {hasRange ? "*" : ""}
          </span>
        </div>
        {hasRange && (
          <div className="mt-2 text-xs text-[#D2691E]">
            <p>
              * Maximum estimated price. Final price will be confirmed by
              service partner.
            </p>
          </div>
        )}
        {(hasUnknownItems || hasDiagnosisItems) && (
          <div className="mt-2 text-xs text-[#D2691E]">
            <p>Price will be confirmed after order.</p>
          </div>
        )}
      </div>
      <div className="mt-4 flex justify-end">
        <BookNowCartBtn deviceSlug={device.slug} />
      </div>
    </div>
  );
}
