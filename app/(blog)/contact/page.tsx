import type { Metadata } from "next";
import Script from "next/script";
import { INFO } from "@/constants";
import {
  getContactMetadata,
  getContactStructuredData,
} from "@/lib/seo/contactMetadata";

export const metadata: Metadata = getContactMetadata();

export default function ContactUsPage() {
  const structuredData = getContactStructuredData();
  return (
    <section className="w-full">
      <Script
        id="contact-structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        strategy="beforeInteractive"
      />
      {/* Header */}
      <div className="bg-gradient-to-r from-[#121212] via-[#D2691E] to-[#121212] text-white py-12">
        <div className="max-w-4xl mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-extrabold text-center drop-shadow-lg">
            Contact Us – {INFO.name}
          </h1>
          <p className="mt-4 text-center text-gray-200 text-lg md:text-xl font-medium">
            Your Online Service Center
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-3xl mx-auto px-4 py-16 md:py-20">
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-[#D2691E] mb-6">
            Have a question, need help with a repair, or want to know more?
          </h2>
          <p className="mb-6 text-gray-700 text-lg">
            The Fixamigo team is here to assist you every step of the way. We
            make it easy for you to book repairs, track your order, and get
            answers fast — whether online, by phone, or via WhatsApp.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <div>
              <h3 className="font-bold text-lg text-[#D2691E] mb-2">
                📞 Call Us
              </h3>
              <p className="text-gray-700 mb-2">
                Phone:{" "}
                <a
                  href={INFO.phoneLink()}
                  className="text-[#D2691E] font-medium"
                >
                  {INFO.phoneLabel}
                </a>
              </p>
              <p className="text-gray-600">
                Available: 10:00 AM – 6:00 PM, Monday to Saturday
              </p>
            </div>
            <div>
              <h3 className="font-bold text-lg text-[#D2691E] mb-2">
                📧 Email Us
              </h3>
              <p className="text-gray-700 mb-2">
                General Support:{" "}
                <a
                  href={INFO.emailLink()}
                  className="text-[#D2691E] font-medium"
                >
                  {INFO.email}
                </a>
              </p>
            </div>
            <div>
              <h3 className="font-bold text-lg text-[#D2691E] mb-2">
                💬 WhatsApp Support
              </h3>
              <p className="text-gray-700 mb-2">
                WhatsApp:{" "}
                <a href={INFO.waLink()} className="text-[#D2691E] font-medium">
                  {INFO.phoneLabel}
                </a>
              </p>
            </div>
          </div>

          <div className="mb-8">
            <h3 className="font-bold text-lg text-[#D2691E] mb-2">
              🛠 Quick Links
            </h3>
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              <li>
                <a href="#" className="text-[#D2691E] font-medium">
                  Book a Repair
                </a>
              </li>
              <li>
                <a href="#" className="text-[#D2691E] font-medium">
                  Track Your Order
                </a>
              </li>
              <li>
                <a href="#" className="text-[#D2691E] font-medium">
                  Frequently Asked Questions
                </a>
              </li>
            </ul>
          </div>

          <div className="mb-8">
            <h3 className="font-bold text-lg text-[#D2691E] mb-2">
              Stay Connected
            </h3>
            <ul className="flex gap-6 text-gray-700">
              <li>
                <a
                  href={INFO.instagram}
                  target="_blank"
                  rel="noopener"
                  className="text-[#D2691E] font-medium"
                >
                  Instagram
                </a>
              </li>
              <li>
                <a
                  href={INFO.facebook}
                  target="_blank"
                  rel="noopener"
                  className="text-[#D2691E] font-medium"
                >
                  Facebook
                </a>
              </li>
              <li>
                <a
                  href={INFO.x}
                  target="_blank"
                  rel="noopener"
                  className="text-[#D2691E] font-medium"
                >
                  X (Twitter)
                </a>
              </li>
            </ul>
          </div>

          <div className="mb-8">
            <h3 className="font-bold text-lg text-[#D2691E] mb-2">
              📜 Grievance Officer
            </h3>
            <p className="text-gray-700">Name: {INFO.grievanceOfficer.name}</p>
            <p className="text-gray-700">
              Email:{" "}
              <a
                href={`mailto:${INFO.grievanceOfficer.email}`}
                className="text-[#D2691E] font-medium"
              >
                {INFO.grievanceOfficer.email}
              </a>
            </p>
            <p className="text-gray-700">
              Address: {INFO.grievanceOfficer.address}
            </p>
            <p className="text-gray-700">
              Working Hours: {INFO.grievanceOfficer.workingHours}
            </p>
          </div>

          <p className="mt-8 text-center text-lg font-semibold text-[#D2691E]">
            Fixamigo – Your gadget’s best friend, always here to help.
          </p>
        </div>
      </div>
    </section>
  );
}
