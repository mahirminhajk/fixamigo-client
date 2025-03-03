"use client"; // ✅ Zustand should be used only in client components

import { create } from "zustand";
import { persist } from "zustand/middleware";

interface SparePart {
  _id: string;
  label: string;
  category: string;
  totalCost: number;
  discountAmount: number;
  finalPrice: number;
}

interface CartState {
  cart: SparePart[];
  addToCart: (sparePart: SparePart) => void;
  removeFromCart: (id: string) => void;
  isInCart: (id: string) => boolean;
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
    }),
    {
      name: "cart-storage", // ✅ LocalStorage Key
    }
  )
);
