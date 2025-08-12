import { Metadata } from "next";
import { INFO } from "@/constants";

export function getReturnRefundMetadata(): Metadata {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://fixamigo.com";
  return {
    title: `Return & Refund Policy | ${INFO.name}`,
    description: `Read ${INFO.name}'s return, cancellation, and refund policy for repair services, including eligibility and processing timelines.`,
    keywords: [
      "return policy",
      "refund policy",
      "cancellation policy",
      "fixamigo",
    ],
    authors: [{ name: INFO.name }],
    robots: { index: true, follow: true },
    alternates: { canonical: `${baseUrl}/return-refund` },
    openGraph: {
      type: "website",
      locale: "en_IN",
      url: `${baseUrl}/return-refund`,
      siteName: INFO.name,
      title: `Return & Refund Policy | ${INFO.name}`,
      description: `${INFO.name} return and refund policy overview.`,
      images: [
        {
          url: `${baseUrl}/og-fixamigo.jpg`,
          width: 1200,
          height: 630,
          alt: `${INFO.name} Return & Refund`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `Return & Refund Policy | ${INFO.name}`,
      description: `${INFO.name} return and refund policy overview.`,
      images: [`${baseUrl}/og-fixamigo.jpg`],
    },
  };
}

export function getReturnRefundStructuredData() {
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
            name: "Return & Refund",
            item: `${baseUrl}/return-refund`,
          },
        ],
      },
      {
        "@type": "WebPage",
        url: `${baseUrl}/return-refund`,
        name: `Return & Refund Policy`,
        isPartOf: { "@type": "WebSite", url: baseUrl, name: INFO.name },
        description: `${INFO.name} return, refund, and cancellation policy for services.`,
      },
    ],
  } as const;
}
