import { Metadata } from "next";
import { INFO, brands, supportCities } from "@/constants";

export function getCategoryMetadata(category: string): Metadata {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://fixamigo.com";
  const categoryName =
    category.charAt(0).toUpperCase() + category.slice(1).toLowerCase();
  const canonicalUrl = `${baseUrl}/repair/${category}`;
  const cityNames = supportCities.map((city) => city.name).join(", ");

  return {
    title: `${categoryName} Repair for All Phone Brands | ${INFO.name}`,
    description: `Need a ${categoryName.toLowerCase()} repair for your phone? Explore trusted repair options by brand at ${
      INFO.name
    }. Fast service, quality parts, and warranty backed repairs across ${cityNames}.`,

    keywords: [
      `${categoryName.toLowerCase()} repair`,
      `phone ${categoryName.toLowerCase()} repair`,
      `smartphone ${categoryName.toLowerCase()} replacement`,
      `mobile ${categoryName.toLowerCase()} repair Kerala`,
      `${categoryName.toLowerCase()} repair near me`,
      `professional ${categoryName.toLowerCase()} repair`,
      `${categoryName.toLowerCase()} repair service`,
      `${categoryName.toLowerCase()} repair warranty`,
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
      title: `${categoryName} Repair for All Phone Brands | ${INFO.name}`,
      description: `Looking for ${categoryName.toLowerCase()} repair? Choose your phone brand to get started with reliable service.`,
      images: [
        {
          url: `${baseUrl}/og-category-${category}.jpg`,
          width: 1200,
          height: 630,
          alt: `${categoryName} Repair Services`,
          type: "image/jpeg",
        },
      ],
    },

    twitter: {
      card: "summary_large_image",
      site: "@fixamigo",
      creator: "@fixamigo",
      title: `${categoryName} Repair Services`,
      description: `Professional ${categoryName.toLowerCase()} repair for all phone brands. Quality parts, warranty, and expert service.`,
      images: [`${baseUrl}/og-category-${category}.jpg`],
    },

    category: "Technology",

    other: {
      "geo.region": "IN-KL",
      "geo.placename": "Kerala, India",
      "service:type": `${categoryName} Repair`,
      "service:category": "Mobile Phone Repair",
    },
  };
}

// Generate structured data for category pages
export function getCategoryStructuredData(category: string) {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://fixamigo.com";
  const categoryName =
    category.charAt(0).toUpperCase() + category.slice(1).toLowerCase();
  const canonicalUrl = `${baseUrl}/repair/${category}`;

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        "@id": `${canonicalUrl}#service`,
        name: `${categoryName} Repair Service`,
        description: `Professional ${categoryName.toLowerCase()} repair services for all major smartphone brands. Expert technicians, quality parts, and warranty coverage.`,
        provider: {
          "@type": "LocalBusiness",
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
        serviceType: `${categoryName} Repair`,
        category: "Mobile Phone Repair",
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: `${categoryName} Repair for Different Brands`,
          itemListElement: brands.slice(0, 12).map((brand, index) => ({
            "@type": "Offer",
            position: index + 1,
            itemOffered: {
              "@type": "Service",
              name: `${brand.name} ${categoryName} Repair`,
              description: `Professional ${categoryName.toLowerCase()} repair service for ${
                brand.name
              } devices`,
            },
          })),
        },
      },
      {
        "@type": "WebPage",
        "@id": canonicalUrl,
        url: canonicalUrl,
        name: `${categoryName} Repair Services`,
        description: `Choose your phone brand for professional ${categoryName.toLowerCase()} repair service.`,
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
              name: "Repair",
              item: `${baseUrl}/repair`,
            },
            {
              "@type": "ListItem",
              position: 3,
              name: `${categoryName} Repair`,
              item: canonicalUrl,
            },
          ],
        },
      },
      {
        "@type": "ItemList",
        "@id": `${canonicalUrl}#brandlist`,
        name: `Phone Brands for ${categoryName} Repair`,
        description: `Available phone brands for ${categoryName.toLowerCase()} repair service`,
        itemListElement: brands.map((brand, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name: brand.name,
          url: `${baseUrl}/repair/mobile-phone/${brand.slug}`,
        })),
      },
    ],
  };
}
