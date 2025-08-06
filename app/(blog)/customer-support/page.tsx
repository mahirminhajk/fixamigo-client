"use client";
import Link from "next/link";

export default function CustomerSupportPage() {
  return (
    <section className="w-full">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#121212] via-[#D2691E] to-[#121212] text-white py-12">
        <div className="max-w-4xl mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-bold text-center">
            Grievance Redressal & Customer Support
          </h1>
          <p className="mt-4 text-center text-gray-200">
            We're here to help resolve your concerns
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 py-8 md:py-12">
        <div className="prose prose-lg max-w-none">
          {/* Introduction */}
          <p className="text-gray-600 mb-8">
            At Fixamigo, customer satisfaction is our top priority. We have
            established a comprehensive grievance redressal mechanism to ensure
            that your concerns are addressed promptly and effectively. This page
            outlines our support channels and the process for raising and
            resolving grievances.
          </p>

          {/* Contact Channels */}
          <div className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              1. Contact Channels
            </h2>
            <div className="bg-gray-50 p-6 rounded-lg space-y-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-800">
                  Primary Support:
                </h3>
                <p className="text-gray-600">Email: support@fixamigo.com</p>
                <p className="text-gray-600">Phone: +91-XXXXXXXXXX</p>
                <p className="text-gray-600">
                  Working Hours: Monday to Saturday, 10:00 AM – 4:00 PM
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-800">
                  Grievance Officer:
                </h3>
                <p className="text-gray-600">Name: Mahir Minhaj K</p>
                <p className="text-gray-600">Email: km@fixamigo.com</p>
                <p className="text-gray-600">
                  Address: Kunduvayil, Ponmala, Kerala – 676528
                </p>
              </div>
            </div>
          </div>

          {/* Support Process */}
          <div className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              2. Support Process
            </h2>
            <div className="space-y-4">
              <div className="p-4 border-l-4 border-[#D2691E] bg-gray-50">
                <h3 className="text-lg font-semibold text-gray-800">
                  Level 1: Initial Support
                </h3>
                <ul className="list-disc pl-6 space-y-2 text-gray-600 mt-2">
                  <li>Contact our customer support team via email or phone</li>
                  <li>Response time: Within 24 hours</li>
                  <li>Basic troubleshooting and service-related queries</li>
                </ul>
              </div>

              <div className="p-4 border-l-4 border-[#D2691E] bg-gray-50">
                <h3 className="text-lg font-semibold text-gray-800">
                  Level 2: Technical Support
                </h3>
                <ul className="list-disc pl-6 space-y-2 text-gray-600 mt-2">
                  <li>Escalation for complex technical issues</li>
                  <li>Direct interaction with repair experts</li>
                  <li>Response time: Within 48 hours</li>
                </ul>
              </div>

              <div className="p-4 border-l-4 border-[#D2691E] bg-gray-50">
                <h3 className="text-lg font-semibold text-gray-800">
                  Level 3: Grievance Officer
                </h3>
                <ul className="list-disc pl-6 space-y-2 text-gray-600 mt-2">
                  <li>Final escalation point for unresolved issues</li>
                  <li>Direct handling of serious complaints</li>
                  <li>Response time: Within 72 hours</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Information Required */}
          <div className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              3. Information Required for Support
            </h2>
            <ul className="list-disc pl-6 space-y-2 text-gray-600">
              <li>Order/Service ID (if applicable)</li>
              <li>Contact information (name, phone, email)</li>
              <li>Device details (make, model)</li>
              <li>Clear description of the issue</li>
              <li>Any relevant photos or documentation</li>
            </ul>
          </div>

          {/* Resolution Timeline */}
          <div className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              4. Resolution Timeline
            </h2>
            <ul className="list-disc pl-6 space-y-2 text-gray-600">
              <li>General queries: 24-48 hours</li>
              <li>Technical issues: 2-3 working days</li>
              <li>Complex grievances: 3-5 working days</li>
              <li>Refund-related issues: 7-10 working days</li>
            </ul>
          </div>

          {/* Escalation Matrix */}
          <div className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              5. Escalation Matrix
            </h2>
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-gray-600 mb-4">
                If you're not satisfied with the resolution:
              </p>
              <ol className="list-decimal pl-6 space-y-4 text-gray-600">
                <li>
                  <strong>First Level:</strong> Customer Support Team
                  <br />
                  Email: support@fixamigo.com
                </li>
                <li>
                  <strong>Second Level:</strong> Technical Support Lead
                  <br />
                  Response Time: Within 48 hours
                </li>
                <li>
                  <strong>Final Level:</strong> Grievance Officer
                  <br />
                  Email: km@fixamigo.com
                </li>
              </ol>
            </div>
          </div>

          {/* Legal Compliance */}
          <div className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              6. Legal Compliance
            </h2>
            <p className="text-gray-600">
              Our grievance redressal mechanism complies with the Information
              Technology (Intermediary Guidelines and Digital Media Ethics Code)
              Rules, 2021. We maintain transparency and ensure proper
              documentation of all grievances received and their resolution.
            </p>
          </div>

          {/* Service Commitment */}
          <div className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              7. Our Service Commitment
            </h2>
            <ul className="list-disc pl-6 space-y-2 text-gray-600">
              <li>Acknowledge all complaints within 24 hours</li>
              <li>Provide regular updates on resolution progress</li>
              <li>Maintain confidentiality of customer information</li>
              <li>Fair and transparent resolution process</li>
              <li>Continuous improvement based on feedback</li>
            </ul>
          </div>
        </div>

        {/* Footer Note */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <p className="text-sm text-gray-500 text-center">
            We value your feedback and are committed to providing the best
            possible support. For immediate assistance, please contact us at{" "}
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
