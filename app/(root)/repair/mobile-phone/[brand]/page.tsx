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
export const revalidate = false;
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

// Metadata (SEO) - Use the enhanced metadata function directly
export async function generateMetadata({
  params,
}: {
  params: Promise<{ brand: string }>;
}): Promise<Metadata> {
  const { brand } = await params;
  return getBrandMetadata(brand);
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
