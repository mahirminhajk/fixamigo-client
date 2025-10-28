import { Package } from "lucide-react";

export default function InlineServiceMethod() {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3 mb-4">
        <Package className="w-6 h-6 text-blue-600" />
        <h3 className="text-lg font-semibold text-gray-900">Service Method</h3>
      </div>

      {/* Single option - Pre-selected */}
      <div className="border-2 border-blue-500 bg-blue-50 rounded-lg p-5 cursor-default">
        <div className="flex items-start justify-between">
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0">
              <div className="w-5 h-5 rounded-full border-2 border-blue-600 bg-blue-600 flex items-center justify-center mt-0.5">
                <div className="w-2 h-2 bg-white rounded-full"></div>
              </div>
            </div>
            <div className="flex-1">
              <h4 className="text-lg font-semibold text-gray-900 mb-1">
                Pickup & Delivery
              </h4>
              <p className="text-sm text-gray-600 mb-3">
                We&apos;ll collect your device from your address and return it
                after repair
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                  ✓ Free pickup
                </span>
                <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                  ✓ Doorstep delivery
                </span>
                <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                  ✓ Track status
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Info note */}
      <div className="flex gap-2 text-sm text-gray-600 bg-gray-50 p-3 rounded-lg">
        <svg
          className="w-5 h-5 text-gray-500 flex-shrink-0"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path
            fillRule="evenodd"
            d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
            clipRule="evenodd"
          />
        </svg>
        <p>
          Our technician will visit your address to collect the device at your
          selected pickup time.
        </p>
      </div>
    </div>
  );
}
