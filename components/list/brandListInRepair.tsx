"use client";

import Image from "next/image";
import Link from "next/link";
import { brands } from "@/constants";

interface Brand {
  name: string;
  slug: string;
  image: string;
  repairs?: string[];
}

interface BrandsListProps {
  category?: string;
}

const BrandListInRepair = ({ category = "mobile-phone" }: BrandsListProps) => {
  const initialDisplayCount = 12;

  // Filter brands that support the category
  const filteredBrands = brands.filter((brand: Brand) =>
    brand.repairs?.includes(category)
  );

  // Use filtered or fallback to full list
  const displaySource = filteredBrands.length > 0 ? filteredBrands : brands;

  const displayedBrands = displaySource.slice(0, initialDisplayCount);

  // Check if there are more brands than the display limit
  const hasMoreBrands = brands.length > initialDisplayCount;

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-center text-black">
        Select your brand
      </h2>

      <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
        {displayedBrands.map((brand) => (
          <Link
            key={brand.slug}
            href={`/repair/${category}/${brand.slug}`}
            className="bg-[#f8f8f8] rounded-md flex flex-col items-center justify-center p-4 aspect-square"
          >
            <Image
              src={brand.image}
              alt={`${brand.name} logo`}
              width={64}
              height={64}
              className="object-contain max-w-full max-h-full mb-2"
            />
            <p className="text-sm font-medium text-black">{brand.name}</p>
          </Link>
        ))}
      </div>

      {hasMoreBrands && (
        <div className="text-center mt-2">
          <Link
            href={`/repair/${category}/all-brands`}
            className="text-sm text-gray-500 hover:underline"
          >
            More brands.....
          </Link>
        </div>
      )}
    </div>
  );
};

export default BrandListInRepair;
