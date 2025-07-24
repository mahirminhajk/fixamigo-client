"use client";

import { ISparePart, ICartDevice } from "@/types";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface CartItem {
  device: ICartDevice;
  spareParts: ISparePart[];
}

interface CartState {
  cart: {
    items: CartItem[];
  };
  addToCart: (device: ICartDevice, sparePart: ISparePart) => void;
  removeFromCart: (deviceId: string, sparePartId: string) => void;
  isInCart: (deviceId: string, sparePartId: string) => boolean;
  isCartEmpty: () => boolean;
  getTotalPrice: (deviceId?: string) => number;
  hasRangeItems: (deviceId?: string) => boolean;
  clearCart: () => void;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      cart: {
        items: [],
      },

      addToCart: (device, sparePart) =>
        set((state) => {
          const items = Array.isArray(state.cart.items)
            ? [...state.cart.items]
            : [];
          const deviceIndex = items.findIndex(
            (item) => item.device._id === device._id
          );
          if (deviceIndex > -1) {
            // Device exists, add spare part if not already present
            const spareExists = items[deviceIndex].spareParts.some(
              (sp) => sp._id === sparePart._id
            );
            if (!spareExists) {
              items[deviceIndex].spareParts.push(sparePart);
            }
          } else {
            // New device entry
            items.push({ device, spareParts: [sparePart] });
          }
          return { cart: { items } };
        }),

      removeFromCart: (deviceId, sparePartId) =>
        set((state) => {
          let items = Array.isArray(state.cart.items)
            ? state.cart.items.map((item) => {
                if (item.device._id === deviceId) {
                  return {
                    ...item,
                    spareParts: item.spareParts.filter(
                      (sp) => sp._id !== sparePartId
                    ),
                  };
                }
                return item;
              })
            : [];
          // Remove device entry if no spare parts left
          items = items.filter((item) => item.spareParts.length > 0);
          return { cart: { items } };
        }),

      isInCart: (deviceId, sparePartId) => {
        const cart = get().cart;
        if (!cart || !Array.isArray(cart.items) || cart.items.length === 0)
          return false;
        return cart.items.some(
          (item) =>
            item.device._id === deviceId &&
            Array.isArray(item.spareParts) &&
            item.spareParts.some((sp) => sp._id === sparePartId)
        );
      },

      isCartEmpty: () => {
        const cart = get().cart;
        if (!cart || !Array.isArray(cart.items) || cart.items.length === 0)
          return true;
        return cart.items.every(
          (item) =>
            Array.isArray(item.spareParts) && item.spareParts.length === 0
        );
      },

      getTotalPrice: (deviceId?: string) => {
        const cart = get().cart;
        if (!cart || !Array.isArray(cart.items) || cart.items.length === 0)
          return 0;
        if (deviceId) {
          // Return total for a specific device
          const item = cart.items.find((item) => item.device._id === deviceId);
          if (!item || !Array.isArray(item.spareParts)) return 0;
          return item.spareParts.reduce((sum, sp) => {
            // Use endPrice if it's a range, otherwise use final price
            const price =
              sp.price.range && sp.price.endPrice
                ? sp.price.endPrice
                : sp.price.final;
            return sum + price;
          }, 0);
        }
        // Return total for all devices (fallback)
        return cart.items.reduce(
          (acc, item) =>
            acc +
            (Array.isArray(item.spareParts)
              ? item.spareParts.reduce((sum, sp) => {
                  // Use endPrice if it's a range, otherwise use final price
                  const price =
                    sp.price.range && sp.price.endPrice
                      ? sp.price.endPrice
                      : sp.price.final;
                  return sum + price;
                }, 0)
              : 0),
          0
        );
      },

      hasRangeItems: (deviceId?: string) => {
        const cart = get().cart;
        if (!cart || !Array.isArray(cart.items) || cart.items.length === 0)
          return false;
        if (deviceId) {
          // Check for a specific device
          const item = cart.items.find((item) => item.device._id === deviceId);
          if (!item || !Array.isArray(item.spareParts)) return false;
          return item.spareParts.some(
            (sp) => sp.price.range && sp.price.endPrice
          );
        }
        // Check for all devices (fallback)
        return cart.items.some(
          (item) =>
            Array.isArray(item.spareParts) &&
            item.spareParts.some((sp) => sp.price.range && sp.price.endPrice)
        );
      },

      clearCart: () => set({ cart: { items: [] } }),
    }),
    {
      name: "cart-storage1", // ✅ LocalStorage Key
    }
  )
);
