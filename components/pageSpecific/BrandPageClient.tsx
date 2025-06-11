"use client";

import { useState, useEffect, useMemo } from "react";
import { IDevice } from "@/types";
import ModelList from "@/components/list/modelList";

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

      <ModelList models={modelsToDisplay} brand={brand} heading="" />

      {modelsToDisplay.length === 0 && searchTerm && (
        <div className="text-center py-10 text-gray-500">
          <p className="text-xl">
            No models found for &quot;{searchTerm}&quot;.
          </p>
          <p>Try a different search term or check your spelling.</p>
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
