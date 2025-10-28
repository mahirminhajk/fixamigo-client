"use client";
import CheckoutAddressCard from "@/components/checkoutComps/checkoutAddressCard";
import CheckoutPaymentMethodCard from "@/components/checkoutComps/checkoutPaymentMethodCard";
import CheckoutPickupDateCard from "@/components/checkoutComps/checkoutPickupDateCard";
import CheckoutServiceMethodCard from "@/components/checkoutComps/checkoutServiceMethodCard";
import CheckoutOrderSummary from "@/components/checkoutComps/checkoutOrderSummary";
import CheckoutNoteCard from "@/components/checkoutComps/checkoutNoteCard";
import PlaceServiceBtn from "@/components/checkoutComps/placeServiceBtn";
import CheckoutStepper from "@/components/checkoutComps/CheckoutStepper";
import CheckoutStepWrapper from "@/components/checkoutComps/CheckoutStepWrapper";
import CheckoutReviewStep from "@/components/checkoutComps/CheckoutReviewStep";
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
  const [currentStep, setCurrentStep] = useState<number>(1);
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

  //* Step configuration
  const steps = [
    { number: 1, title: "Service Details", description: "Choose your service" },
    { number: 2, title: "Address", description: "Delivery location" },
    {
      number: 3,
      title: "Schedule & Payment",
      description: "Date and payment",
    },
    { number: 4, title: "Review", description: "Confirm your order" },
  ];

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
  const onAddressSubmit = async (
    address: IAddress | string,
    location?: { latitude: number; longitude: number }
  ) => {
    setAddressError(null);
    setGeneralError(null); // Clear any previous errors
    setLoading(true);
    console.log("Address submitted", address);
    const data =
      typeof address === "string"
        ? { addressId: address }
        : location
        ? {
            newAddress: address,
            location: {
              longitude: location.longitude,
              latitude: location.latitude,
            },
          }
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

  //* Step navigation handlers
  const handleNextStep = () => {
    // Validation before moving to next step
    if (currentStep === 1) {
      // Service method is auto-selected, just move forward
      setCurrentStep(2);
    } else if (currentStep === 2) {
      // Validate address is selected
      if (!selectedAddress && !order?.address) {
        setGeneralError("Please select or add a delivery address");
        return;
      }
      setCurrentStep(3);
    } else if (currentStep === 3) {
      // Validate pickup date and payment
      if (!order?.schedules?.pickupDate) {
        setGeneralError("Please select a pickup date");
        return;
      }
      if (!order?.payment) {
        setGeneralError("Please select a payment method");
        return;
      }
      setCurrentStep(4);
    }
    // Clear any errors when successfully moving forward
    setGeneralError(null);
    // Scroll to top on step change
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleBackStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      setGeneralError(null);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleEditStep = (step: number) => {
    setCurrentStep(step);
    setGeneralError(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
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

  //* handle hydration - show loading state while cart is undefined
  if (!cart) {
    return (
      <section className="min-h-screen bg-gray-50 py-6">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="mb-6">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
              Checkout
            </h1>
            <p className="text-gray-600">Loading your cart...</p>
          </div>
          <div className="p-8 text-center">
            <div className="animate-pulse space-y-4">
              <div className="h-4 bg-gray-200 rounded w-3/4 mx-auto"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2 mx-auto"></div>
              <div className="h-4 bg-gray-200 rounded w-2/3 mx-auto"></div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  //* empty cart
  if (!cartItem?.device || cartItem.spareParts.length === 0) {
    return (
      <section className="min-h-screen bg-gray-50 py-6">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="mb-6">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
              Checkout
            </h1>
            <p className="text-gray-600">Complete your order details</p>
          </div>

          {/* General Error Message */}
          {generalError && (
            <div className="p-4 mb-4 bg-red-50 border border-red-200 rounded-lg max-w-md mx-auto lg:max-w-2xl">
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

          <div className="p-4 space-y-4 min-h-screen flex flex-col items-center justify-center">
            <div className="max-w-md text-center">
              <div className="mb-8">
                <svg
                  className="mx-auto h-16 w-16 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1}
                    d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                  />
                </svg>
              </div>
              <h2 className="text-xl lg:text-2xl font-semibold text-gray-900 mb-4">
                {cart?.items?.length === 0
                  ? "Your cart is empty"
                  : "No device found for checkout"}
              </h2>
              <p className="text-gray-600 mb-6">
                {cart?.items?.length === 0
                  ? "Add some items to your cart to continue with checkout."
                  : "Please select a device from your cart to proceed."}
              </p>
              <button
                onClick={() => router.back()}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
              >
                Go Back
              </button>
            </div>
          </div>
        </div>
      </section>
    );
  }

  //* render
  return (
    <section className="min-h-screen bg-gray-50 py-6">
      <div className="container mx-auto px-4 max-w-7xl">
        <PopupLoading show={loading} />

        {/* Header */}
        <div className="mb-6 text-center">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
            Checkout
          </h1>
          <p className="text-gray-600">Complete your service booking</p>
        </div>

        {/* General Error Message */}
        {generalError && (
          <div className="p-4 mb-6 bg-red-50 border border-red-200 rounded-lg max-w-2xl mx-auto">
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
              <div className="ml-3 flex-1">
                <h3 className="text-sm font-medium text-red-800">Error</h3>
                <p className="mt-1 text-sm text-red-700">{generalError}</p>
                <button
                  onClick={() => setGeneralError(null)}
                  className="mt-2 text-sm font-medium text-red-800 hover:text-red-900"
                >
                  Dismiss
                </button>
              </div>
            </div>
          </div>
        )}

        <div className="lg:grid lg:grid-cols-3 lg:gap-8">
          {/* Left/Center Column - Steps */}
          <div className="lg:col-span-2">
            {/* Stepper */}
            <CheckoutStepper
              currentStep={currentStep}
              totalSteps={steps.length}
              steps={steps}
            />

            {/* Step 1: Service Details */}
            {currentStep === 1 && (
              <CheckoutStepWrapper
                currentStep={currentStep}
                totalSteps={steps.length}
                onNext={handleNextStep}
                onBack={handleBackStep}
              >
                <div className="space-y-6">
                  <CheckoutServiceMethodCard
                    onServiceMethodChange={onServiceMethodChange}
                  />
                  <div className="pt-4 border-t border-gray-200">
                    <h3 className="text-sm font-medium text-gray-700 mb-4">
                      Order Summary
                    </h3>
                    <CheckoutOrderSummary
                      order={order}
                      deviceSlug={deviceSlug}
                    />
                  </div>
                </div>
              </CheckoutStepWrapper>
            )}

            {/* Step 2: Address */}
            {currentStep === 2 && (
              <CheckoutStepWrapper
                currentStep={currentStep}
                totalSteps={steps.length}
                onNext={handleNextStep}
                onBack={handleBackStep}
                isNextDisabled={!selectedAddress && !order?.address}
              >
                <CheckoutAddressCard
                  address={selectedAddress || order?.address}
                  onAddressSubmit={onAddressSubmit}
                  onAddressSelect={onAddressSelect}
                  loading={loading}
                  error={addressError}
                />
              </CheckoutStepWrapper>
            )}

            {/* Step 3: Schedule & Payment */}
            {currentStep === 3 && (
              <CheckoutStepWrapper
                currentStep={currentStep}
                totalSteps={steps.length}
                onNext={handleNextStep}
                onBack={handleBackStep}
                isNextDisabled={
                  !order?.schedules?.pickupDate || !order?.payment
                }
              >
                <div className="space-y-6">
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
                  <CheckoutNoteCard
                    order={order}
                    onNoteSaved={(note) =>
                      setOrder((prev) => (prev ? { ...prev, note } : prev))
                    }
                  />
                </div>
              </CheckoutStepWrapper>
            )}

            {/* Step 4: Review & Confirm */}
            {currentStep === 4 && (
              <CheckoutStepWrapper
                currentStep={currentStep}
                totalSteps={steps.length}
                onBack={handleBackStep}
                hideNextButton={true}
              >
                <CheckoutReviewStep
                  order={order}
                  selectedAddress={selectedAddress || order?.address || null}
                  onEditStep={handleEditStep}
                />
                <div className="mt-8 pt-6 border-t border-gray-200">
                  <PlaceServiceBtn
                    order={order}
                    bookOrder={handleBookOrder}
                    loading={loading}
                    deviceSlug={deviceSlug}
                  />
                </div>
              </CheckoutStepWrapper>
            )}
          </div>

          {/* Right Column - Order Summary (Desktop) */}
          <div className="hidden lg:block lg:col-span-1">
            <div className="sticky top-4 bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Order Summary
              </h3>
              <CheckoutOrderSummary order={order} deviceSlug={deviceSlug} />
            </div>
          </div>
        </div>
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
