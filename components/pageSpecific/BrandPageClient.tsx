"use client";

import { useState, useEffect, useMemo, useCallback } from "react";
import { IDevice } from "@/types";
import ModelList from "@/components/list/modelList";

interface BrandPageClientProps {
  initialModels: IDevice[];
  brand: string;
  heading: string;
}

const LAZY_LOAD_THRESHOLD = 10; // Number of items to load each time
const INITIAL_DISPLAY_COUNT = 10; // Initial number of items to display

export default function BrandPageClient({
  initialModels,
  brand,
  heading, // This is the main page heading
}: BrandPageClientProps) {
  const [allModels, setAllModels] = useState<IDevice[]>(initialModels);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [displayedModelsCount, setDisplayedModelsCount] = useState<number>(
    INITIAL_DISPLAY_COUNT
  );

  useEffect(() => {
    // Update allModels if initialModels prop changes (e.g., on navigation)
    setAllModels(initialModels);
    // Reset search and display count when initial models change
    setSearchTerm("");
    setDisplayedModelsCount(INITIAL_DISPLAY_COUNT);
  }, [initialModels]);

  const filteredModels = useMemo(() => {
    if (!searchTerm) return allModels;
    return allModels.filter((model) =>
      model.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [allModels, searchTerm]);

  const modelsToDisplay = useMemo(() => {
    return filteredModels.slice(0, displayedModelsCount);
  }, [filteredModels, displayedModelsCount]);

  const handleScroll = useCallback(() => {
    if (
      window.innerHeight + document.documentElement.scrollTop >=
        document.documentElement.offsetHeight - 200 && // 200px buffer to load a bit earlier
      displayedModelsCount < filteredModels.length
    ) {
      setDisplayedModelsCount((prevCount) => prevCount + LAZY_LOAD_THRESHOLD);
    }
  }, [displayedModelsCount, filteredModels.length]);

  useEffect(() => {
    // Only add scroll listener if there are more models to load than initially displayed
    // and if the total number of filtered models exceeds the initial display count.
    if (
      filteredModels.length > displayedModelsCount &&
      filteredModels.length > INITIAL_DISPLAY_COUNT
    ) {
      window.addEventListener("scroll", handleScroll);
    } else {
      // If not lazy loading (e.g., few items or after filtering), ensure all are shown or up to the threshold
      setDisplayedModelsCount(
        Math.min(
          filteredModels.length,
          Math.max(INITIAL_DISPLAY_COUNT, filteredModels.length)
        )
      );
    }
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll, filteredModels.length, displayedModelsCount]);

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
            setDisplayedModelsCount(INITIAL_DISPLAY_COUNT);
          }}
          className="w-full px-4 py-3 text-gray-700 bg-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-150 ease-in-out"
        />
      </div>

      {/* ModelList will now receive an empty string for its heading prop 
          or a more contextual one if ModelList is adapted further. 
          For now, we'll aim to have ModelList not render its own h1 if its heading prop is empty. */}
      <ModelList models={modelsToDisplay} brand={brand} heading="" />

      {filteredModels.length > displayedModelsCount && (
        <div className="text-center py-6 text-gray-600">
          Loading more models...
        </div>
      )}
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
