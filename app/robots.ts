import { MetadataRoute } from "next";
import { headers } from "next/headers";

export default async function robots(): Promise<MetadataRoute.Robots> {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://fixamigo.com";

  // Get the host header to detect subdomain
  const headersList = await headers();
  const host = headersList.get("host") || "";

  // Check if current host is a subdomain we want to block
  const isBlockedSubdomain =
    host.includes("api.") ||
    host.includes("provider.") ||
    host.includes("admin.") ||
    host.includes("staging.") ||
    host.includes("dev.");

  // If this is a blocked subdomain, deny all crawling
  if (isBlockedSubdomain || process.env.BLOCK_ROBOTS === "true") {
    return {
      rules: [
        {
          userAgent: "*",
          disallow: "/",
        },
      ],
    };
  }

  // Main domain robots.txt configuration
  return {
    rules: [
      {
        userAgent: "*",
        allow: [
          "/", // Homepage
          "/malappuram", // City pages (important for local SEO)
          "/kottakkal",
          "/kondotty",
          "/tirur",
          "/ponnani",
          "/perinthalmanna",
          "/repair/mobile-phone", // Main repair category
          "/repair/mobile-phone/*", // All brand and device pages
          "/repair/display", // Repair service categories
          "/repair/ports",
          "/repair/battery",
          "/repair/camera",
          "/repair/speaker",
          "/support-request", // Contact/support page
          "/sitemap.xml", // Sitemap
          "/*.png", // Static assets
          "/*.jpg",
          "/*.jpeg",
          "/*.webp",
          "/*.svg",
          "/*.ico",
          "/fonts/*", // Font assets
          "/icons/*", // Icon assets
          "/brands/*", // Brand images
          "/logos/*", // Logo files
          "/steps-icons/*", // Service step icons
        ],
        disallow: [
          "/api/*", // All API endpoints
          "/cart", // User-specific pages
          "/my-services", // User order history
          "/my-services/*", // User order details
          "/repair/checkout", // Checkout process
          "/_next/*", // Next.js internal files
          "/admin/*", // Admin panel (if exists)
          "/*.json$", // JSON configuration files
          "/private/*", // Private directories
          "/*?utm_*", // UTM tracking parameters
          "/*?fbclid=*", // Facebook click IDs
          "/*?gclid=*", // Google click IDs
          "/*?ref=*", // Referral parameters
          "/temp/*", // Temporary files
          "/backup/*", // Backup files
          "/.env*", // Environment files
          "/node_modules/*", // Dependencies
        ],
        crawlDelay: 1, // 1 second between requests
      },
      {
        userAgent: "Googlebot",
        allow: [
          "/",
          "/malappuram", // Priority city pages
          "/kottakkal",
          "/kondotty",
          "/tirur",
          "/ponnani",
          "/perinthalmanna",
          "/repair/mobile-phone",
          "/repair/mobile-phone/*",
          "/repair/display",
          "/repair/ports",
          "/repair/battery",
          "/repair/camera",
          "/repair/speaker",
          "/support-request",
          "/sitemap.xml",
          "/*.png",
          "/*.jpg",
          "/*.jpeg",
          "/*.webp",
          "/*.svg",
          "/brands/*",
        ],
        disallow: [
          "/api/*",
          "/cart",
          "/my-services",
          "/my-services/*",
          "/repair/checkout",
          "/_next/*",
          "/admin/*",
          "/*?utm_*",
          "/*?fbclid=*",
          "/*?gclid=*",
        ],
        crawlDelay: 0.5, // Faster crawling for Google
      },
      {
        userAgent: "Bingbot",
        allow: [
          "/",
          "/malappuram",
          "/kottakkal",
          "/kondotty",
          "/tirur",
          "/ponnani",
          "/perinthalmanna",
          "/repair/mobile-phone",
          "/repair/mobile-phone/*",
          "/repair/display",
          "/repair/ports",
          "/repair/battery",
          "/repair/camera",
          "/repair/speaker",
          "/support-request",
          "/sitemap.xml",
          "/*.png",
          "/*.jpg",
          "/*.jpeg",
          "/*.webp",
          "/*.svg",
          "/brands/*",
        ],
        disallow: [
          "/api/*",
          "/cart",
          "/my-services",
          "/my-services/*",
          "/repair/checkout",
          "/_next/*",
          "/admin/*",
          "/*?utm_*",
          "/*?fbclid=*",
          "/*?gclid=*",
        ],
        crawlDelay: 1,
      },
      {
        // Aggressive blocking for known scrapers and bad bots
        userAgent: [
          "SemrushBot",
          "AhrefsBot",
          "MJ12bot",
          "DotBot",
          "SeznamBot",
          "BLEXBot",
        ],
        disallow: "/",
        crawlDelay: 10,
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl,
  };
}
