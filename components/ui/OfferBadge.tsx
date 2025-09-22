import React from "react";

export interface OfferBadgeProps {
  type: "percentage" | "free_diagnosis";
  value: number; // For percentage: 12 means 12%, For free_diagnosis: 299 means ₹299 off
  className?: string;
  size?: "sm" | "md" | "lg";
}

export default function OfferBadge({
  type,
  value,
  className = "",
  size = "md",
}: OfferBadgeProps) {
  const sizeClasses = {
    sm: "px-2 py-1 text-[10px]",
    md: "px-3 py-1.5 text-xs",
    lg: "px-4 py-2 text-sm",
  };

  const baseClasses = `
    inline-flex items-center font-bold rounded-[6px]
    shadow-sm border animate-pulse
    ${sizeClasses[size]}
    ${className}
  `;

  if (type === "percentage") {
    return (
      <div
        className={`
        ${baseClasses}
        bg-gradient-to-r from-green-500 to-green-600 text-white
        border-green-400
      `}
      >
        <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
          <path
            fillRule="evenodd"
            d="M5.05 4.05a7 7 0 119.9 9.9L5.05 4.05zM6.464 5.464L13.536 12.536A5 5 0 106.464 5.464z"
            clipRule="evenodd"
          />
        </svg>
        {value}% OFF
      </div>
    );
  }

  if (type === "free_diagnosis") {
    return (
      <div
        className={`
        ${baseClasses}
        bg-gradient-to-r from-green-500 to-green-600 text-white
        border-green-400
      `}
      >
        <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
          <path
            fillRule="evenodd"
            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
            clipRule="evenodd"
          />
        </svg>
        ₹{value} OFF
      </div>
    );
  }

  return null;
}

// Wrapper component for corner positioning (matches your card design)
export function CornerOfferBadge({
  type,
  value,
  position = "top-right",
  className = "",
  size = "sm",
}: OfferBadgeProps & {
  position?: "top-right" | "top-left" | "bottom-right" | "bottom-left";
}) {
  const positionClasses = {
    "top-right": "-top-1 -right-1 sm:-top-2 sm:-right-2",
    "top-left": "-top-1 -left-1 sm:-top-2 sm:-left-2",
    "bottom-right": "-bottom-1 -right-1 sm:-bottom-2 sm:-right-2",
    "bottom-left": "-bottom-1 -left-1 sm:-bottom-2 sm:-left-2",
  };

  return (
    <div className={`absolute z-10 ${positionClasses[position]} ${className}`}>
      <OfferBadge type={type} value={value} size={size} />
    </div>
  );
}

// Inline offer badge for inside cards (matches your existing pricing style)
export function InlineOfferBadge({
  type,
  value,
  className = "",
  size = "sm",
}: OfferBadgeProps) {
  return (
    <div className={`flex justify-end mb-2 ${className}`}>
      <OfferBadge type={type} value={value} size={size} />
    </div>
  );
}

// Special FREE offer display for diagnosis services
export function FreeOfferBadge({
  value,
  className = "",
}: {
  value: number;
  className?: string;
}) {
  return (
    <div
      className={`
        inline-flex flex-col items-center justify-center
        bg-gradient-to-br from-green-500 to-green-600 text-white
        border border-green-400 rounded-[6px] shadow-sm
        px-3 py-2 font-bold text-center animate-pulse
        ${className}
      `}
    >
      <div className="text-lg leading-none">FREE</div>
      <div className="text-sm leading-none opacity-90 line-through">
        ₹{value}
      </div>
      <div className="text-[10px] leading-none opacity-80 mt-1">
        Limited Time Offer
      </div>
    </div>
  );
}
