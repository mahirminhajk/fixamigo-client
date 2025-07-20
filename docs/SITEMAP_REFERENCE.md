# Sitemap & Routing Reference

## Quick Route Reference

### 🌐 Public Routes (In Sitemap)

#### Static Routes

- `/` - Homepage (Priority: 1.0, Daily)
- `/repair/mobile-phone` - All brands page (Priority: 0.9, Weekly)
- `/support-request` - Support form (Priority: 0.5, Monthly)

#### Dynamic Routes

```
/{city}                                    # City pages (Priority: 1.0)
/repair/{category}                         # Repair categories (Priority: 0.7)
/repair/mobile-phone/{brand}               # Brand pages (Priority: 0.8)
/repair/mobile-phone/{brand}/{device}      # Device pages (Priority: 0.6)
```

### 🔒 Private Routes (Excluded from Sitemap)

#### User-Specific Pages

- `/cart` - Shopping cart (Client-side)
- `/my-services` - User's services (Client-side)
- `/my-services/summary` - Order summary (Client-side)
- `/repair/checkout` - Checkout process (Client-side)

## Sitemap Generation Details

### Data Sources

- **Cities**: `supportCities` from constants (6 cities)
- **Brands**: `brands` from constants (19 brands)
- **Categories**: `repairCategory` from constants (6 categories, excluding mobile-phone)
- **Devices**: Fetched dynamically via `fetchDevicesByBrand()` API

### URL Count Estimation

- Static routes: 3 URLs
- City routes: 6 URLs
- Category routes: 5 URLs (excluding mobile-phone)
- Brand routes: 19 URLs
- Device routes: ~500+ URLs (varies by API data)
- **Total**: ~530+ URLs

### Error Handling

- API failures don't break sitemap generation
- Individual brand failures are logged but don't stop process
- Graceful fallback for missing device data

## Route Groups Explanation

### `(city)` Group

- **Purpose**: Local SEO optimization
- **Pattern**: `/{city-slug}`
- **Examples**: `/malappuram`, `/kottakkal`
- **Features**: Static generation, city-specific metadata

### `(root)` Group

- **Purpose**: Main public pages
- **Patterns**: `/`, `/repair/*`, `/support-request`
- **Features**: SEO optimized, static generation

### `(order)` Group

- **Purpose**: User-specific functionality
- **Patterns**: `/cart`, `/my-services/*`, `/repair/checkout`
- **Features**: Client-side rendering, authentication required

## SEO Priorities

| Route Type          | Priority | Reasoning              |
| ------------------- | -------- | ---------------------- |
| Homepage            | 1.0      | Most important page    |
| City pages          | 1.0      | Critical for local SEO |
| Mobile-phone brands | 0.9      | Main service category  |
| Brand pages         | 0.8      | High commercial value  |
| Category pages      | 0.7      | Service discovery      |
| Device pages        | 0.6      | Product-specific pages |
| Support             | 0.5      | Utility page           |

## File Locations

### Key Files

- **Sitemap**: `app/sitemap.ts`
- **Constants**: `constants/index.ts`
- **API Service**: `lib/apiService.ts`
- **Route Layouts**: `app/(group)/layout.tsx`
- **Page Components**: `app/(group)/*/page.tsx`

### Metadata Files

- `lib/seo/cityMetadata.ts` - City-specific SEO
- `lib/seo/categoryMetadata.ts` - Category SEO
- `lib/seo/deviceMetadata.ts` - Device SEO
- `lib/seo/listBrandMetadata.ts` - Brand SEO

## Performance Notes

### Static Generation

- All public routes use static generation
- Device routes pre-generated at build time
- ISR (Incremental Static Regeneration) available via API routes

### API Optimization

- Concurrent device fetching using Promise.all
- Error isolation per brand
- Caching with Next.js cache tags

## Development Commands

```bash
# Build sitemap
npm run build

# Check sitemap output
curl http://localhost:3000/sitemap.xml

# Validate TypeScript
npx tsc --noEmit
```

---

_Quick reference for Fixamigo Client routing and sitemap structure_
