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
  if (total === 0) return null;

  return (
    <div
      className="fixed bottom-0 left-0 w-full flex justify-center pointer-events-none z-50"
      style={{
        transition: "opacity 0.3s, transform 0.3s",
        opacity: 1,
        transform: "translateY(0)",
      }}
    >
      <div className="w-full max-w-[500px] bg-white py-3 px-4 border shadow-md flex justify-between items-center rounded-t-[12px] pointer-events-auto">
        <div className="flex flex-col justify-between h-full">
          <p className="text-black font-bold text-xl mb-1">₹{total}</p>
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
    </div>
  );
}
