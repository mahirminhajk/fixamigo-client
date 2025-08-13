import { Metadata } from "next";
import { INFO } from "@/constants";

export function getBlogMetadata(): Metadata {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://fixamigo.com";
  return {
    title: `Blog — Tips, Guides & Updates | ${INFO.name}`,
    description: `Explore repair tips, how‑to guides, and updates from ${INFO.name}. Learn device care best practices, product news, and service announcements.`,
    keywords: [
      "fixamigo blog",
      "mobile repair tips",
      "laptop maintenance guides",
      "gadget care",
      "fixamigo updates",
    ],
    authors: [{ name: INFO.name }],
    creator: INFO.name,
    publisher: INFO.name,
    robots: { index: true, follow: true },
    alternates: { canonical: `${baseUrl}/blog` },
    openGraph: {
      type: "website",
      locale: "en_IN",
      url: `${baseUrl}/blog`,
      siteName: INFO.name,
      title: `Blog — Tips, Guides & Updates | ${INFO.name}`,
      description: `Updates, tips, and guides from ${INFO.name}.`,
      images: [
        {
          url: `${baseUrl}/og-fixamigo.jpg`,
          width: 1200,
          height: 630,
          alt: `${INFO.name} Blog`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `Blog — Tips, Guides & Updates | ${INFO.name}`,
      description: `Updates, tips, and guides from ${INFO.name}.`,
      images: [`${baseUrl}/og-fixamigo.jpg`],
    },
    category: "Technology",
  };
}

export function getBlogStructuredData() {
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
            name: "Blog",
            item: `${baseUrl}/blog`,
          },
        ],
      },
      {
        "@type": "Blog",
        "@id": `${baseUrl}/blog#blog`,
        url: `${baseUrl}/blog`,
        name: `${INFO.name} Blog`,
        description: `Updates, tips, and guides from ${INFO.name}.`,
        publisher: {
          "@type": "Organization",
          name: INFO.name,
          url: baseUrl,
          logo: `${baseUrl}/logos/circle-logo.png`,
        },
        blogPost: [],
      },
    ],
  } as const;
}
