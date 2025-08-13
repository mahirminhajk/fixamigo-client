// app/(root)/repair/[category]/page.tsx
import { notFound } from "next/navigation";
import Image from "next/image";
import { repairPageContent } from "@/constants/content";
import OurProcess from "@/components/list/ourProcess";
import WhyChooseFixamigo from "@/components/list/whyChooseFixamigo";
import BrandsList from "@/components/list/brandListInRepair";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Link from "next/link";
import Script from "next/script";
import {
  getCategoryMetadata,
  getCategoryStructuredData,
} from "@/lib/seo/categoryMetadata";

interface RepairPageProps {
  params: Promise<{ category: string }>;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;
  return getCategoryMetadata(category);
}

export default async function RepairCategoryPage({ params }: RepairPageProps) {
  const { category } = await params;

  // Find matching repair content
  const repairData = repairPageContent.find(
    (item) => item.slug.toLowerCase() === category.toLowerCase()
  );

  if (!repairData) {
    return notFound();
  }

  const structuredData = getCategoryStructuredData(category);

  return (
    <>
      <Script id="category-structured-data" type="application/ld+json">
        {JSON.stringify(structuredData)}
      </Script>
      {/* Blog Banner Image */}
      <div className="w-full h-64 relative mb-8">
        <Image
          src="/og-fixamigo.jpg"
          alt="Mobile phone repair banner"
          fill
          priority
          sizes="100vw"
          quality={85}
          className="object-cover object-center rounded-b-2xl"
        />
      </div>

      {/* Blog Header */}
      <div className="max-w-2xl mx-auto px-4 mb-8">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-gray-500">By Fixamigo</span>
          <span className="text-sm text-gray-400">
            {new Date().toLocaleDateString()}
          </span>
        </div>
        <h1 className="text-4xl font-extrabold text-[#D2691E] mb-4 leading-tight">
          {repairData.heading}
        </h1>
        <p className="text-lg text-gray-700 mb-2">
          {repairData.headingDescription}
        </p>
        <hr className="my-6 border-t border-gray-200" />
      </div>

      <section className="max-w-2xl mx-auto px-4 pb-16">
        {/* Main Description */}
        <div className="prose prose-lg max-w-none mb-12">
          <p className="lead text-lg">{repairData.mainDescription}</p>
        </div>

        <hr className="my-8 border-t border-gray-100" />

        {/* Brand Selector */}
        <div className="mb-12">
          <BrandsList />
        </div>

        <hr className="my-8 border-t border-gray-100" />

        {/* Common Issues Section */}
        <div className="mb-12">
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

        <hr className="my-8 border-t border-gray-100" />

        {/* Our Process Section */}
        <div className="mb-12">
          <OurProcess />
        </div>

        <hr className="my-8 border-t border-gray-100" />

        {/* Why Choose Fixamigo Section */}
        <div className="mb-12">
          <WhyChooseFixamigo />
        </div>

        <hr className="my-8 border-t border-gray-100" />

        {/* FAQ Section with Accordion */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-[#D2691E] mb-6">
            {repairData.sixthHeading}
          </h2>
          <Accordion type="single" collapsible>
            {repairData.sixthQuestions.map((faq, index) => (
              <AccordionItem value={`item-${index}`} key={index}>
                <AccordionTrigger>{faq.question}</AccordionTrigger>
                <AccordionContent>{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        <hr className="my-8 border-t border-gray-100" />

        {/* Call to Action (non-card, left-aligned) */}
        <div className="p-0">
          <h2 className="text-2xl font-bold text-[#D2691E] mb-4">
            {repairData.seventhHeading}
          </h2>
          <div>
            {repairData.seventhDescription
              .split("\n\n")
              .map((paragraph, index) => (
                <p key={index} className="mb-4">
                  {paragraph}
                </p>
              ))}
          </div>
          <Link
            href="/repair/mobile-phone"
            className="inline-block mt-6 px-8 py-4 bg-[#D2691E] text-white font-bold rounded-xl hover:bg-[#121212] transition-colors"
          >
            Book Your Repair Now
          </Link>
        </div>
      </section>
    </>
  );
}
