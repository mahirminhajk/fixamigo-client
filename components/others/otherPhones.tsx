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
      .slice(0, 2);

    // Get 2 random different brands (excluding current brand)
    const otherBrands = brands.filter((brand) => brand.slug !== currentCompany);
    const shuffledBrands = [...otherBrands].sort(() => 0.5 - Math.random());
    const randomBrands = shuffledBrands.slice(0, 2);

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

  return (
    <div className="hidden lg:block bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sticky top-4">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
          <svg
            className="w-4 h-4 text-blue-600"
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
        <h3 className="text-lg font-bold text-gray-900">Other Phones</h3>
      </div>

      {/* Same Brand Section */}
      {sameBrand.length > 0 && (
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <Image
              src={currentBrandInfo.image}
              alt={currentBrandInfo.name}
              title={`${currentBrandInfo.name} Logo`}
              width={20}
              height={20}
              className="rounded"
            />
            <h4 className="text-sm font-bold text-gray-700 uppercase">
              More from {currentBrandInfo.name}
            </h4>
          </div>
          <div className="space-y-3">
            {sameBrand.map((device: IDevice) => (
              <Link
                key={device.slug}
                href={`/repair/mobile-phone/${device.company}/${device.slug}`}
                className="flex items-center p-4 rounded-xl border border-gray-200 hover:border-blue-300 hover:shadow-md transition-all duration-200 group"
                title={`View ${device.name} repair options`}
              >
                <div className="w-12 h-12 bg-gray-50 rounded-lg overflow-hidden border border-gray-100 flex items-center justify-center mr-4">
                  <Image
                    src={device.images?.[0] || currentBrandInfo.image}
                    alt={device.name}
                    title={`${device.name} Image`}
                    width={40}
                    height={40}
                    className="object-contain"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-bold text-gray-900 truncate group-hover:text-blue-600 transition-colors">
                    {device.name}
                  </p>
                  <p className="text-xs text-gray-500 capitalize">
                    {currentBrandInfo.name}
                  </p>
                </div>
                <svg
                  className="w-5 h-5 text-gray-400 group-hover:text-blue-500 transition-colors"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Other Brands Section */}
      {randomBrands.length > 0 && (
        <div>
          <div className="flex items-center gap-2 mb-4">
            <div className="w-5 h-5 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"></div>
            <h4 className="text-sm font-bold text-gray-700 uppercase">
              Other Brands
            </h4>
          </div>
          <div className="space-y-3">
            {randomBrands.map((brand) => (
              <Link
                key={brand.slug}
                href={`/repair/mobile-phone/${brand.slug}`}
                className="flex items-center p-4 rounded-xl border border-gray-200 hover:border-purple-300 hover:shadow-md transition-all duration-200 group"
                title={`Explore ${brand.name} devices`}
              >
                <div className="w-12 h-12 bg-gray-50 rounded-lg overflow-hidden border border-gray-100 flex items-center justify-center mr-4">
                  <Image
                    src={brand.image}
                    alt={brand.name}
                    width={40}
                    height={40}
                    className="object-contain"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-bold text-gray-900 truncate group-hover:text-purple-600 transition-colors">
                    {brand.name}
                  </p>
                  <p className="text-xs text-gray-500">
                    Explore {brand.name} devices
                  </p>
                </div>
                <svg
                  className="w-5 h-5 text-gray-400 group-hover:text-purple-500 transition-colors"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Empty State */}
      {sameBrand.length === 0 && randomBrands.length === 0 && (
        <div className="text-center py-8">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg
              className="w-8 h-8 text-gray-400"
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
          <p className="text-sm text-gray-500">No similar devices found</p>
        </div>
      )}
    </div>
  );
}

export default OtherPhones;
