import BrandsList from "@/components/list/brandsList";
import { brands } from "@/constants";
import { fetchDevicesByBrand } from "@/lib/apiService";
import { IDevice } from "@/types";

function pickRandomDevices(devices: IDevice[], count: number) {
  const shuffled = [...devices].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count).map((device) => ({
    name: device.name,
    slug: device.slug,
  }));
}

async function getBrandPreviews() {
  const entries = await Promise.all(
    brands.map(async (brand) => {
      const devices = await fetchDevicesByBrand(brand.slug);
      return [brand.slug, pickRandomDevices(devices, 3)] as const;
    })
  );

  return Object.fromEntries(entries);
}

export default async function BrandsPage() {
  const brandPreviews = await getBrandPreviews();

  return <BrandsList variant="all" brandPreviews={brandPreviews} />;
}
