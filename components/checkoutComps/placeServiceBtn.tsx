import { useState } from "react";
import { FaChevronRight } from "react-icons/fa";
import { CiDiscount1 } from "react-icons/ci";

const PlaceServiceBtn = () => {
  const [couponCode, setCouponCode] = useState<string>("");
  const [discount, setDiscount] = useState<number>(0);

  const handleCouponChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.toUpperCase();
    setCouponCode(value);
  };

  const handleApplyCoupon = () => {
    if (couponCode === "DIS10") {
      setDiscount(1600); // Dummy discount amount
    } else {
      setDiscount(0);
    }
  };

  const subtotal = 16000;
  const deliveryCost = 40;
  const total = subtotal + deliveryCost - discount;

  return (
    <div className="w-full fixed bottom-0 px-2 bg-white flex justify-center">
      <div className="w-full max-w-md">
        <div className="w-full max-w-md p-4 bg-white rounded-[6px] space-y-4">
          {/* Coupon Section */}
          <div className="flex items-center justify-between p-3 bg-gray-100 rounded-[6px]">
            <div className="flex items-center space-x-2">
              <CiDiscount1 className="w-7 h-7" />
              <input
                type="text"
                placeholder="Enter Coupon Code"
                value={couponCode}
                onChange={handleCouponChange}
                className="bg-transparent outline-none text-sm flex-grow"
              />
            </div>
            <div
              className="bg-black text-white rounded-full w-8 h-8 flex items-center justify-center cursor-pointer"
              onClick={handleApplyCoupon}
            >
              <FaChevronRight />
            </div>
          </div>

          {/* Pricing Summary */}
          <div className="text-sm space-y-2">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span className="font-semibold">
                ₹{subtotal.toLocaleString()}
              </span>
            </div>
            <div className="flex justify-between">
              <span>Delivery Cost</span>
              <span className="font-semibold">₹{deliveryCost}</span>
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
              <span>₹{total.toLocaleString()}</span>
            </div>
          </div>

          {/* Place Service Button */}
          <button className="w-full bg-black text-white text-center py-3 rounded-[6px] font-medium">
            Place service
          </button>
        </div>
      </div>
    </div>
  );
};

export default PlaceServiceBtn;
