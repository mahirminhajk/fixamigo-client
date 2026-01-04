import Image from "next/image";
import AddToCartBtn from "../buttons/addToCartBtn";
import WhereIsPriceInfo from "@/components/list/WhereIsPriceInfo";
import { ICartDevice, ISparePart, SparePartType } from "@/types";
import { getSparePartsIcon } from "@/lib/utils";

interface UnknownSparePartsProps {
  missingCategories: string[]; // category codes
  cartDevice: ICartDevice;
}

/**
 * Renders placeholder spare part cards for categories we don't yet have pricing for.
 * Allows user to add to cart so price can be shared manually later.
 */
export default function UnknownSpareParts({
  missingCategories,
  cartDevice,
}: UnknownSparePartsProps) {
  if (!missingCategories.length) return null;

  // Build placeholder spare parts
  const placeholderParts: ISparePart[] = missingCategories.map((cat) => {
    const label = cat
      .toLowerCase()
      .split("_")
      .map((p) => p.charAt(0).toUpperCase() + p.slice(1))
      .join(" ");
    return {
      _id: `unknown-${cartDevice._id}-${cat}`,
      label: `${label} Service`,
      name: `${label} Service`,
      category: cat,
      type: SparePartType.UNKNOWN,
      price: {
        total: 0,
        repair: 0,
        final: 0,
      },
    };
  });

  return (
    <div className="w-full max-w-md mx-auto lg:max-w-none p-4 mt-8">
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-lg font-bold">QUOTE AFTER ORDER</h2>
        <WhereIsPriceInfo />
      </div>
      <hr className="bg-black mb-4" />

      {/* Mobile */}
      <div className="lg:hidden space-y-3">
        {placeholderParts.map((item) => (
          <div
            key={item._id}
            className="rounded-[16px] border border-slate-200 bg-white px-2 py-4 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md"
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
                  <p className="text-xs text-amber-700 font-medium">
                    Price will be confirmed after booking
                  </p>
                </div>
              </div>
              <AddToCartBtn sparePart={item} cartDevice={cartDevice} />
            </div>
          </div>
        ))}
      </div>

      {/* Desktop */}
      <div className="hidden gap-4 lg:grid lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
        {placeholderParts.map((item) => (
          <div
            key={item._id}
            className="rounded-[16px] border border-slate-200 bg-white p-4 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-lg"
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
                  <p className="font-medium text-black text-sm">{item.label}</p>
                  <p className="text-[10px] text-amber-700 font-medium">
                    Price will be confirmed after booking
                  </p>
                </div>
              </div>
              <div className="flex items-center justify-end">
                <AddToCartBtn sparePart={item} cartDevice={cartDevice} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// (Removed inline placeholder; now using popover component.)
