"use client";

import { getWalletBalance, getWalletTransactions } from "@/lib/walletApi";
import { IWalletBalance, IWalletTransaction } from "@/types/wallet";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface WalletState {
  balance: IWalletBalance | null;
  transactions: IWalletTransaction[];
  isLoading: boolean;
  error: string | null;
  
  // Actions
  setBalance: (balance: IWalletBalance) => void;
  setTransactions: (transactions: IWalletTransaction[]) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  clearWallet: () => void;
  
  // Async actions
  fetchBalance: () => Promise<void>;
  fetchTransactions: (params?: { limit?: number; offset?: number; type?: string }) => Promise<void>;
}

const INITIAL_STATE = {
  balance: null,
  transactions: [],
  isLoading: false,
  error: null,
};

export const useWalletStore = create<WalletState>()(
  persist(
    (set, get) => ({
      ...INITIAL_STATE,
      
      setBalance: (balance) => set({ balance }),
      setTransactions: (transactions) => set({ transactions }),
      setLoading: (isLoading) => set({ isLoading }),
      setError: (error) => set({ error }),
      clearWallet: () => set(INITIAL_STATE),
      
      fetchBalance: async () => {
        try {
          set({ isLoading: true, error: null });
          const balance = await getWalletBalance();
          set({ balance, isLoading: false });
        } catch (error: any) {
          console.error("Failed to fetch wallet balance:", error);
          set({ 
            error: error.response?.data?.message || "Failed to load wallet balance",
            isLoading: false 
          });
        }
      },
      
      fetchTransactions: async (params) => {
        try {
          set({ isLoading: true, error: null });
          const data = await getWalletTransactions(params);
          set({ 
            transactions: data.transactions, 
            isLoading: false 
          });
        } catch (error: any) {
          console.error("Failed to fetch wallet transactions:", error);
          set({ 
            error: error.response?.data?.message || "Failed to load transactions",
            isLoading: false 
          });
        }
      },
    }),
    {
      name: "wallet-storage",
      partialize: (state) => ({
        balance: state.balance,
        // Don't persist transactions and loading states
      }),
    }
  )
);
