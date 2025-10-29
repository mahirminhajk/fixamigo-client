import { useState, useEffect } from "react";
import { CreditCard, Banknote } from "lucide-react";

interface InlinePaymentMethodProps {
  onPaymentMethodChange?: () => void;
}

export default function InlinePaymentMethod({
  onPaymentMethodChange,
}: InlinePaymentMethodProps) {
  const [selectedMethod, setSelectedMethod] = useState<string>("cod");

  // Trigger payment method change on mount to sync with parent state
  useEffect(() => {
    if (onPaymentMethodChange) {
      onPaymentMethodChange();
    }
  }, [onPaymentMethodChange]);

  const handleMethodSelect = (method: string) => {
    setSelectedMethod(method);
    if (onPaymentMethodChange) {
      onPaymentMethodChange();
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3 mb-4">
        <CreditCard className="w-6 h-6 text-green-600" />
        <h3 className="text-lg font-semibold text-gray-900">Payment Method</h3>
      </div>

      {/* Payment Options */}
      <div className="space-y-3">
        {/* Cash on Delivery */}
        <div
          onClick={() => handleMethodSelect("cod")}
          className={`border-2 rounded-lg p-5 cursor-pointer transition-all ${
            selectedMethod === "cod"
              ? "border-green-500 bg-green-50"
              : "border-gray-200 hover:border-gray-300"
          }`}
        >
          <div className="flex items-start justify-between">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0">
                <div
                  className={`w-5 h-5 rounded-full border-2 flex items-center justify-center mt-0.5 ${
                    selectedMethod === "cod"
                      ? "border-green-600 bg-green-600"
                      : "border-gray-300"
                  }`}
                >
                  {selectedMethod === "cod" && (
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                  )}
                </div>
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <Banknote className="w-5 h-5 text-gray-600" />
                  <h4 className="text-lg font-semibold text-gray-900">
                    Cash on Delivery
                  </h4>
                  <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800">
                    Recommended
                  </span>
                </div>
                <p className="text-sm text-gray-600 mb-2">
                  Pay when your device is delivered after repair
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-700">
                    ✓ No advance payment
                  </span>
                  <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-700">
                    ✓ Pay after inspection
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Online Payment - Coming Soon (Disabled) */}
        <div className="border-2 border-gray-200 bg-gray-50 rounded-lg p-5 opacity-60 cursor-not-allowed">
          <div className="flex items-start justify-between">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0">
                <div className="w-5 h-5 rounded-full border-2 border-gray-300 flex items-center justify-center mt-0.5"></div>
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <CreditCard className="w-5 h-5 text-gray-400" />
                  <h4 className="text-lg font-semibold text-gray-600">
                    Online Payment
                  </h4>
                  <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-200 text-gray-600">
                    Coming Soon
                  </span>
                </div>
                <p className="text-sm text-gray-500">
                  UPI, Cards, Net Banking - Available soon
                </p>
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
          Payment is collected only after successful repair. You can inspect
          your device before paying.
        </p>
      </div>
    </div>
  );
}
