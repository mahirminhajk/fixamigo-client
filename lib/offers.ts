// Offers configuration system
// This file controls which devices and services get special offers

export interface SparePartOffer {
  category: string; // e.g., "DISPLAY", "BATTERY", etc.
  discountPercentage: number; // e.g., 12 for 12% off
  description?: string; // Optional custom description
}

export interface DiagnosisOffer {
  serviceType: string; // e.g., "Dead Phone", "Water Damage", etc.
  freeAmount: number; // e.g., 299 for ₹299 off diagnosis
  description?: string; // Optional custom description
}

export interface DeviceOffers {
  deviceSlug: string; // Device slug to match against
  sparePartOffers?: SparePartOffer[]; // Offers for spare parts
  diagnosisOffers?: DiagnosisOffer[]; // Offers for diagnosis services
  isActive: boolean; // Whether offers are currently active
  validUntil?: string; // Optional expiry date (ISO string)
}

// Main offers configuration
export const DEVICE_OFFERS: DeviceOffers[] = [
  // Universal offers that apply to most devices
  {
    deviceSlug: "universal", // Special slug for universal offers
    sparePartOffers: [],
    diagnosisOffers: [
      {
        serviceType: "Dead Phone",
        freeAmount: 299,
        description: "FREE repair for dead devices - Save ₹299",
      },
    ],
    isActive: true,
    validUntil: "2025-12-31T23:59:59.999Z",
  },
];

// Utility functions to get offers for a specific device
export function getDeviceOffers(deviceSlug: string): DeviceOffers | null {
  // First check for device-specific offers
  let offers = DEVICE_OFFERS.find(
    (offer) => offer.deviceSlug === deviceSlug && offer.isActive
  );

  // If no device-specific offers, fall back to universal offers
  if (!offers) {
    offers = DEVICE_OFFERS.find(
      (offer) => offer.deviceSlug === "universal" && offer.isActive
    );
  }

  // Check if offer is still valid (if validUntil is set)
  if (offers?.validUntil) {
    const now = new Date();
    const validUntil = new Date(offers.validUntil);
    if (now > validUntil) {
      return null; // Offer has expired
    }
  }

  return offers || null;
}

export function getSparePartOffer(
  deviceSlug: string,
  category: string
): SparePartOffer | null {
  const deviceOffers = getDeviceOffers(deviceSlug);
  if (!deviceOffers?.sparePartOffers) return null;

  return (
    deviceOffers.sparePartOffers.find((offer) => offer.category === category) ||
    null
  );
}

export function getDiagnosisOffer(
  deviceSlug: string,
  serviceType: string
): DiagnosisOffer | null {
  const deviceOffers = getDeviceOffers(deviceSlug);
  if (!deviceOffers?.diagnosisOffers) return null;

  return (
    deviceOffers.diagnosisOffers.find(
      (offer) => offer.serviceType === serviceType
    ) || null
  );
}

// Helper function to calculate discounted price
export function calculateDiscountedPrice(
  originalPrice: number,
  discountPercentage: number
): { discountedPrice: number; savedAmount: number } {
  const savedAmount = Math.round((originalPrice * discountPercentage) / 100);
  const discountedPrice = originalPrice - savedAmount;

  return {
    discountedPrice,
    savedAmount,
  };
}

// Helper function to check if any offers are available for a device
export function hasActiveOffers(deviceSlug: string): boolean {
  const offers = getDeviceOffers(deviceSlug);
  return !!(
    offers &&
    (offers.sparePartOffers?.length || offers.diagnosisOffers?.length)
  );
}

// Helper function to get all available offer categories for a device
export function getOfferCategories(deviceSlug: string): string[] {
  const offers = getDeviceOffers(deviceSlug);
  if (!offers?.sparePartOffers) return [];

  return offers.sparePartOffers.map((offer) => offer.category);
}
