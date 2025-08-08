import { Suspense } from "react";
import OrderSummaryContent from "@/components/contents/orderSummaryContent";
import { PopupLoading } from "@/components/others/popupLoading"; // For Suspense fallback

// A simple fallback component for Suspense
function LoadingFallback() {
  return (
    <section className="py-6">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="mb-6">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
            Order Summary
          </h1>
          <p className="text-gray-600">Loading your order details</p>
        </div>
        <PopupLoading show={true} />
        <div className="text-center mt-8">
          <div className="animate-pulse text-gray-500">
            Loading your order summary...
          </div>
        </div>
      </div>
    </section>
  );
}

export default function Page() {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <OrderSummaryContent />
    </Suspense>
  );
}
