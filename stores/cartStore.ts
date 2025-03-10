"use client"; // ✅ Zustand should be used only in client components

import { SparePart } from "@/types/spareParts";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface CartState {
  cart: SparePart[];
  addToCart: (sparePart: SparePart) => void;
  removeFromCart: (id: string) => void;
  isInCart: (id: string) => boolean;
  isCartEmpty: () => boolean;
  getTotalPrice: () => number;
  clearCart: () => void;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      cart: [],
      addToCart: (sparePart) =>
        set((state) => ({ cart: [...state.cart, sparePart] })),
      removeFromCart: (id) =>
        set((state) => ({
          cart: state.cart.filter((item) => item._id !== id),
        })),
      isInCart: (id) => get().cart.some((item) => item._id === id),
      isCartEmpty: () => (get().cart.length === 0 ? true : false),
      getTotalPrice: () =>
        get().cart.reduce((acc, item) => acc + item.price.final, 0),
      clearCart: () => set({ cart: [] }),
    }),
    {
      name: "cart-storage", // ✅ LocalStorage Key
    }
  )
);
