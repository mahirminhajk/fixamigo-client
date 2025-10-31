import { ICoupon, ICouponValidation } from "@/types/coupon";
import api from "./axiosInstance";

/**
 * Coupon API Functions
 * Client-side API calls for coupon operations
 */

/**
 * Validate a coupon code without applying it
 */
export const validateCoupon = async (
  code: string,
  orderValue: number,
  orderData?: any
): Promise<ICouponValidation> => {
  const response = await api.post("/order/validate-coupon", {
    code,
    orderValue,
    orderData,
  });
  return response.data.data;
};

/**
 * Apply a coupon to an order
 */
export const applyCoupon = async (
  code: string,
  orderId: string,
  orderValue: number,
  orderData?: any
): Promise<{ redemption: any }> => {
  const response = await api.post("/order/apply-coupon", {
    code,
    orderId,
    orderValue,
    orderData,
  });
  return response.data.data;
};

/**
 * Remove a coupon from an order
 */
export const removeCoupon = async (
  code: string,
  orderId: string
): Promise<{ success: boolean }> => {
  const response = await api.post("/order/remove-coupon", { code, orderId });
  return response.data.data;
};

/**
 * Calculate order totals with coupons and wallet applied
 */
export const calculateCheckoutTotal = async (params: {
  orderValue: number;
  walletCoins?: number;
  couponCodes?: string[];
  orderData?: any;
}): Promise<{
  totals: {
    original: number;
    couponDiscount: number;
    walletDiscount: number;
    final: number;
    coinsUsed: number;
    couponsApplied: Array<{ code: string; discount: number }>;
  };
}> => {
  const response = await api.post("/order/checkout/calculate", params);
  return response.data.data;
};

/**
 * Get active coupons available for user
 */
export const getActiveCoupons = async (): Promise<ICoupon[]> => {
  const response = await api.get("/coupons");
  return response.data.data?.coupons || response.data.data || [];
};
