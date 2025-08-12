// app/(root)/repair/[category]/page.tsx
import { notFound } from "next/navigation";
import Image from "next/image";
import { repairPageContent, brands } from "@/constants/content";
import OurProcess from "@/components/list/ourProcess";
import WhyChooseFixamigo from "@/components/list/whyChooseFixamigo";

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
    <>
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-[#121212] via-[#D2691E] to-[#121212] text-white py-12">
        <div className="max-w-6xl mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold text-center">
            {repairData.heading}
          </h1>
          <p className="mt-4 text-center text-lg md:text-xl">
            {repairData.headingDescription}
          </p>
        </div>
      </div>

      <section className="max-w-6xl mx-auto px-4 py-10">
        {/* Main Description */}
        <div className="prose prose-lg max-w-none mb-12">
          <p className="lead text-lg">{repairData.mainDescription}</p>
        </div>

        {/* Brand Selector */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-12">
          <h2 className="text-2xl font-bold text-[#D2691E] mb-6">
            Select your brand
          </h2>
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-4">
            {brands.map((brand) => (
              <div
                key={brand.name}
                className="flex flex-col items-center justify-center p-4 border rounded-lg hover:shadow-md transition-shadow cursor-pointer"
              >
                <img
                  src={brand.image}
                  alt={brand.name}
                  className="w-16 h-16 object-contain"
                />
                <span className="mt-2 text-sm font-medium">{brand.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Common Issues Section */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-12">
          <h2 className="text-2xl font-bold text-[#D2691E] mb-4">
            {repairData.secondHeading}
          </h2>
          <p className="mb-4">{repairData.secondDescription}</p>
          <ul className="list-disc pl-6 space-y-2">
            {(Array.isArray(repairData.secondPoints)
              ? repairData.secondPoints
              : repairData.secondPoints.split(",")
            ).map((point: string, index: number) => (
              <li key={index} className="text-gray-700">
                {point.trim()}
              </li>
            ))}
          </ul>
          <p className="mt-6">{repairData.secondMainDescription}</p>
        </div>

        {/* Our Process Section */}
        <div className="bg-gray-50 rounded-xl p-8 mb-12">
          <OurProcess />
        </div>

        {/* Why Choose Fixamigo Section */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-12">
          <WhyChooseFixamigo />
        </div>

        {/* FAQ Section */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-[#D2691E] mb-6">
            {repairData.sixthHeading}
          </h2>
          <div className="space-y-6">
            {repairData.sixthQuestions.map((faq, index) => (
              <div key={index} className="bg-white rounded-lg shadow p-6">
                <h3 className="font-bold mb-2">{faq.question}</h3>
                <p className="text-gray-700">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-[#D2691E] mb-4">
            {repairData.seventhHeading}
          </h2>
          <div className="prose prose-lg max-w-none">
            {repairData.seventhDescription
              .split("\n\n")
              .map((paragraph, index) => (
                <p key={index} className="mb-4">
                  {paragraph}
                </p>
              ))}
          </div>
          <a
            href="#book-repair"
            className="inline-block mt-6 px-8 py-4 bg-[#D2691E] text-white font-bold rounded-xl hover:bg-[#121212] transition-colors"
          >
            Book Your Repair Now
          </a>
        </div>
      </section>
    </>
  );
}
