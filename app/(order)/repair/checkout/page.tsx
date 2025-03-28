"use client";
import CheckoutAddressCard from "@/components/checkoutComps/checkoutAddressCard";
import CheckoutPaymentMethodCard from "@/components/checkoutComps/checkoutPaymentMethodCard";
import CheckoutPickupDateCard from "@/components/checkoutComps/checkoutPickupDateCard";
import PlaceServiceBtn from "@/components/checkoutComps/placeServiceBtn";
import Topbar from "@/components/core/topbar";
import { useHydratedStore } from "@/hooks/useHydratedStore";
import api from "@/lib/axiosInstance";
import { useCartStore } from "@/stores/cartStore";
import { IAddress } from "@/types/address";
import { IOrder } from "@/types/order";
import { useEffect, useState } from "react";

export default function Page() {
  const [order, setOrder] = useState<IOrder | null>(null);
  const [pickupAvailableDates, setPickupAvailableDates] = useState<string[]>(
    []
  );
  const [loading, setLoading] = useState<boolean>(false);

  const cart = useHydratedStore(useCartStore, (state) => state.cart);

  //* pre-checkout
  const sendCheckoutRequest = async () => {
    setLoading(true);
    const data = {
      device: cart?.device?._id,
      spareParts: cart?.spareParts.map((sp) => sp._id),
    };
    await api
      .post("/order/checkout", data)
      .then((res) => {
        setOrder(res.data.data.order);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    if (cart?.device && cart?.spareParts?.length > 0) {
      (async () => {
        await sendCheckoutRequest();
      })();
    }
  }, [cart]);

  //* onAddressSubmit
  const onAddressSubmit = async (address: IAddress | string) => {
    setLoading(true);
    console.log("Address submitted", address);
    const data =
      typeof address === "string"
        ? { addressId: address }
        : { newAddress: address };
    await api
      .patch(`/order/${order?._id}/set-address`, data)
      .then((res) => {
        setOrder(res.data.data.order);
        setPickupAvailableDates(res.data.data.pickupAvailableDates);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  //* onPickupDateChange
  const onPickupDateChange = async (date: string) => {
    setLoading(true);
    console.log("Pickup date changed", date);
    await api
      .patch(`/order/${order?._id}/change-pickup`, { date })
      .then((res) => {
        console.log(
          "new order pickup date",
          res.data.data.order.schedules.pickupDate
        );
        setOrder(res.data.data.order);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  //* save from hydration
  if (!cart) {
    return null;
  }

  //* empty cart
  if (!cart.device || cart.spareParts.length === 0) {
    return (
      <section>
        <div className="flex flex-col items-center">
          <div className="flex-1 overflow-auto p-4 w-full flex justify-center">
            <div className="w-full max-w-md">
              <Topbar title="Checkout" />
              <div className="p-4 space-y-4 min-h-screen flex flex-col items-center">
                <p className="text-center text-xl font-semibold">
                  Your cart is empty
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  //* loading
  if (loading) {
    return (
      <section>
        <div className="flex flex-col items-center">
          <div className="flex-1 overflow-auto p-4 w-full flex justify-center">
            <div className="w-full max-w-md">
              <Topbar title="Checkout" />
              <div className="p-4 space-y-4 min-h-screen flex flex-col items-center">
                <p className="text-center text-xl font-semibold">Loading...</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section>
      <div className="flex flex-col items-center">
        <div className="flex-1 overflow-auto p-4 w-full flex justify-center">
          <div className="w-full max-w-md">
            <Topbar title="Checkout" />

            <div className="p-4 space-y-4 min-h-screen flex flex-col items-center">
              <CheckoutAddressCard
                address={order?.address}
                onAddressSubmit={onAddressSubmit}
                loading={loading}
              />
              <CheckoutPickupDateCard
                pickupAvailableDates={pickupAvailableDates}
                pickupDate={
                  order?.schedules?.pickupDate
                    ? order.schedules.pickupDate
                    : null
                }
                onPickupDateChange={onPickupDateChange}
                loading={loading}
              />
              <CheckoutPaymentMethodCard />
            </div>
          </div>
        </div>

        <PlaceServiceBtn price={order?.price} />
      </div>
    </section>
  );
}
//TODO: show order summary in is page.
