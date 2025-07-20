import { Metadata } from "next";
import { brands, INFO, supportCities } from "@/constants";
import { IDevice } from "@/types/device";

export function listBrandPageMetadata(brandSlug: string): {
  heading: string;
  metaTitle: string;
  metaDescription: string;
} {
  const brand = brands.find(
    (b) => b.slug.toLowerCase() === brandSlug.toLowerCase()
  );

  if (!brand) {
    return {
      heading: "Phone Repair Services – Select Your Model",
      metaTitle: "Affordable Phone Repair Services | Fast & Reliable",
      metaDescription:
        "Explore our reliable and affordable phone repair services. Select your phone model and get started today.",
    };
  }

  const brandName = brand.name;
  const service = "Phone Repair Services";

  const heading = `${brandName} Phone ${service} – Fast & Reliable Service`;
  const metaTitle = `${brandName} ${service} | Affordable & Trusted Repairs`;
  const metaDescription = `Need a ${brandName} phone ${service.toLowerCase()}? Choose your model and book a repair now. Trusted, fast and budget-friendly service.`;

  return {
    heading,
    metaTitle,
    metaDescription,
  };
}

// Complete metadata function for brand pages
export function getBrandMetadata(brandSlug: string): Metadata {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://fixamigo.com";
  const brand = brands.find(
    (b) => b.slug.toLowerCase() === brandSlug.toLowerCase()
  );
  const canonicalUrl = `${baseUrl}/repair/mobile-phone/${brandSlug}`;
  const cityNames = supportCities.map((city) => city.name).join(", ");

  if (!brand) {
    return {
      title: `Mobile Phone Repair Services | ${INFO.name}`,
      description: `Professional mobile phone repair services across Kerala. Choose your device model for expert repair with warranty.`,
      alternates: { canonical: canonicalUrl },
    };
  }

  const brandName = brand.name;

  return {
    title: `${brandName} Repair Services - All Models | ${INFO.name}`,
    description: `Professional ${brandName} mobile phone repair services in Kerala. Choose your ${brandName} model for screen, battery, camera repair and more. Free pickup & delivery in ${cityNames}.`,

    keywords: [
      `${brandName} repair`,
      `${brandName} mobile repair`,
      `${brandName} phone repair Kerala`,
      `${brandName} screen repair`,
      `${brandName} battery replacement`,
      `${brandName} camera repair`,
      `${brandName} repair near me`,
      `${brandName} service center`,
      `${brandName} repair ${cityNames.split(",")[0]}`,
      `doorstep ${brandName} repair`,
    ],

    authors: [{ name: INFO.name }],
    creator: INFO.name,
    publisher: INFO.name,

    alternates: {
      canonical: canonicalUrl,
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
      locale: "en_US",
      url: canonicalUrl,
      siteName: INFO.name,
      title: `${brandName} Repair Services - All Models`,
      description: `Choose your ${brandName} model for professional repair services. Expert technicians, quality parts, and warranty coverage.`,
      images: [
        {
          url: brand.image.startsWith("/")
            ? `${baseUrl}${brand.image}`
            : brand.image,
          width: 400,
          height: 400,
          alt: `${brandName} Repair Services`,
          type: "image/png",
        },
        {
          url: `${baseUrl}/og-brand-${brandSlug}.jpg`,
          width: 1200,
          height: 630,
          alt: `${brandName} Mobile Repair Services`,
          type: "image/jpeg",
        },
      ],
    },

    twitter: {
      card: "summary_large_image",
      site: "@fixamigo",
      creator: "@fixamigo",
      title: `${brandName} Repair Services`,
      description: `Professional ${brandName} mobile phone repair. Choose your model and book repair service online.`,
      images: [`${baseUrl}/og-brand-${brandSlug}.jpg`],
    },

    category: "Technology",

    other: {
      "geo.region": "IN-KL",
      "geo.placename": "Kerala, India",
      "product:brand": brandName,
      "product:category": "Mobile Phone",
      "service:type": "Mobile Phone Repair",
    },
  };
}

// Generate structured data for brand pages
export function getBrandStructuredData(
  brandSlug: string,
  devicesData: IDevice[] = []
) {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://fixamigo.com";
  const brand = brands.find(
    (b) => b.slug.toLowerCase() === brandSlug.toLowerCase()
  );
  const canonicalUrl = `${baseUrl}/repair/mobile-phone/${brandSlug}`;

  if (!brand) {
    return {};
  }

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Brand",
        "@id": `${canonicalUrl}#brand`,
        name: brand.name,
        description: `${brand.name} mobile phone repair services`,
        logo: brand.image.startsWith("/")
          ? `${baseUrl}${brand.image}`
          : brand.image,
      },
      {
        "@type": "Service",
        "@id": `${canonicalUrl}#service`,
        name: `${brand.name} Mobile Phone Repair`,
        description: `Professional repair services for ${brand.name} mobile phones including screen, battery, camera, and other components.`,
        provider: {
          "@type": "LocalBusiness",
          name: INFO.name,
          telephone: INFO.phone,
          email: INFO.email,
        },
        areaServed: supportCities.map((city) => ({
          "@type": "City",
          name: city.name,
        })),
        serviceType: "Mobile Phone Repair",
        brand: {
          "@id": `${canonicalUrl}#brand`,
        },
      },
      {
        "@type": "WebPage",
        "@id": canonicalUrl,
        url: canonicalUrl,
        name: `${brand.name} Repair Services`,
        description: `Choose your ${brand.name} model for professional repair service`,
        mainEntity: `${canonicalUrl}#service`,
        breadcrumb: {
          "@type": "BreadcrumbList",
          itemListElement: [
            {
              "@type": "ListItem",
              position: 1,
              name: "Home",
              item: baseUrl,
            },
            {
              "@type": "ListItem",
              position: 2,
              name: "Mobile Phone Repair",
              item: `${baseUrl}/repair/mobile-phone`,
            },
            {
              "@type": "ListItem",
              position: 3,
              name: `${brand.name} Repair`,
              item: canonicalUrl,
            },
          ],
        },
      },
      ...(devicesData.length > 0
        ? [
            {
              "@type": "ItemList",
              "@id": `${canonicalUrl}#devicelist`,
              name: `${brand.name} Device Models`,
              description: `Available ${brand.name} device models for repair service`,
              itemListElement: devicesData
                .slice(0, 20)
                .map((device, index) => ({
                  "@type": "ListItem",
                  position: index + 1,
                  name: device.name,
                  url: `${canonicalUrl}/${device.slug}`,
                })),
            },
          ]
        : []),
    ],
  };
}
