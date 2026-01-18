"use client";

import OrderContent from "@/components/others/orderContent";
import OrderProgressBar from "@/components/others/orderProgressBar";
import api from "@/lib/axiosInstance";
import { IOrder } from "@/types/order";
import { AxiosError } from "axios";
import { useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { AUTH_COMPLETED_EVENT } from "@/lib/authEvents";
import { useHelpHeaderStore } from "@/stores/helpHeaderStore";

export default function OrderSummaryContent() {
  //* state
  const [order, setOrder] = useState<IOrder | null>(null);
  const [loading, setLoading] = useState(true); // Set initial loading to true
  const [error, setError] = useState<string | null>(null);

  //* id param
  const searchParams = useSearchParams();
  const orderId = searchParams.get("id");

  const fetchOrder = useCallback(async () => {
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
  }, [orderId]);

  // initial fetch + refetch when orderId changes
  useEffect(() => {
    fetchOrder();
  }, [fetchOrder]);

  // refetch after successful auth
  useEffect(() => {
    const handler = () => {
      fetchOrder();
    };
    window.addEventListener(AUTH_COMPLETED_EVENT, handler);
    return () => window.removeEventListener(AUTH_COMPLETED_EVENT, handler);
  }, [fetchOrder]);

  // Update header help message with order code when available
  const setHelpMessage = useHelpHeaderStore((s) => s.setHelpMessage);
  useEffect(() => {
    if (order?.code) {
      setHelpMessage(`Hi, I need help with this order ${order.code}`);
    }
    return () => setHelpMessage(null);
  }, [order?.code, setHelpMessage]);

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
    <section className="relative min-h-screen overflow-hidden bg-[radial-gradient(circle_at_top,_rgba(56,189,248,0.12),_transparent_35%),linear-gradient(180deg,_#f8fafc_0%,_#eef2ff_100%)] py-6 lg:py-10">
      <div className="absolute inset-x-0 top-0 h-72 bg-gradient-to-b from-slate-950/5 to-transparent" />
      <div className="container mx-auto max-w-7xl px-4 relative">
        <div className="mb-6 overflow-hidden rounded-3xl border border-slate-200 bg-slate-950 px-6 py-7 text-white shadow-2xl shadow-slate-900/10 lg:px-8 lg:py-8">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-3xl">
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-sky-200">
                Order details
              </p>
              <h1 className="mt-2 text-3xl font-bold tracking-tight md:text-4xl lg:text-5xl">
                Track your service progress and details
              </h1>
              <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-300 md:text-base">
                See the current repair stage, payment information, and support
                actions in one calm dashboard.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3 sm:flex sm:flex-row lg:min-w-[420px] lg:justify-end">
              <div className="rounded-2xl border border-white/10 bg-white/10 px-4 py-3 backdrop-blur-sm">
                <p className="text-[10px] uppercase tracking-[0.18em] text-slate-300">
                  Order code
                </p>
                <p className="mt-1 text-sm font-semibold text-white">
                  {order.code}
                </p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/10 px-4 py-3 backdrop-blur-sm">
                <p className="text-[10px] uppercase tracking-[0.18em] text-slate-300">
                  Status
                </p>
                <p className="mt-1 text-sm font-semibold text-white">
                  {order.status}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content - Responsive Layout */}
        <div className="grid gap-6 xl:grid-cols-[minmax(320px,0.95fr)_minmax(0,1.55fr)] xl:gap-8">
          <div className="h-fit xl:sticky xl:top-6">
            <div className="rounded-3xl border border-slate-200 bg-white/90 p-5 shadow-lg shadow-slate-200/60 backdrop-blur-sm lg:p-6">
              <div className="mb-5 flex items-center justify-between gap-3">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-sky-700">
                    Progress
                  </p>
                  <h2 className="text-xl font-bold text-slate-900">
                    Service timeline
                  </h2>
                </div>
                <div className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600">
                  Live updates
                </div>
              </div>
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

          <div>
            <OrderContent order={order} />
          </div>
        </div>
      </div>
    </section>
  );
}
