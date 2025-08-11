"use client";
import { useHydratedStore } from "@/hooks/useHydratedStore";
import { getDiscountPercentage, getSparePartsIcon } from "@/lib/utils";
import { useCartStore } from "@/stores/cartStore";
import Image from "next/image";
import Link from "next/link";
import { Button } from "../ui/button";
import { MdDelete } from "react-icons/md";
import BookNowCartBtn from "../buttons/bookNowCartBtn";
import PriceRangeInfo from "./PriceRangeInfo";

const CartList = () => {
  const cart = useHydratedStore(useCartStore, (state) => state.cart);
  const clearCart = useCartStore((state) => state.clearCart);
  const removeFromCart = useCartStore((state) => state.removeFromCart);
  const getTotalPrice = useCartStore((state) => state.getTotalPrice);
  const hasRangeItems = useCartStore((state) => state.hasRangeItems);

  if (!cart || !Array.isArray(cart.items) || cart.items.length === 0)
    return null;

  return (
    <main className="w-full flex flex-col items-center pb-28 bg-gray-50 min-h-screen">
      {/* Mobile and Tablet Layout */}
      <div className="w-full max-w-md lg:hidden p-4">
        {cart.items.map((cartItem) => (
          <div
            key={cartItem.device._id}
            className="pb-6 mb-8 border-b border-gray-300"
          >
            <div className="flex justify-between items-center mb-4 pt-4 px-2">
              <div className="flex items-center gap-3">
                <Link
                  href={`/repair/mobile-phone/${cartItem.device.company.toLowerCase()}/${
                    cartItem.device.slug
                  }`}
                  className="flex items-center gap-3 hover:opacity-80 transition-opacity"
                  title={`View ${cartItem.device.name} repair options`}
                >
                  <Image
                    src={cartItem.device.images?.[0] || "/logos/logo.png"}
                    alt={cartItem.device.name}
                    title={`${cartItem.device.name} Logo`}
                    width={40}
                    height={40}
                    className="rounded-md border bg-white object-contain"
                  />
                  <div className="flex flex-col">
                    <span className="font-semibold text-lg text-black hover:text-blue-600 transition-colors">
                      {cartItem.device.name}
                    </span>
                    {hasRangeItems(cartItem.device._id) && (
                      <PriceRangeInfo
                        hasPriceRange={hasRangeItems(cartItem.device._id)}
                      />
                    )}
                  </div>
                </Link>
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
                      title={`${item.label} Icon`}
                      width={36}
                      height={36}
                      className="object-contain"
                    />
                    <div className="flex-1 text-sm">
                      <p className="text-gray-800 font-medium">{item.label}</p>
                      <div className="flex items-center space-x-2">
                        {!(
                          item.price.range &&
                          item.price.startPrice &&
                          item.price.endPrice
                        ) && (
                          <>
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
                          </>
                        )}
                        <span
                          className="font-bold"
                          style={{
                            color:
                              item.price.range &&
                              item.price.startPrice &&
                              item.price.endPrice
                                ? "#D2691E"
                                : "black",
                          }}
                        >
                          {item.price.range &&
                          item.price.startPrice &&
                          item.price.endPrice
                            ? `₹${item.price.startPrice} - ₹${item.price.endPrice}*`
                            : `₹${item.price.final}`}
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
                    <span>{item.label.toLowerCase()}</span>
                    <span className="font-medium">
                      {item.price.range &&
                      item.price.startPrice &&
                      item.price.endPrice
                        ? `₹${item.price.startPrice} - ₹${item.price.endPrice}*`
                        : `₹${item.price.final}`}
                    </span>
                  </div>
                ))}
              </div>
              <hr className="border-dashed my-2" />
              <div className="flex justify-between font-bold text-black text-base">
                <span>Total Price</span>
                <span
                  style={{
                    color: hasRangeItems(cartItem.device._id)
                      ? "#D2691E"
                      : "#2563eb",
                  }}
                >
                  ₹{getTotalPrice(cartItem.device._id).toLocaleString()}
                  {hasRangeItems(cartItem.device._id) ? "*" : ""}
                </span>
              </div>
              {hasRangeItems(cartItem.device._id) && (
                <div className="mt-2 text-xs" style={{ color: "#D2691E" }}>
                  <p>
                    * Maximum estimated price. Final price will be confirmed by
                    service partner.
                  </p>
                </div>
              )}
            </div>
            <div className="mt-4 flex justify-end">
              <BookNowCartBtn deviceSlug={cartItem.device.slug} />
            </div>
          </div>
        ))}
        <div className="mt-4">
          <Button
            variant="destructive"
            size="lg"
            onClick={clearCart}
            className="relative inline-flex items-center justify-center gap-3 w-full px-6 md:px-8 py-3 md:py-4
                       bg-gradient-to-r from-[#D2691E] to-[#121212]
                       hover:from-[#121212] hover:to-[#D2691E]
                       text-white font-bold rounded-2xl
                       shadow-xl hover:shadow-2xl
                       transform transition-all duration-300
                       hover:scale-105 hover:-translate-y-1
                       focus:outline-none focus:ring-4 focus:ring-[#D2691E]/50
                       border-0"
          >
            <MdDelete className="text-lg" />
            Clear Entire Cart
          </Button>
        </div>
      </div>

      {/* Desktop Layout */}
      <div className="hidden lg:block w-full max-w-6xl p-4">
        <div className="grid gap-8">
          {cart.items.map((cartItem) => (
            <div
              key={cartItem.device._id}
              className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden"
            >
              {/* Device Header */}
              <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
                <div className="flex justify-between items-center">
                  <Link
                    href={`/repair/mobile-phone/${cartItem.device.company.toLowerCase()}/${
                      cartItem.device.slug
                    }`}
                    className="flex items-center gap-4 hover:opacity-80 transition-opacity"
                    title={`View ${cartItem.device.name} repair options`}
                  >
                    <Image
                      src={cartItem.device.images?.[0] || "/logos/logo.png"}
                      alt={cartItem.device.name}
                      title={`${cartItem.device.name} Logo`}
                      width={60}
                      height={60}
                      className="rounded-lg border-2 border-white bg-white object-contain shadow-sm"
                    />
                    <div className="flex flex-col">
                      <h3 className="font-bold text-xl text-black hover:text-blue-600 transition-colors">
                        {cartItem.device.name}
                      </h3>
                      {hasRangeItems(cartItem.device._id) && (
                        <PriceRangeInfo
                          hasPriceRange={hasRangeItems(cartItem.device._id)}
                        />
                      )}
                    </div>
                  </Link>
                  <Button
                    variant="outline"
                    onClick={() => {
                      // Remove all spare parts for this device
                      cartItem.spareParts.forEach((sp) =>
                        removeFromCart(cartItem.device._id, sp._id)
                      );
                    }}
                    className="text-red-500 hover:text-red-700 hover:bg-red-50 border-red-200"
                  >
                    <MdDelete className="mr-2 h-4 w-4" />
                    Remove All Items
                  </Button>
                </div>
              </div>

              {/* Spare Parts Grid */}
              <div className="p-6">
                {cartItem.spareParts.length > 0 ? (
                  <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3 mb-6">
                    {cartItem.spareParts.map((item) => (
                      <div
                        key={item._id}
                        className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg border border-gray-200 hover:shadow-sm transition-shadow"
                      >
                        <Image
                          src={getSparePartsIcon(item.category)}
                          alt={item.label}
                          title={`${item.label} Icon`}
                          width={48}
                          height={48}
                          className="object-contain"
                        />
                        <div className="flex-1">
                          <p className="text-gray-900 font-semibold text-base mb-1">
                            {item.label}
                          </p>
                          <div className="flex items-center space-x-2">
                            {!(
                              item.price.range &&
                              item.price.startPrice &&
                              item.price.endPrice
                            ) && (
                              <>
                                <span className="text-blue-600 font-semibold text-sm">
                                  -
                                  {getDiscountPercentage(
                                    item.price.total,
                                    item.price.final
                                  )}
                                  %
                                </span>
                                <span className="text-gray-400 line-through text-sm">
                                  ₹{item.price.total}
                                </span>
                              </>
                            )}
                            <span
                              className="font-bold text-base"
                              style={{
                                color:
                                  item.price.range &&
                                  item.price.startPrice &&
                                  item.price.endPrice
                                    ? "#D2691E"
                                    : "black",
                              }}
                            >
                              {item.price.range &&
                              item.price.startPrice &&
                              item.price.endPrice
                                ? `₹${item.price.startPrice} - ₹${item.price.endPrice}*`
                                : `₹${item.price.final}`}
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
                          className="text-red-400 hover:text-red-600 hover:bg-red-50"
                        >
                          <MdDelete className="h-5 w-5" />
                        </Button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-400 text-center py-8">
                    No items in cart
                  </p>
                )}

                {/* Desktop Summary and Action */}
                <div className="flex flex-col lg:flex-row gap-6">
                  {/* Price Summary */}
                  <div className="flex-1 bg-gray-50 p-6 rounded-xl border border-gray-200">
                    <h4 className="font-semibold text-lg mb-4 text-gray-900">
                      Price Breakdown
                    </h4>
                    <div className="space-y-3 mb-4">
                      {cartItem.spareParts.map((item) => (
                        <div
                          key={item._id}
                          className="flex justify-between text-gray-700"
                        >
                          <span className="capitalize">
                            {item.label.toLowerCase()}
                          </span>
                          <span className="font-medium">
                            {item.price.range &&
                            item.price.startPrice &&
                            item.price.endPrice
                              ? `₹${item.price.startPrice} - ₹${item.price.endPrice}*`
                              : `₹${item.price.final}`}
                          </span>
                        </div>
                      ))}
                    </div>
                    <hr className="border-dashed border-gray-300 my-4" />
                    <div className="flex justify-between font-bold text-xl text-gray-900">
                      <span>Total Price</span>
                      <span
                        style={{
                          color: hasRangeItems(cartItem.device._id)
                            ? "#D2691E"
                            : "#2563eb",
                        }}
                      >
                        ₹{getTotalPrice(cartItem.device._id).toLocaleString()}
                        {hasRangeItems(cartItem.device._id) ? "*" : ""}
                      </span>
                    </div>
                    {hasRangeItems(cartItem.device._id) && (
                      <div
                        className="mt-3 text-sm"
                        style={{ color: "#D2691E" }}
                      >
                        <p>
                          * Maximum estimated price. Final price will be
                          confirmed by service partner.
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Action Button */}
                  <div className="flex flex-col justify-center lg:w-64">
                    <BookNowCartBtn deviceSlug={cartItem.device.slug} />
                  </div>
                </div>
              </div>
            </div>
          ))}

          {/* Desktop Clear Cart Button */}
          <div className="flex justify-center mt-8">
            <Button
              variant="destructive"
              size="lg"
              onClick={clearCart}
              className="relative inline-flex items-center justify-center gap-3 px-8 py-4
                         bg-gradient-to-r from-[#D2691E] to-[#121212]
                         hover:from-[#121212] hover:to-[#D2691E]
                         text-white font-bold rounded-2xl
                         shadow-xl hover:shadow-2xl
                         transform transition-all duration-300
                         hover:scale-105 hover:-translate-y-1
                         focus:outline-none focus:ring-4 focus:ring-[#D2691E]/50
                         border-0 min-w-[280px]"
            >
              <MdDelete className="text-lg" />
              Clear Entire Cart
            </Button>
          </div>
        </div>
      </div>
    </main>
  );
};

export default CartList;
