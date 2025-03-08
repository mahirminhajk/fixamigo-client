import { FaChevronRight } from "react-icons/fa";
import { CiDiscount1 } from "react-icons/ci";

const PlaceServiceBtn = () => {
  return (
    <div className="w-full fixed bottom-0  px-2 bg-white flex justify-center">
      <div className="w-full max-w-md">
        <div className=" w-full max-w-md p-4 bg-white rounded-[6px]  space-y-4">
          {/* Coupon Section */}
          <div className="flex items-center justify-between p-3 bg-gray-100 rounded-[6px]">
            <div className="flex items-center space-x-2 ">
              <CiDiscount1 className="w-7 h-7" />
              <input
                type="text"
                placeholder="Enter Coupon Code"
                className="bg-transparent outline-none text-sm flex-grow"
              />
            </div>
            <div className="bg-black text-white rounded-full w-8 h-8 flex items-center justify-center">
              <FaChevronRight />
            </div>
          </div>

          {/* Pricing Summary */}
          <div className="text-sm space-y-2">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span className="font-semibold">₹16,000</span>
            </div>
            <div className="flex justify-between">
              <span>Delivery Cost</span>
              <span className="font-semibold">₹40</span>
            </div>
            <hr />
            <div className="flex justify-between font-semibold text-lg">
              <span>Total</span>
              <span>₹16,040</span>
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
