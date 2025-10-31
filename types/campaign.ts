/**
 * Campaign Types
 * QR and Referral campaign types for marketing system
 */

export interface ICampaign {
  _id: string;
  name: string;
  description?: string;
  type: "QR" | "REFERRAL";
  refCode: string;
  rewardCoins: number;
  referrerRewardCoins?: number;
  startDate?: Date;
  endDate?: Date;
  isActive: boolean;
  maxRedemptions?: number;
  currentRedemptions?: number;
  maxRedemptionsPerUser?: number;
  meta?: {
    campaignId?: string;
    imageUrl?: string;
    termsAndConditions?: string;
  };
  createdAt?: Date;
  updatedAt?: Date;
}

export interface ICampaignValidation {
  valid: boolean;
  reason?: string;
  campaign?: ICampaign;
  expectedReward?: number;
}

export interface ICampaignRedemption {
  _id: string;
  userId: string;
  campaignId: string;
  refCode: string;
  type: "QR" | "REFERRAL";
  coinsGranted?: number;
  referrerId?: string;
  referrerCoinsGranted?: number;
  status: "PENDING" | "CREDITED" | "BLOCKED";
  fraudScore?: number;
  metadata?: {
    ipAddress?: string;
    userAgent?: string;
    deviceId?: string;
  };
  redeemedAt: Date;
  creditedAt?: Date;
}

export interface IReferralLink {
  code: string;
  referralLink: string;
  campaignId: string;
}
