import { Metadata } from "next";
import { INFO } from "@/constants";

export function getAboutMetadata(): Metadata {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://fixamigo.com";
  return {
    title: `About Us | ${INFO.name}`,
    description: `${INFO.name} is ${INFO.tagline2} in Kerala. Learn about our mission, values, and how we deliver trusted mobile and laptop repairs with pickup & delivery and warranty-backed service.`,
    keywords: [
      "about Fixamigo",
      "about us",
      "mobile repair company kerala",
      "laptop repair service kerala",
      "doorstep repair kerala",
      "gadget repair malappuram",
      "trusted technicians",
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
      canonical: `${baseUrl}/about`,
    },
    openGraph: {
      type: "website",
      locale: "en_IN",
      url: `${baseUrl}/about`,
      siteName: INFO.name,
      title: `About ${INFO.name} | ${INFO.tagline2}`,
      description: `Know ${INFO.name}: our story, mission, and commitment to convenient, transparent device repairs in Kerala.`,
      images: [
        {
          url: `${baseUrl}/og-fixamigo.jpg`,
          width: 1200,
          height: 630,
          alt: `${INFO.name} About`,
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
      title: `About ${INFO.name} | ${INFO.tagline2}`,
      description: `${INFO.name} delivers pickup & delivery repairs with certified technicians and warranty-backed service.`,
      images: [`${baseUrl}/og-fixamigo.jpg`],
    },
    category: "Technology",
    other: {
      "geo.region": "IN-KL",
      "geo.placename": "Kerala, India",
      "geo.position": "10.8739;76.2733",
      ICBM: "10.8739, 76.2733",
      "DC.title": `About ${INFO.name}`,
      "DC.description": `${INFO.name} – ${INFO.tagline2}`,
      "business:contact_data:street_address": INFO.address,
      "business:contact_data:locality": "Malappuram",
      "business:contact_data:region": "Kerala",
      "business:contact_data:postal_code": "676121",
      "business:contact_data:country_name": "India",
      "business:contact_data:email": INFO.email,
      "business:contact_data:phone_number": INFO.phone,
      "business:contact_data:website": INFO.website,
    },
    applicationName: INFO.name,
    referrer: "origin-when-cross-origin",
  };
}

export function getAboutStructuredData() {
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
            name: "About",
            item: `${baseUrl}/about`,
          },
        ],
      },
      {
        "@type": "AboutPage",
        "@id": `${baseUrl}/about#about-page`,
        url: `${baseUrl}/about`,
        name: `About ${INFO.name}`,
        isPartOf: {
          "@type": "WebSite",
          url: baseUrl,
          name: INFO.name,
        },
        description: `${INFO.name} is ${INFO.tagline2} in Kerala offering pickup & delivery mobile and laptop repairs by certified technicians.`,
        primaryImageOfPage: {
          "@type": "ImageObject",
          url: `${baseUrl}/og-fixamigo.jpg`,
        },
      },
      {
        "@type": "Organization",
        name: INFO.name,
        url: baseUrl,
        logo: `${baseUrl}/logos/circle-logo.png`,
        sameAs: [
          INFO.instagram,
          INFO.facebook,
          INFO.x,
          INFO.googleBusiness,
          INFO.linkedin,
        ],
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
