import { IOrder } from "@/types/order";
import api from "./axiosInstance";

export const previewCoins = async (orderId: string): Promise<{ allowed: number; preWalletFinal: number; rule?: { name: string; percentUsable: number } }> => {
  const res = await api.get(`/order/${orderId}/coins/preview`);
  return res.data.data;
};

export const applyCoins = async (orderId: string, amount?: number): Promise<{ amountUsed: number; price: IOrder["price"] }> => {
  const res = await api.patch(`/order/${orderId}/apply-coins`, { amount });
  return res.data.data;
};

export const removeCoins = async (orderId: string): Promise<{ amountUsed: number; price: IOrder["price"] }> => {
  const res = await api.patch(`/order/${orderId}/remove-coins`, {});
  return res.data.data;
};
