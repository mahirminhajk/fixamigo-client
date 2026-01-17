import Image from "next/image";
import Link from "next/link";
import { fetchDevicesByBrand } from "@/lib/apiService";
import { brands } from "@/constants";
import { IDevice } from "@/types/device";

interface OtherPhonesProps {
  currentDevice: {
    company: string;
    slug: string;
    name: string;
  };
}

// Function to calculate similarity between device names
const calculateSimilarity = (
  currentName: string,
  deviceName: string
): number => {
  const current = currentName.toLowerCase().trim();
  const device = deviceName.toLowerCase().trim();

  // If names are identical, return 0 (not similar for our purposes)
  if (current === device) return 0;

  // Extract base model information (remove common suffixes/prefixes)
  const cleanName = (name: string) => {
    return name
      .replace(/\b(plus|pro|max|ultra|mini|se|lite|neo|edge|note)\b/g, "") // Remove variant suffixes
      .replace(/\b(\d+)\s*(gb|tb|mg)\b/g, "$1") // Keep numbers but remove storage units
      .replace(/\s+/g, " ") // Normalize spaces
      .trim();
  };

  const currentBase = cleanName(current);
  const deviceBase = cleanName(device);

  // If base models are the same, this is a variant - high similarity
  if (currentBase === deviceBase) {
    return 100;
  }

  // Check for common number patterns (e.g., iPhone 15 -> iPhone 15 Pro)
  const currentNumbers: string[] = current.match(/\d+/g) || [];
  const deviceNumbers: string[] = device.match(/\d+/g) || [];

  if (currentNumbers.length > 0 && deviceNumbers.length > 0) {
    const hasCommonNumber = currentNumbers.some((num) =>
      deviceNumbers.includes(num)
    );
    if (hasCommonNumber) {
      // Check if the base name is similar (without numbers and variants)
      const currentWords = currentBase
        .replace(/\d+/g, "")
        .split(/\s+/)
        .filter((w) => w.length > 1);
      const deviceWords = deviceBase
        .replace(/\d+/g, "")
        .split(/\s+/)
        .filter((w) => w.length > 1);

      const commonWords = currentWords.filter((word) =>
        deviceWords.includes(word)
      );
      if (commonWords.length > 0) {
        return 80 + commonWords.length * 5; // Base similarity + bonus for common words
      }
    }
  }

  // Check for partial string matches
  const longerName = current.length > device.length ? current : device;
  const shorterName = current.length <= device.length ? current : device;

  if (longerName.includes(shorterName)) {
    return 60;
  }

  // Calculate word-based similarity
  const currentWords = current.split(/\s+/);
  const deviceWords = device.split(/\s+/);
  const commonWords = currentWords.filter((word) => deviceWords.includes(word));

  if (commonWords.length > 0) {
    const similarity =
      (commonWords.length / Math.max(currentWords.length, deviceWords.length)) *
      50;
    return similarity;
  }

  return 0;
};

// Server-side function to get suggested devices and brands
const getSuggestedDevices = async (
  currentCompany: string,
  currentSlug: string,
  currentName: string
) => {
  try {
    // Get all devices from the same brand
    const sameCompanyDevices = await fetchDevicesByBrand(currentCompany);

    // Filter out current device
    const availableDevices = sameCompanyDevices.filter(
      (device) => device.slug !== currentSlug
    );

    // Calculate similarity scores for each device
    const devicesWithSimilarity = availableDevices.map((device) => ({
      ...device,
      similarity: calculateSimilarity(currentName, device.name),
    }));

    // Sort by similarity (highest first) and take top 2
    const sameBrandSuggestions = devicesWithSimilarity
      .filter((device) => device.similarity > 0) // Only include devices with some similarity
      .sort((a, b) => b.similarity - a.similarity)
      .slice(0, 6);

    // Get 6 random different brands (excluding current brand)
    const otherBrands = brands.filter((brand) => brand.slug !== currentCompany);
    const shuffledBrands = [...otherBrands].sort(() => 0.5 - Math.random());
    const randomBrands = shuffledBrands.slice(0, 6);

    return {
      sameBrand: sameBrandSuggestions,
      randomBrands: randomBrands,
    };
  } catch (error) {
    console.error("Error fetching suggested devices:", error);
    return {
      sameBrand: [],
      randomBrands: [],
    };
  }
};

// Get brand display name and image
const getBrandInfo = (slug: string) => {
  const brand = brands.find((b) => b.slug === slug);
  return {
    name: brand?.name || slug,
    image: brand?.image || `/brands/${slug}.webp`,
  };
};

async function OtherPhones({ currentDevice }: OtherPhonesProps) {
  const { sameBrand, randomBrands } = await getSuggestedDevices(
    currentDevice.company,
    currentDevice.slug,
    currentDevice.name
  );

  const currentBrandInfo = getBrandInfo(currentDevice.company);

  const sectionShell =
    "rounded-3xl border border-slate-200 bg-white p-4 shadow-sm md:p-5";

  const cardShell =
    "group flex h-full min-w-[220px] flex-col rounded-2xl border border-slate-200 bg-slate-50 p-4 transition-all duration-200 hover:-translate-y-1 hover:border-sky-300 hover:bg-sky-50 hover:shadow-lg";

  return (
    <section className="space-y-6 lg:space-y-8">
      {sameBrand.length > 0 && (
        <div className={sectionShell}>
          <div className="mb-4 flex items-center justify-between gap-3">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-sky-700">
                Recommendations
              </p>
              <h4 className="text-lg font-bold text-slate-900">
                Devices you may also like
              </h4>
            </div>
            <div className="hidden items-center gap-2 rounded-full bg-sky-50 px-3 py-1 text-xs font-medium text-sky-700 md:inline-flex">
              <Image
                src={currentBrandInfo.image}
                alt={currentBrandInfo.name}
                title={`${currentBrandInfo.name} Logo`}
                width={16}
                height={16}
                className="rounded"
              />
              {currentBrandInfo.name}
            </div>
          </div>

          <div className="flex gap-4 overflow-x-auto pb-2 pr-1 snap-x snap-mandatory">
            {sameBrand.map((device: IDevice) => (
              <Link
                key={device.slug}
                href={`/repair/mobile-phone/${device.company}/${device.slug}`}
                className={`${cardShell} snap-start`}
                title={`View ${device.name} repair options`}
              >
                <div className="mb-4 flex h-28 items-center justify-center rounded-2xl bg-white">
                  <Image
                    src={device.images?.[0] || currentBrandInfo.image}
                    alt={device.name}
                    title={`${device.name} Image`}
                    width={120}
                    height={120}
                    className="h-full w-full object-contain p-2"
                  />
                </div>
                <p className="line-clamp-2 text-sm font-semibold text-slate-900 group-hover:text-sky-700">
                  {device.name}
                </p>
                <p className="mt-1 text-xs text-slate-500">Same brand device</p>
              </Link>
            ))}
          </div>
        </div>
      )}

      {randomBrands.length > 0 && (
        <div className={sectionShell}>
          <div className="mb-4 flex items-center justify-between gap-3">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-violet-700">
                Similar brands
              </p>
              <h4 className="text-lg font-bold text-slate-900">
                Explore other popular brands
              </h4>
            </div>
          </div>

          <div className="flex gap-4 overflow-x-auto pb-2 pr-1 snap-x snap-mandatory">
            {randomBrands.map((brand) => (
              <Link
                key={brand.slug}
                href={`/repair/mobile-phone/${brand.slug}`}
                className={`${cardShell} snap-start`}
                title={`Explore ${brand.name} devices`}
              >
                <div className="mb-4 flex h-28 items-center justify-center rounded-2xl bg-white">
                  <Image
                    src={brand.image}
                    alt={brand.name}
                    title={`${brand.name} Image`}
                    width={120}
                    height={120}
                    className="h-full w-full object-contain p-2"
                  />
                </div>
                <p className="line-clamp-2 text-sm font-semibold text-slate-900 group-hover:text-violet-700">
                  {brand.name}
                </p>
                <p className="mt-1 text-xs text-slate-500">
                  Explore {brand.name} devices
                </p>
              </Link>
            ))}
          </div>
        </div>
      )}

      {sameBrand.length === 0 && randomBrands.length === 0 && (
        <div className="rounded-3xl border border-slate-200 bg-white p-8 text-center shadow-sm">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-slate-100">
            <svg
              className="h-8 w-8 text-slate-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"
              />
            </svg>
          </div>
          <p className="text-sm text-slate-500">No similar devices found</p>
        </div>
      )}
    </section>
  );
}

export default OtherPhones;
