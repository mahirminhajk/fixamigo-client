import React from "react";
import { hasActiveOffers } from "@/lib/offers";

interface SpecialOffersSectionProps {
  deviceSlug: string;
  className?: string;
}

// Special offers promotional section to be displayed prominently
export default function SpecialOffersSection({
  deviceSlug,
  className = "",
}: SpecialOffersSectionProps) {
  const hasOffers = hasActiveOffers(deviceSlug);

  if (!hasOffers) return null;

  return (
    <div
      className={`bg-gradient-to-r from-red-50 to-orange-50 border border-red-200 rounded-[6px] p-4 lg:p-6 shadow-sm ${className}`}
    >
      {/* Mobile Layout */}
      <div className="lg:hidden text-center">
        <div className="flex items-center justify-center mb-2">
          <span className="text-lg mr-2">🎉</span>
          <h2 className="text-lg font-bold text-red-700">Special Offers!</h2>
        </div>
        <p className="text-red-600 font-medium text-sm">
          Limited time offers available on selected services
        </p>
      </div>

      {/* Desktop Layout */}
      <div className="hidden lg:block text-center">
        <div className="flex items-center justify-center mb-3">
          <span className="text-2xl mr-3">🎉</span>
          <h2 className="text-2xl font-bold text-red-700">
            Special Offers Available!
          </h2>
        </div>
        <p className="text-red-600 font-medium">
          Limited time offers on selected services - Save up to ₹500 on repairs
          & get free diagnosis
        </p>
      </div>
    </div>
  );
}
