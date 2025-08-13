import { Metadata } from "next";
import { INFO } from "@/constants";

export function getPrivacyMetadata(): Metadata {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://fixamigo.com";
  return {
    title: `Privacy Policy & Data Rights | ${INFO.name}`,
    description: `${INFO.name}'s Privacy Policy explains what data we collect, how we use and share it, and your rights. Learn how we protect your information and contact our team.`,
    keywords: [
      "privacy policy",
      "data protection",
      "user data rights",
      "fixamigo privacy",
    ],
    authors: [{ name: INFO.name }],
    creator: INFO.name,
    publisher: INFO.name,
    robots: { index: true, follow: true },
    alternates: { canonical: `${baseUrl}/privacy` },
    openGraph: {
      type: "website",
      locale: "en_IN",
      url: `${baseUrl}/privacy`,
      siteName: INFO.name,
      title: `Privacy Policy & Data Rights | ${INFO.name}`,
      description: `${INFO.name} privacy practices, data handling, and user rights including access, correction, and deletion requests in Kerala.`,
      images: [
        {
          url: `${baseUrl}/og-fixamigo.jpg`,
          width: 1200,
          height: 630,
          alt: `${INFO.name} Privacy`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `Privacy Policy & Data Rights | ${INFO.name}`,
      description: `${INFO.name} privacy practices, data handling, and user rights including access, correction, and deletion requests.`,
      images: [`${baseUrl}/og-fixamigo.jpg`],
    },
  };
}

export function getPrivacyStructuredData() {
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
            name: "Privacy Policy",
            item: `${baseUrl}/privacy`,
          },
        ],
      },
      {
        "@type": "WebPage",
        url: `${baseUrl}/privacy`,
        name: `Privacy Policy`,
        isPartOf: { "@type": "WebSite", url: baseUrl, name: INFO.name },
        description: `${INFO.name} privacy policy page describing data practices and rights.`,
      },
    ],
  } as const;
}
