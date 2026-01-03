export interface IFixerProfileBranding {
  logo?: string;
  coverImage?: string;
  primaryColor?: string;
  description?: string;
  tagline?: string;
}

export interface IFixerProfileContact {
  phone?: string;
  email?: string;
  address?: string;
  city?: string;
  state?: string;
  pincode?: string;
  website?: string;
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
  branding: IFixerProfileBranding;
  contact: IFixerProfileContact;
  subscription: IFixerProfileSubscription;
  featureFlags: IFixerProfileFeatureFlags;
  createdAt: string;
  updatedAt: string;
}

export interface IFixerResolveResponse {
  success: boolean;
  data?: IFixerProfilePublic;
  message?: string;
  error?: string;
}
