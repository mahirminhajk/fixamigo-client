"use client";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export default function WhereIsPriceInfo() {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <button
          className="flex items-center text-sm hover:opacity-80 transition-opacity text-[#D2691E]"
          aria-label="Where is price?"
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
          Where is price?
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-4" align="end" side="bottom">
        <div className="space-y-3">
          <div className="flex items-start">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5 mr-2 mt-0.5 flex-shrink-0 text-[#D2691E]"
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
              Where is Price?
            </h4>
          </div>
          <div className="text-gray-700 text-sm space-y-2">
            <p>These services don&apos;t have a fixed online price yet.</p>
            <p>
              After you add and place an order, our support team will contact
              you by call or WhatsApp with the exact price based on your
              device&apos;s condition and parts availability.
            </p>
            <p className="font-medium text-gray-900">
              You can cancel if the quoted price doesn&apos;t work for you.
            </p>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
