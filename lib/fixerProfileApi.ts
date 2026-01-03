import api from '@/lib/axiosInstance';
import { IFixerProfilePublic, IFixerResolveResponse } from '@/types/fixerProfile';

/**
 * Fetch fixer profile by slug from the public API
 * Returns the complete profile data including branding, contact, and subscription info
 */
export const fetchFixerProfileBySlug = async (
  slug: string
): Promise<IFixerProfilePublic | null> => {
  try {
    const response = await api.get<IFixerResolveResponse>(
      `/fixer-profiles/${slug}`
    );
    
    if (response.data?.success && response.data?.data) {
      return response.data.data;
    }
    
    return null;
  } catch (error) {
    console.error(`Failed to fetch fixer profile for slug: ${slug}`, error);
    return null;
  }
};

/**
 * Check if a fixer profile slug is valid and accessible
 */
export const validateFixerSlug = async (slug: string): Promise<boolean> => {
  try {
    const profile = await fetchFixerProfileBySlug(slug);
    return !!profile;
  } catch {
    return false;
  }
};
