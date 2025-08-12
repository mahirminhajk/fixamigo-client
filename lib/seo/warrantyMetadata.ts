import { Metadata } from "next";
import { INFO } from "@/constants";

export function getWarrantyMetadata(): Metadata {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://fixamigo.com";
  return {
    title: `Warranty Policy | ${INFO.name}`,
    description: `${INFO.name} warranty policy explains coverage, exclusions, and how to raise a warranty claim after repair.`,
    keywords: ["warranty policy", "repair warranty", "fixamigo warranty"],
    authors: [{ name: INFO.name }],
    robots: { index: true, follow: true },
    alternates: { canonical: `${baseUrl}/warranty` },
    openGraph: {
      type: "website",
      locale: "en_IN",
      url: `${baseUrl}/warranty`,
      siteName: INFO.name,
      title: `Warranty Policy | ${INFO.name}`,
      description: `${INFO.name} warranty policy overview.`,
      images: [
        {
          url: `${baseUrl}/og-fixamigo.jpg`,
          width: 1200,
          height: 630,
          alt: `${INFO.name} Warranty`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `Warranty Policy | ${INFO.name}`,
      description: `${INFO.name} warranty policy overview.`,
      images: [`${baseUrl}/og-fixamigo.jpg`],
    },
  };
}

export function getWarrantyStructuredData() {
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
            name: "Warranty Policy",
            item: `${baseUrl}/warranty`,
          },
        ],
      },
      {
        "@type": "WebPage",
        url: `${baseUrl}/warranty`,
        name: `Warranty Policy`,
        isPartOf: { "@type": "WebSite", url: baseUrl, name: INFO.name },
        description: `${INFO.name} warranty policy page describing coverage and claim process.`,
      },
    ],
  } as const;
}
