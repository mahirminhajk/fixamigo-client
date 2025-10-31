/**
 * Coupon Types
 * Coupon and redemption types for discount system
 */

export interface ICoupon {
  _id: string;
  code: string;
  label?: string;
  description?: string;
  type: "PERCENT" | "FIXED";
  value: number;
  minOrderValue?: number;
  maxDiscount?: number;
  startDate?: Date;
  expiry?: Date;
  isActive: boolean;
  rewardCoins?: number;
  combinableWithOtherCoupons?: boolean;
  totalUsageLimit?: number;
  totalUsageCount?: number;
  perUserUsageLimit?: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface ICouponValidation {
  isValid: boolean;
  discount?: number;
  message?: string;
  errors?: string[];
  coupon?: ICoupon;
}

export interface IAppliedCoupon {
  code: string;
  couponId: string;
  type: string;
  value: number;
  discount: number;
  applyOrderStage?: string;
}

export interface ICouponRedemption {
  _id: string;
  userId: string;
  couponId: string;
  code: string;
  orderId?: string;
  discount: number;
  status: "APPLIED" | "COMPLETED" | "REVOKED";
  rewardCoinsGranted?: number;
  appliedAt: Date;
  completedAt?: Date;
  revokedAt?: Date;
}
