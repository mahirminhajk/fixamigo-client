import {
    ICampaign,
    ICampaignRedemption,
    ICampaignValidation,
    IReferralLink,
} from "@/types/campaign";
import api from "./axiosInstance";

/**
 * Campaign API Functions
 * Client-side API calls for campaign operations (QR & Referral)
 */

/**
 * Get campaign details by code
 */
export const getCampaignByCode = async (code: string): Promise<ICampaign> => {
  const response = await api.get(`/campaigns/${code}`);
  return response.data.data;
};

/**
 * Validate campaign redemption
 */
export const validateCampaign = async (
  code: string,
  referrerId?: string
): Promise<ICampaignValidation> => {
  const response = await api.post("/campaigns/validate", { code, referrerId });
  return response.data.data;
};

/**
 * Redeem a campaign (QR or Referral)
 */
export const redeemCampaign = async (params: {
  code: string;
  referrerId?: string;
  metadata?: {
    ipAddress?: string;
    userAgent?: string;
    deviceId?: string;
  };
}): Promise<ICampaignRedemption> => {
  const response = await api.post("/campaigns/redeem", params);
  return response.data.data;
};

/**
 * Generate referral link for a campaign
 */
export const generateReferralLink = async (
  campaignId: string
): Promise<IReferralLink> => {
  const response = await api.post(`/campaigns/${campaignId}/referral-link`);
  return response.data.data;
};

/**
 * Get active campaigns
 */
export const getActiveCampaigns = async (params?: {
  type?: "QR" | "REFERRAL";
}): Promise<ICampaign[]> => {
  const response = await api.get("/campaigns", { params });
  return response.data.data?.campaigns || response.data.data || [];
};
