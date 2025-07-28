"use client";
import CheckoutAddressCard from "@/components/checkoutComps/checkoutAddressCard";
import CheckoutPaymentMethodCard from "@/components/checkoutComps/checkoutPaymentMethodCard";
import CheckoutPickupDateCard from "@/components/checkoutComps/checkoutPickupDateCard";
import CheckoutServiceMethodCard from "@/components/checkoutComps/checkoutServiceMethodCard";
import CheckoutOrderSummary from "@/components/checkoutComps/checkoutOrderSummary";
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
  const [selectedAddress, setSelectedAddress] = useState<IAddress | null>(null);
  const [pickupAvailableDates, setPickupAvailableDates] = useState<string[]>(
    []
  );
  const [loading, setLoading] = useState<boolean>(false);
  const [addressError, setAddressError] = useState<
    "NO_ZONES" | "BAD_REQUEST" | null
  >(null);
  const [generalError, setGeneralError] = useState<string | null>(null);
  //* hooks
  const router = useRouter();
  const searchParams = useSearchParams();
  //*store
  const cart = useHydratedStore(useCartStore, (state) => state.cart);
  const clearUser = useUserStore((state) => state.clearUser);

  //* get the device parm or set  default to first cart item device
  const deviceSlug =
    searchParams.get("device") || cart?.items?.[0]?.device?.slug || null;

  // Find the cart item for the selected device
  const cartItem = cart?.items?.find((item) => item.device.slug === deviceSlug);

  //* pre-checkout
  const sendCheckoutRequest = async () => {
    setLoading(true);
    setGeneralError(null); // Clear any previous errors
    const data = {
      device: cartItem?.device._id,
      spareParts: cartItem?.spareParts.map((sp) => sp._id),
    };
    await api
      .post("/order/checkout", data)
      .then((res) => {
        setOrder(res.data.data.order);
        // Set the address from the order if it exists
        if (res.data.data.order.address) {
          setSelectedAddress(res.data.data.order.address);
        }
        //? check pickupAvailableDates array length is greater than 0
        if (res.data.data.pickupAvailableDates.length > 0) {
          setPickupAvailableDates(res.data.data.pickupAvailableDates);
        }
      })
      .catch((err) => {
        console.error("Checkout request failed:", err);
        //* if status code is 401
        if (err.response?.status === 401) {
          console.log("Unauthorized");
          clearUser();
          //* go back
          router.back();
        } else {
          // Show user-friendly error message
          const errorMessage =
            err.response?.data?.message ||
            "Failed to load checkout information. Please try again.";
          setGeneralError(errorMessage);
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
    setGeneralError(null); // Clear any previous errors
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
        // Update the selected address from the response
        if (res.data.data.order.address) {
          setSelectedAddress(res.data.data.order.address);
        }
        setPickupAvailableDates(res.data.data.pickupAvailableDates);
      })
      .catch((err) => {
        console.error("Address submission failed:", err);
        //? check error type:
        if (err.response?.data?.type === "NO_ZONES") {
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

  //* onAddressSelect - for updating local state when selecting existing address
  const onAddressSelect = (address: IAddress) => {
    setSelectedAddress(address);
  };

  //* onPickupDateChange
  const onPickupDateChange = async (date: string) => {
    setLoading(true);
    setGeneralError(null); // Clear any previous errors
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
        console.error("Pickup date update failed:", err);
        const errorMessage =
          err.response?.data?.message ||
          "Failed to update pickup date. Please try again.";
        setGeneralError(errorMessage);
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
    setGeneralError(null); // Clear any previous errors
    await api
      .patch(`/order/${order?._id}/book`, {})
      .then((res) => {
        router.replace(`/my-services/summary?id=${res.data.data.order._id}`);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Order booking failed:", err);
        const errorMessage =
          err.response?.data?.message ||
          "Failed to place your order. Please try again.";
        setGeneralError(errorMessage);
        setLoading(false);
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

              {/* General Error Message */}
              {generalError && (
                <div className="p-4 mb-4 bg-red-50 border border-red-200 rounded-lg">
                  <div className="flex items-start">
                    <div className="flex-shrink-0">
                      <svg
                        className="h-5 w-5 text-red-400"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <div className="ml-3">
                      <h3 className="text-sm font-medium text-red-800">
                        Error
                      </h3>
                      <p className="mt-1 text-sm text-red-700">
                        {generalError}
                      </p>
                      <div className="mt-3 space-x-2">
                        <button
                          onClick={() => setGeneralError(null)}
                          className="text-sm font-medium text-red-800 hover:text-red-900"
                        >
                          Dismiss
                        </button>
                        <button
                          onClick={() => {
                            setGeneralError(null);
                            sendCheckoutRequest();
                          }}
                          className="text-sm font-medium bg-red-100 text-red-800 hover:bg-red-200 px-3 py-1 rounded"
                        >
                          Retry
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}

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

            {/* General Error Message */}
            {generalError && (
              <div className="w-full max-w-md mx-auto p-4 mb-4 bg-red-50 border border-red-200 rounded-lg">
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <svg
                      className="h-5 w-5 text-red-400"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-red-800">Error</h3>
                    <p className="mt-1 text-sm text-red-700">{generalError}</p>
                    <div className="mt-3">
                      <button
                        onClick={() => setGeneralError(null)}
                        className="text-sm font-medium text-red-800 hover:text-red-900 mr-3"
                      >
                        Dismiss
                      </button>
                      <button
                        onClick={() => {
                          setGeneralError(null);
                          sendCheckoutRequest();
                        }}
                        className="text-sm font-medium bg-red-100 text-red-800 hover:bg-red-200 px-3 py-1 rounded"
                      >
                        Retry
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div className="p-4 space-y-4 flex flex-col items-center pb-48">
              <CheckoutOrderSummary order={order} deviceSlug={deviceSlug} />
              <CheckoutServiceMethodCard
                onServiceMethodChange={onServiceMethodChange}
              />
              <CheckoutAddressCard
                address={selectedAddress || order?.address}
                onAddressSubmit={onAddressSubmit}
                onAddressSelect={onAddressSelect}
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
          deviceSlug={deviceSlug}
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
