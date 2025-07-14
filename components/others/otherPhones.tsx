"use client";
import Image from "next/image";
import Link from "next/link";

interface OtherPhonesProps {
  currentDevice: {
    company: string;
    slug: string;
  };
}

// Dummy data - you can replace this with actual API calls later
const getDummyPhones = (company: string, currentSlug: string) => {
  const phones = [
    {
      slug: "iphone-15-pro",
      name: "iPhone 15 Pro",
      company: "apple",
      image: "/brands/apple.png",
    },
    {
      slug: "iphone-14-pro",
      name: "iPhone 14 Pro",
      company: "apple",
      image: "/brands/apple.png",
    },
    {
      slug: "galaxy-s24-ultra",
      name: "Galaxy S24 Ultra",
      company: "samsung",
      image: "/brands/samsung.png",
    },
    {
      slug: "galaxy-s23-ultra",
      name: "Galaxy S23 Ultra",
      company: "samsung",
      image: "/brands/samsung.png",
    },
    {
      slug: "redmi-note-13-pro",
      name: "Redmi Note 13 Pro",
      company: "mi",
      image: "/brands/mi.png",
    },
    {
      slug: "redmi-note-12-pro",
      name: "Redmi Note 12 Pro",
      company: "mi",
      image: "/brands/mi.png",
    },
  ];

  // Filter phones by company and exclude current device
  const sameCompanyPhones = phones.filter(
    (phone) => phone.company === company && phone.slug !== currentSlug
  );

  // If not enough phones from same company, add some from other companies
  const otherPhones = phones.filter((phone) => phone.company !== company);

  return [...sameCompanyPhones, ...otherPhones].slice(0, 4);
};

function OtherPhones({ currentDevice }: OtherPhonesProps) {
  const suggestedPhones = getDummyPhones(
    currentDevice.company,
    currentDevice.slug
  );

  return (
    <div className="hidden lg:block bg-white rounded-[6px] shadow-sm p-6 sticky top-4">
      <h3 className="text-lg font-semibold mb-4">Other Phones</h3>

      {/* Same Brand Section */}
      <div className="mb-6">
        <h4 className="text-sm font-medium text-gray-600 mb-3 uppercase">
          More from {currentDevice.company}
        </h4>
        <div className="space-y-3">
          {suggestedPhones
            .filter((phone) => phone.company === currentDevice.company)
            .slice(0, 2)
            .map((phone) => (
              <Link
                key={phone.slug}
                href={`/repair/mobile-phone/${phone.company}/${phone.slug}`}
                className="flex items-center p-3 rounded-[6px] border border-gray-200 hover:border-blue-300 hover:shadow-sm transition-all duration-200"
              >
                <Image
                  src={phone.image}
                  alt={phone.company}
                  width={32}
                  height={32}
                  className="mr-3 rounded"
                />
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">
                    {phone.name}
                  </p>
                  <p className="text-xs text-gray-500 capitalize">
                    {phone.company}
                  </p>
                </div>
                <svg
                  className="w-4 h-4 text-gray-400"
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

      {/* Popular Devices Section */}
      <div>
        <h4 className="text-sm font-medium text-gray-600 mb-3 uppercase">
          Popular Devices
        </h4>
        <div className="space-y-3">
          {suggestedPhones
            .filter((phone) => phone.company !== currentDevice.company)
            .slice(0, 2)
            .map((phone) => (
              <Link
                key={phone.slug}
                href={`/repair/mobile-phone/${phone.company}/${phone.slug}`}
                className="flex items-center p-3 rounded-[6px] border border-gray-200 hover:border-blue-300 hover:shadow-sm transition-all duration-200"
              >
                <Image
                  src={phone.image}
                  alt={phone.company}
                  width={32}
                  height={32}
                  className="mr-3 rounded"
                />
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">
                    {phone.name}
                  </p>
                  <p className="text-xs text-gray-500 capitalize">
                    {phone.company}
                  </p>
                </div>
                <svg
                  className="w-4 h-4 text-gray-400"
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
    </div>
  );
}

export default OtherPhones;
