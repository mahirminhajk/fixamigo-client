# Fixamigo Client - App Structure Documentation

## Project Overview

- **Project Name**: Fixamigo Client
- **Type**: Next.js 15 Application
- **Framework**: React 19 with TypeScript
- **Styling**: Tailwind CSS
- **Package Manager**: PNPM
- **Architecture**: App Router (Next.js 13+ structure)

## Directory Structure

### Root Level

```
fixamigo-client/
├── app/                     # Next.js App Router directory
├── components/              # Reusable React components
├── constants/               # Static data and configuration
├── hooks/                   # Custom React hooks
├── lib/                     # Utility functions and services
├── providers/               # Context providers
├── public/                  # Static assets
├── stores/                  # State management (Zustand)
├── types/                   # TypeScript type definitions
├── components.json          # shadcn/ui configuration
├── DESIGN_SYSTEM.md         # Design system documentation
├── package.json             # Project dependencies
└── README.md                # Project documentation
```

## App Router Structure

### Route Groups

The app uses Next.js route groups for organizing pages:

#### 1. `(city)` - City-based Routes (Public, SEO Important)

```
app/(city)/
└── [city]/
    ├── layout.tsx
    └── page.tsx           # City-specific homepage
```

- **Purpose**: Local SEO optimization
- **Dynamic Routes**: `/{city}` (e.g., `/malappuram`, `/kottakkal`)
- **Static Generation**: Yes (using `generateStaticParams`)
- **SEO Priority**: High (0.8-1.0)
- **Cities**: Malappuram, Kottakkal, Kondotty, Tirur, Ponnani, Perinthalmanna

#### 2. `(root)` - Main Public Routes

```
app/(root)/
├── layout.tsx
├── page.tsx               # Homepage
├── repair/
│   ├── [category]/
│   │   └── page.tsx       # Category pages (display, battery, etc.)
│   └── mobile-phone/
│       ├── page.tsx       # All brands listing
│       └── [brand]/
│           ├── page.tsx   # Brand-specific devices
│           └── [device]/
│               └── page.tsx # Device details page
└── support-request/
    └── page.tsx           # Support request form
```

- **Purpose**: Main public-facing pages
- **SEO**: Highly optimized with metadata generation
- **Static Generation**: Yes for all routes
- **Dynamic Content**: Device and brand pages fetch from API

#### 3. `(order)` - User-Specific Routes (Private, Client-Side)

```
app/(order)/
├── layout.tsx
├── cart/
│   └── page.tsx           # Shopping cart
├── my-services/
│   ├── page.tsx           # User's service history
│   └── summary/
│       └── page.tsx       # Order summary
└── repair/
    └── checkout/
        └── page.tsx       # Checkout process
```

- **Purpose**: User authentication required
- **Rendering**: Client-side (`"use client"`)
- **SEO**: Excluded from sitemap
- **Access**: Logged-in users only

### API Routes

```
app/api/
└── revalidate/            # ISR revalidation endpoints
```

## Components Architecture

### Core Components

```
components/
├── core/                  # Essential layout components
│   ├── footer.tsx
│   ├── mobileNavMenu.tsx
│   ├── navbar.tsx
│   └── topbar.tsx
├── ui/                    # shadcn/ui base components
│   ├── button.tsx
│   ├── card.tsx
│   ├── input.tsx
│   └── ...
└── [feature-based]/       # Feature-specific components
```

### Feature-Based Components

- **buttons/**: Action buttons (cart, booking, profile)
- **checkoutComps/**: Checkout process components
- **contents/**: Page content components
- **list/**: List rendering components (brands, cart, parts)
- **others/**: Miscellaneous components (carousel, steps, etc.)
- **pageSpecific/**: Page-specific client components
- **search/**: Search functionality
- **sheets/**: Bottom sheets and modals

## Data Structure

### Constants (`constants/index.ts`)

```typescript
// Brand definitions
brands: Array<{name: string, slug: string, image: string}>

// Repair categories
repairCategory: Array<{name: string, slug: string}>

// Supported cities
supportCities: Array<{name: string, slug: string}>

// Company information
INFO: {phone, email, address, social links, etc.}
```

### API Services (`lib/apiService.ts`)

- `fetchDevicesByBrand(brand: string)`: Get devices for a specific brand
- `fetchDeviceBySlug(deviceSlug: string)`: Get device details

### Types

- **Device**: `IDevice` - Device information structure
- **Address**: Address and location types
- **Order**: Order and service types
- **SpareParts**: Component and pricing types

## Routing Strategy

### Public Routes (Included in Sitemap)

1. **Static Routes**:

   - `/` (Homepage)
   - `/repair/mobile-phone` (All brands)
   - `/support-request` (Support form)

2. **Dynamic Routes**:
   - `/{city}` (City pages)
   - `/repair/{category}` (Repair categories)
   - `/repair/mobile-phone/{brand}` (Brand pages)
   - `/repair/mobile-phone/{brand}/{device}` (Device pages)

### Private Routes (Excluded from Sitemap)

- `/cart` - User's shopping cart
- `/my-services` - User's service history
- `/my-services/summary` - Order summaries
- `/repair/checkout` - Checkout process

## SEO Strategy

### Sitemap Generation (`app/sitemap.ts`)

- **Static Routes**: High priority (0.7-1.0)
- **City Routes**: High priority for local SEO (1.0)
- **Brand Routes**: Medium-high priority (0.8)
- **Device Routes**: Medium priority (0.6)
- **Dynamic Content**: Fetched at build time via API

### SEO Metadata (`lib/seo/`)

- `homepageMetadata.ts` - Homepage SEO and structured data
- `cityMetadata.ts` - City-specific SEO
- `categoryMetadata.ts` - Category SEO
- `deviceMetadata.ts` - Device SEO
- `listBrandMetadata.ts` - Brand SEO

## SEO Strategy

### Homepage Metadata (`lib/seo/homepageMetadata.ts`)

- **Comprehensive SEO**: Title, description, keywords, Open Graph, Twitter cards
- **Local SEO**: Geographic metadata, business information, service areas
- **Structured Data**: JSON-LD for LocalBusiness, Website, and Organization schemas
- **Technical SEO**: Robots directives, canonical URLs, verification codes
- **Performance**: Theme colors, viewport settings, application metadata

### Structured Data Implementation

```typescript
// LocalBusiness schema for local SEO
// Website schema for search functionality
// Organization schema for brand recognition
// Service offerings with detailed descriptions
```

### Metadata Generation

- City-specific metadata for local SEO
- Brand and device-specific metadata
- Category-specific metadata
- Open Graph and Twitter card support

## State Management

### Stores (Zustand)

```
stores/
├── cartStore.ts           # Shopping cart state
└── userStore.ts           # User authentication state
```

### Providers

```
providers/
└── CartStoreProvider.tsx  # Cart state provider
```

## Build and Deployment

### Static Generation

- **City Pages**: Pre-generated for all supported cities
- **Brand Pages**: Pre-generated for all brands
- **Device Pages**: Pre-generated for all devices via API
- **Category Pages**: Pre-generated for all repair categories

### Performance Optimizations

- Image optimization with Next.js Image component
- Font optimization
- Static asset caching
- API response caching with Next.js cache

## Key Features

### 1. Local SEO Optimization

- City-specific landing pages
- Local business information
- Geographic targeting

### 2. E-commerce Functionality

- Device catalog browsing
- Shopping cart management
- Checkout process
- Order tracking

### 3. Service Management

- Repair service categories
- Device-specific services
- Pricing and availability

### 4. User Experience

- Mobile-first design
- Progressive Web App features
- Fast navigation
- Search functionality

## Development Guidelines

### File Naming Conventions

- **Components**: PascalCase (e.g., `BrandsList.tsx`)
- **Pages**: lowercase (e.g., `page.tsx`)
- **Utilities**: camelCase (e.g., `apiService.ts`)
- **Types**: camelCase with interface prefix (e.g., `IDevice`)

### Code Organization

- Feature-based component organization
- Centralized constants and types
- Reusable utility functions
- Clean separation of concerns

### Performance Considerations

- Static generation where possible
- Client-side rendering only for user-specific content
- Optimized API calls with error handling
- Efficient state management

## Future Enhancements

### Potential Additions

- Multi-language support
- Advanced search and filtering
- Real-time order tracking
- Push notifications
- Offline functionality

### Scalability Considerations

- Microservice architecture compatibility
- CDN integration
- Database optimization
- Caching strategies

---

_Last Updated: July 20, 2025_
_Generated for: Fixamigo Client Next.js 15 Application_
