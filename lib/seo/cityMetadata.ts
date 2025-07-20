import { Metadata } from "next";
import { INFO, brands, repairCategory } from "@/constants";

export function getCityMetadata(city: string): Metadata {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://fixamigo.com";
  const formattedCity =
    city.charAt(0).toUpperCase() + city.slice(1).toLowerCase();
  const canonicalUrl = `${baseUrl}/${city}`;

  return {
    title: `${formattedCity}'s Trusted Mobile Repair Services – ${INFO.name}`,
    description: `${INFO.name} offers reliable and affordable mobile repair services in ${formattedCity}. Book online for display, battery, camera, and port repairs at your doorstep. Free pickup & delivery.`,
    keywords: [
      `${formattedCity} mobile repair`,
      `phone screen repair in ${formattedCity}`,
      `display replacement ${formattedCity}`,
      `${INFO.name} ${formattedCity}`,
      `mobile service center ${formattedCity}`,
      `smartphone repair ${formattedCity}`,
      `doorstep mobile repair ${formattedCity}`,
      `${formattedCity} phone repair near me`,
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
      locale: "en_US",
      url: canonicalUrl,
      siteName: INFO.name,
      title: `${formattedCity} Mobile Repair – ${INFO.name}`,
      description: `Get your phone fixed fast in ${formattedCity}. Trusted technicians, doorstep pickup, quality parts. Book your repair today.`,
      images: [
        {
          url: `${baseUrl}/og-city-${city}.jpg`,
          alt: `${formattedCity} Mobile Repair – ${INFO.name}`,
          width: 1200,
          height: 630,
          type: "image/jpeg",
        },
      ],
    },

    twitter: {
      card: "summary_large_image",
      site: "@fixamigo",
      creator: "@fixamigo",
      title: `${formattedCity} Mobile Repair – ${INFO.name}`,
      description: `Professional mobile repair services in ${formattedCity}. Free pickup & delivery. Book online now!`,
      images: [`${baseUrl}/og-city-${city}.jpg`],
    },

    category: "Technology",

    other: {
      "geo.region": "IN-KL",
      "geo.placename": `${formattedCity}, Kerala, India`,
      "business:contact_data:locality": formattedCity,
      "business:contact_data:region": "Kerala",
      "business:contact_data:country_name": "India",
    },
  };
}

// Generate structured data for city pages
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
        name: `${INFO.name} - ${formattedCity}`,
        description: `Professional mobile phone repair services in ${formattedCity}, Kerala. Specializing in smartphone repairs with free pickup and delivery.`,
        url: canonicalUrl,
        telephone: INFO.phone,
        email: INFO.email,
        address: {
          "@type": "PostalAddress",
          addressLocality: formattedCity,
          addressRegion: "Kerala",
          addressCountry: "IN",
        },
        areaServed: {
          "@type": "City",
          name: formattedCity,
          containedInPlace: {
            "@type": "State",
            name: "Kerala",
          },
        },
        serviceArea: {
          "@type": "City",
          name: formattedCity,
        },
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: `Mobile Repair Services in ${formattedCity}`,
          itemListElement: repairCategory
            .slice(0, 5)
            .map((category, index) => ({
              "@type": "Offer",
              position: index + 1,
              itemOffered: {
                "@type": "Service",
                name: `${category.name} Repair`,
                description: `Professional ${category.name.toLowerCase()} repair services for all smartphone brands in ${formattedCity}`,
              },
            })),
        },
        makesOffer: brands.slice(0, 8).map((brand, index) => ({
          "@type": "Offer",
          position: index + 1,
          itemOffered: {
            "@type": "Service",
            name: `${brand.name} Repair Services`,
            description: `${brand.name} smartphone repair and service in ${formattedCity}`,
          },
        })),
        sameAs: [INFO.instagram, INFO.website],
      },
      {
        "@type": "WebPage",
        "@id": canonicalUrl,
        url: canonicalUrl,
        name: `${formattedCity} Mobile Repair Services`,
        description: `Professional mobile phone repair services in ${formattedCity}. Free pickup and delivery for all smartphone brands.`,
        mainEntity: `${canonicalUrl}#business`,
        potentialAction: {
          "@type": "SearchAction",
          target: {
            "@type": "EntryPoint",
            urlTemplate: `${baseUrl}/repair/mobile-phone/{search_term_string}`,
          },
          "query-input": "required name=search_term_string",
        },
      },
    ],
  };
}
