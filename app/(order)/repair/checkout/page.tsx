"use client";
import CheckoutAddressCard from "@/components/checkoutComps/checkoutAddressCard";
import CheckoutPaymentMethodCard from "@/components/checkoutComps/checkoutPaymentMethodCard";
import CheckoutPickupDateCard from "@/components/checkoutComps/checkoutPickupDateCard";
import CheckoutServiceMethodCard from "@/components/checkoutComps/checkoutServiceMethodCard";
import PlaceServiceBtn from "@/components/checkoutComps/placeServiceBtn";
import Topbar from "@/components/core/topbar";
import { useHydratedStore } from "@/hooks/useHydratedStore";
import api from "@/lib/axiosInstance";
import { useCartStore } from "@/stores/cartStore";
import { useUserStore } from "@/stores/userStore";
import { IAddress } from "@/types/address";
import { IOrder, PaymentMode } from "@/types/order";
import { Suspense, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { PopupLoading } from "@/components/others/popupLoading";

function CheckoutPageContent() {
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
  const searchParams = useSearchParams();
  //*store
  const cart = useHydratedStore(useCartStore, (state) => state.cart);
  const clearUser = useUserStore((state) => state.clearUser);

  //* get the device parm or set  default to first cart item device
  const deviceId =
    searchParams.get("device") || cart?.items?.[0]?.device?._id || null;

  // Find the cart item for the selected device
  const cartItem = cart?.items?.find((item) => item.device._id === deviceId);

  //* pre-checkout
  const sendCheckoutRequest = async () => {
    setLoading(true);
    const data = {
      device: cartItem?.device._id,
      spareParts: cartItem?.spareParts.map((sp) => sp._id),
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
    if (cartItem?.device && cartItem?.spareParts?.length > 0) {
      (async () => {
        await sendCheckoutRequest();
      })();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cartItem]);

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

  //* onServiceMethodChange
  const onServiceMethodChange = async () => {
    console.log("Service method changed");
    // No functionality needed for now as per requirement
  };

  //* handleBookOrder
  const handleBookOrder = async () => {
    setLoading(true);
    await api
      .patch(`/order/${order?._id}/book`, {})
      .then((res) => {
        router.replace(`/my-services/summary?id=${res.data.data.order._id}`);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  //* save from hydration
  if (!cart) {
    return null;
  }

  //* empty cart
  if (!cartItem?.device || cartItem.spareParts.length === 0) {
    return (
      <section>
        <div className="flex flex-col items-center">
          <div className="flex-1 overflow-auto p-4 w-full flex justify-center">
            <div className="w-full max-w-md">
              <Topbar title="Checkout" />
              <div className="p-4 space-y-4 min-h-screen flex flex-col items-center">
                <p className="text-center text-xl font-semibold">
                  {cart?.items?.length === 0
                    ? "Your cart is empty"
                    : "No device found for checkout. Please select a device from your cart."}
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
              <CheckoutServiceMethodCard
                onServiceMethodChange={onServiceMethodChange}
              />
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

        <PlaceServiceBtn
          order={order}
          bookOrder={handleBookOrder}
          loading={loading}
        />
      </div>
    </section>
  );
}

export default function Page() {
  return (
    <Suspense fallback={<div className="p-8 text-center">Loading...</div>}>
      <CheckoutPageContent />
    </Suspense>
  );
}
//TODO: show order summary in is page.
