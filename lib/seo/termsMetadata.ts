import { Metadata } from "next";
import { INFO } from "@/constants";

export function getTermsMetadata(): Metadata {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://fixamigo.com";
  return {
    title: `Terms and Conditions | ${INFO.name}`,
    description: `Read ${INFO.name}'s Terms and Conditions covering service usage rules, warranty limitations, liabilities, cancellation, and governing law for repair services in Kerala.`,
    keywords: ["terms and conditions", "service terms", "fixamigo terms"],
    authors: [{ name: INFO.name }],
    robots: { index: true, follow: true },
    alternates: { canonical: `${baseUrl}/terms` },
    openGraph: {
      type: "website",
      locale: "en_IN",
      url: `${baseUrl}/terms`,
      siteName: INFO.name,
      title: `Terms and Conditions | ${INFO.name}`,
      description: `${INFO.name} Terms and Conditions for repair services, including usage rules, warranty limits, liabilities, and governing law.`,
      images: [
        {
          url: `${baseUrl}/og-fixamigo.jpg`,
          width: 1200,
          height: 630,
          alt: `${INFO.name} Terms`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `Terms and Conditions | ${INFO.name}`,
      description: `${INFO.name} Terms and Conditions for repair services, including usage rules, warranty limits, liabilities, and governing law.`,
      images: [`${baseUrl}/og-fixamigo.jpg`],
    },
  };
}

export function getTermsStructuredData() {
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
            name: "Terms and Conditions",
            item: `${baseUrl}/terms`,
          },
        ],
      },
      {
        "@type": "WebPage",
        url: `${baseUrl}/terms`,
        name: `Terms and Conditions`,
        isPartOf: { "@type": "WebSite", url: baseUrl, name: INFO.name },
        description: `${INFO.name} terms of service page with usage rules and policies.`,
      },
    ],
  } as const;
}
