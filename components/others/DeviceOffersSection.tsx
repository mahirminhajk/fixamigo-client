"use client";
import React, { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { getSparePartsIcon } from "@/lib/utils";
import { CornerOfferBadge, FreeOfferBadge } from "../ui/OfferBadge";
import { Stethoscope, Wrench } from "lucide-react";
import { ISparePart, SparePartType, ICartDevice } from "@/types";
import {
  getSparePartOffer,
  getDiagnosisOffer,
  calculateDiscountedPrice,
} from "@/lib/offers";
import { useCartStore } from "@/stores/cartStore";
import { useRouter } from "next/navigation";
import { useAuthSheet } from "@/hooks/useAuthSheet";
import { useUserStore } from "@/stores/userStore";
import { useHydratedStore } from "@/hooks/useHydratedStore";

interface DeviceOffersSectionProps {
  deviceSlug: string;
  spareParts: ISparePart[];
  cartDevice: ICartDevice;
  className?: string;
}

export default function DeviceOffersSection({
  deviceSlug,
  spareParts,
  cartDevice,
  className = "",
}: DeviceOffersSectionProps) {
  const addToCart = useCartStore((s) => s.addToCart);
  const clearCart = useCartStore((s) => s.clearCart);
  const router = useRouter();
  const user = useHydratedStore(useUserStore, (s) => s.user);
  const { openAuth } = useAuthSheet();
  const [pendingItem, setPendingItem] = useState<ISparePart | null>(null);

  const onCompleted = () => {
    if (pendingItem) {
      clearCart();
      addToCart(cartDevice, pendingItem);
      router.push(`/repair/checkout?device=${cartDevice.slug}`);
      setPendingItem(null);
    }
  };
  // Check if there's a display spare part that's not a range
  const displayPart = spareParts.find(
    (part) => part.category === "DISPLAY" && !part.price.range
  );
  const displayOffer = displayPart
    ? getSparePartOffer(deviceSlug, "DISPLAY")
    : null;

  // Check for diagnosis offer
  const diagnosisOffer = getDiagnosisOffer(deviceSlug, "Dead Phone");

  // Create diagnosis spare part if offer exists
  const diagnosisItem: ISparePart | null = diagnosisOffer
    ? {
        _id: `diagnosis-${cartDevice._id}-dead_phone`,
        label: "Dead Phone",
        name: "Dead Phone",
        category: "DIAGNOSIS",
        type: SparePartType.DIAGNOSIS,
        price: { total: 0, repair: 0, final: 0 },
      }
    : null;

  // If no offers available, don't render the section
  if (!displayOffer && !diagnosisOffer) {
    return null;
  }

  return (
    <div className={`w-full max-w-md mx-auto lg:max-w-none ${className}`}>
      {/* Offers Grid */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-6">
        {/* Dead Phone Diagnosis Offer - Show First */}
        {diagnosisOffer && (
          <div className="rounded-[16px] border border-slate-200 bg-white p-4 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-lg">
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0 bg-green-100 p-2 rounded-full">
                <Stethoscope className="w-8 h-8 text-green-600" />
              </div>

              <div className="flex-1">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="font-semibold text-black text-sm mb-1">
                      Dead Phone
                    </h3>
                    <p className="text-xs text-gray-600 mb-3">
                      Complete device checkup for dead phones
                    </p>
                  </div>

                  <div className="ml-2">
                    <FreeOfferBadge
                      value={diagnosisOffer.freeAmount}
                      className="text-xs"
                    />
                  </div>
                </div>

                <div className="flex items-center space-x-1 mb-3">
                  <Stethoscope className="w-3 h-3 text-green-600" />
                  <span className="text-xs text-green-600 font-medium">
                    Usually ₹{diagnosisOffer.freeAmount} - Now FREE!
                  </span>
                </div>

                <Button
                  onClick={() => {
                    if (!diagnosisItem) return;

                    if (!user?._id) {
                      setPendingItem(diagnosisItem);
                      openAuth({ onCompleted });
                      return;
                    }
                    clearCart();
                    addToCart(cartDevice, diagnosisItem);
                    router.push(`/repair/checkout?device=${cartDevice.slug}`);
                  }}
                  className="w-full rounded-full bg-gradient-to-r from-emerald-500 to-green-600 px-3 py-2 text-[10px] font-semibold text-white shadow-lg shadow-green-600/20 transition-all duration-200 hover:-translate-y-0.5 hover:from-emerald-400 hover:to-green-500 h-8"
                >
                  Book Free Diagnosis
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Display Spare Part Offer - Show Only if Available and Not Range */}
        {displayPart && displayOffer && (
          <div className="relative rounded-[16px] border border-slate-200 bg-white p-4 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-lg">
            <CornerOfferBadge
              type="percentage"
              value={displayOffer.discountPercentage}
              position="top-right"
              size="sm"
            />

            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0">
                <Image
                  src={getSparePartsIcon("DISPLAY")}
                  alt="Display Replacement"
                  width={48}
                  height={48}
                  className="object-contain"
                />
              </div>

              <div className="flex-1">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-semibold text-black text-sm mb-1">
                      {displayPart.label}
                    </h3>
                    <div className="flex items-center space-x-2 text-sm mb-2">
                      <span className="line-through text-gray-500">
                        ₹{displayPart.price.final}
                      </span>
                      <span className="font-bold text-black">
                        ₹
                        {
                          calculateDiscountedPrice(
                            displayPart.price.final,
                            displayOffer.discountPercentage
                          ).discountedPrice
                        }
                      </span>
                    </div>
                    <div className="flex items-center space-x-1 mb-2">
                      <Wrench className="w-3 h-3 text-green-600" />
                      <span className="text-xs text-green-600 font-medium">
                        Save ₹
                        {
                          calculateDiscountedPrice(
                            displayPart.price.final,
                            displayOffer.discountPercentage
                          ).savedAmount
                        }{" "}
                        with {displayOffer.discountPercentage}% OFF
                      </span>
                    </div>
                    <p className="text-xs text-gray-600">
                      Premium quality display replacement
                    </p>
                  </div>
                </div>

                <Button className="mt-3 h-8 w-full rounded-full bg-gradient-to-r from-sky-600 to-indigo-600 px-3 py-2 text-[10px] font-semibold text-white shadow-md shadow-sky-600/20 transition-all duration-200 hover:-translate-y-0.5 hover:from-sky-500 hover:to-indigo-500">
                  Add to Cart
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
