import { brands } from "@/constants";
import {
  listBrandPageMetadata,
  getBrandMetadata,
  getBrandStructuredData,
} from "@/lib/seo/listBrandMetadata";
import { Metadata } from "next";
import BrandPageClient from "@/components/pageSpecific/BrandPageClient";
import { IDevice } from "@/types";
import { fetchDevicesByBrand } from "@/lib/apiService";
import Script from "next/script";

// Static Generation - Enhanced for better SEO
export const revalidate = 86400; // Revalidate daily for fresh data
export const dynamicParams = true;

export async function generateStaticParams() {
  const paths: {
    brand: string;
  }[] = [];

  // Generate static paths for all brands with priority brands first
  const priorityBrands = ["samsung", "apple", "xiaomi", "oneplus", "vivo"];

  // Add priority brands first
  priorityBrands.forEach((brandSlug) => {
    const brand = brands.find((b) => b.slug === brandSlug);
    if (brand) {
      paths.push({ brand: brand.slug });
    }
  });

  // Add remaining brands
  brands.forEach((brand) => {
    if (!priorityBrands.includes(brand.slug)) {
      paths.push({ brand: brand.slug });
    }
  });

  return paths;
}

// Enhanced Metadata (SEO) - Use the enhanced metadata function with additional optimizations
export async function generateMetadata({
  params,
}: {
  params: Promise<{ brand: string }>;
}): Promise<Metadata> {
  const { brand } = await params;
  const baseMetadata = getBrandMetadata(brand);

  // Get brand info for enhanced metadata
  const brandInfo = brands.find(
    (b) => b.slug.toLowerCase() === brand.toLowerCase()
  );
  const brandName = brandInfo?.name || brand;

  // Enhanced metadata with additional SEO features
  const enhancedMetadata: Metadata = {
    ...baseMetadata,

    // Enhanced keywords with more comprehensive coverage
    keywords: [
      ...((baseMetadata.keywords as string[]) || []),

      // Service-specific keywords
      `${brandName} mobile service center`,
      `${brandName} phone screen replacement`,
      `${brandName} battery change`,
      `${brandName} camera repair service`,
      `${brandName} charging port fix`,
      `${brandName} water damage repair`,
      `${brandName} software repair`,
      `${brandName} unlocking service`,

      // Location + service combinations
      `${brandName} repair Kerala`,
      `${brandName} service center Kerala`,
      `${brandName} repair Malappuram`,
      `${brandName} repair Kochi`,
      `${brandName} repair Trivandrum`,
      `${brandName} repair Kozhikode`,

      // Problem-specific searches
      `${brandName} phone not working`,
      `${brandName} screen cracked`,
      `${brandName} battery draining fast`,
      `${brandName} phone overheating`,
      `${brandName} touch not working`,
      `${brandName} speaker problem`,
      `${brandName} microphone issue`,

      // Service quality keywords
      `genuine ${brandName} parts`,
      `authorized ${brandName} repair`,
      `certified ${brandName} technician`,
      `warranty ${brandName} repair`,
      `doorstep ${brandName} service`,
      `pickup delivery ${brandName}`,

      // Competitive keywords
      `best ${brandName} repair center`,
      `cheap ${brandName} repair`,
      `fast ${brandName} repair`,
      `professional ${brandName} service`,
      `trusted ${brandName} repair`,
    ],

    // Enhanced other metadata for better SEO
    other: {
      // Copy existing metadata if it exists
      ...((baseMetadata.other as Record<string, string>) || {}),

      // Technical SEO enhancements
      "revisit-after": "7 days",
      "content-language": "en-IN",
      distribution: "global",
      rating: "general",

      // Mobile-specific metadata
      "mobile-web-app-capable": "yes",
      "mobile-web-app-status-bar-style": "default",
      "mobile-web-app-title": `${brandName} Repair`,

      // Business metadata enhancements
      "business:contact_data:locality": "Kerala",
      "business:contact_data:region": "Kerala",
      "business:contact_data:country_name": "India",

      // Service-specific metadata
      "service:price_range": "₹99-₹15000",
      "service:warranty": "6 months",
      "service:pickup": "available",
      "service:delivery": "available",
      "service:brands": brandName,
    } as Record<string, string>,
  };

  return enhancedMetadata;
}

// Fetch function (remains on the server)
const getData = async (brand: string): Promise<IDevice[]> => {
  return fetchDevicesByBrand(brand);
};

// Enhanced Page Component with better SEO structure
export default async function Page({
  params,
}: {
  params: Promise<{ brand: string }>;
}) {
  const { brand } = await params;
  const initialModels: IDevice[] = await getData(brand);
  const { heading } = listBrandPageMetadata(brand);

  // Get brand info
  const brandInfo = brands.find(
    (b) => b.slug.toLowerCase() === brand.toLowerCase()
  );
  const brandName = brandInfo?.name || brand;

  // Enhanced structured data with additional schemas
  const baseStructuredData = getBrandStructuredData(brand, initialModels);

  // Add FAQ schema for common questions
  const faqStructuredData = {
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: `How much does ${brandName} repair cost?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `${brandName} repair costs start from ₹99 depending on the issue. Screen replacement typically costs ₹1500-₹8000, battery replacement ₹800-₹2500, and other repairs vary based on the model and problem.`,
        },
      },
      {
        "@type": "Question",
        name: `Do you provide pickup and delivery for ${brandName} repair?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `Yes, we provide free pickup and delivery services for ${brandName} repair in select cities across Kerala. Book online and our technician will collect your device from your location.`,
        },
      },
      {
        "@type": "Question",
        name: `What warranty do you offer on ${brandName} repairs?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `We provide 6 months warranty on all ${brandName} repairs and replacement parts. If the same issue occurs within warranty period, we will fix it free of charge.`,
        },
      },
      {
        "@type": "Question",
        name: `How long does ${brandName} repair take?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `Most ${brandName} repairs are completed within 2-4 hours. Complex issues like motherboard repair may take 1-2 days. We provide estimated completion time when you book the service.`,
        },
      },
    ],
  };

  // Combined structured data
  const enhancedStructuredData = {
    "@context": "https://schema.org",
    "@graph": [
      ...(Array.isArray(baseStructuredData["@graph"])
        ? baseStructuredData["@graph"]
        : [baseStructuredData]),
      faqStructuredData,

      // Add Organization schema
      {
        "@type": "Organization",
        "@id": "https://fixamigo.com#organization",
        name: "Fixamigo",
        url: "https://fixamigo.com",
        logo: "https://fixamigo.com/logos/circle-logo.png",
        contactPoint: {
          "@type": "ContactPoint",
          telephone: "+91-9876543210",
          contactType: "customer service",
          availableLanguage: ["English", "Malayalam", "Hindi"],
        },
        sameAs: [
          "https://facebook.com/fixamigo",
          "https://instagram.com/fixamigo",
          "https://twitter.com/fixamigo",
        ],
      },
    ],
  };

  return (
    <>
      {/* Enhanced JSON-LD Structured Data */}
      <Script
        id="enhanced-brand-structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(enhancedStructuredData),
        }}
        strategy="beforeInteractive"
      />

      {/* Preconnect for performance */}
      <link
        rel="preconnect"
        href="https://fixamigo.s3.ap-south-1.amazonaws.com"
      />
      <link
        rel="dns-prefetch"
        href="https://fixamigo.s3.ap-south-1.amazonaws.com"
      />

      <BrandPageClient
        initialModels={initialModels}
        brand={brand}
        heading={heading}
      />
    </>
  );
}
