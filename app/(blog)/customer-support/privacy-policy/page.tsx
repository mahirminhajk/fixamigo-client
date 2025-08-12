"use client";
import Link from "next/link";

export default function PrivacyPolicyPage() {
  return (
    <section className="w-full">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#121212] via-[#D2691E] to-[#121212] text-white py-12">
        <div className="max-w-4xl mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-bold text-center">
            Privacy Policy
          </h1>
          <p className="mt-4 text-center text-gray-200">
            Effective Date: October 1, 2025
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 py-8 md:py-12">
        <div className="prose prose-lg max-w-none">
          {/* About Us & Policy Scope */}
          <div className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              1. About Us & Policy Scope
            </h2>
            <p className="text-gray-600">
              Fixamigo ("we", "us", "our") operates the Fixamigo platform,
              providing electronic repair and doorstep pickup/delivery services.
              This Privacy Policy explains how we collect, use, share, and
              protect your personal data when you interact with our website and
              services.
            </p>
          </div>

          {/* Information We Collect */}
          <div className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              2. Information We Collect
            </h2>
            <ul className="list-disc pl-6 space-y-4 text-gray-600">
              <li>
                <strong>Directly from you:</strong> name, contact info (email,
                phone, address), device details, service requests, feedback.
              </li>
              <li>
                <strong>Automatically:</strong> IP address, browser/device data,
                usage logs via cookies and tracking technologies.
              </li>
              <li>
                <strong>From third parties:</strong> e.g. verified service
                partners for repair operations, marketing lists or public
                sources, if applicable.
              </li>
            </ul>
          </div>

          {/* How We Use Your Data */}
          <div className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              3. How We Use Your Data
            </h2>
            <p className="text-gray-600 mb-4">
              We process personal data based on:
            </p>
            <ul className="list-disc pl-6 space-y-4 text-gray-600">
              <li>
                <strong>Contractual necessity:</strong> to perform service
                bookings, repairs, and delivery.
              </li>
              <li>
                <strong>Legitimate interests:</strong> to operate and improve
                our services, detect fraud, and ensure platform safety.
              </li>
              <li>
                <strong>Consent:</strong> for sending marketing or promotional
                messages. You may withdraw consent at any time.
              </li>
              <li>
                <strong>Legal compliance:</strong> to respond to lawful requests
                or protect rights.
              </li>
            </ul>
          </div>

          {/* Sharing Your Information */}
          <div className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              4. Sharing Your Information
            </h2>
            <p className="text-gray-600 mb-4">
              We do not sell your data. We may share it with:
            </p>
            <ul className="list-disc pl-6 space-y-4 text-gray-600">
              <li>
                Service partners (e.g., repair technicians, delivery agents)
                strictly for service delivery.
              </li>
              <li>
                Technical vendors (e.g., hosting, analytics) under
                confidentiality agreements.
              </li>
              <li>Legal or regulatory authorities, if required by law.</li>
              <li>
                In case of mergers, acquisitions, or asset transfers, with
                proper notice.
              </li>
            </ul>
          </div>

          {/* Data Retention & Location */}
          <div className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              5. Data Retention & Location
            </h2>
            <p className="text-gray-600">
              We retain personal data only as long as needed for service
              purpose, legal compliance, or to resolve disputes. Our operations
              are primarily based in India; data may be processed locally. If
              data is transferred outside, safeguards are maintained to ensure
              continued protection.
            </p>
          </div>

          {/* Your Rights */}
          <div className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              6. Your Rights
            </h2>
            <p className="text-gray-600 mb-4">You may:</p>
            <ul className="list-disc pl-6 space-y-2 text-gray-600">
              <li>Access, correct, or update your personal data</li>
              <li>Request deletion or restriction of processing</li>
              <li>Receive your data in a portable format (where applicable)</li>
              <li>Object to processing (e.g., direct marketing)</li>
              <li>
                Withdraw consent at any time (without affecting prior
                processing)
              </li>
            </ul>
          </div>

          {/* Security & Disclaimer */}
          <div className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              7. Security & Disclaimer
            </h2>
            <p className="text-gray-600">
              We use reasonable technical and organizational measures to protect
              your information. While we strive for security, no system is fully
              impenetrable.
            </p>
          </div>

          {/* Children & Eligibility */}
          <div className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              8. Children & Eligibility
            </h2>
            <p className="text-gray-600">
              Fixamigo's services are intended for users aged 18 and above. We
              do not knowingly collect data from minors. Users under 18 should
              only access the platform under parental supervision. If you
              believe a minor has shared data without consent, contact us.
            </p>
          </div>

          {/* Policy Updates */}
          <div className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              9. Policy Updates
            </h2>
            <p className="text-gray-600">
              We may update this Privacy Policy from time to time. The
              "Effective Date" will reflect the latest version. Please review it
              periodically.
            </p>
          </div>

          {/* Contact Us */}
          <div className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              10. Contact Us
            </h2>
            <p className="text-gray-600 mb-4">
              For any questions or to exercise your data rights, reach out to:
            </p>
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-gray-600">Grievance Officer – Fixamigo</p>
              <p className="text-gray-600">Email: km@fixamigo.com</p>
              <p className="text-gray-600">
                Address: palliyalil, Ponmala, 676528, Kerala
              </p>
            </div>
          </div>
        </div>

        {/* Footer Note */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <p className="text-sm text-gray-500 text-center">
            For any questions about this Privacy Policy, please contact us at{" "}
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
