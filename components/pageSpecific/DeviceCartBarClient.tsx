"use client";
import Link from "next/link";
import { useCartStore } from "@/stores/cartStore";
import { useHydratedStore } from "@/hooks/useHydratedStore";
import React from "react";
import { usePathname } from "next/navigation";

export default function DeviceCartBarClient() {
  // Hydrate cart state for SSR/CSR safety
  const cart = useHydratedStore(useCartStore, (state) => state.cart);
  const getTotalPrice = useCartStore((state) => state.getTotalPrice);
  const hasRangeItems = useCartStore((state) => state.hasRangeItems);
  const isCartEmpty = useCartStore((state) => state.isCartEmpty);
  const pathname = usePathname();

  // Extract deviceSlug from the URL (assuming /repair/mobile-phone/[brand]/[deviceSlug])
  let deviceSlug: string | undefined = undefined;
  if (pathname) {
    const parts = pathname.split("/");
    const idx = parts.findIndex((p) => p === "mobile-phone");
    if (idx !== -1 && parts.length > idx + 2) {
      deviceSlug = parts[idx + 2];
    }
  }

  // Only show if cart is hydrated, not empty, and deviceSlug is present
  if (!cart || isCartEmpty() || !deviceSlug) return null;

  // Find the cart item for this device by slug
  const cartItem = cart.items?.find((item) => item.device.slug === deviceSlug);
  if (!cartItem) return null;

  const total = getTotalPrice(cartItem.device._id);
  const hasRangeItemsForDevice = hasRangeItems(cartItem.device._id);
  if (total === 0) return null;

  return (
    <div
      className="fixed bottom-0 left-0 w-full flex justify-center pointer-events-none z-50 lg:bottom-6 lg:right-6 lg:left-auto lg:w-auto"
      style={{
        transition: "opacity 0.3s, transform 0.3s",
        opacity: 1,
        transform: "translateY(0)",
      }}
    >
      {/* Mobile Layout - Full width bottom bar */}
      <div className="lg:hidden w-full max-w-[500px] bg-white py-3 px-4 border shadow-md flex justify-between items-center rounded-t-[12px] pointer-events-auto">
        <div className="flex flex-col justify-between h-full">
          <p
            className="font-bold text-xl mb-1"
            style={{
              color: hasRangeItemsForDevice ? "#D2691E" : "black",
            }}
          >
            ₹{total}
            {hasRangeItemsForDevice ? "*" : ""}
          </p>
          {hasRangeItemsForDevice && (
            <p className="text-xs mb-1" style={{ color: "#D2691E" }}>
              Max estimated price
            </p>
          )}
          <p className="text-gray-600 text-xs mt-2">
            By clicking <span className="font-semibold">Book now</span>, you
            agree with our{" "}
            <Link
              href="/terms-and-conditions"
              className="text-blue-600 underline"
            >
              Terms and Conditions
            </Link>
          </p>
        </div>
        <Link
          href="/repair/checkout"
          className="flex items-center gap-2 bg-black text-white py-3 px-5 rounded-[6px] font-semibold ml-4"
        >
          Book Now
          <span
            style={{ display: "inline-block", transform: "translateY(2px)" }}
          >
            &rarr;
          </span>
        </Link>
      </div>

      {/* Desktop Layout - Floating action button */}
      <div className="hidden lg:block pointer-events-auto">
        <div className="bg-white border border-gray-200 rounded-[12px] shadow-lg p-4 min-w-[280px]">
          <div className="flex items-center justify-between mb-3">
            <div>
              <p className="text-sm text-gray-600">Total Amount</p>
              <p
                className="font-bold text-2xl"
                style={{
                  color: hasRangeItemsForDevice ? "#D2691E" : "black",
                }}
              >
                ₹{total}
                {hasRangeItemsForDevice ? "*" : ""}
              </p>
              {hasRangeItemsForDevice && (
                <p className="text-xs" style={{ color: "#D2691E" }}>
                  Max estimated price
                </p>
              )}
            </div>
            <div className="text-right">
              <p className="text-xs text-gray-500 mb-1">
                {cartItem.spareParts.length} item(s)
              </p>
              <Link
                href="/repair/checkout"
                className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-6 rounded-[6px] font-semibold transition-colors duration-200 inline-flex items-center gap-2"
              >
                Book Now
                <span>&rarr;</span>
              </Link>
            </div>
          </div>
          <p className="text-xs text-gray-500">
            By booking, you agree with our{" "}
            <Link
              href="/terms-and-conditions"
              className="text-blue-600 underline hover:text-blue-700"
            >
              Terms and Conditions
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
