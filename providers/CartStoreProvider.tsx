"use client";

import {
  createContext,
  useRef,
  useContext,
  type PropsWithChildren,
} from "react";
import { useCartStore } from "@/stores/cartStore";
import { useStore } from "zustand";

export const CartStoreContext = createContext<typeof useCartStore | null>(null);

export const CartStoreProvider = ({ children }: PropsWithChildren) => {
  const storeRef = useRef<typeof useCartStore | null>(null);
  if (!storeRef.current) {
    storeRef.current = useCartStore;
  }

  return (
    <CartStoreContext.Provider value={storeRef.current}>
      {children}
    </CartStoreContext.Provider>
  );
};

export const useCartStoreContext = <T,>(
  selector: (state: ReturnType<typeof useCartStore>) => T
) => {
  const store = useContext(CartStoreContext);
  if (!store) {
    throw new Error(
      "useCartStoreContext must be used within CartStoreProvider"
    );
  }
  return useStore(store, selector);
};
