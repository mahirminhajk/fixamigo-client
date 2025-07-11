"use client";

import { useState, useEffect, useMemo } from "react";
import { IDevice } from "@/types";
import ModelList from "@/components/list/modelList";
import Link from "next/link";

interface BrandPageClientProps {
  initialModels: IDevice[];
  brand: string;
  heading: string;
}

export default function BrandPageClient({
  initialModels,
  brand,
  heading, // This is the main page heading
}: BrandPageClientProps) {
  const [allModels, setAllModels] = useState<IDevice[]>(initialModels);
  const [searchTerm, setSearchTerm] = useState<string>("");

  useEffect(() => {
    // Update allModels if initialModels prop changes (e.g., on navigation)
    setAllModels(initialModels);
    // Reset search when initial models change
    setSearchTerm("");
  }, [initialModels]);

  const filteredModels = useMemo(() => {
    if (!searchTerm) return allModels;
    return allModels.filter((model) =>
      model.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [allModels, searchTerm]);

  // modelsToDisplay is now all filteredModels
  const modelsToDisplay = filteredModels;

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Main Page Heading */}
      <h1 className="text-3xl font-extrabold text-gray-900 text-center mb-6 sm:mb-10 tracking-tight">
        {heading}
      </h1>

      {/* Search Input Section - Moved below the heading */}
      <div className="mb-8 max-w-xl mx-auto">
        <input
          type="text"
          placeholder={`Search in ${brand} models...`}
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
          }}
          className="w-full px-4 py-3 text-gray-700 bg-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-150 ease-in-out"
        />
      </div>

      {modelsToDisplay.length === 0 && !searchTerm ? (
        <div className="flex flex-col items-center justify-center h-96 text-center">
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
              d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <p className="text-xl text-gray-600">
            No models currently available for {brand}.
          </p>
          <p className="text-md text-gray-500 mt-1">
            Please check back later or try a different brand.
          </p>
        </div>
      ) : (
        <ModelList models={modelsToDisplay} brand={brand} />
      )}

      {modelsToDisplay.length === 0 && searchTerm && (
        <div className="text-center py-10 text-gray-500">
          <p className="text-xl mb-2">
            No models found for &quot;{searchTerm}&quot;.
          </p>
          <p className="text-lg font-medium mb-4">
            No models currently available for {brand}.
          </p>
          <div className="flex justify-center">
            <Link
              href={`/support-request?type=device&value=${brand}`}
              className="flex items-center w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow-sm p-6 hover:shadow-lg transition-all duration-200"
            >
              <div className="flex-shrink-0">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-8 h-8 text-blue-500"
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
              <div className="ml-4 text-left">
                <h3 className="text-lg font-semibold text-gray-900">
                  Can&apos;t find your device?
                </h3>
                <p className="text-gray-600">
                  Request here and we&apos;ll help you out.
                </p>
              </div>
            </Link>
          </div>
        </div>
      )}
      {/* This condition is handled by ModelList now, but kept for reference if needed separately */}
      {/* {initialModels.length === 0 && !searchTerm && (
         <div className="text-center py-10 text-gray-500">
            <p className="text-xl">No models available for this brand.</p>
         </div>
      )} */}
    </div>
  );
}
