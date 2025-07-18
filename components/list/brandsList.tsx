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
    <section className="w-full py-8 md:py-12">
      <div className="container mx-auto px-4">
        {/* Header Section */}
        <div className="text-center mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3 tracking-tight">
            {category === "mobile-phone"
              ? "Select Your Phone Brand"
              : `Select Your Brand for ${category} Repair`}
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
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
                  className="relative z-10 w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 
                                flex items-center justify-center mb-2 md:mb-3
                                transform transition-all duration-300 
                                group-hover:scale-110 group-hover:rotate-3"
                >
                  <Image
                    src={brand.image}
                    alt={`${brand.name} logo`}
                    width={80}
                    height={80}
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
        {variant === "min" && displayedBrands.length > 0 && (
          <div className="text-center mt-8 md:mt-12">
            <div className="relative inline-block">
              {/* Glowing background effect */}
              <div
                className="absolute inset-0 bg-gradient-to-r from-[#D2691E] to-[#121212] 
                              rounded-2xl blur-lg opacity-30 animate-pulse scale-105"
              ></div>

              <Link href={`/repair/${category}`} legacyBehavior>
                <a
                  className="relative inline-flex items-center gap-2 md:gap-3 px-6 md:px-8 py-3 md:py-4 
                             bg-gradient-to-r from-[#D2691E] to-[#121212] 
                             hover:from-[#121212] hover:to-[#D2691E]
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
                  <div className="flex items-center gap-2 md:gap-3 relative z-10">
                    <svg
                      className="w-4 h-4 md:w-5 md:h-5"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                      />
                    </svg>
                    <span>View All Brands</span>
                    <svg
                      className="w-4 h-4 md:w-5 md:h-5 transform transition-transform duration-300 group-hover:translate-x-1"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M17 8l4 4m0 0l-4 4m4-4H3"
                      />
                    </svg>
                  </div>
                </a>
              </Link>
            </div>
            <p className="text-xs md:text-sm text-gray-500 mt-3">
              🏆 Discover all supported brands and models
            </p>
          </div>
        )}

        {/* Support Card - Enhanced */}
        {variant === "all" && (
          <div className="flex justify-center mt-12">
            <Link
              href="/support-request?type=brand"
              className="group flex items-center w-full max-w-lg 
                         bg-white border-2 border-gray-200 rounded-2xl shadow-lg 
                         p-6 md:p-8 hover:shadow-2xl hover:border-[#D2691E]
                         hover:bg-gradient-to-br hover:from-orange-50 hover:to-orange-100
                         transition-all duration-300 hover:scale-105
                         focus:outline-none focus:ring-4 focus:ring-[#D2691E]/50"
            >
              <div
                className="flex-shrink-0 w-12 h-12 bg-orange-100 rounded-2xl 
                              flex items-center justify-center
                              group-hover:bg-orange-200 transition-colors duration-300"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6 h-6 text-[#D2691E]"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 16h-1v-4h-1m1-4h.01M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"
                  />
                </svg>
              </div>
              <div className="ml-6 text-left flex-1">
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
              <div className="ml-4">
                <svg
                  className="w-6 h-6 text-gray-400 group-hover:text-[#D2691E] 
                                transform transition-all duration-300 group-hover:translate-x-1"
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
          </div>
        )}
      </div>
    </section>
  );
};

export default BrandsList;
