import React from "react";
import type { Metadata } from "next";
import Script from "next/script";
import { INFO } from "@/constants";
import {
  getAboutMetadata,
  getAboutStructuredData,
} from "@/lib/seo/aboutMetadata";

export const metadata: Metadata = getAboutMetadata();

export default function AboutUsPage() {
  const structuredData = getAboutStructuredData();
  return (
    <section className="w-full">
      <Script
        id="about-structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        strategy="beforeInteractive"
      />
      {/* Header */}
      <div className="bg-gradient-to-r from-[#121212] via-[#D2691E] to-[#121212] text-white py-12">
        <div className="max-w-4xl mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-extrabold text-center drop-shadow-lg">
            About Us
          </h1>
          <p className="mt-4 text-center text-gray-200 text-lg md:text-xl font-medium">
            {INFO.tagline2} for Mobile, Laptop & Electronics
          </p>
        </div>
      </div>

      {/* Highlight Cards */}
      <div className="max-w-5xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8 mt-8 md:mt-12">
        <div className="bg-white rounded-2xl shadow-xl p-8 flex flex-col items-center text-center border-t-4 border-[#D2691E]">
          <svg
            className="w-10 h-10 text-[#D2691E] mb-3"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 17v-2a4 4 0 018 0v2M9 7a4 4 0 018 0v2M5 7v2a4 4 0 008 0V7M5 17v-2a4 4 0 018 0v2"
            />
          </svg>
          <h3 className="font-bold text-lg mb-2 text-[#D2691E]">
            Doorstep Service
          </h3>
          <p className="text-gray-600">
            We pick up, repair, and deliver your device at your chosen time.
          </p>
        </div>
        <div className="bg-white rounded-2xl shadow-xl p-8 flex flex-col items-center text-center border-t-4 border-[#D2691E]">
          <svg
            className="w-10 h-10 text-[#D2691E] mb-3"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 8v4l3 3"
            />
          </svg>
          <h3 className="font-bold text-lg mb-2 text-[#D2691E]">
            Certified Technicians
          </h3>
          <p className="text-gray-600">
            Trained experts using quality parts and tools for every repair.
          </p>
        </div>
        <div className="bg-white rounded-2xl shadow-xl p-8 flex flex-col items-center text-center border-t-4 border-[#D2691E]">
          <svg
            className="w-10 h-10 text-[#D2691E] mb-3"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M5 13l4 4L19 7"
            />
          </svg>
          <h3 className="font-bold text-lg mb-2 text-[#D2691E]">
            Transparent Pricing
          </h3>
          <p className="text-gray-600">
            Get a clear repair quote before we start. No hidden charges.
          </p>
        </div>
      </div>

      {/* Main Content Section - markdown only */}
      <div className="max-w-4xl mx-auto px-4 py-16 md:py-20">
        <div className="prose prose-lg max-w-none bg-white rounded-2xl shadow-lg p-8">
          <h2 className="text-3xl font-bold mb-8 text-[#D2691E] text-center">
            Who We Are & What We Do
          </h2>
          <div className="space-y-6">
            <h3 className="text-xl font-semibold">Our Passion</h3>
            <p>
              At {INFO.name}, we make mobile, laptop, and electronic repairs
              fast, transparent, and hassle-free. Whether you need a doorstep
              phone repair, pickup–repair–delivery, or on-site service, we’re
              here to bring expert care for your devices — all with just a few
              clicks.
            </p>

            <h3 className="text-xl font-semibold mt-8">Who We Are</h3>
            <p>
              {INFO.name} is a trusted gadget repair platform in Kerala,
              offering smartphone repairs, laptop repairs, and other electronic
              repair services at your convenience.
            </p>
            <p>
              No more traveling to service centers, facing long waits, or
              dealing with uncertain costs — with {INFO.name}, you get clear
              pricing, skilled technicians, and reliable service.
            </p>

            <h3 className="text-xl font-semibold mt-8">What We Do</h3>
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold">Smartphone Repair</h4>
                <p>
                  Screen replacement, battery change, charging issues, water
                  damage &amp; more.
                </p>
              </div>
              <div>
                <h4 className="font-semibold">Laptop Repair</h4>
                <p>
                  Hardware fixes, software installation, performance upgrades,
                  and maintenance.
                </p>
              </div>
              <div>
                <h4 className="font-semibold">Electronics Repair</h4>
                <p>
                  From tablets to accessories, we restore your tech to top
                  condition.
                </p>
              </div>
              <div>
                <h4 className="font-semibold">Doorstep Service</h4>
                <p>
                  We pick up, repair, and deliver your device at your chosen
                  time.
                </p>
              </div>
            </div>

            <h3 className="text-xl font-semibold mt-8">
              Why Customers Choose {INFO.name}
            </h3>
            <ul className="list-disc pl-6">
              <li>
                Doorstep Pickup &amp; Delivery — Save time and avoid the hassle
                of visiting service centers.
              </li>
              <li>
                Transparent Pricing — Get a clear repair quote before we start.
              </li>
              <li>
                Certified Technicians — Trained experts using quality parts and
                tools.
              </li>
              <li>
                1-Week Warranty — Post-repair warranty for peace of mind (No
                warranty for physical damage).
              </li>
              <li>
                Real-Time Updates — Track your repair status online anytime.
              </li>
            </ul>

            <h3 className="text-xl font-semibold mt-8">Our Vision</h3>
            <p>
              To be Kerala’s most trusted gadget repair service, expanding
              across India and making quality device repair accessible to
              everyone.
            </p>

            <h3 className="text-xl font-semibold mt-8">Our Mission</h3>
            <p>
              To simplify gadget repair with technology-driven solutions, expert
              service, and customer-first values.
            </p>

            <h3 className="text-xl font-semibold mt-8">Join the Movement</h3>
            <p>
              Choose repair over replacement — for a smarter, more sustainable
              future.
            </p>

            <p>
              Serving Malappuram and nearby areas, with more locations coming
              soon.
            </p>
            <p>
              Visit:{" "}
              <a
                className="text-[#D2691E] font-medium"
                href={INFO.website}
                target="_blank"
                rel="noopener"
              >
                {INFO.website}
              </a>{" "}
              — Book your repair today!
            </p>
            <p>{INFO.name} — Your device’s best friend.</p>
          </div>
          {/* Additional Headings and Content */}
          <h2 className="text-2xl font-bold mt-12 mb-4 text-[#D2691E]">
            Our Core Values
          </h2>
          <ul className="list-disc pl-6 mb-8 text-gray-700">
            <li>Customer-First Approach</li>
            <li>Transparency in Service & Pricing</li>
            <li>Quality Repairs & Genuine Parts</li>
            <li>Continuous Improvement</li>
            <li>Community & Sustainability</li>
          </ul>
          <h2 className="text-2xl font-bold mt-12 mb-4 text-[#D2691E]">
            How We Work
          </h2>
          <ol className="list-decimal pl-6 mb-8 text-gray-700">
            <li>Book your repair online or via phone.</li>
            <li>We pick up your device at your convenience.</li>
            <li>Expert technicians diagnose and repair.</li>
            <li>Track your repair status in real-time.</li>
            <li>Device delivered back to you, ready to use!</li>
          </ol>
        </div>
      </div>
      {/* Removed markdown-specific styles */}

      {/* Call to Action */}
      <div className="max-w-4xl mx-auto px-4 pb-12 text-center">
        <a
          href={INFO.website}
          target="_blank"
          rel="noopener"
          className="inline-block px-8 py-4 bg-[#D2691E] text-white font-bold rounded-xl shadow-lg hover:bg-[#121212] transition-colors text-lg"
        >
          Book Your Repair Today
        </a>
      </div>
    </section>
  );
}
