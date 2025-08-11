import { brands, repairCategory } from "@/constants";
import { Metadata } from "next";
import {
  getCategoryMetadata,
  getCategoryStructuredData,
} from "@/lib/seo/categoryMetadata";
import Link from "next/link";
import Image from "next/image";
import Script from "next/script";

// Static Generation
export async function generateStaticParams() {
  return repairCategory
    .filter((category) => category.slug !== "mobile-phone")
    .map((category) => ({
      category: category.slug,
    }));
}

// SEO Metadata
export const generateMetadata = async ({
  params,
}: {
  params: Promise<{ category: string }>;
}): Promise<Metadata> => {
  const { category } = await params;
  const metadata = getCategoryMetadata(category);
  return metadata;
};

export default async function Page({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;
  const categoryName =
    repairCategory.find((cat) => cat.slug === category)?.name || "Repair";
  const structuredData = getCategoryStructuredData(category);

  return (
    <>
      {/* JSON-LD Structured Data for Category */}
      <Script
        id="category-structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData),
        }}
      />

      <section className="max-w-5xl mx-auto py-10 px-4">
        <h1 className="text-3xl font-bold mb-4 capitalize">
          {categoryName} Repair - Choose Your Brand
        </h1>
        <p className="text-gray-600 mb-6">
          Fix your phone&apos;s {categoryName.toLowerCase()} with trusted
          service providers. Select your brand below to find compatible devices
          we support for this repair type.
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
          {brands.map((brand) => (
            <Link
              key={brand.slug}
              href={`/repair/mobile-phone/${brand.slug}`}
              className="border rounded-xl shadow-sm hover:shadow-lg transition flex flex-col items-center p-4"
              title={`Repair ${brand.name} devices`}
            >
              <Image
                src={brand.image}
                alt={brand.name}
                title={brand.name.toLocaleUpperCase()}
                width={80}
                height={80}
                className="mb-2"
              />
              <span className="font-medium text-center">{brand.name}</span>
            </Link>
          ))}
        </div>

        <div className="mt-10 text-sm text-gray-500">
          <p>
            Can&apos;t find your brand?{" "}
            <Link
              href="/repair/mobile-phone"
              className="text-blue-600 underline"
              title="View all supported mobile brands"
            >
              View all supported brands
            </Link>
            .
          </p>
        </div>
      </section>
    </>
  );
}

/**
 //* /repair/[category]
 //* ex: /repair/display
 * display
 * ports
 * battery
 * camera
 * speaker
 * others
 */
