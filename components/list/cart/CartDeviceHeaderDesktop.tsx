"use client";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { MdDelete } from "react-icons/md";
import { ICartDevice, ISparePart } from "@/types";
import { useCartStore } from "@/stores/cartStore";
import PriceRangeInfo from "../PriceRangeInfo";

interface CartDeviceHeaderDesktopProps {
  device: ICartDevice;
  spareParts: ISparePart[];
  hasRange: boolean;
}

export default function CartDeviceHeaderDesktop({
  device,
  spareParts,
  hasRange,
}: CartDeviceHeaderDesktopProps) {
  const removeFromCart = useCartStore((s) => s.removeFromCart);
  return (
    <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
      <div className="flex justify-between items-center">
        <Link
          href={`/repair/mobile-phone/${device.company.toLowerCase()}/${
            device.slug
          }`}
          className="flex items-center gap-4 hover:opacity-80 transition-opacity"
          title={`View ${device.name} repair options`}
        >
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
        </Link>
        <Button
          variant="outline"
          onClick={() => {
            spareParts.forEach((sp) => removeFromCart(device._id, sp._id));
          }}
          className="text-red-500 hover:text-red-700 hover:bg-red-50 border-red-200"
        >
          <MdDelete className="mr-2 h-4 w-4" />
          Remove All Items
        </Button>
      </div>
    </div>
  );
}
