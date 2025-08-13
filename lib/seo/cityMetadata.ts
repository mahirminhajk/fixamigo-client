import { Metadata } from "next";
import { INFO, brands, repairCategory } from "@/constants";

export function getCityMetadata(city: string): Metadata {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://fixamigo.com";
  const formattedCity =
    city.charAt(0).toUpperCase() + city.slice(1).toLowerCase();
  const canonicalUrl = `${baseUrl}/${city}`;

  // Generate dynamic brand list for keywords
  const brandNames = brands
    .slice(0, 3)
    .map((brand) => brand.name)
    .join(", ");

  return {
    title: `${formattedCity} Mobile Repair – Free Pickup & Delivery`,
    description: `Professional mobile phone repair in ${formattedCity}, Kerala. Expert technicians for ${brandNames} and more. Screen, battery, camera repairs.`,

    keywords: [
      // Local service keywords
      `mobile repair ${formattedCity}`,
      `phone repair ${formattedCity}`,
      `smartphone repair ${formattedCity}`,
      `mobile service center ${formattedCity}`,
      `${formattedCity} mobile repair service`,
      `doorstep mobile repair ${formattedCity}`,
      `mobile phone repair ${formattedCity} Kerala`,
      `${formattedCity} phone repair near me`,

      // Service-specific keywords
      `screen repair ${formattedCity}`,
      `display replacement ${formattedCity}`,
      `battery replacement ${formattedCity}`,
      `camera repair ${formattedCity}`,
      `charging port repair ${formattedCity}`,

      // Brand-specific local keywords
      `iPhone repair ${formattedCity}`,
      `Samsung repair ${formattedCity}`,
      `OnePlus repair ${formattedCity}`,

      // Business-specific keywords
      `${INFO.name} ${formattedCity}`,
      `trusted mobile repair ${formattedCity}`,
      `warranty mobile repair ${formattedCity}`,
      `free pickup delivery ${formattedCity}`,
      `online mobile repair booking ${formattedCity}`,

      // Local shop keywords
      `mobile repair shop ${formattedCity}`,
      `phone repair store ${formattedCity}`,
      `smartphone repair center ${formattedCity}`,
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
      title: `${formattedCity} Mobile Repair – Fast & Trusted Service | ${INFO.name}`,
      description: `Get your phone fixed fast in ${formattedCity}. Certified technicians, genuine parts, doorstep pickup & delivery. All brands supported with warranty.`,
      images: [
        {
          url: `${baseUrl}/og-fixamigo.jpg`,
          width: 1200,
          height: 630,
          alt: `${formattedCity} Mobile Repair Services – ${INFO.name}`,
          type: "image/jpeg",
        },
        {
          url: `${baseUrl}/logos/circle-logo.png`,
          width: 512,
          height: 512,
          alt: `${INFO.name} Logo`,
          type: "image/png",
        },
      ],
    },

    twitter: {
      card: "summary_large_image",
      site: "@fixamigo",
      creator: "@fixamigo",
      title: `${formattedCity} Mobile Repair – ${INFO.name}`,
      description: `Professional mobile repair services in ${formattedCity}, Kerala. Free pickup & delivery. All brands supported. ${INFO.tagline}`,
      images: [`${baseUrl}/og-fixamigo.jpg`],
    },

    category: "Technology",

    other: {
      // Geographic metadata
      "geo.region": "IN-KL",
      "geo.placename": `${formattedCity}, Kerala, India`,
      "geo.position": "10.8739;76.2733", // Kerala coordinates
      ICBM: "10.8739, 76.2733",

      // Dublin Core metadata
      "DC.title": `${formattedCity} Mobile Repair Services – ${INFO.name}`,
      "DC.creator": INFO.name,
      "DC.subject": `Mobile Phone Repair, Smartphone Service, ${formattedCity}, Kerala`,
      "DC.description": `Professional mobile phone repair services in ${formattedCity}, Kerala by ${INFO.name}`,
      "DC.language": "en-IN",
      "DC.coverage": `${formattedCity}, Kerala, India`,

      // Business metadata
      "business:contact_data:street_address": INFO.address,
      "business:contact_data:locality": formattedCity,
      "business:contact_data:region": "Kerala",
      "business:contact_data:postal_code": "676121",
      "business:contact_data:country_name": "India",
      "business:contact_data:email": INFO.email,
      "business:contact_data:phone_number": INFO.phone,
      "business:contact_data:website": INFO.website,

      // Local business metadata
      "business:hours:day":
        "monday,tuesday,wednesday,thursday,friday,saturday,sunday",
      "business:hours": "00:00-23:59",
      "business:type": "Mobile Phone Repair Service",
      "business:location": `${formattedCity}, Kerala, India`,
    },

    applicationName: INFO.name,
    referrer: "origin-when-cross-origin",
  };
}

// Generate comprehensive structured data for city pages
export function getCityStructuredData(city: string) {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://fixamigo.com";
  const formattedCity =
    city.charAt(0).toUpperCase() + city.slice(1).toLowerCase();
  const canonicalUrl = `${baseUrl}/${city}`;

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "LocalBusiness",
        "@id": `${canonicalUrl}#business`,
        image: `${baseUrl}/og-fixamigo.jpg`,
        name: `${INFO.name} - ${formattedCity}`,
        alternateName: `${INFO.tagline} in ${formattedCity}`,
        description: `${INFO.name} provides professional mobile phone repair services in ${formattedCity}, Kerala. Expert technicians, genuine parts, free pickup and delivery with warranty.`,
        url: canonicalUrl,
        telephone: INFO.phone,
        email: INFO.email,
        address: {
          "@type": "PostalAddress",
          streetAddress: INFO.address,
          addressLocality: formattedCity,
          addressRegion: "Kerala",
          postalCode: "676121",
          addressCountry: "IN",
        },
        geo: {
          "@type": "GeoCoordinates",
          latitude: "10.8739",
          longitude: "76.2733",
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
              "Sunday",
            ],
            opens: "00:00",
            closes: "23:59",
          },
        ],
        priceRange: "₹₹",
        serviceArea: {
          "@type": "City",
          name: formattedCity,
          containedInPlace: {
            "@type": "State",
            name: "Kerala",
            containedInPlace: {
              "@type": "Country",
              name: "India",
            },
          },
        },
        areaServed: [
          {
            "@type": "City",
            name: formattedCity,
          },
        ],
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: `Mobile Repair Services in ${formattedCity}`,
          itemListElement: repairCategory
            .slice(0, 6)
            .map((category, index) => ({
              "@type": "Offer",
              position: index + 1,
              itemOffered: {
                "@type": "Service",
                name: `${category.name} Repair`,
                description: `Professional ${category.name.toLowerCase()} repair services for all smartphone brands in ${formattedCity}, Kerala`,
                provider: {
                  "@type": "LocalBusiness",
                  name: INFO.name,
                },
                areaServed: {
                  "@type": "City",
                  name: formattedCity,
                },
              },
            })),
        },
        makesOffer: brands.slice(0, 10).map((brand, index) => ({
          "@type": "Offer",
          position: index + 1,
          itemOffered: {
            "@type": "Service",
            name: `${brand.name} Repair Services in ${formattedCity}`,
            description: `${brand.name} smartphone repair and maintenance services in ${formattedCity}, Kerala with genuine parts and warranty`,
            provider: {
              "@type": "LocalBusiness",
              name: INFO.name,
            },
          },
        })),
        sameAs: [INFO.instagram, INFO.website],
        aggregateRating: {
          "@type": "AggregateRating",
          ratingValue: "4.8",
          reviewCount: "150",
          bestRating: "5",
          worstRating: "1",
        },
        review: [
          {
            "@type": "Review",
            reviewRating: {
              "@type": "Rating",
              ratingValue: "5",
              bestRating: "5",
            },
            author: {
              "@type": "Person",
              name: "Local Customer",
            },
            reviewBody: `Excellent mobile repair service in ${formattedCity}. Fast, reliable, and professional.`,
          },
        ],
      },
      {
        "@type": "WebPage",
        "@id": canonicalUrl,
        url: canonicalUrl,
        name: `${formattedCity} Mobile Repair Services - ${INFO.name}`,
        description: `Professional mobile phone repair services in ${formattedCity}, Kerala. Free pickup and delivery for all smartphone brands. Expert technicians with warranty.`,
        isPartOf: {
          "@type": "WebSite",
          name: INFO.name,
          url: baseUrl,
        },
        about: {
          "@type": "LocalBusiness",
          name: `${INFO.name} - ${formattedCity}`,
        },
        mainEntity: `${canonicalUrl}#business`,
        potentialAction: [
          {
            "@type": "SearchAction",
            target: {
              "@type": "EntryPoint",
              urlTemplate: `${baseUrl}/repair/mobile-phone/{search_term_string}`,
            },
            "query-input": "required name=search_term_string",
          },
          {
            "@type": "ReserveAction",
            target: {
              "@type": "EntryPoint",
              urlTemplate: `${baseUrl}/repair/mobile-phone`,
            },
            object: {
              "@type": "Service",
              name: "Mobile Phone Repair Service",
            },
          },
        ],
      },
      {
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
            name: `${formattedCity} Mobile Repair`,
            item: canonicalUrl,
          },
        ],
      },
    ],
  };
}
