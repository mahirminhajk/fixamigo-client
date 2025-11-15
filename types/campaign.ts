/**
 * Campaign Types - Simplified
 * Campaign system for new customer signup bonuses
 */

export interface ICampaign {
  _id: string;
  name: string;
  description?: string;
  refCode: string;
  rewardCoins: number;
  rewardCoinsExpiryDays?: number;
  startDate?: Date;
  endDate?: Date;
  isActive: boolean;
  maxRedemptions?: number;
  currentRedemptions?: number;
  meta?: Record<string, any>;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface ICampaignValidation {
  valid: boolean;
  reason?: string;
  campaign?: ICampaign;
}

export interface ICampaignRedemption {
  _id: string;
  userId: string;
  campaignId: string;
  refCode: string;
  coinsGranted?: number;
  status: "PENDING" | "CREDITED" | "FAILED";
  walletTransactionId?: string;
  metadata?: Record<string, any>;
  redeemedAt: Date;
  creditedAt?: Date;
}
