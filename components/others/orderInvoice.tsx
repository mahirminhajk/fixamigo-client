import { formatAddress, formatDate, getSparePartsIcon } from "@/lib/utils";
import { IOrder } from "@/types/order";
import Image from "next/image";

interface OrderInvoiceProps {
  order: IOrder;
}

const OrderInvoice = ({ order }: OrderInvoiceProps) => {
  // Check if any spare part has range pricing
  const hasRangeItems =
    order.sparePartsDetails?.some(
      (spare) =>
        spare.price.range && spare.price.startPrice && spare.price.endPrice
    ) || false;

  return (
    <div className="w-full space-y-6">
      {/* Contact Agent Section */}
      {order.agent && (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 lg:p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
              <svg
                className="w-4 h-4 text-blue-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
            </div>
            <h2 className="font-bold text-gray-900 text-lg lg:text-xl">
              Contact Agent
            </h2>
          </div>

          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-4 rounded-xl border border-blue-200">
            <div className="space-y-2">
              <p className="text-sm lg:text-base text-gray-700">
                <span className="font-medium">Name:</span>{" "}
                <span className="font-bold text-gray-900">
                  {order.agent.name.toUpperCase()}
                </span>
              </p>
              <p className="text-sm lg:text-base text-gray-700">
                <span className="font-medium">Phone:</span>{" "}
                <a
                  href={`tel:${order.agent.phone}`}
                  className="font-bold text-blue-600 hover:text-blue-800 transition-colors duration-200 hover:underline"
                  title={`Call agent at ${order.agent.phone}`}
                >
                  {order.agent.phone}
                </a>
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Device Section */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 lg:p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
            <svg
              className="w-4 h-4 text-green-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"
              />
            </svg>
          </div>
          <h2 className="font-bold text-gray-900 text-lg lg:text-xl">Device</h2>
        </div>

        <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-4 rounded-xl border border-green-200">
          <div className="flex items-center gap-4">
            <div className="w-16 h-20 lg:w-20 lg:h-24 rounded-lg overflow-hidden bg-white border border-gray-200 flex items-center justify-center">
              <Image
                src={order.device.images[0]}
                alt={order.device.name}
                title={`${order.device.name} Image`}
                width={80}
                height={96}
                className="object-contain max-w-full max-h-full"
              />
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-gray-900 text-base lg:text-lg mb-1">
                {order.device.name.toUpperCase()}
              </h3>
              <p className="text-gray-600 text-sm lg:text-base">
                Brand -{" "}
                <span className="font-semibold text-gray-800">
                  {order.device.company!.toUpperCase()}
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Spare Parts Section */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 lg:p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
            <svg
              className="w-4 h-4 text-purple-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"
              />
            </svg>
          </div>
          <h2 className="font-bold text-gray-900 text-lg lg:text-xl">
            Spare Parts
          </h2>
        </div>

        <div className="bg-gradient-to-r from-purple-50 to-violet-50 p-4 rounded-xl border border-purple-200 space-y-4">
          {order.sparePartsDetails?.map((spare, i) => (
            <div
              key={i}
              className={`flex items-center gap-4 ${
                i !== 0 ? "pt-4 border-t border-purple-200" : ""
              }`}
            >
              <div className="w-12 h-12 lg:w-14 lg:h-14 rounded-lg overflow-hidden bg-white border border-gray-200 flex items-center justify-center">
                <Image
                  src={getSparePartsIcon(spare.category)}
                  alt={spare.name}
                  title={`${spare.name} Icon`}
                  width={40}
                  height={40}
                  className="object-contain"
                />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-bold text-gray-900 text-sm lg:text-base truncate">
                  {spare.name.toUpperCase()}
                </h3>
                <p className="text-gray-600 text-xs lg:text-sm">
                  <span className="font-medium">{spare.category}</span>
                </p>
              </div>
              <div className="text-right">
                <p
                  className="font-bold text-sm lg:text-base"
                  style={{
                    color:
                      spare.price.range &&
                      spare.price.startPrice &&
                      spare.price.endPrice
                        ? "#D2691E"
                        : "#1f2937",
                  }}
                >
                  {spare.price.range &&
                  spare.price.startPrice &&
                  spare.price.endPrice
                    ? `₹${spare.price.startPrice} - ₹${spare.price.endPrice}*`
                    : `₹${spare.price.final}`}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Service Details Section */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 lg:p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center">
            <svg
              className="w-4 h-4 text-indigo-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
          </div>
          <h2 className="font-bold text-gray-900 text-lg lg:text-xl">
            Service Details
          </h2>
        </div>

        <div className="bg-gradient-to-r from-indigo-50 to-blue-50 p-4 rounded-xl border border-indigo-200">
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-gray-600 text-sm lg:text-base">
                Order Code
              </span>
              <span className="font-bold text-gray-900 text-sm lg:text-base">
                {order.code}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600 text-sm lg:text-base">
                Ordered Date
              </span>
              <span className="text-gray-900 text-sm lg:text-base font-medium">
                {formatDate(order.createdAt)}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600 text-sm lg:text-base">
                Serviced By
              </span>
              <span className="font-bold text-gray-900 text-sm lg:text-base">
                Fixamigo
              </span>
            </div>
            <div className="pt-2 border-t border-indigo-200">
              <p className="text-gray-600 text-sm lg:text-base mb-1">Address</p>
              <p className="text-gray-900 font-medium text-sm lg:text-base leading-relaxed">
                {formatAddress(order.address!)}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Payment Details Section */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 lg:p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-8 h-8 bg-amber-100 rounded-full flex items-center justify-center">
            <svg
              className="w-4 h-4 text-amber-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
          </div>
          <h2 className="font-bold text-gray-900 text-lg lg:text-xl">
            Payment Details
          </h2>
        </div>

        <div className="bg-gradient-to-r from-amber-50 to-yellow-50 p-4 rounded-xl border border-amber-200">
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-gray-600 text-sm lg:text-base">
                Items (1)
              </span>
              <span
                className="font-bold text-sm lg:text-base"
                style={{
                  color: hasRangeItems ? "#D2691E" : "#1f2937",
                }}
              >
                ₹{order.price.final}
                {hasRangeItems ? "*" : ""}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600 text-sm lg:text-base">
                Delivery Cost
              </span>
              <span className="text-gray-900 font-bold text-sm lg:text-base">
                ₹{order.price.delivery}
              </span>
            </div>
            <hr className="border-amber-200" />
            <div className="flex justify-between items-center pt-1">
              <span className="font-bold text-gray-900 text-base lg:text-lg">
                Total Price
              </span>
              <span
                className="font-bold text-lg lg:text-xl"
                style={{
                  color: hasRangeItems ? "#D2691E" : "#1f2937",
                }}
              >
                ₹{order.price.final}
                {hasRangeItems ? "*" : ""}
              </span>
            </div>
            {hasRangeItems && (
              <div className="mt-4 p-3 bg-orange-50 border border-orange-200 rounded-lg">
                <p className="text-xs lg:text-sm text-orange-800 flex items-start gap-2">
                  <svg
                    className="w-4 h-4 text-orange-600 mt-0.5 flex-shrink-0"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <span>
                    Maximum estimated price. Final price will be confirmed by
                    service partner.
                  </span>
                </p>
              </div>
            )}
          </div>

          <button className="w-full mt-6 py-3 px-4 bg-white border-2 border-amber-300 rounded-xl font-bold text-gray-900 hover:bg-amber-50 hover:border-amber-400 transition-all duration-200 text-sm lg:text-base shadow-sm hover:shadow-md">
            <div className="flex items-center justify-center gap-2">
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
              View Invoice
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderInvoice;
