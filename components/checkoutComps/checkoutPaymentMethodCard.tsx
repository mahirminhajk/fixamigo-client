import React from "react";
import { FaChevronRight } from "react-icons/fa";

const CheckoutPaymentMethodCard = () => {
  return (
    <div className="w-full max-w-md bg-gray-100 p-4 rounded-xl shadow-md">
      <p className="text-gray-500 text-sm">Payment Method</p>
      <div className="flex justify-between items-center">
        <p className="text-lg font-medium">Enter Payment Method</p>
        <span className="">
          <FaChevronRight />
        </span>
      </div>
    </div>
  );
};

export default CheckoutPaymentMethodCard;
