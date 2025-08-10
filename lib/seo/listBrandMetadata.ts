import { Metadata } from "next";
import { brands, INFO, supportCities } from "@/constants";
import { IDevice } from "@/types/device";

export function listBrandPageMetadata(brandSlug: string): {
  heading: string;
  metaTitle: string;
  metaDescription: string;
} {
  const brand = brands.find(
    (b) => b.slug.toLowerCase() === brandSlug.toLowerCase()
  );

  if (!brand) {
    return {
      heading: "Phone Repair Services – Select Your Model",
      metaTitle: "Affordable Phone Repair Services | Fast & Reliable",
      metaDescription:
        "Explore our reliable and affordable phone repair services. Select your phone model and get started today.",
    };
  }

  const brandName = brand.name;
  const service = "Phone Repair Services";

  const heading = `${brandName} Phone ${service} – Fast & Reliable Service`;
  const metaTitle = `${brandName} ${service} | Affordable & Trusted Repairs`;
  const metaDescription = `Need a ${brandName} phone ${service.toLowerCase()}? Choose your model and book a repair now. Trusted, fast and budget-friendly service.`;

  return {
    heading,
    metaTitle,
    metaDescription,
  };
}

// Complete metadata function for brand pages
export function getBrandMetadata(brandSlug: string): Metadata {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://fixamigo.com";
  const brand = brands.find(
    (b) => b.slug.toLowerCase() === brandSlug.toLowerCase()
  );
  const canonicalUrl = `${baseUrl}/repair/mobile-phone/${brandSlug}`;
  const cityNames = supportCities.map((city) => city.name).join(", ");

  if (!brand) {
    return {
      title: `Mobile Phone Repair Services | ${INFO.name}`,
      description: `Professional mobile phone repair services across Kerala. Choose your device model for expert repair with warranty.`,

      keywords: [
        "mobile phone repair",
        "smartphone repair Kerala",
        "mobile service center",
        "phone repair near me",
        "mobile repair services",
        "doorstep mobile repair",
        "free pickup delivery",
        "genuine parts repair",
        "warranty mobile repair",
        "certified technician repair",
        "screen replacement service",
        "battery replacement service",
        "camera repair service",
        "charging port repair",
      ],

      authors: [{ name: INFO.name }],
      creator: INFO.name,
      publisher: INFO.name,

      alternates: { canonical: canonicalUrl },

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
        title: "Mobile Phone Repair Services",
        description:
          "Professional mobile phone repair services across Kerala with genuine parts and warranty.",
        images: [
          {
            url: `${baseUrl}/og-mobile-repair.jpg`,
            width: 1200,
            height: 630,
            alt: "Mobile Phone Repair Services",
            type: "image/jpeg",
          },
        ],
      },

      twitter: {
        card: "summary_large_image",
        site: "@fixamigo",
        creator: "@fixamigo",
        title: "Mobile Phone Repair Services",
        description:
          "Professional mobile phone repair with genuine parts and warranty across Kerala.",
        images: [`${baseUrl}/og-mobile-repair.jpg`],
      },

      category: "Technology",

      other: {
        "geo.region": "IN-KL",
        "geo.placename": "Kerala, India",
        "service:type": "Mobile Phone Repair",
        "service:area": "Kerala",
        "content-language": "en-IN",
        robots: "index,follow",
      },

      applicationName: INFO.name,
      referrer: "origin-when-cross-origin",
    };
  }

  const brandName = brand.name;

  return {
    title: `${brandName} Repair | All Models | ${INFO.name}`,
    description: `Professional ${brandName} mobile phone repair services in Kerala. Choose your ${brandName} model for screen, battery, camera repair and more. Free pickup & delivery in ${cityNames}.`,

    // Comprehensive keywords (50+ keywords)
    keywords: [
      // Basic brand repair keywords
      `${brandName} repair`,
      `${brandName} mobile repair`,
      `${brandName} phone repair Kerala`,
      `${brandName} screen repair`,
      `${brandName} battery replacement`,
      `${brandName} camera repair`,
      `${brandName} repair near me`,
      `${brandName} service center`,
      `${brandName} repair ${cityNames.split(",")[0]}`,
      `doorstep ${brandName} repair`,

      // Service-specific keywords
      `${brandName} mobile service center`,
      `${brandName} phone screen replacement`,
      `${brandName} battery change`,
      `${brandName} camera repair service`,
      `${brandName} charging port fix`,
      `${brandName} water damage repair`,
      `${brandName} software repair`,
      `${brandName} unlocking service`,
      `${brandName} motherboard repair`,
      `${brandName} speaker repair`,
      `${brandName} microphone repair`,
      `${brandName} touch screen repair`,

      // Location + service combinations
      `${brandName} repair Kerala`,
      `${brandName} service center Kerala`,
      `${brandName} repair Malappuram`,
      `${brandName} repair Kochi`,
      `${brandName} repair Trivandrum`,
      `${brandName} repair Kozhikode`,
      `${brandName} repair Thrissur`,
      `${brandName} repair Kollam`,
      `${brandName} repair Palakkad`,

      // Problem-specific searches
      `${brandName} phone not working`,
      `${brandName} screen cracked`,
      `${brandName} battery draining fast`,
      `${brandName} phone overheating`,
      `${brandName} touch not working`,
      `${brandName} speaker problem`,
      `${brandName} microphone issue`,
      `${brandName} charging problem`,
      `${brandName} wifi not working`,
      `${brandName} bluetooth issue`,

      // Service quality keywords
      `genuine ${brandName} parts`,
      `authorized ${brandName} repair`,
      `certified ${brandName} technician`,
      `warranty ${brandName} repair`,
      `doorstep ${brandName} service`,
      `pickup delivery ${brandName}`,
      `same day ${brandName} repair`,

      // Competitive keywords
      `best ${brandName} repair center`,
      `cheap ${brandName} repair`,
      `affordable ${brandName} repair`,
      `fast ${brandName} repair`,
      `professional ${brandName} service`,
      `trusted ${brandName} repair`,
      `expert ${brandName} technician`,
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
      title: `${brandName} Repair | All Models`,
      description: `Choose your ${brandName} model for professional repair services. Expert technicians, genuine parts, and 6-month warranty coverage.`,
      images: [
        {
          url: brand.image.startsWith("/")
            ? `${baseUrl}${brand.image}`
            : brand.image,
          width: 400,
          height: 400,
          alt: `${brandName} Repair Services`,
          type: "image/png",
        },
        {
          url: `${baseUrl}/og-brand-${brandSlug}.jpg`,
          width: 1200,
          height: 630,
          alt: `${brandName} Mobile Repair Services`,
          type: "image/jpeg",
        },
      ],
    },

    twitter: {
      card: "summary_large_image",
      site: "@fixamigo",
      creator: "@fixamigo",
      title: `${brandName} Repair Services`,
      description: `Professional ${brandName} mobile phone repair. Choose your model and book repair service online with warranty.`,
      images: [`${baseUrl}/og-brand-${brandSlug}.jpg`],
    },

    category: "Technology",

    // Comprehensive other metadata for enhanced SEO
    other: {
      // Geographic metadata
      "geo.region": "IN-KL",
      "geo.placename": "Kerala, India",
      "geo.position": "10.8739;76.2733",
      ICBM: "10.8739, 76.2733",

      // Product metadata
      "product:brand": brandName,
      "product:category": "Mobile Phone",
      "product:condition": "Used",

      // Service metadata
      "service:type": "Mobile Phone Repair",
      "service:brand": brandName,
      "service:warranty_months": "6",
      "service:pickup": "available",
      "service:delivery": "available",
      "service:same_day": "available",
      "service:price_range": "₹99-₹15000",
      "service:area": "Kerala",
      "service:languages": "English,Malayalam,Hindi",

      // Business metadata
      "business:contact_data:phone_number": INFO.phone,
      "business:contact_data:email": INFO.email,
      "business:contact_data:locality": "Kerala",
      "business:contact_data:region": "Kerala",
      "business:contact_data:country_name": "India",
      "business:contact_data:street_address": INFO.address,

      // Technical SEO metadata
      "revisit-after": "7 days",
      "content-language": "en-IN",
      distribution: "global",
      rating: "general",
      robots: "index,follow,max-image-preview:large,max-snippet:-1",

      // Mobile metadata
      "mobile-web-app-capable": "yes",
      "mobile-web-app-status-bar-style": "default",
      "mobile-web-app-title": `${brandName} Repair`,
      "format-detection": "telephone=yes",

      // Dublin Core metadata
      "DC.title": `${brandName} Mobile Phone Repair Services`,
      "DC.creator": INFO.name,
      "DC.subject": `${brandName}, Mobile Repair, Kerala, India`,
      "DC.description": `Professional ${brandName} mobile phone repair services in Kerala`,
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

      // Article metadata
      "article:author": INFO.name,
      "article:publisher": INFO.name,
      "article:section": "Technology",
      "article:tag": `${brandName} repair, mobile service, Kerala`,
    },

    applicationName: INFO.name,
    referrer: "origin-when-cross-origin",
  };
}

// Enhanced structured data generation for brand pages
export function getBrandStructuredData(
  brandSlug: string,
  devicesData: IDevice[] = []
) {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://fixamigo.com";
  const brand = brands.find(
    (b) => b.slug.toLowerCase() === brandSlug.toLowerCase()
  );
  const canonicalUrl = `${baseUrl}/repair/mobile-phone/${brandSlug}`;

  if (!brand) {
    return {
      "@context": "https://schema.org",
      "@type": "Service",
      name: "Mobile Phone Repair Services",
      provider: {
        "@type": "Organization",
        name: INFO.name,
      },
    };
  }

  return {
    "@context": "https://schema.org",
    "@graph": [
      // Enhanced Brand schema
      {
        "@type": "Brand",
        "@id": `${canonicalUrl}#brand`,
        name: brand.name,
        description: `${brand.name} mobile phone repair services with genuine parts and warranty`,
        logo: brand.image.startsWith("/")
          ? `${baseUrl}${brand.image}`
          : brand.image,
        url: canonicalUrl,
      },

      // Enhanced Service schema
      {
        "@type": "Service",
        "@id": `${canonicalUrl}#service`,
        name: `${brand.name} Mobile Phone Repair`,
        description: `Professional repair services for ${brand.name} mobile phones including screen, battery, camera, charging port and other components with 6-month warranty.`,
        provider: {
          "@type": "LocalBusiness",
          "@id": `${baseUrl}#business`,
          name: INFO.name,
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
        },
        areaServed: supportCities.map((city) => ({
          "@type": "City",
          name: city.name,
        })),
        serviceType: "Mobile Phone Repair",
        category: "Electronics Repair",
        brand: {
          "@id": `${canonicalUrl}#brand`,
        },
        offers: {
          "@type": "AggregateOffer",
          availability: "https://schema.org/InStock",
          priceCurrency: "INR",
          lowPrice: "99",
          highPrice: "15000",
          offerCount: devicesData.length || 50,
        },
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: `${brand.name} Repair Services`,
          itemListElement: [
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: `${brand.name} Screen Repair`,
              },
            },
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: `${brand.name} Battery Replacement`,
              },
            },
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: `${brand.name} Camera Repair`,
              },
            },
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: `${brand.name} Charging Port Repair`,
              },
            },
          ],
        },
        review: {
          "@type": "AggregateRating",
          ratingValue: "4.8",
          reviewCount: "1200",
          bestRating: "5",
          worstRating: "1",
        },
      },

      // Enhanced WebPage schema
      {
        "@type": "WebPage",
        "@id": canonicalUrl,
        url: canonicalUrl,
        name: `${brand.name} Repair Services`,
        description: `Choose your ${brand.name} model for professional repair service with genuine parts and warranty`,
        mainEntity: `${canonicalUrl}#service`,
        breadcrumb: {
          "@type": "BreadcrumbList",
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
              name: "Mobile Phone Repair",
              item: `${baseUrl}/repair/mobile-phone`,
            },
            {
              "@type": "ListItem",
              position: 3,
              name: `${brand.name} Repair`,
              item: canonicalUrl,
            },
          ],
        },
        publisher: {
          "@type": "Organization",
          name: INFO.name,
          logo: `${baseUrl}/logos/circle-logo.png`,
        },
      },

      // FAQ schema for brand-specific questions
      {
        "@type": "FAQPage",
        "@id": `${canonicalUrl}#faq`,
        mainEntity: [
          {
            "@type": "Question",
            name: `How much does ${brand.name} repair cost?`,
            acceptedAnswer: {
              "@type": "Answer",
              text: `${brand.name} repair costs start from ₹99 depending on the issue. Screen replacement typically costs ₹1500-₹8000, battery replacement ₹800-₹2500, and other repairs vary based on the model and problem.`,
            },
          },
          {
            "@type": "Question",
            name: `Do you provide pickup and delivery for ${brand.name} repair?`,
            acceptedAnswer: {
              "@type": "Answer",
              text: `Yes, we provide free pickup and delivery services for ${brand.name} repair in select cities across Kerala. Book online and our technician will collect your device from your location.`,
            },
          },
          {
            "@type": "Question",
            name: `What warranty do you offer on ${brand.name} repairs?`,
            acceptedAnswer: {
              "@type": "Answer",
              text: `We provide 6 months warranty on all ${brand.name} repairs and replacement parts. If the same issue occurs within warranty period, we will fix it free of charge.`,
            },
          },
          {
            "@type": "Question",
            name: `How long does ${brand.name} repair take?`,
            acceptedAnswer: {
              "@type": "Answer",
              text: `Most ${brand.name} repairs are completed within 2-4 hours. Complex issues like motherboard repair may take 1-2 days. We provide estimated completion time when you book the service.`,
            },
          },
        ],
      },

      // Organization schema
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
        contactPoint: {
          "@type": "ContactPoint",
          telephone: INFO.phone,
          contactType: "customer service",
          availableLanguage: ["English", "Malayalam", "Hindi"],
        },
        sameAs: [
          "https://facebook.com/fixamigo",
          "https://instagram.com/fixamigo",
          "https://twitter.com/fixamigo",
        ],
      },

      // Device list schema (if devices available)
      ...(devicesData.length > 0
        ? [
            {
              "@type": "ItemList",
              "@id": `${canonicalUrl}#devicelist`,
              name: `${brand.name} Device Models`,
              description: `Available ${brand.name} device models for repair service`,
              numberOfItems: devicesData.length,
              itemListElement: devicesData
                .slice(0, 20)
                .map((device, index) => ({
                  "@type": "ListItem",
                  position: index + 1,
                  name: device.name,
                  url: `${canonicalUrl}/${device.slug}`,
                  item: {
                    "@type": "Product",
                    name: device.name,
                    brand: brand.name,
                    category: "Mobile Phone",
                  },
                })),
            },
          ]
        : []),
    ],
  };
}
