import React from "react";
import { FaChevronRight } from "react-icons/fa";

const CheckoutPickupDateCard = () => {
  return (
    <div className="w-full max-w-md bg-gray-100 p-4 rounded-xl shadow-md">
      <p className="text-gray-500 text-sm">Pickup date</p>
      <div className="flex justify-between items-center">
        <p className="text-lg font-medium">Enter Pickup Date</p>
        <span className="">
          <FaChevronRight />
        </span>
      </div>
    </div>
  );
};

export default CheckoutPickupDateCard;
