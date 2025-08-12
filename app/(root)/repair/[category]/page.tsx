// app/(root)/repair/[category]/page.tsx
import { notFound } from "next/navigation";
import Image from "next/image";
import { repairPageContent, brands } from "@/constants/content";

interface RepairPageProps {
  params: { category: string };
}

export default function RepairCategoryPage({ params }: RepairPageProps) {
  const { category } = params;

  // Find matching repair content
  const repairData = repairPageContent.find(
    (item) => item.slug.toLowerCase() === category.toLowerCase()
  );

  if (!repairData) {
    return notFound();
  }

  return (
    <section className="max-w-6xl mx-auto px-4 py-10">
      {/* Heading */}
      <h1 className="text-3xl font-bold text-gray-900 mb-4">
        {repairData.heading}
      </h1>

      {/* Heading Description */}
      <p className="text-gray-600 mb-4">{repairData.headingDescription}</p>

      {/* Main Description */}
      <p className="text-gray-600 mb-8">{repairData.mainDescription}</p>

      {/* Brand Selector */}
      <h2 className="text-xl font-semibold mb-3">Select your brand</h2>
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-4 mb-8">
        {brands.map((brand) => (
          <div
            key={brand.name}
            className="flex flex-col items-center justify-center p-3 border rounded-lg hover:shadow"
          >
            <img
              src={brand.image}
              alt={brand.name}
              className="w-16 h-16 object-contain"
            />

            <span className="mt-2 text-sm">{brand.name}</span>
          </div>
        ))}
      </div>

      {/* Common Issues, Process, and Service Info removed due to missing properties in repairData. */}
    </section>
  );
}
