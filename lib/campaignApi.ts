import {
  ICampaign,
  ICampaignValidation,
} from "@/types/campaign";
import api from "./axiosInstance";

/**
 * Campaign API Functions - Simplified
 * Client-side API calls for campaign operations
 */

/**
 * Get campaign details by code
 */
export const getCampaignByCode = async (code: string): Promise<ICampaign> => {
  const response = await api.get(`/campaigns/${code}`);
  return response.data.data;
};

/**
 * Validate campaign code (optional - for preview before signup)
 */
export const validateCampaign = async (
  refCode: string
): Promise<ICampaignValidation> => {
  const response = await api.post("/campaigns/validate", { refCode });
  return response.data;
};

/**
 * Get active campaigns
 */
export const getActiveCampaigns = async (): Promise<ICampaign[]> => {
  const response = await api.get("/campaigns");
  return response.data.data?.campaigns || response.data.data || [];
};
