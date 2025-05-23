"use client";

import { useState, useMemo } from "react";
import { brands } from "@/constants";
import Image from "next/image";
import Link from "next/link";

interface BrandsListProps {
  variant: "all" | "min";
  category?: string;
}

const BrandsList = ({
  variant,
  category = "mobile-phone",
}: BrandsListProps) => {
  const [searchTerm, setSearchTerm] = useState("");

  const allBrands = useMemo(() => {
    return brands;
  }, []);

  const filteredBrands = useMemo(() => {
    return allBrands.filter((brand) =>
      brand.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [allBrands, searchTerm]);

  const displayedBrands = useMemo(() => {
    if (variant === "min") {
      return filteredBrands.slice(0, 10); //TODO: Adjust this number as needed for smaller view (less), and big view higher.
    }
    return filteredBrands;
  }, [filteredBrands, variant]);

  return (
    <div className="w-full py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-extrabold text-gray-900 text-center mb-4 tracking-tight">
          {category === "mobile-phone"
            ? "Select Your Phone Brand"
            : `Select Your Brand for ${category} Repair`}
        </h1>
        <p className="text-center text-gray-600 mb-8 max-w-2xl mx-auto">
          Find the brand of your device to get started with our repair services.
          We support a wide range of manufacturers.
        </p>

        {variant === "all" && (
          <div className="mb-8 max-w-xl mx-auto">
            <input
              type="text"
              placeholder="Search for a brand... (e.g., Apple, Samsung)"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-3 text-gray-700 bg-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-150 ease-in-out"
            />
          </div>
        )}

        {displayedBrands.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-10 text-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-16 w-16 text-gray-400 mb-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7"
              />
            </svg>
            <p className="text-xl text-gray-600">
              {searchTerm
                ? `No brands found for "${searchTerm}"`
                : "No brands available."}
            </p>
            {searchTerm && (
              <p className="text-md text-gray-500 mt-1">
                Try a different search term.
              </p>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-5 gap-y-4 gap-x-6 sm:gap-y-6 sm:gap-x-10 items-stretch justify-center">
            {displayedBrands.map((brand) => (
              <Link
                key={brand.slug}
                href={`/repair/${category}/${brand.slug}`}
                className="group bg-white border border-gray-200 rounded-lg shadow-sm flex flex-col items-center justify-center text-center p-2 sm:p-3 md:p-4 
                           transition-all duration-300 ease-in-out hover:shadow-xl hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 aspect-[4/3]"
              >
                <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 flex items-center justify-center mb-1 sm:mb-2 transition-transform duration-300 ease-in-out group-hover:scale-110">
                  <Image
                    src={brand.image}
                    alt={`${brand.name} logo`}
                    width={80} // Max width, object-contain will handle scaling within the div
                    height={80} // Max height
                    className="object-contain max-w-full max-h-full"
                  />
                </div>
                <p className="text-xs sm:text-sm md:text-base font-semibold text-gray-800 group-hover:text-blue-600 transition-colors duration-200">
                  {brand.name}
                </p>
              </Link>
            ))}
          </div>
        )}

        {variant === "min" && displayedBrands.length > 0 && (
          <div className="text-center mt-8">
            <Link href={`/repair/${category}`} legacyBehavior>
              <a className="inline-block px-6 py-3 text-sm font-medium text-white bg-blue-600 rounded-lg shadow hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-colors">
                View All Brands
              </a>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default BrandsList;
