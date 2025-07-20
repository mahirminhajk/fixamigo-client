import { MetadataRoute } from "next";
import { brands, supportCities, repairCategory } from "@/constants";
import { fetchDevicesByBrand } from "@/lib/apiService";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://fixamigo.com";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const sitemap: MetadataRoute.Sitemap = [];
  const currentDate = new Date();

  // Static routes (public pages)
  const staticRoutes = [
    {
      url: baseUrl,
      lastModified: currentDate,
      changeFrequency: "daily" as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/repair/mobile-phone`,
      lastModified: currentDate,
      changeFrequency: "weekly" as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/support-request`,
      lastModified: currentDate,
      changeFrequency: "monthly" as const,
      priority: 0.5,
    },
  ];

  sitemap.push(...staticRoutes);

  // City-based routes (important for local SEO)
  const cityRoutes = supportCities.map((city) => ({
    url: `${baseUrl}/${city.slug}`,
    lastModified: currentDate,
    changeFrequency: "weekly" as const,
    priority: 1, // High priority for city pages
  }));

  sitemap.push(...cityRoutes);

  // Repair category routes (excluding mobile-phone as it has its own dedicated page)
  const categoryRoutes = repairCategory
    .filter((category) => category.slug !== "mobile-phone")
    .map((category) => ({
      url: `${baseUrl}/repair/${category.slug}`,
      lastModified: currentDate,
      changeFrequency: "weekly" as const,
      priority: 0.7,
    }));

  sitemap.push(...categoryRoutes);

  // Brand routes
  const brandRoutes = brands.map((brand) => ({
    url: `${baseUrl}/repair/mobile-phone/${brand.slug}`,
    lastModified: currentDate,
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  sitemap.push(...brandRoutes);

  // Dynamic device routes - fetch devices for each brand
  try {
    console.log("Generating sitemap with device routes...");

    const devicePromises = brands.map(async (brand) => {
      try {
        const devices = await fetchDevicesByBrand(brand.slug);
        return devices.map((device) => ({
          url: `${baseUrl}/repair/mobile-phone/${brand.slug}/${device.slug}`,
          lastModified: currentDate,
          changeFrequency: "monthly" as const,
          priority: 0.6,
        }));
      } catch (error) {
        console.error(`Error fetching devices for brand ${brand.slug}:`, error);
        return [];
      }
    });

    const deviceRoutesArrays = await Promise.all(devicePromises);
    const deviceRoutes = deviceRoutesArrays.flat();

    sitemap.push(...deviceRoutes);
    console.log(`Generated sitemap with ${sitemap.length} total URLs`);
  } catch (error) {
    console.error("Error generating device routes for sitemap:", error);
    // Continue without device routes if API fails
  }

  // Note: Excluding user-specific routes from sitemap as they are:
  // - Client-side rendered pages that require authentication
  // - Not meant for search engine indexing
  // - User-specific content that varies per user
  //
  // Excluded routes:
  // - /cart (user's shopping cart)
  // - /my-services (user's orders/services)
  // - /my-services/summary (order summary)
  // - /repair/checkout (checkout process)
  //
  // These pages use "use client" directive and are meant for authenticated users only.

  return sitemap;
}
