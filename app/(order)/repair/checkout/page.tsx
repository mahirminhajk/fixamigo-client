"use client";
import CheckoutAddressCard from "@/components/checkoutComps/checkoutAddressCard";
import CheckoutPaymentMethodCard from "@/components/checkoutComps/checkoutPaymentMethodCard";
import CheckoutPickupDateCard from "@/components/checkoutComps/checkoutPickupDateCard";
import PlaceServiceBtn from "@/components/checkoutComps/placeServiceBtn";
import Topbar from "@/components/core/topbar";
import { useHydratedStore } from "@/hooks/useHydratedStore";
import api from "@/lib/axiosInstance";
import { useCartStore } from "@/stores/cartStore";
import { useUserStore } from "@/stores/userStore";
import { IAddress } from "@/types/address";
import { IOrder, PaymentMode } from "@/types/order";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { PopupLoading } from "@/components/others/popupLoading";

export default function Page() {
  //*state
  const [order, setOrder] = useState<IOrder | null>(null);
  const [pickupAvailableDates, setPickupAvailableDates] = useState<string[]>(
    []
  );
  const [loading, setLoading] = useState<boolean>(false);
  const [addressError, setAddressError] = useState<
    "NO_ZONES" | "BAD_REQUEST" | null
  >(null);
  //* hooks
  const router = useRouter();
  //*store
  const cart = useHydratedStore(useCartStore, (state) => state.cart);
  const clearUser = useUserStore((state) => state.clearUser);

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
        //? check pickupAvailableDates array length is greater than 0
        if (res.data.data.pickupAvailableDates.length > 0) {
          setPickupAvailableDates(res.data.data.pickupAvailableDates);
        }
      })
      .catch((err) => {
        console.log(err);
        //* if status code is 401
        if (err.response.status === 401) {
          console.log("Unauthorized");
          clearUser();
          //* go back
          router.back();
        }
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cart]);

  //* onAddressSubmit
  const onAddressSubmit = async (address: IAddress | string) => {
    setAddressError(null);
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
        //? check error type:
        if (err.response.data.type === "NO_ZONES") {
          //? ERROR: No zones available
          setAddressError("NO_ZONES");
        } else {
          //? ERROR: Something went wrong
          setAddressError("BAD_REQUEST");
        }
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
      .patch(`/order/${order?._id}/set-pickup`, { date })
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

  //* onPaymentMethodChange
  const onPaymentMethodChange = async () => {
    console.log("Payment method changed");
    setOrder((prev) => {
      if (prev) {
        return {
          ...prev,
          payment: {
            mode: PaymentMode.COD,
            transactionId: undefined,
          },
        };
      }
      return prev;
    });
  };

  //* handleBookOrder
  const handleBookOrder = async () => {
    setLoading(true);
    await api
      .patch(`/order/${order?._id}/book`, {})
      .then((res) => {
        //? remove the '/repair/checkout' page and replace with '/repair/summary?id=orderId'
        router.replace(`/my-services/summary?id=${res.data.data.order._id}`);
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

  return (
    <section>
      <div className="flex flex-col items-center">
        <div className="flex-1 overflow-auto p-4 w-full flex justify-center">
          <div className="w-full max-w-md">
            <Topbar title="Checkout" />
            <PopupLoading show={loading} />

            <div className="p-4 space-y-4 min-h-screen flex flex-col items-center">
              <CheckoutAddressCard
                address={order?.address}
                onAddressSubmit={onAddressSubmit}
                loading={loading}
                error={addressError}
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
              <CheckoutPaymentMethodCard
                onPaymentMethodChange={onPaymentMethodChange}
              />
            </div>
          </div>
        </div>

        <PlaceServiceBtn order={order} bookOrder={handleBookOrder} />
      </div>
    </section>
  );
}
//TODO: show order summary in is page.
