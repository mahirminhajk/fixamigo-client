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
    <div className="w-full fixed bottom-0 px-2 bg-white flex justify-center">
      <div className="w-full max-w-md">
        <div className="w-full max-w-md p-4 bg-white rounded-[6px] space-y-4">
          {/* Coupon Section */}
          {/* <form
            onSubmit={handleCouponFormSubmit}
            className="flex items-center justify-between p-3 bg-gray-100 rounded-[6px]"
          >
            <div className="flex items-center space-x-2 flex-grow"> */}{" "}
          {/* Added flex-grow here */}
          {/* <CiDiscount1 className="size-7 shrink-0" />{" "} */}
          {/* Use size-* and shrink-0 */}
          {/* <input
                type="text"
                placeholder="Enter Coupon Code"
                className="bg-transparent outline-none text-sm w-full" // Use w-full for input to take space
                onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                value={couponCode}
              />
            </div> */}
          {/* <Button
              variant="default" // Assuming default is black or primary color
              size="icon"
              type="submit"
              className="rounded-full shrink-0" // Keep rounded-full, ensure it doesn't shrink
              aria-label="Apply coupon"
            >
              <FaChevronRight className="size-4" />
            </Button>
          </form> */}
          {/* Pricing Summary */}
          <div className="text-sm space-y-2">
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
            {/* {discount > 0 && (
              <div className="flex justify-between text-green-500">
                <span>Coupon</span>
                <span className="font-semibold">
                  -₹{discount.toLocaleString()}
                </span>
              </div>
            )} */}
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
              size="lg" // Use large size for primary actions
              className="w-full font-medium" // bg-black text-white is default variant or can be added if primary is different
              onClick={handleBookOrder}
              disabled={loading}
            >
              Place service
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlaceServiceBtn;
