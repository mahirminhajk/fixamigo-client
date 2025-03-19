"use client";

import { ISparePart, ICartDevice } from "@/types";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface CartState {
  cart: {
    device: ICartDevice | null;
    spareParts: ISparePart[] | [];
  };
  addToCart: (device: ICartDevice, sparePart: ISparePart) => void;
  removeFromCart: (id: string) => void;
  isInCart: (id: string) => boolean;
  isCartEmpty: () => boolean;
  getTotalPrice: () => number;
  clearCart: () => void;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      cart: {
        device: null,
        spareParts: [],
      },

      addToCart: (device, sparePart) =>
        set((state) => {
          if (!state.cart) {
            return { cart: { device, spareParts: [sparePart] } };
          }

          if (state.cart.device && state.cart.device._id === device._id) {
            return {
              cart: {
                device: state.cart.device,
                spareParts: [...state.cart.spareParts, sparePart],
              },
            };
          }

          return { cart: { device, spareParts: [sparePart] } };
        }),

      removeFromCart: (id) =>
        set((state) => {
          if (!state.cart) return state;

          const updatedSpareParts = state.cart.spareParts.filter(
            (item) => item._id !== id
          );

          return {
            cart: {
              device: updatedSpareParts.length > 0 ? state.cart.device : null,
              spareParts: updatedSpareParts,
            },
          };
        }),

      isInCart: (id) =>
        get().cart?.spareParts.some((item) => item._id === id) || false,

      isCartEmpty: () => !get().cart || get().cart?.spareParts.length === 0,

      getTotalPrice: () =>
        get().cart?.spareParts.reduce(
          (acc, item) => acc + item.price.final,
          0
        ) || 0,

      clearCart: () => set({ cart: { device: null, spareParts: [] } }),
    }),
    {
      name: "cart-storage", // ✅ LocalStorage Key
    }
  )
);
