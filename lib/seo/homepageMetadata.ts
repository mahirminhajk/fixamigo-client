import { Metadata } from "next";
import { INFO, supportCities, brands } from "@/constants";

export function getHomepageMetadata(): Metadata {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://fixamigo.com";

  // Generate dynamic city list for keywords
  const cityNames = supportCities.map((city) => city.name).join(", ");
  const brandNames = brands
    .slice(0, 8)
    .map((brand) => brand.name)
    .join(", ");

  return {
    title: `${INFO.name} – ${INFO.tagline2} | Mobile Phone Repair Services Kerala`,
    description: `${INFO.name} is your trusted online service center for mobile phone repairs in Kerala. We offer professional repair services for ${brandNames} and more. Free pickup & delivery in ${cityNames}. Book online now!`,

    keywords: [
      "mobile phone repair Kerala",
      "smartphone repair services",
      "online mobile service center",
      "phone screen repair",
      "battery replacement",
      "camera repair",
      "charging port repair",
      "Fixamigo mobile repair",
      "doorstep mobile repair",
      "Kerala mobile repair",
      `mobile repair ${cityNames.replace(/,/g, "")}`,
      `${brandNames.replace(/,/g, "")} repair`,
      "free pickup delivery mobile repair",
      "trusted mobile technicians",
      "warranty mobile repair",
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
      canonical: baseUrl,
    },

    openGraph: {
      type: "website",
      locale: "en_US",
      url: baseUrl,
      siteName: INFO.name,
      title: `${INFO.name} – Professional Mobile Repair Services in Kerala`,
      description: `Get your smartphone fixed by certified technicians. We repair all major brands with free pickup & delivery across ${cityNames}. ${INFO.tagline}`,
      images: [
        {
          url: `${baseUrl}/og-homepage.jpg`, // You'll need to add this image
          width: 1200,
          height: 630,
          alt: `${INFO.name} - Mobile Phone Repair Services`,
          type: "image/jpeg",
        },
        {
          url: `${baseUrl}/logos/fixamigo-logo.png`,
          width: 512,
          height: 512,
          alt: `${INFO.name} Logo`,
          type: "image/png",
        },
      ],
    },

    twitter: {
      card: "summary_large_image",
      site: "@fixamigo", // Add your Twitter handle if you have one
      creator: "@fixamigo",
      title: `${INFO.name} – Professional Mobile Repair Services`,
      description: `Trusted mobile phone repair services in Kerala. Free pickup & delivery. All major brands supported. ${INFO.tagline}`,
      images: [`${baseUrl}/og-homepage.jpg`],
    },

    verification: {
      google: "your-google-verification-code", // Add your Google Search Console verification
      // yandex: "your-yandex-verification",
      // bing: "your-bing-verification",
    },

    category: "Technology",

    other: {
      "geo.region": "IN-KL",
      "geo.placename": "Kerala, India",
      "geo.position": "10.8739;76.2733", // Approximate coordinates for Kerala
      ICBM: "10.8739, 76.2733",
      "DC.title": `${INFO.name} - Mobile Phone Repair Services`,
      "DC.creator": INFO.name,
      "DC.subject": "Mobile Phone Repair, Smartphone Service, Kerala",
      "DC.description": `Professional mobile phone repair services in Kerala by ${INFO.name}`,
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
    colorScheme: "light",
    themeColor: [
      { media: "(prefers-color-scheme: light)", color: "#ffffff" },
      { media: "(prefers-color-scheme: dark)", color: "#000000" },
    ],
    viewport: "width=device-width, initial-scale=1, maximum-scale=5",

    // Structured data for local business (as other metadata)
    // This would ideally be in a separate JSON-LD script tag
  };
}

// JSON-LD structured data for the homepage
export function getHomepageStructuredData() {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://fixamigo.com";

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "LocalBusiness",
        "@id": `${baseUrl}/#business`,
        name: INFO.name,
        alternateName: INFO.tagline2,
        description: `${INFO.name} provides professional mobile phone repair services across Kerala with free pickup and delivery.`,
        url: baseUrl,
        telephone: INFO.phone,
        email: INFO.email,
        address: {
          "@type": "PostalAddress",
          streetAddress: INFO.address,
          addressLocality: "Malappuram",
          addressRegion: "Kerala",
          postalCode: "676121",
          addressCountry: "IN",
        },
        geo: {
          "@type": "GeoCoordinates",
          latitude: "10.8739",
          longitude: "76.2733",
        },
        openingHours: "Mo-Su 09:00-21:00",
        priceRange: "₹₹",
        serviceArea: {
          "@type": "State",
          name: "Kerala",
        },
        areaServed: supportCities.map((city) => ({
          "@type": "City",
          name: city.name,
        })),
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "Mobile Phone Repair Services",
          itemListElement: [
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: "Mobile Phone Screen Repair",
                description:
                  "Professional smartphone display and touch screen repair services",
              },
            },
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: "Battery Replacement",
                description:
                  "Mobile phone battery replacement with genuine parts",
              },
            },
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: "Camera Repair",
                description:
                  "Front and rear camera repair for all smartphone brands",
              },
            },
          ],
        },
        sameAs: [INFO.instagram, INFO.website],
      },
      {
        "@type": "Website",
        "@id": `${baseUrl}/#website`,
        url: baseUrl,
        name: INFO.name,
        description: `${INFO.tagline2} - Professional mobile phone repair services in Kerala`,
        potentialAction: [
          {
            "@type": "SearchAction",
            target: {
              "@type": "EntryPoint",
              urlTemplate: `${baseUrl}/repair/mobile-phone/{search_term_string}`,
            },
            "query-input": "required name=search_term_string",
          },
        ],
      },
      {
        "@type": "Organization",
        "@id": `${baseUrl}/#organization`,
        name: INFO.name,
        url: baseUrl,
        logo: `${baseUrl}/logos/fixamigo-logo.png`,
        contactPoint: {
          "@type": "ContactPoint",
          telephone: INFO.phone,
          contactType: "customer service",
          email: INFO.email,
          availableLanguage: ["English", "Malayalam"],
        },
      },
    ],
  };
}
