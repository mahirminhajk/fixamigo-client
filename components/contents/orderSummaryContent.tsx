"use client";

import Topbar from "@/components/core/topbar";
import OrderInvoice from "@/components/others/orderInvoice";
import OrderProgressBar from "@/components/others/orderProgressBar";
import { PopupLoading } from "@/components/others/popupLoading";
import api from "@/lib/axiosInstance";
import { useCartStore } from "@/stores/cartStore";
import { IOrder } from "@/types/order"; // Make sure this path is correct
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
          console.log("order: ", res.data.data.order);
          console.log("stepper data: ", res.data.data.order.stepper);
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
      <section>
        <div className="flex flex-col items-center">
          <div className="flex-1 p-4 w-full flex justify-center">
            <div className="w-full max-w-md">
              <Topbar title="Service Details" />
              <div className="text-center">
                Order ID not found, please try again.
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (loading) {
    // You might want a more specific loading state here for the Suspense fallback
    // For now, PopupLoading can be used, or a simpler spinner
    return (
      <section>
        <div className="flex flex-col items-center">
          <div className="flex-1 p-4 w-full flex justify-center">
            <div className="w-full max-w-md">
              <Topbar title="Service Details" />
              <PopupLoading show={true} /> {/* Or a dedicated loader */}
              <div className="text-center mt-4">Loading order details...</div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section>
        <div className="flex flex-col items-center">
          <div className="flex-1 p-4 w-full flex justify-center">
            <div className="w-full max-w-md">
              <Topbar title="Service Details" />
              <div className="text-center">{error}</div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (!order) {
    return (
      <section>
        <div className="flex flex-col items-center">
          <div className="flex-1 p-4 w-full flex justify-center">
            <div className="w-full max-w-md">
              <Topbar title="Service Details" />
              <div className="text-center">Order not found</div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section>
      <div className="flex flex-col items-center">
        <div className="flex-1 p-4 w-full flex justify-center">
          <div className="w-full max-w-md">
            <Topbar title="Service Details" />

            {/* Alert Display */}
            {order.alert?.isActive && (
              <div
                className={`mb-4 p-3 rounded-lg border ${
                  order.alert.type === "ERROR"
                    ? "bg-red-50 border-red-200 text-red-800"
                    : order.alert.type === "WARNING"
                    ? "bg-yellow-50 border-yellow-200 text-yellow-800"
                    : order.alert.type === "SUCCESS"
                    ? "bg-green-50 border-green-200 text-green-800"
                    : "bg-blue-50 border-blue-200 text-blue-800"
                }`}
              >
                {order.alert.title && (
                  <h4 className="font-semibold text-sm mb-1">
                    {order.alert.title}
                  </h4>
                )}
                {order.alert.message && (
                  <p className="text-sm">{order.alert.message}</p>
                )}
                {order.alert.createdAt && (
                  <p className="text-xs opacity-75 mt-1">
                    {new Date(order.alert.createdAt).toLocaleDateString(
                      "en-US",
                      {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      }
                    )}
                  </p>
                )}
              </div>
            )}

            {/* PopupLoading for API calls is handled internally now,
                but you might still want a loading indicator for the initial Suspense state */}
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
            <OrderInvoice order={order} />
          </div>
        </div>
      </div>
    </section>
  );
}
