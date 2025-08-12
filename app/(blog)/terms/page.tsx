import type { Metadata } from "next";
import Script from "next/script";
import Link from "next/link";
import { INFO } from "@/constants";
import {
  getTermsMetadata,
  getTermsStructuredData,
} from "@/lib/seo/termsMetadata";

export const metadata: Metadata = getTermsMetadata();

export default function TermsAndConditionsPage() {
  const structuredData = getTermsStructuredData();
  return (
    <section className="w-full">
      <Script
        id="terms-structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        strategy="beforeInteractive"
      />
      {/* Header */}
      <div className="bg-gradient-to-r from-[#121212] via-[#D2691E] to-[#121212] text-white py-12">
        <div className="max-w-4xl mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-bold text-center">
            Terms and Conditions
          </h1>
          <p className="mt-4 text-center text-gray-200">
            Last updated: August 6, 2025
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 py-8 md:py-12">
        {/* Welcome Section */}
        <div className="prose prose-lg max-w-none">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            Welcome to {INFO.name} – {INFO.tagline2}
          </h2>
          <p className="text-gray-600 mb-8">
            By using our website {INFO.website}, registering for services, or
            engaging with any of our offerings, you agree to the following Terms
            and Conditions. Please read these terms carefully. If you do not
            agree with any part, you should refrain from using our platform or
            services.
          </p>

          {/* About Section */}
          <div className="mb-8">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">
              1. About Fixamigo
            </h3>
            <ul className="list-disc pl-6 space-y-2 text-gray-600">
              <li>
                {INFO.name} operates as an online platform that offers mobile,
                laptop, and electronic repair services with doorstep pickup and
                delivery options.
              </li>
              <li>
                Users can browse the site, but must register to place orders.
              </li>
              <li>
                {INFO.name} does not facilitate any direct transactions between
                customers and third-party technicians—all services are managed
                and fulfilled by {INFO.name} or its appointed professionals.
              </li>
            </ul>
          </div>

          {/* User Registration Section */}
          <div className="mb-8">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">
              2. User Registration & Account Security
            </h3>
            <ul className="list-disc pl-6 space-y-2 text-gray-600">
              <li>
                To place service orders, you must register and create a user
                account.
              </li>
              <li>
                You are responsible for maintaining the confidentiality of your
                account and password.
              </li>
              <li>
                {INFO.name} is not responsible for any loss resulting from
                unauthorized access to your account.
              </li>
              <li>
                You must be at least 18 years old to register and use the
                platform.
              </li>
            </ul>
          </div>

          {/* Service Conditions */}
          <div className="mb-8">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">
              3. Service Conditions
            </h3>
            <ul className="list-disc pl-6 space-y-2 text-gray-600">
              <li>
                Our platform provides professional repair services at your
                doorstep or through pickup–repair–delivery.
              </li>
              <li>
                We ensure service quality through trained professionals and
                verified processes.
              </li>
              <li>
                Customers will be notified of service updates via email, SMS, or
                platform notifications.
              </li>
            </ul>
          </div>

          {/* Warranty Policy */}
          <div className="mb-8">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">
              4. Warranty Policy
            </h3>
            <ul className="list-disc pl-6 space-y-2 text-gray-600">
              <li>
                All repair services include a 1-week warranty, starting from the
                day of delivery.
              </li>
              <li>
                No warranty is applicable on any physical or liquid damage.
              </li>
              <li>
                Warranty covers only the parts and services provided by
                Fixamigo.
              </li>
            </ul>
          </div>

          {/* Pricing and Payments */}
          <div className="mb-8">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">
              5. Pricing and Payments
            </h3>
            <ul className="list-disc pl-6 space-y-2 text-gray-600">
              <li>
                All prices for services will be displayed on the website or
                communicated during service booking.
              </li>
              <li>Full payment must be made after delivery completion.</li>
              <li>
                Pricing may vary depending on the device condition or additional
                issues discovered during inspection.
              </li>
            </ul>
          </div>

          {/* Limitations of Liability */}
          <div className="mb-8">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">
              6. Limitations of Liability
            </h3>
            <ul className="list-disc pl-6 space-y-2 text-gray-600">
              <li>
                {INFO.name} does not guarantee that the services will always be
                available, uninterrupted, or error-free.
              </li>
              <li>
                In no event shall Fixamigo be liable for:
                <ul className="list-disc pl-6 mt-2 space-y-1">
                  <li>
                    Loss of data or personal information from the
                    customer&apos;s device
                  </li>
                  <li>
                    Any indirect, incidental, or consequential damages arising
                    from the use of our services
                  </li>
                </ul>
              </li>
            </ul>
          </div>

          {/* Intellectual Property */}
          <div className="mb-8">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">
              7. Intellectual Property
            </h3>
            <p className="text-gray-600">
              All content on the website (text, graphics, logos, images, and
              software) is the property of {INFO.name} and may not be used
              without prior written permission.
            </p>
          </div>

          {/* Privacy and Data Security */}
          <div className="mb-8">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">
              8. Privacy and Data Security
            </h3>
            <ul className="list-disc pl-6 space-y-2 text-gray-600">
              <li>
                {INFO.name} respects your privacy and only uses your personal
                information for service fulfillment, updates, and support.
              </li>
              <li>
                Your personal data is stored securely and never shared with
                third parties without consent.
              </li>
              <li>
                {INFO.name} does not access, copy, download, or store any
                personal data or files from your mobile device during the repair
                process.
              </li>
              <li>
                Device access is strictly limited to conducting necessary
                hardware or software diagnosis and service.
              </li>
              <li>
                For full privacy details, refer to our{" "}
                <Link
                  href="/privacy-policy"
                  className="text-blue-600 hover:text-blue-800"
                >
                  Privacy Policy
                </Link>
                .
              </li>
            </ul>
          </div>

          {/* Grievance Officer */}
          <div className="mb-8">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">
              9. Grievance Officer
            </h3>
            <p className="text-gray-600 mb-4">
              In accordance with Indian IT laws, the Grievance Officer for
              {INFO.name} is:
            </p>
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-gray-600">
                Name: {INFO.grievanceOfficer.name}
              </p>
              <p className="text-gray-600">
                Email: {INFO.grievanceOfficer.email}
              </p>
              <p className="text-gray-600">
                Address: {INFO.grievanceOfficer.address}
              </p>
              <p className="text-gray-600">
                Working Hours: {INFO.grievanceOfficer.workingHours}
              </p>
            </div>
            <p className="mt-4 text-gray-600">
              Please contact the Grievance Officer for any unresolved complaints
              or data concerns.
            </p>
          </div>

          {/* Governing Law */}
          <div className="mb-8">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">
              10. Governing Law and Jurisdiction
            </h3>
            <ul className="list-disc pl-6 space-y-2 text-gray-600">
              <li>
                All disputes related to Fixamigo services shall be governed by
                the laws of the Republic of India.
              </li>
              <li>
                Jurisdiction lies with the competent courts of Malappuram,
                Kerala.
              </li>
            </ul>
          </div>

          {/* Updates to Terms */}
          <div className="mb-8">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">
              11. Updates to Terms
            </h3>
            <ul className="list-disc pl-6 space-y-2 text-gray-600">
              <li>
                Fixamigo reserves the right to change or update these Terms and
                Conditions at any time.
              </li>
              <li>
                Continued use of the platform after updates implies your
                acceptance of the revised terms.
              </li>
            </ul>
          </div>
        </div>

        {/* Footer Note */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <p className="text-sm text-gray-500 text-center">
            For any questions regarding these terms, please contact us at{" "}
            <Link href="/contact" className="text-blue-600 hover:text-blue-800">
              our contact page
            </Link>
            .
          </p>
        </div>
      </div>
    </section>
  );
}
