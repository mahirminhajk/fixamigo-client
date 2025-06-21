"use client";
import Link from "next/link";
import { useCartStore } from "@/stores/cartStore";
import { useHydratedStore } from "@/hooks/useHydratedStore";
import React from "react";

export default function DeviceCartBarClient() {
  // Hydrate cart state for SSR/CSR safety
  const cart = useHydratedStore(useCartStore, (state) => state.cart);
  const getTotalPrice = useCartStore((state) => state.getTotalPrice);
  const isCartEmpty = useCartStore((state) => state.isCartEmpty);

  // Only show if cart is hydrated and not empty
  if (!cart || isCartEmpty()) return null;

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
          <p className="text-black font-bold text-xl mb-1">
            ₹{getTotalPrice()}
          </p>
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
