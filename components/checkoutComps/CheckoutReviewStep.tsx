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
            onClick={() => onEditStep(2)}
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
    </div>
  );
}
