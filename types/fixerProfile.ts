export interface IFixerProfileBranding {
  displayName?: string;
  tagline?: string;
  description?: string;
  bio?: string;
  logoUrl?: string;
  coverUrl?: string;
  primaryColor?: string;
  accentColor?: string;
  ctaLabel?: string;
}

export interface IFixerProfileContact {
  phone?: string;
  altPhone?: string;
  email?: string;
  whatsapp?: string;
  website?: string;
}

export interface IFixerProfileLocation {
  primaryServiceLocation?: string;
  city?: string;
  state?: string;
  country?: string;
}

export interface IFixerProfileSocial {
  instagram?: string;
  facebook?: string;
}

export interface IFixerProfileShopDetails {
  name?: string;
  googleMapLink?: string;
}

export interface IFixerProfileStats {
  totalRepairs?: number;
  rating?: number;
  reviewCount?: number;
}

export interface IFixerProfileSubscription {
  planId: string;
  assignedAt: string;
  validFrom: string;
  validUntil: string;
  isActive: boolean;
}

export interface IFixerProfileFeatureFlags {
  showInListing: boolean;
  allowDirectOrders: boolean;
  customBranding: boolean;
  prioritySupport: boolean;
}

export interface IFixerProfilePublic {
  _id: string;
  slug: string;
  supplier: {
    _id: string;
    name: string;
  };
  status: 'DRAFT' | 'PUBLISHED' | 'SUSPENDED';
  isVisible: boolean;
  branding?: IFixerProfileBranding;
  contact?: IFixerProfileContact;
  location?: IFixerProfileLocation;
  social?: IFixerProfileSocial;
  shopDetails?: IFixerProfileShopDetails;
  stats?: IFixerProfileStats;
  subscription?: IFixerProfileSubscription;
  featureFlags?: IFixerProfileFeatureFlags;
  createdAt: string;
  updatedAt: string;
}

export interface IFixerResolveResponse {
  success: boolean;
  data?: IFixerProfilePublic;
  message?: string;
  error?: string;
}
