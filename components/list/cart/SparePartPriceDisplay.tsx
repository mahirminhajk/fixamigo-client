"use client";
import { getDiscountPercentage } from "@/lib/utils";
import { ISparePart, SparePartType } from "@/types";

interface SparePartPriceDisplayProps {
  part: ISparePart;
  compact?: boolean; // controls text sizing
}

export default function SparePartPriceDisplay({
  part,
  compact,
}: SparePartPriceDisplayProps) {
  if (part.type === SparePartType.UNKNOWN) {
    return (
      <span className="text-[#D2691E] font-semibold">Quote after order</span>
    );
  }
  if (part.type === SparePartType.DIAGNOSIS) {
    return (
      <span className="text-[#D2691E] font-semibold">
        Price after diagnosis
      </span>
    );
  }
  const showDiscount = !(
    part.price.range &&
    part.price.startPrice &&
    part.price.endPrice
  );
  return (
    <>
      {showDiscount && (
        <>
          <span
            className={`text-blue-600 font-semibold ${
              compact ? "text-sm" : ""
            }`}
          >
            -{getDiscountPercentage(part.price.total, part.price.final)}%
          </span>
          <span
            className={`text-gray-400 line-through ${compact ? "text-sm" : ""}`}
          >
            ₹{part.price.total}
          </span>
        </>
      )}
      <span
        className={`font-bold ${compact ? "text-base" : ""} ${
          part.price.range && part.price.startPrice && part.price.endPrice
            ? "text-[#D2691E]"
            : "text-black"
        }`}
      >
        {part.price.range && part.price.startPrice && part.price.endPrice
          ? `₹${part.price.startPrice} - ₹${part.price.endPrice}*`
          : `₹${part.price.final}`}
      </span>
    </>
  );
}
