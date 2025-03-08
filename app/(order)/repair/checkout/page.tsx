"use client";
import CheckoutAddressCard from "@/components/checkoutComps/checkoutAddressCard";
import CheckoutPaymentMethodCard from "@/components/checkoutComps/checkoutPaymentMethodCard";
import CheckoutPickupDateCard from "@/components/checkoutComps/checkoutPickupDateCard";
import PlaceServiceBtn from "@/components/checkoutComps/placeServiceBtn";
import Topbar from "@/components/core/topbar";

export default function Page() {
  return (
    <section>
      <div className="flex flex-col items-center">
        <div className="flex-1 overflow-auto p-4 w-full flex justify-center">
          <div className="w-full max-w-md">
            <Topbar title="Checkout" />

            <div className="p-4 space-y-4 min-h-screen flex flex-col items-center">
              <CheckoutAddressCard />
              <CheckoutPickupDateCard />
              <CheckoutPaymentMethodCard />
            </div>
          </div>
        </div>

        <PlaceServiceBtn />
      </div>
    </section>
  );
}
