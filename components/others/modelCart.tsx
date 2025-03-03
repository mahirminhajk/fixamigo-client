"use client";

import { Tag, ArrowRight } from "lucide-react";
import { useCartStore } from "@/stores/cartStore";

function ModelCart() {
  const cartItems = useCartStore((state) => state.cart);
  const totalPrice = cartItems.reduce((acc, item) => acc + item.finalPrice, 0);

  return (
    <div className="p-6 bg-white rounded-[6px] max-w-md mx-auto">
      <div className="flex items-center justify-between bg-gray-100 p-3 rounded-[6px]">
        <Tag size={20} className="mr-2 text-gray-600" />
        <input
          type="text"
          placeholder="Enter Coupon Code"
          className="bg-transparent outline-none w-full text-gray-700"
        />
        <div className="bg-black text-white p-2 rounded-full">
          <ArrowRight size={18} />
        </div>
      </div>

      <h2 className="text-lg font-semibold mt-6 mb-3">Price Summary</h2>

      {cartItems.length > 0 ? (
        cartItems.map((item, index) => (
          <div key={index} className="flex justify-between text-gray-600 mb-2">
            <span>{item.label}</span>
            <span className="text-gray-900">₹{item.finalPrice}</span>
          </div>
        ))
      ) : (
        <p className="text-gray-500">No items in cart</p>
      )}

      <hr className="my-2 border-gray-300" />
      <div className="flex justify-between font-semibold">
        <span>Total Price</span>
        <span className="text-blue-600">₹{totalPrice}</span>
      </div>
    </div>
  );
}

export default ModelCart;
