"use client";
import { useHydratedStore } from "@/hooks/useHydratedStore";
import { getDiscountPercentage, getSparePartsIcon } from "@/lib/utils";
import { useCartStore } from "@/stores/cartStore";
import Image from "next/image";
import { Button } from "../ui/button";
import { MdDelete } from "react-icons/md";
import BookNowCartBtn from "../buttons/bookNowCartBtn";

const CartList = () => {
  const cart = useHydratedStore(useCartStore, (state) => state.cart);
  const clearCart = useCartStore((state) => state.clearCart);
  const removeFromCart = useCartStore((state) => state.removeFromCart);
  const getTotalPrice = useCartStore((state) => state.getTotalPrice);

  return (
    <main className="w-full flex flex-col items-center pb-28">
      <div className="w-full max-w-md p-4">
        {cart && (
          <div className="pb-4 mb-2">
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-semibold">{cart.device?.name}</h3>
              <Button variant="ghost" size="sm" onClick={() => clearCart()}>
                Remove All
              </Button>
            </div>
            {cart.spareParts.map((item) => (
              <div
                key={item._id}
                className="flex items-center space-x-3 p-2 border rounded-[6px] bg-gray-100 mb-3"
              >
                {/* Product Image */}
                <Image
                  src={getSparePartsIcon(item.category)}
                  alt={item.label}
                  width={48}
                  height={48}
                  className="object-contain"
                />

                {/* Product Details */}
                <div className="flex-1 text-sm">
                  <p className="text-gray-700">{item.label}</p>

                  {/* Price Details - Matches the Reference Image */}
                  <div className="flex items-center space-x-2">
                    <span className="text-blue-600 font-semibold">
                      -
                      {getDiscountPercentage(
                        item.price.total,
                        item.price.final
                      )}
                      %
                    </span>
                    <span className="text-gray-500 line-through">
                      ₹{item.price.total}
                    </span>
                    <span className="text-black font-bold">
                      ₹{item.price.final}
                    </span>
                  </div>
                </div>

                {/* Remove Button */}
                <div className="flex flex-col items-center">
                  <button onClick={() => removeFromCart(item._id)}>
                    <MdDelete className="w-8 h-8 text-red-500 hover:text-red-700" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="fixed bottom-0 w-full max-w-md bg-white shadow-lg p-4 rounded-t-[6px]">
        <h3 className="font-semibold text-black mb-2">Price summary</h3>

        <div className="bg-gray-50 p-3 rounded-[6px] border border-gray-200">
          {cart &&
            cart.spareParts.map((item) => (
              <div
                key={item._id}
                className="flex justify-between text-gray-600 text-sm mb-1"
              >
                <span>{item.name.toLowerCase()}</span>
                <span className="font-medium">₹{item.price.final}</span>
              </div>
            ))}

          <hr className="border-dashed my-2" />

          <div className="flex justify-between font-bold text-black">
            <span>Total Price</span>
            <span className="text-blue-600">
              ₹{getTotalPrice().toLocaleString()}
            </span>
          </div>
        </div>

        <BookNowCartBtn />
      </div>
    </main>
  );
};

export default CartList;
