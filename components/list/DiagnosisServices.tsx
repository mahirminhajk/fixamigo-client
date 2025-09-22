"use client";
import { ICartDevice, ISparePart, SparePartType } from "@/types";
import {
  Droplet,
  WifiOff,
  Fingerprint,
  HelpCircle,
  Power,
  Radio,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/stores/cartStore";
import { useRouter } from "next/navigation";
import { useAuthSheet } from "@/hooks/useAuthSheet";
import { useUserStore } from "@/stores/userStore";
import { useHydratedStore } from "@/hooks/useHydratedStore";
import { useState } from "react";
import { FreeOfferBadge } from "../ui/OfferBadge";
import { getDiagnosisOffer } from "@/lib/offers";

interface DiagnosisServicesProps {
  existingSpareParts: ISparePart[];
  cartDevice: ICartDevice;
}

// Mapping original raw names (could come from backend) to optimized labels & icon components
type IconType = React.ComponentType<{ className?: string }>;
const RAW_TO_OPTIMIZED: Record<string, { label: string; Icon: IconType }> = {
  "Dead Phone": { label: "Dead Phone", Icon: Power },
  "Water damage": { label: "Liquid Damage", Icon: Droplet },
  "No network signal": { label: "No Signal", Icon: Radio },
  "Wifi or Bluetooth not turning on": {
    label: "WiFi/Bluetooth Issue",
    Icon: WifiOff,
  },
  "Face ID/ fingerprint sensor not working": {
    label: "Biometric Issue",
    Icon: Fingerprint,
  },
  "Other Diagnose": { label: "Other Issues", Icon: HelpCircle },
};

// Potential future fallback usage (currently not required after switching to direct lucide icons)

const DIAGNOSIS_SERVICE_NAMES = Object.keys(RAW_TO_OPTIMIZED);

export default function DiagnosisServices({
  existingSpareParts,
  cartDevice,
}: DiagnosisServicesProps) {
  const addToCart = useCartStore((s) => s.addToCart);
  const clearCart = useCartStore((s) => s.clearCart);
  const removeFromCart = useCartStore((s) => s.removeFromCart);
  // Subscribe to cart items to ensure component re-renders when cart changes
  const cartItems = useCartStore((s) => s.cart.items);
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
  const existingLabels = (existingSpareParts || []).map((sp) =>
    sp.label.toLowerCase()
  );

  const diagnosisParts: ISparePart[] = DIAGNOSIS_SERVICE_NAMES.filter(
    (raw) => !existingLabels.includes(raw.toLowerCase())
  ).map((raw) => {
    const meta = RAW_TO_OPTIMIZED[raw];
    const label = meta?.label || raw;
    // Build idLabel: lowercase, spaces -> underscore, remove non alphanum/underscore, collapse repeats
    const idLabel = label
      .toLowerCase()
      .trim()
      .replace(/\s+/g, "_")
      .replace(/[^a-z0-9_]/g, "_")
      .replace(/_+/g, "_");
    return {
      _id: `diagnosis-${cartDevice._id}-${idLabel}`,
      label,
      name: label,
      category: "DIAGNOSIS",
      type: SparePartType.DIAGNOSIS,
      price: { total: 0, repair: 0, final: 0 },
    } as ISparePart;
  });

  if (!diagnosisParts.length) return null;

  return (
    <div className="w-full max-w-md mx-auto lg:max-w-none p-4 mt-8">
      {/* Auth sheet is global via provider */}
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-lg font-bold">CHECK &amp; DIAGNOSE</h2>
      </div>
      <hr className="bg-black mb-4" />

      {/* Mobile */}
      <div className="lg:hidden space-y-3">
        {diagnosisParts.map((item) => {
          const raw = Object.keys(RAW_TO_OPTIMIZED).find(
            (k) => RAW_TO_OPTIMIZED[k].label === item.label
          );
          const LucideIcon = raw ? RAW_TO_OPTIMIZED[raw].Icon : HelpCircle;

          // Check if this diagnosis service has a free offer
          const diagnosisOffer = getDiagnosisOffer(cartDevice.slug, item.label);
          const hasFreeOffer = !!diagnosisOffer;

          return (
            <div
              key={item._id}
              className={`p-4 rounded-[6px] shadow-sm ${
                hasFreeOffer
                  ? "bg-gradient-to-r from-green-50 to-green-100 border border-green-200"
                  : "bg-gray-100"
              }`}
            >
              {/* Top row: Icon + Title + Badge */}
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center flex-1">
                  <span className="mr-3">
                    <LucideIcon
                      className={`w-10 h-10 ${
                        hasFreeOffer ? "text-green-600" : "text-[#D2691E]"
                      }`}
                    />
                  </span>
                  <div className="flex-1">
                    <p
                      className={`font-medium text-sm ${
                        hasFreeOffer ? "text-green-800" : "text-black"
                      }`}
                    >
                      {item.label}
                    </p>
                    {hasFreeOffer ? (
                      <p className="text-xs text-green-600 font-bold mt-1">
                        Usually ₹{diagnosisOffer.freeAmount} - Now FREE!
                      </p>
                    ) : (
                      <p className="text-xs text-amber-700 font-medium mt-1">
                        Price after diagnosis
                      </p>
                    )}
                  </div>
                </div>

                {/* Free offer badge */}
                {hasFreeOffer && (
                  <div className="ml-2">
                    <FreeOfferBadge
                      value={diagnosisOffer.freeAmount}
                      className="text-xs"
                    />
                  </div>
                )}
              </div>

              {/* Bottom row: Button */}
              <div className="flex justify-end">
                {(() => {
                  const selected = cartItems.some(
                    (ci) =>
                      ci.device._id === cartDevice._id &&
                      ci.spareParts.some(
                        (sp) =>
                          sp.type === SparePartType.DIAGNOSIS &&
                          sp.label === item.label
                      )
                  );
                  return selected ? (
                    <Button
                      onClick={() => {
                        const target = cartItems
                          .find((ci) => ci.device._id === cartDevice._id)
                          ?.spareParts.find(
                            (sp) =>
                              sp.type === SparePartType.DIAGNOSIS &&
                              sp.label === item.label
                          );
                        if (target) {
                          removeFromCart(cartDevice._id, target._id);
                        }
                      }}
                      variant="destructive"
                      className="text-xs px-4 py-2 h-8 rounded"
                    >
                      Remove
                    </Button>
                  ) : (
                    <Button
                      onClick={() => {
                        if (!user?._id) {
                          setPendingItem(item);
                          openAuth({ onCompleted });
                          return;
                        }
                        clearCart();
                        addToCart(cartDevice, item);
                        router.push(
                          `/repair/checkout?device=${cartDevice.slug}`
                        );
                      }}
                      className={`font-semibold text-xs px-4 py-2 h-8 rounded ${
                        hasFreeOffer
                          ? "bg-green-600 hover:bg-green-700 text-white"
                          : "bg-black hover:bg-black/80 text-white"
                      }`}
                    >
                      {hasFreeOffer ? "Book FREE" : "Book Now"}
                    </Button>
                  );
                })()}
              </div>
            </div>
          );
        })}
      </div>

      {/* Desktop */}
      <div className="hidden lg:grid lg:grid-cols-2 xl:grid-cols-3 gap-4">
        {diagnosisParts.map((item) => {
          const raw = Object.keys(RAW_TO_OPTIMIZED).find(
            (k) => RAW_TO_OPTIMIZED[k].label === item.label
          );
          const LucideIcon = raw ? RAW_TO_OPTIMIZED[raw].Icon : HelpCircle;

          // Check if this diagnosis service has a free offer
          const diagnosisOffer = getDiagnosisOffer(cartDevice.slug, item.label);
          const hasFreeOffer = !!diagnosisOffer;

          return (
            <div
              key={item._id}
              className={`p-4 rounded-[6px] shadow-sm hover:shadow-md transition-all duration-200 min-h-[140px] flex flex-col ${
                hasFreeOffer
                  ? "bg-gradient-to-br from-green-50 to-green-100 border border-green-200 ring-1 ring-green-300"
                  : "bg-gray-100"
              }`}
            >
              {/* Top section: Icon + Title + Badge */}
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-start flex-1">
                  <span className="mr-3">
                    <LucideIcon
                      className={`w-10 h-10 ${
                        hasFreeOffer ? "text-green-600" : "text-[#D2691E]"
                      }`}
                    />
                  </span>
                  <div className="flex-1">
                    <p
                      className={`font-medium text-sm ${
                        hasFreeOffer ? "text-green-800" : "text-black"
                      }`}
                    >
                      {item.label}
                    </p>
                    {hasFreeOffer ? (
                      <div className="space-y-1 mt-1">
                        <p className="text-xs text-green-600 font-bold">
                          Usually ₹{diagnosisOffer.freeAmount}
                        </p>
                        <p className="text-xs text-green-600 font-medium">
                          Now FREE! Limited time offer
                        </p>
                      </div>
                    ) : (
                      <p className="text-xs text-amber-700 font-medium mt-1">
                        Price after diagnosis
                      </p>
                    )}
                  </div>
                </div>

                {/* Free offer badge */}
                {hasFreeOffer && (
                  <div className="ml-2">
                    <FreeOfferBadge
                      value={diagnosisOffer.freeAmount}
                      className="text-xs"
                    />
                  </div>
                )}
              </div>

              {/* Bottom section: Button - pushed to bottom */}
              <div className="mt-auto">
                {(() => {
                  const selected = cartItems.some(
                    (ci) =>
                      ci.device._id === cartDevice._id &&
                      ci.spareParts.some(
                        (sp) =>
                          sp.type === SparePartType.DIAGNOSIS &&
                          sp.label === item.label
                      )
                  );
                  return selected ? (
                    <Button
                      onClick={() => {
                        const target = cartItems
                          .find((ci) => ci.device._id === cartDevice._id)
                          ?.spareParts.find(
                            (sp) =>
                              sp.type === SparePartType.DIAGNOSIS &&
                              sp.label === item.label
                          );
                        if (target) {
                          removeFromCart(cartDevice._id, target._id);
                        }
                      }}
                      variant="destructive"
                      className="text-xs px-3 py-2 h-8 rounded w-full"
                    >
                      Remove
                    </Button>
                  ) : (
                    <Button
                      onClick={() => {
                        if (!user?._id) {
                          setPendingItem(item);
                          openAuth({ onCompleted });
                          return;
                        }
                        clearCart();
                        addToCart(cartDevice, item);
                        router.push(
                          `/repair/checkout?device=${cartDevice.slug}`
                        );
                      }}
                      className={`text-xs font-semibold px-3 py-2 h-8 rounded w-full ${
                        hasFreeOffer
                          ? "bg-green-600 hover:bg-green-700 text-white"
                          : "bg-black hover:bg-black/80 text-white"
                      }`}
                    >
                      {hasFreeOffer ? "Book FREE" : "Book Now"}
                    </Button>
                  );
                })()}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
