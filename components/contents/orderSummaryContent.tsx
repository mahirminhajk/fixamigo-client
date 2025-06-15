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
            {/* PopupLoading for API calls is handled internally now,
                but you might still want a loading indicator for the initial Suspense state */}
            <OrderProgressBar
              timeline={order.timeline}
              estimatedDeliveryDate="Sep 30, 2024" // Consider making this dynamic if possible
            />
            <OrderInvoice order={order} />
          </div>
        </div>
      </div>
    </section>
  );
}
