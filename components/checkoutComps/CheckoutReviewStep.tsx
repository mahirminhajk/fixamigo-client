import { IOrder } from "@/types/order";
import { IAddress } from "@/types/address";
import { convertDate } from "@/lib/utils";
import { MapPin, Calendar, CreditCard, Package, Edit2 } from "lucide-react";

interface CheckoutReviewStepProps {
  order: IOrder | null;
  selectedAddress: IAddress | null;
  onEditStep: (step: number) => void;
}

export default function CheckoutReviewStep({
  order,
  selectedAddress,
  onEditStep,
}: CheckoutReviewStepProps) {
  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Review Your Order
        </h2>
        <p className="text-gray-600">
          Please review all details before confirming your service request
        </p>
      </div>

      {/* Service Method */}
      <div className="border border-gray-200 rounded-xl p-5 hover:border-blue-300 transition-colors">
        <div className="flex items-start justify-between">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center flex-shrink-0">
              <Package className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-1">
                Service Method
              </h3>
              <p className="text-lg text-gray-800">Pickup & Delivery</p>
              <p className="text-sm text-gray-500 mt-1">
                We&apos;ll collect and return your device
              </p>
            </div>
          </div>
          <button
            onClick={() => onEditStep(1)}
            className="text-blue-600 hover:text-blue-700 flex items-center gap-1 text-sm font-medium"
          >
            <Edit2 className="w-4 h-4" />
            Edit
          </button>
        </div>
      </div>

      {/* Delivery Address */}
      <div className="border border-gray-200 rounded-xl p-5 hover:border-blue-300 transition-colors">
        <div className="flex items-start justify-between">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 bg-green-50 rounded-lg flex items-center justify-center flex-shrink-0">
              <MapPin className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-1">
                Delivery Address
              </h3>
              {selectedAddress ? (
                <div className="space-y-1">
                  <p className="text-lg text-gray-800 font-medium">
                    {selectedAddress.name}
                  </p>
                  <p className="text-gray-600">{selectedAddress.phone}</p>
                  <p className="text-gray-600">
                    {selectedAddress.address}
                    {selectedAddress.landmark
                      ? `, ${selectedAddress.landmark}`
                      : ""}
                  </p>
                  <p className="text-gray-600">
                    {selectedAddress.city}, {selectedAddress.pincode}
                  </p>
                </div>
              ) : (
                <p className="text-gray-500">No address selected</p>
              )}
            </div>
          </div>
          <button
            onClick={() => onEditStep(2)}
            className="text-blue-600 hover:text-blue-700 flex items-center gap-1 text-sm font-medium"
          >
            <Edit2 className="w-4 h-4" />
            Edit
          </button>
        </div>
      </div>

      {/* Pickup Date & Payment */}
      <div className="border border-gray-200 rounded-xl p-5 hover:border-blue-300 transition-colors">
        <div className="flex items-start justify-between">
          <div className="flex items-start gap-4 flex-1">
            <div className="w-10 h-10 bg-purple-50 rounded-lg flex items-center justify-center flex-shrink-0">
              <Calendar className="w-5 h-5 text-purple-600" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-gray-900 mb-3">
                Schedule & Payment
              </h3>
              <div className="space-y-3">
                <div>
                  <p className="text-sm text-gray-500 mb-1">Pickup Date</p>
                  {order?.schedules?.pickupDate ? (
                    <p className="text-lg text-gray-800">
                      {convertDate(new Date(order.schedules.pickupDate))}
                    </p>
                  ) : (
                    <p className="text-gray-500">Not selected</p>
                  )}
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">Payment Method</p>
                  <div className="flex items-center gap-2">
                    <CreditCard className="w-4 h-4 text-gray-600" />
                    <p className="text-lg text-gray-800">Cash on Delivery</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <button
            onClick={() => onEditStep(3)}
            className="text-blue-600 hover:text-blue-700 flex items-center gap-1 text-sm font-medium"
          >
            <Edit2 className="w-4 h-4" />
            Edit
          </button>
        </div>
      </div>

      {/* Additional Note (if exists) */}
      {order?.note && (
        <div className="border border-gray-200 rounded-xl p-5">
          <h3 className="font-semibold text-gray-900 mb-2">Repair Note</h3>
          <p className="text-gray-700 whitespace-pre-wrap">{order.note}</p>
        </div>
      )}

      {/* Important Notice */}
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-5">
        <div className="flex gap-3">
          <div className="flex-shrink-0">
            <svg
              className="w-5 h-5 text-blue-600 mt-0.5"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <div className="text-sm text-blue-900">
            <p className="font-medium mb-1">Please Note:</p>
            <ul className="list-disc list-inside space-y-1 text-blue-800">
              <li>Our technician will arrive at your selected pickup date</li>
              <li>
                Please keep your device ready with backup of important data
              </li>
              <li>
                Payment will be collected after successful repair and delivery
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
