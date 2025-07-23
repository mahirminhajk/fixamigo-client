"use client";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface PriceRangeInfoProps {
  hasPriceRange: boolean;
}

export default function PriceRangeInfo({ hasPriceRange }: PriceRangeInfoProps) {
  if (!hasPriceRange) return null;

  return (
    <Popover>
      <PopoverTrigger asChild>
        <button
          className="flex items-center text-sm hover:opacity-80 transition-opacity"
          style={{ color: "#D2691E" }}
          aria-label="Why price range?"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-4 h-4 mr-1"
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
          Why price range?
        </button>
      </PopoverTrigger>

      <PopoverContent className="w-80 p-4" align="end" side="bottom">
        <div className="space-y-3">
          <div className="flex items-start">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5 mr-2 mt-0.5 flex-shrink-0"
              style={{ color: "#D2691E" }}
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
            <h4 className="font-semibold text-gray-900 text-sm">
              Why Price Range?
            </h4>
          </div>

          <div className="text-gray-700 text-sm space-y-2">
            <p>
              These spare parts have high demand and prices change frequently
              due to market conditions.
            </p>
            <p>
              When you order a service with spare parts that have price ranges,
              the exact price will be confirmed by our service partner and
              communicated to you.
            </p>
            <p className="font-medium text-gray-900">
              You can cancel the service after hearing the final price if
              you&apos;re not satisfied.
            </p>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
