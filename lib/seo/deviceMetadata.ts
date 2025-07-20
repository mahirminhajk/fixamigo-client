import { fetchDeviceBySlug } from "@/lib/apiService";
import { Metadata } from "next";
import { INFO, supportCities } from "@/constants";
import { IDevice } from "@/types/device";

export async function getDeviceMetadata(
  brand: string,
  device: string
): Promise<Metadata> {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://fixamigo.com";
  const canonicalUrl = `${baseUrl}/repair/mobile-phone/${brand}/${device}`;

  try {
    const deviceData = await fetchDeviceBySlug(device);

    if (!deviceData) throw new Error("Failed to fetch device metadata");

    const brandName = deviceData.company || brand;
    const deviceName = deviceData.name;
    const cityNames = supportCities.map((city) => city.name).join(", ");

    // Get top spare part categories for keyword injection
    const topParts = deviceData.spareParts
      ?.slice(0, 3)
      .map((sp) => sp.label.toLowerCase())
      .join(", ");

    const repairServices = topParts || "display, battery, camera";

    const title = `${deviceName} Repair Services - ${repairServices} | ${brandName} | ${INFO.name}`;
    const description = `Professional ${deviceName} repair in Kerala. We fix ${repairServices} and more for ${brandName} devices. Free pickup & delivery in ${cityNames}. Book online with warranty!`;

    // Generate keywords based on device and services
    const keywords = [
      `${deviceName} repair`,
      `${brandName} ${deviceName} repair`,
      `${deviceName} ${repairServices} repair`,
      `${deviceName} repair Kerala`,
      `${deviceName} screen repair`,
      `${deviceName} battery replacement`,
      `${deviceName} repair ${cityNames.split(",")[0]}`,
      `${brandName} repair services`,
      `${deviceName} repair near me`,
      `${deviceName} service center`,
      "mobile phone repair",
      "smartphone repair",
      "doorstep mobile repair",
      "free pickup delivery",
    ];

    return {
      title,
      description,
      keywords,

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
        title: `${deviceName} Repair - ${brandName} | ${INFO.name}`,
        description: `Get your ${deviceName} fixed by certified technicians. ${repairServices} repair with warranty. Free pickup & delivery across Kerala.`,
        images: deviceData.images?.length
          ? [
              {
                url: deviceData.images[0],
                width: 800,
                height: 600,
                alt: `${deviceName} repair services`,
                type: "image/jpeg",
              },
              ...deviceData.images.slice(1, 3).map((img) => ({
                url: img,
                width: 800,
                height: 600,
                alt: `${deviceName} ${brandName}`,
                type: "image/jpeg",
              })),
            ]
          : [
              {
                url: `${baseUrl}/og-device-repair.jpg`,
                width: 1200,
                height: 630,
                alt: `${deviceName} repair services`,
                type: "image/jpeg",
              },
            ],
      },

      twitter: {
        card: "summary_large_image",
        site: "@fixamigo",
        creator: "@fixamigo",
        title: `${deviceName} Repair - ${brandName}`,
        description: `Professional ${deviceName} repair services. ${repairServices} repair with warranty. Book online now!`,
        images: deviceData.images?.length
          ? [deviceData.images[0]]
          : [`${baseUrl}/og-device-repair.jpg`],
      },

      category: "Technology",

      other: {
        "product:brand": brandName,
        "product:category": "Mobile Phone",
        "product:condition": "Used",
        "article:author": INFO.name,
        "article:publisher": INFO.name,
        "business:contact_data:phone_number": INFO.phone,
        "business:contact_data:email": INFO.email,
        "geo.region": "IN-KL",
        "geo.placename": "Kerala, India",
      },

      applicationName: INFO.name,
      referrer: "origin-when-cross-origin",
    };
  } catch (error) {
    console.error("Error generating device metadata:", error);

    // Fallback metadata when device data is unavailable
    const fallbackTitle = `${
      brand.charAt(0).toUpperCase() + brand.slice(1)
    } Mobile Repair Services | ${INFO.name}`;
    const fallbackDescription = `Professional mobile phone repair services for ${brand} devices. Display, battery, camera repair with free pickup & delivery in Kerala.`;

    return {
      title: fallbackTitle,
      description: fallbackDescription,
      keywords: [
        `${brand} repair`,
        `${brand} mobile repair`,
        "mobile phone repair",
        "smartphone repair Kerala",
        "doorstep mobile repair",
      ],

      alternates: {
        canonical: canonicalUrl,
      },

      openGraph: {
        title: fallbackTitle,
        description: fallbackDescription,
        url: canonicalUrl,
        siteName: INFO.name,
        images: [
          {
            url: `${baseUrl}/og-device-repair.jpg`,
            width: 1200,
            height: 630,
            alt: `${brand} mobile repair services`,
          },
        ],
      },

      twitter: {
        card: "summary_large_image",
        title: fallbackTitle,
        description: fallbackDescription,
        images: [`${baseUrl}/og-device-repair.jpg`],
      },
    };
  }
}

// Generate structured data for device pages
export function getDeviceStructuredData(
  deviceData: IDevice,
  brand: string,
  device: string
) {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://fixamigo.com";
  const canonicalUrl = `${baseUrl}/repair/mobile-phone/${brand}/${device}`;

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Product",
        "@id": `${canonicalUrl}#product`,
        name: deviceData.name,
        brand: {
          "@type": "Brand",
          name: deviceData.company || brand,
        },
        category: "Mobile Phone",
        image: deviceData.images || [],
        description: `${deviceData.name} repair services including display, battery, camera and other components.`,
        offers: {
          "@type": "AggregateOffer",
          availability: "https://schema.org/InStock",
          priceCurrency: "INR",
          lowPrice: "499",
          highPrice: "4999",
          offerCount: deviceData.spareParts?.length || 5,
        },
      },
      {
        "@type": "Service",
        "@id": `${canonicalUrl}#service`,
        name: `${deviceData.name} Repair Service`,
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
        description: `Professional repair services for ${deviceData.name} including pickup and delivery.`,
      },
      {
        "@type": "WebPage",
        "@id": canonicalUrl,
        url: canonicalUrl,
        name: `${deviceData.name} Repair Services`,
        description: `Get your ${deviceData.name} repaired by certified technicians with warranty.`,
        mainEntity: `${canonicalUrl}#product`,
      },
    ],
  };
}
