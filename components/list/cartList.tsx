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

  if (!cart || !Array.isArray(cart.items) || cart.items.length === 0)
    return null;

  return (
    <main className="w-full flex flex-col items-center pb-28 bg-gray-50 min-h-screen">
      <div className="w-full max-w-md p-4">
        {cart.items.map((cartItem) => (
          <div
            key={cartItem.device._id}
            className="pb-6 mb-8 border-b border-gray-300"
          >
            <div className="flex justify-between items-center mb-4 pt-4 px-2">
              <div className="flex items-center gap-3">
                <Image
                  src={cartItem.device.images?.[0] || "/logos/logo.png"}
                  alt={cartItem.device.name}
                  width={40}
                  height={40}
                  className="rounded-md border bg-white object-contain"
                />
                <h3 className="font-semibold text-lg text-black">
                  {cartItem.device.name}
                </h3>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  // Remove all spare parts for this device
                  cartItem.spareParts.forEach((sp) =>
                    removeFromCart(cartItem.device._id, sp._id)
                  );
                }}
                className="text-red-500 hover:text-red-700"
              >
                Remove All
              </Button>
            </div>
            <div className="space-y-3 mb-4">
              {cartItem.spareParts.length > 0 ? (
                cartItem.spareParts.map((item) => (
                  <div
                    key={item._id}
                    className="flex items-center space-x-3 p-3 border-b border-gray-200 bg-gray-50"
                  >
                    <Image
                      src={getSparePartsIcon(item.category)}
                      alt={item.label}
                      width={36}
                      height={36}
                      className="object-contain"
                    />
                    <div className="flex-1 text-sm">
                      <p className="text-gray-800 font-medium">{item.label}</p>
                      <div className="flex items-center space-x-2">
                        <span className="text-blue-600 font-semibold">
                          -
                          {getDiscountPercentage(
                            item.price.total,
                            item.price.final
                          )}
                          %
                        </span>
                        <span className="text-gray-400 line-through">
                          ₹{item.price.total}
                        </span>
                        <span className="text-black font-bold">
                          ₹{item.price.final}
                        </span>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() =>
                        removeFromCart(cartItem.device._id, item._id)
                      }
                      aria-label="Remove item"
                      className="text-red-400 hover:text-red-600"
                    >
                      <MdDelete className="size-5" />
                    </Button>
                  </div>
                ))
              ) : (
                <p className="text-gray-400 text-center">No items in cart</p>
              )}
            </div>
            <div className="bg-gray-100 p-4 border border-gray-200 mt-2">
              <div className="mb-2">
                {cartItem.spareParts.map((item) => (
                  <div
                    key={item._id}
                    className="flex justify-between text-gray-600 text-sm mb-1"
                  >
                    <span>{item.name.toLowerCase()}</span>
                    <span className="font-medium">₹{item.price.final}</span>
                  </div>
                ))}
              </div>
              <hr className="border-dashed my-2" />
              <div className="flex justify-between font-bold text-black text-base">
                <span>Total Price</span>
                <span className="text-blue-600">
                  ₹{getTotalPrice(cartItem.device._id).toLocaleString()}
                </span>
              </div>
            </div>
            <div className="mt-4 flex justify-end">
              <BookNowCartBtn deviceId={cartItem.device._id} />
            </div>
          </div>
        ))}
        <div className="flex justify-end mt-4">
          <Button
            variant="destructive"
            size="lg"
            onClick={clearCart}
            className="bg-gradient-to-r from-red-500 to-pink-500 text-white font-bold shadow-md hover:from-red-600 hover:to-pink-600 transition-all duration-200 px-6 py-2 rounded-lg border-0"
          >
            <MdDelete className="inline-block mr-2 mb-1 text-lg" />
            Clear Entire Cart
          </Button>
        </div>
      </div>
    </main>
  );
};

export default CartList;
