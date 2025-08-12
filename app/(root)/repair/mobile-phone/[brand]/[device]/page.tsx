import DeviceDetailsContent from "@/components/contents/DeviceDetailsContent";
import { brands } from "@/constants";
import {
  getDeviceMetadata,
  getDeviceStructuredData,
} from "@/lib/seo/deviceMetadata";
import { IDevice } from "@/types/device";
import { Metadata } from "next";
import { fetchDeviceBySlug, fetchDevicesByBrand } from "@/lib/apiService";
import React from "react";
import DeviceCartBarClient from "@/components/pageSpecific/DeviceCartBarClient";
import Script from "next/script";

// Static Generation - Restored original logic
export const revalidate = false;
export const dynamicParams = true;
export async function generateStaticParams() {
  const paths: { brand: string; device: string }[] = [];

  const brandPromises = brands.map(async (brand) => {
    try {
      // Use the new fetch function
      const devicesData: IDevice[] = await fetchDevicesByBrand(brand.slug);

      return devicesData.map((d) => ({
        brand: brand.slug,
        device: d.slug,
      }));
    } catch (error) {
      console.error(`Error fetching device slugs for ${brand.slug}:`, error);
      return []; // Return empty array on error
    }
  });

  const resultsForCategory = await Promise.all(brandPromises);
  resultsForCategory.forEach((brandPaths) => {
    paths.push(...brandPaths);
  });

  return paths;
}

// Metadata (SEO) - Keep original simple logic
export async function generateMetadata({
  params,
}: {
  params: Promise<{ device: string; brand: string }>;
}): Promise<Metadata> {
  const { device, brand } = await params;
  const metadata = await getDeviceMetadata(brand, device);
  return metadata;
}

// Fetch function
const getData = async (deviceSlug: string) => {
  return fetchDeviceBySlug(deviceSlug); // Use the new fetch function
};

// Enhanced Page Component with comprehensive SEO and structured data
export default async function Page({
  params,
}: {
  params: Promise<{ device: string; brand: string }>;
}) {
  const { device, brand } = await params;
  const deviceData: IDevice | null = await getData(device);

  if (!deviceData) {
    return (
      <section className="flex justify-center items-center min-h-screen">
        <p className="text-xl font-medium text-red-500">Device not found</p>
      </section>
    );
  }

  // Enhanced structured data with multiple schemas
  const baseStructuredData = getDeviceStructuredData(deviceData, brand, device);
  const deviceName = deviceData.name;
  const brandName = deviceData.company || brand;
  
  // Create comprehensive structured data
  const enhancedStructuredData = {
    "@context": "https://schema.org",
    "@graph": [
      // Include base structured data
      ...(Array.isArray(baseStructuredData["@graph"]) ? baseStructuredData["@graph"] : [baseStructuredData]),
      
      // Add Product schema
      {
        "@type": "Product",
        "@id": `https://fixamigo.com/repair/mobile-phone/${brand}/${device}#product`,
        "name": deviceName,
        "brand": {
          "@type": "Brand",
          "name": brandName
        },
        "category": "Mobile Phone",
        "description": `${deviceName} - Professional repair services available`,
        "image": deviceData.images?.length ? deviceData.images[0] : "https://fixamigo.com/default-device.jpg",
        "offers": {
          "@type": "Offer",
          "availability": "https://schema.org/InStock",
          "price": "999",
          "priceCurrency": "INR",
          "priceSpecification": {
            "@type": "PriceSpecification",
            "minPrice": "99",
            "maxPrice": "15000",
            "priceCurrency": "INR"
          },
          "seller": {
            "@type": "Organization",
            "name": "Fixamigo"
          }
        }
      },
      
      // Add FAQ schema for device-specific questions
      {
        "@type": "FAQPage",
        "@id": `https://fixamigo.com/repair/mobile-phone/${brand}/${device}#faq`,
        "mainEntity": [
          {
            "@type": "Question",
            "name": `How much does ${deviceName} screen repair cost?`,
            "acceptedAnswer": {
              "@type": "Answer",
              "text": `${deviceName} screen repair typically costs between ₹1,500 to ₹8,000 depending on the display type and model. We provide upfront pricing with no hidden charges.`
            }
          },
          {
            "@type": "Question",
            "name": `How long does ${deviceName} repair take?`,
            "acceptedAnswer": {
              "@type": "Answer",
              "text": `Most ${deviceName} repairs are completed within 2-4 hours. Complex issues may take up to 24 hours. We provide estimated completion time when you book.`
            }
          },
          {
            "@type": "Question",
            "name": `Do you use genuine parts for ${deviceName} repair?`,
            "acceptedAnswer": {
              "@type": "Answer",
              "text": `Yes, we use only genuine and high-quality compatible parts for ${deviceName} repairs. All parts come with 6-month warranty.`
            }
          },
          {
            "@type": "Question",
            "name": `Is pickup and delivery available for ${deviceName} repair?`,
            "acceptedAnswer": {
              "@type": "Answer",
              "text": `Yes, we provide free pickup and delivery services for ${deviceName} repair across Kerala. Book online and we'll collect your device from your location.`
            }
          }
        ]
      },
      
      // Add Service schema for device repair
      {
        "@type": "Service",
        "@id": `https://fixamigo.com/repair/mobile-phone/${brand}/${device}#repair-service`,
        "name": `${deviceName} Repair Service`,
        "description": `Professional repair services for ${deviceName} including screen replacement, battery change, camera repair, and more.`,
        "provider": {
          "@type": "LocalBusiness",
          "name": "Fixamigo",
          "telephone": "+91-9876543210",
          "email": "support@fixamigo.com"
        },
        "serviceType": "Mobile Phone Repair",
        "areaServed": [
          { "@type": "State", "name": "Kerala" }
        ],
        "offers": {
          "@type": "Offer",
          "availability": "https://schema.org/InStock",
          "priceRange": "₹99-₹15000"
        },
        "hasOfferCatalog": {
          "@type": "OfferCatalog",
          "name": `${deviceName} Repair Services`,
          "itemListElement": [
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": `${deviceName} Screen Repair`
              }
            },
            {
              "@type": "Offer", 
              "itemOffered": {
                "@type": "Service",
                "name": `${deviceName} Battery Replacement`
              }
            },
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service", 
                "name": `${deviceName} Camera Repair`
              }
            }
          ]
        }
      },
      
      // Add BreadcrumbList schema
      {
        "@type": "BreadcrumbList",
        "@id": `https://fixamigo.com/repair/mobile-phone/${brand}/${device}#breadcrumb`,
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Home",
            "item": "https://fixamigo.com"
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": "Mobile Repair",
            "item": "https://fixamigo.com/repair/mobile-phone"
          },
          {
            "@type": "ListItem",
            "position": 3,
            "name": `${brandName} Repair`,
            "item": `https://fixamigo.com/repair/mobile-phone/${brand}`
          },
          {
            "@type": "ListItem",
            "position": 4,
            "name": `${deviceName} Repair`,
            "item": `https://fixamigo.com/repair/mobile-phone/${brand}/${device}`
          }
        ]
      }
    ]
  };

  return (
    <>
      {/* Enhanced JSON-LD Structured Data */}
      <Script
        id="enhanced-device-structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(enhancedStructuredData),
        }}
        strategy="beforeInteractive"
      />

      {/* Performance optimizations */}
      <link rel="preconnect" href="https://fixamigo.s3.ap-south-1.amazonaws.com" />
      <link rel="dns-prefetch" href="https://fixamigo.s3.ap-south-1.amazonaws.com" />
      
      {/* Preload critical device images */}
      {deviceData.images?.length && (
        <link
          rel="preload"
          as="image"
          href={deviceData.images[0]}
          fetchPriority="high"
        />
      )}

      <main className="relative min-h-screen bg-gray-50 lg:bg-white">
        <section className="lg:py-8">
          <DeviceDetailsContent deviceData={deviceData} />
        </section>
        {/* --- Cart Bar Client Component --- */}
        <DeviceCartBarClient />
      </main>
    </>
  );
}
