import { Metadata } from "next";
import { INFO } from "@/constants";

export function getSupportMetadata(): Metadata {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://fixamigo.com";
  return {
    title: `Customer Support & Grievance | ${INFO.name}`,
    description: `Reach ${INFO.name} support and grievance redressal team. Contact details, escalation process, and response timelines.`,
    keywords: ["customer support", "grievance redressal", "support fixamigo"],
    authors: [{ name: INFO.name }],
    robots: { index: true, follow: true },
    alternates: { canonical: `${baseUrl}/support` },
    openGraph: {
      type: "website",
      locale: "en_IN",
      url: `${baseUrl}/support`,
      siteName: INFO.name,
      title: `Customer Support & Grievance | ${INFO.name}`,
      description: `Support channels, grievance officer, and escalation steps at ${INFO.name}.`,
      images: [
        {
          url: `${baseUrl}/og-fixamigo.jpg`,
          width: 1200,
          height: 630,
          alt: `${INFO.name} Support`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `Customer Support & Grievance | ${INFO.name}`,
      description: `Support channels and grievance escalation steps.`,
      images: [`${baseUrl}/og-fixamigo.jpg`],
    },
  };
}

export function getSupportStructuredData() {
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
            name: "Support",
            item: `${baseUrl}/support`,
          },
        ],
      },
      {
        "@type": "ContactPage",
        url: `${baseUrl}/support`,
        name: `Customer Support & Grievance`,
        description: `Support and grievance redressal information for ${INFO.name}.`,
        isPartOf: { "@type": "WebSite", url: baseUrl, name: INFO.name },
      },
      {
        "@type": "Organization",
        name: INFO.name,
        url: baseUrl,
        contactPoint: [
          {
            "@type": "ContactPoint",
            contactType: "customer service",
            telephone: INFO.phone,
            email: INFO.email,
            availableLanguage: ["English", "Malayalam"],
          },
          {
            "@type": "ContactPoint",
            contactType: "grievance officer",
            telephone: INFO.grievanceOfficer.phone,
            email: INFO.grievanceOfficer.email,
            areaServed: "Kerala, IN",
          },
        ],
      },
    ],
  } as const;
}
