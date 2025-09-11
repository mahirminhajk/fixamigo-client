"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { brands } from "@/constants";

interface HighlightedBrandProps {
  category?: string; // repair category, defaults to mobile-phone
}

// Simple UA brand patterns – can be expanded
const BRAND_PATTERNS: { key: string; patterns: RegExp[] }[] = [
  { key: "apple", patterns: [/iphone/i, /ipad/i, /macintosh/i] },
  { key: "samsung", patterns: [/samsung/i, /sm-\w+/i, /galaxy/i] },
  { key: "xiaomi", patterns: [/xiaomi/i, /mi\s?[0-9]/i, /redmi/i, /poco/i] },
  { key: "oneplus", patterns: [/oneplus/i] },
  { key: "realme", patterns: [/realme/i] },
  { key: "oppo", patterns: [/oppo/i] },
  { key: "vivo", patterns: [/vivo/i] },
  { key: "motorola", patterns: [/moto/i, /motorola/i] },
  { key: "nothing", patterns: [/nothing/i] },
  { key: "nokia", patterns: [/nokia/i] },
  { key: "sony", patterns: [/sony/i, /xperia/i] },
  { key: "huawei", patterns: [/huawei/i, /honor/i] },
  { key: "lg", patterns: [/lg-/i, /lg /i] },
  { key: "iqoo", patterns: [/iqoo/i] },
];

function detectBrandSlug(ua: string): string | undefined {
  for (const entry of BRAND_PATTERNS) {
    if (entry.patterns.some((p) => p.test(ua))) return entry.key;
  }
  return undefined;
}

export const HighlightedBrand: React.FC<HighlightedBrandProps> = ({
  category = "mobile-phone",
}) => {
  const [brandSlug, setBrandSlug] = useState<string | undefined>();

  useEffect(() => {
    try {
      const ua = window.navigator.userAgent;
      const detected = detectBrandSlug(ua);
      setBrandSlug(detected);
    } catch {
      // ignore
    }
  }, []);

  const brand = useMemo(
    () => brands.find((b) => b.slug === brandSlug),
    [brandSlug]
  );

  if (!brand) return null;

  return (
    <div className="mb-6 md:mb-8">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-lg md:text-xl font-semibold text-gray-900">
          Your Device Brand
        </h3>
        <span className="text-xs md:text-sm text-gray-500">Auto‑detected</span>
      </div>
      <Link
        href={`/repair/${category}/${brand.slug}`}
        className="group relative flex items-center gap-4 p-4 md:p-5 rounded-2xl border-2 border-gray-200 bg-white
                   shadow-md hover:shadow-xl transition-all duration-300 hover:border-[#D2691E]
                   hover:bg-gradient-to-br hover:from-orange-50 hover:to-orange-100 focus:outline-none focus:ring-4 focus:ring-[#D2691E]/40"
        title={`Go to ${brand.name} repair models`}
      >
        <div className="relative w-16 h-16 md:w-20 md:h-20 flex items-center justify-center">
          <Image
            src={brand.image}
            alt={`${brand.name} logo`}
            width={120}
            height={120}
            className="object-contain max-w-full max-h-full transition-transform duration-300 group-hover:scale-110"
          />
        </div>
        <div className="flex-1">
          <h4 className="text-base md:text-lg font-bold text-gray-800 group-hover:text-[#D2691E] transition-colors">
            {brand.name}
          </h4>
          <p className="text-xs md:text-sm text-gray-600">
            Quick access to {brand.name} repair models & common services.
          </p>
        </div>
        <div className="ml-auto text-[#D2691E] group-hover:translate-x-1 transition-transform">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 5l7 7-7 7"
            />
          </svg>
        </div>
      </Link>
    </div>
  );
};

export default HighlightedBrand;
