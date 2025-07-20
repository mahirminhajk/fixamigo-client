# Next.js Metadata Implementation Guide

## Pattern Overview

This guide shows how to implement comprehensive SEO metadata in Next.js 15 using the App Router, based on the Fixamigo project implementation.

## 1. Basic Metadata Pattern

### Static Metadata (Simple Pages)

```typescript
// app/some-page/page.tsx
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Page Title",
  description: "Page description",
  // ... other metadata
};

export default function Page() {
  return <div>Content</div>;
}
```

### Dynamic Metadata (Data-dependent Pages)

```typescript
// app/dynamic/[slug]/page.tsx
import { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;

  // Fetch data for this specific page
  const data = await fetchData(slug);

  return {
    title: `${data.name} - My Site`,
    description: data.description,
    // ... other metadata
  };
}
```

## 2. SEO Metadata Function Pattern

### Create SEO Helper Functions

```typescript
// lib/seo/pageMetadata.ts
import { Metadata } from "next";
import { INFO } from "@/constants";

export async function getPageMetadata(
  slug: string,
  type: "product" | "category" | "city"
): Promise<Metadata> {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://example.com";

  // Fetch relevant data
  const data = await fetchPageData(slug, type);

  return {
    // Basic SEO
    title: `${data.title} | ${INFO.name}`,
    description: data.description,
    keywords: data.keywords,

    // Technical SEO
    authors: [{ name: INFO.name }],
    creator: INFO.name,
    publisher: INFO.name,

    // Canonicalization
    alternates: {
      canonical: `${baseUrl}/${type}/${slug}`,
    },

    // Robots
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },

    // Open Graph
    openGraph: {
      type: "website",
      locale: "en_US",
      url: `${baseUrl}/${type}/${slug}`,
      siteName: INFO.name,
      title: data.ogTitle,
      description: data.ogDescription,
      images: [
        {
          url: data.image || `${baseUrl}/og-default.jpg`,
          width: 1200,
          height: 630,
          alt: data.imageAlt,
          type: "image/jpeg",
        },
      ],
    },

    // Twitter
    twitter: {
      card: "summary_large_image",
      site: "@yoursite",
      creator: "@yoursite",
      title: data.twitterTitle,
      description: data.twitterDescription,
      images: [data.image || `${baseUrl}/og-default.jpg`],
    },

    // Additional metadata
    category: "Technology",
    other: {
      "geo.region": "IN-KL",
      "geo.placename": "Kerala, India",
      // Add more as needed
    },
  };
}
```

## 3. Structured Data Pattern

### Create Structured Data Functions

```typescript
// lib/seo/structuredData.ts
export function getProductStructuredData(product: IProduct) {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://example.com";

  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description,
    image: product.images,
    brand: {
      "@type": "Brand",
      name: product.brand,
    },
    offers: {
      "@type": "Offer",
      price: product.price,
      priceCurrency: "INR",
      availability: "https://schema.org/InStock",
    },
  };
}
```

### Use Structured Data in Pages

```typescript
// app/product/[slug]/page.tsx
import Script from "next/script";
import { getProductStructuredData } from "@/lib/seo/structuredData";

export default async function ProductPage({ params }) {
  const product = await fetchProduct(params.slug);
  const structuredData = getProductStructuredData(product);

  return (
    <>
      <Script
        id="product-structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData),
        }}
      />

      <main>{/* Page content */}</main>
    </>
  );
}
```

## 4. Complete Implementation Example

### Device Page (From Fixamigo)

```typescript
// app/(root)/repair/mobile-phone/[brand]/[device]/page.tsx
import {
  getDeviceMetadata,
  getDeviceStructuredData,
} from "@/lib/seo/deviceMetadata";
import Script from "next/script";

// Generate dynamic metadata
export async function generateMetadata({ params }): Promise<Metadata> {
  const { device, brand } = await params;
  return await getDeviceMetadata(brand, device);
}

export default async function DevicePage({ params }) {
  const { device, brand } = await params;
  const deviceData = await fetchDevice(device);

  if (!deviceData) {
    return <div>Not found</div>;
  }

  const structuredData = getDeviceStructuredData(deviceData, brand, device);

  return (
    <>
      {/* Structured Data */}
      <Script
        id="device-structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData),
        }}
      />

      <main>{/* Page content */}</main>
    </>
  );
}
```

## 5. Key Metadata Properties

### Essential SEO Properties

```typescript
{
  title: "Page Title - Brand Name",
  description: "Comprehensive page description",
  keywords: ["keyword1", "keyword2", "keyword3"],

  // Authorship
  authors: [{ name: "Company Name" }],
  creator: "Company Name",
  publisher: "Company Name",

  // Canonicalization
  alternates: {
    canonical: "https://example.com/page-url",
  },

  // Robots directives
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
}
```

### Social Media Optimization

```typescript
{
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://example.com/page",
    siteName: "Site Name",
    title: "OG Title",
    description: "OG Description",
    images: [
      {
        url: "https://example.com/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Image description",
        type: "image/jpeg",
      }
    ],
  },

  twitter: {
    card: "summary_large_image",
    site: "@twitterhandle",
    creator: "@twitterhandle",
    title: "Twitter Title",
    description: "Twitter Description",
    images: ["https://example.com/twitter-image.jpg"],
  },
}
```

## 6. Best Practices

### 1. File Organization

```
lib/seo/
├── homepageMetadata.ts    # Homepage specific
├── deviceMetadata.ts      # Device pages
├── categoryMetadata.ts    # Category pages
├── cityMetadata.ts        # Location pages
└── structuredData.ts      # Shared structured data
```

### 2. Error Handling

```typescript
export async function getMetadata(slug: string): Promise<Metadata> {
  try {
    const data = await fetchData(slug);
    if (!data) throw new Error("Data not found");

    return generateMetadata(data);
  } catch (error) {
    console.error("Metadata generation error:", error);

    // Return fallback metadata
    return {
      title: "Default Title",
      description: "Default description",
    };
  }
}
```

### 3. Performance Considerations

- Use static generation when possible
- Cache metadata generation results
- Minimize API calls in metadata functions
- Use appropriate image sizes for social media

### 4. SEO Checklist

- ✅ Unique titles and descriptions
- ✅ Proper keyword usage
- ✅ Canonical URLs
- ✅ Open Graph tags
- ✅ Twitter Cards
- ✅ Structured data (JSON-LD)
- ✅ Proper robots directives
- ✅ Mobile-friendly viewport
- ✅ Error handling and fallbacks

This pattern ensures comprehensive SEO coverage for all your Next.js pages while maintaining clean, maintainable code.
