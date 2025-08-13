import { Metadata } from "next";
import { INFO } from "@/constants";

export function getContactMetadata(): Metadata {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://fixamigo.com";
  return {
    title: `Contact ${INFO.name} — Support, Booking & Help`,
    description: `Contact ${INFO.name} for support, bookings, and queries. Reach us by phone, email, or WhatsApp for quick, friendly assistance across Kerala.`,
    keywords: [
      "contact fixamigo",
      "fixamigo phone",
      "fixamigo email",
      "mobile repair support",
      "customer support kerala",
      "whatsapp fixamigo",
    ],
    authors: [{ name: INFO.name }],
    creator: INFO.name,
    publisher: INFO.name,
    robots: { index: true, follow: true },
    alternates: { canonical: `${baseUrl}/contact` },
    openGraph: {
      type: "website",
      locale: "en_IN",
      url: `${baseUrl}/contact`,
      siteName: INFO.name,
      title: `Contact ${INFO.name} — Support, Booking & Help`,
      description: `Reach ${INFO.name} by phone, email, or WhatsApp for fast support and repair bookings across Kerala.`,
      images: [
        {
          url: `${baseUrl}/og-fixamigo.jpg`,
          width: 1200,
          height: 630,
          alt: `${INFO.name} Contact`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `Contact ${INFO.name} — Support, Booking & Help`,
      description: `Contact ${INFO.name} by phone, email, or WhatsApp for support and bookings across Kerala.`,
      images: [`${baseUrl}/og-fixamigo.jpg`],
    },
  };
}

export function getContactStructuredData() {
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
            name: "Contact",
            item: `${baseUrl}/contact`,
          },
        ],
      },
      {
        "@type": "ContactPage",
        url: `${baseUrl}/contact`,
        name: `Contact ${INFO.name}`,
        description: `Contact page for ${INFO.name} with phone, email, and WhatsApp support details.`,
        isPartOf: { "@type": "WebSite", url: baseUrl, name: INFO.name },
      },
      {
        "@type": "Organization",
        name: INFO.name,
        url: baseUrl,
        contactPoint: {
          "@type": "ContactPoint",
          contactType: "customer service",
          telephone: INFO.phone,
          email: INFO.email,
          areaServed: "Kerala, IN",
          availableLanguage: ["English", "Malayalam"],
        },
      },
    ],
  } as const;
}
