"use client";

import OrderInvoice from "@/components/others/orderInvoice";
import OrderProgressBar from "@/components/others/orderProgressBar";
import api from "@/lib/axiosInstance";
import { useCartStore } from "@/stores/cartStore";
import { IOrder } from "@/types/order";
import { AxiosError } from "axios";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function OrderSummaryContent() {
  //* store
  const clearCart = useCartStore((state) => state.clearCart);

  //* state
  const [order, setOrder] = useState<IOrder | null>(null);
  const [loading, setLoading] = useState(true); // Set initial loading to true
  const [error, setError] = useState<string | null>(null);

  //* id param
  const searchParams = useSearchParams();
  const orderId = searchParams.get("id");

  //* fetch order
  useEffect(() => {
    const fetchOrder = async () => {
      if (!orderId) {
        setError("Order ID not found in URL.");
        setLoading(false);
        return;
      }
      setLoading(true);
      setError(null);
      try {
        const res = await api.get(`/order/${orderId}`);
        if (res.status === 200) {
          clearCart();
          setOrder(res.data.data.order);
        } else {
          setError("Something went wrong");
        }
      } catch (err) {
        if (err instanceof AxiosError) {
          setError(err.response?.data.message || "An error occurred");
        } else {
          setError("An unexpected error occurred");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [orderId, clearCart]); // Added clearCart to dependencies as it's used in effect

  if (!orderId) {
    return (
      <section className="py-6">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="mb-6">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
              Order Summary
            </h1>
            <p className="text-gray-600">Track your service progress</p>
          </div>
          <div className="flex justify-center">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 text-center max-w-md">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-8 h-8 text-red-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Order ID Not Found
              </h3>
              <p className="text-gray-600">
                Please check your order ID and try again.
              </p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (loading) {
    return (
      <section className="py-6">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="mb-6">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
              Order Summary
            </h1>
            <p className="text-gray-600">Loading your order details...</p>
          </div>
          <div className="flex justify-center">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
              <div className="animate-pulse space-y-6">
                <div className="space-y-3">
                  <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                  <div className="h-3 bg-gray-200 rounded w-3/4"></div>
                </div>
                <div className="space-y-2">
                  <div className="h-16 bg-gray-200 rounded"></div>
                  <div className="h-16 bg-gray-200 rounded"></div>
                  <div className="h-16 bg-gray-200 rounded"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-6">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="mb-6">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
              Order Summary
            </h1>
            <p className="text-gray-600">Unable to load order details</p>
          </div>
          <div className="flex justify-center">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 text-center max-w-md">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-8 h-8 text-red-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Error Loading Order
              </h3>
              <p className="text-gray-600">{error}</p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (!order) {
    return (
      <section className="py-6">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="mb-6">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
              Order Summary
            </h1>
            <p className="text-gray-600">Order information not available</p>
          </div>
          <div className="flex justify-center">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 text-center max-w-md">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-8 h-8 text-gray-400"
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
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Order Not Found
              </h3>
              <p className="text-gray-600">
                The requested order could not be located.
              </p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-6 min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="mb-6">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
            Order Summary
          </h1>
          <p className="text-gray-600">
            Track your service progress and details
          </p>
        </div>

        {/* Alert moved into OrderInvoice card below Device section */}

        {/* Main Content - Responsive Layout */}
        <div className="lg:grid lg:grid-cols-5 lg:gap-8 space-y-8 lg:space-y-0">
          {/* Progress Bar - Mobile: Full width, Desktop: Left 2 columns */}
          <div className="lg:col-span-2 order-1 lg:order-1">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 lg:p-8">
              <h2 className="text-xl font-bold text-gray-900 mb-6">
                Service Progress
              </h2>
              <OrderProgressBar
                stepper={order.stepper}
                estimatedDeliveryDate={
                  order.schedules?.deliveryDate
                    ? new Date(order.schedules.deliveryDate).toLocaleDateString(
                        "en-US",
                        { month: "short", day: "numeric", year: "numeric" }
                      )
                    : undefined
                }
              />
            </div>
          </div>

          {/* Order Details - Mobile: Full width, Desktop: Right 3 columns */}
          <div className="lg:col-span-3 order-2 lg:order-2">
            <OrderInvoice order={order} />
          </div>
        </div>
      </div>
    </section>
  );
}
