"use client";

import Topbar from "@/components/core/topbar";
import OrderInvoice from "@/components/others/orderInvoice";
import OrderProgressBar from "@/components/others/orderProgressBar";
import { PopupLoading } from "@/components/others/popupLoading";
import api from "@/lib/axiosInstance";
import { useCartStore } from "@/stores/cartStore";
import { IOrder } from "@/types/order";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function Page() {
  //* store
  const clearCart = useCartStore((state) => state.clearCart);

  //* state
  const [order, setOrder] = useState<IOrder | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  //* id param
  const searchParams = useSearchParams();
  const orderId = searchParams.get("id");

  //* fetch order
  const fetchOrder = async () => {
    setLoading(true);
    setError(null);
    api
      .get(`/order/${orderId}`)
      .then((res) => {
        if (res.status === 200) {
          // Clear the cart after fetching the order
          clearCart();
          console.log("order: ", res.data.data.order);

          setOrder(res.data.data.order);
        } else {
          setError("Something went wrong");
        }
      })
      .catch((err) => {
        setError(err.response.data.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };
  // Fetch order when the component mounts
  useEffect(() => {
    if (orderId) {
      fetchOrder();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [orderId]);

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
            <PopupLoading show={loading} />
            <OrderProgressBar currentStep={2} />
            <OrderInvoice order={order} />
          </div>
        </div>
      </div>
    </section>
  );
}
