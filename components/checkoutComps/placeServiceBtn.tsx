import { useState } from "react";
import { FaChevronRight } from "react-icons/fa";
import { CiDiscount1 } from "react-icons/ci";
import { IOrder } from "@/types/order";

interface PlaceServiceBtnProps {
  order: IOrder | null;
  bookOrder: () => Promise<void>;
}

const PlaceServiceBtn = ({ order, bookOrder }: PlaceServiceBtnProps) => {
  const [couponCode, setCouponCode] = useState<string>("");
  const [discount, setDiscount] = useState<number>(0);
  const [error, setError] = useState<string | null>(null);

  const handleCouponFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleApplyCoupon();
  };

  const handleApplyCoupon = () => {
    if (couponCode === "DIS10") {
      setDiscount(1600); // Dummy discount amount
    } else {
      setDiscount(0);
    }
  };

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
          <form
            onSubmit={handleCouponFormSubmit}
            className="flex items-center justify-between p-3 bg-gray-100 rounded-[6px]"
          >
            <div className="flex items-center space-x-2">
              <CiDiscount1 className="w-7 h-7" />
              <input
                type="text"
                placeholder="Enter Coupon Code"
                className="bg-transparent outline-none text-sm flex-grow"
                onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                value={couponCode}
              />
            </div>
            <button
              className="bg-black text-white rounded-full w-8 h-8 flex items-center justify-center cursor-pointer"
              type="submit"
            >
              <FaChevronRight />
            </button>
          </form>

          {/* Pricing Summary */}
          <div className="text-sm space-y-2">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span className="font-semibold">₹{order?.price?.total}</span>
            </div>
            <div className="flex justify-between">
              <span>Delivery Cost</span>
              <span className="font-semibold">₹{order?.price?.delivery}</span>
            </div>
            {discount > 0 && (
              <div className="flex justify-between text-green-500">
                <span>Coupon</span>
                <span className="font-semibold">
                  -₹{discount.toLocaleString()}
                </span>
              </div>
            )}
            <hr />
            <div className="flex justify-between font-semibold text-lg">
              <span>Total</span>
              <span>₹{order?.price?.final}</span>
            </div>
          </div>

          {/* Place Service Button */}
          <div>
            {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
            <button
              className="w-full bg-black text-white text-center py-3 rounded-[6px] font-medium"
              onClick={handleBookOrder}
            >
              Place service
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlaceServiceBtn;
