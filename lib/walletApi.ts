import { IWalletBalance, IWalletTransaction } from "@/types/wallet";
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
  return response.data.data;
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
  return response.data.data;
};

/**
 * Get wallet transaction by ID
 */
export const getWalletTransactionById = async (
  id: string
): Promise<IWalletTransaction> => {
  const response = await api.get(`/wallet/transactions/${id}`);
  return response.data.data;
};
