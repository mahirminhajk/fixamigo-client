import { Metadata } from "next";
import { INFO, supportCities } from "@/constants";

export function getRepairMetadata(): Metadata {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://fixamigo.com";
  const cityNames = supportCities.map((city) => city.name).join(", ");

  return {
    title: "Repairs: Mobile & Laptop Service | Fixamigo",
    description:
      "Book expert mobile phone and laptop repair services with Fixamigo. Quality parts, pickup & delivery in select cities across Kerala, and warranty-backed service.",
    keywords: [
      "mobile repair",
      "laptop repair",
      "phone screen replacement",
      "battery replacement",
      "device service",
      "Kerala repair service",
      "Fixamigo",
    ],
    authors: [{ name: INFO.name }],
    creator: INFO.name,
    publisher: INFO.name,
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
    alternates: {
      canonical: `${baseUrl}/repair`,
    },
    openGraph: {
      type: "website",
      locale: "en_IN",
      url: `${baseUrl}/repair`,
      siteName: INFO.name,
      title: "Repairs: Mobile & Laptop Service | Fixamigo",
      description: `Professional mobile and laptop repairs with pickup & delivery and warranty-backed parts in ${cityNames}.`,
      images: [
        {
          url: `${baseUrl}/og-fixamigo.jpg`,
          width: 1200,
          height: 630,
          alt: "Fixamigo Repairs",
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
      title: "Repairs: Mobile & Laptop Service | Fixamigo",
      description:
        "Professional mobile and laptop repairs with pickup & delivery and warranty-backed parts.",
      images: [`${baseUrl}/og-fixamigo.jpg`],
    },
    category: "Technology",
    other: {
      "geo.region": "IN-KL",
      "geo.placename": "Kerala, India",
      "geo.position": "10.8739;76.2733",
      ICBM: "10.8739, 76.2733",
      "service:type": "Device Repair",
      "service:area": "Kerala",
      "content-language": "en-IN",
      robots: "index,follow",
    },
    applicationName: INFO.name,
    referrer: "origin-when-cross-origin",
  };
}

export function getRepairStructuredData() {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://fixamigo.com";
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: `${baseUrl}/`,
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Repairs",
            item: `${baseUrl}/repair`,
          },
        ],
      },
      {
        "@type": "Service",
        name: "Device Repair Services",
        serviceType: ["Mobile Phone Repair", "Laptop Repair"],
        areaServed: "Kerala, India",
        url: `${baseUrl}/repair`,
        provider: {
          "@type": "Organization",
          name: INFO.name,
          url: baseUrl,
          logo: `${baseUrl}/logos/circle-logo.png`,
        },
        offers: {
          "@type": "AggregateOffer",
          priceCurrency: "INR",
          lowPrice: "99",
          highPrice: "8000",
          offerCount: 2,
        },
      },
      {
        "@type": "ItemList",
        name: "Available Repair Services",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            item: {
              "@type": "Service",
              name: "Mobile Phone Repair",
              url: `${baseUrl}/repair/mobile-phone`,
            },
          },
          {
            "@type": "ListItem",
            position: 2,
            item: {
              "@type": "Service",
              name: "Laptop Repair",
              url: `${baseUrl}/repair/laptop`,
            },
          },
        ],
      },
    ],
  } as const;
}
