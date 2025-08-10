import BrandsList from "@/components/list/brandsList";
import { Metadata } from "next";
import { INFO, brands } from "@/constants";

// Generate dynamic brand names for SEO
const brandNames = brands
  .slice(0, 12)
  .map((brand) => brand.name)
  .join(", ");

const allBrandNames = brands.map((brand) => brand.name).join(", ");

// SEO Metadata for Mobile Phone Brands Page
export const metadata: Metadata = {
  title: `Mobile Phone Repair - All Brands | ${INFO.name} Kerala`,
  description: `Professional mobile phone repair services for all major brands in Kerala. ${INFO.name} supports ${brandNames} and more. Free pickup & delivery, genuine parts, expert technicians with warranty.`,

  keywords: [
    // Brand-specific keywords
    "mobile phone repair all brands",
    "smartphone repair services Kerala",
    "OnePlus mobile repair malappuram",
    "iPhone mobile repair malappuram",
    "Samsung mobile repair malappuram",
    "Xiaomi mobile repair malappuram",
    "Vivo mobile repair malappuram",
    "OPPO mobile repair malappuram",
    "realme mobile repair malappuram",
    "Nokia mobile repair malappuram",
    "Motorola mobile repair malappuram",
    "Google Pixel mobile repair malappuram",
    "mobile phone brands repair",
    "all brand mobile repair",

    // Service keywords
    "mobile phone repair Kerala",
    "smartphone repair center",
    "mobile service center",
    "phone repair near me",
    "mobile repair online booking",
    "near mobile shop malappuram",

    // Brand-specific repair keywords
    "iPhone repair Kerala",
    "Samsung repair Kerala",
    "OnePlus repair Kerala",
    "Xiaomi repair Kerala",
    "Vivo OPPO repair Kerala",

    // Service-specific keywords
    "screen replacement all brands",
    "battery replacement mobile",
    "camera repair smartphone",
    "charging port repair",

    // Business keywords
    `${INFO.name} mobile repair`,
    "trusted mobile repair Kerala",
    "genuine parts mobile repair",
    "warranty mobile repair service",
    "free pickup delivery mobile",
    "expert mobile technicians",
  ],

  authors: [{ name: INFO.name }],
  creator: INFO.name,
  publisher: INFO.name,

  alternates: {
    canonical: `${INFO.website}/repair/mobile-phone`,
  },

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

  openGraph: {
    type: "website",
    locale: "en_IN",
    url: `${INFO.website}/repair/mobile-phone`,
    siteName: INFO.name,
    title: `Mobile Phone Repair - All Brands | ${INFO.name}`,
    description: `Get your phone fixed by experts in Kerala. We repair ${brandNames} and more. Free pickup & delivery, genuine parts, warranty included.`,
    images: [
      {
        url: `${INFO.website}/og-mobile-brands.jpg`,
        width: 1200,
        height: 630,
        alt: `Mobile Phone Repair All Brands - ${INFO.name}`,
        type: "image/jpeg",
      },
      {
        url: `${INFO.website}/logos/circle-logo.png`,
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
    title: `Mobile Phone Repair - All Brands | ${INFO.name}`,
    description: `Professional mobile repair for all major brands in Kerala. Free pickup & delivery, genuine parts, expert service. ${INFO.tagline}`,
    images: [`${INFO.website}/og-mobile-brands.jpg`],
  },

  category: "Technology",

  other: {
    // Geographic metadata
    "geo.region": "IN-KL",
    "geo.placename": "Kerala, India",
    "geo.position": "10.8739;76.2733",
    ICBM: "10.8739, 76.2733",

    // Dublin Core metadata
    "DC.title": `Mobile Phone Repair All Brands - ${INFO.name}`,
    "DC.creator": INFO.name,
    "DC.subject": "Mobile Phone Repair, Smartphone Brands, Kerala, India",
    "DC.description": `Professional mobile phone repair services for all major smartphone brands in Kerala`,
    "DC.language": "en-IN",
    "DC.coverage": "Kerala, India",

    // Business metadata
    "business:contact_data:street_address": INFO.address,
    "business:contact_data:locality": "Malappuram",
    "business:contact_data:region": "Kerala",
    "business:contact_data:postal_code": "676121",
    "business:contact_data:country_name": "India",
    "business:contact_data:email": INFO.email,
    "business:contact_data:phone_number": INFO.phone,
    "business:contact_data:website": INFO.website,

    // Service metadata
    "service:type": "Mobile Phone Repair",
    "service:brands": allBrandNames,
    "service:area": "Kerala, India",
  },

  applicationName: INFO.name,
  referrer: "origin-when-cross-origin",
};

export default function AllBrandsPage() {
  // Structured Data for SEO
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      // Main Service
      {
        "@type": "Service",
        "@id": `${INFO.website}/repair/mobile-phone#service`,
        name: "Mobile Phone Repair - All Brands",
        description: `Professional mobile phone repair services for all major smartphone brands. ${INFO.name} provides expert repair services with genuine parts and warranty.`,
        provider: {
          "@type": "LocalBusiness",
          "@id": `${INFO.website}#business`,
        },
        areaServed: {
          "@type": "State",
          name: "Kerala",
          containedInPlace: {
            "@type": "Country",
            name: "India",
          },
        },
        availableChannel: {
          "@type": "ServiceChannel",
          serviceUrl: INFO.website,
          servicePhone: INFO.phone,
          availableLanguage: ["English", "Malayalam", "Hindi"],
        },
        category: "Mobile Phone Repair",
        serviceType: "Electronics Repair",
        serviceOutput: {
          "@type": "Thing",
          name: "Repaired Mobile Phone",
        },
        offers: {
          "@type": "Offer",
          availability: "https://schema.org/InStock",
          price: "999",
          priceCurrency: "INR",
          priceSpecification: {
            "@type": "PriceSpecification",
            minPrice: "99",
            maxPrice: "15000",
            priceCurrency: "INR",
          },
        },
      },

      // Business Information
      {
        "@type": "LocalBusiness",
        "@id": `${INFO.website}#business`,
        name: INFO.name,
        image: `${INFO.website}/logos/circle-logo.png`,
        description: INFO.tagline,
        url: INFO.website,
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
          latitude: 10.8739,
          longitude: 76.2733,
        },
        openingHoursSpecification: [
          {
            "@type": "OpeningHoursSpecification",
            dayOfWeek: [
              "Monday",
              "Tuesday",
              "Wednesday",
              "Thursday",
              "Friday",
              "Saturday",
            ],
            opens: "09:00",
            closes: "18:00",
          },
        ],
        priceRange: "₹99-₹15000",
        currenciesAccepted: "INR",
        paymentAccepted: "Cash, UPI, Card",
      },

      // Website Information
      {
        "@type": "WebSite",
        "@id": `${INFO.website}#website`,
        url: INFO.website,
        name: INFO.name,
        description: INFO.tagline,
        publisher: {
          "@id": `${INFO.website}#business`,
        },
        potentialAction: {
          "@type": "SearchAction",
          target: {
            "@type": "EntryPoint",
            urlTemplate: `${INFO.website}/search?q={search_term_string}`,
          },
          "query-input": "required name=search_term_string",
        },
      },

      // Breadcrumb Navigation
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: INFO.website,
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Repair",
            item: `${INFO.website}/repair`,
          },
          {
            "@type": "ListItem",
            position: 3,
            name: "Mobile Phone Brands",
            item: `${INFO.website}/repair/mobile-phone`,
          },
        ],
      },
    ],
  };

  return (
    <section className="min-h-screen bg-gray-50">
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <BrandsList variant="all" />
    </section>
  );
}
