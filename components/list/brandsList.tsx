"use client";

import { useState, useMemo, useEffect } from "react";
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
  // Track current grid columns based on Tailwind breakpoints to ensure full rows in "min" variant
  const [cols, setCols] = useState<number>(2);

  useEffect(() => {
    const getColsForWidth = (w: number) => {
      if (w >= 1280) return 6; // xl
      if (w >= 1024) return 5; // lg
      if (w >= 768) return 4; // md
      if (w >= 640) return 3; // sm
      return 2; // base
    };

    const updateCols = () => setCols(getColsForWidth(window.innerWidth));
    // Initialize on mount
    updateCols();
    // Update on resize
    window.addEventListener("resize", updateCols);
    return () => window.removeEventListener("resize", updateCols);
  }, []);

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
      // Show up to N full rows (cap), based on current column count; if less than a row exists, show what's available
      const rowsCap = 2; // number of rows to show in mini variant
      const maxItemsByRows = cols * rowsCap;
      const capped = Math.min(filteredBrands.length, maxItemsByRows);
      const fullRowsCount = Math.floor(capped / cols) * cols;
      const count =
        fullRowsCount === 0
          ? Math.min(filteredBrands.length, cols)
          : fullRowsCount;
      return filteredBrands.slice(0, count);
    }
    return filteredBrands;
  }, [filteredBrands, variant, cols]);

  return (
    <section className="w-full py-8 md:py-12">
      <div className="container mx-auto px-4">
        {/* Header Section */}
        <div className="text-center mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3 tracking-tight">
            {category === "mobile-phone"
              ? "Select Your Phone Brand"
              : `Select Your Brand for ${category} Repair`}
          </h1>
          <p className="text-gray-600 text-base md:text-lg max-w-2xl mx-auto">
            Find the brand of your device to get started with our repair
            services. We support a wide range of manufacturers.
          </p>
        </div>

        {/* Search Input - Enhanced Design */}
        {variant === "all" && (
          <div className="mb-8 max-w-2xl mx-auto">
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <svg
                  className="h-5 w-5 text-gray-400 group-focus-within:text-[#D2691E] transition-colors duration-200"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
              <input
                type="text"
                placeholder="Search for a brand... (e.g., Apple, Samsung)"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-4 text-gray-700 bg-white border-2 border-gray-200 
                           rounded-2xl shadow-lg hover:shadow-xl focus:shadow-xl
                           focus:outline-none focus:border-[#D2691E] focus:ring-4 focus:ring-[#D2691E]/20
                           placeholder-gray-400 transition-all duration-300 ease-in-out"
              />
              {/* Focus ring effect */}
              <div
                className="absolute inset-0 rounded-2xl bg-gradient-to-r from-[#D2691E] to-[#121212] 
                              opacity-0 group-focus-within:opacity-20 transition-opacity duration-300 -z-10 blur-xl"
              ></div>
            </div>
          </div>
        )}

        {/* No Results State - Enhanced */}
        {displayedBrands.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-6">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-10 w-10 text-gray-400"
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
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              {searchTerm
                ? `No brands found for "${searchTerm}"`
                : "No brands available."}
            </h3>
            {searchTerm && (
              <p className="text-gray-500 mb-6">
                Try a different search term or browse all brands.
              </p>
            )}
            <button
              onClick={() => setSearchTerm("")}
              className="px-6 py-3 bg-[#D2691E] hover:bg-[#121212] text-white font-medium 
                         rounded-xl transition-colors duration-200"
            >
              Clear Search
            </button>
          </div>
        ) : (
          /* Brands Grid - Enhanced */
          <div
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 
                          gap-4 md:gap-6 items-stretch justify-center"
          >
            {displayedBrands.map((brand) => (
              <Link
                key={brand.slug}
                href={`/repair/${category}/${brand.slug}`}
                className="group bg-white border-2 border-gray-200 rounded-2xl shadow-lg 
                           flex flex-col items-center justify-center text-center p-4 md:p-6
                           transition-all duration-300 ease-in-out 
                           hover:shadow-2xl hover:scale-105 hover:-translate-y-1
                           hover:border-[#D2691E] hover:bg-gradient-to-br hover:from-orange-50 hover:to-orange-100
                           focus:outline-none focus:ring-4 focus:ring-[#D2691E]/50 focus:ring-opacity-50 
                           aspect-[4/3] min-h-[120px] relative overflow-hidden"
              >
                {/* Background gradient overlay */}
                <div
                  className="absolute inset-0 bg-gradient-to-br from-[#D2691E]/0 to-[#121212]/0 
                                group-hover:from-[#D2691E]/5 group-hover:to-[#121212]/5 
                                transition-all duration-300 rounded-2xl"
                ></div>

                {/* Image container */}
                <div
                  className="relative z-10 w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 
                                flex items-center justify-center mb-2 md:mb-3
                                transform transition-all duration-300 
                                group-hover:scale-110 group-hover:rotate-3"
                >
                  <Image
                    src={brand.image}
                    alt={`${brand.name} logo`}
                    width={160}
                    height={160}
                    className="object-contain max-w-full max-h-full drop-shadow-sm
                               group-hover:drop-shadow-md transition-all duration-300"
                  />

                  {/* Shine effect */}
                  <div
                    className="absolute inset-0 rounded-xl 
                                  bg-gradient-to-r from-transparent via-white/20 to-transparent
                                  transform -skew-x-12 translate-x-[-100%] 
                                  group-hover:translate-x-[100%] transition-transform duration-700 ease-out"
                  ></div>
                </div>

                {/* Brand name */}
                <p
                  className="relative z-10 text-sm md:text-base font-semibold text-gray-800 
                               group-hover:text-[#D2691E] transition-colors duration-300
                               leading-tight"
                >
                  {brand.name}
                </p>

                {/* Hover indicator */}
                <div
                  className="absolute bottom-2 right-2 w-6 h-6 bg-orange-100 rounded-full 
                                flex items-center justify-center opacity-0 
                                group-hover:opacity-100 transition-opacity duration-300"
                >
                  <svg
                    className="w-3 h-3 text-[#D2691E]"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </div>
              </Link>
            ))}
          </div>
        )}

        {/* View All Button - Enhanced */}
        {variant === "min" &&
          displayedBrands.length > 0 &&
          displayedBrands.length < filteredBrands.length && (
            <div className="text-center mt-8 md:mt-12">
              <div className="relative inline-block group">
                {/* Glowing background effect (hover only) */}
                <div
                  className="absolute inset-0 bg-gradient-to-r from-[#D2691E] to-[#121212] 
                              rounded-2xl blur-lg opacity-0 group-hover:opacity-30 group-hover:animate-pulse scale-105 transition-opacity"
                ></div>

                <Link href={`/repair/${category}`} legacyBehavior>
                  <a
                    className="relative inline-flex items-center px-6 md:px-8 py-3 md:py-4 
                             bg-[#121212] hover:bg-gradient-to-r hover:from-[#D2691E] hover:to-[#121212]
                             text-white font-bold rounded-2xl text-sm md:text-base
                             shadow-xl hover:shadow-2xl
                             transform transition-all duration-300
                             hover:scale-105 hover:-translate-y-1
                             focus:outline-none focus:ring-4 focus:ring-[#D2691E]/50
                             overflow-hidden group
                             before:absolute before:inset-0 before:bg-gradient-to-r 
                             before:from-white/0 before:via-white/20 before:to-white/0
                             before:translate-x-[-100%] hover:before:translate-x-[100%] 
                             before:transition-transform before:duration-700"
                  >
                    <div className="relative z-10">
                      <span>View All Brands</span>
                    </div>
                  </a>
                </Link>
              </div>
              <p className="text-xs md:text-sm text-gray-500 mt-3">
                Discover all supported brands and models
              </p>
            </div>
          )}

        {/* Support Card - Enhanced */}
        {variant === "all" && (
          <div className="flex justify-center mt-12">
            <Link
              href="/support-request?type=brand"
              className="group flex w-full max-w-lg 
                         bg-white border-2 border-gray-200 rounded-2xl shadow-lg 
                         p-6 md:p-8 hover:shadow-2xl hover:border-[#D2691E]
                         hover:bg-gradient-to-br hover:from-orange-50 hover:to-orange-100
                         transition-all duration-300 hover:scale-105
                         focus:outline-none focus:ring-4 focus:ring-[#D2691E]/50 justify-center text-center"
            >
              <div>
                <h3
                  className="text-lg md:text-xl font-semibold text-gray-900 mb-1
                               group-hover:text-[#D2691E] transition-colors duration-300"
                >
                  Your brand not listed?
                </h3>
                <p className="text-gray-600 group-hover:text-gray-700 transition-colors duration-300">
                  Let us know and we&apos;ll get it added for you.
                </p>
              </div>
            </Link>
          </div>
        )}
      </div>
    </section>
  );
};

export default BrandsList;
