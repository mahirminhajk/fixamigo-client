import { IWalletBalance, IWalletSummary, IWalletTransaction } from "@/types/wallet";
import api from "./axiosInstance";

/**
 * Wallet API Functions
 * Client-side API calls for wallet operations
 */

/**
 * Get user's wallet balance
 */
export const getWalletBalance = async (): Promise<IWalletBalance> => {
  const response = await api.get("/wallet/balance");
  // Backend returns: { success: true, message: string, data: balance }
  return response.data.data || response.data;
};

/**
 * Get wallet transactions with optional filters
 */
export const getWalletTransactions = async (params?: {
  limit?: number;
  offset?: number;
  type?: string;
}): Promise<{ transactions: IWalletTransaction[]; total: number }> => {
  const response = await api.get("/wallet/transactions", { params });
  // Backend returns: { success: true, message: string, data: { transactions, total, page, totalPages } }
  return response.data.data || response.data;
};

/**
 * Get wallet transaction by ID
 */
export const getWalletTransactionById = async (
  id: string
): Promise<IWalletTransaction> => {
  const response = await api.get(`/wallet/transactions/${id}`);
  return response.data.data || response.data;
};

/**
 * Get wallet summary (balance + recent transactions)
 */
export const getWalletSummary = async (): Promise<IWalletSummary> => {
  const response = await api.get("/wallet/summary");
  const payload = response.data?.data || response.data;
  // Normalize to IWalletSummary shape
  return {
    balance: payload.balance as IWalletBalance,
    recentTransactions: (payload.recentTransactions || payload.transactions || []) as IWalletTransaction[],
  };
};
