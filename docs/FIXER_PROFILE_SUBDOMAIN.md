# Public Client Fixer Profile - Subdomain Routing Implementation

## Overview

This document explains the subdomain routing and fixer profile feature implementation in the fixamigo-client (public website). Users can access fixer (supplier) profiles via custom subdomains: `{slug}.fixamigo.com`

## Architecture

### 1. Middleware-Based Subdomain Detection (`middleware.ts`)

**Location**: `/middleware.ts`

The middleware intercepts all requests and detects fixer slugs from subdomain hostnames:

```
myshop.fixamigo.com → /fixer/myshop (internal rewrite)
www.fixamigo.com → / (main site)
api.fixamigo.com → /api/* (skipped)
```

**Key Features**:
- Extracts subdomain from hostname using DNS parts splitting
- Validates slug format: lowercase, 3-63 chars, alphanumeric + hyphen
- Skips reserved subdomains: www, admin, api, mail, staging, dev, etc.
- Uses `NextResponse.rewrite()` to maintain clean URLs in browser
- Prevents double-routing with `/fixer/` path detection

**Reserved Subdomains**:
```typescript
www, admin, api, mail, ftp, staging, dev, development, test, 
app, blog, support, help, docs, cdn, static, assets, localhost
```

### 2. Route Group & Dynamic Page (`(fixer)/[slug]/page.tsx`)

**Location**: `/app/(fixer)/[slug]/page.tsx`

A new route group dedicated to fixer profile pages.

**Features**:
- **Client Component**: Uses `'use client'` for interactive profile experience
- **Metadata**: Customizable per profile (TODO: add dynamic metadata generation)
- **Supplier Context**: Sets cart store supplier context when profile loads
- **State Management**: Uses Zustand to persist supplier across navigation

**Route Structure**:
```
/app
  /(fixer)/
    layout.tsx         # Route group layout
    [slug]/
      page.tsx         # Dynamic profile page
```

### 3. Data Fetching & Types

**Types** (`types/fixerProfile.ts`):
```typescript
IFixerProfilePublic {
  _id, slug, supplier, status, isVisible
  branding: { logo, coverImage, primaryColor, description, tagline }
  contact: { phone, email, address, city, state, pincode, website }
  subscription: { planId, validFrom, validUntil, isActive }
  featureFlags: { showInListing, allowDirectOrders, customBranding, prioritySupport }
}
```

**API Client** (`lib/fixerProfileApi.ts`):
```typescript
fetchFixerProfileBySlug(slug) → IFixerProfilePublic | null
validateFixerSlug(slug) → boolean
```

**Hook** (`hooks/useFixerProfileBySlug.ts`):
```typescript
useFixerProfileBySlug(slug) → { profile, isLoading, error }
```

## Integration Points

### Cart Store Extensions (`stores/cartStore.ts`)

**New Fields**:
```typescript
cart: {
  items: CartItem[]
  supplierId?: string      // Supplier ID for fixer profile orders
  fixerSlug?: string       // Fixer slug for profile context
}
```

**New Actions**:
```typescript
setSupplierContext(supplierId, fixerSlug)
getSupplierContext() → { supplierId?, fixerSlug? }
```

### Checkout Flow Integration (`app/(order)/repair/checkout/page.tsx`)

**Modified Request**:
```typescript
// Before
POST /order/checkout
{ device, spareParts }

// After
POST /order/checkout
{ device, spareParts, fixerSlug? }
```

The `fixerSlug` is automatically extracted from the cart store and passed to the backend, which:
1. Resolves the supplier ID
2. Validates subscription window
3. Attaches supplier ownership to the order
4. Sets origin to FIXER_PROFILE

## UI Components & Pages

### Fixer Profile Page

**Location**: `/app/(fixer)/[slug]/page.tsx`

**Sections**:

1. **Hero Section**: Cover image or colored background based on primary color
2. **Profile Header**: Logo, name, tagline, badges (verified, premium)
3. **Description**: Rich branding description
4. **Contact Card**: Phone, email, website links
5. **Location Card**: Service address with city/state/pincode
6. **CTA Section**: "Browse Repair Services" button
7. **Subscription Info**: Valid until date for service availability

**Error States**:
- Profile not found: Shows error card with "Go back to home" button
- Loading: Shows centered spinner while fetching
- Network error: Gracefully handled with retry option

**Styling**:
- Uses shadcn/ui components (Card, Button)
- Tailwind CSS for responsive layout
- Gradient backgrounds
- Icons from lucide-react (Phone, Mail, MapPin, Globe, AlertCircle, Loader2)

## API Endpoints Used

### Public API (Backend)

```
GET /fixer-profiles/:slug
Response: {
  success: true,
  data: IFixerProfilePublic
}
```

Validation (backend performs):
- Checks `status === PUBLISHED`
- Validates subscription `validFrom <= now <= validUntil`
- Checks plan `status` and `isActive`
- Verifies `isVisible` flag

### Order Checkout API

```
POST /order/checkout
Body: {
  device: ObjectId,
  spareParts: ObjectId[],
  fixerSlug?: string
}
```

Backend handling:
- Resolves `fixerSlug` to supplier ID
- Validates subscription window
- Sets `order.supplier` and `order.origin`

## Development Workflow

### Testing Subdomain Routing

**Local Development**:
```bash
# Add to /etc/hosts
127.0.0.1 localhost
127.0.0.1 testfixer.localhost

# Run dev server
pnpm dev

# Access profile
http://testfixer.localhost:3000
```

**Deployed Environment**:
```
https://testfixer.fixamigo.com
```

### Environment Setup

**Required Environment Variables**:
```env
NEXT_PUBLIC_API_URL=http://localhost:8081/api/v1
```

### Debugging

1. **Middleware Issues**: Check browser DevTools Network tab to see if request was rewritten to `/fixer/[slug]`
2. **Profile Not Found**: Verify fixer profile exists in backend and has `status: PUBLISHED` and valid subscription
3. **Supplier Context**: Use Zustand DevTools to inspect cart store state

## Validation & Error Handling

### Slug Validation

Performed in middleware:
- Minimum 3 characters
- Maximum 63 characters
- Only lowercase letters, numbers, and hyphens
- No leading/trailing hyphens
- Not a reserved subdomain

### Profile Resolution

Performed on page load:
- API call to `/fixer-profiles/:slug`
- Validates profile exists and is published
- Checks subscription window
- Falls back to error state if any validation fails

### Network Error Handling

- Axios instance configured with 401 interceptor for auth
- Failed profile fetches show user-friendly error message
- Retry option provided in error state
- Graceful fallback to main site if profile unavailable

## Performance Considerations

### Caching Strategy

**Frontend**:
- Zustand store with localStorage persistence for supplier context
- React component state for profile data (no additional caching)

**Backend** (ISR Optional):
- Profile data can be cached with short TTL (5-10 minutes)
- Subscription validation must check current timestamp

**Middleware**:
- Lightweight slug validation
- No database calls in middleware
- Fast regex-based format validation

### Image Optimization

- Uses Next.js `Image` component for logo and cover images
- Automatic format conversion (WebP for modern browsers)
- Responsive image sizes

## Security Considerations

### Subdomain Validation

- Strict regex matching prevents injection attacks
- Reserved subdomain list protects system routes
- No user input directly affects routing

### Profile Data Access

- Backend validates profile is PUBLISHED before responding
- Subscription window checked server-side
- No sensitive supplier data exposed in public API
- Origin metadata prevents order attribution confusion

### Cart Store

- Supplier context only set after profile successfully loads
- Validates supplier exists before checkout
- Backend enforces supplier ownership during order creation

## Future Enhancements

### Planned Features

1. **Dynamic Metadata**: Generate SEO metadata per fixer profile
   - Title: `{fixer.name} - Fixamigo`
   - Description: `{branding.tagline or description}`
   - Open Graph images: Use `branding.coverImage`

2. **Profile Analytics**: Track subdomain traffic and engagement
   - Which fixers get most visits
   - Conversion rates per fixer
   - User behavior analytics

3. **Reviews & Ratings**: Display fixer reviews on profile
   - Star rating
   - Recent customer reviews
   - Quality metrics

4. **Booking Calendar**: Integrated pickup scheduling
   - Show available dates
   - Direct booking from profile
   - Calendar integration

5. **Custom Theming**: Let fixers customize profile appearance
   - Font selection
   - Button colors
   - Layout variations

### Extensibility

- Hook system for adding new profile sections
- Plugin-based review/rating integration
- Custom form fields for fixer-specific requirements

## Troubleshooting

### Common Issues

**1. Profile Not Loading**
```
Cause: Fixer profile not found or not published
Solution: 
- Verify profile exists in backend
- Check status === PUBLISHED
- Verify subscription dates are valid
```

**2. Subdomain Not Routing**
```
Cause: Middleware not matching slug
Solution:
- Check /etc/hosts on local machine
- Verify hostname has 3+ parts (slug.domain.tld)
- Check slug matches regex: ^[a-z0-9-]+$
```

**3. Supplier Context Not Persisting**
```
Cause: Store cleared or not initialized
Solution:
- Clear browser localStorage
- Reload profile page
- Check browser console for Zustand errors
```

**4. Order Shows Wrong Supplier**
```
Cause: fixerSlug not passed in checkout request
Solution:
- Verify cart store has fixerSlug
- Check checkout request body includes fixerSlug
- Verify backend is setting supplier correctly
```

## Implementation Checklist

- [x] Middleware for subdomain detection
- [x] Route group and dynamic page
- [x] Type definitions
- [x] API client and hook
- [x] UI component with error states
- [x] Cart store extensions
- [x] Checkout integration
- [ ] Dynamic metadata generation
- [ ] Analytics integration
- [ ] Additional profile sections (reviews, ratings, etc.)

## Related Documentation

- [Backend Fixer Profile API](../fixamigo-server/docs/fixer-profile-api.md)
- [Provider Admin Fixer Profiles](../provider-client/docs/fixer-profiles.md)
- [Cart Store State Management](./project-docs/STATE_MANAGEMENT.md)
- [Data Fetching Strategy](./project-docs/DATA_FETCHING.md)

