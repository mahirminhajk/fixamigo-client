import DeviceDetailsContent from "@/components/contents/DeviceDetailsContent";
import { brands } from "@/constants";
import { getDeviceMetadata } from "@/lib/seo/deviceMetadata";
import { IDevice } from "@/types/device";
import { Metadata } from "next";
import { fetchDeviceBySlug, fetchDevicesByBrand } from "@/lib/apiService"; // Import the new fetch functions
import RedirectToAdminButton from "@/components/admin/redirectToAdminButton";

// Static Generation
export const dynamicParams = false;
export async function generateStaticParams() {
  const paths: { brand: string; device: string }[] = [];

  const brandPromises = brands.map(async (brand) => {
    try {
      // Use the new fetch function
      const devicesData: IDevice[] = await fetchDevicesByBrand(brand.slug);

      return devicesData.map((d) => ({
        brand: brand.slug,
        device: d.slug,
      }));
    } catch (error) {
      console.error(`Error fetching device slugs for ${brand.slug}:`, error);
      return []; // Return empty array on error
    }
  });

  const resultsForCategory = await Promise.all(brandPromises);
  resultsForCategory.forEach((brandPaths) => {
    paths.push(...brandPaths);
  });

  return paths;
}

// Metadata (SEO)
export async function generateMetadata({
  params,
}: {
  params: Promise<{ device: string; brand: string }>;
}): Promise<Metadata> {
  const { device, brand } = await params;
  const metadata = await getDeviceMetadata(brand, device);
  return metadata;
}

// Fetch function
const getData = async (deviceSlug: string) => {
  return fetchDeviceBySlug(deviceSlug); // Use the new fetch function
};

// Page Component
export default async function Page({
  params,
}: {
  params: Promise<{ device: string }>;
}) {
  const { device } = await params;
  const deviceData: IDevice | null = await getData(device);

  if (!deviceData) {
    return (
      <section className="flex justify-center items-center min-h-screen">
        <p className="text-xl font-medium text-red-500">Device not found</p>
      </section>
    );
  }

  return (
    <section>
      <RedirectToAdminButton id={deviceData._id} type="device" />
      <DeviceDetailsContent deviceData={deviceData} />
    </section>
  );
}
