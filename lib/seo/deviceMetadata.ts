import { fetchDeviceBySlug } from "@/lib/apiService";
import { Metadata } from "next";
import { INFO, supportCities } from "@/constants";
import { IDevice } from "@/types/device";

export async function getDeviceMetadata(
  brand: string,
  device: string
): Promise<Metadata> {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://fixamigo.com";
  const canonicalUrl = `${baseUrl}/repair/mobile-phone/${brand}/${device}`;

  try {
    const deviceData = await fetchDeviceBySlug(device);

    if (!deviceData) throw new Error("Failed to fetch device metadata");

    const brandName = deviceData.company || brand;
    const deviceName = deviceData.name;
    const cityNames = supportCities.map((city) => city.name).join(", ");

    const repairServices = "display, battery, camera";

    // Optimized title (30-65 characters) for better SEO
    const title = `${deviceName} Repair | ${brandName} | ${INFO.name}`;
    const description = `Professional ${deviceName} repair in Kerala. We fix ${repairServices} and more for ${brandName} devices. Free pickup & delivery.`;

    // Enhanced keywords with comprehensive coverage (60+ keywords)
    const keywords = [
      // Basic device repair keywords
      `${deviceName} repair`,
      `${brandName} ${deviceName} repair`,
      `${deviceName} ${repairServices} repair`,
      `${deviceName} repair Kerala`,
      `${deviceName} screen repair`,
      `${deviceName} battery replacement`,
      `${deviceName} repair ${cityNames.split(",")[0]}`,
      `${brandName} repair services`,
      `${deviceName} repair near me`,
      `${deviceName} service center`,
      "mobile phone repair",
      "smartphone repair",
      "doorstep mobile repair",
      "free pickup delivery",

      // Device-specific repair keywords
      `${deviceName} screen replacement`,
      `${deviceName} display repair`,
      `${deviceName} battery change`,
      `${deviceName} charging port repair`,
      `${deviceName} camera repair`,
      `${deviceName} water damage repair`,
      `${deviceName} software repair`,
      `${deviceName} motherboard repair`,
      `${deviceName} speaker repair`,
      `${deviceName} microphone repair`,
      `${deviceName} touch screen repair`,

      // Brand + device combinations
      `${brandName} ${deviceName} service`,
      `${brandName} ${deviceName} parts`,
      `genuine ${deviceName} parts`,
      `original ${deviceName} display`,
      `${brandName} ${deviceName} screen`,
      `${brandName} ${deviceName} battery`,

      // Location-specific device keywords
      `${deviceName} repair Kerala`,
      `${deviceName} service Kochi`,
      `${deviceName} repair Trivandrum`,
      `${deviceName} repair Kozhikode`,
      `${deviceName} repair Malappuram`,
      `${deviceName} repair Thrissur`,
      `${deviceName} repair Kollam`,

      // Problem-specific device searches
      `${deviceName} not charging`,
      `${deviceName} black screen`,
      `${deviceName} broken screen`,
      `${deviceName} cracked display`,
      `${deviceName} touch not working`,
      `${deviceName} speaker problem`,
      `${deviceName} microphone issue`,
      `${deviceName} overheating`,
      `${deviceName} hanging problem`,
      `${deviceName} wifi not working`,
      `${deviceName} bluetooth issue`,
      `${deviceName} camera not working`,

      // Service-specific device keywords
      `${deviceName} doorstep repair`,
      `${deviceName} pickup service`,
      `${deviceName} home service`,
      `${deviceName} warranty repair`,
      `certified ${deviceName} repair`,
      `professional ${deviceName} service`,
      `quick ${deviceName} repair`,
      `same day ${deviceName} repair`,
      `genuine ${deviceName} service`,
      `authorized ${deviceName} repair`,

      // Competitive device keywords
      `best ${deviceName} repair center`,
      `trusted ${deviceName} service`,
      `affordable ${deviceName} repair`,
      `cheap ${deviceName} repair`,
      `reliable ${deviceName} technician`,
      `expert ${deviceName} repair`,
    ];

    return {
      title,
      description,
      keywords,

      authors: [{ name: INFO.name }],
      creator: INFO.name,
      publisher: INFO.name,

      alternates: {
        canonical: canonicalUrl,
      },

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

      openGraph: {
        type: "website",
        locale: "en_IN",
        url: canonicalUrl,
        siteName: INFO.name,
        title: `${deviceName} Repair | ${brandName}`,
        description: `Professional ${deviceName} repair services in Kerala. ${repairServices} repair with 6-month warranty. Free pickup & delivery.`,
        images: deviceData.images?.length
          ? [
              {
                url: deviceData.images[0],
                width: 800,
                height: 600,
                alt: `${deviceName} repair services`,
                type: "image/jpeg",
              },
              ...deviceData.images.slice(1, 3).map((img) => ({
                url: img,
                width: 800,
                height: 600,
                alt: `${deviceName} ${brandName}`,
                type: "image/jpeg",
              })),
            ]
          : [
              {
                url: `${baseUrl}/og-device-repair.jpg`,
                width: 1200,
                height: 630,
                alt: `${deviceName} repair services`,
                type: "image/jpeg",
              },
            ],
      },

      twitter: {
        card: "summary_large_image",
        site: "@fixamigo",
        creator: "@fixamigo",
        title: `${deviceName} Repair | ${brandName}`,
        description: `${deviceName} repair with warranty. Professional service, genuine parts, free pickup in Kerala.`,
        images: deviceData.images?.length
          ? [deviceData.images[0]]
          : [`${baseUrl}/og-device-repair.jpg`],
      },

      category: "Technology",

      // Enhanced other metadata with comprehensive SEO details
      other: {
        // Product metadata
        "product:brand": brandName,
        "product:category": "Mobile Phone",
        "product:condition": "Used",

        // Device-specific metadata
        "device:model": deviceName,
        "device:brand": brandName,
        "device:category": "Smartphone",
        "device:repair_services": repairServices,

        // Business metadata
        "article:author": INFO.name,
        "article:publisher": INFO.name,
        "business:contact_data:phone_number": INFO.phone,
        "business:contact_data:email": INFO.email,
        "business:contact_data:locality": "Kerala",
        "business:contact_data:region": "Kerala",
        "business:contact_data:country_name": "India",

        // Service metadata
        "service:device_model": deviceName,
        "service:warranty_months": "6",
        "service:pickup": "available",
        "service:delivery": "available",
        "service:same_day": "available",
        "service:price_range": "₹99-₹15000",
        "service:area": "Kerala",
        "service:languages": "English,Malayalam,Hindi",

        // Geographic metadata
        "geo.region": "IN-KL",
        "geo.placename": "Kerala, India",
        "geo.position": "10.8739;76.2733",
        ICBM: "10.8739, 76.2733",

        // Technical SEO metadata
        "revisit-after": "7 days",
        "content-language": "en-IN",
        distribution: "global",
        rating: "general",
        robots: "index,follow,max-image-preview:large,max-snippet:-1",

        // Mobile metadata
        "mobile-web-app-capable": "yes",
        "mobile-web-app-status-bar-style": "default",
        "mobile-web-app-title": `${deviceName} Repair`,
        "format-detection": "telephone=yes",

        // Dublin Core metadata
        "DC.title": `${deviceName} Repair Services`,
        "DC.creator": INFO.name,
        "DC.subject": `${deviceName}, ${brandName}, Mobile Repair, Kerala`,
        "DC.description": `Professional ${deviceName} repair services in Kerala`,
        "DC.language": "en-IN",
        "DC.coverage": "Kerala, India",
        "DC.type": "Service",

        // Business hours and details
        "business:hours:monday": "09:00-18:00",
        "business:hours:tuesday": "09:00-18:00",
        "business:hours:wednesday": "09:00-18:00",
        "business:hours:thursday": "09:00-18:00",
        "business:hours:friday": "09:00-18:00",
        "business:hours:saturday": "09:00-18:00",
        "business:hours:sunday": "Closed",
      },

      applicationName: INFO.name,
      referrer: "origin-when-cross-origin",
    };
  } catch (error) {
    console.error("Error generating device metadata:", error);

    // Enhanced fallback metadata when device data is unavailable
    const brandName = brand.charAt(0).toUpperCase() + brand.slice(1);
    const fallbackTitle = `${brandName} Mobile Repair | ${INFO.name}`;
    const fallbackDescription = `Professional mobile phone repair services for ${brandName} devices. Display, battery, camera repair with free pickup & delivery in Kerala.`;

    return {
      title: fallbackTitle,
      description: fallbackDescription,
      keywords: [
        `${brand} repair`,
        `${brand} mobile repair`,
        `${brandName} phone repair Kerala`,
        `${brandName} screen repair`,
        `${brandName} battery replacement`,
        `${brandName} repair near me`,
        `${brandName} service center`,
        "mobile phone repair",
        "smartphone repair Kerala",
        "doorstep mobile repair",
        "free pickup delivery",
        "genuine parts repair",
        "warranty mobile repair",
        "certified technician repair",
      ],

      authors: [{ name: INFO.name }],
      creator: INFO.name,
      publisher: INFO.name,

      alternates: {
        canonical: canonicalUrl,
      },

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

      openGraph: {
        type: "website",
        locale: "en_IN",
        url: canonicalUrl,
        siteName: INFO.name,
        title: fallbackTitle,
        description: fallbackDescription,
        images: [
          {
            url: `${baseUrl}/og-device-repair.jpg`,
            width: 1200,
            height: 630,
            alt: `${brandName} mobile repair services`,
            type: "image/jpeg",
          },
        ],
      },

      twitter: {
        card: "summary_large_image",
        site: "@fixamigo",
        creator: "@fixamigo",
        title: fallbackTitle,
        description: fallbackDescription,
        images: [`${baseUrl}/og-device-repair.jpg`],
      },

      category: "Technology",

      // Enhanced fallback metadata
      other: {
        "product:brand": brandName,
        "product:category": "Mobile Phone",
        "service:type": "Mobile Phone Repair",
        "service:brand": brandName,
        "service:area": "Kerala",
        "geo.region": "IN-KL",
        "geo.placename": "Kerala, India",
        "content-language": "en-IN",
        robots: "index,follow",
      },

      applicationName: INFO.name,
      referrer: "origin-when-cross-origin",
    };
  }
}

// Enhanced structured data generation for device pages with comprehensive SEO schemas
export function getDeviceStructuredData(
  deviceData: IDevice,
  brand: string,
  device: string
) {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://fixamigo.com";
  const canonicalUrl = `${baseUrl}/repair/mobile-phone/${brand}/${device}`;
  const deviceName = deviceData.name;
  const brandName = deviceData.company || brand;

  return {
    "@context": "https://schema.org",
    "@graph": [
      // Enhanced Product schema with comprehensive details
      {
        "@type": "Product",
        "@id": `${canonicalUrl}#product`,
        name: deviceName,
        brand: {
          "@type": "Brand",
          name: brandName,
        },
        category: "Mobile Phone",
        image: deviceData.images?.length
          ? deviceData.images[0]
          : `${baseUrl}/default-device.jpg`,
        description: `${deviceName} - Professional repair services including display, battery, camera, charging port and other components with 6-month warranty.`,
        offers: {
          "@type": "AggregateOffer",
          availability: "https://schema.org/InStock",
          priceCurrency: "INR",
          lowPrice: "99",
          highPrice: "15000",
          offerCount: deviceData.spareParts?.length || 10,
          seller: {
            "@type": "Organization",
            name: INFO.name,
          },
          priceSpecification: {
            "@type": "PriceSpecification",
            minPrice: "99",
            maxPrice: "15000",
            priceCurrency: "INR",
          },
        },
        review: {
          "@type": "AggregateRating",
          ratingValue: "4.8",
          reviewCount: "500",
          bestRating: "5",
          worstRating: "1",
        },
      },

      // Enhanced Service schema with detailed repair offerings
      {
        "@type": "Service",
        "@id": `${canonicalUrl}#service`,
        name: `${deviceName} Repair Service`,
        description: `Professional repair services for ${deviceName} including pickup and delivery, genuine parts, and 6-month warranty.`,
        provider: {
          "@type": "LocalBusiness",
          "@id": `${baseUrl}#business`,
          name: INFO.name,
          telephone: INFO.phone,
          email: INFO.email,
          address: {
            "@type": "PostalAddress",
            addressLocality: "Malappuram",
            addressRegion: "Kerala",
            addressCountry: "IN",
          },
        },
        areaServed: supportCities.map((city) => ({
          "@type": "City",
          name: city.name,
        })),
        serviceType: "Mobile Phone Repair",
        category: "Electronics Repair",
        offers: {
          "@type": "Offer",
          availability: "https://schema.org/InStock",
          priceCurrency: "INR",
          priceRange: "₹99-₹15000",
        },
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: `${deviceName} Repair Services`,
          itemListElement: [
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: `${deviceName} Screen Repair`,
              },
            },
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: `${deviceName} Battery Replacement`,
              },
            },
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: `${deviceName} Camera Repair`,
              },
            },
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: `${deviceName} Charging Port Repair`,
              },
            },
          ],
        },
      },

      // Enhanced WebPage schema
      {
        "@type": "WebPage",
        "@id": canonicalUrl,
        url: canonicalUrl,
        name: `${deviceName} Repair Services`,
        description: `Get your ${deviceName} repaired by certified technicians with warranty. Professional service with genuine parts.`,
        mainEntity: `${canonicalUrl}#product`,
        breadcrumb: `${canonicalUrl}#breadcrumb`,
      },

      // Comprehensive FAQ schema for device-specific questions
      {
        "@type": "FAQPage",
        "@id": `${canonicalUrl}#faq`,
        mainEntity: [
          {
            "@type": "Question",
            name: `How much does ${deviceName} screen repair cost?`,
            acceptedAnswer: {
              "@type": "Answer",
              text: `${deviceName} screen repair typically costs between ₹1,500 to ₹8,000 depending on the display type and model. We provide upfront pricing with no hidden charges and 6-month warranty.`,
            },
          },
          {
            "@type": "Question",
            name: `How long does ${deviceName} repair take?`,
            acceptedAnswer: {
              "@type": "Answer",
              text: `Most ${deviceName} repairs are completed within 2-4 hours. Complex issues may take up to 24 hours. We provide estimated completion time when you book the service.`,
            },
          },
          {
            "@type": "Question",
            name: `Do you use genuine parts for ${deviceName} repair?`,
            acceptedAnswer: {
              "@type": "Answer",
              text: `Yes, we use only genuine and high-quality compatible parts for ${deviceName} repairs. All parts come with 6-month warranty for your peace of mind.`,
            },
          },
          {
            "@type": "Question",
            name: `Is pickup and delivery available for ${deviceName} repair?`,
            acceptedAnswer: {
              "@type": "Answer",
              text: `Yes, we provide free pickup and delivery services for ${deviceName} repair across Kerala. Book online and we'll collect your device from your preferred location.`,
            },
          },
        ],
      },

      // Enhanced BreadcrumbList schema
      {
        "@type": "BreadcrumbList",
        "@id": `${canonicalUrl}#breadcrumb`,
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: baseUrl,
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Mobile Repair",
            item: `${baseUrl}/repair/mobile-phone`,
          },
          {
            "@type": "ListItem",
            position: 3,
            name: `${brandName} Repair`,
            item: `${baseUrl}/repair/mobile-phone/${brand}`,
          },
          {
            "@type": "ListItem",
            position: 4,
            name: `${deviceName} Repair`,
            item: canonicalUrl,
          },
        ],
      },

      // Enhanced Organization schema
      {
        "@type": "LocalBusiness",
        "@id": `${baseUrl}#business`,
        name: INFO.name,
        description:
          "Professional mobile phone repair services across Kerala with genuine parts and warranty",
        url: baseUrl,
        telephone: INFO.phone,
        email: INFO.email,
        address: {
          "@type": "PostalAddress",
          streetAddress: INFO.address,
          addressLocality: "Malappuram",
          addressRegion: "Kerala",
          postalCode: "676121",
          addressCountry: "IN",
        },
        geo: {
          "@type": "GeoCoordinates",
          latitude: 10.8739,
          longitude: 76.2733,
        },
        openingHoursSpecification: [
          {
            "@type": "OpeningHoursSpecification",
            dayOfWeek: [
              "Monday",
              "Tuesday",
              "Wednesday",
              "Thursday",
              "Friday",
              "Saturday",
            ],
            opens: "09:00",
            closes: "18:00",
          },
        ],
        priceRange: "₹99-₹15000",
        currenciesAccepted: "INR",
        paymentAccepted: "Cash, UPI, Card",
      },
    ],
  };
}

// Generate performance optimization metadata for device pages
export function getDevicePerformanceMetadata(deviceData: IDevice) {
  const preloadLinks: Array<{
    rel: string;
    as: string;
    href: string;
    fetchPriority?: "high" | "low" | "auto";
  }> = [];

  // Add preconnect for S3 bucket
  preloadLinks.push({
    rel: "preconnect",
    as: "fetch",
    href: "https://fixamigo.s3.ap-south-1.amazonaws.com",
  });

  // Add DNS prefetch for S3 bucket
  preloadLinks.push({
    rel: "dns-prefetch",
    as: "fetch",
    href: "https://fixamigo.s3.ap-south-1.amazonaws.com",
  });

  // Preload critical device images
  if (deviceData.images?.length) {
    preloadLinks.push({
      rel: "preload",
      as: "image",
      href: deviceData.images[0],
      fetchPriority: "high",
    });
  }

  return preloadLinks;
}

// Generate the complete structured data script for device pages
export function getDeviceStructuredDataScript(
  deviceData: IDevice,
  brand: string,
  device: string
) {
  const structuredData = getDeviceStructuredData(deviceData, brand, device);

  return {
    id: "enhanced-device-structured-data",
    type: "application/ld+json",
    dangerouslySetInnerHTML: {
      __html: JSON.stringify(structuredData),
    },
    strategy: "beforeInteractive" as const,
  };
}
