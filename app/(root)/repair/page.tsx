import type { Metadata } from "next";
import Script from "next/script";
import Link from "next/link";
import Image from "next/image";
import { supportCities } from "@/constants";
import { CheckCircle, Shield, Truck, Clock } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  getRepairMetadata,
  getRepairStructuredData,
} from "@/lib/seo/repairMetadata";

export const metadata: Metadata = getRepairMetadata();

export default function RepairPage() {
  const structuredData = getRepairStructuredData();

  return (
    <>
      <Script
        id="repair-structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        strategy="beforeInteractive"
      />

      {/* Hero / Intro Section */}
      <section className="bg-gradient-to-r from-[#121212] via-[#D2691E] to-[#121212] text-white">
        <div className="w-full max-w-5xl mx-auto px-4 md:px-6 py-8 md:py-12">
          <h1 className="text-2xl md:text-3xl font-bold">
            Device Repair Services
          </h1>
          <p className="text-sm md:text-base text-white/90 mt-2 max-w-3xl">
            We currently offer expert repair services for mobile phones and
            laptops. Book online for pickup & delivery in select cities across
            Kerala, with quality parts and warranty-backed service.
          </p>
          <div className="mt-4">
            <Link
              href="/support-request?type=can-not-find"
              className="inline-block text-sm md:text-base font-semibold underline underline-offset-4 hover:opacity-90"
              title="Can’t find your device? Talk to our experts"
            >
              Can’t find your device? Talk to our experts
            </Link>
          </div>
        </div>
      </section>

      {/* Services Overview - Content Rich Cards */}
      <section className="w-full max-w-5xl mx-auto px-4 md:px-6 py-8 md:py-12">
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
            Our Repair Services
          </h2>
          <p className="text-gray-600 text-base md:text-lg max-w-2xl mx-auto">
            Professional repair services for mobiles and laptops with expert
            technicians, quality parts, and convenient pickup & delivery.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          {/* Mobile Repair Card */}
          <article
            className="group bg-white border-2 border-gray-200 rounded-2xl shadow-lg p-5 md:p-6 lg:p-8
                       transition-all duration-300 ease-in-out hover:shadow-2xl hover:scale-[1.02] hover:-translate-y-1
                       hover:border-[#D2691E] hover:bg-gradient-to-br hover:from-orange-50 hover:to-orange-100"
          >
            <div className="flex items-start gap-4">
              <div
                className="relative w-16 h-16 md:w-20 md:h-20 rounded-2xl flex items-center justify-center
                           bg-gradient-to-br from-[#121212] to-[#121212] hover:from-[#D2691E] hover:to-[#121212]
                           shadow-lg group-hover:shadow-xl transform transition-all duration-300 group-hover:rotate-3"
                aria-hidden
              >
                <Image
                  src="/icons/phone.png"
                  alt="Mobile phone icon"
                  title="Repair Mobile"
                  width={64}
                  height={64}
                  className="w-10 h-10 md:w-12 md:h-12 filter brightness-0 invert drop-shadow-sm"
                />
              </div>
              <div className="flex-1">
                <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-2">
                  Repair Mobile
                </h3>
                <p className="text-gray-600 text-sm md:text-base mb-3">
                  Screen, battery, charging, camera, buttons, speakers, and more
                  — we fix all major smartphone brands and models.
                </p>
                <ul className="text-gray-700 text-sm md:text-base space-y-1 list-disc pl-5">
                  <li>Genuine-quality parts with warranty</li>
                  <li>Free pickup & delivery in select cities</li>
                  <li>Expert diagnosis and transparent pricing</li>
                </ul>
                <div className="mt-4">
                  <Link
                    href="/repair/mobile-phone"
                    className="relative inline-flex items-center gap-3 px-6 md:px-8 py-3 md:py-4
                               bg-gradient-to-r from-[#D2691E] to-[#121212]
                               hover:from-[#121212] hover:to-[#D2691E]
                               text-white font-bold rounded-2xl shadow-xl hover:shadow-2xl
                               transform transition-all duration-300 hover:scale-105 hover:-translate-y-1"
                    title="Explore mobile phone repair"
                  >
                    Explore Mobile Repairs
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M17 8l4 4m0 0l-4 4m4-4H3"
                      />
                    </svg>
                  </Link>
                </div>
              </div>
            </div>
          </article>

          {/* Laptop Repair Card */}
          <article
            className="group bg-white border-2 border-gray-200 rounded-2xl shadow-lg p-5 md:p-6 lg:p-8
                       transition-all duration-300 ease-in-out hover:shadow-2xl hover:scale-[1.02] hover:-translate-y-1
                       hover:border-[#D2691E] hover:bg-gradient-to-br hover:from-orange-50 hover:to-orange-100"
          >
            <div className="flex items-start gap-4">
              <div
                className="relative w-16 h-16 md:w-20 md:h-20 rounded-2xl flex items-center justify-center
                           bg-gradient-to-br from-[#121212] to-[#121212] hover:from-[#D2691E] hover:to-[#121212]
                           shadow-lg group-hover:shadow-xl transform transition-all duration-300 group-hover:rotate-3"
                aria-hidden
              >
                <Image
                  src="/icons/laptop.png"
                  alt="Laptop icon"
                  title="Repair Laptop"
                  width={64}
                  height={64}
                  className="w-10 h-10 md:w-12 md:h-12 filter brightness-0 invert drop-shadow-sm"
                />
              </div>
              <div className="flex-1">
                <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-2">
                  Repair Laptop
                </h3>
                <p className="text-gray-600 text-sm md:text-base mb-3">
                  Battery, keyboard, screen, SSD/RAM upgrades, OS issues,
                  thermal service — comprehensive laptop care for popular
                  models.
                </p>
                <ul className="text-gray-700 text-sm md:text-base space-y-1 list-disc pl-5">
                  <li>Thorough diagnostics and quality parts</li>
                  <li>Pickup & delivery available in select cities</li>
                  <li>Backed by service warranty</li>
                </ul>
                <div className="mt-4">
                  <Link
                    href="/repair/laptop"
                    className="relative inline-flex items-center gap-3 px-6 md:px-8 py-3 md:py-4
                               bg-gradient-to-r from-[#D2691E] to-[#121212]
                               hover:from-[#121212] hover:to-[#D2691E]
                               text-white font-bold rounded-2xl shadow-xl hover:shadow-2xl
                               transform transition-all duration-300 hover:scale-105 hover:-translate-y-1"
                    title="Explore laptop repair"
                  >
                    Explore Laptop Repairs
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M17 8l4 4m0 0l-4 4m4-4H3"
                      />
                    </svg>
                  </Link>
                </div>
              </div>
            </div>
          </article>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="w-full max-w-5xl mx-auto px-4 md:px-6 pb-8 md:pb-12">
        <h2 className="text-xl md:text-2xl font-semibold text-gray-900 mb-4">
          Why choose Fixamigo
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          <div className="flex items-start gap-2">
            <CheckCircle className="w-6 h-6 text-[#D2691E]" />
            <p className="text-sm md:text-base text-gray-700">
              Expert technicians
            </p>
          </div>
          <div className="flex items-start gap-2">
            <Shield className="w-6 h-6 text-[#D2691E]" />
            <p className="text-sm md:text-base text-gray-700">
              Warranty-backed parts
            </p>
          </div>
          <div className="flex items-start gap-2">
            <Truck className="w-6 h-6 text-[#D2691E]" />
            <p className="text-sm md:text-base text-gray-700">
              Pickup & delivery
            </p>
          </div>
          <div className="flex items-start gap-2">
            <Clock className="w-6 h-6 text-[#D2691E]" />
            <p className="text-sm md:text-base text-gray-700">
              Fast turnaround
            </p>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="w-full max-w-5xl mx-auto px-4 md:px-6 pb-8 md:pb-12">
        <h2 className="text-xl md:text-2xl font-semibold text-gray-900 mb-4">
          How it works
        </h2>
        <ol className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {[
            {
              step: 1,
              title: "Choose service",
              desc: "Select mobile or laptop repair and the issue.",
            },
            {
              step: 2,
              title: "Schedule pickup",
              desc: "Book a convenient time and location.",
            },
            {
              step: 3,
              title: "Repair & QA",
              desc: "We fix your device and verify quality.",
            },
            {
              step: 4,
              title: "Delivery & warranty",
              desc: "Get it back with warranty-backed parts.",
            },
          ].map((s) => (
            <li
              key={s.step}
              className="bg-white border-2 border-gray-200 rounded-2xl p-4 shadow-sm"
            >
              <div className="text-[#D2691E] font-bold">Step {s.step}</div>
              <div className="text-gray-900 font-semibold">{s.title}</div>
              <div className="text-gray-600 text-sm">{s.desc}</div>
            </li>
          ))}
        </ol>
      </section>

      {/* Service coverage */}
      <section className="w-full max-w-5xl mx-auto px-4 md:px-6 pb-10 md:pb-14">
        <h2 className="text-xl md:text-2xl font-semibold text-gray-900 mb-3">
          Service coverage
        </h2>
        <p className="text-gray-600 text-sm md:text-base mb-4">
          We currently operate in select cities across Kerala. Check
          availability in your city.
        </p>
        <div className="flex flex-wrap gap-2">
          {supportCities.slice(0, 12).map((c) => (
            <Link
              key={c.slug}
              href={`/${c.slug}`}
              className="px-3 py-1.5 rounded-full border border-gray-200 text-sm text-gray-700 hover:border-[#D2691E] hover:text-[#D2691E] transition"
              title={`Repair service in ${c.name}`}
            >
              {c.name}
            </Link>
          ))}
        </div>
      </section>

      {/* FAQs */}
      <section className="w-full max-w-5xl mx-auto px-4 md:px-6 pb-12">
        <h2 className="text-xl md:text-2xl font-semibold text-gray-900 mb-4">
          FAQs
        </h2>
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem
            value="item-1"
            className="border-2 border-gray-200 rounded-2xl px-4 mb-3"
          >
            <AccordionTrigger className="text-gray-900 font-semibold py-3">
              How much do repairs cost?
            </AccordionTrigger>
            <AccordionContent className="text-gray-600 text-sm md:text-base pt-0 pb-4">
              Mobile repairs start from ₹99 depending on the issue and model.
              Laptop costs vary based on parts and labour.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem
            value="item-2"
            className="border-2 border-gray-200 rounded-2xl px-4 mb-3"
          >
            <AccordionTrigger className="text-gray-900 font-semibold py-3">
              Is pickup and delivery available?
            </AccordionTrigger>
            <AccordionContent className="text-gray-600 text-sm md:text-base pt-0 pb-4">
              Yes, we offer free pickup and delivery in select cities across
              Kerala for most repairs.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem
            value="item-3"
            className="border-2 border-gray-200 rounded-2xl px-4"
          >
            <AccordionTrigger className="text-gray-900 font-semibold py-3">
              Do you provide a warranty?
            </AccordionTrigger>
            <AccordionContent className="text-gray-600 text-sm md:text-base pt-0 pb-4">
              All services are backed by warranty on parts replaced. Terms vary
              by repair type.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </section>
    </>
  );
}
