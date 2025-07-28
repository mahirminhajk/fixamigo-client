import { useState } from "react";
// import { FaChevronRight } from "react-icons/fa";
// import { CiDiscount1 } from "react-icons/ci";
import { IOrder } from "@/types/order";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/stores/cartStore";
import { useHydratedStore } from "@/hooks/useHydratedStore";

interface PlaceServiceBtnProps {
  order: IOrder | null;
  bookOrder: () => Promise<void>;
  loading: boolean;
  deviceSlug: string | null;
}

const PlaceServiceBtn = ({
  order,
  bookOrder,
  loading,
  deviceSlug,
}: PlaceServiceBtnProps) => {
  // const [couponCode, setCouponCode] = useState<string>("");
  // const [discount, setDiscount] = useState<number>(0);
  const [error, setError] = useState<string | null>(null);

  // Cart store hooks for range pricing
  const cart = useHydratedStore(useCartStore, (state) => state.cart);
  const getTotalPrice = useCartStore((state) => state.getTotalPrice);
  const hasRangeItems = useCartStore((state) => state.hasRangeItems);

  // Find the cart item for the selected device
  const cartItem = cart?.items?.find((item) => item.device.slug === deviceSlug);
  const hasRangeItemsForDevice = cartItem
    ? hasRangeItems(cartItem.device._id)
    : false;
  const totalCartPrice = cartItem ? getTotalPrice(cartItem.device._id) : 0;

  // const handleCouponFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
  //   e.preventDefault();
  //   handleApplyCoupon();
  // };

  // const handleApplyCoupon = () => {
  //   if (couponCode === "DIS10") {
  //     setDiscount(1600); // Dummy discount amount
  //   } else {
  //     setDiscount(0);
  //   }
  // };

  const handleBookOrder = async () => {
    setError(null);
    //? Validate everything before booking
    if (!order?.address) {
      setError("Please select an address");
      return;
    } else if (!order?.schedules?.pickupDate) {
      setError("Please select a pickup date");
      return;
    } else if (!order?.payment) {
      setError("Please select a payment method");
      return;
    }
    await bookOrder();
  };

  return (
    <div className="w-full fixed bottom-0 px-2 bg-white flex justify-center lg:relative lg:px-0 lg:bg-transparent">
      <div className="w-full max-w-md lg:max-w-none">
        <div className="w-full max-w-md lg:max-w-none p-4 lg:p-0 bg-white lg:bg-transparent rounded-[6px] lg:rounded-none space-y-4 lg:space-y-6">
          {/* Pricing Summary - Hidden on desktop as it's shown in the order summary */}
          <div className="text-sm lg:hidden space-y-2">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span
                className="font-semibold"
                style={{
                  color: hasRangeItemsForDevice ? "#D2691E" : "black",
                }}
              >
                ₹{totalCartPrice.toLocaleString()}
                {hasRangeItemsForDevice ? "*" : ""}
              </span>
            </div>
            <div className="flex justify-between">
              <span>Delivery Cost</span>
              <span className="font-semibold">
                ₹{order?.price?.delivery || 0}
              </span>
            </div>
            <hr />
            <div className="flex justify-between font-semibold text-lg">
              <span>Total</span>
              <span
                style={{
                  color: hasRangeItemsForDevice ? "#D2691E" : "black",
                }}
              >
                ₹
                {(
                  totalCartPrice + (order?.price?.delivery || 0)
                ).toLocaleString()}
                {hasRangeItemsForDevice ? "*" : ""}
              </span>
            </div>
            {hasRangeItemsForDevice && (
              <div className="mt-2 text-xs" style={{ color: "#D2691E" }}>
                <p>
                  * Maximum estimated price. Final price will be confirmed by
                  service partner.
                </p>
              </div>
            )}
          </div>

          {/* Place Service Button */}
          <div>
            {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
            <Button
              size="lg"
              className="w-full font-medium text-lg lg:text-xl lg:py-4"
              onClick={handleBookOrder}
              disabled={loading}
            >
              {loading ? "Placing order..." : "Place service"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlaceServiceBtn;
