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
import UserRegSheet from "../sheets/userRegSheet";
import { Sheet } from "@/components/ui/sheet";
import { useUserStore } from "@/stores/userStore";
import { useHydratedStore } from "@/hooks/useHydratedStore";
import { useState } from "react";

interface DiagnosisServicesProps {
  existingSpareParts: ISparePart[];
  cartDevice: ICartDevice;
}

// Mapping original raw names (could come from backend) to optimized labels & icon components
type IconType = React.ComponentType<{ className?: string }>;
const RAW_TO_OPTIMIZED: Record<string, { label: string; Icon: IconType }> = {
  "Dead Phone": { label: "No Power", Icon: Power },
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
  const [open, setOpen] = useState(false);
  const [pendingItem, setPendingItem] = useState<ISparePart | null>(null);
  const onOpenChange = () => setOpen((o) => !o);
  const onCompleted = () => {
    setOpen(false);
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
    const slug = label
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");
    return {
      _id: `diagnosis-${cartDevice._id}-${slug}`,
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
      <Sheet open={open} onOpenChange={onOpenChange}>
        <UserRegSheet onCompleted={onCompleted} />
      </Sheet>
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
          // FallbackIcon reserved for future network icon swap if lucide fails
          return (
            <div
              key={item._id}
              className="bg-gray-100 py-4 pr-2 rounded-[6px] shadow-sm"
            >
              <div className="flex items-center justify-between px-4">
                <div className="flex items-center">
                  <span className="mr-3">
                    <LucideIcon className="w-12 h-12 text-[#D2691E]" />
                  </span>
                  <div>
                    <p className="font-medium text-black">{item.label}</p>
                    <p className="text-xs text-amber-700 font-medium">
                      Price after diagnosis
                    </p>
                  </div>
                </div>
                {(() => {
                  const selected = cartItems.some(
                    (ci) =>
                      ci.device._id === cartDevice._id &&
                      ci.spareParts.some((sp) => sp._id === item._id)
                  );
                  return selected ? (
                    <Button
                      onClick={() => removeFromCart(cartDevice._id, item._id)}
                      variant="destructive"
                      className="text-[10px] px-3 py-1 h-7 rounded"
                    >
                      Remove
                    </Button>
                  ) : (
                    <Button
                      onClick={() => {
                        if (!user?._id) {
                          setPendingItem(item);
                          setOpen(true);
                          return;
                        }
                        clearCart();
                        addToCart(cartDevice, item);
                        router.push(
                          `/repair/checkout?device=${cartDevice.slug}`
                        );
                      }}
                      className="bg-black hover:bg-black/80 text-white font-semibold text-[10px] px-3 py-1 h-7 rounded"
                    >
                      Book Now
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
          // FallbackIcon reserved for future network icon swap if lucide fails
          return (
            <div
              key={item._id}
              className="bg-gray-100 p-4 rounded-[6px] shadow-sm hover:shadow-md transition-shadow duration-200"
            >
              <div className="flex flex-col space-y-3">
                <div className="flex items-center">
                  <span className="mr-3">
                    <LucideIcon className="w-10 h-10 text-[#D2691E]" />
                  </span>
                  <div className="flex-1">
                    <p className="font-medium text-black text-sm">
                      {item.label}
                    </p>
                    <p className="text-[10px] text-amber-700 font-medium">
                      Price after diagnosis
                    </p>
                  </div>
                </div>
                <div className="flex items-center justify-end">
                  {(() => {
                    const selected = cartItems.some(
                      (ci) =>
                        ci.device._id === cartDevice._id &&
                        ci.spareParts.some((sp) => sp._id === item._id)
                    );
                    return selected ? (
                      <Button
                        onClick={() => removeFromCart(cartDevice._id, item._id)}
                        variant="destructive"
                        className="text-xs px-3 py-1 h-7 rounded"
                      >
                        Remove
                      </Button>
                    ) : (
                      <Button
                        onClick={() => {
                          if (!user?._id) {
                            setPendingItem(item);
                            setOpen(true);
                            return;
                          }
                          clearCart();
                          addToCart(cartDevice, item);
                          router.push(
                            `/repair/checkout?device=${cartDevice.slug}`
                          );
                        }}
                        className="bg-black hover:bg-black/80 text-white text-xs font-semibold"
                      >
                        Book Now
                      </Button>
                    );
                  })()}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
