import DeviceDetailsContent from "@/components/contents/DeviceDetailsContent";
import { brands } from "@/constants";
import { IDevice } from "@/types/device";
import { Metadata } from "next";

// Static Generation
export const revalidate = 3600;
export const dynamicParams = true;
export async function generateStaticParams() {
  const paths: { brand: string; device: string }[] = [];

  const brandPromises = brands.map(async (brand) => {
    try {
      const res = await fetch(
        `${process.env.API_URL}/device/brand?value=${brand.slug}&onlySlug=true`
      );
      if (!res.ok) {
        console.error(
          `Failed to fetch device slugs for ${brand.slug}. Status: ${res.status}`
        );
        return []; // Return empty array for this brand if fetch fails
      }
      const jsonRes = await res.json();
      // Ensure jsonRes.data is an array before mapping
      const devicesData: IDevice[] = Array.isArray(jsonRes.data)
        ? jsonRes.data
        : [];

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
}): Promise<Metadata> {}

// Fetch function
const getData = async (deviceSlug: string) => {
  try {
    const res = await fetch(`${process.env.API_URL}/device/s/${deviceSlug}`);
    if (!res.ok) throw new Error("Failed to fetch data");
    return (await res.json()).data;
  } catch (error) {
    console.error("Error fetching models:", error);
    return null;
  }
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
      <DeviceDetailsContent deviceData={deviceData} />
    </section>
  );
}
