"use client";
import Topbar from "@/components/core/topbar";
import OrderInvoice from "@/components/others/orderInvoice";
import OrderProgressBar from "@/components/others/orderProgressBar";

export default function Page() {
  return (
    <section>
      <div className="flex flex-col items-center">
        <div className="flex-1 p-4 w-full flex justify-center">
          <div className="w-full max-w-md">
            <Topbar title="Service Details" />
            <OrderProgressBar currentStep={2} />
            <OrderInvoice />
          </div>
        </div>
      </div>
    </section>
  );
}
