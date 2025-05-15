import { Suspense } from "react";
import OrderSummaryContent from "@/components/contents/orderSummaryContent";
import Topbar from "@/components/core/topbar"; // If Topbar is static and outside Suspense
import { PopupLoading } from "@/components/others/popupLoading"; // For Suspense fallback

// A simple fallback component for Suspense
function LoadingFallback() {
  return (
    <section>
      <div className="flex flex-col items-center">
        <div className="flex-1 p-4 w-full flex justify-center">
          <div className="w-full max-w-md">
            {/* You can keep a static Topbar here if it doesn't depend on useSearchParams */}
            <Topbar title="Service Details" />
            <PopupLoading show={true} />
            <div className="text-center mt-4">
              Loading your order summary...
            </div>
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
